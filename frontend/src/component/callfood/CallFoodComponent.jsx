import { useEffect, useState } from "react";
import { getProductClient } from "../../service/api.service";
import { Link } from "react-router-dom";
import NotificationAddToCarted from "./NotificationAddToCarted";
import { useNavigate } from "react-router-dom";

// import { io } from "socket.io-client";
// import style from 'NotificationAddToCarted.css'
// import { notification } from "re"

const CallFoodComponent = () => {
    
    const navigate = useNavigate();
    const [ listFood , setListFood ] = useState([]); 
    const [isOpenNot , setIsOpenNot] = useState(false);

   
    // console.log(socket)

    useEffect(() => {
        
        loadingData();

    } , [])

    const loadingData = async () => {
        const rs = await getProductClient();
        if(rs.status == 405) {
            navigate('/login-call-food');
        }
        setListFood(rs.data);
    }

    const handleAddFood = (e) => {
        let data = localStorage.getItem('call-food');
        loadingData()
        setIsOpenNot(true);

        setTimeout(() => {
            setIsOpenNot(false);
        } , 4000);

        
        localStorage.removeItem('call-food')
        listFood.forEach( row => {
            const listProduct = row.list_product
            const foodFind = listProduct.find(xx => xx.id == e );

            if(data && foodFind) {
                const dataJSON = JSON.parse(data);
                let dem = 0;
                // check trong data local có foood đấy chưa
                dataJSON.forEach(row => {
                    if(row.id == e) {
                        row.amount++;
                        ++dem;
                    }
                });
                
                if(!dem)  {
                    foodFind.amount = 1
                    dataJSON.push(foodFind);
                }

                localStorage.setItem('call-food', JSON.stringify(dataJSON));
            }
            else if(foodFind) {
                data = [];
                foodFind.amount = 1
                data.push(foodFind);
                localStorage.setItem('call-food', JSON.stringify(data));
            }

        } )
        
    }

    const checkLogin = () => {
        // check login
        loadingData();
    }

    return (
        <>
        {isOpenNot ? <NotificationAddToCarted/> : ''}
        <main>
            
            <section id="listfoods">
            <div className ="container-fluid listfoods">
                <div className ="row">
                <div className="col-md-12 all-product p-5">
                    
                    <div className="row mb-3 product-container">
                        
                        { listFood.length ? listFood.map(row => {
                            { return row.list_product.length ?
                            <>
                            <h3 key={row.name_category} className="text-center mb-5">{row.name_category}</h3>
                            { row.list_product.map(product => {
                                return (
                                    <div key={product.id} className=" col-6  col-lg-6 mb-5">
                                        <div className="foods-container">
                                            <div className="image text-center">
                                                <img className="img-fluid" src={import.meta.env.VITE_BACKEND_URL + `/api/v1/admin/image-product/${product.id}`} />
                                            </div>
                                            <div className="foods-meta text-center mt-2">
                                                <h5>
                                                <a> {product.product_name} </a>
                                                </h5>

                                                <div className="option-not-hover">
                                                <div className="addcart">
                                                    <a onClick={ () => handleAddFood(product.id) } ><i className="fa-solid fa-cart-plus"></i> Thêm gọi món </a>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )   
                            }) }


                            </>
                            : ''}
                        }) : <h1 className="text-center" >KHÔNG CÓ SẢN PHẨM NÀO !!!!</h1> }

                    </div>
                    <div className="pagegination ">
                    <div className="d-flex justify-content-center">
                        <Link to={'/call-food/all-food-choosed'} onClick={checkLogin} className="btn btn-success" style={{ color : '#fff' }} >Xác Nhận</Link>
                    </div>
                    </div>

                </div>
                </div>
            </div>
            </section>
        </main>
        </>
    )
}

export default CallFoodComponent;