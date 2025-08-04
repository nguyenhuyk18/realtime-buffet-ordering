const ModalConfirm = (props) => {
    const { isConfirmLogin  , setConfirmLogin , handlePlaceOrder } = props;
    // const [username , setUsername] = useState(null);
    // const [password, setPassword] = useState(null);
    return (
        <>
        <div className={`modal fade ${isConfirmLogin ? 'show d-block'  : ''} `}  id="modaldangky">
  <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="modalTitleId">
          XÁC NHẬN ĐẶT BÀN
        </h5>
        <button type="button" onClick={() => setConfirmLogin(false)} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
        <div className="modal-footer flex-nowrap">
          <button onClick={() => setConfirmLogin(false)} type="button" className="btn btn-danger w-50" data-bs-dismiss="modal">
            Hủy
          </button>
          <button type="button" onClick={() => {
            handlePlaceOrder()
            setConfirmLogin(false);
          }} className="btn btn-success w-50">Đồng Ý</button>
        </div>
    </div>
  </div>
</div>

      {isConfirmLogin && <div className="modal-backdrop fade show"></div>}
      </>
    )
}

export default ModalConfirm;