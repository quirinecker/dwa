import moment, { Moment } from "moment";
import { Ref, ref } from "vue";

const localStorageKey = 'entries'

export function getDifferenceToToday(date: Moment) {
    return Math.abs(date.diff(moment(), 'days'))
}

export const entries: Ref<Entry[]> = ref(parseFromPossibleString(localStorage.getItem(localStorageKey)))

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

        if (name && text && last_reset) {
            entries.push({ name, text, last_reset: moment(last_reset) })
        }
    }

    return entries
}

export function save() {
    localStorage.setItem(localStorageKey, JSON.stringify(entries.value))
}
