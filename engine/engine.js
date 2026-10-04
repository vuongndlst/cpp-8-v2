/* C++ Journey 8 — V2 engine (dùng chung cho Bài 1–5)
   - Nội dung từng bài nằm trong window.LESSON (bai0N/lesson.js)
   - Học sinh: localStorage, mỗi bài một khoá riêng
   - Chạy C++: JSCPP (lưu sẵn trong engine/, không phụ thuộc CDN)
   - Lớp trò chơi: bản đồ, ổ khoá theo mã, đặt cược, săn bọ, combo, BOSS có thanh máu, huy hiệu
*/
"use strict";

const L = window.LESSON;
const CFG = { schoolName: "", teacherName: "", canvasSubmissionUrl: "", ...(window.CPP_JOURNEY_CONFIG || {}) };
const PREFIX = "cpp8v2";
const CLASSES = ["8A1", "8A2", "8A3", "8A4", "8A5", "8A6", "8A7", "8A8", "8A9", "8A10"];
const XP_PASS = 10, XP_FIRST_TRY = 5;

const STEPS = L.steps;
// Nhiệm vụ bắt buộc: không tính nhiệm vụ nâng cao (BOSS) và nhiệm vụ phụ (ở điểm dừng).
const REQUIRED = STEPS.flatMap(s => (s.challenges || []).filter(c => !c.advanced && !c.bonus).map(c => c.id));

let state = null;

/* ---------- tiện ích ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function esc(v = "") {
  return String(v).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function hashText(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(16).toUpperCase().padStart(8, "0");
}

// Mã mở khoá: so sánh băm, không phân biệt hoa/thường, bỏ khoảng trắng.
function codeHash(code) { return hashText("cpp8v2|" + String(code).toUpperCase().replace(/\s+/g, "")); }

function studentKey(student) { return hashText(`${student.name}|${student.className}`.toLowerCase()); }

function safeGet(key) { try { return localStorage.getItem(key); } catch { return null; } }
function safeSet(key, val) { try { localStorage.setItem(key, val); } catch { /* bỏ qua */ } }

function normalizeOutput(v = "") {
  return String(v).replace(/\r\n/g, "\n").replace(/[ \t]+\n/g, "\n").replace(/[ \t]+$/g, "").replace(/\n+$/g, "").replace(/^\n+/, "");
}

function stripComments(code) {
  return String(code).replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

window.CPP = { stripComments, normalizeOutput }; // lesson.js dùng trong các quy tắc kiểm tra

/* ---------- lưu trạng thái ---------- */
function freshState(student) {
  return { student, active: STEPS[0].id, passed: {}, attempts: {}, drafts: {}, inputs: {}, gates: {},
    xp: 0, combo: 0, bets: {}, startedAt: new Date().toISOString(), completedAt: null };
}

function storageKey() { return `${PREFIX}:${L.id}:${studentKey(state.student)}`; }

function save() {
  if (!state) return;
  safeSet(storageKey(), JSON.stringify(state));
  safeSet(`${PREFIX}:lastStudent`, JSON.stringify(state.student));
}

function load(student) {
  state = freshState(student);
  const raw = safeGet(storageKey());
  if (raw) {
    try { state = { ...state, ...JSON.parse(raw), student }; } catch { /* dữ liệu hỏng: làm lại */ }
  }
  save();
}

/* ---------- tiến độ ---------- */
function stepDone(step) {
  if (step.kind === "gate") return Boolean(state.gates[step.id]);
  return step.challenges.filter(c => !c.advanced).every(c => state.passed[c.id]);
}

function stepUnlocked(index) {
  return STEPS.slice(0, index).every(stepDone);
}

function bossStep() { return STEPS.find(s => s.kind === "boss"); }
function allRequiredDone() { return REQUIRED.every(id => state.passed[id]) && STEPS.every(stepDone); }
function isGold() {
  const boss = bossStep();
  return allRequiredDone() && boss.challenges.filter(c => c.advanced).every(c => state.passed[c.id]);
}

/* ---------- chạy C++ ---------- */
function runCpp(code, input = "") {
  if (!window.JSCPP) return { ok: false, output: "", error: "Không tải được trình chạy C++. Con tải lại trang (F5)." };
  let output = "";
  try {
    const exitCode = window.JSCPP.run(code, input, { stdio: { write: s => { output += s; } }, maxTimeout: 2000 });
    return { ok: true, output, exitCode };
  } catch (e) {
    return { ok: false, output, error: friendlyError(String(e && e.message ? e.message : e), code) };
  }
}

// Dịch thông báo lỗi của JSCPP sang lời dễ hiểu cho học sinh lớp 8.
function friendlyError(msg, code) {
  const lineMatch = msg.match(/line (\d+)/) || msg.match(/^(\d+):(\d+)/);
  const line = lineMatch ? Number(lineMatch[1]) : null;
  const lineText = line ? ` ở khoảng dòng ${line}` : "";
  if (/Parsing Failure/i.test(msg)) {
    return `Lỗi cú pháp${lineText}.\n👉 Thường gặp: thiếu dấu ; ở cuối dòng phía trên, thiếu dấu " hoặc thiếu ngoặc { }.` +
      (line ? `\n👉 Xem dòng ${line} và dòng ngay trước nó.` : "");
  }
  const notExist = msg.match(/variable (\w+) does not exist/);
  if (notExist) {
    const name = notExist[1];
    const lower = name.toLowerCase();
    const tip = ["cout", "cin", "endl"].includes(lower) && name !== lower
      ? `C++ phân biệt chữ hoa/thường: phải viết ${lower}, không phải ${name}.`
      : `Kiểm tra lại cách viết tên "${name}" (chữ hoa/thường) hoặc con đã khai báo nó chưa.`;
    return `Máy không biết tên "${name}"${lineText}.\n👉 ${tip}`;
  }
  if (/Time limit exceeded/i.test(msg)) {
    return "Chương trình chạy mãi không dừng (quá 2 giây).\n👉 Kiểm tra điều kiện và bước tăng/giảm của vòng lặp.";
  }
  if (/must return a value/i.test(msg)) {
    return "Hàm main() chưa có dòng return 0; ở cuối.\n👉 Thêm return 0; trước dấu } cuối cùng.";
  }
  if (/cannot find|not found|include/i.test(msg) && !/#include\s*<iostream>/.test(code)) {
    return "Thiếu dòng #include <iostream> ở đầu chương trình.";
  }
  return `Chương trình bị lỗi${lineText}.\nThông báo gốc: ${msg.split("\n")[0].slice(0, 160)}`;
}

/* ---------- âm thanh & pháo giấy ---------- */
let audioCtx = null;
function soundOn() { return safeGet(`${PREFIX}:sound`) !== "off"; }
function beep(kind) {
  if (!soundOn()) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const notes = { good: [660, 880], bad: [220, 180], win: [523, 659, 784, 1047], unlock: [440, 660, 880] }[kind] || [440];
    notes.forEach((f, i) => {
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = kind === "bad" ? "square" : "triangle";
      o.frequency.value = f;
      const t = audioCtx.currentTime + i * 0.09;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(t); o.stop(t + 0.18);
    });
  } catch { /* trình duyệt chặn âm thanh: bỏ qua */ }
}

