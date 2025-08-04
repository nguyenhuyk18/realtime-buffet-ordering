class brand {
    id: number = null;
    name_brand : string = null;

    constructor(id : number = null, name_brand : string = null) {
        this.id = id;
        this.name_brand = name_brand;
    }

    getterId() : number {
        return this.id;
    }

    getterNameBrand() : string {
        return this.name_brand;
    }

    setterId(id : number) : void {
        this.id = id;
    }

    setterNameBrand(name_brand : string) : void {
        this.name_brand = name_brand;
    }
}

export default brand;