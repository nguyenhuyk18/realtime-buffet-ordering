class permission {
    role_id : number = null;
    action_id : number = null;

    constructor(role_id : number = null, action_id : number = null) {
        this.role_id = role_id;
        this.action_id = action_id;
    }
}

export default permission;