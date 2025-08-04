const PolicyPlaceOrderComponent = () => {
    return (

            <main>
        <section id="policy-order-table">
            <div className="policy-order-table container py-5">
                <h1 className="ps-5">Chính Sách Đặt Bàn</h1>
                <p>Chúng tôi rất hân hạnh được đón tiếp Quý khách tại [Tên Nhà Hàng]. Để đảm bảo trải nghiệm tốt nhất
                    cho khách hàng, xin vui lòng tham khảo chính sách đặt bàn dưới đây:</p>

                <h3 className="ps-3">1. Thời Gian Đặt Bàn</h3>
                <ul className="ps-5">
                    <li>Khách hàng có thể đặt bàn trước qua điện thoại, website hoặc fanpage chính thức của nhà hàng.
                    </li>
                    <li>Chúng tôi nhận đặt bàn trong khung giờ hoạt động: [Giờ mở cửa – Giờ đóng cửa], tất cả các ngày
                        trong tuần.</li>
                    <li>Đối với các khung giờ cao điểm (buổi tối cuối tuần, ngày lễ), quý khách vui lòng đặt bàn trước
                        ít nhất 2 giờ để được phục vụ tốt nhất.</li>
                </ul>
                <h3 className="ps-3">2. Thời Gian Giữ Bàn</h3>
                <ul className="ps-5">
                    <li>Nhà hàng giữ bàn tối đa 15 phút kể từ thời gian đã đặt.</li>
                    <li>Sau thời gian này, nếu không nhận được thông báo từ khách, chúng tôi xin phép hủy bàn để phục vụ
                        khách hàng khác.</li>
                </ul>
                <h3 className="ps-3">3. Số Lượng Khách</h3>
                <ul className="ps-5">
                    <li>Quý khách vui lòng thông báo chính xác số lượng người khi đặt bàn.</li>
                    <li>Nếu có sự thay đổi (tăng/giảm số lượng), vui lòng thông báo cho nhà hàng trước ít nhất 30 phút
                        để chúng tôi chuẩn bị chỗ ngồi phù hợp.</li>
                </ul>
                <h3 className="ps-3">4. Đặt Bàn Theo Yêu Cầu Đặc Biệt</h3>
                <ul className="ps-5">
                    <li>Chúng tôi hỗ trợ các yêu cầu như: bàn riêng tư, sinh nhật, sự kiện nhỏ, trang trí theo chủ
                        đề,...</li>
                    <li>Quý khách vui lòng liên hệ trước ít nhất 1 ngày để chúng tôi có thể chuẩn bị chu đáo.</li>
                </ul>
                <h3 className="ps-3">5. Chính Sách Hủy Bàn</h3>
                <ul className="ps-5">
                    <li>Nếu có thay đổi kế hoạch, xin vui lòng hủy bàn sớm nhất có thể.</li>
                    <li>Đối với các bàn đã đặt cho sự kiện hoặc có yêu cầu đặc biệt, vui lòng hủy trước ít nhất 12 giờ
                        để tránh phát sinh chi phí.</li>
                </ul>
                <h3 className="ps-3">6. Liên Hệ Đặt Bàn</h3>
                <ul className="ps-5">
                    <li>☎️ Số điện thoại: [Số điện thoại]</li>
                    <li>🌐 Website: [link đặt bàn nếu có]</li>
                    <li>💬 Fanpage/Facebook/Zalo: [link]</li>
                </ul>
            </div>
        </section>
    </main>
    )
}


export default PolicyPlaceOrderComponent;