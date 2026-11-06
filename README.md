# Trạm Y tế xã U Minh — phiên bản React/Next.js

**Mã nguồn React/TypeScript hoàn chỉnh cho các giao diện công khai hiện có**, chạy trên Windows localhost. Thiết kế trang chủ và các trang Giới thiệu, Dịch vụ, Tin tức, Thông báo, Thư viện ảnh và Liên hệ đã chuyển thành component React; không còn `legacy/` hay JavaScript chèn HTML.

## Cài trên Windows

1. Cài Node.js LTS, VS Code, MongoDB Community Server và MongoDB Compass.
2. Giải nén thư mục dự án và chọn **File → Open Folder** trong VS Code.
3. Mở Terminal (PowerShell):

   ```powershell
   npm install
   Copy-Item .env.example .env.local
   npm run seed
   npm run dev
   ```

4. Mở **http://127.0.0.1:3000**.
5. Mở Compass, kết nối `mongodb://127.0.0.1:27017`, chọn database `tram_y_te_u_minh`.

`npm run seed` cần MongoDB Server đang chạy. Nếu chưa cài MongoDB, bạn vẫn có thể chạy `npm run dev` để xem giao diện với dữ liệu demo, nhưng API health trả lỗi kết nối.

## Lệnh bảo trì

| Lệnh | Chức năng |
|---|---|
| `npm run dev` | Môi trường phát triển, tự tải lại khi sửa code |
| `npm run check` | Kiểm tra TypeScript |
| `npm run architecture` | Kiểm tra import vi phạm ranh giới module |
| `npm run format` | Định dạng code theo Prettier |
| `npm run build` | Kiểm tra build production |
| `npm run start` | Chạy bản production đã build |
| `npm run seed` | Thêm dữ liệu mẫu vào MongoDB (không xóa dữ liệu cũ) |

## Các đường dẫn

- `/` — Trang chủ
- `/gioi-thieu` — Giới thiệu
- `/dich-vu` — Dịch vụ
- `/tin-tuc` — Tin tức
- `/thong-bao` — Thông báo
- `/thu-vien-anh` — Thư viện ảnh
- `/lien-he` — Liên hệ
- `/api/health` — Kiểm tra kết nối MongoDB
- `/admin` — Quản trị nội dung **chỉ ở chế độ localhost development**

## Sử dụng trang quản trị (bản local)

1. **Sao lưu MongoDB** bằng `mongodump` và giữ bản sao thư mục dự án hiện tại trước khi cập nhật. Bản ZIP này là dự án mới, bạn nên giải nén ra thư mục riêng để kiểm tra trước.
2. Chép `.env.local` từ dự án cũ sang thư mục mới (chỉ trên máy bạn). Không chia sẻ file này.
3. Mở Terminal ở thư mục mới, chạy:

   ```powershell
   npm install
   npm run seed
   npm run dev
   ```

4. Mở `http://127.0.0.1:3000/admin`.
5. Chọn chuyên mục ở menu bên trái. Nhấn **Thêm mới** → nhập thông tin → chọn **Xuất bản ngay** hoặc để bản nháp → **Lưu**.
6. Các mục có thể **Sửa**, **Đăng/Ẩn**, **Xóa**. Xóa yêu cầu xác nhận và không thể hoàn tác trong giao diện.
7. Với **Thư viện ảnh**, nhấn chọn ảnh PNG/JPG/WebP (tối đa 5 MB), sau khi tải lên mới nhấn **Tạo nội dung** hoặc **Lưu thay đổi**. File nằm trong `public/uploads`; metadata nằm trong MongoDB collection `photos`.
8. Với **Thông tin trạm**, sửa địa chỉ, điện thoại, email, giờ làm việc và đoạn giới thiệu. Thông tin sẽ xuất hiện ở trang Liên hệ và Giới thiệu sau khi tải lại.

### Admin và frontend liên kết thế nào?

| Trang quản trị | Collection MongoDB | Trang công khai |
|---|---|---|
| Tin tức | `posts` | `/tin-tuc` và section Tin tức trang chủ |
| Thông báo | `announcements` | `/thong-bao` và section Thông báo trang chủ |
| Thư viện ảnh | `photos` | `/thu-vien-anh` và section Thư viện trang chủ |
| Dịch vụ | `services` | `/dich-vu` và section Dịch vụ trang chủ |
| Thông tin trạm | `settings` | `/lien-he`, `/gioi-thieu` và thông tin liên hệ trang chủ |

Các nội dung chỉ hiển thị khi `published: true`. Khi MongoDB hoạt động và collection không có nội dung được xuất bản, frontend sẽ để trống danh sách tương ứng. **Chỉ khi không kết nối được MongoDB**, frontend mới hiển thị dữ liệu mẫu để bạn vẫn kiểm tra được giao diện.

### Giới hạn bảo mật hiện tại

- Theo yêu cầu, **chưa có đăng nhập hay phân quyền**. Không sử dụng bản admin này trên hosting công khai hoặc máy dùng chung.
- API quản trị chỉ cho phép chạy khi `NODE_ENV=development`, Host là `localhost:3000` hoặc `127.0.0.1:3000`, và request thay đổi dữ liệu đến từ cùng Origin. Cổng Next.js được bind vào `127.0.0.1` qua lệnh `npm run dev`.
- **Không đổi** lệnh `npm run dev` thành `next dev -H 0.0.0.0`, không forward port 3000 qua router, ngrok hay reverse proxy.
- Dữ liệu quan trọng cần sao lưu cả MongoDB **và** `public/uploads`. Khi xóa bản ghi ảnh, file ảnh cũ hiện chưa được xóa tự động.
- Chưa có lịch sử phiên bản, phục hồi thùng rác hoặc kiểm duyệt nội dung. Cần bổ sung trước khi vận hành thực tế nhiều người dùng.

## Chỉnh sửa đúng chỗ

- **Tên trạm, navbar, liên hệ:** `src/config/site.ts`
- **Nội dung mẫu:** `src/config/content.ts`
- **Trang chủ / thứ tự section:** `src/features/home/HomePage.tsx`
- **Tin tức:** `src/features/news/NewsGrid.tsx`
- **Thông báo:** `src/features/notices/NoticeList.tsx`
- **Thư viện ảnh:** `src/features/gallery/GalleryGrid.tsx`
- **Định dạng:** `app/globals.css`, `app/modern.css`
- **MongoDB:** `src/server/` (chỉ phía server)

Đọc kỹ [ARCHITECTURE.md](ARCHITECTURE.md) trước khi thêm module. Không import file nội bộ của feature khác; chỉ import qua `index.ts`.

## Giới hạn hiện tại

- Đây là phiên bản **frontend đã chuyển sang React hoàn toàn**, cùng backend đọc MongoDB. Chưa phải sản phẩm quản trị nội dung đầy đủ.
- Tin tức, thông báo và album đang dùng dữ liệu demo nếu MongoDB chưa có document `published: true`.
- Upload ảnh trong Thư viện ảnh mới là **xem thử trên trình duyệt**, không lưu lên MongoDB.
- Form liên hệ mới là demo và không gửi dữ liệu đi.
- Chưa được kiểm tra với MongoDB đang chạy trên máy Windows của bạn.
- Không dùng bản này để nhập dữ liệu sức khỏe cá nhân hoặc công bố chính thức khi chưa thiết kế bảo mật, sao lưu và phân quyền.
