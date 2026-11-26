/* Meridia Statistics — one renderer per section. Each page is built from
   data.js, so every figure it shows carries its source and reference year. */

import {
  META, SERIES, AGE_GROUPS_2024, REGIONS_2024, GDP_SECTORS_2024,
  EMPLOYMENT_SECTORS_2024, TRADE_2024, VITAL_2024, PRICES_2024, RELEASES,
  INDICATORS, yearChange, formatNumber,
} from './data.js';
import { barChart, lineChart, donutChart, legend } from './charts.js';

function sourceNote(seriesKey, year) {
  const s = SERIES[seriesKey];
  return `<p class="source">Source: ${s.source}. Reference year ${year}. ${s.unit}.</p>`;
}

function changeBadge(seriesKey, year) {
  const c = yearChange(seriesKey, year);
  if (c === null) return '<span class="change flat">first year shown</span>';
  const up = c >= 0;
  const arrow = up ? '▲' : '▼';
  return `<span class="change ${up ? 'up' : 'down'}">${arrow} ${Math.abs(c).toFixed(1)}% on ${year - 1}</span>`;
}

function kpi(seriesKey, year, decimals = 1) {
  const s = SERIES[seriesKey];
  const v = s.values[year];
  return `<article class="kpi">
    <h3>${s.label}</h3>
    <p class="kpi-value">${formatNumber(v, decimals)} <span class="kpi-unit">${s.unit}</span></p>
    ${changeBadge(seriesKey, year)}
    <p class="kpi-source">${s.source}</p>
  </article>`;
}

function sectionHead(title, intro) {
  return `<div class="page-head"><h1>${title}</h1><p class="lede">${intro}</p></div>`;
}

function csvButton(tableId, filename) {
  return `<button type="button" class="csv-btn" data-csv="${tableId}" data-file="${filename}">Download table as CSV</button>`;
}

export function renderOverview(year) {
  const pop = SERIES.population.values[year];
  const gdp = SERIES.gdp.values[year];
  return `${sectionHead('Meridia in figures',
    `The official picture of Meridia in ${year}: how many people live here, what the economy produced, who is in work and what prices did. Every figure names its source.`)}
  <section class="kpi-grid" aria-label="Key figures for ${year}">
    ${kpi('population', year, 2)}
    ${kpi('gdp', year, 1)}
    ${kpi('unemployment', year, 1)}
    ${kpi('inflation', year, 1)}
    ${kpi('gdpPerCapita', year, 0)}
    ${kpi('lifeExpectancy', year, 1)}
  </section>

  <div class="two-col">
    <section class="card">
      <h2>Population, 2019–${META.latestYear}</h2>
      ${barChart({ labels: META.years.map(String), values: META.years.map((y) => SERIES.population.values[y]), format: (v) => `${v.toFixed(2)}m`, title: 'Resident population by year' })}
      <p>Population reached ${formatNumber(pop, 2)} million in ${year}: ${formatNumber(VITAL_2024.births, 0)} births, ${formatNumber(VITAL_2024.deaths, 0)} deaths and net migration of +${formatNumber(VITAL_2024.netMigration, 0)} in 2024.</p>
      ${sourceNote('population', year)}
      <p><a class="btn" href="#/population">Explore population →</a></p>
    </section>
    <section class="card">
      <h2>GDP, 2019–${META.latestYear}</h2>
      ${lineChart({ labels: META.years.map(String), values: META.years.map((y) => SERIES.gdp.values[y]), format: (v) => `M ${v.toFixed(1)}bn`, title: 'Gross domestic product by year' })}
      <p>GDP was M ${formatNumber(gdp, 1)} billion in ${year}. The 2020 fall and the recovery that followed are the pandemic years in the national accounts.</p>
      ${sourceNote('gdp', year)}
      <p><a class="btn" href="#/economy">Explore the economy →</a></p>
    </section>
  </div>

  <section class="card">
    <h2>Find an indicator</h2>
    <label class="search-label" for="indicatorSearch">Search ${INDICATORS.length} headline indicators</label>
    <input id="indicatorSearch" type="search" placeholder="Try “unemployment”, “exports” or “births”…" autocomplete="off">
    <ul id="indicatorList" class="indicator-list">
      ${INDICATORS.map((it) => `<li data-name="${it.name.toLowerCase()}"><a href="${it.href}">${it.name}</a><span>${it.value} · ${it.year}</span></li>`).join('')}
    </ul>
    <p id="indicatorEmpty" class="empty" hidden>No indicator matches that search. Try a shorter word.</p>
  </section>

  <section class="card">
    <h2>Latest releases</h2>
    <ul class="releases">
      ${RELEASES.map((r) => `<li><span class="release-date">${r.date}</span><a href="${r.href}">${r.title}</a><span class="release-note">${r.note}</span></li>`).join('')}
    </ul>
  </section>

  <section class="explore-grid" aria-label="Browse by topic">
    <a class="explore-card" href="#/population"><strong>Population</strong><span>Age, regions, births and deaths</span></a>
    <a class="explore-card" href="#/economy"><strong>Economy</strong><span>GDP, sectors and trade</span></a>
    <a class="explore-card" href="#/labour"><strong>Labour</strong><span>Jobs, unemployment and pay</span></a>
    <a class="explore-card" href="#/prices"><strong>Prices &amp; living</strong><span>Inflation and what it costs to live</span></a>
  </section>`;
}

