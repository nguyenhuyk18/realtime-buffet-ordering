class call_food {
    id : number = null;
    id_food : number = null;
    id_table : number = null;
    status : number = null;
    number : number = null;
    name_food : string = null;
    name_table : string = null;
    name_floor : string = null;

    constructor (    id : number = null,
    id_food : number = null,
    id_table : number = null,
    status : number = null,
    number : number = null,
    name_food : string = null,
    name_table : string = null,
    name_floor : string = null) {
        this.id = id;
        this.id_food = id_food;
        this.id_table = id_table;
        this.status = status;
        this.number = number;
        this.name_food = name_food;
        this.name_table = name_table;
        this.name_floor = name_floor;
    }
}

export default call_food