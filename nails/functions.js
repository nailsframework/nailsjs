class NailsFunctions {
    state = null;
    directives = null;
    constructor(state) {
        if (typeof state === 'undefined' || state === null) {
            console.log("Functions were initialized without a state");
        }
        this.state = state;
        this.directives = new NailsDirectives();
    }

    setTitle() {
        if (typeof this.state.data.title !== 'undefined' || this.state.data.title === null) {
            document.title = this.state.data.title;
        }
    }

    getElementDerrivedObject(element) {
        return 'object'
    }
    getElementDerrivedProperty(element) {
        return 'property'
    };
    isActiveElement(element) {
        return this.getElementDirectives(element).length > 0;
    }

    removePrefix(directive){
         return directive.substring(2)
    }
    prefixDiretive(directive) {
        return 'n-' + directive;
    }
    getElementDirectives(element) {
        let directives = [];
        for (let directive of this.directives.directives) {
            directive = this.prefixDiretive(directive);
            if ('hasAttribute' in element && element.hasAttribute(directive)) {
                directives.push(directive);
            }
        }
        return directives;
    }

    indexElement(element) {
        let activeElements = [];
        for (let child of element.childNodes) {
            let active = this.indexElement(child);
            for (let el of active) {
                activeElements.push(el);
            }
        }
        if (this.isActiveElement(element)) {
            activeElements.push([element, this.getElementDerrivedObject(element), this.getElementDerrivedProperty(element)]);
        }

        return activeElements;
    }

    getElementAttributeForDirective(element, directive){
        directive = this.prefixDiretive(directive);
        if(element.hasAttribute(directive)){
            return  element.getAttribute(directive);
        }else{
            console.warn('directive: '  + directive + ' not found on element: ' + element);
            return '';
        }
    }
    executeDirectivesOnElement(element){
        var directives = this.getElementDirectives(element[0]);    
        for(let directive of directives){     
            directive = this.removePrefix(directive); 
            if(directive in this.directives){
                this.directives[directive](element[0], this.getElementAttributeForDirective(element[0], directive), this.state)
            }else{
                console.warn('not found directive: ' + directive)
            }
        }
    }
    
   
    getValueOfInterpolation(interpolation){
        // This comes in the format of {{ interpolation }}
        interpolation = interpolation.trim();
        if(interpolation.match(/{{(( +)?\w+.?\w+( +)?)}}/g)){
            interpolation = this.stripAndTrimInterpolation(interpolation);
        }else{
            console.warn('Not found interpolation in submitted value: ' + interpolation);
            return 'undefined';
        }
        interpolation = interpolation.trim();
        if(interpolation.split('.').length > 1){
            //Worst case, user uses somehting like
            // object.attribute.item.prop;
            // we need to handle that.
            
            return eval('this.state.data.' + interpolation); // TODO: Better and safer way
        }else{
            return this.state.data[interpolation];
        }
    }

    removeWhiteSpaceFromString(str){
        return str.replace(/\s/g, "");
    }
    stripAndTrimInterpolation(interpolation){
        interpolation = interpolation.replace('{{', '');
        interpolation = interpolation.replace('}}', '');
        interpolation = interpolation.trim();
        return interpolation;
    }
    getInterpolationsForInnerText(text){
        const interpolations = [];
        //text may come in this format 'hi, this is {{test}} and this is {{abc}}'
        var matches = text.match(/{{(( +)?\w+.?\w+( +)?)}}/g);
        if(matches === null) return [];
        for(let match of matches){
            interpolations.push(match);
        }
        return interpolations;
    }
    getObjectReferenceByInterpolationName(interpolation){
        interpolation = this.stripAndTrimInterpolation(interpolation);
        return this.state.data[interpolation]; //Handle interpolations with . inside
    }

    hideElement(element){
        if('style' in element){
            element.style.display = 'none';
        }
    }
    showElement(element){
        element.style.display = 'block';
    }

    interpolateOnTextWithState(text, state){
        
    }
    updateInterpolatedElement(ref, originalText){
        let interpolations = this.getInterpolationsForInnerText(originalText);
        if(interpolations.length === 0) return;
        let interpolatedText = originalText;
        for(let interpolation of interpolations){
            const value = this.getValueOfInterpolation(interpolation);
            interpolatedText = interpolatedText.replace(interpolation, value);
        }

        
        ref.textContent = interpolatedText;

    }
    interpolateElement(element, interpolations){
        for(let interpolation of interpolations){
            let value = this.getValueOfInterpolation(interpolation);
            var text = element.innerText || element.textContent;
            text = text.replace(interpolation, value);
            if('innerText' in element){
                element.innerText = text;
                continue;
            }
            if('textContent' in element){
                element.textContent = text;
                continue;
            }
        }
        if('style' in element){
            element.style.display = 'block';
        }
        element.setAttribute('n-generated', 'true')
        return element;
    }
    executeInerpolationsOnElement(element){
        //This is going to be tricky. As we are getting the root element where nails js is bound 
        //to as an argument. Also, interpolation goes down the DOM. For example, consider following dom
        /*
            <html>
                <body>
                    <h1>{{title}}</h1> //works
                    <div>
                        <h2> {{title}} <h2> //works
                    <div>
                    <ul>
                       <li n-for="element of data">{{element.name}}</li> //works
                    <li>
                    <h1>{{ data }}</h1> // out of scope, render as undefined and print out waring
                 </body>

            </html>
        */

        for (const child of element.childNodes) {
            this.executeInerpolationsOnElement(child);
        }
        
        

        const interpolations =  this.getInterpolationsForInnerText(element.innerText || element.textContent);
       
        if(interpolations.length === 0){
            return; //No interpolations on this element
        }

        this.hideElement(element);
        
        if(element.nodeType === 3){
            element = element.parentNode;
            
        }
        for(var interpolation of interpolations){
            this.state.addActiveElement(element, this.getObjectReferenceByInterpolationName(interpolation), element.innerText || element.textContent, interpolation);
        }

        element.replaceWith(this.interpolateElement(element, interpolations));
        
        


    }

}