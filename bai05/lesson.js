/* Bài 5 — Ôn tập (trước KTTX2). Không kiến thức mới: cout · biến/cin · if-else · for.
   Câu chuyện: Về đích — Bit ôn lại cả hành trình trước kỳ kiểm tra.
   Mã mở khoá: chỉ ghi trong README của bài (thư mục giáo viên) — KHÔNG ghi trong web công khai.
*/
"use strict";
const { giaiMa, codeVaManHinh, meo, docThem, khongCo, cuPhap } = window.KIT;
const H = "#include <iostream>\nusing namespace std;\n\nint main() {\n";
const E = "    return 0;\n}";
const prog = (...dong) => H + dong.map(d => "    " + d).join("\n") + "\n" + E;
const coFor = c => /\bfor\s*\(/.test(window.CPP.stripComments(c));
const coIf = c => /\bif\s*\(/.test(window.CPP.stripComments(c));

window.LESSON = {
  id: "bai05", number: 5,
  title: "Ôn tập",
  story: "Về đích",
  badge: { icon: "🗺️", name: "Nhà thám hiểm C++" },
  certNote: "Ôn tập trước KTTX2 · làm lại không giới hạn",
  skills: ["cout và xuống dòng", "Biến int", "cin và câu dẫn", "if-else", "Vòng lặp for", "Biến tổng"],

  errorTable: [
    ["Lỗi cú pháp ở khoảng dòng N", "Thiếu <code>;</code> ở dòng trên, thiếu <code>\"</code>, <code>( )</code> hoặc <code>{ }</code>", "Xem dòng đó và dòng ngay trên"],
    ["Máy không biết tên \"…\"", "Sai hoa/thường (<code>Cout</code>, <code>soNu</code>/<code>sonu</code>) hoặc chưa khai báo biến", "Gõ tên giống hệt; khai báo <code>int</code> trước khi dùng"],
    ["Màn hình dính một dòng", "Thiếu <code>endl</code> / <code>\\n</code>", "Thêm <code>&lt;&lt; endl</code> đúng chỗ"],
    ["Luôn vào nhánh “đúng”", "Viết <code>=</code> thay cho <code>==</code>, hoặc có <code>;</code> sau <code>if (...)</code>", "Dùng <code>==</code>; bỏ <code>;</code> sau if"],
    ["Thiếu hoặc thừa một lần lặp", "Nhầm <code>&lt;</code> với <code>&lt;=</code>", "Thử ca nhỏ (n = 1, 2) và đếm số dòng"],
    ["Chạy mãi không dừng", "Bước nhảy sai hướng (<code>i--</code> khi đếm lên)", "Đếm lên dùng <code>i++</code>"],
    ["Tổng sai", "Quên <code>tong = 0</code> trước vòng lặp", "Khởi tạo trước, cộng dồn trong thân"]
  ],

  steps: [
    {
      kind: "stage", id: "stage-1", number: 1, nav: "Trạm xuất",
      kicker: "TRẠM 1 · cout (BÀI 1)",
      title: "Trạm 1 — Nói cho đúng",
      bit: "Chào bạn! Hôm nay mình đi lại cả hành trình để về đích. <strong>Trạm 1</strong>: in ra màn hình cho chuẩn từng chữ!",
      objectives: ["Khung chương trình", "cout, chữ và số, endl", "Săn bọ cú pháp"],
      lesson: `
        ${cuPhap({ ten: "CẦN NHỚ TỪ BÀI 1",
          mau: ["cout << ‹giá trị 1› << ‹giá trị 2› << endl;", "// ‹ghi chú một dòng›"],
          quyTac: ["Chữ trong ngoặc kép, số viết trực tiếp, nối bằng <code>&lt;&lt;</code>", "Mỗi lệnh kết thúc bằng <code>;</code>"] })}
        ${giaiMa("📒 TÓM TẮT BÀI 1", [
          { code: "int main() {\n    ...\n    return 0;\n}", y: "Lệnh viết trong <code>main</code>; mỗi lệnh kết thúc bằng <code>;</code>", sb: "when flag clicked" },
          { code: 'cout << "Lop " << 8 << endl;', y: "Chữ trong <code>\" \"</code>, số viết thẳng, nối bằng <code>&lt;&lt;</code>; <code>endl</code> xuống dòng.", sb: "say (join [Lop ] (8))", nhan: true },
          { code: "// ghi chú   /* ... */", y: "Comment: máy bỏ qua." }
        ])}
      `,
      challenges: [
        {
          id: "s1-predict", type: "choice", icon: "🔮", bet: true, mono: true,
          title: "Nhiệm vụ 1: Đoán màn hình",
          prompt: "Bạn đọc code rồi đoán xem màn hình hiện gì nhé. Chắc chắn thì bật <strong>⭐ Ngôi sao hi vọng</strong> để nhân đôi XP!",
          code: `cout << "On" << "tap" << endl;
cout << 5 << " bai";`,
          options: [
            { text: "On tap\n5 bai", why: "Không có dấu cách giữa \"On\" và \"tap\"." },
            { text: "Ontap\n5 bai" },
            { text: "Ontap 5 bai", why: "endl ở cuối dòng 1 → xuống dòng." },
            { text: "Ontap\n5bai", why: "Dấu cách nằm trong \" bai\" vẫn được in." }
          ],
          answer: "Ontap\n5 bai",
          why: "Chuẩn từng dấu cách!"
        },
        {
          id: "s1-debug", type: "code", icon: "🐞",
          title: "Nhiệm vụ 2: Săn bọ lời chào",
          prompt: "Lời chào của mình bị bọ phá rồi! Bạn chạy thử, đọc lỗi và sửa hết bọ để màn hình giống mẫu nhé.",
          requirements: ["In đúng 2 dòng như mẫu."],
          starter: prog('Cout << "Xin chao!" << endl', 'cout << "On tap C++"'),
          expected: "Xin chao!\nOn tap C++",
          bugs: [
            { label: "Cout viết hoa", fixed: c => khongCo(c, "\\bCout\\b") },
            { label: "thiếu ; dòng 5", fixed: c => /"Xin chao!"\s*<<\s*endl\s*;/.test(c) },
            { label: "thiếu ; dòng 6", fixed: c => /"On tap C\+\+"\s*;/.test(c) }
          ],
          why: "Hết bọ!",
          hints: ["Chữ thường cout; mỗi lệnh cần ; ở cuối."]
        }
      ]
    },
    {
      kind: "stage", id: "stage-2", number: 2, nav: "Trạm biến",
      kicker: "TRẠM 2 · BIẾN VÀ cin (BÀI 2)",
      title: "Trạm 2 — Nhớ và hỏi",
      bit: "<strong>Trạm 2</strong>: biến và lệnh nhập. Nhớ câu thần chú: <em>Nhập → Xử lý → Xuất</em>!",
      objectives: ["Khai báo, gán, gán lại biến", "cin có câu dẫn", "Phép + − *"],
      lesson: `
        ${cuPhap({ ten: "CẦN NHỚ TỪ BÀI 2",
          mau: ["int ‹tên biến› = ‹giá trị›;", "‹tên biến› = ‹biểu thức›;", "cin >> ‹tên biến›;"],
          quyTac: ["Tên biến: chữ cái tiếng Anh, chữ số, dấu <code>_</code>; không bắt đầu bằng số; không dấu cách, không dấu tiếng Việt; không trùng từ khoá",
                   "Khai báo biến trước khi gán, nhập hay in",
                   "Toán tử: <code>+ - * / %</code> — <code>7 / 2</code> là 3 (bỏ phần lẻ), <code>7 % 2</code> là 1 (số dư); <code>a += 2</code> là <code>a = a + 2</code>"] })}
        ${giaiMa("📒 TÓM TẮT BÀI 2", [
          { code: "int soKeo = 5;", y: "Khai báo + gán. Tên camelCase, không dấu cách, không bắt đầu bằng số.", sb: "set [soKeo v] to (5)" },
          { code: "soKeo = soKeo + 2;", y: "Gán lại: giá trị cũ cộng 2.", sb: "change [soKeo v] by (2)" },
          { code: 'cout << "Nhap n: ";\ncin >> n;', y: "Câu dẫn rồi <code>cin &gt;&gt;</code>: máy chờ người dùng gõ.", sb: "ask [Nhap n:] and wait", nhan: true }
        ])}
      `,
      challenges: [
        {
          id: "s2-predict", type: "choice", icon: "🔮", bet: true, mono: true, input: "4",
          title: "Nhiệm vụ 1: Người dùng gõ 4",
          prompt: "Giả sử bạn gõ số <code>4</code>. Màn hình hiện gì? Chắc chắn thì bật <strong>⭐ Ngôi sao hi vọng</strong> để nhân đôi XP!",
          code: `int x;
cout << "x = ";
cin >> x;
x = x * 3;
cout << "Ket qua: " << x + 1;`,
          options: [
            { text: "x = 4\nKet qua: 13" },
            { text: "x = 4\nKet qua: 5", why: "x đã được gán lại thành 12 trước khi in." },
            { text: "x = 4\nKet qua: 12", why: "Còn cộng thêm 1 khi in." },
            { text: "x = 4\nKet qua: x + 1", why: "Không có ngoặc kép → máy tính giá trị." }
          ],
          answer: "x = 4\nKet qua: 13",
          why: "4 × 3 = 12, rồi + 1 = 13!"
        },
        {
          id: "s2-code", type: "code", icon: "🛒",
          title: "Nhiệm vụ 2: Tiền mua vở",
          prompt: "Mỗi quyển vở giá 8000 đồng. Bạn viết chương trình nhập số quyển muốn mua, rồi in số tiền phải trả nhé.",
          requirements: ["Câu dẫn (gõ đúng từng chữ): Nhap so quyen: ", "In ra: Tien: <kết quả>"],
          starter: prog("// Nhap -> Xu ly -> Xuat"),
          tests: [
            { input: "3", expected: "Nhap so quyen: 3\nTien: 24000" },
            { input: "0", expected: "Nhap so quyen: 0\nTien: 0" }
          ],
          why: "Thu ngân chuẩn!",
          hints: ["int soQuyen; cin >> soQuyen; tiền = soQuyen * 8000."]
        }
      ]
    },
    {
      kind: "gate", id: "gate-1", nav: "Điểm dừng 1",
      kicker: "ĐIỂM DỪNG 1 · SAU TRẠM 1–2",
      codeHash: "5F04C273",
      todo: [
        "Thầy chốt sơ đồ tổng hợp: <strong>cout · biến · cin</strong>. Bạn nói trước, thầy chốt sau.",
        "Trả lời câu <strong>ClassPoint</strong>.",
        "<strong>Luyện tập cặp</strong> nhanh trên <a href=\"https://www.programiz.com/cpp-programming/online-compiler/\" target=\"_blank\" rel=\"noopener\">Programiz ↗</a> theo đề trên slide.",
        "Thầy hiện <strong>mã mở khoá</strong> → bạn nhập vào ô bên dưới."
      ],
      challenges: [
        {
          id: "g1-bonus", type: "code", icon: "🎁", bonus: true,
          title: "Nhiệm vụ phụ: Đổi giờ ra phút",
          prompt: "Bạn viết chương trình nhập số giờ, rồi đổi ra phút giúp mình nhé.",
          requirements: ["Câu dẫn (gõ đúng từng chữ): Nhap so gio: ", "In ra: <giờ> gio = <phút> phut"],
          starter: prog("int gio;", "// Viet tiep"),
          tests: [{ input: "2", expected: "Nhap so gio: 2\n2 gio = 120 phut" }],
          why: "Chuẩn!",
          hints: ["phút = gio * 60"]
        }
      ]
    },
    {
      kind: "stage", id: "stage-3", number: 3, nav: "Trạm if",
      kicker: "TRẠM 3 · if-else (BÀI 3)",
      title: "Trạm 3 — Rẽ đúng đường",
      bit: "<strong>Trạm 3</strong>: cổng game! Nhớ hai con bọ nguy hiểm: <code>=</code> thay cho <code>==</code> và <code>;</code> sau if.",
      objectives: ["6 phép so sánh", "if và if-else", "Kiểm thử ca biên"],
      lesson: `
        ${cuPhap({ ten: "CẦN NHỚ TỪ BÀI 3",
          mau: "if (‹điều kiện›) {\n    ‹các lệnh khi đúng›\n} else {\n    ‹các lệnh khi sai›\n}",
          quyTac: ["Phép so sánh: <code>&gt; &lt; &gt;= &lt;= == !=</code>", "Không đặt <code>;</code> sau <code>)</code>"] })}
        ${giaiMa("📒 TÓM TẮT BÀI 3", [
          { code: "> < >= <= == !=", y: "So sánh cho ra đúng (1) / sai (0). Bằng là <code>==</code>." },
          { code: "if (dk) {\n    A;\n} else {\n    B;\n}", y: "Đúng làm A, sai làm B — luôn đúng một nhánh.", sb: "if <(diem) > (4)> then\n  say [Dau]\nelse\n  say [Rot]\nend", nhan: true }
        ])}
        ${meo("Luôn thử <strong>ca biên</strong>: số đúng bằng mốc so sánh.")}
      `,
      challenges: [
        {
          id: "s3-predict", type: "choice", icon: "🔮", bet: true, mono: true, input: "18",
          title: "Nhiệm vụ 1: Người dùng gõ 18",
          prompt: "Giả sử bạn gõ <code>18</code>. Màn hình hiện gì? Chắc chắn thì bật <strong>⭐ Ngôi sao hi vọng</strong> để nhân đôi XP!",
          code: `int t;
cout << "Tuoi: ";
cin >> t;
if (t > 18) {
    cout << "Nguoi lon";
} else {
    cout << "Thieu nien";
}`,
          options: [
            { text: "Tuoi: 18\nNguoi lon", why: "18 > 18 là SAI (không tính bằng)." },
            { text: "Tuoi: 18\nThieu nien" },
            { text: "Tuoi: 18\nNguoi lonThieu nien", why: "Chỉ một nhánh chạy." },
            { text: "Tuoi: 18", why: "if-else luôn chạy đúng một nhánh." }
          ],
          answer: "Tuoi: 18\nThieu nien",
          why: "Ca biên 18 rơi vào else vì > không tính bằng!"
        },
        {
          id: "s3-code", type: "code", icon: "🏊",
          title: "Nhiệm vụ 2: Bể bơi",
          prompt: "Hồ bơi có hai bể: bạn nào cao từ 140 cm trở lên vào bể lớn, còn lại vào bể nhỏ. Bạn viết chương trình chỉ đường giúp mình nhé.",
          requirements: ["Câu dẫn (gõ đúng từng chữ): Chieu cao: ", "Từ 140 trở lên: Be lon · còn lại: Be nho"],
          starter: prog("int cao;", "// Viet tiep"),
          tests: [
            { input: "150", expected: "Chieu cao: 150\nBe lon" },
            { input: "140", expected: "Chieu cao: 140\nBe lon" },
            { input: "139", expected: "Chieu cao: 139\nBe nho" }
          ],
          rules: [{ test: coIf, msg: "Phải dùng if-else." }],
          why: "Đúng cả hai ca biên 140 và 139!",
          hints: ["if (cao >= 140)"]
        }
      ]
    },
    {
      kind: "stage", id: "stage-4", number: 4, nav: "Trạm for",
      kicker: "TRẠM 4 · VÒNG LẶP for (BÀI 4)",
      title: "Trạm 4 — Lặp không mỏi",
      bit: "<strong>Trạm 4</strong>: nhà máy robot! Ba phần của for, biến đếm và biến tổng — về đích thôi!",
      objectives: ["Ba phần của for", "Đếm lên, đếm xuống, bước nhảy", "Biến tổng"],
      lesson: `
        ${cuPhap({ ten: "CẦN NHỚ TỪ BÀI 4",
          mau: "for (‹khởi tạo›; ‹điều kiện›; ‹bước nhảy›) {\n    ‹thân vòng lặp›\n}",
          quyTac: ["Ba phần cách nhau bằng <code>;</code>", "Biến tổng: khai báo bằng 0 trước vòng lặp, cộng dồn trong thân, in sau vòng lặp"] })}
        ${giaiMa("📒 TÓM TẮT BÀI 4", [
          { code: "for (int i = 1; i <= n; i++) {\n    ...\n}", y: "Khởi tạo; điều kiện; bước nhảy — lặp n lần.", sb: "repeat (n)\nend", nhan: true },
          { code: "int tong = 0;\n...\ntong = tong + i;", y: "Biến tổng: 0 trước vòng lặp, cộng dồn trong thân.", sb: "change [tong v] by (i)" }
        ])}
      `,
      challenges: [
        {
          id: "s4-predict", type: "choice", icon: "🔮", bet: true, mono: true,
          title: "Nhiệm vụ 1: Tổng bao nhiêu?",
          prompt: "Bạn theo dõi biến tổng qua từng vòng rồi đoán màn hình hiện gì nhé. Chắc chắn thì bật <strong>⭐ Ngôi sao hi vọng</strong> để nhân đôi XP!",
          code: `int tong = 0;
for (int i = 1; i <= 5; i = i + 2) {
    tong = tong + i;
}
cout << tong;`,
          options: [
            { text: "15", why: "Bước nhảy 2: chỉ cộng 1, 3, 5." },
            { text: "9" },
            { text: "4", why: "i = 5 vẫn thoả 5 <= 5 nên được cộng." },
            { text: "135", why: "tong là số, cộng dồn chứ không ghép chữ." }
          ],
          answer: "9",
          why: "1 + 3 + 5 = 9!"
        },
        {
          id: "s4-code", type: "code", icon: "🔢",
          title: "Nhiệm vụ 2: Bảng nhân rút gọn",
          prompt: "Bạn viết chương trình nhập n, rồi in bảng nhân rút gọn từ n × 1 đến n × 5 nhé.",
          requirements: ["Câu dẫn (gõ đúng từng chữ): Nhap n: ", "Mỗi dòng dạng: n x i = kết quả"],
          starter: prog("int n;", "// Viet tiep"),
          tests: [
            { input: "3", expected: "Nhap n: 3\n3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15" }
          ],
          rules: [{ test: coFor, msg: "Phải dùng vòng for." }],
          why: "Bảng nhân chuẩn!",
          hints: ["cout << n << \" x \" << i << \" = \" << n * i << endl;"]
        }
      ]
    },
    {
      kind: "gate", id: "gate-2", nav: "Điểm dừng 2",
      kicker: "ĐIỂM DỪNG 2 · TRƯỚC GIỜ KIỂM TRA",
      codeHash: "5555E3EB",
      todo: [
        "Thầy chốt sơ đồ tổng hợp: <strong>if-else · for · biến tổng</strong>.",
        "Trả lời câu <strong>ClassPoint</strong>.",
        "<strong>KTTX2</strong>: 20 câu trắc nghiệm trên Canvas — làm nghiêm túc, một mình.",
        "Làm xong bài kiểm tra (hoặc ở nhà), nhập mã thầy cho để mở BOSS ôn tập."
      ],
      challenges: []
    },
    {
      kind: "boss", id: "boss", nav: "BOSS",
      kicker: "BOSS ÔN TẬP · CÁ NHÂN",
      title: "Hạ Trùm Cuối Hành Trình",
      bossName: "Trùm Cuối",
      bit: "Trùm Cuối dùng hết chiêu của 4 bài! Không có kiến thức mới — bạn đã có đủ vũ khí. <strong>Tự làm một mình nhé.</strong>",
      lesson: docThem([["output", "cout"], ["user_input", "cin"], ["conditions_else", "if-else"], ["for_loop", "for"]], "🚑 Trạm cứu trợ"),
      challenges: [
        {
          id: "boss-1", type: "choice", icon: "⚔️", bet: true, mono: true, input: "3",
          title: "Đòn 1: Đọc chương trình tổng hợp",
          prompt: "Trùm Cuối đố: nếu bạn gõ <code>3</code>, màn hình hiện gì? Chắc chắn thì bật <strong>⭐ Ngôi sao hi vọng</strong> để nhân đôi XP!",
          code: `int n;
cout << "n = ";
cin >> n;
int tong = 0;
for (int i = 1; i <= n; i++) {
    tong = tong + i * 2;
}
if (tong >= 12) {
    cout << "Cao " << tong;
} else {
    cout << "Thap " << tong;
}`,
          options: [
            { text: "n = 3\nThap 6", why: "Mỗi vòng cộng i * 2 → 2 + 4 + 6 = 12." },
            { text: "n = 3\nCao 12" },
            { text: "n = 3\nThap 12", why: "12 >= 12 là đúng." },
            { text: "n = 3\nCao 6", why: "Tổng là 2 + 4 + 6 = 12." }
          ],
          answer: "n = 3\nCao 12",
          why: "Trúng đòn! Biến tổng + ca biên >=."
        },
        {
          id: "boss-2", type: "code", icon: "⚔️",
          title: "Đòn 2: Săn bọ máy bán vé",
          prompt: "Máy bán vé bị bọ: mua từ 10 vé trở lên thì mỗi vé 15000, ít hơn thì 20000. Bạn sửa hết bọ giúp mình nhé!",
          requirements: ["Đúng với mọi ca trong bảng bên cạnh."],
          starter: prog("int soVe;", 'cout << "So ve: ";', "cin >> soVe;", "if (soVe => 10) {", '    cout << "Tong: " << soVe * 15000;', "} else {", '    cout << "Tong: " << SoVe * 20000;', "}"),
          tests: [
            { input: "12", expected: "So ve: 12\nTong: 180000" },
            { input: "10", expected: "So ve: 10\nTong: 150000" },
            { input: "3", expected: "So ve: 3\nTong: 60000" }
          ],
          bugs: [
            { label: "=> sai dấu", fixed: c => /soVe\s*>=\s*10/.test(c) },
            { label: "SoVe sai hoa/thường", fixed: c => khongCo(c, "\\bSoVe\\b") }
          ],
          why: "Trúng đòn!",
          hints: ["Lớn hơn hoặc bằng: >=", "Tên biến khai báo là soVe."]
        },
        {
          id: "boss-3", type: "code", icon: "⚔️",
          title: "Đòn 3: Đếm bước chân",
          prompt: "Bạn viết chương trình nhập số ngày n. Ngày thứ i đi i × 1000 bước. In tổng số bước, rồi: tổng từ 10000 trở lên in <strong>Dat muc tieu!</strong>, còn lại in <strong>Co len!</strong>",
          requirements: ["Câu dẫn (gõ đúng từng chữ): Nhap so ngay: ", "Dòng 2: Tong buoc: <tổng>", "Dòng 3: Dat muc tieu! hoặc Co len!"],
          starter: prog("int n;", "// Nhap -> for cong don -> if-else"),
          tests: [
            { input: "4", expected: "Nhap so ngay: 4\nTong buoc: 10000\nDat muc tieu!" },
            { input: "3", expected: "Nhap so ngay: 3\nTong buoc: 6000\nCo len!" }
          ],
          rules: [{ test: coFor, msg: "Phải dùng for để cộng dồn." }, { test: coIf, msg: "Phải dùng if-else để báo kết quả." }],
          why: "Đòn cuối trúng đích! Bạn đã về đích!",
          hints: ["tong = tong + i * 1000 trong vòng lặp.", "Sau vòng lặp: in tổng, rồi if (tong >= 10000) … else …"]
        },
        {
          id: "adv-1", type: "code", icon: "🥇", advanced: true,
          title: "Nâng cao 1: Tổng từ a đến b",
          prompt: "Bạn viết chương trình nhập hai số a, b (a ≤ b), rồi tính tổng các số từ a đến b giúp mình nhé.",
          requirements: ["Hai câu dẫn (gõ đúng từng chữ): Nhap a: và Nhap b: ", "In ra: Tong: <kết quả>"],
          starter: prog("int a, b;", "// Viet tiep"),
          tests: [
            { input: "3 6", expected: "Nhap a: 3\nNhap b: 6\nTong: 18" },
            { input: "5 5", expected: "Nhap a: 5\nNhap b: 5\nTong: 5" }
          ],
          rules: [{ test: coFor, msg: "Phải dùng vòng for." }],
          why: "Xuất sắc!",
          hints: ["for (int i = a; i <= b; i++)"]
        },
        {
          id: "adv-2", type: "code", icon: "🥇", advanced: true,
          title: "Nâng cao 2: Bảng giá theo số vé",
          prompt: "Bạn viết chương trình nhập n, rồi in bảng giá cho 1 vé, 2 vé, … đến n vé (mỗi vé 20000), mỗi dòng một số vé.",
          requirements: ["Câu dẫn (gõ đúng từng chữ): Nhap n: ", "Mỗi dòng: i ve: <tiền>"],
          starter: prog("int n;", "// Viet tiep"),
          tests: [
            { input: "3", expected: "Nhap n: 3\n1 ve: 20000\n2 ve: 40000\n3 ve: 60000" }
          ],
          rules: [{ test: coFor, msg: "Phải dùng vòng for." }],
          why: "Huy hiệu vàng thuộc về bạn!",
          hints: ["cout << i << \" ve: \" << i * 20000 << endl;"]
        }
      ]
    }
  ]
};