function confetti() {
  const c = document.createElement("canvas");
  c.className = "confetti-layer";
  c.width = innerWidth; c.height = innerHeight;
  document.body.appendChild(c);
  const ctx = c.getContext("2d");
  const colors = ["#2076d2", "#ef8a17", "#7451c7", "#168f67", "#f4c542", "#d94c55"];
  const parts = Array.from({ length: 160 }, () => ({
    x: Math.random() * c.width, y: -20 - Math.random() * c.height * 0.5,
    vx: (Math.random() - 0.5) * 4, vy: 2 + Math.random() * 4, r: 4 + Math.random() * 6,
    a: Math.random() * Math.PI, va: (Math.random() - 0.5) * 0.3, col: colors[Math.floor(Math.random() * colors.length)]
  }));
  const t0 = performance.now();
  (function frame(t) {
    ctx.clearRect(0, 0, c.width, c.height);
    parts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.a += p.va;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a);
      ctx.fillStyle = p.col; ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); ctx.restore();
    });
    if (t - t0 < 2600) requestAnimationFrame(frame); else c.remove();
  })(t0);
}

/* ---------- robot Bit ---------- */
function bitSvg(mood = "happy") {
  const mouth = mood === "sad" ? '<path d="M24 44 q8 -6 16 0" stroke="#17304f" stroke-width="3" fill="none" stroke-linecap="round"/>'
    : mood === "wow" ? '<circle cx="32" cy="43" r="4" fill="#17304f"/>'
    : '<path d="M24 41 q8 7 16 0" stroke="#17304f" stroke-width="3" fill="none" stroke-linecap="round"/>';
  return `<svg class="bit-svg" viewBox="0 0 64 72" aria-hidden="true">
    <line x1="32" y1="4" x2="32" y2="14" stroke="#17304f" stroke-width="3"/>
    <circle cx="32" cy="5" r="4" fill="#ef8a17"/>
    <rect x="8" y="14" width="48" height="40" rx="12" fill="#eaf4ff" stroke="#17304f" stroke-width="3"/>
    <circle cx="23" cy="31" r="5" fill="#17304f"/><circle cx="41" cy="31" r="5" fill="#17304f"/>
    <circle cx="25" cy="29" r="1.6" fill="#fff"/><circle cx="43" cy="29" r="1.6" fill="#fff"/>
    ${mouth}
    <rect x="18" y="56" width="28" height="12" rx="5" fill="#2076d2" stroke="#17304f" stroke-width="3"/>
  </svg>`;
}

function bitSays(text, mood) {
  return `<div class="bit-row">${bitSvg(mood)}<div class="bit-bubble">${text}</div></div>`;
}

