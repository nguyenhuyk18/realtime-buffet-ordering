class action {
    id : number = null;
    name_action : string = null;
    description : string = null;

    constructor(id : number = null, name_action : string = null, description : string = null) {
        this.id = id;
        this.name_action = name_action;
        this.description = description;
    }

    getterId() : number {
        return this.id;
    }

    getterNameAction() : string {
        return this.name_action;
    }

    getterDescription() : string {
        return this.description;
    }


    setterId(id : number) : void {
        this.id = id;
    }

    setterNameAction(name_action : string) : void {
        this.name_action = name_action;
    }

    setterDescription(description : string) : void {
        this.description = description;
    }
}

export default action;
