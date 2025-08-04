
import axios from './api.setting';
// CÁC DỮ LIỆU TRUYỀN VÀO ĐỂ UPDATE SAVE ĐỀU Ở DẠNG JSON phải stringtify nó lại !!!
// Category
const getAllCategory = async () => {
    const backendURL = '/api/v1/admin/category';
    const rs = await axios.get(backendURL);
    return rs;
}


const saveCategoryApi = async (data) => {
    const backendURL = '/api/v1/admin/category';
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const rs = await axios.post(backendURL, data, config);
    return rs;
}

const updateCategoryApi = async (data) => {
    const backendURL = '/api/v1/admin/category';
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const rs = await axios.put(backendURL, data, config);
    return rs;
}

const deleteCategoryApi = async (id) => {
    const backendURL = `/api/v1/admin/category/${id}`;
    const rs = await axios.delete(backendURL);
    return rs;
}

// Brand
const getAllBrandApi = async () => {
    const backendURL = 'api/v1/admin/brand';
    const rs = await axios.get(backendURL);
    return rs;
}

const saveBrandApi = async (data) => {
    const backendURL = 'api/v1/admin/brand';
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const rs = await axios.post(backendURL, data, config);
    return rs;
}


const updateBrandApi = async (data) => {
    const backendURL = 'api/v1/admin/brand';

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const rs = await axios.put(backendURL, data, config);
    return rs
}

const deleteBrandApi = async (id) => {
    const backendURL = `api/v1/admin/brand/${id}`;
    const rs = await axios.delete(backendURL);
    return rs;
}



// product

const getProductClient = async () => {
    const backendURL = '/api/v1/client/product';
    const rs = await axios.get(backendURL);
    return rs;
}


// getAll Product
const getProductApi = async () => {
    const backendURL = '/api/v1/admin/product';
    const rs = await axios.get(backendURL);
    return rs;
}

// find Product
const findProductApi = async (id) => {
    const backendURL = `/api/v1/admin/product/${id}`;
    const rs = await axios.get(backendURL);
    return rs;
}


// save product
const saveProductApi = async (data) => {
    const backendURL = '/api/v1/admin/product';
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    const rs = await axios.post(backendURL, data, config);
    return rs;
}

// delete product 
const deleteProductApi = async (id) => {
    const backendURL = `/api/v1/admin/product/${id}`;
    const rs = await axios.delete(backendURL);
    return rs;
}

// edit product
const updateProductApi = async (data) => {
    const backendURL = `/api/v1/admin/product`;
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    const rs = await axios.put(backendURL, data, config);
    return rs;
}


// staff
// get all staff
const getAllStaffApi = async () => {
    const backendURL = '/api/v1/admin/staff';
    const rs = await axios.get(backendURL);
    return rs;
}


// find staff
const findStaffApiByID = async (id) => {
    // console.log('ccc    ')
    const backendURL = `/api/v1/admin/staff/${id}`;
    const rs = await axios.get(backendURL);
    return rs;
}

// lưu staff 
const saveStaffApi = async (data) => {
    const backendURL = '/api/v1/admin/staff';
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const rs = await axios.post(backendURL, data, config);
    return rs;
}

// xóa staff
const deleteStaffApi = async (id) => {
    const backendURL = `/api/v1/admin/staff/${id}`;
    const rs = await axios.delete(backendURL);
    return rs
}

// lưu staff
const updateStaffApi = async (data) => {
    const backendURL = '/api/v1/admin/staff';
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const rs = await axios.put(backendURL, data, config);
    return rs;
}

// upload ảnh thay ảnh đại diện
const changeImageStaffApi = async (data, id) => {

    const backendURL = `/api/v1/admin/avatar-staff/${id}`;

    // const username = formData.get("username");

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    const rs = axios.post(backendURL, data, config);
    return rs;
}


// role

const getRoleApi = async () => {
    const backendURL = '/api/v1/admin/role';
    const rs = await axios.get(backendURL);
    return rs;
}

const saveRoleApi = async (data) => {
    const backendURL = `/api/v1/admin/role`;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const rs = await axios.post(backendURL, data, config);
    return rs;
}

const deleteRoleApi = async (id) => {
    const backendURL = `/api/v1/admin/role/${id}`;
    const rs = await axios.delete(backendURL);
    return rs;
}

const findRoleApi = async (id) => {
    const backendURL = `/api/v1/admin/role/${id}`;
    const rs = await axios.get(backendURL);
    return rs;
}


const updateRoleApi = async (data) => {
    const backendURL = `/api/v1/admin/role`;

    const rs = await axios.put(backendURL, data, { headers: { 'Content-Type': 'application/json' } });

    return rs;
}



