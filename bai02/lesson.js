/* Bài 2 — Khai báo biến, câu lệnh cin (chỉ kiểu int; phép + - *)
   Câu chuyện: Căng tin của Bit — Bit cần NHỚ số và HỎI khách.
   Mã mở khoá: chỉ ghi trong README của bài (thư mục giáo viên) — KHÔNG ghi trong web công khai.
*/
"use strict";
const { giaiMa, codeVaManHinh, doan, meo, docThem, khongCo, demLenh } = window.KIT;
const H = "#include <iostream>\nusing namespace std;\n\nint main() {\n";
const E = "    return 0;\n}";
const prog = (...dong) => H + dong.map(d => "    " + d).join("\n") + "\n" + E;

window.LESSON = {
  id: "bai02", number: 2,
  title: "Biến và lệnh cin",
  story: "Căng tin của Bit",
  badge: { icon: "🧮", name: "Thu ngân căng tin" },
  skills: ["Khai báo biến int", "Gán và gán lại", "Đặt tên biến", "cin và câu dẫn", "Phép + − *", "Nhập → Xử lý → Xuất"],

  errorTable: [
    ["Máy không biết tên \"soKeo\"", "Chưa khai báo biến, hoặc viết sai hoa/thường (<code>sokeo</code> ≠ <code>soKeo</code>)", "Khai báo <code>int soKeo;</code> trước khi dùng; gõ tên giống hệt"],
    ["Một biến bị khai báo hai lần", "Viết <code>int</code> trước cùng một tên hai lần", "Lần sau chỉ gán: <code>soKeo = 5;</code> (không có int)"],
    ["Màn hình in ra <em>chữ</em> tên biến", "Đặt tên biến trong ngoặc kép: <code>cout &lt;&lt; \"tuoi\";</code>", "Bỏ ngoặc kép: <code>cout &lt;&lt; tuoi;</code>"],
    ["Lỗi cú pháp ở dòng có cin", "Viết <code>cin &lt;&lt;</code> (sai chiều) hoặc thiếu <code>;</code>", "<code>cin &gt;&gt; bien;</code> — mũi tên chỉ vào biến"],
    ["Màn hình trống, không biết nhập gì", "Quên in câu dẫn trước <code>cin</code>", "Thêm <code>cout &lt;&lt; \"Nhap ...: \";</code> ngay trước cin"],
    ["Kết quả sai khi nhập số khác", "Viết thẳng số vào phép tính thay vì dùng biến", "Tính bằng biến: <code>giaBanh * soBanh</code>"],
    ["Tên biến không hợp lệ", "Có dấu cách, dấu tiếng Việt, gạch ngang, hoặc bắt đầu bằng số", "Dùng camelCase: <code>soKeo</code>, <code>tienCom</code>"]
  ],

  steps: [
    /* ================= CHẶNG 1 ================= */
    {
      kind: "stage", id: "stage-1", number: 1, nav: "Hộp nhớ",
      kicker: "CHẶNG 1 · BIẾN LÀ GÌ",
      title: "Biến — chiếc hộp có tên",
      bit: "Căng tin của mình mở rồi! Nhưng mình hay quên giá tiền lắm. Bạn chỉ mình cách <strong>cất số vào hộp nhớ</strong> nhé!",
      objectives: ["Khai báo biến kiểu int", "Gán giá trị cho biến", "Phân biệt in biến và in chữ"],
      lesson: `
        <div class="note-card blue short-note">
          <h3>📦 Biến là gì?</h3>
          <p><strong>Biến</strong> là một chiếc hộp có <strong>tên</strong>, dùng để cất một giá trị. Kiểu <code>int</code> = hộp chỉ đựng <strong>số nguyên</strong> (…, −1, 0, 1, 2, …).</p>
        </div>
        ${codeVaManHinh(`int giaBanh = 12000;
cout << "Gia banh: " << giaBanh;`, "Gia banh: 12000", "Cất số vào biến rồi in ra")}
        ${giaiMa("🔍 GIẢI MÃ TỪNG LỆNH", [
          { code: "int giaBanh;", y: "<strong>Khai báo</strong>: tạo hộp tên <code>giaBanh</code> đựng số nguyên.", sb: "set [giaBanh v] to (0)", nho: "Scratch: bấm “Tạo một biến”." },
          { code: "giaBanh = 12000;", y: "<strong>Gán</strong>: bỏ số 12000 vào hộp.", sb: "set [giaBanh v] to (12000)" },
          { code: "int giaBanh = 12000;", y: "Khai báo và gán cùng lúc (hay dùng nhất).", nhan: true },
          { code: "cout << giaBanh;", y: "In <strong>giá trị</strong> trong hộp → <code>12000</code>.", sb: "say (giaBanh)" },
          { code: 'cout << "giaBanh";', y: "Có ngoặc kép → in <strong>chữ</strong> giaBanh, không phải số!" }
        ])}
        ${doan("<code>int keo = 5; cout &lt;&lt; keo &lt;&lt; \"keo\";</code> in ra gì?", "<code>5keo</code> — <code>keo</code> không ngoặc kép là giá trị 5; <code>\"keo\"</code> có ngoặc kép là chữ.")}
        ${docThem([["variables", "Biến"], ["data_types", "Kiểu dữ liệu"]])}
      `,
      challenges: [
        {
          id: "s1-predict", type: "choice", icon: "🔮", bet: true, mono: true,
          title: "Nhiệm vụ 1: Biến hay chữ?",
          prompt: "Đoán màn hình, <strong>đặt cược</strong> nếu tự tin.",
          code: `int keo = 5;
cout << "keo" << endl;
cout << keo;`,
          options: [
            { text: "keo\nkeo", why: "Dòng 2 không có ngoặc kép → in giá trị của biến keo là 5." },
            { text: "5\n5", why: "Dòng 1 có ngoặc kép → in đúng chữ keo." },
            { text: "keo\n5" },
            { text: "5\nkeo", why: "Thứ tự ngược rồi: dòng có ngoặc kép chạy trước." }
          ],
          answer: "keo\n5",
          why: "Chuẩn! Có ngoặc kép là CHỮ, không ngoặc kép là GIÁ TRỊ trong hộp."
        },
        {
          id: "s1-code", type: "code", icon: "📦",
          title: "Nhiệm vụ 2: Cất số kẹo vào hộp",
          prompt: "Khai báo biến rồi dùng biến đó để in.",
          requirements: ["Khai báo biến soKeo kiểu int, gán 12.", "Lệnh cout phải dùng biến soKeo (không viết thẳng số 12)."],
          starter: prog("// Khai bao bien soKeo o day", "", 'cout << "So keo: " << 0;'),
          expected: "So keo: 12",
          rules: [
            { test: c => /int\s+soKeo\s*=\s*12\s*;/.test(window.CPP.stripComments(c)), msg: "Cần dòng khai báo: int soKeo = 12;" },
            { test: c => /<<\s*soKeo\b/.test(window.CPP.stripComments(c)), msg: "Màn hình đúng rồi, nhưng cout phải in biến soKeo chứ không viết thẳng số." }
          ],
          why: "Hộp soKeo đã cất số 12 và máy in đúng giá trị trong hộp!",
          hints: ["Khai báo: int soKeo = 12;", "Thay số 0 trong cout bằng tên biến soKeo."]
        }
      ]
    },

    /* ================= CHẶNG 2 ================= */
    {
      kind: "stage", id: "stage-2", number: 2, nav: "Đổi giá & đặt tên",
      kicker: "CHẶNG 2 · GÁN LẠI · ĐẶT TÊN",
      title: "Đổi giá trị và đặt tên biến",
      bit: "Giá bánh vừa tăng! Mình phải <strong>đổi số trong hộp</strong>. À, đặt tên hộp thế nào cho đúng nhỉ?",
      objectives: ["Gán lại giá trị cho biến", "Dùng + − * với biến", "Đặt tên biến hợp lệ (camelCase)"],
      lesson: `
        ${giaiMa("🔁 GÁN LẠI VÀ TÍNH TOÁN", [
          { code: "diem = 9;", y: "Gán lại: hộp chỉ giữ <strong>giá trị mới</strong> (giá trị cũ mất).", sb: "set [diem v] to (9)" },
          { code: "diem = diem + 2;", y: "Lấy giá trị cũ cộng 2, rồi cất lại vào hộp.", sb: "change [diem v] by (2)", nhan: true },
          { code: "int tong = a + b;", y: "Phép cộng <code>+</code>, trừ <code>-</code>, nhân <code>*</code> dùng được với biến.", sb: "set [tong v] to ((a) + (b))" }
        ])}
        ${codeVaManHinh(`int diem = 7;
diem = diem + 2;
cout << "Diem moi: " << diem;`, "Diem moi: 9", "Cộng thêm 2 điểm")}
        <div class="lesson-grid">
          <article class="note-card green"><h3>✅ Tên hợp lệ</h3><ul>
            <li><code>soKeo</code>, <code>tienCom</code>, <code>diem1</code></li>
            <li>Chỉ có chữ (không dấu), số, dấu <code>_</code></li>
            <li><strong>camelCase</strong>: từ đầu viết thường, các từ sau viết hoa chữ đầu</li></ul></article>
          <article class="note-card orange"><h3>❌ Tên sai</h3><ul>
            <li><code>so keo</code> — có dấu cách</li>
            <li><code>2keo</code> — bắt đầu bằng số</li>
            <li><code>so-keo</code>, <code>sốKẹo</code> — gạch ngang, có dấu</li></ul></article>
        </div>
        ${meo("<code>soKeo</code> và <code>sokeo</code> là <strong>hai tên khác nhau</strong> — gõ tên biến giống hệt lúc khai báo.")}
        ${docThem([["variables_identifiers", "Đặt tên biến"], ["variables_multiple", "Nhiều biến"], ["operators", "Phép toán"]])}
      `,
      challenges: [
        {
          id: "s2-name", type: "choice", icon: "🏷️",
          title: "Nhiệm vụ 1: Tên nào hợp lệ?",
          prompt: "Chọn tên biến <strong>viết đúng</strong> trong C++.",
          options: [
            { text: "so keo", why: "Tên biến không được có dấu cách." },
            { text: "2keo", why: "Tên biến không được bắt đầu bằng số." },
            { text: "soKeo" },
            { text: "so-keo", why: "Dấu gạch ngang bị máy hiểu là phép trừ." }
          ],
          answer: "soKeo",
          why: "Đúng! soKeo viết theo camelCase."
        },
        {
          id: "s2-code", type: "code", icon: "➕",
          title: "Nhiệm vụ 2: Thưởng thêm điểm",
          prompt: "Dùng phép gán lại để cộng thêm 2 điểm.",
          requirements: ["Giữ nguyên dòng int diem = 7;", "Thêm lệnh gán lại cộng 2 vào diem.", "In ra: Diem moi: 9 (cout dùng biến diem)."],
          starter: prog("int diem = 7;", "// Cong them 2 diem o day", "", 'cout << "Diem moi: " << 9;'),
          expected: "Diem moi: 9",
          rules: [
            { test: c => /diem\s*=\s*diem\s*\+\s*2\s*;|diem\s*\+=\s*2\s*;/.test(window.CPP.stripComments(c)), msg: "Cần lệnh gán lại: diem = diem + 2;" },
            { test: c => /<<\s*diem\b/.test(window.CPP.stripComments(c)), msg: "cout phải in biến diem, không viết thẳng số 9." }
          ],
          why: "Hộp diem giờ chứa 9!",
          hints: ["diem = diem + 2; nghĩa là lấy 7 cộng 2 rồi cất lại.", "Rồi đổi số 9 trong cout thành tên biến diem."]
        }
      ]
    },

    /* ================= ĐIỂM DỪNG 1 ================= */
    {
      kind: "gate", id: "gate-1", nav: "Điểm dừng 1",
      kicker: "ĐIỂM DỪNG 1 · SAU CHẶNG 1–2",
      codeHash: "19E72064",
      todo: [
        "Thầy hỏi: <strong>biến là gì?</strong> In biến khác in chữ thế nào? Con nói trước, thầy chốt sau.",
        "Chép phần <strong>Ghi bài 1</strong> trên slide vào vở.",
        "Trả lời <strong>2 câu ClassPoint</strong>.",
        "<strong>Luyện tập cặp</strong> trên <a href=\"https://www.programiz.com/cpp-programming/online-compiler/\" target=\"_blank\" rel=\"noopener\">Programiz ↗</a>: “Thực đơn căng tin”, chụp ảnh nộp ClassPoint.",
        "Thầy hiện <strong>mã mở khoá</strong> → con nhập vào ô bên dưới."
      ],
      challenges: [
        {
          id: "g1-bonus", type: "code", icon: "🎁", bonus: true,
          title: "Nhiệm vụ phụ: Phép tính của Bit",
          prompt: "Dùng biến a, b để in đúng 3 dòng.",
          requirements: ["Không viết thẳng kết quả 10, 2, 24 — phải tính bằng a và b."],
          starter: prog("int a = 6;", "int b = 4;", "// In a + b, a - b, a * b"),
          expected: "6 + 4 = 10\n6 - 4 = 2\n6 * 4 = 24",
          rules: [{ test: c => /a\s*\+\s*b/.test(c) && /a\s*-\s*b/.test(c) && /a\s*\*\s*b/.test(c), msg: "Phải tính bằng a + b, a - b, a * b." }],
          why: "Bit tính nhanh như máy tính bỏ túi!",
          hints: ["cout << a << \" + \" << b << \" = \" << a + b << endl;"]
        }
      ]
    },

    /* ================= CHẶNG 3 ================= */
    {
      kind: "stage", id: "stage-3", number: 3, nav: "Máy hỏi",
      kicker: "CHẶNG 3 · LỆNH cin",
      title: "Máy hỏi, người dùng trả lời",
      bit: "Khách tới mua mà mình không biết họ muốn mấy cái bánh! Bạn dạy mình <strong>hỏi và chờ câu trả lời</strong> với.",
      objectives: ["Dùng cin >> để nhập số vào biến", "In câu dẫn trước mỗi cin", "Thử chương trình với nhiều số nhập khác nhau"],
      lesson: `
        ${giaiMa("⌨️ GIẢI MÃ LỆNH NHẬP", [
          { code: 'cout << "Nhap tuoi: ";', y: "<strong>Câu dẫn</strong>: cho người dùng biết cần gõ gì.", sb: "ask [Nhap tuoi:] and wait" },
          { code: "cin >> tuoi;", y: "Máy <strong>dừng lại chờ</strong> gõ số, rồi cất vào biến <code>tuoi</code>.", sb: "set [tuoi v] to (answer)", nhan: true },
          { code: "cout << tuoi + 1;", y: "Dùng số vừa nhập để tính và in." }
        ])}
        ${codeVaManHinh(`int tuoi;
cout << "Nhap tuoi: ";
cin >> tuoi;
cout << "Nam sau ban " << tuoi + 1 << " tuoi";`, "Nhap tuoi: 13\nNam sau ban 14 tuoi", "Hỏi tuổi", "13")}
        ${meo("Trên web, con gõ số vào ô <strong>📥 DỮ LIỆU NHẬP</strong> rồi bấm Chạy. Số con nhập <strong>hiện lại trên màn hình</strong> giống Programiz.")}
        ${meo("<code>cout &lt;&lt;</code> đưa ra màn hình · <code>cin &gt;&gt;</code> đưa <strong>vào biến</strong> — mũi tên chỉ hướng dữ liệu đi.")}
        ${docThem([["user_input", "Nhập dữ liệu (cin)"]])}
      `,
      challenges: [
        {
          id: "s3-predict", type: "choice", icon: "🔮", bet: true, mono: true, input: "7",
          title: "Nhiệm vụ 1: Người dùng gõ 7",
          prompt: "Người dùng gõ <code>7</code>. Màn hình hiện gì?",
          code: `int n;
cout << "Nhap n: ";
cin >> n;
cout << n * 2;`,
          options: [
            { text: "Nhap n: 7\n14" },
            { text: "Nhap n: 7\nn * 2", why: "n * 2 không có ngoặc kép → máy tính ra giá trị." },
            { text: "Nhap n: \n14", why: "Số người dùng gõ (7) hiện lại trên màn hình." },
            { text: "14", why: "Câu dẫn \"Nhap n: \" vẫn được in ra trước." }
          ],
          answer: "Nhap n: 7\n14",
          why: "Đúng! Câu dẫn → số người dùng gõ → kết quả tính."
        },
        {
          id: "s3-code", type: "code", icon: "⌨️",
          title: "Nhiệm vụ 2: Hỏi số kẹo",
          prompt: "Thêm lệnh nhập để chương trình đúng với <strong>mọi số</strong> người dùng gõ.",
          requirements: ["Thêm cin để nhập vào biến soKeo.", "Đạt cả 2 ca kiểm thử."],
          starter: prog("int soKeo = 0;", 'cout << "Nhap so keo: ";', "// Them lenh nhap o day", "", 'cout << "Ban co " << soKeo << " keo";'),
          tests: [
            { input: "5", expected: "Nhap so keo: 5\nBan co 5 keo" },
            { input: "12", expected: "Nhap so keo: 12\nBan co 12 keo" }
          ],
          why: "Máy đã biết hỏi rồi! Đúng cả 2 ca.",
          hints: ["Lệnh nhập: cin >> soKeo;", "Đặt cin ngay sau dòng câu dẫn."]
        }
      ]
    },

    /* ================= CHẶNG 4 ================= */
    {
      kind: "stage", id: "stage-4", number: 4, nav: "Nhập–Xử lý–Xuất",
      kicker: "CHẶNG 4 · TỰ XÂY CHƯƠNG TRÌNH",
      title: "Nhập → Xử lý → Xuất",
      bit: "Mọi chương trình đều đi 3 bước: <strong>hỏi số, tính, rồi báo kết quả</strong>. Mình cùng xây máy tính tiền nhé!",
      objectives: ["Sắp xếp chương trình theo Nhập → Xử lý → Xuất", "Viết chương trình nhập, tính và in", "Kiểm thử bằng nhiều ca"],
      lesson: `
        <div class="build-method"><h3>🧭 BA BƯỚC CỦA MỌI CHƯƠNG TRÌNH</h3>
          <div class="build-steps">
            <div><span>1</span><strong>NHẬP</strong><small>câu dẫn + cin</small></div>
            <div><span>2</span><strong>XỬ LÝ</strong><small>tính bằng + − *</small></div>
            <div><span>3</span><strong>XUẤT</strong><small>cout kết quả</small></div>
          </div></div>
        ${codeVaManHinh(`int a, b;
cout << "Nhap a: ";
cin >> a;
cout << "Nhap b: ";
cin >> b;
int tong = a + b;
cout << "Tong: " << tong;`, "Nhap a: 3\nNhap b: 5\nTong: 8", "Cộng hai số", "3 5")}
        ${meo("<code>int a, b;</code> khai báo 2 biến cùng lúc. Nhập 2 số: gõ <code>3 5</code> (cách nhau dấu cách).")}
        ${docThem([["user_input", "cin"], ["operators", "Phép toán"]])}
      `,
      challenges: [
        {
          id: "s4-order", type: "sequence", icon: "🧩", mono: true,
          title: "Nhiệm vụ 1: Xếp đúng 3 bước",
          prompt: "Lắp các dòng thành chương trình tính tiền 1 món theo <strong>Nhập → Xử lý → Xuất</strong>.",
          shuffle: ['cout << "Tien: " << tien;', "cin >> soLuong;", "int soLuong;", "int tien = soLuong * 5000;", 'cout << "Nhap so luong: ";'],
          answer: ["int soLuong;", 'cout << "Nhap so luong: ";', "cin >> soLuong;", "int tien = soLuong * 5000;", 'cout << "Tien: " << tien;'],
          hintWrong: "Khai báo → câu dẫn → cin → tính → in.",
          why: "Chuẩn quy trình: khai báo, hỏi, tính, báo!",
          hints: ["Phải khai báo biến trước khi nhập.", "Câu dẫn đứng ngay trước cin; tính xong mới in."]
        },
        {
          id: "s4-code", type: "code", icon: "🎂",
          title: "Nhiệm vụ 2: Máy tính tuổi",
          prompt: "Nhập năm sinh, in tuổi của người đó trong năm 2026.",
          requirements: ["Câu dẫn đúng nguyên văn: Nhap nam sinh: ", "Tính tuổi = 2026 − năm sinh.", "In: Tuoi nam 2026: <số tuổi>"],
          starter: prog("int namSinh;", "// Nhap: cau dan + cin", "", "// Xu ly: tinh tuoi", "", "// Xuat: in tuoi"),
          tests: [
            { input: "2013", expected: "Nhap nam sinh: 2013\nTuoi nam 2026: 13" },
            { input: "1990", expected: "Nhap nam sinh: 1990\nTuoi nam 2026: 36" }
          ],
          why: "Máy tính tuổi chạy đúng mọi ca!",
          hints: ["Nhập: cout << \"Nhap nam sinh: \"; cin >> namSinh;", "Xử lý: int tuoi = 2026 - namSinh;  Xuất: cout << \"Tuoi nam 2026: \" << tuoi;"]
        }
      ]
    },

    /* ================= ĐIỂM DỪNG 2 ================= */
    {
      kind: "gate", id: "gate-2", nav: "Điểm dừng 2",
      kicker: "ĐIỂM DỪNG 2 · SAU CHẶNG 3–4",
      codeHash: "EED0A344",
      todo: [
        "Thầy hỏi: <strong>cin khác cout thế nào? Vì sao cần câu dẫn?</strong> Con nói trước, thầy chốt sau.",
        "Chép phần <strong>Ghi bài 2</strong> trên slide vào vở.",
        "Trả lời <strong>2 câu ClassPoint</strong>.",
        "<strong>Luyện tập cặp</strong> trên <a href=\"https://www.programiz.com/cpp-programming/online-compiler/\" target=\"_blank\" rel=\"noopener\">Programiz ↗</a>: “Tiền bánh mì”, chụp ảnh nộp ClassPoint.",
        "Thầy hiện <strong>mã mở BOSS</strong> → con nhập vào ô bên dưới."
      ],
      challenges: [
        {
          id: "g2-bonus", type: "code", icon: "🎁", bonus: true,
          title: "Nhiệm vụ phụ: Hình vuông",
          prompt: "Nhập cạnh hình vuông, in chu vi và diện tích.",
          requirements: ["Câu dẫn: Nhap canh: ", "Dòng 2: Chu vi: …  Dòng 3: Dien tich: …"],
          starter: prog("int canh;", "// Viet chuong trinh o day"),
          tests: [
            { input: "5", expected: "Nhap canh: 5\nChu vi: 20\nDien tich: 25" },
            { input: "3", expected: "Nhap canh: 3\nChu vi: 12\nDien tich: 9" }
          ],
          why: "Hình vuông nào Bit cũng tính được!",
          hints: ["Chu vi = canh * 4; diện tích = canh * canh."]
        }
      ]
    },

    /* ================= BOSS ================= */
    {
      kind: "boss", id: "boss", nav: "BOSS",
      kicker: "BOSS · CÁ NHÂN",
      title: "Hạ Quái Vật Quên Số",
      bossName: "Quái Vật Quên Số",
      bit: "Quái Vật Quên Số làm rối sổ sách căng tin! Mỗi nhiệm vụ đúng là một đòn. <strong>Tự làm một mình nhé.</strong>",
      lesson: docThem([["variables", "Biến"], ["user_input", "cin"], ["operators", "Phép toán"]], "🚑 Trạm cứu trợ — quên thì xem lại"),
      challenges: [
        {
          id: "boss-1", type: "choice", icon: "⚔️", bet: true, mono: true,
          title: "Đòn 1: Hộp đổi giá trị",
          prompt: "Màn hình hiện gì?",
          code: `int a = 4;
int b = a + 3;
a = a * 2;
cout << a << " " << b;`,
          options: [
            { text: "4 7", why: "Dòng 3 đã gán lại a = 4 * 2 = 8." },
            { text: "8 7" },
            { text: "8 11", why: "b được tính ở dòng 2, lúc a còn là 4 → b = 7; đổi a sau đó không làm b đổi." },
            { text: "a b", why: "Không có ngoặc kép → in giá trị, không in chữ." }
          ],
          answer: "8 7",
          why: "Trúng đòn! b đã tính xong từ trước, đổi a không làm b đổi."
        },
        {
          id: "boss-2", type: "code", icon: "⚔️",
          title: "Đòn 2: Săn bọ sĩ số",
          prompt: "Sửa hết bọ để chương trình tính đúng sĩ số.",
          requirements: ["Đạt cả 2 ca kiểm thử."],
          starter: prog("int soNam, soNu;", 'cout << "Nhap so nam: ";', "cin >> soNam", 'cout << "Nhap so nu: ";', "cin >> SoNu;", 'cout << "Si so: " << soNam + sonu;'),
          tests: [
            { input: "15 17", expected: "Nhap so nam: 15\nNhap so nu: 17\nSi so: 32" },
            { input: "20 0", expected: "Nhap so nam: 20\nNhap so nu: 0\nSi so: 20" }
          ],
          bugs: [
            { label: "thiếu ; sau cin >> soNam", fixed: c => /cin\s*>>\s*soNam\s*;/.test(c) },
            { label: "SoNu sai hoa/thường", fixed: c => khongCo(c, "\\bSoNu\\b") },
            { label: "sonu sai hoa/thường", fixed: c => khongCo(c, "\\bsonu\\b") }
          ],
          why: "Trúng đòn! Tên biến phải gõ giống hệt lúc khai báo.",
          hints: ["Biến được khai báo là soNu — so từng chữ hoa/thường.", "Dòng cin >> soNam thiếu gì ở cuối?"]
        },
        {
          id: "boss-3", type: "code", icon: "⚔️",
          title: "Đòn 3: Đếm bánh trong kho",
          prompt: "Nhập số bánh mỗi hộp và số hộp, in tổng số bánh.",
          requirements: ["Câu dẫn 1: Nhap so banh moi hop: ", "Câu dẫn 2: Nhap so hop: ", "In: Tong so banh: <kết quả>"],
          starter: prog("// Khai bao bien, nhap, tinh, in"),
          tests: [
            { input: "6 4", expected: "Nhap so banh moi hop: 6\nNhap so hop: 4\nTong so banh: 24" },
            { input: "10 0", expected: "Nhap so banh moi hop: 10\nNhap so hop: 0\nTong so banh: 0" }
          ],
          why: "Đòn cuối trúng đích! Quái Vật Quên Số gục rồi!",
          hints: ["Hai biến: int banhMoiHop, soHop;", "Tổng = banhMoiHop * soHop."]
        },
        {
          id: "adv-1", type: "code", icon: "🥇", advanced: true,
          title: "Nâng cao 1: Ba phép tính",
          prompt: "Nhập a, b. In tổng, hiệu, tích trên 3 dòng.",
          requirements: ["Câu dẫn: Nhap a: và Nhap b: ", "3 dòng: Tong: …  Hieu: …  Tich: …"],
          starter: prog("int a, b;", "// Viet tiep"),
          tests: [
            { input: "7 3", expected: "Nhap a: 7\nNhap b: 3\nTong: 10\nHieu: 4\nTich: 21" },
            { input: "2 5", expected: "Nhap a: 2\nNhap b: 5\nTong: 7\nHieu: -3\nTich: 10" }
          ],
          why: "Xuất sắc! Hiệu có thể âm — máy tính vẫn đúng.",
          hints: ["Hieu = a - b; nếu a nhỏ hơn b thì kết quả âm, không sao."]
        },
        {
          id: "adv-2", type: "code", icon: "🥇", advanced: true,
          title: "Nâng cao 2: Đổi phút ra giây",
          prompt: "Nhập số phút, in số giây tương ứng.",
          requirements: ["Câu dẫn: Nhap so phut: ", "In: <phút> phut = <giây> giay"],
          starter: prog("int phut;", "// Viet tiep"),
          tests: [
            { input: "3", expected: "Nhap so phut: 3\n3 phut = 180 giay" },
            { input: "45", expected: "Nhap so phut: 45\n45 phut = 2700 giay" }
          ],
          why: "Huy hiệu vàng thuộc về bạn!",
          hints: ["1 phút = 60 giây → giay = phut * 60."]
        }
      ]
    }
  ]
};
