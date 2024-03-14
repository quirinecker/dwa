import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { generateList } from "@/data/entries.test";
import { Entry } from "@/data/entries";
import { faker } from "@faker-js/faker";
import moment from "moment";
import EntryList from '@/components/EntryList.vue'

describe('entry list tests', () => {
    function mountListWithSampelData(dataAmount: number): { component: ReturnType<typeof mount>, entries: Entry[] } {
        const sampleData = generateList(dataAmount, () => <Entry>{
            name: faker.word.noun(),
            text: faker.lorem.paragraph(),
            last_reset: moment()

        })

        return {
            component: mount(EntryList, {
                props: {
                    entries: sampleData
                }
            }),
            entries: sampleData
        }
    }



    it('displays no entry when the inputted list is empty', () => {
        const { component } = mountListWithSampelData(0)
        const entryButtons = component.findAll('[test-data="entry-button"]')

        expect(entryButtons.length).toBe(0)
    })

    it('displays no entry when 10 Entries are passed to the component', () => {
        const { component } = mountListWithSampelData(10)
        const entryButtons = component.findAll('[test-data="entry-button"]')

        expect(entryButtons.length).toBe(10)
    })

    it('includes the content of the passed list', () => {
        const { component, entries } = mountListWithSampelData(10)
        const entryButtons = component.findAll('[test-data="entry-button"]')
        const names = entryButtons.map(button => button.text())

        for (let entry of entries) {
            expect(names).toContain(entry.name + '0 days')
        }
    })

    it('triggers event openDetail when one of the Buttons is pressed', () => {
        const { component, entries } = mountListWithSampelData(10)
        const entryButtons = component.findAll('[test-data="entry-button"]')
        const names = entries.map(entry => entry.name)

        for (let i = 0; i < entryButtons.length; i++) {
            entryButtons[i].trigger('click')
        }

        expect(component.emitted('openDetail')).toBeTruthy()
        expect(component.emitted('openDetail')).toBeDefined()
        expect(component.emitted('openDetail')).toHaveLength(10)

        for (let name of names) {
            // force unwrap because value is allrady asserted to be defined
            expect(component.emitted('openDetail')!.map(emit => emit[0]))
                .toContain(name)
        }
    })
})