export function renderPopulation(year) {
  const pop = SERIES.population.values[year];
  return `${sectionHead('Population',
    `Who lives in Meridia, where, and how the population is changing. All figures are the Office's mid-year estimates for ${year}.`)}
  <section class="kpi-grid">
    ${kpi('population', year, 2)}
    ${kpi('lifeExpectancy', year, 1)}
    <article class="kpi"><h3>Median age</h3><p class="kpi-value">${VITAL_2024.medianAge.toFixed(1)} <span class="kpi-unit">years</span></p><span class="change up">▲ 0.3 years on 2023</span><p class="kpi-source">Population Estimates, NSO Meridia, 2024 edition</p></article>
    <article class="kpi"><h3>Net migration</h3><p class="kpi-value">+${formatNumber(VITAL_2024.netMigration, 0)} <span class="kpi-unit">people</span></p><span class="change up">▲ 1,200 on 2023</span><p class="kpi-source">Population Estimates, NSO Meridia, 2024 edition</p></article>
  </section>

  <div class="two-col">
    <section class="card">
      <h2>Population by year</h2>
      ${barChart({ labels: META.years.map(String), values: META.years.map((y) => SERIES.population.values[y]), format: (v) => `${v.toFixed(2)}m`, title: 'Resident population by year' })}
      <p>Meridia's population grew from 8.21 million in 2019 to ${formatNumber(pop, 2)} million in ${year} — about 0.5% a year, driven more by migration than by natural change since 2022.</p>
      ${sourceNote('population', year)}
    </section>
    <section class="card">
      <h2>Age structure, 2024</h2>
      <div class="donut-wrap">
        ${donutChart({ items: AGE_GROUPS_2024.map((a) => ({ label: a.group, value: a.share })), title: 'Share of population by age group, 2024' })}
        ${legend(AGE_GROUPS_2024.map((a) => ({ label: a.group, value: a.share })))}
      </div>
      <p>Two in five residents are aged 25–54. The share aged 65 and over, 16.3%, has risen 1.9 points since 2019.</p>
      <p class="source">Source: Population Estimates, NSO Meridia, 2024 edition.</p>
    </section>
  </div>

  <section class="card">
    <h2>Population by region, 2024</h2>
    <p>Click a column heading to sort the table. ${csvButton('regionsTable', 'meridia-regions-2024.csv')}</p>
    <div class="table-scroll"><table id="regionsTable" class="data-table">
      <thead><tr>
        <th data-sort="text">Region</th>
        <th data-sort="num">Population (million)</th>
        <th data-sort="num">Density (people per km²)</th>
        <th data-sort="num">Median age (years)</th>
      </tr></thead>
      <tbody>
        ${REGIONS_2024.map((r) => `<tr><td>${r.region}</td><td>${r.population.toFixed(2)}</td><td>${r.density}</td><td>${r.medianAge.toFixed(1)}</td></tr>`).join('')}
      </tbody>
    </table></div>
    <p class="source">Source: Population Estimates, NSO Meridia, 2024 edition. Regional populations sum to the national total of 8.42 million.</p>
  </section>

  <section class="card">
    <h2>Births and deaths, 2024</h2>
    <ul class="fact-list">
      <li><strong>${formatNumber(VITAL_2024.births, 0)}</strong> live births — 9.3 per 1,000 people</li>
      <li><strong>${formatNumber(VITAL_2024.deaths, 0)}</strong> deaths — 8.5 per 1,000 people</li>
      <li><strong>${formatNumber(VITAL_2024.marriages, 0)}</strong> marriages</li>
      <li><strong>${formatNumber(VITAL_2024.births - VITAL_2024.deaths, 0)}</strong> natural increase (births minus deaths)</li>
    </ul>
    <p class="source">Source: Vital Statistics, NSO Meridia, 2024 edition.</p>
  </section>`;
}

export function renderEconomy(year) {
  const gdp = SERIES.gdp.values[year];
  return `${sectionHead('Economy',
    `What Meridia produced, who produced it and what it sold abroad — the national accounts for ${year}, in merid (M).`)}
  <section class="kpi-grid">
    ${kpi('gdp', year, 1)}
    ${kpi('gdpPerCapita', year, 0)}
    <article class="kpi"><h3>Exports of goods</h3><p class="kpi-value">M ${formatNumber(TRADE_2024.exports, 1)} <span class="kpi-unit">billion</span></p><span class="change up">▲ 3.8% on 2023</span><p class="kpi-source">Trade in Goods, NSO Meridia, 2024 edition</p></article>
    <article class="kpi"><h3>Trade balance</h3><p class="kpi-value">M +${formatNumber(TRADE_2024.surplus, 1)} <span class="kpi-unit">billion</span></p><span class="change up">Surplus for a third year running</span><p class="kpi-source">Trade in Goods, NSO Meridia, 2024 edition</p></article>
  </section>

  <div class="two-col">
    <section class="card">
      <h2>GDP, 2019–${META.latestYear}</h2>
      ${lineChart({ labels: META.years.map(String), values: META.years.map((y) => SERIES.gdp.values[y]), format: (v) => `M ${v.toFixed(1)}bn`, title: 'Gross domestic product by year' })}
      <p>GDP in ${year} was M ${formatNumber(gdp, 1)} billion, 2.5% higher in real terms than 2023. Services added the most to growth; industry was flat.</p>
      ${sourceNote('gdp', year)}
    </section>
    <section class="card">
      <h2>What makes up GDP, 2024</h2>
      <div class="donut-wrap">
        ${donutChart({ items: GDP_SECTORS_2024.map((s) => ({ label: s.sector, value: s.share })), title: 'Share of GDP by sector, 2024' })}
        ${legend(GDP_SECTORS_2024.map((s) => ({ label: s.sector, value: s.share })))}
      </div>
      <p>Services are more than two-thirds of the economy. Agriculture, forestry and fishing are 3.2% of GDP but 3.1% of jobs.</p>
      <p class="source">Source: National Accounts, NSO Meridia, 2024 edition.</p>
    </section>
  </div>

  <section class="card">
    <h2>Top exports, 2024</h2>
    <p>${csvButton('exportsTable', 'meridia-exports-2024.csv')}</p>
    <div class="table-scroll"><table id="exportsTable" class="data-table">
      <thead><tr><th data-sort="text">Good</th><th data-sort="num">Value (M billion)</th><th data-sort="num">Share of exports (%)</th></tr></thead>
      <tbody>
        ${TRADE_2024.topExports.map((e) => `<tr><td>${e.good}</td><td>${e.value.toFixed(1)}</td><td>${((e.value / TRADE_2024.exports) * 100).toFixed(1)}</td></tr>`).join('')}
      </tbody>
    </table></div>
    <p>Machinery and transport equipment is Meridia's largest export, M 38.2 billion — 29.7% of all goods exports. Total goods exports were M ${formatNumber(TRADE_2024.exports, 1)} billion against imports of M ${formatNumber(TRADE_2024.imports, 1)} billion.</p>
    <p class="source">Source: Trade in Goods, NSO Meridia, 2024 edition.</p>
  </section>`;
}

export function renderLabour(year) {
  const unemp = SERIES.unemployment.values[year];
  return `${sectionHead('Labour',
    `Who is in work in Meridia, who is looking for work, and where the jobs are — from the Labour Force Survey, ${year}.`)}
  <section class="kpi-grid">
    ${kpi('unemployment', year, 1)}
    <article class="kpi"><h3>Employment rate</h3><p class="kpi-value">74.6 <span class="kpi-unit">% of people aged 15–64</span></p><span class="change up">▲ 0.8 points on 2023</span><p class="kpi-source">Labour Force Survey, NSO Meridia, Q4 2024</p></article>
    <article class="kpi"><h3>People in work</h3><p class="kpi-value">4.21 <span class="kpi-unit">million</span></p><span class="change up">▲ 1.4% on 2023</span><p class="kpi-source">Labour Force Survey, NSO Meridia, Q4 2024</p></article>
    <article class="kpi"><h3>Median monthly pay</h3><p class="kpi-value">M 3,940</p><span class="change up">▲ 3.9% on 2023</span><p class="kpi-source">Earnings Survey, NSO Meridia, 2024 edition</p></article>
  </section>

  <div class="two-col">
    <section class="card">
      <h2>Unemployment, 2019–${META.latestYear}</h2>
      ${lineChart({ labels: META.years.map(String), values: META.years.map((y) => SERIES.unemployment.values[y]), format: (v) => `${v.toFixed(1)}%`, title: 'Unemployment rate by year' })}
      <p>Unemployment was ${unemp.toFixed(1)}% in ${year}, the lowest since the series began in 2015. The 2020 peak of 7.8% was the pandemic year; the rate has fallen every year since.</p>
      ${sourceNote('unemployment', year)}
    </section>
    <section class="card">
      <h2>Jobs by sector, 2024</h2>
      <div class="donut-wrap">
        ${donutChart({ items: EMPLOYMENT_SECTORS_2024.map((s) => ({ label: s.sector, value: s.share })), title: 'Share of jobs by sector, 2024' })}
        ${legend(EMPLOYMENT_SECTORS_2024.map((s) => ({ label: s.sector, value: s.share })))}
      </div>
      <p>Services hold 3.12 million of Meridia's 4.21 million jobs. Industry employs 833,000 people, most of them in the Northvale manufacturing belt.</p>
      <p class="source">Source: Labour Force Survey, NSO Meridia, Q4 2024.</p>
    </section>
  </div>

  <section class="card">
    <h2>Employment by sector, 2024</h2>
    <p>${csvButton('jobsTable', 'meridia-jobs-2024.csv')}</p>
    <div class="table-scroll"><table id="jobsTable" class="data-table">
      <thead><tr><th data-sort="text">Sector</th><th data-sort="num">Share of jobs (%)</th><th data-sort="num">Jobs (thousand)</th></tr></thead>
      <tbody>
        ${EMPLOYMENT_SECTORS_2024.map((s) => `<tr><td>${s.sector}</td><td>${s.share.toFixed(1)}</td><td>${s.jobs.toLocaleString('en-GB')}</td></tr>`).join('')}
      </tbody>
    </table></div>
    <p class="source">Source: Labour Force Survey, NSO Meridia, Q4 2024. Sector jobs sum to 4.21 million.</p>
  </section>`;
}

export function renderPrices(year) {
  const inf = SERIES.inflation.values[year];
  return `${sectionHead('Prices & living',
    `What prices did in ${year}, what drove them, and what that meant for households in Meridia.`)}
  <section class="kpi-grid">
    ${kpi('inflation', year, 1)}
    <article class="kpi"><h3>Food prices</h3><p class="kpi-value">+3.1 <span class="kpi-unit">% on a year earlier</span></p><span class="change down">Above the all-items rate</span><p class="kpi-source">Consumer Price Index, NSO Meridia, December 2024</p></article>
    <article class="kpi"><h3>Average household spend</h3><p class="kpi-value">M 4,820 <span class="kpi-unit">a month</span></p><span class="change up">▲ 2.6% on 2023</span><p class="kpi-source">Household Budget Survey, NSO Meridia, 2024 edition</p></article>
    <article class="kpi"><h3>Median monthly pay</h3><p class="kpi-value">M 3,940</p><span class="change up">▲ 3.9% on 2023 — ahead of inflation</span><p class="kpi-source">Earnings Survey, NSO Meridia, 2024 edition</p></article>
  </section>

  <div class="two-col">
    <section class="card">
      <h2>Inflation, 2019–${META.latestYear}</h2>
      ${barChart({ labels: META.years.map(String), values: META.years.map((y) => SERIES.inflation.values[y]), color: '#d98e1f', format: (v) => `${v.toFixed(1)}%`, title: 'Consumer price inflation by year' })}
      <p>Inflation was ${inf.toFixed(1)}% in ${year}, down from the 2022 peak of 6.1% when energy prices spiked. The Office's target band is 1–3%.</p>
      ${sourceNote('inflation', year)}
    </section>
    <section class="card">
      <h2>What pushed prices in 2024</h2>
      <p>Annual price change by spending group, with each group's weight in the average household basket.</p>
      <div class="table-scroll"><table id="pricesTable" class="data-table">
        <thead><tr><th data-sort="text">Spending group</th><th data-sort="num">Weight (%)</th><th data-sort="num">Price change (%)</th></tr></thead>
        <tbody>
          ${PRICES_2024.map((p) => `<tr><td>${p.group}</td><td>${p.weight.toFixed(1)}</td><td>${p.change.toFixed(1)}</td></tr>`).join('')}
        </tbody>
      </table></div>
      <p>Housing, water and energy is the heaviest group in the basket at 24.6%, but its prices rose only 1.4% in 2024. Education rose fastest, 4.2%.</p>
      <p class="source">Source: Consumer Price Index, NSO Meridia, December 2024. ${csvButton('pricesTable', 'meridia-prices-2024.csv')}</p>
    </section>
  </div>

  <section class="card">
    <h2>What M 100 bought</h2>
    <p>In 2019, M 100 of groceries cost M 100. By 2024 the same basket cost M 114.60 — prices rose 14.6% over five years, while median monthly pay rose 19.4% over the same period, so typical pay kept ahead of prices.</p>
    <p class="source">Source: Consumer Price Index and Earnings Survey, NSO Meridia, 2024 editions.</p>
  </section>`;
}

export function renderSources() {
  return `${sectionHead('Sources & methods',
    'Where every figure on this site comes from, how it was produced, and how to use it. If a figure has no source named here, treat it as provisional and ask the Office.')}
  <section class="card">
    <h2>Publications behind the figures</h2>
    <ul class="fact-list">
      <li><strong>Population Estimates, 2024 edition</strong> — mid-year resident population, age structure, regions, migration. Published 26 September 2025.</li>
      <li><strong>National Accounts, 2024 edition</strong> — GDP, GDP per capita and output by sector. Published 17 October 2025.</li>
      <li><strong>Labour Force Survey, Q4 2024</strong> — employment, unemployment and jobs by sector, from a quarterly survey of 12,400 households. Published 14 November 2025.</li>
      <li><strong>Consumer Price Index, December 2024</strong> — inflation and price change by spending group, from 38,000 prices collected in 214 outlets. Published 31 October 2025.</li>
      <li><strong>Vital Statistics, 2024 edition</strong> — births, deaths, marriages and life expectancy, from the civil register. Published 30 May 2025.</li>
      <li><strong>Trade in Goods, 2024 edition</strong> — exports and imports by commodity, from customs declarations. Published 12 September 2025.</li>
      <li><strong>Household Budget Survey, 2024 edition</strong> — household spending, from diaries kept by 6,800 households. Published 20 June 2025.</li>
      <li><strong>Earnings Survey, 2024 edition</strong> — median monthly pay, from payroll records of 9,100 employers. Published 28 March 2025.</li>
    </ul>
  </section>
  <section class="card">
    <h2>How to read the figures</h2>
    <ul class="fact-list">
      <li>Money is in merid (M), Meridia's currency. GDP is in current prices unless a page says “in real terms”.</li>
      <li>Rates are for the reference year shown in the year picker at the top of every page; change it and every figure on the page updates.</li>
      <li>Figures are rounded, so parts may not add exactly to totals. A difference of 0.1 is rounding, not an error.</li>
      <li>2024 figures are final. Figures marked provisional are revised in the next edition and flagged here when they change.</li>
    </ul>
  </section>
  <section class="card">
    <h2>Using the data</h2>
    <p>Every table on this site has a “Download table as CSV” button. You may reuse any figure with a credit naming the publication and year, for example “Source: National Accounts, NSO Meridia, 2024 edition”. Contact the Office at 14 Census Square, Aldgate, for anything the tables do not answer.</p>
  </section>`;
}

export function renderNotFound(route) {
  return `${sectionHead('Page not found',
    `There is no “${route}” section on this site. The sections below cover everything the Office publishes here.`)}
  <section class="explore-grid" aria-label="Browse by topic">
    <a class="explore-card" href="#/"><strong>Overview</strong><span>Meridia in figures</span></a>
    <a class="explore-card" href="#/population"><strong>Population</strong><span>Age, regions, births and deaths</span></a>
    <a class="explore-card" href="#/economy"><strong>Economy</strong><span>GDP, sectors and trade</span></a>
    <a class="explore-card" href="#/labour"><strong>Labour</strong><span>Jobs, unemployment and pay</span></a>
    <a class="explore-card" href="#/prices"><strong>Prices &amp; living</strong><span>Inflation and what it costs to live</span></a>
  </section>`;
}
