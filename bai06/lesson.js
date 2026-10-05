/* Bài 6 (mở rộng) — Hàm cơ bản: hàm void, tham số, giá trị trả về, setup()/loop() kiểu Arduino
   Câu chuyện: Xưởng mạch Arduino — Bit chuẩn bị điều khiển đèn LED trên mạch Arduino.
   Mã mở khoá: chỉ ghi trong README của bài (thư mục giáo viên) — KHÔNG ghi trong web công khai.
*/
"use strict";
const { giaiMa, codeVaManHinh, doan, meo, docThem, cuPhap } = window.KIT;
const H0 = "#include <iostream>\nusing namespace std;\n\n";
const full = (...dong) => H0 + dong.join("\n");                 // chương trình đủ (có hàm ngoài main)
const sc = c => window.CPP.stripComments(c);
const phanMain = c => { const s = sc(c); const i = s.search(/\bint\s+main\s*\(/); return i < 0 ? "" : s.slice(i); };
const dem = (c, re) => (sc(c).match(re) || []).length;
const PROGRAMIZ = "<a href=\"https://www.programiz.com/cpp-programming/online-compiler/\" target=\"_blank\" rel=\"noopener\">Programiz ↗</a>";

window.LESSON = {
  id: "bai06", number: 6,
  title: "Hàm cơ bản (mở rộng)",
  story: "Xưởng mạch Arduino",
  badge: { icon: "🔌", name: "Kỹ sư mạch điện" },
  skills: ["Định nghĩa và gọi hàm", "Hàm void", "Tham số", "Giá trị trả về (return)", "setup() và loop()", "Bắt lỗi hàm"],

  errorTable: [
    ["Máy chưa biết hàm … (hàm viết sau main)", "Hàm được viết SAU main() mà chưa khai báo trước", "Đưa hàm lên trên main(), hoặc khai báo trước main: <code>void batDen(int chan);</code>"],
    ["Máy không biết tên \"BatDen\"", "Gọi sai chữ hoa/thường so với lúc viết hàm", "Gọi đúng tên giống hệt: <code>batDen</code>"],
    ["Gọi hàm chưa đúng (thiếu giá trị)", "Truyền thiếu/thừa giá trị so với số tham số", "Truyền đủ, đúng thứ tự: <code>batDen(13);</code>"],
    ["Hàm int chưa trả về giá trị", "Hàm kiểu int thiếu lệnh <code>return</code>", "Thêm <code>return ketQua;</code> ở cuối hàm"],
    ["Chạy được nhưng không in gì", "Viết <code>chao;</code> — thiếu cặp ngoặc tròn nên hàm không được gọi", "Gọi hàm phải có <code>()</code>: <code>chao();</code>"],
    ["Lỗi cú pháp ở dòng khai báo hàm", "Thiếu kiểu (void/int) hoặc thiếu ngoặc tròn", "Viết đủ: <code>void tenHam() {</code>"],
    ["Hàm in ra nhưng main không dùng được kết quả", "Dùng hàm void (chỉ in) trong khi cần một giá trị", "Viết hàm <code>int</code> và <code>return</code> kết quả"]
  ],

  steps: [
    {
      kind: "stage", id: "stage-1", number: 1, nav: "Hàm là gì",
      kicker: "CHẶNG 1 · ĐỊNH NGHĨA VÀ GỌI HÀM",
      title: "Hàm — một nhóm lệnh có tên",
      bit: "Sắp tới mình sẽ điều khiển mạch Arduino thật! Ở đó, mọi chương trình đều viết bằng <strong>hàm</strong>. Bạn học cùng mình cách tự tạo một hàm nhé!",
      objectives: ["Hiểu hàm là một nhóm lệnh có tên", "Định nghĩa hàm void", "Gọi một hàm nhiều lần"],
      lesson: `
        <div class="note-card blue short-note">
          <h3>🧩 Hàm là gì?</h3>
          <p><strong>Hàm</strong> là một <strong>nhóm lệnh được đặt tên</strong>. Viết một lần, <strong>gọi</strong> bao nhiêu lần cũng được —
          giống khối “Tạo một khối” (Khối của tôi) trong Scratch. Thật ra bạn đã dùng một hàm từ Bài 1: <code>main()</code>!</p>
        </div>
        ${codeVaManHinh(`void chao() {
    cout << "Xin chao!" << endl;
}

int main() {
    chao();
    chao();
    return 0;
}`, "Xin chao!\nXin chao!", "Viết hàm một lần, gọi hai lần")}
        ${giaiMa("🔍 GIẢI MÃ TỪNG PHẦN", [
          { code: "void chao() {\n    ...\n}", y: "<strong>Định nghĩa hàm</strong> tên <code>chao</code>. <code>void</code> = hàm chỉ làm việc, <strong>không trả về</strong> giá trị.", sb: "define chao" },
          { code: "chao();", y: "<strong>Gọi hàm</strong>: máy nhảy vào chạy các lệnh trong hàm, chạy xong thì quay lại dòng tiếp theo.", sb: "chao :: custom", nhan: true },
          { code: "int main() { ... }", y: "<code>main</code> cũng là một hàm — hàm đặc biệt, máy chạy nó <strong>đầu tiên</strong>.", sb: "when flag clicked" }
        ])}
        ${cuPhap({ ten: "ĐỊNH NGHĨA VÀ GỌI HÀM",
          mau: ["void ‹tên hàm›() {\n    ‹các lệnh›\n}", "‹tên hàm›();"],
          phan: [["void", "hàm không trả về giá trị"],
                 ["‹tên hàm›", "đặt theo quy tắc như tên biến; nên là một động từ: <code>chao</code>, <code>batDen</code>"]],
          quyTac: ["Viết hàm <strong>trước</strong> <code>main()</code> — máy đọc từ trên xuống",
                   "Gọi hàm phải có cặp ngoặc tròn <code>()</code> và dấu <code>;</code>",
                   "Một hàm có thể được gọi nhiều lần"],
          viDu: 'void bip() {\n    cout << "Bip!" << endl;\n}\n\nint main() {\n    bip();\n    bip();\n    return 0;\n}', man: "Bip!\nBip!" })}
        ${docThem([["functions", "Hàm"]])}
      `,
      challenges: [
        {
          id: "s1-predict", type: "choice", icon: "🔮", bet: true, mono: true,
          title: "Nhiệm vụ 1: Hàm chạy lúc nào?",
          prompt: "Bạn đọc code rồi đoán xem màn hình hiện gì nhé. Chắc chắn thì bật <strong>⭐ Ngôi sao hi vọng</strong> để nhân đôi XP!",
          code: `void bip() {
    cout << "Bip ";
}

int main() {
    bip();
    cout << "Xong ";
    bip();
    return 0;
}`,
          options: [
            { text: "Bip Xong Bip" },
            { text: "Bip Bip Xong", why: "Máy chạy lần lượt trong main: bip() → cout Xong → bip()." },
            { text: "Xong", why: "Mỗi lần gọi bip(); là các lệnh trong hàm bip được chạy." },
            { text: "Bip Xong", why: "bip() được gọi 2 lần nên in Bip 2 lần." }
          ],
          answer: "Bip Xong Bip",
          why: "Chuẩn! Hàm chỉ chạy khi được gọi, và chạy đúng ở chỗ gọi."
        },
        {
          id: "s1-code", type: "code", icon: "👋",
          title: "Nhiệm vụ 2: Hàm chào cả lớp",
          prompt: "Bạn viết giúp mình hàm <code>chaoLop()</code> in 2 dòng lời chào, rồi trong <code>main</code> gọi hàm đó 2 lần nhé.",
          requirements: ["Định nghĩa hàm void chaoLop() in 2 dòng: Xin chao lop 8! và Minh la Bit.",
                         "Trong main, gọi chaoLop(); đúng 2 lần.", "Không viết lệnh cout trong main."],
          starter: full("// Dinh nghia ham chaoLop() o day", "", "int main() {", "    // Goi ham chaoLop() 2 lan", "    return 0;", "}"),
          expected: "Xin chao lop 8!\nMinh la Bit.\nXin chao lop 8!\nMinh la Bit.",
          rules: [
            { test: c => /void\s+chaoLop\s*\(\s*\)\s*\{/.test(sc(c)), msg: "Cần định nghĩa hàm: void chaoLop() { ... }" },
            { test: c => dem(phanMain(c), /chaoLop\s*\(\s*\)\s*;/g) === 2, msg: "Trong main phải gọi chaoLop(); đúng 2 lần." },
            { test: c => !/\bcout\b/.test(phanMain(c)), msg: "Màn hình đúng rồi, nhưng lệnh cout phải nằm trong hàm chaoLop, không nằm trong main." }
          ],
          why: "Viết một lần, gọi hai lần — đó là sức mạnh của hàm!",
          hints: ["void chaoLop() {\n    cout << \"Xin chao lop 8!\" << endl;\n    cout << \"Minh la Bit.\" << endl;\n}", "Trong main: chaoLop(); chaoLop();"]
        }
      ]
    },
    {
      kind: "stage", id: "stage-2", number: 2, nav: "Tham số",
      kicker: "CHẶNG 2 · THAM SỐ",
      title: "Truyền giá trị vào hàm",
      bit: "Mạch của mình có đèn ở nhiều chân khác nhau: chân 13, chân 8… Thay vì viết mỗi đèn một hàm, mình truyền <strong>số chân</strong> vào hàm qua <strong>tham số</strong>!",
      objectives: ["Viết hàm có tham số", "Truyền giá trị khi gọi hàm", "Dùng nhiều tham số đúng thứ tự"],
      lesson: `
        ${codeVaManHinh(`void batDen(int chan) {
    cout << "Den chan " << chan << ": SANG" << endl;
}

int main() {
    batDen(13);
    batDen(8);
    return 0;
}`, "Den chan 13: SANG\nDen chan 8: SANG", "Một hàm, nhiều chân đèn")}
        ${giaiMa("🔌 GIẢI MÃ THAM SỐ", [
          { code: "void batDen(int chan)", y: "<code>int chan</code> là <strong>tham số</strong>: một biến nhận giá trị mỗi khi hàm được gọi.", nhan: true },
          { code: "batDen(13);", y: "Gọi hàm và <strong>truyền</strong> 13 vào → bên trong hàm, <code>chan</code> = 13.", sb: "batDen (13) :: custom" },
          { code: "void veHinh(int dai, int rong)", y: "<strong>Nhiều tham số</strong> cách nhau dấu phẩy. Khi gọi phải truyền <strong>đúng thứ tự</strong>: <code>veHinh(4, 2)</code> → dai = 4, rong = 2." }
        ])}
        ${meo("Arduino có sẵn hàm <code>digitalWrite(13, HIGH);</code> — đó chính là <strong>gọi hàm với 2 tham số</strong>: số chân và mức điện.")}
        ${cuPhap({ ten: "HÀM CÓ THAM SỐ",
          mau: ["void ‹tên hàm›(int ‹tham số 1›, int ‹tham số 2›) {\n    ‹các lệnh dùng tham số›\n}", "‹tên hàm›(‹giá trị 1›, ‹giá trị 2›);"],
          quyTac: ["Mỗi tham số có kiểu và tên riêng: <code>int chan</code>",
                   "Các tham số cách nhau bằng dấu phẩy",
                   "Khi gọi: truyền <strong>đủ</strong> số giá trị, <strong>đúng thứ tự</strong>",
                   "Tham số chỉ dùng được bên trong hàm đó"],
          viDu: "void inTong(int a, int b) {\n    cout << a + b << endl;\n}\n\nint main() {\n    inTong(2, 3);\n    inTong(10, 5);\n    return 0;\n}", man: "5\n15" })}
        ${docThem([["function_param", "Tham số"], ["function_multiple", "Nhiều tham số"]])}
      `,
      challenges: [
        {
          id: "s2-predict", type: "choice", icon: "🔮", bet: true, mono: true,
          title: "Nhiệm vụ 1: Mấy ngôi sao?",
          prompt: "Bạn theo dõi giá trị của tham số n trong mỗi lần gọi rồi đoán màn hình nhé. Chắc chắn thì bật <strong>⭐ Ngôi sao hi vọng</strong>!",
          code: `void inSao(int n) {
    for (int i = 1; i <= n; i++) {
        cout << "*";
    }
    cout << endl;
}

int main() {
    inSao(2);
    inSao(4);
    return 0;
}`,
          options: [
            { text: "**\n****" },
            { text: "******", why: "Cuối hàm có endl nên mỗi lần gọi in xong thì xuống dòng." },
            { text: "**\n**", why: "Lần gọi thứ hai truyền 4 nên n = 4." },
            { text: "****\n**", why: "inSao(2) được gọi trước." }
          ],
          answer: "**\n****",
          why: "Chuẩn! Lần 1: n = 2; lần 2: n = 4."
        },
        {
          id: "s2-code", type: "code", icon: "💡",
          title: "Nhiệm vụ 2: Bật đèn theo chân",
          prompt: "Hàm <code>batDen</code> đang trống. Bạn viết thân hàm dùng tham số <code>chan</code> để mỗi lần gọi in ra đúng dòng của chân đó nhé.",
          requirements: ["Viết thân hàm batDen: in Den chan <số chân>: SANG rồi xuống dòng.",
                         "Dùng tham số chan — không viết thẳng số 13, 8, 2 trong hàm.", "Giữ nguyên 3 lần gọi trong main."],
          starter: full("void batDen(int chan) {", "    // In: Den chan <chan>: SANG", "}", "", "int main() {", "    batDen(13);", "    batDen(8);", "    batDen(2);", "    return 0;", "}"),
          expected: "Den chan 13: SANG\nDen chan 8: SANG\nDen chan 2: SANG",
          rules: [
            { test: c => /<<\s*chan\b/.test(sc(c)), msg: "Màn hình đúng, nhưng cout phải in tham số chan." },
            { test: c => !/\bcout\b/.test(phanMain(c)), msg: "Lệnh cout phải nằm trong hàm batDen, không nằm trong main." }
          ],
          why: "Một hàm điều khiển được mọi chân đèn!",
          hints: ['cout << "Den chan " << chan << ": SANG" << endl;']
        }
      ]
    },
    {
      kind: "gate", id: "gate-1", nav: "Điểm dừng 1",
      kicker: "ĐIỂM DỪNG 1 · SAU CHẶNG 1–2",
      codeHash: "52C511CB",
      todo: [
        "Thầy hỏi: <strong>hàm là gì? Tham số dùng để làm gì?</strong> Bạn nói trước, thầy chốt sau.",
        "Chép phần <strong>Ghi bài 1</strong> trên slide vào vở.",
        "Trả lời <strong>2 câu ClassPoint</strong>.",
        `<strong>Luyện tập cặp</strong> trên ${PROGRAMIZ}: “Bảng đèn của xưởng”, chụp ảnh nộp ClassPoint.`,
        "Thầy hiện <strong>mã mở khoá</strong> → bạn nhập vào ô bên dưới."
      ],
      challenges: [
        {
          id: "g1-bonus", type: "code", icon: "🎁", bonus: true,
          title: "Nhiệm vụ phụ: Hình chữ nhật sao",
          prompt: "Bạn viết thân hàm <code>veHinh(int dai, int rong)</code> để vẽ hình chữ nhật gồm <code>rong</code> dòng, mỗi dòng <code>dai</code> dấu <code>*</code> nhé.",
          requirements: ["Dùng hai tham số dai và rong.", "Giữ nguyên 2 lần gọi trong main."],
          starter: full("void veHinh(int dai, int rong) {", "    // Ve rong dong, moi dong dai dau *", "}", "", "int main() {", "    veHinh(5, 2);", "    veHinh(3, 3);", "    return 0;", "}"),
          expected: "*****\n*****\n***\n***\n***",
          rules: [{ test: c => /\bfor\s*\(/.test(sc(c)), msg: "Dùng vòng lặp for trong hàm." }],
          why: "Hai tham số, hai vòng lặp — đẹp!",
          hints: ["Vòng for ngoài chạy rong lần; trong mỗi lần, một vòng for in dai dấu * rồi endl."]
        }
      ]
    },
    {
      kind: "stage", id: "stage-3", number: 3, nav: "return",
      kicker: "CHẶNG 3 · GIÁ TRỊ TRẢ VỀ",
      title: "Hàm tính toán và trả kết quả về",
      bit: "Cảm biến của mình đo được số, và mình cần một hàm <strong>tính toán rồi trả kết quả về</strong> cho main dùng tiếp. Đó là việc của <code>return</code>!",
      objectives: ["Viết hàm int có return", "Dùng giá trị trả về trong cout và phép gán", "Phân biệt hàm void và hàm int"],
      lesson: `
        ${giaiMa("↩️ GIẢI MÃ return", [
          { code: "int tinhTong(int a, int b) {\n    return a + b;\n}", y: "Hàm kiểu <code>int</code>: tính xong thì <strong>trả về</strong> một số nguyên bằng <code>return</code>.", nhan: true },
          { code: "int kq = tinhTong(3, 4);", y: "Lời gọi hàm được thay bằng <strong>giá trị trả về</strong> (7), rồi gán cho biến kq." },
          { code: "cout << tinhTong(10, 5);", y: "Dùng thẳng giá trị trả về trong cout → in 15." },
          { code: "return ...;", y: "Gặp <code>return</code> là hàm <strong>kết thúc ngay</strong>; các lệnh phía sau trong hàm không chạy." }
        ])}
        <div class="lesson-grid">
          <article class="note-card purple"><h3>void — chỉ làm việc</h3>
            <p><code class="inline-code">void batDen(int chan)</code></p><p>Bật đèn, in chữ… <strong>không</strong> trả về giá trị.</p></article>
          <article class="note-card green"><h3>int — tính và trả về số</h3>
            <p><code class="inline-code">int tinhTien(int soLuong, int gia)</code></p><p>Tính xong <strong>return</strong> một số nguyên cho nơi gọi.</p></article>
        </div>
        ${codeVaManHinh(`int binhPhuong(int x) {
    return x * x;
}

int main() {
    int n;
    cout << "Nhap n: ";
    cin >> n;
    cout << "Binh phuong: " << binhPhuong(n);
    return 0;
}`, "Nhap n: 6\nBinh phuong: 36", "Hàm trả về bình phương", "6")}
        ${cuPhap({ ten: "HÀM TRẢ VỀ GIÁ TRỊ",
          mau: ["int ‹tên hàm›(int ‹tham số›) {\n    ‹các lệnh tính toán›\n    return ‹giá trị›;\n}", "int ‹tên biến› = ‹tên hàm›(‹giá trị›);"],
          quyTac: ["Hàm <code>int</code> phải có <code>return</code> một số nguyên",
                   "<code>return</code> kết thúc hàm ngay lập tức",
                   "Giá trị trả về dùng được trong cout, phép gán, phép tính",
                   "Hàm <code>void</code> không trả về giá trị"],
          viDu: "int tinhTien(int soLuong, int gia) {\n    return soLuong * gia;\n}\n\nint main() {\n    cout << tinhTien(3, 5000);\n    return 0;\n}", man: "15000" })}
        ${docThem([["function_return", "Giá trị trả về"]])}
      `,
      challenges: [
        {
          id: "s3-predict", type: "choice", icon: "🔮", bet: true, mono: true,
          title: "Nhiệm vụ 1: Giá trị trả về",
          prompt: "Bạn thay mỗi lời gọi hàm bằng giá trị nó trả về, rồi đoán màn hình nhé. Chắc chắn thì bật <strong>⭐ Ngôi sao hi vọng</strong>!",
          code: `int gapDoi(int x) {
    return x * 2;
}

int main() {
    int a = gapDoi(5);
    cout << a + gapDoi(1);
    return 0;
}`,
          options: [
            { text: "12" },
            { text: "11", why: "gapDoi(1) trả về 2, không phải 1." },
            { text: "10", why: "Còn cộng thêm gapDoi(1) = 2." },
            { text: "10 2", why: "Chỉ có một lệnh cout in tổng a + gapDoi(1)." }
          ],
          answer: "12",
          why: "Đúng! a = 10, gapDoi(1) = 2 → 12."
        },
        {
          id: "s3-code", type: "code", icon: "🧾",
          title: "Nhiệm vụ 2: Hàm tính tiền",
          prompt: "Hàm <code>tinhTien</code> đang luôn trả về 0. Bạn sửa để hàm trả về <strong>số lượng × giá</strong>, main đã có sẵn phần nhập và in nhé.",
          requirements: ["Hàm int tinhTien(int soLuong, int gia) trả về soLuong * gia.", "Không sửa main.", "Đúng với mọi ca trong bảng bên cạnh."],
          starter: full("int tinhTien(int soLuong, int gia) {", "    // Tra ve so tien = so luong x gia", "    return 0;", "}", "",
            "int main() {", "    int soLuong;", '    cout << "Nhap so luong: ";', "    cin >> soLuong;", '    cout << "Tien: " << tinhTien(soLuong, 8000);', "    return 0;", "}"),
          tests: [
            { input: "3", expected: "Nhap so luong: 3\nTien: 24000" },
            { input: "5", expected: "Nhap so luong: 5\nTien: 40000" },
            { input: "0", expected: "Nhap so luong: 0\nTien: 0" }
          ],
          rules: [{ test: c => /tinhTien\s*\(\s*soLuong\s*,\s*8000\s*\)/.test(phanMain(c)), msg: "Giữ nguyên lời gọi tinhTien(soLuong, 8000) trong main." }],
          why: "Hàm đã tính và trả tiền về cho main!",
          hints: ["return soLuong * gia;"]
        }
      ]
    },
    {
      kind: "stage", id: "stage-4", number: 4, nav: "setup & loop",
      kicker: "CHẶNG 4 · HÀM KIỂU ARDUINO",
      title: "setup() chạy một lần, loop() chạy mãi",
      bit: "Tin vui: chương trình Arduino chỉ gồm <strong>hai hàm</strong> — <code>setup()</code> chạy một lần, <code>loop()</code> chạy lặp mãi. Mình cùng mô phỏng bằng C++ nhé!",
      objectives: ["Hiểu vai trò của setup() và loop()", "Chia chương trình thành nhiều hàm nhỏ", "Viết hàm trước chỗ gọi"],
      lesson: `
        <div class="comparison-board">
          <article class="compare-card before"><h4>🔌 Trên Arduino</h4>
            <div class="console-mini">void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}</div></article>
          <div class="comparison-arrow">→</div>
          <article class="compare-card after"><h4>💻 Mô phỏng bằng C++</h4>
            <div class="console-mini">void setup() {
    cout &lt;&lt; "Chuan bi chan 13" &lt;&lt; endl;
}
void loop() {
    batDen(13);
    tatDen(13);
}
int main() {
    setup();
    for (int i = 1; i &lt;= 3; i++) {
        loop();
    }
}</div>
            <p>Arduino tự gọi <code>setup()</code> một lần rồi gọi <code>loop()</code> mãi mãi.</p></article>
        </div>
        ${giaiMa("⚙️ GIẢI MÃ CHƯƠNG TRÌNH ARDUINO", [
          { code: "void setup()", y: "Chạy <strong>một lần</strong> lúc bật mạch: chuẩn bị chân, in lời chào…", sb: "when flag clicked" },
          { code: "void loop()", y: "Chạy <strong>lặp đi lặp lại</strong> mãi mãi — như khối “liên tục” trong Scratch.", sb: "forever\nend", nhan: true },
          { code: "digitalWrite(13, HIGH);", y: "Hàm có sẵn của Arduino: bật điện ở chân 13 (2 tham số)." },
          { code: "delay(1000);", y: "Hàm có sẵn của Arduino: chờ 1000 mili giây = 1 giây." }
        ])}
        ${meo("Trên Arduino, bạn <strong>không</strong> tự viết <code>main()</code>. Ở đây mình dùng <code>main</code> + vòng for để mô phỏng việc Arduino gọi <code>loop()</code> nhiều lần.")}
        ${cuPhap({ ten: "THỨ TỰ VIẾT CÁC HÀM",
          mau: ["void ‹hàm nhỏ›(...) { ... }\nvoid setup() { ... }\nvoid loop() { ‹gọi các hàm nhỏ› }\n\nint main() {\n    setup();\n    ‹gọi loop() nhiều lần›\n}",
                "void ‹tên hàm›(int ‹tham số›);   // khai báo trước main, viết thân sau"],
          quyTac: ["Máy đọc từ trên xuống: hàm phải được viết (hoặc khai báo) <strong>trước</strong> chỗ gọi",
                   "Một hàm được phép gọi hàm khác (loop gọi batDen)",
                   "Tên hàm phân biệt chữ hoa/thường: <code>batDen</code> khác <code>BatDen</code>"] })}
        ${doan("Nếu viết hàm <code>chao()</code> ở <strong>dưới</strong> main mà không khai báo trước, Programiz sẽ báo gì?",
               "Báo lỗi: <code>'chao' was not declared in this scope</code> — máy chưa biết tên chao khi đọc tới main. Web này cũng báo lỗi tương tự.")}
        ${docThem([["functions", "Hàm"], ["function_reallife", "Ví dụ thực tế"]])}
      `,
      challenges: [
        {
          id: "s4-predict", type: "choice", icon: "🔮", bet: true, mono: true,
          title: "Nhiệm vụ 1: setup hay loop?",
          prompt: "Bạn đếm xem mỗi hàm được gọi mấy lần rồi đoán màn hình nhé. Chắc chắn thì bật <strong>⭐ Ngôi sao hi vọng</strong>!",
          code: `void setup() {
    cout << "S ";
}

void loop() {
    cout << "L ";
}

int main() {
    setup();
    for (int i = 1; i <= 3; i++) {
        loop();
    }
    return 0;
}`,
          options: [
            { text: "S L L L" },
            { text: "S L S L S L", why: "setup() chỉ được gọi một lần, trước vòng lặp." },
            { text: "L L L S", why: "setup() được gọi trước tiên." },
            { text: "S L", why: "loop() nằm trong vòng for chạy 3 lần." }
          ],
          answer: "S L L L",
          why: "Chuẩn! Đúng kiểu Arduino: setup một lần, loop nhiều lần."
        },
        {
          id: "s4-code", type: "code", icon: "🚨",
          title: "Nhiệm vụ 2: Đèn nhấp nháy",
          prompt: "Hàm <code>loop()</code> đang trống. Bạn cho <code>loop()</code> gọi <code>batDen(13)</code> rồi <code>tatDen(13)</code> để đèn nhấp nháy nhé.",
          requirements: ["Trong loop(): gọi batDen(13); rồi tatDen(13);", "Không viết cout trong loop().", "Không sửa các hàm khác và main."],
          starter: full("void batDen(int chan) {", '    cout << "Den " << chan << ": SANG" << endl;', "}", "",
            "void tatDen(int chan) {", '    cout << "Den " << chan << ": TAT" << endl;', "}", "",
            "void setup() {", '    cout << "Chuan bi chan 13" << endl;', "}", "",
            "void loop() {", "    // Bat den 13, roi tat den 13", "}", "",
            "int main() {", "    setup();", "    for (int i = 1; i <= 2; i++) {", "        loop();", "    }", "    return 0;", "}"),
          expected: "Chuan bi chan 13\nDen 13: SANG\nDen 13: TAT\nDen 13: SANG\nDen 13: TAT",
          rules: [
            { test: c => { const m = sc(c).match(/void\s+loop\s*\(\s*\)\s*\{([\s\S]*?)\n\}/); return m && /batDen\s*\(\s*13\s*\)/.test(m[1]) && /tatDen\s*\(\s*13\s*\)/.test(m[1]) && !/\bcout\b/.test(m[1]); },
              msg: "loop() phải gọi batDen(13); và tatDen(13); — không dùng cout trực tiếp trong loop()." }
          ],
          why: "Đèn nhấp nháy đúng kiểu Arduino!",
          hints: ["void loop() {\n    batDen(13);\n    tatDen(13);\n}"]
        }
      ]
    },
    {
      kind: "gate", id: "gate-2", nav: "Điểm dừng 2",
      kicker: "ĐIỂM DỪNG 2 · SAU CHẶNG 3–4",
      codeHash: "F361E456",
      todo: [
        "Thầy hỏi: <strong>hàm void khác hàm int ở đâu? setup() và loop() chạy mấy lần?</strong> Bạn nói trước, thầy chốt sau.",
        "Chép phần <strong>Ghi bài 2</strong> trên slide vào vở.",
        "Trả lời <strong>2 câu ClassPoint</strong>.",
        `<strong>Luyện tập cặp</strong> trên ${PROGRAMIZ}: “Cảm biến nhiệt có bọ”, chụp ảnh nộp ClassPoint.`,
        "Thầy hiện <strong>mã mở BOSS</strong> → bạn nhập vào ô bên dưới."
      ],
      challenges: [
        {
          id: "g2-bonus", type: "code", icon: "🎁", bonus: true,
          title: "Nhiệm vụ phụ: Hàm số lớn hơn",
          prompt: "Bạn viết hàm <code>int lonHon(int a, int b)</code> trả về số lớn hơn trong hai số; main đã có sẵn phần nhập và in nhé.",
          requirements: ["Hàm lonHon trả về số lớn hơn (bằng nhau thì trả về số đó).", "Không sửa main."],
          starter: full("int lonHon(int a, int b) {", "    // Tra ve so lon hon", "    return 0;", "}", "",
            "int main() {", "    int x, y;", '    cout << "Nhap 2 so: ";', "    cin >> x >> y;", '    cout << "Lon hon: " << lonHon(x, y);', "    return 0;", "}"),
          tests: [
            { input: "3 8", expected: "Nhap 2 so: 3\n8\nLon hon: 8" },
            { input: "9 2", expected: "Nhap 2 so: 9\n2\nLon hon: 9" },
            { input: "5 5", expected: "Nhap 2 so: 5\n5\nLon hon: 5" }
          ],
          why: "Hàm + if-else: kết hợp chuẩn!",
          hints: ["if (a > b) { return a; } return b;"]
        }
      ]
    },
    {
      kind: "boss", id: "boss", nav: "BOSS",
      kicker: "BOSS · CÁ NHÂN",
      title: "Hạ Mạch Chập Chờn",
      bossName: "Mạch Chập Chờn",
      bit: "Mạch Chập Chờn làm đèn của xưởng nhấp nháy lung tung! Mỗi nhiệm vụ đúng là một đòn. <strong>Tự làm một mình nhé.</strong>",
      lesson: docThem([["functions", "Hàm"], ["function_param", "Tham số"], ["function_return", "Giá trị trả về"]], "🚑 Trạm cứu trợ — quên thì xem lại"),
      challenges: [
        {
          id: "boss-1", type: "choice", icon: "⚔️", bet: true, mono: true,
          title: "Đòn 1: Hàm gọi hàm",
          prompt: "Mạch Chập Chờn đố bạn: hàm này gọi hàm kia — màn hình hiện gì?",
          code: `int tang(int x) {
    return x + 1;
}

void inSo(int n) {
    cout << tang(n) * 2;
}

int main() {
    inSo(4);
    return 0;
}`,
          options: [
            { text: "10" },
            { text: "9", why: "tang(4) = 5 trước, rồi mới nhân 2." },
            { text: "8", why: "Còn phải cộng 1 trong hàm tang." },
            { text: "5", why: "Kết quả của tang(n) còn được nhân 2." }
          ],
          answer: "10",
          why: "Trúng đòn! tang(4) = 5, 5 × 2 = 10."
        },
        {
          id: "boss-2", type: "code", icon: "⚔️",
          title: "Đòn 2: Ba con bọ trong mạch",
          prompt: "Chương trình phải in trạng thái đèn chân 7 và tổng 2 + 3, nhưng đang có 3 con bọ. Bạn săn hết bọ giúp mình nhé!",
          requirements: ["Màn hình đúng như mẫu bên cạnh."],
          starter: full("void batDen(int chan) {", '    cout << "Den " << chan << ": SANG" << endl', "}", "",
            "int tinhTong(int a, int b) {", "    int t = a + b;", "}", "",
            "int main() {", "    BatDen(7);", '    cout << "Tong: " << tinhTong(2, 3);', "    return 0;", "}"),
          expected: "Den 7: SANG\nTong: 5",
          bugs: [
            { label: "thiếu ; sau endl", fixed: c => /endl\s*;/.test(sc(c)) },
            { label: "hàm int thiếu return", fixed: c => /\breturn\s+(t|a\s*\+\s*b)\s*;/.test(sc(c)) },
            { label: "gọi sai tên BatDen", fixed: c => !/\bBatDen\b/.test(sc(c)) && /\bbatDen\s*\(\s*7\s*\)/.test(sc(c)) }
          ],
          why: "Trúng đòn! Đèn sáng, tổng đúng.",
          hints: ["Hàm int phải có return t;", "Tên hàm phân biệt hoa/thường: batDen."]
        },
        {
          id: "boss-3", type: "code", icon: "⚔️",
          title: "Đòn 3: Đổi giây ra mili giây",
          prompt: "Hàm <code>delay()</code> của Arduino tính bằng mili giây (1 giây = 1000 ms). Bạn viết hàm <code>int doiRaMs(int giay)</code> và dùng nó để in đúng lệnh delay nhé.",
          requirements: ["Viết hàm int doiRaMs(int giay) trả về số mili giây.", "Câu dẫn (gõ đúng từng chữ): Nhap so giay: ",
                         "In ra: delay(<số mili giây>); — trong main phải gọi doiRaMs."],
          starter: full("// Viet ham doiRaMs o day", "", "int main() {", "    int giay;", "    // Viet tiep", "    return 0;", "}"),
          tests: [
            { input: "3", expected: "Nhap so giay: 3\ndelay(3000);" },
            { input: "1", expected: "Nhap so giay: 1\ndelay(1000);" },
            { input: "0", expected: "Nhap so giay: 0\ndelay(0);" }
          ],
          rules: [
            { test: c => /int\s+doiRaMs\s*\(\s*int\s+\w+\s*\)/.test(sc(c)), msg: "Cần hàm int doiRaMs(int giay)." },
            { test: c => /doiRaMs\s*\(/.test(phanMain(c)), msg: "Trong main phải gọi doiRaMs(giay)." }
          ],
          why: "Đòn cuối trúng đích! Mạch Chập Chờn gục rồi!",
          hints: ["int doiRaMs(int giay) { return giay * 1000; }", 'cout << "delay(" << doiRaMs(giay) << ");";']
        },
        {
          id: "adv-1", type: "code", icon: "🥇", advanced: true,
          title: "Nâng cao 1: Nhấp nháy n lần",
          prompt: "Bạn viết hàm <code>void nhapNhay(int chan, int soLan)</code>: mỗi lần in một dòng SANG rồi một dòng TAT, lặp <code>soLan</code> lần nhé.",
          requirements: ["Dùng hai tham số chan và soLan, có vòng for trong hàm.", "Giữ nguyên 2 lần gọi trong main."],
          starter: full("void nhapNhay(int chan, int soLan) {", "    // Lap soLan lan: in SANG roi TAT", "}", "",
            "int main() {", "    nhapNhay(13, 2);", "    nhapNhay(8, 1);", "    return 0;", "}"),
          expected: "Den 13: SANG\nDen 13: TAT\nDen 13: SANG\nDen 13: TAT\nDen 8: SANG\nDen 8: TAT",
          rules: [{ test: c => /\bfor\s*\(/.test(sc(c)), msg: "Dùng vòng lặp for trong hàm nhapNhay." }],
          why: "Xuất sắc! Hàm có tham số + vòng lặp.",
          hints: ['for (int i = 1; i <= soLan; i++) { cout << "Den " << chan << ": SANG" << endl; ... }']
        },
        {
          id: "adv-2", type: "code", icon: "🥇", advanced: true,
          title: "Nâng cao 2: Giai thừa",
          prompt: "Bạn viết hàm <code>int giaiThua(int n)</code> trả về 1 × 2 × … × n (riêng 0! = 1), rồi in kết quả nhé.",
          requirements: ["Câu dẫn (gõ đúng từng chữ): Nhap n: ", "In ra: <n>! = <kết quả>", "Phải dùng hàm giaiThua có return."],
          starter: full("// Viet ham giaiThua o day", "", "int main() {", "    int n;", "    // Viet tiep", "    return 0;", "}"),
          tests: [
            { input: "5", expected: "Nhap n: 5\n5! = 120" },
            { input: "1", expected: "Nhap n: 1\n1! = 1" },
            { input: "0", expected: "Nhap n: 0\n0! = 1" }
          ],
          rules: [
            { test: c => /int\s+giaiThua\s*\(/.test(sc(c)) && /\breturn\b/.test(sc(c).split(/\bint\s+main\b/)[0]), msg: "Cần hàm int giaiThua(int n) có return." },
            { test: c => /giaiThua\s*\(/.test(phanMain(c)), msg: "Trong main phải gọi giaiThua(n)." }
          ],
          why: "Huy hiệu vàng thuộc về bạn!",
          hints: ["int ketQua = 1; for (int i = 1; i <= n; i++) ketQua = ketQua * i; return ketQua;"]
        }
      ]
    }
  ]
};