/* ---------- khung trang ---------- */
function shell() {
  document.title = `Bài ${L.number}: ${L.title} | C++ Journey 8`;
  document.body.innerHTML = `
  <header class="topbar">
    <a class="brand" href="../index.html" title="Về trang các bài">
      <div class="brand-badge">C++</div>
      <div><div class="eyebrow">C++ JOURNEY 8 · BÀI ${L.number}</div><h1>${esc(L.story)}</h1></div>
    </a>
    <div class="top-actions">
      <span class="xp-pill" id="xpPill" title="Điểm kinh nghiệm">⚡ 0 XP</span>
      <button id="errorsBtn" class="top-btn" type="button" title="Bảng lỗi thường gặp">🧰 Bảng lỗi</button>
      <button id="soundBtn" class="top-btn" type="button" title="Bật/tắt âm thanh"></button>
      <button id="studentBtn" class="student-chip" type="button"><span>👤</span><span id="studentText">Chưa có tên</span></button>
      <button id="newStudentBtn" class="new-student-button" type="button">🧹 Học sinh mới</button>
    </div>
  </header>
  <nav class="journey-map" id="journeyMap" aria-label="Bản đồ hành trình"></nav>
  <main class="main-wrap"><div id="stepContainer"></div></main>
  <footer class="site-footer">
    <p>C++ Journey 8 · Bài ${L.number} · Học bằng cách dự đoán, sửa code, chạy thử và vượt BOSS.</p>
    <button id="resetBtn" class="text-button danger-link" type="button">Xoá toàn bộ dữ liệu & làm từ đầu</button>
  </footer>
  <dialog id="identityDialog" class="modal">
    <form id="identityForm" method="dialog" class="modal-card">
      <div class="sticker">START</div>
      <p class="eyebrow">BÀI ${L.number} · ${esc(L.title)}</p>
      <h2>Con là ai? 👋</h2>
      <p>Nhập đúng họ tên và lớp. Nếu con đã học trên máy này, web sẽ mở lại tiến độ của con.</p>
      <label class="field"><span>Họ và tên</span>
        <input id="nameInput" type="text" autocomplete="name" minlength="2" maxlength="60" placeholder="Ví dụ: Nguyễn Minh Anh" required /></label>
      <label class="field"><span>Lớp</span>
        <select id="classInput" required><option value="" selected disabled>Chọn lớp</option>
        ${CLASSES.map(c => `<option>${c}</option>`).join("")}</select></label>
      <div class="privacy-note">Dùng chung máy? Học xong, bấm <strong>Học sinh mới</strong> để bạn sau không thấy bài của con.</div>
      <button class="primary-button wide" type="submit">Vào hành trình →</button>
    </form>
  </dialog>
  <dialog id="errorsDialog" class="modal errors-modal">
    <div class="modal-card">
      <button class="icon-button close-button" type="button" data-close>×</button>
      <p class="eyebrow">QUY TẮC "3 TRƯỚC THẦY"</p>
      <h2>🧰 Bảng lỗi thường gặp</h2>
      <p class="muted">① Đọc thông báo lỗi → ② tìm trong bảng này → ③ hỏi bạn bên cạnh. Kẹt quá 3 phút thì giơ tay.</p>
      <div class="table-wrap"><table class="error-table">
        <thead><tr><th>Thông báo / dấu hiệu</th><th>Nguyên nhân</th><th>Cách sửa</th></tr></thead>
        <tbody>${L.errorTable.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</tbody>
      </table></div>
    </div>
  </dialog>
  <dialog id="certDialog" class="modal certificate-modal">
    <div class="modal-card certificate-card">
      <button class="icon-button close-button" type="button" data-close>×</button>
      <p class="eyebrow">BOSS ĐÃ BỊ HẠ GỤC</p>
      <h2>Chứng chỉ Bài ${L.number} 🎓</h2>
      <p>Lưu ảnh PNG rồi nộp lên Canvas cùng <strong>link Programiz bài cá nhân</strong> và ảnh chụp output.</p>
      <canvas id="certCanvas" width="1600" height="1131" aria-label="Chứng chỉ"></canvas>
      <div class="certificate-actions">
        <button id="savePng" class="primary-button" type="button">⬇ Lưu PNG</button>
        <button id="printPdf" class="secondary-button" type="button">🖨 In / Lưu PDF</button>
        <a id="canvasLink" class="secondary-button hidden" href="#" target="_blank" rel="noopener">↗ Mở Canvas để nộp</a>
      </div>
    </div>
  </dialog>`;
}

/* ---------- bản đồ ---------- */
function renderMap() {
  const map = $("#journeyMap");
  map.innerHTML = `<div class="map-track">${STEPS.map((step, i) => {
    const unlocked = stepUnlocked(i), done = stepDone(step), active = state.active === step.id;
    const icon = step.kind === "gate" ? (done ? "🔓" : "⏸") : step.kind === "boss" ? "👾" : done ? "✓" : step.number;
    const cls = ["map-node", step.kind, done ? "done" : "", active ? "active" : "", unlocked ? "" : "locked"].join(" ");
    return `${i ? `<span class="map-link ${unlocked ? "lit" : ""}"></span>` : ""}
      <button class="${cls}" type="button" data-step="${step.id}" ${unlocked ? "" : "disabled"}>
        <span class="node-dot">${unlocked ? icon : "🔒"}</span>
        <span class="node-label">${esc(step.nav)}</span>
      </button>`;
  }).join("")}</div>`;
  $$(".map-node", map).forEach(btn => btn.addEventListener("click", () => go(btn.dataset.step)));
  $(".map-node.active", map)?.scrollIntoView({ block: "nearest", inline: "center" });
}

