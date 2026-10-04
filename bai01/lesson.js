/* Bài 1 — Nhập môn C++: cấu trúc chương trình và xuất dữ liệu
   Câu chuyện: Bit mất giọng — con dạy robot Bit "nói" bằng cout.
   Mã mở khoá (đưa lên slide, KHÔNG đưa cho học sinh trước): Điểm dừng 1 = BITNOI · Điểm dừng 2 = SANBO
*/
"use strict";

const W3 = slug => `https://www.w3schools.com/cpp/cpp_${slug}.asp`;
const readMore = (title, sub, links) => `
  <div class="read-more-box">
    <div><strong>${title}</strong><span>${sub}</span></div>
    <div class="resource-links">${links.map(([slug, label]) => `<a href="${W3(slug)}" target="_blank" rel="noopener">${label} ↗</a>`).join("")}</div>
  </div>`;
const demo = (code, label) => `
  <div class="code-demo"><div class="code-demo-header"><span><span class="window-dots">● ● ●</span> &nbsp; ${label}</span><span>main.cpp</span></div>
  <pre><code>${code.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</code></pre></div>`;
const noSemicolon = (code, pattern) => !new RegExp(pattern).test(window.CPP.stripComments(code));

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
      bit: "Chào con! Mình là <strong>Bit</strong>. Mình muốn chào cả lớp mà chưa biết nói. Con dạy mình viết chương trình C++ đầu tiên nhé!",
      objectives: ["Biết chương trình bắt đầu chạy ở đâu", "Hiểu cout dùng để xuất ra màn hình", "Sửa và chạy một chương trình ngắn"],
      lesson: `
        <div class="learning-path"><span>👀 XEM</span><span>→</span><span>💡 HIỂU</span><span>→</span><span>✏️ SỬA</span><span>→</span><span>▶ CHẠY</span><span>→</span><span>🔎 SO SÁNH</span></div>
        <div class="note-card blue short-note">
          <h3>💡 C++ là gì?</h3>
          <p>C++ là một <strong>ngôn ngữ lập trình</strong>. Con viết chỉ dẫn bằng code; máy tính làm theo từng dòng, từ trên xuống dưới.</p>
        </div>
        ${demo(`#include <iostream>
using namespace std;

