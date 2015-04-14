var Lib = Lib || {};

Lib.Module = class {

    constructor(title) {
        this.title = title;
    }

    message (message){
        return `your message: ${message}`;
    }

}