function go(stepId) {
  state.active = stepId;
  save();
  renderAll();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateTop() {
  $("#xpPill").textContent = `⚡ ${state.xp} XP` + (state.combo >= 2 ? ` · 🔥x${state.combo}` : "");
  $("#studentText").textContent = `${state.student.name} · ${state.student.className}`;
  $("#soundBtn").textContent = soundOn() ? "🔊" : "🔇";
}

/* ---------- trang từng bước ---------- */
function renderAll() {
  const idx = STEPS.findIndex(s => s.id === state.active);
  if (idx < 0 || !stepUnlocked(idx)) {
    const last = [...STEPS].reverse().find(s => stepUnlocked(STEPS.indexOf(s)));
    state.active = last.id;
  }
  if (allRequiredDone() && !state.completedAt) {
    state.completedAt = new Date().toISOString();
    saveBadge(); save();
  }
  updateTop();
  renderMap();
  const step = STEPS.find(s => s.id === state.active);
  if (step.kind === "gate") renderGate(step); else renderStage(step);
}

function renderStage(step) {
  const isBoss = step.kind === "boss";
  const idx = STEPS.indexOf(step);
  const next = STEPS[idx + 1];
  const required = step.challenges.filter(c => !c.advanced);
  const advanced = step.challenges.filter(c => c.advanced);
  $("#stepContainer").innerHTML = `
  <article class="stage-page ${isBoss ? "boss-stage" : ""}">
    <header class="stage-hero">
      <div class="stage-kicker">${esc(step.kicker)}</div>
      <h2>${esc(step.title)}</h2>
      ${step.bit ? bitSays(step.bit) : ""}
      ${step.objectives ? `<div class="stage-objectives">${step.objectives.map(o => `<span>✓ ${esc(o)}</span>`).join("")}</div>` : ""}
      ${isBoss ? bossBar(step) : ""}
    </header>
    <div class="lesson-body">
      ${step.lesson || ""}
      <section class="challenge-section">
        <h3 class="section-heading"><span class="doodle">${isBoss ? "👾" : "⚡"}</span>${isBoss ? "Hạ BOSS" : "Nhiệm vụ của chặng"}</h3>
        <div class="challenge-list">${required.map(renderChallenge).join("")}</div>
      </section>
      ${advanced.length ? `<section class="challenge-section advanced-section">
        <h3 class="section-heading"><span class="doodle">🥇</span>Nâng cao — xong sớm thì làm, đạt cả ${advanced.length} để có huy hiệu vàng</h3>
        <div class="challenge-list">${advanced.map(renderChallenge).join("")}</div>
      </section>` : ""}
      <div class="stage-footer">
        <div class="stage-complete-note" id="stageNote"></div>
        ${next ? `<button id="nextBtn" class="primary-button" type="button">${next.kind === "gate" ? "Đến điểm dừng ⏸" : next.kind === "boss" ? "Vào BOSS 👾" : `Sang Chặng ${next.number} →`}</button>`
               : `<button id="certBtn" class="certificate-button" type="button">🏆 Mở chứng chỉ</button>`}
      </div>
    </div>
  </article>`;
  step.challenges.forEach(bindChallenge);
  $("#nextBtn")?.addEventListener("click", () => { if (stepDone(step)) go(next.id); });
  $("#certBtn")?.addEventListener("click", openCertificate);
  refreshFooter(step);
}

function bossBar(step) {
  const req = step.challenges.filter(c => !c.advanced);
  const hit = req.filter(c => state.passed[c.id]).length;
  const hp = Math.round(100 * (1 - hit / req.length));
  return `<div class="boss-hp"><span class="boss-face">👾</span>
    <div class="hp-wrap"><div class="hp-label">${esc(step.bossName || "BOSS")} · máu <strong id="hpText">${hp}%</strong></div>
    <div class="hp-track"><div class="hp-bar" id="hpBar" style="width:${hp}%"></div></div></div></div>`;
}

function refreshFooter(step) {
  const note = $("#stageNote");
  const done = stepDone(step);
  const next = $("#nextBtn");
  if (next) next.disabled = !done;
  if (step.kind === "boss") {
    const req = step.challenges.filter(c => !c.advanced);
    const hit = req.filter(c => state.passed[c.id]).length;
    const hp = Math.round(100 * (1 - hit / req.length));
    if ($("#hpBar")) { $("#hpBar").style.width = `${hp}%`; $("#hpText").textContent = `${hp}%`; }
    const cert = $("#certBtn");
    if (cert) cert.disabled = !allRequiredDone();
    if (note) note.textContent = allRequiredDone()
      ? (isGold() ? "🥇 BOSS bị hạ + đủ nhiệm vụ nâng cao: chứng chỉ có huy hiệu vàng!" : "🏆 BOSS bị hạ! Mở chứng chỉ để lưu và nộp.")
      : `Còn ${req.length - hit} đòn nữa để hạ BOSS.`;
    return;
  }
  if (note) note.textContent = done ? "⭐ Hoàn thành chặng!" : "Hoàn thành các nhiệm vụ để đi tiếp.";
}

function renderGate(step) {
  const done = stepDone(step);
  const idx = STEPS.indexOf(step);
  const next = STEPS[idx + 1];
  $("#stepContainer").innerHTML = `
  <article class="stage-page gate-page">
    <div class="gate-hero ${done ? "open" : ""}">
      <div class="gate-icon">${done ? "🔓" : "⏸"}</div>
      <div>
        <div class="stage-kicker">${esc(step.kicker)}</div>
        <h2>${done ? "Đã mở khoá!" : "DỪNG LẠI — NHÌN LÊN BẢNG"}</h2>
        <p>${done ? "Con đi tiếp được rồi." : "Cả lớp cùng dừng ở đây. Đừng làm tiếp một mình nhé."}</p>
      </div>
    </div>
    <div class="lesson-body">
      <ol class="gate-steps">
        ${step.todo.map((t, i) => `<li><span>${i + 1}</span><div>${t}</div></li>`).join("")}
      </ol>
      <div class="unlock-box">
        ${done
          ? `<button id="gateNext" class="primary-button" type="button">${next.kind === "boss" ? "Vào BOSS 👾" : `Sang Chặng ${next.number} →`}</button>`
          : `<label for="gateCode"><strong>🔑 Mã mở khoá</strong> <span class="muted">(thầy hiện trên slide sau phần luyện tập)</span></label>
             <div class="unlock-row"><input id="gateCode" type="text" autocomplete="off" placeholder="Nhập mã…" maxlength="20" />
             <button id="gateBtn" class="primary-button" type="button">Mở khoá</button></div>
             <div id="gateMsg" class="feedback hidden" role="status"></div>`}
      </div>
      ${step.challenges && step.challenges.length ? `
      <section class="challenge-section bonus-section">
        <h3 class="section-heading"><span class="doodle">🎁</span>Trong lúc chờ: nhiệm vụ phụ (không bắt buộc, +XP)</h3>
        <div class="challenge-list">${step.challenges.map(renderChallenge).join("")}</div>
      </section>` : ""}
    </div>
  </article>`;
  step.challenges?.forEach(bindChallenge);
  $("#gateNext")?.addEventListener("click", () => go(next.id));
  const tryCode = () => {
    const val = $("#gateCode").value;
    if (codeHash(val) === step.codeHash) {
      state.gates[step.id] = true;
      save(); beep("unlock");
      renderAll();
    } else {
      const m = $("#gateMsg");
      m.className = "feedback bad"; m.textContent = "Mã chưa đúng. Chờ thầy hiện mã trên slide nhé.";
      beep("bad");
    }
  };
  $("#gateBtn")?.addEventListener("click", tryCode);
  $("#gateCode")?.addEventListener("keydown", e => { if (e.key === "Enter") tryCode(); });
}

/* ---------- nhiệm vụ ---------- */
function renderChallenge(c) {
  const passed = Boolean(state.passed[c.id]);
  const xpTag = c.bonus ? "+XP" : c.advanced ? "🥇 NÂNG CAO" : "1 SAO";
  let body = "";

  if (c.type === "choice") {
    const opts = c.options.map(o => (typeof o === "string" ? { text: o } : o));
    body = `
      ${c.code ? codeBlock(c.code) : ""}
      ${c.bet && !passed && !state.bets[c.id] ? betRow(c) : ""}
      <div class="choice-grid">${opts.map((o, i) => `
        <label class="choice-option"><input type="radio" name="${c.id}" value="${i}" />
        <span class="${c.mono ? "mono" : ""}">${esc(o.text)}</span></label>`).join("")}</div>
      <button class="primary-button" data-act="choice" type="button">Kiểm tra đáp án</button>`;
  }

  if (c.type === "sequence") {
    const shuffled = c.shuffle || c.answer;
    body = `
      <div class="sequence-pool">${shuffled.map((it, i) => `<button type="button" class="sequence-button ${c.mono ? "mono" : ""}" data-i="${i}">${esc(it)}</button>`).join("")}</div>
      <div class="sequence-answer ${c.mono ? "as-code" : ""}" aria-live="polite"><span class="muted">Bấm lần lượt từng dòng theo thứ tự đúng.</span></div>
      <div class="code-actions">
        <button class="primary-button" data-act="seq-check" type="button">Kiểm tra</button>
        <button class="secondary-button" data-act="seq-reset" type="button">Làm lại</button>
      </div>`;
  }

  if (c.type === "code") {
    const draft = state.drafts[c.id] ?? c.starter;
    const needInput = Boolean(c.tests && c.tests.some(t => t.input));
    const inputVal = state.inputs[c.id] ?? (c.tests && c.tests[0] ? c.tests[0].input || "" : "");
    const expectedBlock = c.expected != null
      ? `<div class="expected-wrap"><div class="expected-label">Kết quả cần đạt</div><pre class="expected-output">${esc(c.expected)}</pre></div>` : "";
    const testsBlock = c.tests && c.tests.length > 1
      ? `<div class="expected-wrap"><div class="expected-label">Các ca kiểm thử</div><table class="test-table">
          <tr><th>Nhập</th><th>Output mong đợi</th></tr>
          ${c.tests.map(t => `<tr><td><code>${esc(t.input || "(không nhập)")}</code></td><td><pre>${esc(t.expected)}</pre></td></tr>`).join("")}
        </table></div>` : (c.tests && c.tests[0] ? `<div class="expected-wrap"><div class="expected-label">Kết quả cần đạt</div><pre class="expected-output">${esc(c.tests[0].expected)}</pre></div>` : "");
    body = `
      <div class="requirement-box">
        <div class="requirement-title">🎯 YÊU CẦU</div>
        <ul>${(c.requirements || []).map(r => `<li>${esc(r)}</li>`).join("")}</ul>
        ${expectedBlock}${testsBlock}
      </div>
      ${c.bugs ? `<div class="bug-board" data-bugs>${c.bugs.map((b, i) => `<span class="bug" data-bug="${i}" title="${esc(b.label)}">🐛 <small>${esc(b.label)}</small></span>`).join("")}</div>` : ""}
      <div class="code-lab">
        <div class="editor-shell">
          <div class="editor-toolbar"><span>main.cpp</span>
            <button type="button" class="small-button" data-act="reset-code">↺ Code ban đầu</button></div>
          <div class="editor-body"><pre class="gutter" aria-hidden="true"></pre>
          <textarea class="code-editor" spellcheck="false" aria-label="Trình soạn thảo C++">${esc(draft)}</textarea></div>
        </div>
        <div class="console-shell">
          ${needInput ? `<div class="console-toolbar"><span>📥 DỮ LIỆU NHẬP</span><small>các số cách nhau dấu cách</small></div>
            <textarea class="stdin-box" rows="2" spellcheck="false" aria-label="Dữ liệu nhập">${esc(inputVal)}</textarea>` : ""}
          <div class="console-toolbar"><span>🖥 KẾT QUẢ</span></div>
          <pre class="console-output">Bấm “▶ Chạy code” để xem kết quả.</pre>
        </div>
      </div>
      <div class="code-actions">
        <button class="secondary-button" data-act="run" type="button">▶ Chạy code</button>
        <button class="primary-button" data-act="check" type="button">⭐ Kiểm tra & nhận sao</button>
      </div>`;
  }

  const hints = (c.hints || (c.hint ? [c.hint] : [])).map((h, i) =>
    `<details class="hint-box"><summary>🛟 Gợi ý ${i + 1}${i ? " (rõ hơn)" : ""}</summary><p>${esc(h)}</p></details>`).join("");

  return `
  <article class="challenge-card ${passed ? "passed" : ""} ${c.advanced ? "advanced" : ""} ${c.bonus ? "bonus" : ""}" data-card="${c.id}">
    <header class="challenge-header">
      <div class="challenge-title-wrap"><div class="challenge-icon">${c.icon || "⭐"}</div>
        <div><h4>${esc(c.title)}</h4><p>${c.prompt}</p></div></div>
      <span class="challenge-badge">${passed ? "⭐ ĐÃ XONG" : xpTag}</span>
    </header>
    <div class="challenge-content">${body}${hints}<div class="feedback hidden" data-feedback role="status"></div></div>
  </article>`;
}

function codeBlock(code) {
  return `<div class="code-demo"><div class="code-demo-header"><span><span class="window-dots">● ● ●</span></span><span>main.cpp</span></div><pre><code>${esc(code)}</code></pre></div>`;
}

function betRow(c) {
  const chips = [0, 5, 10, 20];
  return `<div class="bet-row" data-bet>
    <span>🎲 <strong>Đặt cược</strong> vào dự đoán của con:</span>
    ${chips.map(v => `<button type="button" class="bet-chip ${v === 0 ? "on" : ""}" data-v="${v}" ${v > state.xp ? "disabled" : ""}>${v ? `${v} XP` : "Không cược"}</button>`).join("")}
    <small class="muted">Đúng: được thêm số XP đã cược · Sai: mất số XP đó</small>
  </div>`;
}

function feedback(card, type, msg, mood) {
  const el = $("[data-feedback]", card);
  el.className = `feedback ${type}`;
  el.innerHTML = bitSays(msg, mood || (type === "good" ? "happy" : type === "bad" ? "sad" : "wow"));
}

function bindChallenge(c) {
  const card = $(`[data-card="${c.id}"]`);
  if (!card) return;

  if (c.type === "choice") {
    let wager = 0;
    $$(".bet-chip", card).forEach(chip => chip.addEventListener("click", () => {
      $$(".bet-chip", card).forEach(x => x.classList.remove("on"));
      chip.classList.add("on"); wager = Number(chip.dataset.v);
    }));
    $('[data-act="choice"]', card).addEventListener("click", () => {
      const sel = $(`input[name="${c.id}"]:checked`, card);
      if (!sel) return feedback(card, "info", "Con chọn một đáp án trước nhé.");
      const opts = c.options.map(o => (typeof o === "string" ? { text: o } : o));
      const picked = opts[Number(sel.value)];
      const right = picked.text === c.answer;
      attempt(c.id);
      let betMsg = "";
      if (c.bet && !state.bets[c.id] && !state.passed[c.id]) {
        state.bets[c.id] = true;
        if (wager) { state.xp = Math.max(0, state.xp + (right ? wager : -wager)); betMsg = right ? ` 🎲 Thắng cược +${wager} XP!` : ` 🎲 Thua cược −${wager} XP.`; }
        $("[data-bet]", card)?.remove();
      }
      if (right) pass(c, card, (c.why || "Chính xác!") + betMsg);
      else { miss(card, (picked.why || "Chưa đúng. Đọc lại phần giải thích phía trên rồi thử lại.") + betMsg); updateTop(); }
    });
  }

  if (c.type === "sequence") {
    const items = c.shuffle || c.answer;
    let picked = [];
    const box = $(".sequence-answer", card);
    const draw = () => {
      box.innerHTML = picked.length ? picked.map((i, n) => `<span class="picked ${c.mono ? "mono" : ""}">${c.mono ? "" : `${n + 1}. `}${esc(items[i])}</span>`).join(c.mono ? "" : "<span>→</span>")
        : `<span class="muted">Bấm lần lượt từng dòng theo thứ tự đúng.</span>`;
    };
    $$(".sequence-button", card).forEach(btn => btn.addEventListener("click", () => {
      picked.push(Number(btn.dataset.i)); btn.classList.add("selected"); draw();
    }));
    $('[data-act="seq-reset"]', card).addEventListener("click", () => {
      picked = []; $$(".sequence-button", card).forEach(b => b.classList.remove("selected")); draw();
      $("[data-feedback]", card).classList.add("hidden");
    });
    $('[data-act="seq-check"]', card).addEventListener("click", () => {
      if (picked.length !== c.answer.length) return feedback(card, "info", "Con chọn đủ tất cả các dòng nhé.");
      attempt(c.id);
      const order = picked.map(i => items[i]);
      const wrongAt = order.findIndex((v, i) => v !== c.answer[i]);
      if (wrongAt < 0) pass(c, card, c.why || "Đúng thứ tự!");
      else miss(card, `Vị trí thứ ${wrongAt + 1} chưa đúng. ${c.hintWrong || "Nghĩ xem dòng nào máy cần đọc trước."}`);
    });
  }

  if (c.type === "code") {
    const ed = $(".code-editor", card), gut = $(".gutter", card), out = $(".console-output", card), stdin = $(".stdin-box", card);
    const syncGutter = () => {
      const n = ed.value.split("\n").length;
      gut.textContent = Array.from({ length: n }, (_, i) => i + 1).join("\n");
      gut.scrollTop = ed.scrollTop;
      updateBugs(c, card, ed.value);
    };
    syncGutter();
    ed.addEventListener("input", () => { state.drafts[c.id] = ed.value; save(); syncGutter(); });
    ed.addEventListener("scroll", () => { gut.scrollTop = ed.scrollTop; });
    ed.addEventListener("keydown", e => {
      if (e.key === "Tab") {
        e.preventDefault();
        const s = ed.selectionStart;
        ed.value = ed.value.slice(0, s) + "    " + ed.value.slice(ed.selectionEnd);
        ed.selectionStart = ed.selectionEnd = s + 4;
        ed.dispatchEvent(new Event("input"));
      }
    });
    stdin?.addEventListener("input", () => { state.inputs[c.id] = stdin.value; save(); });
    $('[data-act="reset-code"]', card).addEventListener("click", () => {
      ed.value = c.starter; state.drafts[c.id] = c.starter; save(); syncGutter();
      out.textContent = "Đã trả về code ban đầu."; out.classList.remove("error");
    });
    $('[data-act="run"]', card).addEventListener("click", () => {
      showRun(out, runCpp(ed.value, stdin ? stdin.value : ""));
    });
    $('[data-act="check"]', card).addEventListener("click", () => {
      attempt(c.id);
      const verdict = checkCode(c, ed.value, stdin ? stdin.value : "");
      showRun(out, verdict.run);
      if (verdict.ok) pass(c, card, verdict.msg); else miss(card, verdict.msg);
    });
  }
}

function updateBugs(c, card, code) {
  if (!c.bugs) return;
  c.bugs.forEach((b, i) => {
    const el = $(`[data-bug="${i}"]`, card);
    const fixed = b.fixed(code);
    if (fixed && !el.classList.contains("dead")) { el.classList.add("dead"); el.firstChild.textContent = "💥 "; }
    if (!fixed && el.classList.contains("dead")) { el.classList.remove("dead"); el.firstChild.textContent = "🐛 "; }
  });
}

function showRun(out, r) {
  out.classList.toggle("error", !r.ok);
  out.textContent = r.ok ? (r.output || "(Chương trình chạy xong nhưng không in gì ra.)") : `⚠ LỖI\n${r.error}`;
}

function firstDiff(actual, expected) {
  const a = actual.split("\n"), e = expected.split("\n");
  for (let i = 0; i < Math.max(a.length, e.length); i++) {
    if ((a[i] ?? "") !== (e[i] ?? "")) {
      if (a[i] === undefined) return `Output của con mới có ${a.length} dòng, cần ${e.length} dòng.`;
      if (e[i] === undefined) return `Output của con có ${a.length} dòng, chỉ cần ${e.length} dòng.`;
      return `Dòng ${i + 1} chưa khớp:\n  của con: "${a[i]}"\n  cần:     "${e[i]}"`;
    }
  }
  return "";
}

function checkCode(c, code, currentInput) {
  const tests = c.tests || [{ input: currentInput, expected: c.expected }];
  let lastRun = null;
  for (const [n, t] of tests.entries()) {
    const r = runCpp(code, t.input || "");
    lastRun = r;
    if (!r.ok) return { ok: false, run: r, msg: "Code chưa chạy được. Đọc dòng ⚠ LỖI trong ô KẾT QUẢ rồi sửa (mở 🧰 Bảng lỗi nếu cần)." };
    if (t.expected != null) {
      const a = normalizeOutput(r.output), e = normalizeOutput(t.expected);
      if (a !== e) {
        const where = tests.length > 1 ? `Ca kiểm thử ${n + 1} (nhập: ${t.input || "không"}) sai.\n` : "";
        return { ok: false, run: r, msg: where + (firstDiff(a, e) || "Output chưa khớp mẫu.") };
      }
    }
  }
  for (const rule of c.rules || []) {
    if (!rule.test(code, lastRun.output)) return { ok: false, run: lastRun, msg: rule.msg };
  }
  if (c.bugs && !c.bugs.every(b => b.fixed(code))) {
    return { ok: false, run: lastRun, msg: "Output đã đúng nhưng vẫn còn bọ trên bảng. Xem con 🐛 nào chưa nổ." };
  }
  return { ok: true, run: lastRun, msg: c.why || "Chính xác! Output khớp mẫu." };
}

function attempt(id) { state.attempts[id] = (state.attempts[id] || 0) + 1; save(); }

function pass(c, card, msg) {
  const first = !state.passed[c.id];
  let extra = "";
  if (first) {
    state.passed[c.id] = true;
    let gain = XP_PASS;
    if (state.attempts[c.id] === 1) {
      state.combo += 1; gain += XP_FIRST_TRY;
      if (state.combo >= 2) { gain += state.combo * 2; extra = ` 🔥 Combo x${state.combo}!`; }
    } else state.combo = 0;
    state.xp += gain;
    extra = ` +${gain} XP.` + extra;
    if (allRequiredDone() && !state.completedAt) state.completedAt = new Date().toISOString();
    saveBadge();
  }
  save();
  feedback(card, "good", esc(msg) + extra);
  card.classList.add("passed");
  $(".challenge-badge", card).textContent = "⭐ ĐÃ XONG";
  beep("good");
  updateTop();
  renderMap();
  const step = STEPS.find(s => s.id === state.active);
  if (step.kind !== "gate") refreshFooter(step);
  if (step.kind === "boss" && first && allRequiredDone()) {
    beep("win"); confetti();
    if (!c.advanced) setTimeout(openCertificate, 900);
  }
}

function miss(card, msg) {
  state.combo = 0; save(); updateTop();
  feedback(card, "bad", esc(msg));
  beep("bad");
}

/* ---------- huy hiệu & chứng chỉ ---------- */
function saveBadge() {
  if (!allRequiredDone()) return;
  const key = `${PREFIX}:badges:${studentKey(state.student)}`;
  let badges = {};
  try { badges = JSON.parse(safeGet(key) || "{}"); } catch { /* bỏ qua */ }
  badges[L.id] = isGold() ? "gold" : "silver";
  safeSet(key, JSON.stringify(badges));
}

function certId() {
  return `CPP8-B${String(L.number).padStart(2, "0")}-${state.student.className}-${hashText(`${state.student.name}|${state.student.className}|${L.id}|${state.completedAt}`)}`;
}

function openCertificate() {
  if (!allRequiredDone()) return;
  drawCertificate();
  const link = $("#canvasLink");
  if (CFG.canvasSubmissionUrl) { link.href = CFG.canvasSubmissionUrl; link.classList.remove("hidden"); }
  const d = $("#certDialog");
  if (!d.open) d.showModal();
}

function drawCertificate() {
  const cv = $("#certCanvas"), ctx = cv.getContext("2d"), W = cv.width, H = cv.height;
  const gold = isGold();
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#fffdf7"; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "rgba(44,107,171,.10)"; ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 42) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y < H; y += 42) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  ctx.strokeStyle = "#17304f"; ctx.lineWidth = 12; rr(ctx, 40, 40, W - 80, H - 80, 28); ctx.stroke();
  ctx.strokeStyle = gold ? "#d9a400" : "#2076d2"; ctx.lineWidth = 4; rr(ctx, 66, 66, W - 132, H - 132, 22); ctx.stroke();

  ctx.fillStyle = "#173b78"; rr(ctx, 120, 130, 170, 115, 24); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = "900 58px Segoe UI, Arial"; ctx.textAlign = "center"; ctx.fillText("C++", 205, 207);

  // Huy hiệu
  ctx.beginPath(); ctx.arc(W - 210, 190, 72, 0, Math.PI * 2);
  ctx.fillStyle = gold ? "#ffd44d" : "#dfe6ee"; ctx.fill();
  ctx.lineWidth = 6; ctx.strokeStyle = gold ? "#b47700" : "#8a97a8"; ctx.stroke();
  ctx.font = "64px Segoe UI Emoji, Apple Color Emoji, sans-serif"; ctx.fillText(L.badge.icon, W - 210, 213);
  ctx.font = "800 20px Segoe UI, Arial"; ctx.fillStyle = gold ? "#7d5600" : "#4f5d70";
  ctx.fillText(gold ? "HUY HIỆU VÀNG" : "HUY HIỆU BẠC", W - 210, 292);

  ctx.fillStyle = "#17304f"; ctx.font = "900 30px Segoe UI, Arial"; ctx.fillText("CHỨNG CHỈ HOÀN THÀNH", W / 2, 165);
  ctx.fillStyle = "#2076d2"; ctx.font = "900 54px Segoe UI, Arial"; ctx.fillText(`BÀI ${L.number}: ${L.title.toUpperCase()}`, W / 2, 235);
  ctx.fillStyle = "#61708a"; ctx.font = "500 26px Segoe UI, Arial"; ctx.fillText(`C++ Journey 8 · ${L.story}`, W / 2, 285);

  ctx.fillStyle = "#17304f"; ctx.font = "500 25px Segoe UI, Arial"; ctx.fillText("Chứng nhận học sinh", W / 2, 385);
  ctx.fillStyle = "#6547bb"; fit(ctx, state.student.name, W / 2, 460, 1100, 56, 36);
  ctx.strokeStyle = "#d1c8b7"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(260, 490); ctx.lineTo(W - 260, 490); ctx.stroke();
  ctx.fillStyle = "#17304f"; ctx.font = "700 28px Segoe UI, Arial"; ctx.fillText(`Lớp ${state.student.className}`, W / 2, 545);
  ctx.font = "500 25px Segoe UI, Arial";
  ctx.fillText(`đã vượt 4 chặng, hạ BOSS · ${state.xp} XP${gold ? " · hoàn thành cả nhiệm vụ nâng cao" : ""}`, W / 2, 600);

  ctx.font = "700 20px Segoe UI, Arial";
  L.skills.forEach((b, i) => {
    const w = 295, x = 195 + (i % 3) * 410, y = 672 + Math.floor(i / 3) * 78;
    ctx.fillStyle = i % 2 ? "#fff1db" : "#eaf4ff"; rr(ctx, x, y, w, 52, 26); ctx.fill();
    ctx.strokeStyle = i % 2 ? "#ef8a17" : "#2076d2"; ctx.lineWidth = 2; rr(ctx, x, y, w, 52, 26); ctx.stroke();
    ctx.fillStyle = "#17304f"; ctx.textAlign = "center"; ctx.fillText(b, x + w / 2, y + 34);
  });

  const date = new Date(state.completedAt || Date.now()).toLocaleDateString("vi-VN");
  ctx.fillStyle = "#61708a"; ctx.font = "500 19px Segoe UI, Arial"; ctx.textAlign = "left";
  ctx.fillText(`Ngày hoàn thành: ${date}`, 120, 965);
  ctx.fillText(`Mã xác nhận: ${certId()}`, 120, 1000);
  ctx.textAlign = "right";
  const issuer = [CFG.schoolName, CFG.teacherName ? `GV: ${CFG.teacherName}` : ""].filter(Boolean).join(" · ");
  ctx.fillText(issuer || "Tạo trực tiếp từ tiến độ trên web", W - 120, 965);
  ctx.fillText("Nộp kèm: link Programiz bài cá nhân + ảnh output", W - 120, 1000);
}

function rr(ctx, x, y, w, h, r) {
  const k = Math.min(r, w / 2, h / 2);
  ctx.beginPath(); ctx.moveTo(x + k, y);
  ctx.arcTo(x + w, y, x + w, y + h, k); ctx.arcTo(x + w, y + h, x, y + h, k);
  ctx.arcTo(x, y + h, x, y, k); ctx.arcTo(x, y, x + w, y, k); ctx.closePath();
}

function fit(ctx, text, x, y, maxW, size, min) {
  while (size > min) { ctx.font = `900 ${size}px Segoe UI, Arial`; if (ctx.measureText(text).width <= maxW) break; size -= 2; }
  ctx.textAlign = "center"; ctx.fillText(text, x, y);
}

function fileSafe(s) {
  return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9-_]+/g, "-").replace(/^-+|-+$/g, "");
}

