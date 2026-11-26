/* Meridia Statistics — small deterministic SVG charts, drawn from data.js.
   No library: each function takes labels and values and returns an SVG string. */

const NAVY = '#17324f';
const TEAL = '#0e7c7b';
const AMBER = '#d98e1f';
const SLATE = '#5b6b7a';
const LIGHT = '#e8eef3';

function esc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function barChart({ labels, values, width = 640, height = 260, color = TEAL, format = (v) => String(v), title = '' }) {
  const padL = 52;
  const padB = 30;
  const padT = 12;
  const max = Math.max(...values) * 1.08;
  const plotW = width - padL - 12;
  const plotH = height - padT - padB;
  const slot = plotW / values.length;
  const barW = Math.min(46, slot * 0.62);
  let bars = '';
  values.forEach((v, i) => {
    const h = (v / max) * plotH;
    const x = padL + i * slot + (slot - barW) / 2;
    const y = padT + plotH - h;
    bars += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="${color}"><title>${esc(labels[i])}: ${esc(format(v))}</title></rect>`;
    bars += `<text x="${(x + barW / 2).toFixed(1)}" y="${(y - 5).toFixed(1)}" text-anchor="middle" font-size="11" fill="${NAVY}">${esc(format(v))}</text>`;
    bars += `<text x="${(x + barW / 2).toFixed(1)}" y="${(padT + plotH + 18).toFixed(1)}" text-anchor="middle" font-size="11" fill="${SLATE}">${esc(labels[i])}</text>`;
  });
  const grid = [0, 0.5, 1].map((f) => {
    const y = padT + plotH * (1 - f);
    return `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${width - 12}" y2="${y.toFixed(1)}" stroke="${LIGHT}" stroke-width="1"/>`;
  }).join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(title)}" class="chart">${grid}${bars}</svg>`;
}

export function lineChart({ labels, values, width = 640, height = 260, color = NAVY, format = (v) => String(v), title = '' }) {
  const padL = 52;
  const padB = 30;
  const padT = 16;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const lo = min - span * 0.15;
  const hi = max + span * 0.15;
  const plotW = width - padL - 12;
  const plotH = height - padT - padB;
  const px = (i) => padL + (i / (values.length - 1)) * plotW;
  const py = (v) => padT + plotH * (1 - (v - lo) / (hi - lo));
  const points = values.map((v, i) => `${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(' ');
  const area = `${padL},${(padT + plotH).toFixed(1)} ${points} ${px(values.length - 1).toFixed(1)},${(padT + plotH).toFixed(1)}`;
  let dots = '';
  values.forEach((v, i) => {
    dots += `<circle cx="${px(i).toFixed(1)}" cy="${py(v).toFixed(1)}" r="4" fill="#ffffff" stroke="${color}" stroke-width="2"><title>${esc(labels[i])}: ${esc(format(v))}</title></circle>`;
    dots += `<text x="${px(i).toFixed(1)}" y="${(py(v) - 10).toFixed(1)}" text-anchor="middle" font-size="11" fill="${NAVY}">${esc(format(v))}</text>`;
    dots += `<text x="${px(i).toFixed(1)}" y="${(padT + plotH + 18).toFixed(1)}" text-anchor="middle" font-size="11" fill="${SLATE}">${esc(labels[i])}</text>`;
  });
  const grid = [0, 0.5, 1].map((f) => {
    const y = padT + plotH * (1 - f);
    return `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${width - 12}" y2="${y.toFixed(1)}" stroke="${LIGHT}" stroke-width="1"/>`;
  }).join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(title)}" class="chart">${grid}<polygon points="${area}" fill="${color}" opacity="0.08"/><polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>${dots}</svg>`;
}

const DONUT_COLORS = [TEAL, NAVY, AMBER, '#7a9bb5', '#c65d3a'];

export function donutChart({ items, width = 300, height = 300, title = '' }) {
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) / 2 - 14;
  const inner = r * 0.62;
  const total = items.reduce((s, it) => s + it.value, 0);
  const totalLabel = (Math.round(total * 10) / 10).toString();
  let offset = -Math.PI / 2;
  let slices = '';
  items.forEach((it, i) => {
    const frac = it.value / total;
    const a0 = offset;
    const a1 = offset + frac * Math.PI * 2;
    offset = a1;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1);
    const yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0);
    const yi0 = cy + inner * Math.sin(a0);
    slices += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${DONUT_COLORS[i % DONUT_COLORS.length]}"><title>${esc(it.label)}: ${esc(String(it.value))}%</title></path>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(title)}" class="chart donut">${slices}<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="700" fill="${NAVY}">${esc(totalLabel)}%</text><text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="11" fill="${SLATE}">of total</text></svg>`;
}

export function legend(items) {
  return `<ul class="legend">${items.map((it, i) => `<li><span class="swatch" style="background:${DONUT_COLORS[i % DONUT_COLORS.length]}"></span>${esc(it.label)} — <strong>${esc(String(it.value))}%</strong></li>`).join('')}</ul>`;
}
