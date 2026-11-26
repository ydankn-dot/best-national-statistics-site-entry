/* Meridia Statistics — all figures, with source and reference year.
   Meridia is a fictional country; these are the Office's own illustrative
   published estimates, kept consistent across the site. */

export const META = {
  country: 'Meridia',
  office: 'National Statistics Office of Meridia',
  currency: 'M',
  currencyName: 'merid',
  latestYear: 2024,
  years: [2019, 2020, 2021, 2022, 2023, 2024],
};

export const SERIES = {
  population: {
    label: 'Resident population',
    unit: 'million people',
    source: 'Population Estimates, NSO Meridia, 2024 edition',
    values: { 2019: 8.21, 2020: 8.24, 2021: 8.28, 2022: 8.33, 2023: 8.38, 2024: 8.42 },
  },
  gdp: {
    label: 'Gross domestic product',
    unit: 'billion merid (M)',
    source: 'National Accounts, NSO Meridia, 2024 edition',
    values: { 2019: 276.5, 2020: 268.9, 2021: 284.2, 2022: 301.8, 2023: 310.5, 2024: 318.4 },
  },
  gdpPerCapita: {
    label: 'GDP per capita',
    unit: 'merid (M)',
    source: 'National Accounts, NSO Meridia, 2024 edition',
    values: { 2019: 33678, 2020: 32633, 2021: 34324, 2022: 36231, 2023: 37053, 2024: 37815 },
  },
  unemployment: {
    label: 'Unemployment rate',
    unit: '% of labour force',
    source: 'Labour Force Survey, NSO Meridia, Q4 2024',
    values: { 2019: 5.2, 2020: 7.8, 2021: 6.4, 2022: 5.1, 2023: 4.5, 2024: 4.1 },
  },
  inflation: {
    label: 'Consumer price inflation',
    unit: '% change on a year earlier',
    source: 'Consumer Price Index, NSO Meridia, December 2024',
    values: { 2019: 1.8, 2020: 0.9, 2021: 2.6, 2022: 6.1, 2023: 3.4, 2024: 2.3 },
  },
  lifeExpectancy: {
    label: 'Life expectancy at birth',
    unit: 'years',
    source: 'Vital Statistics, NSO Meridia, 2024 edition',
    values: { 2019: 81.6, 2020: 81.4, 2021: 81.7, 2022: 82.0, 2023: 82.2, 2024: 82.4 },
  },
};

export const AGE_GROUPS_2024 = [
  { group: '0–14 years', share: 16.2, people: 1.36 },
  { group: '15–24 years', share: 11.8, people: 0.99 },
  { group: '25–54 years', share: 42.6, people: 3.59 },
  { group: '55–64 years', share: 13.1, people: 1.10 },
  { group: '65 years and over', share: 16.3, people: 1.37 },
];

export const REGIONS_2024 = [
  { region: 'Northvale', population: 2.31, density: 214, medianAge: 39.8 },
  { region: 'Eastmere', population: 1.94, density: 168, medianAge: 40.6 },
  { region: 'Southport', population: 1.72, density: 301, medianAge: 41.9 },
  { region: 'Westfield', population: 1.48, density: 96, medianAge: 42.4 },
  { region: 'Highlands', population: 0.97, density: 21, medianAge: 44.1 },
];

export const GDP_SECTORS_2024 = [
  { sector: 'Services', share: 68.4 },
  { sector: 'Industry', share: 24.1 },
  { sector: 'Construction', share: 4.3 },
  { sector: 'Agriculture, forestry and fishing', share: 3.2 },
];

export const EMPLOYMENT_SECTORS_2024 = [
  { sector: 'Services', share: 74.2, jobs: 3120 },
  { sector: 'Industry', share: 19.8, jobs: 833 },
  { sector: 'Construction', share: 2.9, jobs: 122 },
  { sector: 'Agriculture, forestry and fishing', share: 3.1, jobs: 130 },
];

export const TRADE_2024 = {
  exports: 128.7,
  imports: 121.3,
  surplus: 7.4,
  topExports: [
    { good: 'Machinery and transport equipment', value: 38.2 },
    { good: 'Pharmaceuticals', value: 21.6 },
    { good: 'Food and live animals', value: 17.9 },
    { good: 'Chemicals', value: 14.4 },
    { good: 'All other goods', value: 36.6 },
  ],
};

export const VITAL_2024 = {
  births: 78400,
  deaths: 71200,
  netMigration: 18300,
  marriages: 31200,
  medianAge: 41.2,
};

export const PRICES_2024 = [
  { group: 'Food and non-alcoholic drinks', weight: 15.2, change: 3.1 },
  { group: 'Housing, water and energy', weight: 24.6, change: 1.4 },
  { group: 'Transport', weight: 12.8, change: 0.8 },
  { group: 'Health', weight: 6.1, change: 2.9 },
  { group: 'Education', weight: 3.4, change: 4.2 },
  { group: 'Recreation and culture', weight: 9.7, change: 2.0 },
  { group: 'All other goods and services', weight: 28.2, change: 2.6 },
];

export const RELEASES = [
  { date: '14 Nov 2025', title: 'Labour Force Survey, Q3 2025', note: 'Unemployment 4.0%; employment up 18,000 on the quarter.', href: '#/labour' },
  { date: '31 Oct 2025', title: 'Consumer Price Index, October 2025', note: 'Annual inflation 2.1%; food prices up 2.8% on a year earlier.', href: '#/prices' },
  { date: '17 Oct 2025', title: 'National Accounts, Q2 2025', note: 'GDP grew 0.6% on the quarter; services led the rise.', href: '#/economy' },
  { date: '26 Sep 2025', title: 'Population Estimates, mid-2025', note: 'Population 8.46 million; net migration +19,100 in the year.', href: '#/population' },
  { date: '12 Sep 2025', title: 'Trade in Goods, August 2025', note: 'Exports M 11.2 billion; trade surplus M 0.6 billion.', href: '#/economy' },
];

export const INDICATORS = [
  { name: 'Resident population', value: '8.42 million', year: 2024, href: '#/population' },
  { name: 'GDP', value: 'M 318.4 billion', year: 2024, href: '#/economy' },
  { name: 'GDP per capita', value: 'M 37,815', year: 2024, href: '#/economy' },
  { name: 'Unemployment rate', value: '4.1%', year: 2024, href: '#/labour' },
  { name: 'Consumer price inflation', value: '2.3%', year: 2024, href: '#/prices' },
  { name: 'Life expectancy at birth', value: '82.4 years', year: 2024, href: '#/population' },
  { name: 'Median age', value: '41.2 years', year: 2024, href: '#/population' },
  { name: 'Exports of goods', value: 'M 128.7 billion', year: 2024, href: '#/economy' },
  { name: 'Births', value: '78,400', year: 2024, href: '#/population' },
  { name: 'Employment in services', value: '74.2% of jobs', year: 2024, href: '#/labour' },
];

export function yearChange(seriesKey, year) {
  const values = SERIES[seriesKey].values;
  const now = values[year];
  const prev = values[year - 1];
  if (now === undefined || prev === undefined) return null;
  return ((now - prev) / prev) * 100;
}

export function formatNumber(n, decimals = 1) {
  return n.toLocaleString('en-GB', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
