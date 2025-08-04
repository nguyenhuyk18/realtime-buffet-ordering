import axios from 'axios';
import NavigateHelpers from '../utils/NavigateHelpers';

// import { useNavigate } from 'react-router-dom';

// const navigate = useNavigate();

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
}
);

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    const isLogin = localStorage.getItem('login');
    const isLoginCallFood = localStorage.getItem('login-call-food');
    // const isLoginSite = localStorage.getItem('login-client-site');
    // console.log(isLoginSite)
    if (isLogin) {
        config.headers.authorization = `Bearer ${isLogin}`;
    }

    if (isLoginCallFood) {
        config.headers['is-login-call-food'] = `${isLoginCallFood}`;
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log(response);

    return response;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // 401 : access token heets han 
    // 403 : deo co tham quyen 
    // 407 : chuwa dang nhap cut
    // 405 : reffreshtoken heet han not
    // console.log(error.response.status);

    const refresh_token = getCookie('refresh_token');

    // các config của endpoint gốc bị lỗi do token hay gì đó mục đích lấy ra để đổi token
    const originalRequest = error.config; // request gốc bị lỗi

    // console.log('sdsdsd', ' ', refresh_token)

    if (error.response.status == 401) {
        // set up refresh token để chuẩn bị gửi 
        const config = {
            headers: {
                'refresh-token': refresh_token
            }
        }

        try {
            const rawAxiox = axios.create({});

            // gọi tới refreshtoken để lấy access token mới
            const rs = await rawAxiox.post(`${import.meta.env.VITE_BACKEND_URL}/refresh-token`, {}, config);

            // Lấy access token mới 
            const newAccessToken = rs.data.access_token;

            // đổi lại token cho endpoint gốc để gọi lại thêm 1 lần nữa
            originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;

            // console.log('in ở đây nè', rs);
            localStorage.setItem('login', rs.data.access_token);

            // cái này giúp gọi lại endpont gốc sau khi đã đổi lại token cho em ấy nếu lỗi nữa thì chịu hết cứu
            return instance(originalRequest);

        } catch (err) {
            // console.log(err);
            // window.location.href = '/admin/login';
            return err.response;
        }
    }

    if (error.response && error.response.data) return error.response;
    return Promise.reject(error);
});

export default instance;


// avc()

// function avc() {
//     console.log(2323)
// }


// vv()
// const vv = function () {
//     console.log(2323)
// }

// aab()
// const aab = () => {
//     console.log(2323)
// }


// const a = { 1: 'sdsds', 2: 'sdsdsd' };
// a[3] = 'sdsdsd'
// console.log(a);