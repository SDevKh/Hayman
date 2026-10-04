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
let id = 0; const pending = new Map();
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
const send = (method, params) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
await new Promise((r) => (ws.onopen = r));
await send("Runtime.enable");
await new Promise((r) => setTimeout(r, 3000));

const expr = `(() => {
  const sheet = [...document.styleSheets].find(s => s.href && s.href.includes('style.css'));
  if (!sheet) return 'no style.css sheet';
  const out = [];
  for (const r of sheet.cssRules) {
    out.push((r.selectorText || r.cssText.slice(0, 40)).slice(0, 60));
  }
  return JSON.stringify({ count: sheet.cssRules.length, selectors: out }, null, 2);
})()`;
const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
console.log(r.result?.result?.value ?? JSON.stringify(r));
ws.close();
