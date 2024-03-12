import moment, { Moment } from "moment";

export const localStorageKey = 'entries'

export function getDifferenceToToday(date: Moment) {
	return Math.abs(date.diff(moment(), 'days'))
}

export interface Entry {
	name: string
	text: string | undefined
	last_reset: Moment
}

export function parseFromPossibleString(input: string | null): Entry[] {
	if (input === null) {
		return []
	}

	const entries: Entry[] = []
	const rawObjects: any[] = JSON.parse(input)

	for (const rawObject of rawObjects) {
		const { name, text, last_reset } = rawObject
		const date = parseDate(last_reset)

		if (date && name) {
			entries.push({ name, text, last_reset: moment(last_reset) })
		}

	}

	return entries
}

export function parseDate(dateString: string) {
	const date = moment(dateString)
	if (!date.isValid()) {
		return undefined
	}
	return date
}

export function save(entries: Entry[]) {
	localStorage.setItem(localStorageKey, JSON.stringify(entries))
}