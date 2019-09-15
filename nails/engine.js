'use strict';

class RenderingEngine {
    state;
    directives;
    constructor(state) {
        if (typeof state === 'undefined' || state === null) {
            console.log("Engine was initialized without a state");
        }
        this.state = state;
        this.directives = new NailsDirectives();

    }

    setTitle() {
        if (typeof this.state.data.title !== 'undefined' || this.state.data.title === null) {
            document.title = this.state.data.title;
        }
    }
    isNForActivated(element) {
        return element.getAttribute('n-for') !== null;
    }

    disableInterpolationForVariableNameOnElement(name, element) {
        if (typeof name === 'undefined' || typeof element === 'undefined') return;
        for (let el of this.state.disabledElements) {
            if (el[0] == name && el[1] == element) {
                return;
            }
        }
        this.state.disabledElements.push([name, element]);
    }
    getElementDerrivedObject(element) {
        return 'object'
    }
    getElementDerrivedProperty(element) {
        return 'property'
    };
    getForArrayByStatement(statement) {
        return statement.split(' ').last;
    }
    isForAttribute(element) {
        element = element[0];
        if ('getAttribute' in element) {
            return element.getAttribute('n-for') !== null;
        } else {
            return false;
        }
    }
    isActiveElement(element) {
        return this.getElementDirectives(element).length > 0;
    }

    removePrefix(directive) {
        return directive.substring(2)
    }
    prefixDiretive(directive) {
        return 'n-' + directive;
    }
    getElementDirectives(element) {
        if (typeof element === 'undefined') {
            return [];
        }
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
        this.state.disableElementIfNeeded(element);
        let activeElements = [];
        for (let child of element.childNodes) {
            let active = this.indexElement(child);
            activeElements.push.apply(activeElements, active);
        }
        if (this.isActiveElement(element)) {
            activeElements.push(element);
        }

        return activeElements;
    }

    getElementAttributeForDirective(element, directive) {
        directive = this.prefixDiretive(directive);
        if (element.hasAttribute(directive)) {
            return element.getAttribute(directive);
        } else {
            console.warn('directive: ' + directive + ' not found on element: ' + element);
            return '';
        }
    }
    executeDirectivesOnElement(element) {
        var directives = this.getElementDirectives(element);
        for (let directive of directives) {
            directive = this.removePrefix(directive);
            if (directive in this.directives) {
                this.directives[directive](element, this.getElementAttributeForDirective(element, directive), this.state)
            } else {
                console.warn('not found directive: ' + directive)
            }
        }
    }




    stripAndTrimNForInterpolation(interpolation) {
        interpolation = interpolation.replace('[[[', '');
        interpolation = interpolation.replace(']]]', '');
        interpolation = interpolation.trim();
        return interpolation;
    }

    getNForInterpolations(content) {
        const interpolations = [];
        content = content.trim();
        var matches = content.match(/\[\[\[(( +)?\w+.?\w+( +)?)\]\]\]/g);
        if (matches === null) return interpolations;
        for (const match of matches) {
            interpolations.push(match);
        }

        return interpolations;
    }
    getNForInterpolation(interpolation) {
        interpolation = interpolation.trim();
        if (interpolation.match(/\[\[\[(( +)?\w+.?\w+( +)?)\]\]\]/g)) {
            interpolation = this.stripAndTrimNForInterpolation(interpolation);
        } else {
            console.warn('Not found interpolation in submitted value: ' + interpolation);
            return interpolation;
        }

        return interpolation;

    }
    getValueOfInterpolation(interpolation) {
        // This comes in the format of {{ interpolation }}
        interpolation = interpolation.trim();
        if (interpolation.match(/{{(( +)?\w+.?\w+( +)?)}}/g)) {
            interpolation = this.stripAndTrimInterpolation(interpolation);
        } else {
            console.warn('Not found interpolation in submitted value: ' + interpolation);
            return interpolation;
        }
        interpolation = interpolation.trim();
        if (interpolation.split('.').length > 1) {
            //Worst case, user uses somehting like
            // object.attribute.item.prop;
            // we need to handle that.
            return "[[[" + interpolation + "]]]";
            return eval('this.state.data.' + interpolation); // TODO: Better and safer way
        } else {
            return this.state.data[interpolation];
        }
    }

