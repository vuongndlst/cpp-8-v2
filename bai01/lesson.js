/* Bài 1 — Nhập môn C++: cấu trúc chương trình và xuất dữ liệu
   Câu chuyện: Bit mất giọng — bạn dạy robot Bit "nói" bằng cout.
   Mã mở khoá: chỉ ghi trong README của bài (thư mục giáo viên) — KHÔNG ghi trong web công khai.
*/
"use strict";

const { demo, giaiMa, codeVaManHinh, doan, meo, docThem, cuPhap } = window.KIT;
const readMore = (title, _sub, links) => docThem(links, title);
const noSemicolon = (code, pattern) => window.KIT.khongCo(code, pattern);

window.LESSON = {
  id: "bai01",
  number: 1,
  title: "Nhập môn C++",
  story: "Bit mất giọng",
  badge: { icon: "📣", name: "Người dạy Bit nói" },
  skills: ["Khung chương trình", "cout và <<", "Xuất chữ và số", "endl và \\n", "Comment", "Săn bọ cú pháp"],

  errorTable: [
    ["Lỗi cú pháp ở khoảng dòng N", "Thiếu dấu <code>;</code> ở cuối câu lệnh <em>phía trên</em>, thiếu dấu <code>\"</code> hoặc ngoặc <code>}</code>", "Thêm <code>;</code>; kiểm tra từng cặp <code>\" \"</code> và <code>{ }</code>"],
    ["Máy không biết tên \"Cout\" / \"Endl\"", "C++ phân biệt chữ hoa và chữ thường", "Viết <code>cout</code>, <code>endl</code> bằng chữ thường"],
    ["Output dính liền trên một dòng", "<code>cout</code> không tự xuống dòng", "Thêm <code>&lt;&lt; endl</code> hoặc <code>\\n</code> đúng chỗ cần xuống dòng"],
    ["Chữ in ra thiếu hoặc thừa dấu cách", "Chỉ dấu cách nằm <em>trong</em> <code>\" \"</code> mới được in", "Thêm/bớt dấu cách bên trong ngoặc kép"],
    ["main() chưa có dòng return 0;", "Thiếu lệnh kết thúc hàm <code>main</code>", "Thêm <code>return 0;</code> trước dấu <code>}</code> cuối cùng"],
    ["Một phần code \"biến mất\" khi chạy", "Quên đóng <code>/* ... */</code> nên phần sau thành comment", "Đóng comment bằng <code>*/</code>"],
    ["Output không khớp mẫu dù trông giống", "Sai chữ hoa/thường, sai dấu, thừa dòng trống", "So từng dòng với ô <strong>Kết quả cần đạt</strong>"]
  ],

  steps: [
    /* ================= CHẶNG 1 ================= */
    {
      kind: "stage", id: "stage-1", number: 1, nav: "Khởi động",
      kicker: "CHẶNG 1 · KHUNG CHƯƠNG TRÌNH",
      title: "Chương trình C++ đầu tiên của Bit",
      bit: "Chào bạn! Mình là <strong>Bit</strong>. Mình muốn chào cả lớp mà chưa biết nói. Bạn dạy mình viết chương trình C++ đầu tiên nhé!",
      objectives: ["Biết chương trình bắt đầu chạy ở đâu", "Hiểu cout dùng để xuất ra màn hình", "Sửa và chạy một chương trình ngắn"],
      lesson: `
        <div class="note-card blue short-note">
          <h3>💡 C++ là gì?</h3>
          <p>C++ là một <strong>ngôn ngữ lập trình</strong>: bạn viết chỉ dẫn bằng code, máy làm theo <strong>từng dòng, từ trên xuống</strong> — giống một chuỗi khối Scratch.</p>
        </div>
        ${codeVaManHinh(`#include <iostream>
using namespace std;

int main() {
    cout << "Xin chao, C++!";
    return 0;
}`, "Xin chao, C++!", "Chương trình đầu tiên")}
        ${giaiMa("🔍 GIẢI MÃ TỪNG LỆNH", [
          { code: "#include <iostream>", y: "Nạp công cụ nhập/xuất để dùng được <code>cout</code>." },
          { code: "using namespace std;", y: "Cho phép viết gọn <code>cout</code> thay vì <code>std::cout</code>.", nho: "Bây giờ bạn cứ xem đây là dòng thiết lập quen thuộc." },
          { code: "int main() {\n  ...\n}", y: "Chương trình <strong>bắt đầu chạy từ đây</strong>; các lệnh nằm trong <code>{ }</code>.", sb: "when flag clicked" },
          { code: 'cout << "Xin chao";', y: "Đưa chữ ra màn hình. Chữ đặt trong ngoặc kép.", nho: "Đọc là: “in dòng chữ Xin chao ra màn hình”.", sb: "say [Xin chao]", nhan: true },
          { code: "return 0;", y: "Kết thúc <code>main()</code> — nằm ngay trước dấu <code>}</code> cuối." }
        ])}
        ${cuPhap({ ten: "KHUNG CHƯƠNG TRÌNH C++",
          mau: "#include <iostream>\nusing namespace std;\n\nint main() {\n    ‹các lệnh›\n    return 0;\n}",
          quyTac: ["Mỗi lệnh kết thúc bằng dấu chấm phẩy <code>;</code>",
                   "Các lệnh viết giữa <code>{</code> và <code>}</code> của <code>main()</code>, thụt vào 4 dấu cách",
                   "Máy chạy lần lượt từng lệnh, từ trên xuống dưới",
                   "C++ phân biệt chữ hoa và chữ thường: <code>cout</code> khác <code>Cout</code>"] })}
        ${doan("đổi <code>\"Xin chao, C++!\"</code> thành <code>\"Chao lop 8!\"</code> thì phần nào trên màn hình thay đổi?",
          "Chỉ dòng chữ trên màn hình đổi thành <code>Chao lop 8!</code>. Khung chương trình giữ nguyên.")}
        ${readMore("📚 Đọc thêm trên W3Schools", "", [["intro", "C++ là gì?"], ["getstarted", "Bắt đầu với C++"], ["syntax", "Cú pháp"]])}
      `,
      challenges: [
        {
          id: "s1-order", type: "sequence", icon: "🧩", mono: true,
          title: "Nhiệm vụ 1: Lắp chương trình",
          prompt: "Các dòng code của mình bị xáo trộn rồi! Bạn bấm lần lượt từng dòng, từ dòng đầu đến dòng cuối, để lắp lại chương trình giúp mình nhé.",
          shuffle: ["    return 0;", "int main() {", "#include <iostream>", "}", "    cout << \"Xin chao!\";", "using namespace std;"],
          answer: ["#include <iostream>", "using namespace std;", "int main() {", "    cout << \"Xin chao!\";", "    return 0;", "}"],
          hintWrong: "Nhớ: chuẩn bị công cụ trước → mở main → các lệnh → return 0; → đóng }.",
          why: "Đúng! Thư viện ở trên cùng, các lệnh nằm trong main(), return 0; đứng cuối.",
          hints: ["Hai dòng thiết lập (#include, using) luôn đứng đầu.", "Thứ tự: #include → using → int main() { → cout → return 0; → }"]
        },
        {
          id: "s1-run", type: "code", icon: "🚀",
          title: "Nhiệm vụ 2: Dạy Bit câu chào đầu tiên",
          prompt: "Bạn giúp mình chào cả lớp nhé: chỉ sửa nội dung trong dấu ngoặc kép thành <strong>Chao lop 8!</strong>, rồi bấm ▶ Chạy để nghe mình nói.",
          requirements: ["Chỉ sửa nội dung trong dấu ngoặc kép, giữ nguyên các dòng khác.", "Màn hình hiện đúng câu: Chao lop 8!"],
          starter: `#include <iostream>
using namespace std;

int main() {
    cout << "Xin chao, C++!";
    return 0;
}`,
          expected: "Chao lop 8!",
          why: "Bit đã nói được câu đầu tiên!",
          hints: ["Tìm dòng có cout. Chỉ thay chữ nằm giữa hai dấu ngoặc kép.", "Giữ nguyên cout, << và dấu ; — chỉ sửa thành \"Chao lop 8!\"."]
        }
      ]
    },

    /* ================= CHẶNG 2 ================= */
    {
      kind: "stage", id: "stage-2", number: 2, nav: "cout & xuống dòng",
      kicker: "CHẶNG 2 · XUẤT DỮ LIỆU",
      title: "Điều khiển chữ hiện ra màn hình",
      bit: "Mình nói được rồi, nhưng chữ cứ <strong>dính thành một hàng</strong>! Bạn chỉ mình cách in số và cách xuống dòng với.",
      objectives: ["Dùng cout và <<", "Phân biệt chữ với số khi xuất", "Dùng endl hoặc \\n để xuống dòng"],
      lesson: `
        ${giaiMa("📣 ĐỌC MỘT LỆNH cout", [
          { code: 'cout << "Xin chao";', y: "<strong>cout</strong> = màn hình, <strong>&lt;&lt;</strong> = “đưa vào”. Chữ nằm trong <code>\" \"</code>.", nho: "Màn hình: Xin chao", sb: "say [Xin chao]", nhan: true },
          { code: "cout << 14;", y: "Số in thẳng, không cần ngoặc kép.", nho: "Màn hình: 14", sb: "say (14)" },
          { code: 'cout << "Tuoi: " << 14;', y: "Nối nhiều phần bằng nhiều dấu <code>&lt;&lt;</code>.", nho: "Màn hình: Tuoi: 14", sb: "say (join [Tuoi: ] (14))" }
        ])}
        <div class="comparison-board">
          <article class="compare-card before"><h4>Chưa xuống dòng</h4>
            <div class="console-mini">Ten cua minh la:MinhTuoi: 14</div>
            <p><code>cout</code> <strong>không tự xuống dòng</strong>.</p></article>
          <div class="comparison-arrow">→</div>
          <article class="compare-card after"><h4>Thêm endl</h4>
            <div class="console-mini">Ten cua minh la:
Minh
Tuoi: 14</div>
            <p>Thêm <code>endl</code> hoặc <code>\\n</code> đúng chỗ muốn xuống dòng.</p></article>
        </div>
        ${codeVaManHinh(`cout << "Ten cua minh la:" << endl;
cout << "Minh" << endl;
cout << "Tuoi: " << 14;`, "Ten cua minh la:\nMinh\nTuoi: 14", "Cùng ví dụ, thêm endl")}
        ${meo("<strong>Nhớ:</strong> <code>endl</code> và <code>\\n</code> đều tạo dòng mới. <code>\\n</code> phải nằm <em>trong</em> ngoặc kép: <code>\"Xin chao\\n\"</code>.")}
        ${cuPhap({ ten: "LỆNH cout",
          mau: ["cout << ‹giá trị›;", "cout << ‹giá trị 1› << ‹giá trị 2› << ‹…›;"],
          phan: [["‹giá trị›", "chữ đặt trong ngoặc kép (<code>\"Xin chao\"</code>), số (<code>14</code>) hoặc <code>endl</code>"]],
          quyTac: ["Chữ phải nằm trong cặp ngoặc kép <code>\" \"</code>; số viết trực tiếp",
                   "Các phần nối với nhau bằng <code>&lt;&lt;</code>",
                   "Xuống dòng: <code>endl</code> (ngoài ngoặc kép) hoặc <code>\\n</code> (trong ngoặc kép)"],
          viDu: 'cout << "Tuoi: " << 14 << endl;\ncout << "Lop 8";', man: "Tuoi: 14\nLop 8" })}
        ${readMore("📚 Đọc thêm trên W3Schools", "", [["output", "Xuất chữ"], ["output_numbers", "Xuất số"], ["new_lines", "Xuống dòng"]])}
      `,
      challenges: [
        {
          id: "s2-predict", type: "choice", icon: "🔮", bet: true, mono: true,
          title: "Nhiệm vụ 1: Nhìn code, đoán kết quả",
          prompt: "Bạn đọc code rồi đoán xem màn hình hiện gì nhé. Chắc chắn thì bật <strong>⭐ Ngôi sao hi vọng</strong> để nhân đôi XP!",
          code: `cout << "Bit" << endl;
cout << "lop " << 8;
cout << "A" << endl;
cout << "xin chao!";`,
          options: [
            { text: "Bit lop 8A xin chao!", why: "Có endl sau Bit, nên Bit phải nằm riêng một dòng." },
            { text: "Bit\nlop 8\nA\nxin chao!", why: "Sau số 8 không có endl, nên A in tiếp ngay trên cùng dòng." },
            { text: "Bit\nlop 8A\nxin chao!" },
            { text: "Bit\nlop8A\nxin chao!", why: "Dấu cách nằm trong \"lop \" vẫn được in ra, nên giữa lop và 8 có dấu cách." }
          ],
          answer: "Bit\nlop 8A\nxin chao!",
          why: "Chính xác! Chỉ chỗ nào có endl mới xuống dòng; dấu cách trong \" \" cũng được in."
        },
        {
          id: "s2-lines", type: "code", icon: "↩️",
          title: "Nhiệm vụ 2: Tách thành 3 dòng",
          prompt: "Lời giới thiệu của mình đang dính thành một hàng. Bạn dùng <code>endl</code> để xuống dòng, sao cho màn hình giống hệt ô mẫu nhé.",
          requirements: ["Dòng 1: Ten cua minh la:", "Dòng 2: Minh", "Dòng 3: Tuoi: 14", "Màn hình có đúng 3 dòng, không thừa dòng trống."],
          starter: `#include <iostream>
using namespace std;

int main() {
    cout << "Ten cua minh la:";
    cout << "Minh";
    cout << "Tuoi: ";
    cout << 14;
    return 0;
}`,
          expected: "Ten cua minh la:\nMinh\nTuoi: 14",
          why: "Đúng 3 dòng! Bạn đã điều khiển được chỗ xuống dòng.",
          hints: ["3 dòng thì cần 2 lần xuống dòng: sau dòng 1 và sau dòng 2.", "Thêm << endl vào cuối lệnh cout thứ nhất và thứ hai, trước dấu ;."]
        }
      ]
    },

    /* ================= ĐIỂM DỪNG 1 ================= */
    {
      kind: "gate", id: "gate-1", nav: "Điểm dừng 1",
      kicker: "ĐIỂM DỪNG 1 · SAU CHẶNG 1–2",
      codeHash: "8B2ED1A6",
      todo: [
        "Thầy hỏi: <strong>bạn hiểu gì</strong> về khung chương trình và <code>cout</code>? Bạn nói trước, thầy chốt sau.",
        "Chép phần <strong>Ghi bài 1</strong> trên slide vào vở.",
        "Trả lời <strong>2 câu ClassPoint</strong>.",
        "<strong>Luyện tập cặp</strong> trên <a href=\"https://www.programiz.com/cpp-programming/online-compiler/\" target=\"_blank\" rel=\"noopener\">Programiz ↗</a>: hai bạn một máy, làm theo đề trên slide, chụp ảnh output nộp lên ClassPoint.",
        "Thầy hiện <strong>mã mở khoá</strong> → bạn nhập vào ô bên dưới để đi tiếp."
      ],
      challenges: [
        {
          id: "g1-bonus", type: "code", icon: "🎁", bonus: true,
          title: "Nhiệm vụ phụ: Bảng tên của Bit",
          prompt: "Bạn làm cho mình một bảng tên thật xịn nhé: in khung tên giống hệt mẫu, từng dấu cách một.",
          requirements: ["In đúng 3 dòng, giống hệt mẫu — đếm kỹ cả dấu cách."],
          starter: `#include <iostream>
using namespace std;

int main() {
    // In khung ten o day
    return 0;
}`,
          expected: "+---------+\n|  BIT 8  |\n+---------+",
          why: "Bảng tên đẹp lắm!",
          hints: ["Mỗi dòng là một lệnh cout ... << endl;", "Dòng giữa: cout << \"|  BIT 8  |\" << endl; (2 dấu cách mỗi bên)."]
        }
      ]
    },

    /* ================= CHẶNG 3 ================= */
    {
      kind: "stage", id: "stage-3", number: 3, nav: "Thám tử code",
      kicker: "CHẶNG 3 · CÚ PHÁP & SĂN BỌ",
      title: "Đọc dấu hiệu lỗi và sửa chương trình",
      bit: "Ối, có <strong>bọ</strong> chui vào code của mình! Bạn làm thám tử: đọc thông báo lỗi, tìm đúng chỗ và sửa giúp mình.",
      objectives: ["Hiểu câu lệnh và dấu ;", "C++ phân biệt chữ hoa/thường", "Dùng comment đúng mục đích"],
      lesson: `
        ${giaiMa("🕵️ 4 DẤU HIỆU CẦN NHÌN KHI SĂN BỌ", [
          { code: "câu lệnh;", y: "Mỗi <strong>câu lệnh</strong> kết thúc bằng dấu <code>;</code>.", nho: "Quên ; → máy báo lỗi, thường chỉ vào dòng NGAY SAU chỗ thiếu." },
          { code: "cout ≠ Cout", y: "C++ <strong>phân biệt chữ hoa và chữ thường</strong>.", nho: "cout và Cout là hai tên khác nhau." },
          { code: "{ ... }", y: "Ngoặc nhọn bao một khối code; lệnh của <code>main()</code> nằm bên trong." },
          { code: "// một dòng\n/* nhiều dòng */", y: "<strong>Comment</strong>: ghi chú cho người đọc, máy bỏ qua.", nho: "Không bao giờ hiện ra màn hình.", nhan: true }
        ])}
        <div class="debug-routine"><strong>🔧 Khi chương trình báo lỗi:</strong>
          <span>1. Đọc dòng ⚠ LỖI</span><span>→</span><span>2. Kiểm tra ;</span><span>→</span><span>3. Kiểm tra hoa/thường</span><span>→</span><span>4. Kiểm tra " " và { }</span><span>→</span><span>5. Chạy lại</span></div>
        <div class="example-pair">
          <article><h4>❌ Sai</h4><pre><code>cout &lt;&lt; "Hello!"</code></pre><p>Thiếu dấu <code>;</code>.</p></article>
          <article><h4>✅ Đúng</h4><pre><code>cout &lt;&lt; "Hello!";</code></pre><p>Câu lệnh đã kết thúc rõ ràng.</p></article>
        </div>
        ${readMore("📚 Khi chưa hiểu lỗi, đọc đúng mục này", "Không cần đọc hết.", [["syntax", "Cấu trúc chương trình"], ["statements", "Câu lệnh và dấu ;"], ["comments", "Comment"]])}
      `,
      challenges: [
        {
          id: "s3-comment", type: "choice", icon: "💬",
          title: "Nhiệm vụ 1: Comment làm gì?",
          prompt: "Mình thấy mấy dòng bắt đầu bằng <code>//</code> trong code. Theo bạn, câu nào nói đúng về comment?",
          options: [
            { text: "Comment được in ra màn hình", why: "Máy bỏ qua comment nên nó không bao giờ được in ra." },
            { text: "Comment giúp người đọc hiểu code và không tạo ra output" },
            { text: "Comment thay thế được cho cout", why: "Comment không làm gì khi chạy; muốn in phải dùng cout." },
            { text: "Comment tự sửa lỗi cú pháp", why: "Comment chỉ là ghi chú, không sửa được lỗi." }
          ],
          answer: "Comment giúp người đọc hiểu code và không tạo ra output",
          why: "Đúng! Comment dành cho người đọc; máy bỏ qua hoàn toàn."
        },
        {
          id: "s3-debug", type: "code", icon: "🐞",
          title: "Nhiệm vụ 2: Săn 3 con bọ",
          prompt: "Ba con bọ đang trốn trong code của mình. Bạn sửa đúng con nào thì nó nổ 💥 ngay. Bấm ▶ Chạy và đọc dòng ⚠ LỖI để lần ra chúng nhé!",
          requirements: ["Đúng 2 dòng.", "Dòng 1: Hello!", "Dòng 2: C++"],
          starter: `#include <iostream>
using namespace std

int main() {
    Cout << "Hello!" << endl;
    cout << "C++"
    return 0;
}`,
          expected: "Hello!\nC++",
          bugs: [
            { label: "thiếu ; ở using", fixed: code => /using\s+namespace\s+std\s*;/.test(code) },
            { label: "Cout viết hoa", fixed: code => noSemicolon(code, "\\bCout\\b") },
            { label: "thiếu ; sau \"C++\"", fixed: code => /"C\+\+"[^;\n]*;/.test(code) }
          ],
          why: "Hết bọ! Bạn đã sửa đủ 3 lỗi: hai dấu ; và chữ hoa/thường.",
          hints: ["Có 3 lỗi thuộc 2 quy tắc vừa học: dấu ; và chữ hoa/thường.", "Xem dòng using namespace std, dòng Cout, và dòng cout << \"C++\"."]
        }
      ]
    },

    /* ================= CHẶNG 4 ================= */
    {
      kind: "stage", id: "stage-4", number: 4, nav: "Tự xây",
      kicker: "CHẶNG 4 · TỰ XÂY CHƯƠNG TRÌNH",
      title: "Nhìn kết quả trước, rồi mới viết code",
      bit: "Giờ bạn tự xây chương trình. Bí quyết của mình: <strong>nhìn kết quả cần có trước</strong>, rồi mới viết từng lệnh cout.",
      objectives: ["Ghép chữ và số trong một cout", "Dùng comment để code dễ hiểu", "Tự chạy thử và so sánh"],
      lesson: `
        <div class="build-method"><h3>🛠️ CÔNG THỨC "NHÌN KẾT QUẢ TRƯỚC"</h3>
          <div class="build-steps">
            <div><span>1</span><strong>Viết output cần có</strong><small>Mỗi dòng hiện gì?</small></div>
            <div><span>2</span><strong>Chọn cout</strong><small>Chữ trong " "; số viết trực tiếp.</small></div>
            <div><span>3</span><strong>Chọn chỗ xuống dòng</strong><small>endl hoặc \\n.</small></div>
            <div><span>4</span><strong>Chạy và so sánh</strong><small>So từng dòng với mẫu.</small></div>
            <div><span>5</span><strong>Sửa một lỗi mỗi lần</strong><small>Chạy lại sau mỗi lần sửa.</small></div>
          </div></div>
        <div class="note-card green short-note">
          <h3>🔗 Một <code>cout</code> ghép được nhiều phần</h3>
          <p><code class="inline-code">cout &lt;&lt; "Nam nay toi " &lt;&lt; 14 &lt;&lt; " tuoi";</code></p>
          <p>Đọc là: <strong>in chữ → in số → in chữ</strong>. Kết quả: <code>Nam nay toi 14 tuoi</code>.</p>
        </div>
        <div class="note-card purple short-note">
          <h3>💬 Comment giúp bạn nhớ "vì sao"</h3>
          <p><code class="inline-code">// In thong tin hoc sinh</code> không hiện ra màn hình, nhưng giúp bạn và người khác đọc code nhanh hơn.</p>
        </div>
        ${cuPhap({ ten: "COMMENT (GHI CHÚ)",
          mau: ["// ‹ghi chú một dòng›", "/* ‹ghi chú\n   nhiều dòng› */"],
          quyTac: ["Máy bỏ qua comment: không chạy, không in ra màn hình",
                   "<code>//</code>: từ dấu <code>//</code> đến hết dòng là ghi chú",
                   "<code>/* … */</code>: mọi thứ nằm giữa <code>/*</code> và <code>*/</code> là ghi chú"] })}
        ${readMore("📚 Ôn nhanh trước BOSS", "Mở mục bạn còn yếu, thử ví dụ rồi quay lại.", [["output", "cout"], ["new_lines", "endl / \\n"], ["comments", "Comment"]])}
      `,
      challenges: [
        {
          id: "s4-onecout", type: "code", icon: "🔗",
          title: "Nhiệm vụ 1: Gộp 3 cout thành 1",
          prompt: "Mình đang dùng 3 lệnh cout cho một câu — dài quá! Bạn gộp lại thành <strong>1 lệnh cout</strong> mà màn hình vẫn y như cũ nhé.",
          requirements: ["Chỉ dùng 1 lệnh cout (nối các phần bằng <<).", "Màn hình vẫn là: Nam nay toi 14 tuoi"],
          starter: `#include <iostream>
using namespace std;

int main() {
    cout << "Nam nay toi ";
    cout << 14;
    cout << " tuoi";
    return 0;
}`,
          expected: "Nam nay toi 14 tuoi",
          rules: [{
            test: code => (window.CPP.stripComments(code).match(/\bcout\b/g) || []).length === 1,
            msg: "Output đúng rồi, nhưng code vẫn còn nhiều hơn 1 lệnh cout. Ghép chúng bằng nhiều dấu <<."
          }],
          why: "Gọn gàng! Một cout ghép được chữ, số, chữ.",
          hints: ["Một cout dùng được nhiều << liên tiếp.", "cout << \"Nam nay toi \" << 14 << \" tuoi\";"]
        },
        {
          id: "s4-comment", type: "code", icon: "💬",
          title: "Nhiệm vụ 2: Ghi chú mà không đổi kết quả",
          prompt: "Bạn thêm ghi chú giúp mình nhớ code làm gì: một comment kiểu <code>//</code> và một comment kiểu <code>/* ... */</code>. Màn hình phải giữ nguyên nhé!",
          requirements: ["Có ít nhất 1 comment //", "Có ít nhất 1 comment /* ... */", "Dòng 1: Xin chao!", "Dòng 2: Bit dang hoc C++"],
          starter: `#include <iostream>
using namespace std;

int main() {
    cout << "Xin chao!" << endl;
    cout << "Bit dang hoc C++";
    return 0;
}`,
          expected: "Xin chao!\nBit dang hoc C++",
          rules: [
            { test: code => /\/\/.+/.test(code.replace(/"(?:[^"\\]|\\.)*"/g, "\"\"")), msg: "Output đúng, nhưng bạn chưa có comment //." },
            { test: code => /\/\*[\s\S]*?\*\//.test(code), msg: "Output đúng, nhưng bạn chưa có comment /* ... */." }
          ],
          why: "Comment làm code rõ hơn mà không đổi output.",
          hints: ["Thêm một dòng bắt đầu bằng //, và một đoạn nằm giữa /* và */.", "Đừng đặt comment vào giữa phần chữ trong \" \"."]
        }
      ]
    },

    /* ================= ĐIỂM DỪNG 2 ================= */
    {
      kind: "gate", id: "gate-2", nav: "Điểm dừng 2",
      kicker: "ĐIỂM DỪNG 2 · SAU CHẶNG 3–4",
      codeHash: "196207DA",
      todo: [
        "Thầy hỏi: <strong>khi chương trình báo lỗi, bạn làm gì?</strong> Bạn nói trước, thầy chốt sau.",
        "Chép phần <strong>Ghi bài 2</strong> trên slide vào vở.",
        "Trả lời <strong>2 câu ClassPoint</strong>.",
        "<strong>Luyện tập cặp</strong> trên <a href=\"https://www.programiz.com/cpp-programming/online-compiler/\" target=\"_blank\" rel=\"noopener\">Programiz ↗</a>: sửa lỗi theo đề trên slide, chụp ảnh output nộp lên ClassPoint.",
        "Thầy hiện <strong>mã mở BOSS</strong> → bạn nhập vào ô bên dưới."
      ],
      challenges: [
        {
          id: "g2-bonus", type: "code", icon: "🎁", bonus: true,
          title: "Nhiệm vụ phụ: Vẽ mặt Bit",
          prompt: "Vẽ chân dung mình bằng cout nhé! In hình mặt Bit giống hệt mẫu.",
          requirements: ["In đúng 4 dòng, giống hệt mẫu — đếm kỹ cả dấu cách."],
          starter: `#include <iostream>
using namespace std;

int main() {
    // Ve mat Bit o day
    return 0;
}`,
          expected: " .-----.\n | o o |\n |  -  |\n '-----'",
          why: "Bit cười tươi rồi!",
          hints: ["Mỗi dòng một lệnh cout ... << endl; nhớ giữ dấu cách đầu dòng trong ngoặc kép.", "Dòng cuối: cout << \" '-----'\";"]
        }
      ]
    },

    /* ================= BOSS ================= */
    {
      kind: "boss", id: "boss", nav: "BOSS",
      kicker: "BOSS · CÁ NHÂN",
      title: "Hạ Bọ Chúa Cú Pháp",
      bossName: "Bọ Chúa Cú Pháp",
      bit: "Bọ Chúa Cú Pháp chặn đường! Mỗi nhiệm vụ đúng là một đòn đánh. Không có kiến thức mới — bạn dùng đúng những gì vừa học. <strong>Tự làm một mình nhé.</strong>",
      lesson: readMore("🚑 Trạm cứu trợ", "Quên thì được xem lại trước khi đánh tiếp.", [["syntax", "Cú pháp"], ["output", "cout"], ["new_lines", "Xuống dòng"], ["comments", "Comment"]]),
      challenges: [
        {
          id: "boss-1", type: "choice", icon: "⚔️", bet: true, mono: true,
          title: "Đòn 1: Đoán output",
          prompt: "Bọ Chúa tung câu đố: đoạn code này in ra gì? Chắc chắn thì bật <strong>⭐ Ngôi sao hi vọng</strong> để nhân đôi XP!",
          code: `cout << "Lop" << endl;
cout << "8A";
cout << "!" << endl;
cout << 2026;`,
          options: [
            { text: "Lop 8A ! 2026", why: "Có endl sau Lop và sau ! nên phải có xuống dòng." },
            { text: "Lop\n8A\n!\n2026", why: "Sau \"8A\" không có endl, nên ! in tiếp trên cùng dòng." },
            { text: "Lop\n8A!\n2026" },
            { text: "Lop8A!2026", why: "endl tạo dòng mới, nên không thể dính liền hết." }
          ],
          answer: "Lop\n8A!\n2026",
          why: "Trúng đòn! Chỉ có 2 endl nên có đúng 3 dòng."
        },
        {
          id: "boss-2", type: "code", icon: "⚔️",
          title: "Đòn 2: Săn bọ",
          prompt: "Bọ Chúa thả bọ vào code! Bạn bấm ▶ Chạy, đọc dòng ⚠ LỖI rồi sửa từng con một cho đến khi màn hình đúng mẫu.",
          requirements: ["Dòng 1: Debug OK", "Dòng 2: 2026"],
          starter: `#include <iostream>
using namespace std;

int main() {
    Cout << "Debug OK" << Endl;
    cout << 2026
    return 0;
}`,
          expected: "Debug OK\n2026",
          bugs: [
            { label: "Cout viết hoa", fixed: code => noSemicolon(code, "\\bCout\\b") },
            { label: "Endl viết hoa", fixed: code => noSemicolon(code, "\\bEndl\\b") },
            { label: "thiếu ; sau 2026", fixed: code => /2026\s*;/.test(code) }
          ],
          why: "Trúng đòn! Bọ chữ hoa và bọ dấu ; đều bị diệt.",
          hints: ["Kiểm tra chữ hoa/thường của cout và endl.", "Dòng cout << 2026 thiếu gì ở cuối?"]
        },
        {
          id: "boss-3", type: "code", icon: "⚔️",
          title: "Đòn 3: Hồ sơ của Bit",
          prompt: "Hồ sơ của mình đang lộn xộn. Bạn sửa code để màn hình giống hệt ô mẫu nhé.",
          requirements: ["In đúng 3 dòng như mẫu.", "Số 8 và 2026 viết trực tiếp, không đặt trong ngoặc kép."],
          starter: `#include <iostream>
using namespace std;

int main() {
    cout << "Ten: Bit";
    cout << "Lop: " << 8;
    cout << "Nam: " << 2026;
    return 0;
}`,
          expected: "Ten: Bit\nLop: 8\nNam: 2026",
          why: "Đòn cuối trúng đích! BOSS gục rồi!",
          hints: ["Cần 2 lần xuống dòng: sau dòng Ten và sau dòng Lop."]
        },
        {
          id: "adv-1", type: "code", icon: "🥇", advanced: true,
          title: "Nâng cao 1: Một cout, ba dòng",
          prompt: "Thử thách cho cao thủ: in lại hồ sơ của mình chỉ bằng <strong>1 lệnh cout</strong> nhé!",
          requirements: ["Chỉ dùng 1 lệnh cout.", "Màn hình giống hệt mẫu."],
          starter: `#include <iostream>
using namespace std;

int main() {
    // Chi dung 1 lenh cout
    return 0;
}`,
          expected: "Ten: Bit\nLop: 8\nNam: 2026",
          rules: [{
            test: code => (window.CPP.stripComments(code).match(/\bcout\b/g) || []).length === 1,
            msg: "Output đúng, nhưng phải dùng đúng 1 lệnh cout."
          }],
          why: "Xuất sắc! Một cout, nhiều << và \\n hoặc endl.",
          hints: ["Một cout có thể nối nhiều phần, kể cả endl ở giữa.", "cout << \"Ten: Bit\" << endl << \"Lop: \" << 8 << ... ;"]
        },
        {
          id: "adv-2", type: "code", icon: "🥇", advanced: true,
          title: "Nâng cao 2: Hộp quà C++",
          prompt: "Mình muốn tặng cả lớp một hộp quà. Bạn vẽ hộp quà giống hệt mẫu bằng cout nhé!",
          requirements: ["In đúng 5 dòng, giống hệt mẫu — đếm kỹ cả dấu cách."],
          starter: `#include <iostream>
using namespace std;

int main() {
    // Ve hop qua o day
    return 0;
}`,
          expected: "+---+---+\n|   |   |\n+---+---+\n|  C++  |\n+-------+",
          why: "Hộp quà hoàn hảo! Huy hiệu vàng thuộc về bạn.",
          hints: ["Mỗi dòng một cout ... << endl;", "Đếm kỹ dấu - và dấu cách: mỗi dòng dài đúng 9 ký tự."]
        }
      ]
    }
  ]
};
