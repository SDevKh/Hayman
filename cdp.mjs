// Temporary diagnostic: read computed styles of key elements via Chrome DevTools Protocol
const PORT = process.env.CDP_PORT || 9333;

async function getTarget() {
  for (let i = 0; i < 30; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const page = list.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
      if (page) return page;
    } catch (e) {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("no target");
}

const target = await getTarget();
const ws = new WebSocket(target.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
};
const send = (method, params) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
await new Promise((r) => (ws.onopen = r));
await send("Runtime.enable");
await new Promise((r) => setTimeout(r, 6000));

const expr = `(() => {
  const q = (s) => document.querySelector(s);
  const c = (el) => el ? getComputedStyle(el).color : 'MISSING';
  const f = (el) => el ? getComputedStyle(el).fontFamily : 'MISSING';
  const out = {
    bodyColor: getComputedStyle(document.body).color,
    bodyFont: getComputedStyle(document.body).fontFamily,
    page8Color: c(q('#page8')),
    page8_p: c(q('#page8 > p')),
    page8_p_font: f(q('#page8 > p')),
    page8_p_span: c(q('#page8 > p > span')),
    p6h1_color: c(q('#p6head-1 h1')),
    p6h1_font: f(q('#p6head-1 h1')),
    p7video_bg: q('#p7video') ? getComputedStyle(q('#p7video')).backgroundColor : 'MISSING',
    card2_bg: q('#flipcard-2 .card') ? getComputedStyle(q('#flipcard-2 .card')).backgroundImage.slice(0,60) : 'MISSING',
    p5p1_font: f(q('#p5p1')),
    p5p1_color: c(q('#p5p1')),
    sheets: [...document.styleSheets].map(s => s.href || 'inline').slice(0, 12)
  };
  return JSON.stringify(out, null, 2);
})()`;

const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
console.log(r.result?.result?.value ?? JSON.stringify(r));
ws.close();
