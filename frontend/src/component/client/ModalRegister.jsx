const ModalRegister = (props) => {
  const { isRegisterOpen , setIsRegisterOpen } = props


    return (
      <>
<div className={`modal fade ${isRegisterOpen ? 'show d-block'  : ''} `}  id="modaldangky">
  <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="modalTitleId">
          Đăng Ký Tài Khoản
        </h5>
        <button type="button" onClick={() => setIsRegisterOpen(false)} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form action="">
        <div className="modal-body">
          <div className="row">
            <div className="col-12 mb-3">
              <input type="text" name="username" className="form-control" placeholder="Nhập tên đăng nhập"/>
            </div>
            <div className="col-12 mb-3">
              <input type="email" name="email" className="form-control" placeholder="Nhập email"/>
            </div>
            <div className="col-12 mb-3">
              <input type="phone" name="number" className="form-control" placeholder="Nhập số điện thoại"/>
            </div>
            <div className="col-12 mb-3">
              <input type="password" name="password" className="form-control" placeholder="Nhập mật khẩu của bạn"/>
            </div>
            <div className="col-12 mb-3">
              <input type="password" name="re_password" className="form-control" placeholder="Nhập lại mật khẩu đã nhập"/>
            </div>
          </div>
        </div>
        <div className="modal-footer flex-nowrap">
          <button type="button" className="btn btn-danger w-50" data-bs-dismiss="modal">
            Đóng
          </button>
          <button type="button" className="btn btn-success w-50">Đăng Ký</button>
        </div>
      </form>
    </div>
  </div>
</div>

      {isRegisterOpen && <div className="modal-backdrop fade show"></div>}
      </>

    )
}

export default ModalRegister;