function savePng() {
  drawCertificate();
  $("#certCanvas").toBlob(blob => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `ChungChi-Bai${L.number}-${fileSafe(state.student.name)}-${state.student.className}.png`;
    a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, "image/png");
}

function printPdf() {
  drawCertificate();
  const data = $("#certCanvas").toDataURL("image/png");
  const win = window.open("", "_blank");
  if (!win) return alert("Trình duyệt đang chặn cửa sổ in. Con cho phép popup rồi thử lại.");
  win.document.write(`<!doctype html><html><head><title>Chứng chỉ Bài ${L.number}</title><style>html,body{margin:0}body{display:grid;place-items:center;min-height:100vh}img{max-width:100%}@page{size:A4 landscape;margin:0}@media print{img{width:100vw}}</style></head><body><img src="${data}"/></body></html>`);
  win.document.close(); win.focus(); setTimeout(() => win.print(), 300);
}

/* ---------- khởi động ---------- */
function clearAll() {
  if (!confirm("Xoá toàn bộ bài làm C++ Journey 8 trên trình duyệt này (tất cả học sinh, tất cả bài)?")) return;
  try {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith(PREFIX)) keys.push(k); }
    keys.forEach(k => localStorage.removeItem(k));
  } catch { /* bỏ qua */ }
  location.reload();
}

