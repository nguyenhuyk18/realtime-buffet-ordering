import express, { Request, Response, Router } from 'express';


// Import Controller
import ActionController from '../controllers/ActionController';
import RoleController from '../controllers/RoleController';
import BrandController from '../controllers/BrandController';
import CategoryController from '../controllers/CategoryController';
import CustomerController from '../controllers/CustomerController';
import StaffController from '../controllers/StaffController';
import WardController from '../controllers/WardController';
import DistrictController from '../controllers/DistrictController';
import ProvinceController from '../controllers/ProvinceController';
import ProductController from '../controllers/ProductController';
import CommentController from '../controllers/CommentController';
import FloorController from '../controllers/FloorController';
import TableController from '../controllers/TableController';
import ReservationController from '../controllers/ReservationController';
import PermissionController from '../controllers/PermissionController';
import AuthController from '../controllers/AuthController';

// Import Middlewares
import { UploadAvatarStaff, checkIDStaff } from '../middlewares/UploadAvartar';
import { UploadImageProduct } from '../middlewares/UploadProduct';
import checkPermission from '../middlewares/CheckPermission';
import isLoginCallFood from '../middlewares/CheckIsLoginCallFood';
import CallFoodController from '../controllers/CallFoodController';
import isLoginSite from '../middlewares/CheckLoginClientSite';


// Set up router
const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('XIN CHÀO BẠN ĐẾN VỚI API CỦA TÔI , ĐỪNG HACK NÓ NHÉ VÌ HỆ THỐNG BẢO MẬT NÓ RẤT MẠNH HEHEHEHEHE , COPYRIGHT BY NGUYỄN ĐỨC HUY @2025 !!')
})

// action
router.get('/api/v1/admin/action', checkPermission('view_action'), ActionController.index);
router.get('/api/v1/admin/action/:id', checkPermission('view_action'), ActionController.find);

// role
router.get('/api/v1/admin/role', checkPermission('view_role'), RoleController.index);
router.get('/api/v1/admin/role/:id', checkPermission('view_role'), RoleController.find);
router.post('/api/v1/admin/role', checkPermission('add_staff'), RoleController.store);
router.put('/api/v1/admin/role', checkPermission('edit_role'), RoleController.edit);
router.delete('/api/v1/admin/role/:id', checkPermission('delete_role'), RoleController.delete);


// brand
router.get('/api/v1/admin/brand', checkPermission('view_brand'), BrandController.index);
router.get('/api/v1/admin/brand/:id', checkPermission('view_brand'), BrandController.find);
router.post('/api/v1/admin/brand', checkPermission('add_brand'), BrandController.store);
router.put('/api/v1/admin/brand', checkPermission('edit_brand'), BrandController.update);
router.delete('/api/v1/admin/brand/:id', checkPermission('delete_brand'), BrandController.delete);

// category
router.get('/api/v1/admin/category', checkPermission('view_category'), CategoryController.index);
router.get('/api/v1/admin/category/:id', checkPermission('view_category'), CategoryController.find);
router.post('/api/v1/admin/category', checkPermission('add_category'), CategoryController.store);
router.put('/api/v1/admin/category', checkPermission('edit_category'), CategoryController.update);
router.delete('/api/v1/admin/category/:id', checkPermission('delete_category'), CategoryController.delete);


// customer
router.get('/api/v1/admin/customer', checkPermission('view_customer'), CustomerController.index);
router.get('/api/v1/admin/customer/:id', checkPermission('view_customer'), CustomerController.find);
router.post('/api/v1/admin/customer', checkPermission('add_customer'), CustomerController.store);
router.put('/api/v1/admin/customer', checkPermission('edit_customer'), CustomerController.update);
router.delete('/api/v1/admin/customer/:id', checkPermission('delete_customer'), CustomerController.delete);



// staff
router.get('/api/v1/admin/staff', checkPermission('view_staff'), StaffController.index);
router.get('/api/v1/admin/staff/:id', checkPermission('view_staff'), StaffController.find);
router.post('/api/v1/admin/staff', checkPermission('add_staff'), StaffController.store);
router.put('/api/v1/admin/staff', checkPermission('edit_staff'), StaffController.update);
router.delete('/api/v1/admin/staff/:id', checkPermission('delete_staff'), StaffController.delete);
router.get('/api/v1/admin/avatar-staff/:id', StaffController.getImageStaff);
router.post('/api/v1/admin/avatar-staff/:id', checkPermission('add_staff'), checkIDStaff, UploadAvatarStaff.single('avatarstaff'), StaffController.uploadImageStaff);

