import { Request, Response } from 'express';
import customer from '../models/customer';
import CustomerService from '../services/CustomerService';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';

class CustomerController {
    static index = async (req: Request, res: Response) => {
        const listCustomer = await CustomerService.getAll();
        res.status(200).json(listCustomer);
    }

    // static detail = async (req: Request, res: Response) => {
    //     const id = req.params.id;
    //     const cus = await CustomerService.find(id);
    //     if (!cus) {
    //         req.session.message = {
    //             mess: `Không tìm thấy khách hàng với id ${id}`,
    //             type: 'danger'
    //         }
    //         req.session.save(() => {
    //             res.redirect('/admin/customer.html');
    //         })
    //         return;
    //     }
    //     const mProvince = new province();
    //     const mDistrict = new district();
    //     const mWard = new ward();
    //     // lấy ra tỉnh thành, quận, phường id của người dùng
    //     const id_ward = cus.ward_id;
    //     const war = await mWard.find(id_ward);
    //     const dis = await mDistrict.find(war.district_id);
    //     const pro = await mProvince.find(dis.province_id);
    //     // lấy ra danh sách province
    //     // const listProvince = await mProvince.getAll();
    //     // // laays ra danh sach district
    //     // const listDistrict = await mDistrict.findByProvinceID(pro.id);
    //     // // lay ra danh sach phuong
    //     // const listWard = await mWard.findByDistrictID(dis.id);
    //     return res.render('admin/customer/detailcustomer', { customer: cus, id_ward: id_ward, id_district: war.district_id, id_province: pro.id, province: pro.name, district: dis.name, ward: war.name });
    // }

    static delete = async (req : Request, res: Response) => {
        const id : number = Number(req.params.id);

        const cus = await CustomerService.find(id);
        const name = cus.name;

        if (!cus) {
            res.status(404).json({ message: `Không tìm thấy khách hàng với id ${id}` });
            return;
        }

        if (await CustomerService.destroy(id)) {
            res.status(201).json({ message: `Xóa khách hàng ${name} thành công !!` });
            return;
        }

        res.status(500).json({ message: `Xóa khách hàng ${name} thất bại !!` });
    }

    static update = async (req: Request, res: Response) => {
        const data : any = req.body;

        const oldData : customer = await CustomerService.find(data.id);

        // kiểm tra dữ liệu bắt buộc
        if (!data?.id || !data?.name || !data?.phone || !data?.email || !data?.ward_id || !data?.housenumber_street || !data?.username) {
            res.status(400).json({ message: 'Cập nhật khách hàng thất bại vì dữ liệu không hợp lệ !!' });
            return;
        }

        if (!oldData) {
            res.status(404).json({ message: `Không tìm thấy khách hàng với id ${data.id}` });
            return;
        }

        // kiểm tra có trùng tên đăng nhập
        // nếu tên đăng nhập mới khác với tên đăng nhập cũ thì mới kiểm tra trùng
        if( await CustomerService.findByUsername(data.username) && oldData.username !== data.username) {
            res.status(409).json({ message: `Tên đăng nhập ${data.username} đã tồn tại` });
            return;
        }

        // kiểm tra có trùng email
        // nếu email mới khác với email cũ thì mới kiểm tra trùng
        if(await CustomerService.findByEmail(data.email) && oldData.email !== data.email) {
            res.status(409).json({ message: `Email ${data.email} đã tồn tại` });
            return;
        }
        
        oldData.name = data.name;
        oldData.phone = data.phone;
        oldData.email = data.email;
        oldData.ward_id = data.ward_id;
        oldData.status = data.status;
        oldData.housenumber_street = data.housenumber_street;
        // oldData.password = data.password;
        oldData.username = data.username;
        

        if (!(await CustomerService.update(oldData))) {
            res.status(500).json({ message: `Cập nhật khách hàng ${oldData.name} thất bại !!` });
            return;
        }       

        res.status(201).json({ message: `Cập nhật khách hàng ${oldData.name} thành công !!` });
    }

    static store = async (req: Request, res: Response) => {
        const data = req.body;

        // kiểm tra dữ liệu bắt buộc
        if (!data?.name || !data?.phone || !data?.email || !data?.ward_id || !data?.housenumber_street || !data?.username) {
            res.status(400).json({ message: 'Thêm khách hàng thất bại vì dữ liệu không hợp lệ !!' });
            return;
        }
        
        // kiểm tra có trùng tên đăng nhập 
        if (await CustomerService.findByUsername(req.body.username)) {
            res.status(409).json({ message: `Tên đăng nhập ${req.body.username} đã tồn tại` });
            return;
        }

        //  kiểm tra co trùng email không
        if (await CustomerService.findByEmail(req.body.email)) {
            res.status(409).json({ message: `Email ${req.body.email} đã tồn tại` });
            return;
        }
        
        data.created_date = dayjs().format('YYYY-MM-DD HH:mm:ss');

        // set mk mặc định
        const password = '111';
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        data.password = hash;

        const newCustomer : customer = new customer(
            data.id,
            data.name,
            data.phone,
            data.email,
            data.ward_id,
            data.created_date,
            data.status,
            data.housenumber_street,
            data.password,
            data.username
        );

        if (!(await CustomerService.save(newCustomer))) {
            res.status(500).json({ message: `Thêm khách hàng ${data.name} thất bại !!` });
            return;
        }
        res.status(201).json({ message: `Thêm khách hàng ${data.name} thành công !!` });
        return;
    }

    static find = async (req : Request , res : Response) => {
        const id : number = Number(req.params.id);
        const tmp : customer = await CustomerService.find(id);
        // console.log(tmp)
        if(tmp) {
            res.status(201).json(tmp);
            return;
        }
        res.status(404).json({message : 'Không tìm thấy khách hàng'});
    }

    
}

export default CustomerController