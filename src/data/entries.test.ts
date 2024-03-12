import { expect, it } from "vitest"
import { describe } from "vitest"
import { faker } from '@faker-js/faker'
import { parseFromPossibleString } from "./entries"
import moment from "moment"


describe('function for managing entries data entity', () => {
	function generateList<E>(length: number, generate: () => E) {
		const arr: Array<E> = []

		for (let i = 0; i < length; i++) {
			arr.push(generate());
		}

		return arr;
	}

	function generateListWithWrongDate() {
		return generateList(10, () => <any>{
			name: faker.word.noun(),
			text: faker.lorem.paragraph(),
			last_reset: faker.word.sample()
		})
	}

	function generateListWithNoName() {
		return generateList(10, () => <any>{
			text: faker.lorem.paragraph(),
			last_reset: moment()
		})
	}

	function generateListWithCorrectData() {
		return generateList(10, () => <any>{
			name: faker.word.noun(),
			text: faker.lorem.paragraph(),
			last_reset: moment()
		})
	}

	it('fails to parse localstorage string because of wrong date', () => {
		const data = generateListWithWrongDate()
		expect(parseFromPossibleString(JSON.stringify(data)).length).toBe(0)
	})

	it('fails to parse localstorage string because no name was parsed', () => {
		const data = generateListWithNoName()
		expect(parseFromPossibleString(JSON.stringify(data)).length).toBe(0)
	})

	it('succeeds to parse localstorage string witht he correct data', () => {
		const data = generateListWithCorrectData()
		expect(parseFromPossibleString(JSON.stringify(data)).length).toBe(10)
	})
})