// ward
const getWardApi = async () => {
    const backendURL = '/api/v1/admin/ward';
    const rs = await axios.get(backendURL);
    return rs;
}

const findWardApi = async (id) => {
    const backendURL = `/api/v1/admin/ward/${id}`;
    const rs = await axios.get(backendURL);
    return rs;
}

const findWardByDistrict = async (district_id) => {
    const backendURL = `/api/v1/admin/ward-by-district/${district_id}`;
    const rs = await axios.get(backendURL);
    return rs;
}

// district 
const getDistrictApi = async () => {
    const backendURL = '/api/v1/admin/district';
    const rs = await axios.get(backendURL);
    return rs;
}


const getDistrictByProvince = async (id_province) => {
    const backendURL = `/api/v1/admin/district-by-province/${id_province}`;
    const rs = await axios.get(backendURL);
    return rs;
}

const findDistrict = async (id) => {
    const backendURL = `/api/v1/admin/district/${id}`;
    const rs = await axios.get(backendURL);
    return rs;
}

// province 
const getProvinceApi = async () => {
    const backendURL = '/api/v1/admin/province';
    const rs = await axios.get(backendURL);
    return rs;
}


const findProvinceApi = async (id) => {
    const backendURL = `/api/v1/admin/province/${id}`;
    const rs = await axios.get(backendURL);
    return rs;
}


// action
const getActionApi = async () => {
    const backendURL = '/api/v1/admin/action';
    const rs = await axios.get(backendURL);
    return rs;
}


// permission
const getPermissionApi = async (id_role) => {
    // console.log('api ', id_role)
    const backendURL = `/api/v1/admin/permission/${id_role}`;
    const rs = await axios.get(backendURL);
    const arrPermission = [];

    if (rs.status == 403) {
        return rs;
    }

    rs.data.forEach(row => {
        arrPermission.push(row.id);
    })
    return arrPermission;
}

const savePermissionApi = async (data) => {
    const backendURL = `/api/v1/admin/permission`;
    const rs = await axios.post(backendURL, data, { headers: { 'Content-Type': 'application/json' } });
    return rs;
}

// floor
const getFloorApi = async () => {
    const backendURL = '/api/v1/admin/floor';
    const rs = await axios.get(backendURL);
    return rs;
}

const saveFloorApi = async (data) => {
    const backendURL = '/api/v1/admin/floor';
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const rs = await axios.post(backendURL, data, config);
    return rs;
}

const deleteFloorApi = async (id) => {
    const backendURL = `/api/v1/admin/floor/${id}`;
    const rs = await axios.delete(backendURL);
    return rs;
}

const updateFloorApi = async (data) => {
    const backendURL = `/api/v1/admin/floor`;

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const rs = await axios.put(backendURL, data, config);
    return rs;
}

const findFloorApi = async (id) => {
    const backendURL = `/api/v1/admin/floor/${id}`;
    const rs = await axios.get(backendURL);
    return rs;
}
// table

const findTableApi = async (id) => {
    const backendURL = `/api/v1/admin/table/${id}`;
    const rs = await axios.get(backendURL);
    return rs;
}

const getTableApi = async () => {
    const backendURL = '/api/v1/admin/table';
    const rs = await axios.get(backendURL);
    return rs;
}


const saveTableApi = async (data) => {
    const backendURL = '/api/v1/admin/table';
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const rs = await axios.post(backendURL, data, config);
    return rs;
}


const updateTableApi = async (data) => {
    const backendURL = '/api/v1/admin/table';
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const rs = await axios.put(backendURL, data, config);
    return rs;
}


const deleteTableApi = async (id) => {
    const backendURL = `/api/v1/admin/table/${id}`;
    const rs = await axios.delete(backendURL);
    return rs;
}

// reservation
const getReservationApi = async (trangthai) => {
    let backendURL = '/api/v1/admin/reservation';
    if (trangthai) {
        backendURL += '?trangthai=true';
    }
    console.log(trangthai)
    const rs = await axios.get(backendURL);
    return rs;
}

// const getReservationCalledApi = async () => {
//     const backendURL = '/api/v1/admin/reservation';
//     const rs = await axios.get(backendURL);
//     return rs;
// }


const findReservationApi = async (id) => {
    const backendURL = `/api/v1/admin/reservation/${id}`;
    const rs = await axios.get(backendURL);
    return rs;
}

const saveReservationApi = async (data) => {
    const backendURL = '/api/v1/admin/reservation';
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const rs = await axios.post(backendURL, data, config);
    return rs;
}

const updateReservationApi = async (data) => {
    const backendURL = '/api/v1/admin/reservation';
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const rs = await axios.put(backendURL, data, config);
    return rs;
}

