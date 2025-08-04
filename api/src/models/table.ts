class table {
    id : number = null;
    name_table : string = null;
    capacity : number = null;
    floor_id : number = null;
    status : number = null; // 0: available, 1: reserved, 2: occupied

    constructor(id : number = null, name_table : string = null, capacity : number = null, floor_id : number = null, status : number = null) {
        this.id = id;
        this.name_table = name_table;
        this.capacity = capacity;
        this.floor_id = floor_id;
        this.status = status;
    }
}

export default table;