import about from '../../assets/img/about.jpg'

const AboutComponent = () => {
    return (
            <section id="aboutus">
      <div className="container-fluid aboutus">
        <div className="row">
          <div className="col-md-6 picture ps-5">
            <img src={about} className="w-100" alt=""/>
          </div>
          <div className="col-md-6 desc d-flex justify-items-center align-items-center">
            <div>
              <span>Về Chúng Tôi --</span>
              <h2>Nhà hàng QUÁN ĂN NHỎ tuy mới mở nhưng lại tạo nên uy tín hàng đầu</h2>
              <p className="desc-1">Chúng tôi có những đầu bếp giỏi nhấy uy tín nhất đồng thời những món ăn
                hương
                vị đến từ vùng
                quê Bến Tre, Những đứa con của biển đã cho chúng tôi rất nhiều thứ </p>
              <p className="desc-2">Hy vọng rằng tất cả mọi người đều đến đây để ăn những món ăn hàng đầu của
                website chúng tôi
              </p>


            </div>

          </div>
        </div>
      </div>
    </section>
    )
}

export default AboutComponent