const deleteReservationApi = async (id) => {
    const backendURL = `/api/v1/admin/reservation/${id}`;
    const rs = await axios.delete(backendURL);
    return rs;
}


// customer

const getCustomerApi = async () => {
    const backendURL = '/api/v1/admin/customer';
    const rs = await axios.get(backendURL);
    return rs;
}

const findCustomerApi = async (id) => {
    const backendURL = `/api/v1/admin/customer/${id}`;
    const rs = await axios.get(backendURL);
    return rs;
}

const saveCustomerApi = async (data) => {
    const backendURL = '/api/v1/admin/customer';
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const rs = await axios.post(backendURL, data, config);
    return rs;
}

const updateCustomerApi = async (data) => {
    const backendURL = '/api/v1/admin/customer';
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const rs = await axios.put(backendURL, data, config);
    return rs;
}


const deleteCustomerApi = async (id) => {
    const backendURL = `/api/v1/admin/customer/${id}`;
    const rs = await axios.get(backendURL);
    return rs;
}


// login to admin
const loginToAdmin = async (data) => {
    const backendURL = '/api/v1/admin/login';
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const rs = await axios.post(backendURL, data, config);
    return rs;
}


// login to call food hẹ hẹ
const loginToCallFood = async (data) => {
    const backendURL = '/api/v1/call-food'
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const rs = await axios.post(backendURL, data, config);
    return rs;
}


const getAllCallFood = async (status) => {
    let backendURL = '/api/v1/admin/call-food';
    if (status) {
        backendURL += `?status=${status}`;
    }
    const rs = await axios.get(backendURL);
    return rs;
}



const updateCallFood = async (data) => {
    let backendURL = '/api/v1/admin/call-food';
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const rs = await axios.put(backendURL, data, config);
    return rs;
}


const deleteCallFood = async (id) => {
    const backendURL = `/api/v1/admin/call-food/${id}`;
    const rs = await axios.delete(backendURL);
    return rs;
}

const getFloorApiClient = async () => {
    const backendURL = '/api/v1/client/floor';
    const config = {
        withCredentials: true,
    }
    const rs = await axios.get(backendURL, config);
    return rs;
}

const getTableApiClient = async (id_floor) => {
    const backendURL = `/api/v1/client/table/${id_floor}`;
    const config = {
        withCredentials: true,
    }
    const rs = await axios.get(backendURL, config);
    return rs;
}


const loginToClientSiteApi = async (data) => {
    const backendURL = '/api/v1/client/log-in';
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },

        withCredentials: true // ⚠️ BẮT BUỘC để nhận cookie

    }

    const rs = await axios.post(backendURL, data, config);
    return rs;
}


const placeOrderClientApi = async (data) => {
    const backendURL = '/api/v1/client/place-order';

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    }

    const rs = await axios.post(backendURL, data, config);
    return rs;
}


const getProfileClienApi = async () => {
    const backendURL = '/me';
    const config = {
        withCredentials: true,
    }

    const rs = await axios.get(backendURL, config);
    return rs;
}


const logoutClientApi = async () => {
    const backendURL = '/log-out-client';
    const config = {
        withCredentials: true,
    }
    const rs = await axios.get(backendURL, config);
    return rs;
}

export { logoutClientApi, getProfileClienApi, placeOrderClientApi, loginToClientSiteApi, getFloorApiClient, getTableApiClient, deleteCallFood, updateCallFood, getAllCallFood, loginToCallFood, findTableApi, getTableApi, saveTableApi, updateTableApi, deleteTableApi, getAllCategory, saveCategoryApi, updateCategoryApi, deleteCategoryApi, getAllBrandApi, saveBrandApi, updateBrandApi, deleteBrandApi, getProductApi, findProductApi, saveProductApi, deleteProductApi, updateProductApi, getAllStaffApi, findStaffApiByID, saveStaffApi, deleteStaffApi, updateStaffApi, getRoleApi, findRoleApi, getWardApi, findWardApi, findWardByDistrict, getDistrictByProvince, getDistrictApi, findDistrict, getProvinceApi, findProvinceApi, changeImageStaffApi, saveRoleApi, deleteRoleApi, updateRoleApi, getActionApi, getPermissionApi, savePermissionApi, getFloorApi, saveFloorApi, deleteFloorApi, updateFloorApi, findFloorApi, getReservationApi, findReservationApi, saveReservationApi, updateReservationApi, deleteReservationApi, getCustomerApi, deleteCustomerApi, saveCustomerApi, findCustomerApi, updateCustomerApi, loginToAdmin, getProductClient } 