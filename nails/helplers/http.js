class RestForm {
    constructor(object) {
        this.xhr = new XMLHttpRequest(); // the constructor has no arguments

        if (object.hasOwnProperty("methods")) {
            if (Array.isArray(object.methods)) {
                for (let methode of object.methods) {
                    this.methods = [];
                    this.methods.push(methode);
                }
            }
        }
        if (object.hasOwnProperty('isArray')) {
            this.isArray = object.isArray;
        }
        if (object.hasOwnProperty('url')) {
            this.url = object.url;
        }
    }

    save(data) {

    }
    update(data) {

    }
    get(callback, user, password) {
        //Assume, that the url is correct and the dev follows RFC we can just do a GET on this.
        this.xhr.open("GET", this.url, false, user ? user : undefined, password ? password : undefined);
        this.xhr.send();
        this.xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.error(xhr.responseText);
            }

        }

    }
    getOne(descriptor) {

    }

}