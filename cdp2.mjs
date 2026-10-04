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
await new Promise((r) => setTimeout(r, 4000));

const expr = `(() => {
  const info = [];
  for (const s of document.styleSheets) {
    let n = -1, hasPage8 = false, hasLayer = false, err = '';
    try {
      const rules = s.cssRules;
      n = rules.length;
      for (const r of rules) {
        const t = r.cssText || '';
        if (t.includes('#page8')) hasPage8 = true;
        if (t.includes('@layer')) hasLayer = true;
      }
    } catch (e) { err = String(e); }
    info.push({ href: (s.href || 'inline').slice(-40), rules: n, hasPage8, hasLayer, err });
  }
  const matches = [];
  for (const s of document.styleSheets) {
    try { for (const r of s.cssRules) { if (r.selectorText && /#page8/.test(r.selectorText)) matches.push({ sheet: (s.href||'inline').slice(-24), sel: r.selectorText, color: r.style.color }); } } catch(e){}
  }
  const bodyRules = [];
  for (const s of document.styleSheets) {
    try { for (const r of s.cssRules) { if (r.selectorText && /(^|,\\s*)(\\*|body|html)(\\s|,|$)/.test(r.selectorText) && r.style && r.style.color) bodyRules.push({sheet:(s.href||'inline').slice(-24), sel:r.selectorText, color:r.style.color}); } } catch(e){}
  }
  return JSON.stringify({ info, matches, bodyRules }, null, 2);
})()`;
const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
console.log(r.result?.result?.value ?? JSON.stringify(r));
ws.close();
