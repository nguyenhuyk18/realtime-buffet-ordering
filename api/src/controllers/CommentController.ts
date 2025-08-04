import comment from "../models/comment";
import { Request, Response } from "express";
import CommentService from "../services/CommentService";
import ProductService from "../services/ProductService";
import dayjs from "dayjs";

class CommentController {
    static index = async (req : Request, res : Response) => {
        const listComment = await CommentService.getAll();
        res.status(201).json( listComment );
    }

    static delete = async (req : Request, res : Response) => {
        const id : number = Number(req.params.id);

        const oldData = await CommentService.find(id);
        if (!oldData) {
            res.status(404).json({ message: `Bình luận này không được tìm thấy với mã là ${id}` });
            return;
        }

        if (await CommentService.destroy(id)) {
            res.status(201).json({ message: `Xóa bình luận thành công với mã là ${id}` });
            return;
        }

        res.status(500).json({ message: `Xóa bình luận không thành công !!` });
        return;
    }

    static save = async (req : Request, res : Response) => {
        const data = req.body;

        if (!data?.email || !data?.fullname || !data?.star || !data?.description || !data?.product_id) {
            res.status(400).json({ message: `Dữ liệu không hợp lệ !!!` });
            return;
        }

        data.created_date = dayjs().format('YYYY-MM-DD HH:mm:ss');

        const tmp : comment = new comment(
            null,
            data.product_id,
            data.email,
            data.fullname,
            data.star,
            data.created_date,
            data.description
        );

        if (await CommentService.save(tmp)) {
            res.status(201).json({ message: `Thêm bình luận thành công !!!` });
            return;
        }

        res.status(500).json({ message: `Thêm bình luận không thành công !!!` });
        return;
    }

    static find = async (req : Request, res : Response) => {
        const id : number = Number(req.params.id);

        const tmp : comment = await CommentService.find(id);
        if (!tmp) {
            res.status(404).json({ message: `Bình luận này không được tìm thấy với mã là ${id}` });
            return;
        }

        res.status(200).json({ comment: tmp });
        return;
    }

    static update = async (req : Request, res : Response) => {
        const data = req.body;

        // kiểm tra dữ liệu
        if (!data?.id || !data?.email || !data?.fullname || !data?.star || !data?.description) {
            res.status(400).json({ message: `Dữ liệu không hợp lệ !!!` });
            return;
        }

        if(!(await CommentService.find(Number(data.id)))) {
            res.status(404).json({ message: `Không tìm thấy comment có id là ${data.id}` });
            return
        }

        const tmp : comment = new comment(
            data.id,
            null ,
            data.email,
            data.fullname,
            data.star,
            null ,
            data.description
        );

        if (await CommentService.update(tmp)) {
            res.status(200).json({ message: `Cập nhật bình luận thành công !!!` });
            return;
        }

        res.status(500).json({ message: `Cập nhật bình luận không thành công !!!` });
        return;
    }

    static findByProductID = async (req : Request , res : Response) => {
        const id_product : number = Number(req.params.id_product);

        if(!(await ProductService.findByID(id_product))) {
            res.status(404).json({message : `Không tìm thấy sản phẩm có id là ${id_product}`});
            return;
        }
        
        const listComment = await CommentService.findByProductID(id_product);

        res.status(201).json(listComment);

    }
}

export default CommentController;