    removeWhiteSpaceFromString(str) {
        return str.replace(/\s/g, "");
    }
    stripAndTrimInterpolation(interpolation) {
        if(typeof interpolation === 'undefined' || typeof interpolation === null) return interpolation;        
        interpolation = interpolation.replace('{{', '');
        interpolation = interpolation.replace('}}', '');
        interpolation = interpolation.trim();
        return interpolation;
    }
    getInterpolationsFortextContent(text) {
        const interpolations = [];
        if (typeof text === 'undefined' || text === null) return interpolations;
        //text may come in this format 'hi, this is {{test}} and this is {{abc}}'
        var matches = text.match(/{{(( +)?\w+.?\w+( +)?)}}/g);
        if (matches === null) return [];
        for (let match of matches) {
            interpolations.push(match);
        }
        return interpolations;
    }
    getObjectReferenceByInterpolationName(interpolation) {
        interpolation = this.stripAndTrimInterpolation(interpolation);
        return this.state.data[interpolation]; //Handle interpolations with . inside
    }

    interpolateOnTextWithState(text, state) {

    }
    getContentOfNodeIfTextNodeExists(node) {
        if (node.nodeType === 3) {
            return node.nodeValue;
        }
        if (node.childNodes.length === 0) return null;
        if (this.nodeHasTextNodeAsADirectChild(node)) {
            for (let child of node.childNodes) {
                if (this.getContentOfNodeIfTextNodeExists(child) !== null) {
                    return this.getContentOfNodeIfTextNodeExists(child);
                }
            }
        }
    }

    setContentOfTextNode(node, value) {
        if (node.nodeType !== 3) {
            console.error('setContentOfTextNode... this implies that you *HAVE* to provide nothing else than a textNode as argument.');
            return false;
        }
        node.nodeValue = value;
        return true;
    }
    updateInterpolatedElement(ref, originalText) {
        this.executeDirectivesOnElement(ref);
        let interpolations = this.getInterpolationsFortextContent(originalText);
        if (interpolations.length === 0) return;
        let interpolatedText = originalText;
        for (let interpolation of interpolations) {
            const value = this.getValueOfInterpolation(interpolation);

            if (this.isElementDisabled(this.stripAndTrimInterpolation(interpolation), ref)) {
                continue;
            }

            interpolatedText = interpolatedText.replace(interpolation, value);
        }

        


        ref.textContent = interpolatedText;

    }
    isDescendant(parent, child) {

        var node = child.parentNode;
        while (node != null) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    isElementDisabled(name, element) {
        for (let disabled of this.state.disabledElements) {

            if (this.isDescendant(element, disabled[1]) || this.isDescendant(disabled[1], element)) {
                if (name.includes(disabled[0])) return true; //Edge case, we have a f***ing scope
            }
            if (disabled[0] === name && disabled[1] === element) {
                return true;
            }
        }
        return false;
    }
    interpolateElement(element, interpolations) {

        for (let interpolation of interpolations) {
            this.state.disableElementIfNeeded(element);
            let value = this.getValueOfInterpolation(interpolation);
            if (this.isElementDisabled(this.stripAndTrimInterpolation(interpolation).trim(), element)) {
                continue;
            }

            var text = element.textContent || element.textContent;
            text = text.replace(interpolation, value);
            if ('textContent' in element) {
                element.textContent = text;
                continue;
            }
            if ('textContent' in element) {
                element.textContent = text;
                continue;
            }
        }
        return element;
    }

    nodeHasTextNodeAsAChild(element) {
        if (element.nodeType === 3) return true;
        if (element.childNodes.length === 0) return false;
        return this.nodeHasTextNodeAsAChild(element);
    }

    nodeHasTextNodeAsADirectChild(element) {
        for (let child of element.childNodes) {
            if (child.nodeType === 3) {
                return true;
            }
        }
        return false;
    }
    isTextNode(element) {
        return element.nodeType === 3;
    }
    sanitize(string) {
        if(typeof string !== 'string') return string;
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            "/": '&#x2F;',
            "`" : "&grave;"
        };
        const reg = /[&<>"'`/]/ig;
        return string.replace(reg, (match)=>(map[match]));
      }

    executeInerpolationsOnElement(element) {

        for (const child of element.childNodes) {
            this.executeInerpolationsOnElement(child);
        }

        const interpolations = this.getInterpolationsFortextContent(element.nodeValue);

        if (this.isTextNode(element)) {
            //Interpolation should only happen on a text node. Otherwise, DOM may be damaged. 

            if (interpolations.length === 0) {
                return; //No interpolations on this element
            }


            if (element.nodeType !== 3) {
                return;
            }

            for (var interpolation of interpolations) {

                this.state.addActiveElement(element, this.getObjectReferenceByInterpolationName(interpolation), element.nodeValue, interpolation);
            }
            this.interpolateElement(element, interpolations);
        } else {
            //Special case: Nfor. We do have to add them, but if this else getts extended for some reason, reconsider this.
            if(!this.isNForActivated(element)) return;

            var interpolation = "{{" + element.getAttribute('n-for').split(' ')[3] + "}}"
            this.state.addActiveElement(element, element.getAttribute('n-for').split(' ')[3], null, interpolation);


        }
    }





}