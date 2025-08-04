import saul from '../../assets/img/An_Upcoming Better_Call_Saul Cameo_That_Bob Odenkirk _Forgot About_Blew_His_Mind.jpg';
import walter from '../../assets/img/6C8560752-34628450-63ac-0450-b9d3-f4075ef2312b-bbs5b-gallery-0858-rgb-v1.jpg';
import jessi from '../../assets/img/Aaron_Paul_Breaking_Bad_Jesse_Pinkman_Yellow_Hoodie__54705.jpg'

const TeamComponent = () => {
    return (
            <section id="teammember">

      <div className="container teammember text-center">
        <h2 className="mb-4">CÁC ĐẦU BẾP HÀNG ĐẦU CỦA CHÚNG TÔI</h2>
        <div className="row">

          <div className="col-md-4">
            <div className="chef">
              <div className="chef-info mb-3">
                <img className="w-100" src={jessi} alt="chefs-1"/>
              </div>
              <div className="detail-chef">
                <h4 className="name">Jesse Pinkman</h4>
                <p className="role mb-0">Chef</p>
                <p className="desc-chef">
                  Jesse Bruce Pinkman là một tên tội phạm Mỹ
                  Breaking Bad. Anh ta là một đầu bếp và người bán ma túy đá
                  làm việc với giáo viên hóa học trung học cũ của mình , Walter White. Jesse là nhân
                  vật duy nhất ngoài Walter xuất hiện trong mọi tập
                  phim của chương trình.
                </p>
              </div>
            </div>


          </div>
                    <div className="col-md-4">
            <div className="chef">
              <div className="chef-info mb-3">
                <img className="w-100" src={walter} alt="chefs-1"/>
              </div>
              <div className="detail-chef">
                <h4 className="name">Walter White</h4>
                <p className="role mb-0">Chef</p>
                <p className="desc-chef">
                  Walter Hartwell "Walt" White Sr. , còn được biết đến với bút danh Heisenberg và
                  thường được gọi là Ông White , là một nhà hóa học, giáo viên trường học và nhà phân
                  phối ma túy lớn người Mỹ đến từ Albuquerque, New Mexico , đế chế ma túy của ông đã
                  trở thành hoạt động sản xuất ma túy đá lớn nhất trong lịch sử Hoa Kỳ
                </p>
              </div>
            </div>

          </div>
          <div className="col-md-4">
            <div className="chef">
              <div className="chef-info mb-3">
                <img className="w-100" src={saul} alt="chefs-1"/>
              </div>
              <div className="detail-chef">
                <h4 className="name">Saul Goodman</h4>
                <p className="role mb-0">Chef</p>
                <p className="desc-chef">
                  Saul là một luật sư ích kỷ và vô đạo đức sống tại Albuquerque , người đã áp dụng
                  chiến thuật của mình như một cựu nghệ sĩ lừa đảo và tham gia vào thế giới ngầm tội
                  phạm của thành phố. Anh ta đóng vai trò là cố vấn cho những đầu
                  bếp methamphetamine Walter White và Jesse Pinkman và đóng vai trò quan trọng trong
                  sự phát triển đế chế ma túy của họ
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
    )
}

export default TeamComponent