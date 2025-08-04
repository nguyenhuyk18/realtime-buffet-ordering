const FooterComponent = () => {
    return (
        <>
        <footer>
            <div className="container-fluid">
            <div className="row">
                <div className="col-6 col-md-6 col-lg-3 d-flex footer-info">
                <i className="fa-solid fa-location-pin me-2"></i>
                <div>
                    <h6>Địa Chỉ</h6>
                    <span>15 Đường T6 Phường Tây Thạnh Quận Tân Phú</span>
                </div>

                </div>
                <div className="col-6 col-md-6 col-lg-3 d-flex footer-info">
                <i className="fa-solid fa-phone-volume me-2"></i>
                <div>
                    <h6>Liên Hệ</h6>
                    <span className="d-block"><b>Số Điện Thoại: </b>03855348843</span>
                    <span className="d-block"><b>Email: </b>kewwihuy@gmail.com</span>
                </div>
                </div>
                <div className="col-6 col-md-6 col-lg-3 d-flex footer-info">
                <i className="fa-solid fa-clock me-2"></i>
                <div>
                    <h6>Thời gian mở</h6>
                    <span className="d-block">Từ thứ 2 đến thứ 7</span>

                    <span className="d-block">Từ 7AM - 23PM</span>
                </div>

                </div>
                <div className="col-6 col-md-6 col-lg-3 footer-info">
                <h6>Hãy theo dõi chúng tôi</h6>
                <span>
                    <a href="" className="me-2"><i className="fa-brands fa-facebook"></i></a>
                    <a href="" className="me-2"><i className="fa-brands fa-instagram"></i></a>
                    <a href="" className="me-2"><i className="fa-brands fa-twitter"></i></a>
                    <a href="" className="me-2"><i className="fa-brands fa-tiktok"></i></a>
                </span>
                </div>
            </div>
            </div>
        </footer>
        <div className="footer-bottom container-fluid text-center py-2">
            <p className="m-0">COPYRIGHT BY NGUYỄN ĐỨC HUY @2025</p>
        </div>
        </>

    )
}

export default FooterComponent