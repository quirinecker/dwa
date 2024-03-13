import { mount } from "@vue/test-utils";
import { describe, it } from "vitest";
import { generateList } from "@/data/entries.test";
import { Entry } from "@/data/entries";
import { faker } from "@faker-js/faker";
import moment from "moment";
import EntryList from '@/components/EntryList.vue'

describe('entry list tests', () => {
	function mountListWithSampelData(dataAmount: number) {
		const sampleData = generateList(dataAmount, () => <Entry>{
			name: faker.word.noun(),
			text: faker.lorem.paragraph(),
			last_reset: moment()

		})

		return mount(EntryList, {props: {
			entries: sampleData
		}})
	}



	it('displays no entry when the inputted list is empty', () => {
		const component = mountListWithSampelData(0)

		component.find('')

	})
})