const currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const percentFormat = new Intl.NumberFormat('en-US', {
	maximumFractionDigits: 1,
	signDisplay: 'always'
});

export function formatPrice(price: number): string {
	return currencyFormat.format(price);
}

export function formatPercent(pct: number): string {
	return `${percentFormat.format(pct)}%`;
}

const MONTH_ABBR = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
];

/** `month` is 1-indexed (1 = January), matching gas-tracker's SeasonalMonth.month. */
export function formatMonth(month: number): string {
	return MONTH_ABBR[month - 1] ?? String(month);
}

/** Formats a "YYYY-MM" or "YYYY-MM-DD" period string as "Mon YYYY". */
export function formatPeriod(period: string): string {
	const [year, month] = period.split('-');
	const monthNum = Number(month);
	return Number.isFinite(monthNum) ? `${formatMonth(monthNum)} ${year}` : period;
}

/** Converts a snake_case API value like "cold_front_recent" into "Cold front recent". */
export function humanize(value: string): string {
	const spaced = value.replaceAll('_', ' ');
	return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
