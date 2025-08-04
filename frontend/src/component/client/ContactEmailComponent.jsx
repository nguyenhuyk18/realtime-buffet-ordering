const ContactEmail = () => {
    return (
    <section id="contactemail">
      <div className="container-fluid contactemail py-5">
        <h2 className="text-center mb-4">LIÊN HỆ VỚI CHÚNG TÔI</h2>
        <div className="row">
          <div className="col-md-6 ps-5">
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0213176954817!2d106.61445710984322!3d10.80967898929666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bef54e763fb%3A0xf52f4f3e082c5946!2zMTUgxJDGsOG7nW5nIFQ2LCBUw6J5IFRo4bqhbmgsIFTDom4gUGjDuiwgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1744798554628!5m2!1svi!2s"
  className="w-100"
  height="450"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
          </div>
          <div className="col-md-6">
            <form action="#!" method="POST">
              <div className="row mb-3">
                <div className="col-md-6">
                  <input type="text" className="form-control w-100" name="name" placeholder="Nhập Tên"/>
                </div>
                <div className="col-md-6">
                  <input type="email" className="form-control w-100" name="email" placeholder="Nhập email của bạn"/>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <input type="text" className="form-control" name="subject" placeholder="Nhập chủ đề"/>
                </div>

              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <textarea name="content" rows="7" className="form-control" placeholder="Nhập nội dung tại đây"></textarea>
                </div>
              </div>
              <div className="button text-right">
                <button type="submit" className="btn">Gửi</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
    )
}
export default ContactEmail