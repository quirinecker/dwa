import { Entry, localStorageKey, parseFromPossibleString } from "@/data/entries";
import { Ref, ref } from "vue";

export const entries: Ref<Entry[]> = ref(parseFromPossibleString(localStorage.getItem(localStorageKey)))