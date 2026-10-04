/* Bài 4 — Vòng lặp for (không while, không lặp lồng)
   Câu chuyện: Nhà máy robot — Bit phải lắp hàng trăm robot mà không gõ hàng trăm dòng.
   Mã mở khoá: chỉ ghi trong README của bài (thư mục giáo viên) — KHÔNG ghi trong web công khai.
*/
"use strict";
const { giaiMa, codeVaManHinh, doan, meo, docThem, khongCo, demLenh } = window.KIT;
const H = "#include <iostream>\nusing namespace std;\n\nint main() {\n";
const E = "    return 0;\n}";
const prog = (...dong) => H + dong.map(d => "    " + d).join("\n") + "\n" + E;
const coFor = c => /\bfor\s*\(/.test(window.CPP.stripComments(c));

window.LESSON = {
  id: "bai04", number: 4,
  title: "Vòng lặp for",
  story: "Nhà máy robot",
  badge: { icon: "🏭", name: "Kỹ sư nhà máy" },
  skills: ["Vì sao cần lặp", "3 phần của for", "Biến đếm i", "Đếm ngược, bước nhảy", "Biến tổng", "Bắt lỗi lệch một"],

  errorTable: [
    ["Chương trình chạy mãi không dừng", "Bước nhảy đi sai hướng (<code>i--</code> khi đếm lên) hoặc điều kiện luôn đúng", "Đếm lên dùng <code>i++</code>; kiểm tra điều kiện sẽ có lúc sai"],
    ["In thiếu 1 lần (lệch một)", "Viết <code>i &lt; n</code> trong khi cần đến n", "Muốn có n thì dùng <code>i &lt;= n</code>"],
    ["In thừa 1 lần", "Bắt đầu từ 0 nhưng điều kiện <code>i &lt;= n</code>", "Bắt đầu từ 1 với <code>i &lt;= n</code>, hoặc từ 0 với <code>i &lt; n</code>"],
    ["Thân vòng lặp chỉ chạy 1 lần", "Có dấu <code>;</code> ngay sau <code>for (...)</code>", "Bỏ dấu <code>;</code> sau ngoặc tròn của for"],
    ["Lỗi cú pháp ở dòng for", "Dùng dấu phẩy thay dấu chấm phẩy: <code>for (i = 1, i &lt;= 5, i++)</code>", "Ba phần cách nhau bằng <code>;</code>"],
    ["Tổng sai, quá lớn hoặc lạ", "Quên <code>int tong = 0;</code> trước vòng lặp, hoặc viết <code>tong = i</code>", "Khởi tạo tong = 0; trong thân: <code>tong = tong + i;</code>"],
    ["Máy không biết tên \"i\" sau vòng lặp", "Biến i khai báo trong for chỉ sống trong vòng lặp", "Dùng i bên trong { } của for"]
  ],

  steps: [
    {
      kind: "stage", id: "stage-1", number: 1, nav: "Vì sao lặp",
      kicker: "CHẶNG 1 · VÌ SAO CẦN LẶP",
      title: "Lặp lại mà không gõ lại",
      bit: "Nhà máy đặt 100 con robot! Mình mà gõ 100 dòng cout thì mỏi tay lắm. Bạn chỉ mình <strong>bảo máy lặp lại</strong> nhé!",
      objectives: ["Thấy lợi ích của vòng lặp", "Đọc vòng for lặp n lần", "Viết for lặp một lệnh nhiều lần"],
      lesson: `
        <div class="comparison-board">
          <article class="compare-card before"><h4>😩 Không lặp — 5 dòng</h4>
            <div class="console-mini">cout &lt;&lt; "Lap rap!" &lt;&lt; endl;
cout &lt;&lt; "Lap rap!" &lt;&lt; endl;
cout &lt;&lt; "Lap rap!" &lt;&lt; endl;
cout &lt;&lt; "Lap rap!" &lt;&lt; endl;
cout &lt;&lt; "Lap rap!" &lt;&lt; endl;</div></article>
          <div class="comparison-arrow">→</div>
          <article class="compare-card after"><h4>😎 Có for — 3 dòng</h4>
            <div class="console-mini">for (int i = 1; i &lt;= 5; i++) {
    cout &lt;&lt; "Lap rap!" &lt;&lt; endl;
}</div>
            <p>Muốn 100 lần? Chỉ đổi <code>5</code> thành <code>100</code>.</p></article>
        </div>
        ${giaiMa("🔁 GIẢI MÃ VÒNG for", [
          { code: "for (int i = 1; i <= 5; i++) {\n    lenh;\n}", y: "Lặp lại <code>lenh</code> <strong>5 lần</strong> (i = 1, 2, 3, 4, 5).", sb: "repeat (5)\n  say [Lap rap!]\nend", nhan: true },
          { code: "{ ... }", y: "<strong>Thân vòng lặp</strong>: các lệnh được lặp lại." }
        ])}
        ${docThem([["for_loop", "Vòng lặp for"]])}
      `,
      challenges: [
        {
          id: "s1-count", type: "choice", icon: "🔢",
          title: "Nhiệm vụ 1: Mấy lần?",
          prompt: "<code>for (int i = 1; i &lt;= 4; i++)</code> chạy thân vòng lặp bao nhiêu lần?",
          options: [
            { text: "3 lần", why: "i nhận 1, 2, 3, 4 → 4 giá trị." },
            { text: "4 lần" },
            { text: "5 lần", why: "Khi i = 5 thì 5 <= 4 sai → dừng, không chạy lần thứ 5." },
            { text: "Lặp mãi", why: "i++ tăng dần nên có lúc i <= 4 sai → dừng." }
          ],
          answer: "4 lần",
          why: "Đúng! i = 1, 2, 3, 4."
        },
        {
          id: "s1-code", type: "code", icon: "🤖",
          title: "Nhiệm vụ 2: Lắp ráp 6 lần",
          prompt: "Dùng <strong>for</strong> để in “Lap rap!” 6 lần.",
          requirements: ["Phải dùng for.", "Chỉ được có 1 lệnh cout."],
          starter: prog("// Dung for de in 6 dong Lap rap!"),
          expected: "Lap rap!\nLap rap!\nLap rap!\nLap rap!\nLap rap!\nLap rap!",
          rules: [
            { test: coFor, msg: "Màn hình đúng, nhưng phải dùng vòng for." },
            { test: c => demLenh(c, "cout") === 1, msg: "Chỉ dùng 1 lệnh cout — đặt nó trong thân for." }
          ],
          why: "Một dòng cout mà in được 6 dòng — sức mạnh của vòng lặp!",
          hints: ["for (int i = 1; i <= 6; i++) { ... }", "Trong thân: cout << \"Lap rap!\" << endl;"]
        }
      ]
    },
    {
      kind: "stage", id: "stage-2", number: 2, nav: "Giải phẫu for",
      kicker: "CHẶNG 2 · BA PHẦN CỦA for",
      title: "Giải phẫu vòng for",
      bit: "Mỗi con robot cần một <strong>số thứ tự</strong>. Hoá ra biến <code>i</code> trong for đếm giúp mình luôn!",
      objectives: ["Gọi tên 3 phần của for", "Theo dõi giá trị i qua từng vòng", "Dùng i trong thân vòng lặp"],
      lesson: `
        ${giaiMa("🧬 BA PHẦN CỦA for (cách nhau dấu ;)", [
          { code: "int i = 1", y: "<strong>Khởi tạo</strong>: biến đếm bắt đầu từ 1 (chạy 1 lần duy nhất)." },
          { code: "i <= 3", y: "<strong>Điều kiện</strong>: còn đúng thì chạy thân; sai thì dừng.", nhan: true },
          { code: "i++", y: "<strong>Bước nhảy</strong>: sau mỗi vòng, i tăng thêm 1.", sb: "change [i v] by (1)" }
        ])}
        ${codeVaManHinh(`for (int i = 1; i <= 3; i++) {
    cout << "Robot so " << i << endl;
}`, "Robot so 1\nRobot so 2\nRobot so 3", "Dùng i trong thân")}
        <div class="table-wrap"><table class="test-table trace">
          <tr><th>Vòng</th><th>i</th><th>i &lt;= 3 ?</th><th>Làm gì</th></tr>
          <tr><td>1</td><td>1</td><td>đúng</td><td>in Robot so 1, rồi i++ → 2</td></tr>
          <tr><td>2</td><td>2</td><td>đúng</td><td>in Robot so 2, rồi i++ → 3</td></tr>
          <tr><td>3</td><td>3</td><td>đúng</td><td>in Robot so 3, rồi i++ → 4</td></tr>
          <tr><td>—</td><td>4</td><td><strong>sai</strong></td><td><strong>dừng</strong></td></tr>
        </table></div>
        ${docThem([["for_loop", "Vòng lặp for"]])}
      `,
      challenges: [
        {
          id: "s2-predict", type: "choice", icon: "🔮", bet: true, mono: true,
          title: "Nhiệm vụ 1: Theo dấu i",
          prompt: "Màn hình hiện gì? <strong>Đặt cược</strong> nếu tự tin.",
          code: `for (int i = 1; i <= 3; i++) {
    cout << i * 10 << " ";
}`,
          options: [
            { text: "10 20 30" },
            { text: "1 2 3", why: "Thân in i * 10, không phải i." },
            { text: "10 20 30 40", why: "i = 4 thì điều kiện sai → không in 40." },
            { text: "i * 10 i * 10 i * 10", why: "Không có ngoặc kép → máy tính giá trị." }
          ],
          answer: "10 20 30",
          why: "Chuẩn! i lần lượt là 1, 2, 3."
        },
        {
          id: "s2-code", type: "code", icon: "🏷️",
          title: "Nhiệm vụ 2: Dán số cho 5 robot",
          prompt: "Dùng i để in số thứ tự từng robot.",
          requirements: ["Dùng for và biến i.", "Chỉ 1 lệnh cout."],
          starter: prog("for (int i = 1; i <= 5; i++) {", "    // In Robot so ... dung i", "}"),
          expected: "Robot so 1\nRobot so 2\nRobot so 3\nRobot so 4\nRobot so 5",
          rules: [
            { test: coFor, msg: "Phải dùng vòng for." },
            { test: c => demLenh(c, "cout") === 1, msg: "Chỉ dùng 1 lệnh cout, in i trong thân for." }
          ],
          why: "5 robot đã có số thứ tự!",
          hints: ["cout << \"Robot so \" << i << endl;"]
        }
      ]
    },
    {
      kind: "gate", id: "gate-1", nav: "Điểm dừng 1",
      kicker: "ĐIỂM DỪNG 1 · SAU CHẶNG 1–2",
      codeHash: "2F66676B",
      todo: [
        "Thầy hỏi: <strong>for có mấy phần, mỗi phần làm gì?</strong> Con nói trước, thầy chốt sau.",
        "Chép phần <strong>Ghi bài 1</strong> trên slide vào vở.",
        "Trả lời <strong>2 câu ClassPoint</strong>.",
        "<strong>Luyện tập cặp</strong> trên <a href=\"https://www.programiz.com/cpp-programming/online-compiler/\" target=\"_blank\" rel=\"noopener\">Programiz ↗</a>: “Băng chuyền số”, chụp ảnh nộp ClassPoint.",
        "Thầy hiện <strong>mã mở khoá</strong> → con nhập vào ô bên dưới."
      ],
      challenges: [
        {
          id: "g1-bonus", type: "code", icon: "🎁", bonus: true,
          title: "Nhiệm vụ phụ: Hàng sao",
          prompt: "Dùng for in 8 dấu * trên cùng một dòng.",
          requirements: ["Dùng for, trong thân chỉ in một dấu *."],
          starter: prog("// In ******** bang for"),
          expected: "********",
          rules: [{ test: coFor, msg: "Phải dùng vòng for." }, { test: c => !/\*\*/.test(c.replace(/\/\/.*$/gm, "")), msg: "Trong cout chỉ in một dấu * mỗi lần." }],
          why: "Một hàng sao lấp lánh!",
          hints: ["Không dùng endl trong thân để các dấu * nằm cùng dòng."]
        }
      ]
    },
    {
      kind: "stage", id: "stage-3", number: 3, nav: "Đếm thông minh",
      kicker: "CHẶNG 3 · ĐẾM NGƯỢC · BƯỚC NHẢY · n",
      title: "Biến đếm thông minh",
      bit: "Robot cần <strong>đếm ngược</strong> trước khi xuất xưởng, và số robot mỗi ngày thì khác nhau. Bạn giúp mình đổi cách đếm nhé!",
      objectives: ["Đếm ngược với i--", "Đổi bước nhảy (i = i + 2)", "Lặp n lần với n nhập từ bàn phím"],
      lesson: `
        ${giaiMa("🎛️ BIẾN TẤU VÒNG for", [
          { code: "for (int i = 5; i >= 1; i--)", y: "<strong>Đếm ngược</strong> 5, 4, 3, 2, 1. <code>i--</code> là giảm 1.", sb: "change [i v] by (-1)" },
          { code: "for (int i = 2; i <= 10; i = i + 2)", y: "<strong>Bước nhảy 2</strong>: 2, 4, 6, 8, 10." },
          { code: "cin >> n;\nfor (int i = 1; i <= n; i++)", y: "Lặp <strong>n lần</strong>, n do người dùng nhập.", sb: "repeat (answer)\nend", nhan: true }
        ])}
        ${codeVaManHinh(`int n;
cout << "Nhap n: ";
cin >> n;
for (int i = n; i >= 1; i--) {
    cout << i << endl;
}
cout << "Xuat xuong!";`, "Nhap n: 3\n3\n2\n1\nXuat xuong!", "Đếm ngược từ n", "3")}
        ${meo("Đếm <strong>lên</strong> dùng <code>i++</code> với <code>&lt;=</code>; đếm <strong>xuống</strong> dùng <code>i--</code> với <code>&gt;=</code>. Lẫn lộn là vòng lặp chạy mãi!")}
        ${docThem([["for_loop", "Vòng lặp for"], ["operators_assignment", "Phép gán += -="]])}
      `,
      challenges: [
        {
          id: "s3-predict", type: "choice", icon: "🔮", bet: true, mono: true,
          title: "Nhiệm vụ 1: Bước nhảy 3",
          prompt: "Màn hình hiện gì?",
          code: `for (int i = 10; i >= 1; i = i - 3) {
    cout << i << " ";
}`,
          options: [
            { text: "10 7 4 1" },
            { text: "10 7 4", why: "i = 1 vẫn thoả 1 >= 1 nên được in." },
            { text: "10 9 8 7 6 5 4 3 2 1", why: "Bước nhảy là trừ 3, không phải trừ 1." },
            { text: "1 4 7 10", why: "Bắt đầu từ 10 và giảm dần." }
          ],
          answer: "10 7 4 1",
          why: "Chuẩn! 10 → 7 → 4 → 1 → (−2 thì dừng)."
        },
        {
          id: "s3-code", type: "code", icon: "🚀",
          title: "Nhiệm vụ 2: Đếm ngược xuất xưởng",
          prompt: "Nhập n, đếm ngược từ n về 1 (mỗi số một dòng), rồi in Xuat xuong!",
          requirements: ["Câu dẫn: Nhap n: ", "Dùng for đếm ngược.", "Đạt cả 2 ca."],
          starter: prog("int n;", 'cout << "Nhap n: ";', "cin >> n;", "// Dem nguoc tu n ve 1", "", 'cout << "Xuat xuong!";'),
          tests: [
            { input: "4", expected: "Nhap n: 4\n4\n3\n2\n1\nXuat xuong!" },
            { input: "1", expected: "Nhap n: 1\n1\nXuat xuong!" }
          ],
          rules: [{ test: coFor, msg: "Phải dùng vòng for." }],
          why: "3… 2… 1… Xuất xưởng!",
          hints: ["Bắt đầu i = n, điều kiện i >= 1, bước i--."]
        }
      ]
    },
    {
      kind: "stage", id: "stage-4", number: 4, nav: "Biến tổng",
      kicker: "CHẶNG 4 · CỘNG DỒN",
      title: "Biến tổng — cộng dồn qua từng vòng",
      bit: "Cuối ngày mình phải báo <strong>tổng số linh kiện</strong>. Bí quyết: một chiếc hộp tên <code>tong</code>, mỗi vòng bỏ thêm vào!",
      objectives: ["Khởi tạo biến tổng bằng 0", "Cộng dồn trong thân vòng lặp", "In tổng sau vòng lặp"],
      lesson: `
        ${giaiMa("➕ CỘNG DỒN", [
          { code: "int tong = 0;", y: "Hộp tổng <strong>bắt đầu bằng 0</strong> — đặt TRƯỚC vòng lặp.", sb: "set [tong v] to (0)" },
          { code: "tong = tong + i;", y: "Mỗi vòng: lấy tổng cũ cộng thêm i.", nho: "Viết gọn: tong += i;", sb: "change [tong v] by (i)", nhan: true },
          { code: "cout << tong;", y: "In tổng <strong>sau</strong> vòng lặp (ngoài dấu })." }
        ])}
        ${codeVaManHinh(`int tong = 0;
for (int i = 1; i <= 4; i++) {
    tong = tong + i;
}
cout << "Tong: " << tong;`, "Tong: 10", "Cộng 1 + 2 + 3 + 4")}
        <div class="table-wrap"><table class="test-table trace">
          <tr><th>i</th><th>1</th><th>2</th><th>3</th><th>4</th></tr>
          <tr><td>tong sau vòng</td><td>1</td><td>3</td><td>6</td><td><strong>10</strong></td></tr>
        </table></div>
        ${docThem([["for_loop", "Vòng lặp for"], ["operators_assignment", "Phép gán +="]])}
      `,
      challenges: [
        {
          id: "s4-why", type: "choice", icon: "🤔",
          title: "Nhiệm vụ 1: Vì sao tong = 0?",
          prompt: "Vì sao phải viết <code>int tong = 0;</code> <strong>trước</strong> vòng lặp?",
          options: [
            { text: "Để hộp tổng bắt đầu trống trước khi cộng dồn" },
            { text: "Để vòng lặp chạy 0 lần", why: "tong không ảnh hưởng số lần lặp." },
            { text: "Vì C++ bắt buộc mọi biến bằng 0", why: "Không bắt buộc — nhưng hộp tổng phải bắt đầu từ 0 để cộng đúng." },
            { text: "Đặt trong vòng lặp cũng được", why: "Đặt trong vòng lặp thì mỗi vòng tổng bị xoá về 0." }
          ],
          answer: "Để hộp tổng bắt đầu trống trước khi cộng dồn",
          why: "Đúng! Khởi tạo một lần, cộng dồn nhiều lần."
        },
        {
          id: "s4-code", type: "code", icon: "🧮",
          title: "Nhiệm vụ 2: Tổng 1 đến n",
          prompt: "Nhập n, in tổng 1 + 2 + … + n.",
          requirements: ["Câu dẫn: Nhap n: ", "In: Tong: <kết quả>", "Dùng for và biến tổng."],
          starter: prog("int n;", 'cout << "Nhap n: ";', "cin >> n;", "// Cong don tu 1 den n"),
          tests: [
            { input: "4", expected: "Nhap n: 4\nTong: 10" },
            { input: "10", expected: "Nhap n: 10\nTong: 55" },
            { input: "1", expected: "Nhap n: 1\nTong: 1" }
          ],
          rules: [{ test: coFor, msg: "Phải dùng vòng for." }],
          why: "Máy cộng dồn chuẩn xác!",
          hints: ["int tong = 0; for (int i = 1; i <= n; i++) { tong = tong + i; }", "In tổng sau dấu } của for."]
        }
      ]
    },
    {
      kind: "gate", id: "gate-2", nav: "Điểm dừng 2",
      kicker: "ĐIỂM DỪNG 2 · SAU CHẶNG 3–4",
      codeHash: "89FCC1A8",
      todo: [
        "Thầy hỏi: <strong>đếm ngược viết thế nào? Biến tổng cần mấy bước?</strong> Con nói trước, thầy chốt sau.",
        "Chép phần <strong>Ghi bài 2</strong> trên slide vào vở.",
        "Trả lời <strong>2 câu ClassPoint</strong>.",
        "<strong>Luyện tập cặp</strong> trên <a href=\"https://www.programiz.com/cpp-programming/online-compiler/\" target=\"_blank\" rel=\"noopener\">Programiz ↗</a>: “Tổng linh kiện có bọ”, chụp ảnh nộp ClassPoint.",
        "Thầy hiện <strong>mã mở BOSS</strong> → con nhập vào ô bên dưới."
      ],
      challenges: [
        {
          id: "g2-bonus", type: "code", icon: "🎁", bonus: true,
          title: "Nhiệm vụ phụ: Robot nhân đôi",
          prompt: "Mỗi ngày số robot nhân đôi, bắt đầu từ 1. Nhập n, in số robot sau n ngày.",
          requirements: ["Câu dẫn: Nhap so ngay: ", "In: So robot: <kết quả>"],
          starter: prog("int n;", 'cout << "Nhap so ngay: ";', "cin >> n;", "// Nhan doi n lan"),
          tests: [
            { input: "5", expected: "Nhap so ngay: 5\nSo robot: 32" },
            { input: "0", expected: "Nhap so ngay: 0\nSo robot: 1" }
          ],
          rules: [{ test: coFor, msg: "Phải dùng vòng for." }],
          why: "Bùng nổ robot!",
          hints: ["int soRobot = 1; mỗi vòng: soRobot = soRobot * 2;"]
        }
      ]
    },
    {
      kind: "boss", id: "boss", nav: "BOSS",
      kicker: "BOSS · CÁ NHÂN",
      title: "Hạ Robot Hỏng Mạch",
      bossName: "Robot Hỏng Mạch",
      bit: "Robot Hỏng Mạch làm rối dây chuyền! Mỗi nhiệm vụ đúng là một đòn. <strong>Tự làm một mình nhé.</strong>",
      lesson: docThem([["for_loop", "Vòng lặp for"], ["operators_assignment", "Phép gán"]], "🚑 Trạm cứu trợ — quên thì xem lại"),
      challenges: [
        {
          id: "boss-1", type: "choice", icon: "⚔️", bet: true, mono: true,
          title: "Đòn 1: Theo dấu i",
          prompt: "Màn hình hiện gì?",
          code: `for (int i = 2; i <= 8; i = i + 3) {
    cout << i << " ";
}`,
          options: [
            { text: "2 5 8" },
            { text: "2 5", why: "i = 8 thoả 8 <= 8 nên vẫn in." },
            { text: "2 3 4 5 6 7 8", why: "Bước nhảy là cộng 3." },
            { text: "2 5 8 11", why: "i = 11 thì 11 <= 8 sai → dừng." }
          ],
          answer: "2 5 8",
          why: "Trúng đòn!"
        },
        {
          id: "boss-2", type: "code", icon: "⚔️",
          title: "Đòn 2: Dây chuyền có bọ",
          prompt: "In “Robot 1” đến “Robot n”. Săn hết bọ!",
          requirements: ["Đạt cả 2 ca kiểm thử."],
          starter: prog("int n;", 'cout << "Nhap n: ";', "cin >> n", "for (int i = 1; i < n; i--) {", '    cout << "Robot " << i << endl;', "}"),
          tests: [
            { input: "3", expected: "Nhap n: 3\nRobot 1\nRobot 2\nRobot 3" },
            { input: "1", expected: "Nhap n: 1\nRobot 1" }
          ],
          bugs: [
            { label: "thiếu ; sau cin >> n", fixed: c => /cin\s*>>\s*n\s*;/.test(c) },
            { label: "lệch một: i < n", fixed: c => /i\s*<=\s*n/.test(c) },
            { label: "i-- chạy mãi", fixed: c => /i\s*\+\+|i\s*\+=\s*1|i\s*=\s*i\s*\+\s*1/.test(c) }
          ],
          why: "Trúng đòn! Dây chuyền chạy đúng từ 1 đến n.",
          hints: ["Muốn in tới n thì điều kiện là i <= n.", "Đếm lên thì bước nhảy là i++."]
        },
        {
          id: "boss-3", type: "code", icon: "⚔️",
          title: "Đòn 3: Hàng đèn LED",
          prompt: "Nhập n, in n dấu * trên một dòng.",
          requirements: ["Câu dẫn: Nhap n: ", "Dùng for, mỗi vòng in một dấu *."],
          starter: prog("int n;", "// Viet tiep"),
          tests: [
            { input: "5", expected: "Nhap n: 5\n*****" },
            { input: "1", expected: "Nhap n: 1\n*" }
          ],
          rules: [{ test: coFor, msg: "Phải dùng vòng for." }],
          why: "Đòn cuối trúng đích! Robot Hỏng Mạch gục rồi!",
          hints: ["for (int i = 1; i <= n; i++) { cout << \"*\"; }"]
        },
        {
          id: "adv-1", type: "code", icon: "🥇", advanced: true,
          title: "Nâng cao 1: Ống heo tăng dần",
          prompt: "Ngày 1 bỏ 1000 đồng, ngày 2 bỏ 2000, … ngày n bỏ n × 1000. Tính tổng sau n ngày.",
          requirements: ["Câu dẫn: Nhap so ngay: ", "In: Tong tien: <kết quả>"],
          starter: prog("int n;", "// Viet tiep"),
          tests: [
            { input: "3", expected: "Nhap so ngay: 3\nTong tien: 6000" },
            { input: "10", expected: "Nhap so ngay: 10\nTong tien: 55000" }
          ],
          rules: [{ test: coFor, msg: "Phải dùng vòng for." }],
          why: "Xuất sắc! Biến tổng cộng dồn i * 1000.",
          hints: ["tong = tong + i * 1000;"]
        },
        {
          id: "adv-2", type: "code", icon: "🥇", advanced: true,
          title: "Nâng cao 2: Luỹ thừa",
          prompt: "Nhập a và n, in a mũ n (a nhân với chính nó n lần).",
          requirements: ["Câu dẫn: Nhap a: và Nhap n: ", "In: Ket qua: <kết quả>"],
          starter: prog("int a, n;", "// Viet tiep"),
          tests: [
            { input: "2 10", expected: "Nhap a: 2\nNhap n: 10\nKet qua: 1024" },
            { input: "3 4", expected: "Nhap a: 3\nNhap n: 4\nKet qua: 81" },
            { input: "5 0", expected: "Nhap a: 5\nNhap n: 0\nKet qua: 1" }
          ],
          rules: [{ test: coFor, msg: "Phải dùng vòng for." }],
          why: "Huy hiệu vàng thuộc về bạn!",
          hints: ["int ketQua = 1; mỗi vòng: ketQua = ketQua * a;"]
        }
      ]
    }
  ]
};
