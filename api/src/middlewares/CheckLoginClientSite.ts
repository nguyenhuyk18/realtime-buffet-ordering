import jwt from 'jsonwebtoken';
import { Request , Response , NextFunction } from 'express';
// import { isArray } from 'util';
import CustomerService from '../services/CustomerService';
import ReservationService from '../services/ReservationService';
import cookieParser from "cookie-parser";

const isLoginSite = async (req : Request, res : Response , next : NextFunction )  => {
    const head  = req.cookies['client-login-site'];
    // console.log(req.cookies , 'middleware check login site');
    if(!head || Array.isArray(head)) {
        res.status(405).json({message : 'chưa đăng nhập mà đã vào đây rồi à !!!'})
        // console.log('yahhh')
        return;
    }

    

    try {
        const token: any= jwt.verify(head , process.env.KEY_JWT_CLIENT_SIDE );
        // console.log(token);
        next();
    }
    catch (err) {
        console.log(err);
        res.status(405).json({message : 'Token hết hạn rồi dẹt sơ !!!'})
        return;
    }
}

export default isLoginSite;