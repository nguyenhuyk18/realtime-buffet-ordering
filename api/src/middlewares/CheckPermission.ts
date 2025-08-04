import jwt from 'jsonwebtoken';
import { Request , Response , NextFunction } from 'express';

type payload = {
    role_id : number,
    fullname  : string,
    name_action : string[]
}

const checkPermission = (CurrentAction : string) => {
    return (req : Request , res : Response , next : NextFunction) => {
        // Tạm thời để như thế này !!!!
        // next();

        const tmp = req.headers['authorization'];
        
        // console.log( '112' , tmp);

        if(!tmp) {
            res.status(407).json({message : 'Bạn chưa đăng nhập, vui lòng đăng nhập mới được truy cập vào đây'});
            return;
        }

        const token = tmp.split(' ')[1];
        try {
            const data = jwt.verify(token , process.env.KEY_ACCESS_TOKEN);
            const payload = data as payload;
            const allAction : string[] = payload.name_action;
            if(allAction.includes(CurrentAction)) {
                next();
                return;
            }
            res.status(403).json({message : 'Bạn không có đủ thẩm quyền !!!' });
            return;
        }
        catch (err) {
            res.status(401).json({
                type : 'AccessExpired',
            })
            return;
        }
    }
}

export default checkPermission;