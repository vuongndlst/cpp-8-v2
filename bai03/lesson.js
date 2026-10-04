/* Bài 3 — Câu điều kiện if, if-else cơ bản (không else if, không && ||)
   Câu chuyện: Cổng game — Bit canh cổng, chỉ cho người đủ điều kiện đi qua.
   Mã mở khoá: chỉ ghi trong README của bài (thư mục giáo viên) — KHÔNG ghi trong web công khai.
*/
"use strict";
const { giaiMa, codeVaManHinh, doan, meo, docThem, khongCo } = window.KIT;
const H = "#include <iostream>\nusing namespace std;\n\nint main() {\n";
const E = "    return 0;\n}";
const prog = (...dong) => H + dong.map(d => "    " + d).join("\n") + "\n" + E;

window.LESSON = {
  id: "bai03", number: 3,
  title: "Câu điều kiện if, if-else",
  story: "Cổng game",
  badge: { icon: "🚪", name: "Người gác cổng" },
  skills: ["6 phép so sánh", "Đúng (1) / sai (0)", "Lệnh if", "Lệnh if-else", "Bắt lỗi = và ==", "Kiểm thử giá trị biên"],

  errorTable: [
    ["Luôn chạy nhánh “đúng” dù nhập gì", "Viết <code>=</code> (gán) thay cho <code>==</code> (so sánh bằng)", "So sánh bằng phải có <strong>hai</strong> dấu: <code>if (a == 5)</code>"],
    ["Thân if luôn chạy", "Có dấu <code>;</code> ngay sau <code>if (...)</code>", "Bỏ dấu <code>;</code> sau ngoặc tròn của if"],
    ["Lỗi cú pháp ở dòng else", "Có <code>;</code> sau <code>if (...)</code> nên else không còn đi cùng if", "Bỏ <code>;</code> sau if; else phải đứng ngay sau <code>}</code> của if"],
    ["Lỗi cú pháp ở điều kiện", "Viết <code>=&gt;</code>, <code>=&lt;</code> hoặc <code>≥</code>", "Viết <code>&gt;=</code>, <code>&lt;=</code> (dấu = đứng sau)"],
    ["Đúng với hầu hết số, sai đúng 1 số", "Nhầm <code>&gt;</code> với <code>&gt;=</code> ở giá trị biên", "Thử thêm ca ĐÚNG BẰNG mốc (ví dụ điểm 5)"],
    ["Máy không biết tên \"Else\" / \"If\"", "Viết hoa từ khoá", "Viết thường: <code>if</code>, <code>else</code>"],
    ["Lỗi cú pháp ở if", "Quên ngoặc tròn: <code>if diem &gt;= 5</code>", "Điều kiện phải trong ngoặc: <code>if (diem &gt;= 5)</code>"]
  ],

  steps: [
    {
      kind: "stage", id: "stage-1", number: 1, nav: "Đúng hay sai",
      kicker: "CHẶNG 1 · PHÉP SO SÁNH",
      title: "Câu hỏi đúng/sai của máy",
      bit: "Mình được giao gác cổng game! Trước hết mình phải biết <strong>so sánh</strong>: lớn hơn, nhỏ hơn, bằng nhau…",
      objectives: ["Dùng 6 phép so sánh", "Biết so sánh cho ra 1 (đúng) hoặc 0 (sai)", "Phân biệt = và =="],
      lesson: `
        ${giaiMa("⚖️ 6 PHÉP SO SÁNH", [
          { code: "a > b", y: "a <strong>lớn hơn</strong> b", sb: "<(a) > (b)>" },
          { code: "a < b", y: "a <strong>nhỏ hơn</strong> b", sb: "<(a) < (b)>" },
          { code: "a >= b", y: "a lớn hơn <strong>hoặc bằng</strong> b", nho: "Viết >= (dấu = đứng SAU)." },
          { code: "a <= b", y: "a nhỏ hơn <strong>hoặc bằng</strong> b" },
          { code: "a == b", y: "a <strong>bằng</strong> b — HAI dấu bằng!", sb: "<(a) = (b)>", nhan: true },
          { code: "a != b", y: "a <strong>khác</strong> b", sb: "<not <(a) = (b)>>" }
        ])}
        ${codeVaManHinh(`int diem = 7;
cout << (diem >= 5) << endl;
cout << (diem == 10);`, "1\n0", "Máy trả lời đúng (1) / sai (0)")}
        ${meo("<code>=</code> là <strong>gán</strong> (bỏ số vào hộp) · <code>==</code> là <strong>hỏi</strong> “có bằng không?”.")}
        ${doan("“Từ 12 tuổi trở lên” viết thế nào?", "<code>tuoi &gt;= 12</code> — có cả 12. Còn <code>tuoi &gt; 12</code> thì 12 tuổi bị loại.")}
        ${docThem([["operators_comparison", "Phép so sánh"], ["booleans", "Đúng/sai"]])}
      `,
      challenges: [
        {
          id: "s1-predict", type: "choice", icon: "🔮", bet: true, mono: true,
          title: "Nhiệm vụ 1: 1 hay 0?",
          prompt: "Đoán màn hình, <strong>đặt cược</strong> nếu tự tin.",
          code: `int xp = 50;
cout << (xp > 50) << endl;
cout << (xp <= 50);`,
          options: [
            { text: "1\n1", why: "50 không lớn hơn 50 → dòng 1 là 0." },
            { text: "0\n1" },
            { text: "0\n0", why: "50 <= 50 đúng (bằng cũng tính) → dòng 2 là 1." },
            { text: "false\ntrue", why: "cout in đúng/sai thành 1/0." }
          ],
          answer: "0\n1",
          why: "Chuẩn! > không tính bằng, <= có tính bằng."
        },
        {
          id: "s1-pick", type: "choice", icon: "🎯",
          title: "Nhiệm vụ 2: Chọn điều kiện",
          prompt: "Game chỉ cho người <strong>từ 12 tuổi trở lên</strong>. Điều kiện nào đúng?",
          options: [
            { text: "tuoi > 12", why: "Bạn đúng 12 tuổi sẽ bị chặn — sai yêu cầu." },
            { text: "tuoi >= 12" },
            { text: "tuoi => 12", why: "C++ viết >= (dấu = đứng sau)." },
            { text: "tuoi = 12", why: "= là gán, không phải so sánh." }
          ],
          answer: "tuoi >= 12",
          why: "Đúng! >= có tính cả 12."
        }
      ]
    },
    {
      kind: "stage", id: "stage-2", number: 2, nav: "Lệnh if",
      kicker: "CHẶNG 2 · LỆNH if",
      title: "if — chỉ làm khi điều kiện đúng",
      bit: "Giờ mình biết hỏi đúng/sai rồi. Nếu <strong>đúng</strong> thì mình mới mở cổng — bạn chỉ mình viết <code>if</code> nhé!",
      objectives: ["Viết lệnh if có ngoặc tròn và ngoặc nhọn", "Biết thân if chỉ chạy khi điều kiện đúng", "Thử với nhiều số nhập"],
      lesson: `
        ${giaiMa("🚦 GIẢI MÃ LỆNH if", [
          { code: "if (dieuKien) {\n    lenh;\n}", y: "Điều kiện <strong>đúng</strong> → chạy các lệnh trong <code>{ }</code>. Sai → bỏ qua.", sb: "if <(tuoi) > (11)> then\n  say [Duoc vao!]\nend", nhan: true },
          { code: "if (tuoi >= 12)", y: "Điều kiện luôn nằm trong <strong>ngoặc tròn</strong>." },
          { code: "cout << \"Tam biet\";", y: "Lệnh nằm <strong>sau</strong> <code>}</code> luôn chạy, dù đúng hay sai." }
        ])}
        ${codeVaManHinh(`int tuoi;
cout << "Nhap tuoi: ";
cin >> tuoi;
if (tuoi >= 12) {
    cout << "Duoc vao!" << endl;
}
cout << "Tam biet";`, "Nhap tuoi: 15\nDuoc vao!\nTam biet", "Nhập 15 → điều kiện đúng", "15")}
        ${doan("Cùng chương trình, nhập <code>9</code> thì màn hình hiện gì?", "<code>Nhap tuoi: 9</code> rồi <code>Tam biet</code> — điều kiện sai nên bỏ qua dòng Duoc vao!")}
        ${docThem([["conditions", "Lệnh if"]])}
      `,
      challenges: [
        {
          id: "s2-predict", type: "choice", icon: "🔮", bet: true, mono: true, input: "6",
          title: "Nhiệm vụ 1: Nhập 6",
          prompt: "Người dùng gõ <code>6</code>. Màn hình hiện gì?",
          code: `int diem;
cout << "Diem: ";
cin >> diem;
if (diem >= 8) {
    cout << "Gioi! ";
}
cout << "Het.";`,
          options: [
            { text: "Diem: 6\nGioi! Het.", why: "6 >= 8 sai → bỏ qua Gioi!." },
            { text: "Diem: 6\nHet." },
            { text: "Diem: 6", why: "Lệnh cout \"Het.\" nằm ngoài if nên luôn chạy." },
            { text: "Gioi! Het.", why: "Câu dẫn và số nhập vẫn hiện trước." }
          ],
          answer: "Diem: 6\nHet.",
          why: "Đúng! Điều kiện sai thì bỏ qua thân if, lệnh sau } vẫn chạy."
        },
        {
          id: "s2-code", type: "code", icon: "🌡️",
          title: "Nhiệm vụ 2: Cảnh báo nắng nóng",
          prompt: "Thêm lệnh if: nhiệt độ <strong>trên 35</strong> thì nhắc uống nước.",
          requirements: ["Nếu nhiệt độ > 35: in dòng Nong qua! Uong nuoc nhe.", "Dòng Tam biet luôn được in.", "Đạt cả 3 ca (có ca đúng bằng 35)."],
          starter: prog("int nhietDo;", 'cout << "Nhiet do: ";', "cin >> nhietDo;", "// Them lenh if o day", "", 'cout << "Tam biet";'),
          tests: [
            { input: "38", expected: "Nhiet do: 38\nNong qua! Uong nuoc nhe.\nTam biet" },
            { input: "30", expected: "Nhiet do: 30\nTam biet" },
            { input: "35", expected: "Nhiet do: 35\nTam biet" }
          ],
          why: "Cảnh báo chuẩn — kể cả ca đúng bằng 35!",
          hints: ["if (nhietDo > 35) { cout << \"Nong qua! Uong nuoc nhe.\" << endl; }", "“Trên 35” là > 35, không phải >= 35."]
        }
      ]
    },
    {
      kind: "gate", id: "gate-1", nav: "Điểm dừng 1",
      kicker: "ĐIỂM DỪNG 1 · SAU CHẶNG 1–2",
      codeHash: "C9F410C9",
      todo: [
        "Thầy hỏi: <strong>= khác == thế nào? Khi nào thân if được chạy?</strong> Con nói trước, thầy chốt sau.",
        "Chép phần <strong>Ghi bài 1</strong> trên slide vào vở.",
        "Trả lời <strong>2 câu ClassPoint</strong>.",
        "<strong>Luyện tập cặp</strong> trên <a href=\"https://www.programiz.com/cpp-programming/online-compiler/\" target=\"_blank\" rel=\"noopener\">Programiz ↗</a>: “Pin yếu”, chụp ảnh nộp ClassPoint.",
        "Thầy hiện <strong>mã mở khoá</strong> → con nhập vào ô bên dưới."
      ],
      challenges: [
        {
          id: "g1-bonus", type: "code", icon: "🎁", bonus: true,
          title: "Nhiệm vụ phụ: Điểm tuyệt đối",
          prompt: "Nếu điểm đúng bằng 10 thì chúc mừng.",
          requirements: ["Điểm == 10: in Diem tuyet doi!", "Khác 10: không in thêm gì."],
          starter: prog("int diem;", 'cout << "Diem: ";', "cin >> diem;", "// Viet if o day"),
          tests: [
            { input: "10", expected: "Diem: 10\nDiem tuyet doi!" },
            { input: "9", expected: "Diem: 9" }
          ],
          why: "Bạn đã dùng đúng == rồi!",
          hints: ["Hai dấu bằng: if (diem == 10)"]
        }
      ]
    },
    {
      kind: "stage", id: "stage-3", number: 3, nav: "if-else & bọ",
      kicker: "CHẶNG 3 · if-else · SĂN BỌ",
      title: "if-else — hai đường rẽ",
      bit: "Ối! Cổng của mình <strong>ai nhập gì cũng mở</strong>! Chắc có bọ rồi. Bạn học if-else rồi săn bọ giúp mình nhé.",
      objectives: ["Viết if-else: đúng làm A, sai làm B", "Bắt bọ = thay cho ==", "Bắt bọ ; sau if"],
      lesson: `
        ${giaiMa("🔀 GIẢI MÃ if-else", [
          { code: "if (dieuKien) {\n    A;\n} else {\n    B;\n}", y: "Đúng → làm <strong>A</strong>. Sai → làm <strong>B</strong>. Luôn chạy đúng <strong>một</strong> trong hai.", sb: "if <(diem) > (4)> then\n  say [Dau]\nelse\n  say [Rot]\nend", nhan: true }
        ])}
        ${codeVaManHinh(`int so;
cout << "Nhap so: ";
cin >> so;
if (so >= 10) {
    cout << "Lon";
} else {
    cout << "Nho";
}`, "Nhap so: 4\nNho", "Nhập 4 → đi nhánh else", "4")}
        <div class="lesson-grid">
          <article class="note-card orange"><h3>🐛 Bọ 1: <code>=</code> thay cho <code>==</code></h3>
            <p><code>if (matMa = 2026)</code> là <strong>gán</strong> 2026 vào matMa, không phải so sánh → luôn “đúng”.</p></article>
          <article class="note-card orange"><h3>🐛 Bọ 2: dấu <code>;</code> sau if</h3>
            <p><code>if (x &gt; 5);</code> — dấu <code>;</code> làm if kết thúc ngay, thân <code>{ }</code> phía sau <strong>luôn chạy</strong>.</p></article>
        </div>
        ${docThem([["conditions_else", "if-else"], ["conditions", "if"]])}
      `,
      challenges: [
        {
          id: "s3-predict", type: "choice", icon: "🔮", bet: true, mono: true, input: "10",
          title: "Nhiệm vụ 1: Nhập đúng bằng 10",
          prompt: "Dùng chương trình ví dụ ở trên, người dùng gõ <code>10</code>. Màn hình hiện gì?",
          code: `int so;
cout << "Nhap so: ";
cin >> so;
if (so >= 10) {
    cout << "Lon";
} else {
    cout << "Nho";
}`,
          options: [
            { text: "Nhap so: 10\nNho", why: "10 >= 10 là ĐÚNG (bằng cũng tính)." },
            { text: "Nhap so: 10\nLon" },
            { text: "Nhap so: 10\nLonNho", why: "if-else chỉ chạy MỘT nhánh." },
            { text: "Nhap so: 10", why: "if-else luôn chạy đúng một nhánh, không bao giờ bỏ cả hai." }
          ],
          answer: "Nhap so: 10\nLon",
          why: "Đúng! Ca biên 10 rơi vào nhánh if vì có dấu =."
        },
        {
          id: "s3-debug", type: "code", icon: "🐞",
          title: "Nhiệm vụ 2: Cổng ai cũng vào được",
          prompt: "Cổng mở với mọi mật mã! Săn bọ để chỉ <code>2026</code> mới mở.",
          requirements: ["Đạt cả 2 ca kiểm thử."],
          starter: prog("int matMa;", 'cout << "Nhap mat ma: ";', "cin >> matMa;", "if (matMa = 2026) {", '    cout << "Mo cong!";', "} else {", '    cout << "Sai mat ma!"', "}"),
          tests: [
            { input: "2026", expected: "Nhap mat ma: 2026\nMo cong!" },
            { input: "1234", expected: "Nhap mat ma: 1234\nSai mat ma!" }
          ],
          bugs: [
            { label: "= thay cho ==", fixed: c => /matMa\s*==\s*2026/.test(c) },
            { label: "thiếu ; sau \"Sai mat ma!\"", fixed: c => /"Sai mat ma!"\s*;/.test(c) }
          ],
          why: "Cổng an toàn rồi! = là gán, == mới là so sánh.",
          hints: ["Chạy thử: có lỗi cú pháp thì sửa trước (dòng có Sai mat ma!).", "Điều kiện so sánh bằng phải viết matMa == 2026."]
        }
      ]
    },
    {
      kind: "stage", id: "stage-4", number: 4, nav: "Tự xây",
      kicker: "CHẶNG 4 · TỰ XÂY · KIỂM THỬ BIÊN",
      title: "Đậu hay rớt — và ca kiểm thử biên",
      bit: "Thầy cô cần một máy báo <strong>đậu/rớt</strong>. Bí quyết của mình: luôn thử số <strong>đúng bằng mốc</strong> — chỗ đó bọ hay trốn nhất!",
      objectives: ["Tự viết if-else từ yêu cầu", "Chọn ca kiểm thử biên", "Kiểm thử nhiều ca"],
      lesson: `
        <div class="build-method"><h3>🧪 CHỌN CA KIỂM THỬ THÔNG MINH</h3>
          <div class="build-steps">
            <div><span>1</span><strong>Ca đúng</strong><small>ví dụ điểm 9</small></div>
            <div><span>2</span><strong>Ca sai</strong><small>ví dụ điểm 3</small></div>
            <div><span>3</span><strong>Ca biên</strong><small>đúng bằng mốc: 5</small></div>
          </div></div>
        ${meo("Mốc “từ 5 trở lên” → thử <strong>5</strong> và <strong>4</strong>. Nếu nhầm <code>&gt;</code> với <code>&gt;=</code>, chỉ ca 5 mới bắt được bọ.")}
        ${docThem([["conditions_else", "if-else"]])}
      `,
      challenges: [
        {
          id: "s4-pick", type: "choice", icon: "🧪",
          title: "Nhiệm vụ 1: Ca nào bắt được bọ?",
          prompt: "Bạn viết nhầm <code>if (diem &gt; 5)</code> thay vì <code>&gt;= 5</code>. Nhập số nào mới thấy sai?",
          options: [
            { text: "9", why: "9 > 5 và 9 >= 5 đều đúng → không lộ bọ." },
            { text: "2", why: "2 > 5 và 2 >= 5 đều sai → không lộ bọ." },
            { text: "5" },
            { text: "0", why: "0 thì cả hai cách đều sai → không lộ bọ." }
          ],
          answer: "5",
          why: "Chuẩn! Chỉ ca biên 5 cho hai kết quả khác nhau."
        },
        {
          id: "s4-code", type: "code", icon: "📝",
          title: "Nhiệm vụ 2: Máy báo đậu/rớt",
          prompt: "Điểm từ 5 trở lên là đậu, dưới 5 là rớt.",
          requirements: ["Câu dẫn: Nhap diem: ", "Từ 5 trở lên: in Dau", "Dưới 5: in Rot"],
          starter: prog("int diem;", "// Nhap, roi dung if-else"),
          tests: [
            { input: "9", expected: "Nhap diem: 9\nDau" },
            { input: "4", expected: "Nhap diem: 4\nRot" },
            { input: "5", expected: "Nhap diem: 5\nDau" }
          ],
          why: "Đạt cả ca biên — máy chấm của bạn chuẩn rồi!",
          hints: ["if (diem >= 5) { cout << \"Dau\"; } else { cout << \"Rot\"; }"]
        }
      ]
    },
    {
      kind: "gate", id: "gate-2", nav: "Điểm dừng 2",
      kicker: "ĐIỂM DỪNG 2 · SAU CHẶNG 3–4",
      codeHash: "B376911D",
      todo: [
        "Thầy hỏi: <strong>if-else khác if thế nào? Vì sao phải thử ca biên?</strong> Con nói trước, thầy chốt sau.",
        "Chép phần <strong>Ghi bài 2</strong> trên slide vào vở.",
        "Trả lời <strong>2 câu ClassPoint</strong>.",
        "<strong>Luyện tập cặp</strong> trên <a href=\"https://www.programiz.com/cpp-programming/online-compiler/\" target=\"_blank\" rel=\"noopener\">Programiz ↗</a>: “Cổng mật mã”, chụp ảnh nộp ClassPoint.",
        "Thầy hiện <strong>mã mở BOSS</strong> → con nhập vào ô bên dưới."
      ],
      challenges: [
        {
          id: "g2-bonus", type: "code", icon: "🎁", bonus: true,
          title: "Nhiệm vụ phụ: Số lớn hơn",
          prompt: "Nhập 2 số, in số lớn hơn (bằng nhau thì in số đó).",
          requirements: ["Câu dẫn: Nhap a: và Nhap b: ", "In: Lon hon: <số>"],
          starter: prog("int a, b;", "// Viet tiep"),
          tests: [
            { input: "3 8", expected: "Nhap a: 3\nNhap b: 8\nLon hon: 8" },
            { input: "9 2", expected: "Nhap a: 9\nNhap b: 2\nLon hon: 9" },
            { input: "5 5", expected: "Nhap a: 5\nNhap b: 5\nLon hon: 5" }
          ],
          why: "Ca bằng nhau cũng đúng — tuyệt!",
          hints: ["if (a >= b) in a, else in b."]
        }
      ]
    },
    {
      kind: "boss", id: "boss", nav: "BOSS",
      kicker: "BOSS · CÁ NHÂN",
      title: "Hạ Rồng Gác Cổng",
      bossName: "Rồng Gác Cổng",
      bit: "Rồng Gác Cổng chặn lối vào game! Mỗi nhiệm vụ đúng là một đòn. <strong>Tự làm một mình nhé.</strong>",
      lesson: docThem([["operators_comparison", "So sánh"], ["conditions", "if"], ["conditions_else", "if-else"]], "🚑 Trạm cứu trợ — quên thì xem lại"),
      challenges: [
        {
          id: "boss-1", type: "choice", icon: "⚔️", bet: true, mono: true, input: "12",
          title: "Đòn 1: Nhánh nào chạy?",
          prompt: "Người dùng gõ <code>12</code>. Màn hình hiện gì?",
          code: `int t;
cout << "Nhap t: ";
cin >> t;
if (t < 10) {
    cout << "A";
} else {
    cout << "B";
}
cout << "C";`,
          options: [
            { text: "Nhap t: 12\nAC", why: "12 < 10 sai → đi nhánh else (B)." },
            { text: "Nhap t: 12\nB", why: "cout << \"C\" nằm sau if-else nên luôn chạy." },
            { text: "Nhap t: 12\nBC" },
            { text: "Nhap t: 12\nABC", why: "if-else chỉ chạy một nhánh." }
          ],
          answer: "Nhap t: 12\nBC",
          why: "Trúng đòn! Nhánh else rồi lệnh sau if-else."
        },
        {
          id: "boss-2", type: "code", icon: "⚔️",
          title: "Đòn 2: Săn 3 con bọ",
          prompt: "Sửa hết bọ để máy kiểm tra tuổi chơi game.",
          requirements: ["Từ 13 tuổi: Du tuoi choi game · dưới 13: Chua du tuoi", "Đạt cả 2 ca."],
          starter: prog("int tuoi;", 'cout << "Nhap tuoi: ";', "cin >> tuoi;", "if (tuoi => 13) {", '    cout << "Du tuoi choi game";', "} Else {", '    cout << "Chua du tuoi"', "}"),
          tests: [
            { input: "13", expected: "Nhap tuoi: 13\nDu tuoi choi game" },
            { input: "12", expected: "Nhap tuoi: 12\nChua du tuoi" }
          ],
          bugs: [
            { label: "=> sai dấu", fixed: c => /tuoi\s*>=\s*13/.test(c) },
            { label: "Else viết hoa", fixed: c => khongCo(c, "\\bElse\\b") },
            { label: "thiếu ; sau \"Chua du tuoi\"", fixed: c => /"Chua du tuoi"\s*;/.test(c) }
          ],
          why: "Trúng đòn! Ba con bọ cú pháp đều nổ tung.",
          hints: ["Lớn hơn hoặc bằng viết là >=.", "Từ khoá viết thường: else. Mỗi lệnh cout cần ; ở cuối."]
        },
        {
          id: "boss-3", type: "code", icon: "⚔️",
          title: "Đòn 3: Vé xe buýt",
          prompt: "Trẻ dưới 6 tuổi miễn phí, còn lại giá 7000.",
          requirements: ["Câu dẫn: Nhap tuoi: ", "Dưới 6: in Mien phi · còn lại: in Gia ve: 7000", "Đạt cả 3 ca (có ca biên 6)."],
          starter: prog("int tuoi;", "// Viet tiep"),
          tests: [
            { input: "5", expected: "Nhap tuoi: 5\nMien phi" },
            { input: "6", expected: "Nhap tuoi: 6\nGia ve: 7000" },
            { input: "30", expected: "Nhap tuoi: 30\nGia ve: 7000" }
          ],
          why: "Đòn cuối trúng đích! Rồng Gác Cổng gục rồi!",
          hints: ["Dưới 6 tuổi: tuoi < 6."]
        },
        {
          id: "adv-1", type: "code", icon: "🥇", advanced: true,
          title: "Nâng cao 1: Học bổng",
          prompt: "Nhập điểm Toán và Tin. Tổng từ 16 trở lên thì có học bổng.",
          requirements: ["Câu dẫn: Diem Toan: và Diem Tin: ", "Tổng >= 16: Hoc bong · còn lại: Co gang them"],
          starter: prog("int toan, tin;", "// Viet tiep"),
          tests: [
            { input: "8 8", expected: "Diem Toan: 8\nDiem Tin: 8\nHoc bong" },
            { input: "7 8", expected: "Diem Toan: 7\nDiem Tin: 8\nCo gang them" },
            { input: "10 9", expected: "Diem Toan: 10\nDiem Tin: 9\nHoc bong" }
          ],
          why: "Xuất sắc! Điều kiện dùng cả phép cộng.",
          hints: ["if (toan + tin >= 16)"]
        },
        {
          id: "adv-2", type: "code", icon: "🥇", advanced: true,
          title: "Nâng cao 2: Khoảng cách hai số",
          prompt: "Nhập a, b. In khoảng cách giữa hai số (luôn không âm).",
          requirements: ["Câu dẫn: Nhap a: và Nhap b: ", "In: Khoang cach: <số>"],
          starter: prog("int a, b;", "// Viet tiep"),
          tests: [
            { input: "9 4", expected: "Nhap a: 9\nNhap b: 4\nKhoang cach: 5" },
            { input: "4 9", expected: "Nhap a: 4\nNhap b: 9\nKhoang cach: 5" },
            { input: "7 7", expected: "Nhap a: 7\nNhap b: 7\nKhoang cach: 0" }
          ],
          why: "Huy hiệu vàng thuộc về bạn!",
          hints: ["Nếu a >= b thì a - b, ngược lại b - a."]
        }
      ]
    }
  ]
};
