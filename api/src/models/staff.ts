class staff {
    id : number = null;
    role_id : number = null;
    name : string = null;
    mobile : string = null;
    username : string = null;
    password : string = null;
    email : string = null;
    is_active : number = null;
    avatar : string = null;
    name_role : string = null;

    constructor(id : number = null, role_id : number = null, name : string = null, mobile : string = null, username : string = null, password : string = null, email : string = null, is_active : number = null, avatar : string = null , name_role : string = null) {
        this.id = id;
        this.role_id = role_id;
        this.name = name;
        this.mobile = mobile;
        this.username = username;
        this.password = password;
        this.email = email;
        this.is_active = is_active;
        this.avatar = avatar;
        this.name_role = name_role;
    }
}

export default staff;
