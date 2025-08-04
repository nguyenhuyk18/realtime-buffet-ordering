class customer {
    id : number = null;
    name : string = null;
    phone : string = null;
    email : string = null;
    ward_id : string = null;
    created_date : string = null;
    status : number = null;
    housenumber_street : string = null;
    password : string = null;
    username : string = null;

    constructor(id : number = null, name : string = null, phone : string = null, email : string = null, ward_id : string = null, created_date : string = null, status : number = null, housenumber_street : string = null, password : string = null, username : string = null) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.ward_id = ward_id;
        this.created_date = created_date;
        this.status = status;
        this.housenumber_street = housenumber_street;
        this.password = password;
        this.username = username;
    }

    getterId() : number {
        return this.id;
    }

    getterName() : string {
        return this.name;
    }

    getterPhone() : string {
        return this.phone;
    }

    getterEmail() : string {
        return this.email;
    }

    getterWardId() : string {
        return this.ward_id;
    }

    getterCreatedDate() : string {
        return this.created_date;
    }

    getterStatus() : number {
        return this.status;
    }

    getterHousenumberStreet() : string {
        return this.housenumber_street;
    }


    getterPassword() : string {
        return this.password;
    }

    getterUsername() : string {
        return this.username;
    }

    setterId(id : number) : void {
        this.id = id;
    }

    setterName(name : string) : void {
        this.name = name;
    }

    setterPhone(phone : string) : void {
        this.phone = phone;
    }

    setterEmail(email : string) : void {
        this.email = email;
    }

    setterWardId(ward_id : string) : void {
        this.ward_id = ward_id;
    }

    setterCreatedDate(created_date : string) : void {
        this.created_date = created_date;
    }

    setterStatus(status : number) : void {
        this.status = status;
    }

    setterHousenumberStreet(housenumber_street : string) : void {
        this.housenumber_street = housenumber_street;
    }


    setterPassword(password : string) : void {
        this.password = password;
    }

    setterUsername(username : string) : void {
        this.username = username;
    }

}

export default customer;