int main() {
    cout << "Xin chao, C++!";
    return 0;
}`, "Chương trình đầu tiên")}
        <div class="meaning-panel">
          <div class="meaning-title">🔍 GIẢI MÃ TỪNG LỆNH</div>
          <div class="command-row"><code>#include &lt;iostream&gt;</code>
            <div><strong>Để làm gì?</strong> Nạp thư viện nhập/xuất để dùng được <code>cout</code>.<small>Hiểu đơn giản: "chuẩn bị công cụ để đưa chữ ra màn hình".</small></div></div>
          <div class="command-row"><code>using namespace std;</code>
            <div><strong>Để làm gì?</strong> Cho phép viết <code>cout</code> thay vì <code>std::cout</code>.<small>Bây giờ con xem đây là một dòng thiết lập quen thuộc.</small></div></div>
          <div class="command-row"><code>int main() { ... }</code>
            <div><strong>Để làm gì?</strong> Hàm chính: máy bắt đầu chạy từ đây, làm các lệnh nằm trong <code>{ }</code>.<small>Giống khối "khi bấm lá cờ xanh" trong Scratch.</small></div></div>
          <div class="command-row focus"><code>cout &lt;&lt; "Xin chao";</code>
            <div><strong>Để làm gì?</strong> Đưa nội dung ra màn hình. Chữ đặt trong dấu ngoặc kép.<small>Giống khối "nói ..." trong Scratch. Đọc là: "xuất dòng chữ Xin chao ra màn hình".</small></div></div>
          <div class="command-row"><code>return 0;</code>
            <div><strong>Để làm gì?</strong> Kết thúc hàm <code>main()</code>.<small>Con chỉ cần nhớ: nó nằm ngay trước dấu <code>}</code> cuối cùng.</small></div></div>
        </div>
        <div class="think-box"><strong>🧠 Đoán trước khi chạy:</strong> nếu đổi <code>"Xin chao, C++!"</code> thành <code>"Chao lop 8!"</code>, phần nào của kết quả sẽ thay đổi?</div>
        ${readMore("📚 Muốn hiểu thêm?", "Đọc ngắn rồi quay lại làm nhiệm vụ.", [["intro", "C++ là gì?"], ["getstarted", "Bắt đầu với C++"], ["syntax", "Cú pháp"]])}
      `,
      challenges: [
        {
          id: "s1-order", type: "sequence", icon: "🧩", mono: true,
          title: "Nhiệm vụ 1: Lắp chương trình",
          prompt: "Bấm lần lượt các dòng để lắp thành chương trình đúng thứ tự.",
          shuffle: ["    return 0;", "int main() {", "#include <iostream>", "}", "    cout << \"Xin chao!\";", "using namespace std;"],
          answer: ["#include <iostream>", "using namespace std;", "int main() {", "    cout << \"Xin chao!\";", "    return 0;", "}"],
          hintWrong: "Nhớ: chuẩn bị công cụ trước → mở main → các lệnh → return 0; → đóng }.",
          why: "Đúng! Thư viện ở trên cùng, các lệnh nằm trong main(), return 0; đứng cuối.",
          hints: ["Hai dòng thiết lập (#include, using) luôn đứng đầu.", "Thứ tự: #include → using → int main() { → cout → return 0; → }"]
        },
        {
          id: "s1-run", type: "code", icon: "🚀",
          title: "Nhiệm vụ 2: Dạy Bit câu chào đầu tiên",
          prompt: "Chỉ thay phần chữ được in ra màn hình.",
          requirements: ["Chương trình phải chạy được.", "Kết quả đúng câu: Chao lop 8!"],
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
      bit: "Mình nói được rồi, nhưng chữ cứ <strong>dính thành một hàng</strong>! Con chỉ mình cách in số và cách xuống dòng với.",
      objectives: ["Dùng cout và <<", "Phân biệt chữ với số khi xuất", "Dùng endl hoặc \\n để xuống dòng"],
      lesson: `
        <div class="meaning-panel">
          <div class="meaning-title">📣 ĐỌC MỘT LỆNH <code>cout</code></div>
          <div class="command-row focus"><code>cout &lt;&lt; "Xin chao";</code>
            <div><strong>cout</strong> = màn hình. <strong>&lt;&lt;</strong> = "đưa vào". Chữ phải nằm trong <code>" "</code>.</div></div>
          <div class="command-row"><code>cout &lt;&lt; 14;</code>
            <div>Số in trực tiếp, không cần ngoặc kép.<small>Màn hình hiện <strong>14</strong>.</small></div></div>
          <div class="command-row"><code>cout &lt;&lt; "Tuoi: " &lt;&lt; 14;</code>
            <div>Nối nhiều phần bằng nhiều dấu <code>&lt;&lt;</code>.<small>Màn hình hiện <strong>Tuoi: 14</strong>.</small></div></div>
        </div>
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
        ${demo(`#include <iostream>
using namespace std;

int main() {
    cout << "Ten cua minh la:" << endl;
    cout << "Minh" << endl;
    cout << "Tuoi: " << 14;
    return 0;
}`, "Cùng ví dụ, thêm endl")}
        <div class="line-by-line">
          <div><span>1</span><code>cout &lt;&lt; "Ten cua minh la:" &lt;&lt; endl;</code><p>In chữ, rồi xuống dòng.</p></div>
          <div><span>2</span><code>cout &lt;&lt; "Minh" &lt;&lt; endl;</code><p>In <strong>Minh</strong>, rồi xuống dòng.</p></div>
          <div><span>3</span><code>cout &lt;&lt; "Tuoi: " &lt;&lt; 14;</code><p>In chữ <strong>Tuoi: </strong> và số <strong>14</strong> trên cùng dòng.</p></div>
        </div>
        <div class="tip-strip">✨ <strong>Nhớ:</strong> <code>endl</code> và <code>\\n</code> đều tạo dòng mới. <code>\\n</code> phải nằm <em>trong</em> ngoặc kép: <code>"Xin chao\\n"</code>.</div>
        ${readMore("📚 Đọc thêm đúng nội dung này", "Có nút “Try it Yourself” để con tự thử.", [["output", "Xuất chữ"], ["output_numbers", "Xuất số"], ["new_lines", "Xuống dòng"]])}
      `,
      challenges: [
        {
          id: "s2-predict", type: "choice", icon: "🔮", bet: true, mono: true,
          title: "Nhiệm vụ 1: Nhìn code, đoán kết quả",
          prompt: "Đoán trước, <strong>đặt cược</strong> nếu con tự tin, rồi mới kiểm tra.",
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
          prompt: "Sửa code để kết quả giống hệt mẫu.",
          requirements: ["Dòng 1: Ten cua minh la:", "Dòng 2: Minh", "Dòng 3: Tuoi: 14", "Đúng 3 dòng."],
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
          why: "Đúng 3 dòng! Con đã điều khiển được chỗ xuống dòng.",
          hints: ["3 dòng thì cần 2 lần xuống dòng: sau dòng 1 và sau dòng 2.", "Thêm << endl vào cuối lệnh cout thứ nhất và thứ hai, trước dấu ;."]
        }
      ]
    },

    /* ================= ĐIỂM DỪNG 1 ================= */
    {
      kind: "gate", id: "gate-1", nav: "Điểm dừng 1",
      kicker: "ĐIỂM DỪNG 1 · SAU CHẶNG 1–2",
      codeHash: "4F25E32D",
      todo: [
        "Thầy hỏi: <strong>con hiểu gì</strong> về khung chương trình và <code>cout</code>? Con nói trước, thầy chốt sau.",
        "Chép phần <strong>Ghi bài 1</strong> trên slide vào vở.",
        "Trả lời <strong>2 câu ClassPoint</strong>.",
        "<strong>Luyện tập cặp</strong> trên <a href=\"https://www.programiz.com/cpp-programming/online-compiler/\" target=\"_blank\" rel=\"noopener\">Programiz ↗</a>: hai bạn một máy, làm theo đề trên slide, chụp ảnh output nộp lên ClassPoint.",
        "Thầy hiện <strong>mã mở khoá</strong> → con nhập vào ô bên dưới để đi tiếp."
      ],
      challenges: [
        {
          id: "g1-bonus", type: "code", icon: "🎁", bonus: true,
          title: "Nhiệm vụ phụ: Bảng tên của Bit",
          prompt: "In ra đúng khung tên này.",
          requirements: ["Đúng 3 dòng, giống hệt mẫu (kể cả dấu cách)."],
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
      bit: "Ối, có <strong>bọ</strong> chui vào code của mình! Con làm thám tử: đọc thông báo lỗi, tìm đúng chỗ và sửa giúp mình.",
      objectives: ["Hiểu câu lệnh và dấu ;", "C++ phân biệt chữ hoa/thường", "Dùng comment đúng mục đích"],
      lesson: `
        <div class="meaning-panel">
          <div class="meaning-title">🕵️ 4 DẤU HIỆU CẦN NHÌN KHI SĂN BỌ</div>
          <div class="command-row"><code>câu lệnh;</code>
            <div>Mỗi <strong>câu lệnh</strong> (statement) kết thúc bằng dấu <code>;</code>.<small>Quên <code>;</code> → máy báo lỗi cú pháp, thường chỉ vào dòng <em>ngay sau</em> chỗ thiếu.</small></div></div>
          <div class="command-row"><code>cout ≠ Cout</code>
            <div>C++ <strong>phân biệt chữ hoa và chữ thường</strong>.<small><code>cout</code> và <code>Cout</code> là hai tên khác nhau.</small></div></div>
          <div class="command-row"><code>{ ... }</code>
            <div>Ngoặc nhọn bao một khối code. Lệnh của <code>main()</code> phải nằm bên trong.</div></div>
          <div class="command-row focus"><code>// ...   /* ... */</code>
            <div><strong>Comment</strong> là ghi chú cho người đọc, máy bỏ qua.<small><code>//</code> cho một dòng; <code>/* ... */</code> cho nhiều dòng.</small></div></div>
        </div>
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
          prompt: "Chọn phát biểu đúng.",
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
          prompt: "Mỗi lỗi sửa đúng là một con bọ nổ 💥. Sửa hết để chương trình chạy đúng.",
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
          why: "Hết bọ! Con đã sửa đủ 3 lỗi: hai dấu ; và chữ hoa/thường.",
          hints: ["Có 3 lỗi thuộc 2 quy tắc vừa học: dấu ; và chữ hoa/thường.", "Xem dòng using namespace std, dòng Cout, và dòng cout << \"C++\"."]
        }
      ]
    },

    /* ================= CHẶNG 4 ================= */
    {
      kind: "stage", id: "stage-4", number: 4, nav: "Tự xây",
      kicker: "CHẶNG 4 · TỰ XÂY CHƯƠNG TRÌNH",
      title: "Nhìn kết quả trước, rồi mới viết code",
      bit: "Giờ con tự xây chương trình. Bí quyết của mình: <strong>nhìn kết quả cần có trước</strong>, rồi mới viết từng lệnh cout.",
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
          <h3>💬 Comment giúp con nhớ "vì sao"</h3>
          <p><code class="inline-code">// In thong tin hoc sinh</code> không hiện ra màn hình, nhưng giúp con và bạn đọc code nhanh hơn.</p>
        </div>
        ${readMore("📚 Ôn nhanh trước BOSS", "Mở mục con còn yếu, thử ví dụ rồi quay lại.", [["output", "cout"], ["new_lines", "endl / \\n"], ["comments", "Comment"]])}
      `,
      challenges: [
        {
          id: "s4-onecout", type: "code", icon: "🔗",
          title: "Nhiệm vụ 1: Gộp 3 cout thành 1",
          prompt: "Kết quả giữ nguyên, nhưng chỉ dùng <strong>1</strong> lệnh cout.",
          requirements: ["Chỉ có 1 lệnh cout.", "Kết quả: Nam nay toi 14 tuoi"],
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
          prompt: "Thêm cả hai kiểu comment, output vẫn y nguyên.",
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
            { test: code => /\/\/.+/.test(code.replace(/"(?:[^"\\]|\\.)*"/g, "\"\"")), msg: "Output đúng, nhưng con chưa có comment //." },
            { test: code => /\/\*[\s\S]*?\*\//.test(code), msg: "Output đúng, nhưng con chưa có comment /* ... */." }
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
      codeHash: "D7039DAF",
      todo: [
        "Thầy hỏi: <strong>khi chương trình báo lỗi, con làm gì?</strong> Con nói trước, thầy chốt sau.",
        "Chép phần <strong>Ghi bài 2</strong> trên slide vào vở.",
        "Trả lời <strong>2 câu ClassPoint</strong>.",
        "<strong>Luyện tập cặp</strong> trên <a href=\"https://www.programiz.com/cpp-programming/online-compiler/\" target=\"_blank\" rel=\"noopener\">Programiz ↗</a>: sửa lỗi theo đề trên slide, chụp ảnh output nộp lên ClassPoint.",
        "Thầy hiện <strong>mã mở BOSS</strong> → con nhập vào ô bên dưới."
      ],
      challenges: [
        {
          id: "g2-bonus", type: "code", icon: "🎁", bonus: true,
          title: "Nhiệm vụ phụ: Vẽ mặt Bit",
          prompt: "In ra đúng hình mặt Bit này.",
          requirements: ["Đúng 4 dòng, giống hệt mẫu (kể cả dấu cách)."],
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
      bit: "Bọ Chúa Cú Pháp chặn đường! Mỗi nhiệm vụ đúng là một đòn đánh. Không có kiến thức mới — con dùng đúng những gì vừa học. <strong>Tự làm một mình nhé.</strong>",
      lesson: readMore("🚑 Trạm cứu trợ", "Quên thì được xem lại trước khi đánh tiếp.", [["syntax", "Cú pháp"], ["output", "cout"], ["new_lines", "Xuống dòng"], ["comments", "Comment"]]),
      challenges: [
        {
          id: "boss-1", type: "choice", icon: "⚔️", bet: true, mono: true,
          title: "Đòn 1: Đoán output",
          prompt: "Đoạn code này in ra gì? Có thể đặt cược.",
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
          prompt: "Tìm và sửa hết bọ để chương trình chạy đúng.",
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
          prompt: "Sửa code để output giống hệt mẫu.",
          requirements: ["Đúng 3 dòng như mẫu.", "Số 8 và 2026 in dạng số (không cần ngoặc kép)."],
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
          prompt: "In lại hồ sơ của Bit bằng <strong>đúng 1 lệnh cout</strong>.",
          requirements: ["Chỉ 1 lệnh cout.", "Output giống hệt mẫu."],
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
          prompt: "Vẽ đúng hộp quà này.",
          requirements: ["Đúng 5 dòng, giống hệt mẫu."],
          starter: `#include <iostream>
using namespace std;

int main() {
    // Ve hop qua o day
    return 0;
}`,
          expected: "+---+---+\n|   |   |\n+---+---+\n|  C++  |\n+-------+",
          why: "Hộp quà hoàn hảo! Huy hiệu vàng thuộc về con.",
          hints: ["Mỗi dòng một cout ... << endl;", "Đếm kỹ dấu - và dấu cách: mỗi dòng dài đúng 9 ký tự."]
        }
      ]
    }
  ]
};
