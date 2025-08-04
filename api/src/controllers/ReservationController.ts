import { Request, Response } from 'express';
import ReservationService from '../services/ReservationService';
import reservation from '../models/reservation';
import TableService from '../services/TableService';
import FloorService from '../services/FloorService';
import CustomerService from '../services/CustomerService';
import customer from '../models/customer';
import table from '../models/table';
import floor from '../models/floor';
import dayjs from 'dayjs';

class ReservationController {
    static getAll = async (req: Request, res: Response) => {
        const findByStatus: any = req.query['trangthai'];
        console.log(findByStatus)
        let sql: string = null
        if (findByStatus) {
            sql = `  \`status\` != 2 and \`status\` != 4 and is_cancle = 0`;
        }
        const list: reservation[] = await ReservationService.getAll(sql);
        res.status(201).json(list);
    }


    static delete = async (req: Request, res: Response) => {
        const id: number = Number(req.params.id);
        const tmp = await ReservationService.find(id);
        if (!tmp) {
            res.status(404).json({ message: `Không tìm thấy đặt bàn với mã là ${id}` });
            return;
        }

        if (await ReservationService.delete(id)) {
            res.status(201).json({ message: `Xoá đặt bàn với mã là ${id} thành công !!` });
            return;
        }
        res.status(500).json({ message: `Xoá đặt bàn với mã là ${id} không thành công !!!` });
    }

    static findByID = async (req: Request, res: Response) => {
        const id: number = Number(req.params.id);
        const mreservation: reservation = await ReservationService.find(id);

        if (!mreservation) {
            res.status(404).json({ message: `Không tìm thấy đặt bàn với mã là ${id}` });
            return;
        }

        const mtable: table = await TableService.find(mreservation.table_id);
        const mfloor: floor = await FloorService.find(mtable.floor_id);
        const mcustomer: customer = await CustomerService.find(mreservation.customer_id);

        const information = {
            ...mreservation,
            table_name: mtable.name_table,
            floor_name: mfloor.name_floor,
            customer_name: mcustomer.name
        }

        res.status(201).json(information);
    }



    static store = async (req: Request, res: Response) => {
        const data = req.body;
        // console.log(data);
        if (!data?.customer_id || !data?.table_id || !data?.amount_cus || !data?.status || !data?.type_buffet) {
            res.status(400).json({ message: `Dữ liệu thêm không hợp lệ !!!` });
            return;
        }



        const staff_id: number = data.staff_id ?? null;
        const note: string = data.note ?? null;
        const reservationdate: string = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const total_price = data.total_price || null;


        const findTable: table = await TableService.find(data.table_id);

        // 1. kiểm tra bàn có đang trống hay không 
        if (findTable.status != 3) {
            res.status(400).json({ message: `Bàn này đang ở trạng thái ${findTable.status == 2 ? 'Đang Phục Vụ' : findTable.status == 1 ? 'Đã đặt trước' : ''}` });
            return;
        }


        // 2. kiểm tra xem khach hang đã đặt bàn trước chưa tránh đặt bàn hai lần 
        const reser: reservation[] = await ReservationService.getAll(` customer_id = ${data.customer_id}`);
        let item = 0;
        reser.forEach(row => {
            if (row.status != 2 && row.status != 4) {
                item++
            }
        });

        if (item) {
            res.status(400).json({ message: 'khách hàng này đã đặt bàn rồi không thể đặt bàn hai lần !!!' });
            return;
        }

        //bàn status số 1 là đã đặt trước
        //reser status số 1 là đã đặt rc
        if (data.status == 1) {
            findTable.status = 1;
        }

        //bàn status số 2 là đang phục vụ
        //reser status số 3 là đã đên
        if (data.status == 3) {
            findTable.status = 2;
        }



        //bàn status số 3 là trống
        //reser status số 2 là đã hủy
        let is_cancle = 0;
        if (data.status == 2) {
            is_cancle = 1
            findTable.status = 3
        }


        if (data.status == 4) {
            is_cancle = 1;
            findTable.status = 3;
        }

        const tmp: reservation = new reservation(null, data.customer_id, data.table_id, staff_id, reservationdate, data.amount_cus, note, data.status, total_price, data.type_buffet, is_cancle);

        await TableService.update(findTable);

        if ((await ReservationService.save(tmp))) {
            res.status(201).json({ message: `Thêm đặt bàn thành công !!` });
            return;
        }

        res.status(500).json({ message: `Thêm đặt bàn thất bại !!` });
    }

    static update = async (req: Request, res: Response) => {
        const data = req.body;

        const findTable: table = await TableService.find(data.table_id);

        if (!data?.amount_cus || !data?.status || !data?.type_buffet) {
            res.status(400).json({ message: `Không thể cập nhật vì thiếu dữ liệu !!!` });
            return;
        }

        const staff_id: number = data.staff_id ?? null;
        const note: string = data.note ?? null;
        const oldData: reservation = await ReservationService.find(Number(data.id));

        if (!oldData) {
            res.status(404).json({ message: `Không tìm thấy đặt bàn với id là ${data.id}` });
            return;
        }

        // oldData.customer_id = data.customer_id;
        // oldData.table_id = data.table_id;
        oldData.staff_id = staff_id;
        oldData.amount_cus = data.amount_cus;
        oldData.note = note;
        oldData.status = data.status;
        oldData.total_price = data.total_price ?? null;
        // console.log(data.status)

        // reservation này chưa hủy thì is_cancle màu phải bằng 0 và điều này cho phép chỉnh sửa status bên table
        if (!oldData.is_cancle) {
            //bàn status số 1 là đã đặt trước
            //reser status số 1 là đã đặt rc
            if (data.status == 1) {
                findTable.status = 1;
            }

            //bàn status số 2 là đang phục vụ
            //reser status số 3 là đã đên
            if (data.status == 3) {
                findTable.status = 2;
            }

            //bàn status số 3 là trống
            //reser status số 2 là đã hủy
            if (data.status == 2) {
                oldData.is_cancle = 1
                findTable.status = 3
            }


            if (data.status == 4) {
                oldData.is_cancle = 1;
                findTable.status = 3;
            }
        }

        await TableService.update(findTable);

        if (await ReservationService.update(oldData)) {
            res.status(201).json({ message: "Cập nhật đặt bàn thành công !!" });
            return;
        }
        res.status(500).json({ message: "Cập nhật đặt bàn không thành công !!!" });
        // return;
    }

}

export default ReservationController;