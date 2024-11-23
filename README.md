Chi tiết các thư mục

Client

api/: Quản lý các lời gọi API.

assets/: Chứa tài nguyên tĩnh như ảnh, video.

components/: Các thành phần giao diện được chia nhỏ, dễ tái sử dụng.

ui/: Các trang giao diện.

ultis/: Hàm tiện ích hỗ trợ cho giao diện người dùng.

Server

config/: Tệp cấu hình, bao gồm thông tin cơ sở dữ liệu và các biến môi trường.

controllers/: Xử lý các logic cho API endpoint.

db/: Thao tác với cơ sở dữ liệu.

middleware/: Các middleware như xác thực, kiểm tra lỗi.

routes/: Định nghĩa các tuyến API.

services/: Chứa các logic chính xử lý nghiệp vụ.

ultis/: Tiện ích cho backend (nhật ký, xử lý lỗi).

Luồng hoạt động (Workflow)

Frontend (client):

Người dùng tương tác với giao diện được xây dựng trong client.

Giao diện gửi request qua API được định nghĩa trong client/src/api đến server.

Backend (server):

Các request được nhận qua server/routes, xử lý logic trong server/controllers.

Dữ liệu được truy xuất và xử lý qua server/services và server/db.

Kết quả trả về client sau khi qua các bước xác thực trong server/middleware.

Tương tác giữa client và server:

Client sử dụng API để lấy dữ liệu từ server hoặc gửi dữ liệu lên server.

Server xử lý các yêu cầu này, đảm bảo dữ liệu phản hồi đúng yêu cầu và bảo mật.

Sau khi clone ve chay:

Thư mục gốc: npm i axios dotenv express mongoose react nodemon

Server: npm i dotenv mongoose express nodemon

Client: npm i axios react antd
