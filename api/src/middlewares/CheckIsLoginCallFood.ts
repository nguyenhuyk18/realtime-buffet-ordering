import jwt from 'jsonwebtoken';
import { Request , Response , NextFunction } from 'express';
// import { isArray } from 'util';
import CustomerService from '../services/CustomerService';
import ReservationService from '../services/ReservationService';

const isLoginCallFood = async (req : Request, res : Response , next : NextFunction )  => {
    const head  = req.headers['is-login-call-food'];

    if(!head || Array.isArray(head)) {
        res.status(405).json({message : 'chưa đăng nhập mà đã vào đây rồi à !!!'})
        // console.log('yahhh')
        return;
    }

    

    try {
        const token: any= jwt.verify(head , process.env.KEY_JWT_CALL_FOOD );
        // console.log(token);
        // console.log(token);
        const cusFound = await CustomerService.findByUsername(token.username);
        const listReservation = await ReservationService.getAll();

        let check = 0;

        for( const tmp of listReservation ) {
            if(tmp.customer_id == cusFound.id && tmp.status != 2 && tmp.status != 4) {
                ++check;
                break;
            }
        }

        if(check) {
            next();
        }
        else {
            res.status(405).json({message : 'Bạn đã checkout vui lòng không vào đây !!!'});
            return;
        }
    }
    catch (err) {
        console.log(err);
        res.status(405).json({message : 'Token hết hạn rồi dẹt sơ !!!'})
        return;
    }
}

export default isLoginCallFood;