class State{
    data = {};
    methodes = {};
    element = null;
    activeElements = [];
    instance = null;
    getInstance(){
        if(this.instance === null){
            this.instance = new State();
        }
        return this.instance;
    }
    constructor(){
    }

    updateElementRefByObject(object, ref){
        for(let element of this.activeElements){
            if(element[1] === object){
                element[0] = ref;
            }
        }
    }

    addActiveElement(ref, object, content, interpolation){
        this.activeElements.push([ref, object, content, interpolation]);
    }
    
    findElementByRef(ref){
        for (const element of this.activeElements) {
            if(element[0] === ref) return element;
        }
    }
    getHtmlReferenceOfStateElement(element){
        return element[0];
    }
    stripAndTrimInterpolation(interpolation){
        interpolation = interpolation.replace('{{', '');
        interpolation = interpolation.replace('}}', '');
        interpolation = interpolation.trim();
        return interpolation;
    }

    findElementsByObject(obj, prop){
        let elements = [];
        for (const element of this.activeElements) {
            if(this.stripAndTrimInterpolation(element[3]) === prop){
                elements.push(element);
            }
        }
        return elements;
    }
}