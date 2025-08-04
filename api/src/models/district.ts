class district {
    id : string = null;
    name : string = null;
    type : string = null;
    province_id : string = null;

    constructor(id : string = null, name : string = null, type : string = null, province_id : string = null) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.province_id = province_id;
    }

    getterId() : string {
        return this.id;
    }

    getterName() : string {
        return this.name;
    }

    getterType() : string {
        return this.type;
    }

    getterProvinceId() : string {
        return this.province_id;
    }

    setterId(id : string) : void {
        this.id = id;
    }   

    setterName(name : string) : void {
        this.name = name;
    }

    setterType(type : string) : void {
        this.type = type;
    }

    setterProvinceId(province_id : string) : void {
        this.province_id = province_id;
    }

}

export default district;