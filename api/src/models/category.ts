class category {
     id : number = null;
     name_category : string = null;

    constructor(id : number = null, name_category : string = null) {
        this.id = id;
        this.name_category = name_category;
    }

    getterId() : number {
        return this.id;
    }

    getterNameCategory() : string {
        return this.name_category;
    }

    setterId(id : number) : void {
        this.id = id;
    }

    setterNameCategory(name_category : string) : void {
        this.name_category = name_category;
    }
}

export default category;