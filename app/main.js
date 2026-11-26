/* Meridia Statistics — router and page wiring. Hash routes only, no network:
   #/ overview, #/population, #/economy, #/labour, #/prices, #/sources. */

import { META } from './data.js';
import {
  renderOverview, renderPopulation, renderEconomy, renderLabour,
  renderPrices, renderSources, renderNotFound,
} from './views.js';

const ROUTES = {
  '': renderOverview,
  population: renderPopulation,
  economy: renderEconomy,
  labour: renderLabour,
  prices: renderPrices,
  sources: renderSources,
};

const app = document.getElementById('app');
const yearSelect = document.getElementById('yearSelect');
const printBtn = document.getElementById('printBtn');

let year = META.latestYear;

function route() {
  const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  return hash;
}

function render() {
  const r = route();
  const view = ROUTES[r] ?? renderNotFound;
  app.innerHTML = view === renderNotFound ? view(r) : view(year);
  document.querySelectorAll('.mainnav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === r);
  });
  wirePage();
  window.scrollTo(0, 0);
}

function wirePage() {
  // Indicator search on the overview page.
  const search = document.getElementById('indicatorSearch');
  if (search) {
    const list = document.getElementById('indicatorList');
    const empty = document.getElementById('indicatorEmpty');
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      let shown = 0;
      list.querySelectorAll('li').forEach((li) => {
        const hit = li.dataset.name.includes(q);
        li.hidden = !hit;
        if (hit) shown += 1;
      });
      empty.hidden = shown !== 0;
    });
  }

  // Sortable tables: click a heading to sort that column, click again to reverse.
  document.querySelectorAll('.data-table th[data-sort]').forEach((th) => {
    th.addEventListener('click', () => {
      const table = th.closest('table');
      const body = table.querySelector('tbody');
      const index = Array.from(th.parentElement.children).indexOf(th);
      const numeric = th.dataset.sort === 'num';
      const ascending = th.dataset.dir !== 'asc';
      const rows = Array.from(body.querySelectorAll('tr'));
      rows.sort((a, b) => {
        const av = a.children[index].textContent.trim();
        const bv = b.children[index].textContent.trim();
        if (numeric) return (parseFloat(av) - parseFloat(bv)) * (ascending ? 1 : -1);
        return av.localeCompare(bv) * (ascending ? 1 : -1);
      });
      table.querySelectorAll('th').forEach((h) => delete h.dataset.dir);
      th.dataset.dir = ascending ? 'asc' : 'desc';
      rows.forEach((row) => body.appendChild(row));
    });
  });

  // CSV download buttons: build the file from the table on the page.
  document.querySelectorAll('[data-csv]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const table = document.getElementById(btn.dataset.csv);
      if (!table) return;
      const lines = [];
      table.querySelectorAll('tr').forEach((tr) => {
        const cells = Array.from(tr.querySelectorAll('th, td')).map((c) => {
          const text = c.textContent.trim().replace(/"/g, '""');
          return `"${text}"`;
        });
        lines.push(cells.join(','));
      });
      const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = btn.dataset.file || 'meridia-table.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  });
}

yearSelect.addEventListener('change', () => {
  year = Number(yearSelect.value);
  render();
});

printBtn.addEventListener('click', () => window.print());

window.addEventListener('hashchange', render);

render();
