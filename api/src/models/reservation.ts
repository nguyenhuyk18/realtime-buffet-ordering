class reservation {
    id : number = null;
    customer_id : number = null;
    table_id : number = null;
    staff_id : number = null;
    reservation_date : string = null;
    amount_cus : number = null; 
    note : string = null;
    status : number = null;
    total_price : number = null;
    type_buffet : number  = null;
    is_cancle : number = null;

    constructor(id : number = null, customer_id : number = null, table_id : number = null, staff_id : number = null, reservation_date : string = null, amount_cus : number = null, note : string = null, status : number = null , total_price : number = null , type_buffet : number = null , is_cancle : number = null) {
        this.id = id;
        this.customer_id = customer_id;
        this.table_id = table_id;
        this.staff_id = staff_id;
        this.reservation_date = reservation_date;
        this.amount_cus = amount_cus;
        this.note = note;
        this.status = status;
        this.total_price = total_price;
        this.type_buffet = type_buffet;
        this.is_cancle = is_cancle;
    }
}

export default reservation;