class comment {
    id : number = null;
    email : string = null;
    fullname : string = null;
    product_id : number = null;
    created_date : string = null;
    description : string = null;
    star : number = null;

    constructor(id : number = null, product_id : number = null, email : string = null, fullname : string = null, star : number = null, created_date : string = null, description : string = null) {
        this.id = id;
        this.product_id = product_id;
        this.email = email;
        this.fullname = fullname;
        this.star = star;
        this.created_date = created_date;
        this.description = description;
    }

}

export default comment;