// product 
router.get('/api/v1/admin/product', checkPermission('view_product'), ProductController.index);
router.get('/api/v1/admin/product/:id', checkPermission('view_product'), ProductController.find);
router.post('/api/v1/admin/product', checkPermission('add_product'), UploadImageProduct.single('imageproduct'), ProductController.store);
router.put('/api/v1/admin/product', checkPermission('edit_product'), UploadImageProduct.single('imageproduct'), ProductController.update);
router.delete('/api/v1/admin/product/:id', checkPermission('delete_product'), ProductController.delete);
router.get('/api/v1/admin/image-product/:id', ProductController.returnImageProduct);
// client cần xem sản phẩm phải đăng nhập trước
router.get('/api/v1/client/product', isLoginCallFood, ProductController.paginationIndex);

// comment
router.get('/api/v1/admin/comment', checkPermission('view_comment'), CommentController.index);
router.get('/api/v1/admin/comment/:id', checkPermission('view_comment'), CommentController.find);
router.post('/api/v1/admin/comment', checkPermission('add_customer'), CommentController.save);
router.put('/api/v1/admin/comment', checkPermission('edit_customer'), CommentController.update);
router.delete('/api/v1/admin/comment/:id', checkPermission('delete_comment'), CommentController.delete);
router.get('/api/v1/admin/comment-product/:id_product', checkPermission('view_comment'), CommentController.findByProductID);

// ward 
router.get('/api/v1/admin/ward', WardController.getAll);
router.get('/api/v1/admin/ward/:id', WardController.find);
router.get('/api/v1/admin/ward-by-district/:id_district', WardController.getByDistrictID);


// district
router.get('/api/v1/admin/district', DistrictController.getAll);
router.get('/api/v1/admin/district/:id', DistrictController.find);
router.get('/api/v1/admin/district-by-province/:id_province', DistrictController.getByProvinceID);

// province 
router.get('/api/v1/admin/province', ProvinceController.getAll);
router.get('/api/v1/admin/province/:id', ProvinceController.find);


// floor 
router.get('/api/v1/admin/floor', checkPermission('view_floor'), FloorController.getAll);
router.get('/api/v1/admin/floor/:id', checkPermission('view_floor'), FloorController.findByID);
router.post('/api/v1/admin/floor', checkPermission('add_floor'), FloorController.store);
router.delete('/api/v1/admin/floor/:id', checkPermission('delete_floor'), FloorController.delete);
router.put('/api/v1/admin/floor', checkPermission('edit_floor'), FloorController.update);

// table
router.get('/api/v1/admin/table', checkPermission('view_table'), TableController.getAll);
router.get('/api/v1/admin/table/:id', checkPermission('view_table'), TableController.findByID);
router.get('/api/v1/admin/table-floor/:floor_id', checkPermission('view_table'), TableController.findByFloorID);
router.post('/api/v1/admin/table', checkPermission('add_table'), TableController.store);
router.put('/api/v1/admin/table', checkPermission('edit_table'), TableController.update);
router.delete('/api/v1/admin/table/:id', checkPermission('delete_table'), TableController.delete);


// reservation
router.get('/api/v1/admin/reservation', checkPermission('view_reservation'), ReservationController.getAll);
router.get('/api/v1/admin/reservation/:id', checkPermission('view_reservation'), ReservationController.findByID);
router.post('/api/v1/admin/reservation', checkPermission('add_reservation'), ReservationController.store);
router.put('/api/v1/admin/reservation', checkPermission('edit_reservation'), ReservationController.update);
router.delete('/api/v1/admin/reservation/:id', checkPermission('delete_reservation'), ReservationController.delete);


// permission
router.get('/api/v1/admin/permission/:id_role', checkPermission('view_action_role'), PermissionController.allActionOfRole);
router.post('/api/v1/admin/permission', checkPermission('edit_action_role'), PermissionController.store);


// call food 
router.get('/api/v1/admin/call-food', checkPermission('view_food_order'), CallFoodController.getAll);
router.put('/api/v1/admin/call-food', checkPermission('view_food_order'), CallFoodController.edit)
router.delete('/api/v1/admin/call-food/:id', checkPermission('view_food_order'), CallFoodController.delete)

// login
router.post('/api/v1/admin/login', AuthController.login);
router.post('/refresh-token', AuthController.newTokenAccess);
router.post('/api/v1/call-food', AuthController.loginToCallFood);


// listTable Admin 
router.get('/api/v1/client/table/:floor_id', isLoginSite, TableController.findByFloorID);
router.get('/api/v1/client/floor', isLoginSite, FloorController.getAll);
router.post('/api/v1/client/place-order', isLoginSite, ReservationController.store);
router.post('/api/v1/client/log-in', AuthController.loginCustomer);
// router.post('/api/v1/client/place-order' , ReservationController. )


router.get('/me', AuthController.InformationCustomer);
router.get('/log-out-client', AuthController.logoutCustomer);

export default router;