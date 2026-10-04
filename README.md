# C++ Journey 8 — web tự học (V2)

Một repo cho cả 5 bài. Mỗi bài: 4 chặng · 2 điểm dừng có mã mở khoá · BOSS cá nhân → chứng chỉ PNG.

```
_Web/
├── index.html            trang mục lục + bộ sưu tập huy hiệu
├── config.js             tên trường, giáo viên, link Canvas (dùng chung)
├── engine/
│   ├── engine.js         bộ máy chung: bản đồ, ổ khoá, chấm code, cược, săn bọ, BOSS, chứng chỉ
│   ├── base.css          giao diện gốc (từ web Bài 1 cũ)
│   ├── game.css          lớp trò chơi
│   └── JSCPP.es5.min.js  trình chạy C++ trong trình duyệt (lưu sẵn, không cần CDN)
├── bai01/                index.html + lesson.js (chỉ nội dung)
└── _kiem_tra/            kiểm tra tự động trước khi giao bài
```

## Mã mở khoá (chỉ thầy biết — hiện trên slide)

| Bài | Điểm dừng 1 | Điểm dừng 2 (mở BOSS) |
|---|---|---|
| 1 | `BITNOI` | `SANBO` |

Mã không phân biệt hoa/thường. Trong `lesson.js` chỉ lưu dạng băm; đổi mã thì tính lại băm:

```bash
node -e "let h=2166136261,s='cpp8v2|'+'MAMOI';for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}console.log((h>>>0).toString(16).toUpperCase().padStart(8,'0'))"
```

## Kiểm tra trước khi giao học sinh

```bash
node _Web/_kiem_tra/kiem_tra_bai.js bai01
```

Kiểm tra: mọi đáp án mẫu (`_kiem_tra/dap_an_bai01.js`) đạt; mọi code ban đầu trượt; bọ chưa "chết sẵn";
câu đoán output khớp kết quả JSCPP **và** g++ thật. Kết quả phải là `TỔNG SỐ LỖI: 0`.

## Thêm bài mới

Chép `bai01/` thành `bai0N/`, sửa `lesson.js` (id, number, title, story, badge, skills, errorTable, steps),
viết `_kiem_tra/dap_an_bai0N.js`, chạy kiểm tra, rồi bật `ready: true` cho bài đó trong `index.html`.

Các dạng nhiệm vụ: `choice` (có `bet: true` để đặt cược, `why` giải thích từng lựa chọn sai), `sequence`
(`mono: true` để lắp dòng code), `code` (`expected` hoặc `tests: [{input, expected}]` cho bài có `cin`;
`rules` cho yêu cầu thêm; `bugs` để săn bọ). `advanced: true` = nâng cao ở BOSS; `bonus: true` = nhiệm vụ phụ ở điểm dừng.

## Chạy thử trên máy

```bash
python -m http.server 8765 --directory _Web
```

Mở `http://localhost:8765/bai01/`.

## Đăng web

Đẩy thư mục `_Web` lên repo GitHub (ví dụ `vuongndlst/cpp-8-v2`), Settings → Pages → GitHub Actions.
Workflow `.github/workflows/pages.yml` tự đăng mỗi lần push lên `main`.

## Lưu dữ liệu

Không có máy chủ. Tiến độ lưu trong trình duyệt theo họ tên + lớp, mỗi bài một khoá riêng (`cpp8v2:bai01:…`).
Nút **Học sinh mới** xoá dữ liệu C++ Journey 8 trên máy đó.
