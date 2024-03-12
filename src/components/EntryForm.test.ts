import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { mount } from '@vue/test-utils'
import EntryForm from './EntryForm.vue'

describe('Entry Form tests', () => {

	it('takes in values for name and title and displays them in the respected fields', () => {
		const name = faker.word.noun()
		const text = faker.lorem.paragraph()
		const component = mount(EntryForm, {
			props: {
				name, text, action: 'edit'
			}
		})

		const nameField = component.find('input')
		const textField = component.find('textarea')
		console.log(nameField.element.classList, textField.text())
	})
})