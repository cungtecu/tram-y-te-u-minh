# Kiến trúc dự án — Trạm Y tế xã U Minh

## Nguyên tắc chính

1. **Một trách nhiệm, một nơi sở hữu**: giao diện chung thuộc `components`; nghiệp vụ theo trang thuộc `features`; dữ liệu mẫu và thông tin trạm thuộc `config`; MongoDB thuộc `server`.
2. **Ẩn phần triển khai**: code bên ngoài chỉ import từ `features/<ten-module>/index.ts`. Các file `*.tsx` bên trong feature được xem là private (private theo quy ước module, không phải tính năng bảo mật). Component React chỉ nhận dữ liệu qua props.
3. **Không phụ thuộc ngược**: `server` không import UI; `components` không import `features`; một feature không import file nội bộ của feature khác. `home` đóng vai trò điều phối các feature qua API công khai `index.ts` (không import file triển khai bên trong).
4. **Không có dữ liệu trùng**: tên trạm, menu, liên hệ ở `config/site.ts`; dịch vụ và nội dung demo ở `config/content.ts`. MongoDB được đọc qua `server/content-repository.ts`.
5. **Không vượt ranh giới client/server**: component có tương tác được đánh dấu `'use client'`; MongoDB và chuỗi kết nối chỉ tồn tại ở server. `src/server/mongodb.ts` được chặn import vào client bằng `server-only`.
6. **Không dùng HTML string, `dangerouslySetInnerHTML`, DOM imperative** để tạo giao diện. Mọi trang là JSX/TSX, key ổn định và state React.

## Cây thư mục

```text
app/                         # Next.js routing + metadata + CSS chính
  page.tsx                   # Composition trang chủ (không chứa business logic)
  gioi-thieu/page.tsx
  dich-vu/page.tsx
  tin-tuc/page.tsx
  thong-bao/page.tsx
  thu-vien-anh/page.tsx
  lien-he/page.tsx
  api/                       # API đọc dữ liệu, kiểm tra sức khỏe
src/
  config/                    # Cấu hình cố định và nội dung minh họa
  components/
    layout/                  # Header, Footer (chỉ export từ index.ts)
    ui/                      # Modal, Reveal, PageHero (chỉ export từ index.ts)
  features/
    about/                   # Nội dung giới thiệu
    home/                    # Composition các section trang chủ
    services/                # ServiceGrid + private implementation
    news/                    # NewsGrid + private implementation
    notices/                 # NoticeList + private implementation
    gallery/                 # GalleryGrid + private implementation
    contact/                 # ContactSection + private implementation
    admin/                   # Dashboard riêng, chỉ export từ index.ts
    types.ts                 # DTO thuần dùng chung
  server/
    mongodb.ts               # MongoClient singleton, không export cho client
    content-repository.ts    # Repository đọc/chuẩn hóa/fallback dữ liệu
    admin-repository.ts      # CRUD, whitelist và validate trường dữ liệu
    admin-guard.ts           # Chỉ cho phép tác vụ quản trị trong local dev
    settings-repository.ts   # Thông tin giới thiệu/liên hệ từ MongoDB
public/                      # SVG minh họa đã tách từ website gốc
scripts/                     # seed và kiểm tra ranh giới module
```

## Luồng dữ liệu

```text
MongoDB → server/mongodb.ts → server/content-repository.ts
                                      ↓
                               app/**/page.tsx
                                      ↓ props
                          features/* → components/ui
```

Trang chủ gọi chung `listNews`, `listNotices`, `listPhotos`. Trang con dùng cùng các repository; không có bản sao query ở phía frontend. Khi MongoDB trống hoặc chưa chạy, website hiển thị dữ liệu demo để kiểm tra giao diện; không có thao tác ghi dữ liệu tự động.

## Quy trình thêm chức năng

1. Tạo một feature riêng: `src/features/ten-moi/` và một `index.ts` export duy nhất API công khai.
2. Thêm kiểu dữ liệu trong `features/types.ts` nếu nhiều module cần dùng chung.
3. Nếu cần dữ liệu, thêm hàm repository ở `src/server/` và gọi hàm từ `app/.../page.tsx`.
4. Sử dụng component UI chung, không copy lại Header, Footer, Modal hoặc class style của feature khác.
5. Chạy `npm run check`, `npm run architecture`, `npm run build` trước khi gộp code.

## Quy định CSS

- `app/globals.css`: phong cách nền **kế thừa và định dạng lại từ website gốc**, giữ các class cũ của trang chủ.
- `app/modern.css`: các class mở rộng có tiền tố `detail-` hoặc `gallery-` và điều chỉnh tương thích component. Không thêm CSS trùng vào mỗi trang.
- Màu chủ đạo, typography và chuyển động có thể được chuẩn hóa thêm thành design tokens mà không thay đổi contract của các feature.

## Ý nghĩa “private”

`index.ts` là **ranh giới API công khai** theo quy ước TypeScript; nó không tự ngăn mọi import file bằng hệ thống phân quyền. Script `npm run architecture` kiểm tra các import vượt ranh giới để phát hiện lỗi kiến trúc. Tính private của repository liên quan đến quyền truy cập Git và quyền hệ điều hành, không do React components quyết định.

## Phạm vi chưa có

- Đã có `/admin` và API ghi dữ liệu **chỉ ở localhost development**, nhưng chưa có đăng nhập/phân quyền.
- Đã có upload ảnh local vào `public/uploads`, chưa có object storage production và chưa tự dọn file ảnh khi xóa bản ghi.
- Chưa có sao lưu MongoDB, audit trail production hoặc phân quyền người dùng.
- Tin tức, thông báo và ảnh minh họa chưa được trạm phê duyệt.

Những tính năng này nên phát triển thành module độc lập, không viết trực tiếp vào file trang chủ.
