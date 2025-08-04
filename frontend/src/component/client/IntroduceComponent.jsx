import image from '../../assets/img/image.png';

const IntroduceComponent = () => {
    return  ( 
    <section id="home">
      <div className="home container-fluid py-5">
        <div className="row">
          <div className="col-md-6 desc ps-5 d-flex justify-items-center align-items-center">
            <div>
              <h1 className="mb-4">
                CHÀO MỪNG BẠN ĐẾN VỚI QUÁN ĂN NHỎ CỦA CHÚNG TÔI
              </h1>
              <p>Tại quán ăn nhỏ của chúng tôi, mỗi món ăn đều được chế biến bằng cả tấm lòng, mang hương
                vị
                đậm
                đà, chân thật như bữa cơm nhà – nơi bạn luôn được chào đón bằng nụ cười và sự thân thiện
                như
                người một nhà.</p>
              <div className="ordernow">
                <a href="" className="btn">Đặt Bàn Ngay</a>
              </div>
            </div>
          </div>
          <div className="col-md-6 picture text-center">
            <img src={image} alt=""/>
          </div>
        </div>

      </div>
    </section>
    )
}

export default IntroduceComponent