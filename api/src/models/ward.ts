class ward {
    id : string = null;
    name : string = null;
    type : string = null;
    district_id : string = null;

    constructor(id : string = null, name : string = null, type : string = null, district_id : string = null) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.district_id = district_id;
    }
}

export default ward;