function askIdentity() {
  $("#nameInput").value = ""; $("#classInput").value = "";
  $("#identityDialog").showModal();
}

function boot() {
  shell();
  $("#identityForm").addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#nameInput").value.trim().replace(/\s+/g, " ");
    const className = $("#classInput").value;
    if (name.length < 2 || !CLASSES.includes(className)) return;
    load({ name, className });
    $("#identityDialog").close();
    renderAll();
  });
  $("#identityDialog").addEventListener("cancel", e => e.preventDefault());
  $("#studentBtn").addEventListener("click", askIdentity);
  $("#newStudentBtn").addEventListener("click", clearAll);
  $("#resetBtn").addEventListener("click", clearAll);
  $("#errorsBtn").addEventListener("click", () => $("#errorsDialog").showModal());
  $("#soundBtn").addEventListener("click", () => { safeSet(`${PREFIX}:sound`, soundOn() ? "off" : "on"); if (state) updateTop(); else $("#soundBtn").textContent = soundOn() ? "🔊" : "🔇"; });
  $$("[data-close]").forEach(b => b.addEventListener("click", () => b.closest("dialog").close()));
  $("#savePng").addEventListener("click", savePng);
  $("#printPdf").addEventListener("click", printPdf);
  $("#soundBtn").textContent = soundOn() ? "🔊" : "🔇";
  askIdentity();
}

boot();
