import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { mount } from '@vue/test-utils'
import EntryForm from './EntryForm.vue'
import { Entry } from "@/data/entries";

describe('Entry Form tests', () => {

	function getFormFields(component: ReturnType<typeof mount>) {
		return {
			nameField: component.get('input'),
			textField: component.get('textarea')
		}
	}

	function getSampleValues() {
		return {
			name: faker.word.noun(),
			text: faker.lorem.paragraph()
		}
	}

	function getAdditionalElements(component: ReturnType<typeof mount>, ...ids: string[]) {
		const arr = []

		for (const id of ids) {
			arr.push(component.find(id))
		}

		return arr;
	}

	it('takes in values for name and title and displays them in the respected fields', () => {
		const { name, text } = getSampleValues()

		const component = mount(EntryForm, {
			props: {
				action: 'edit', inputEntry: <Entry>{
					name, text
				}
			}
		})

		const { nameField, textField } = getFormFields(component)
		expect(nameField.element.value).toBe(name)
		expect(textField.element.value).toBe(text)
	})

	it('takes no entry data and displays empty fields', () => {
		const component = mount(EntryForm, {
			props: {
				action: 'edit'
			}
		})

		const { nameField, textField } = getFormFields(component)
		expect(nameField.element.value).toBe('')
		expect(textField.element.value).toBe('')
	})


	it('takes no action and displays create on the Button', () => {
		const component = mount(EntryForm)
		const button = component.find('button')
		expect(button.text()).toBe('Create')
	})

	it('takes create action and displays Create on the Button', () => {
		const component = mount(EntryForm, { props: { action: 'create' } })
		const button = component.find('button')
		expect(button.text()).toBe('Create')
	})

	it('takes edit action and displays Edit on the Button', () => {
		const component = mount(EntryForm, { props: { action: 'edit' } })
		const button = component.find('button')
		expect(button.text()).toBe('Edit')
	})

	it('displays nothing when the form is valid and processed', () => {
		const { name, text } = getSampleValues()
		const component = mount(EntryForm)
		const { nameField, textField } = getFormFields(component)
		const [button, errorSpan] = getAdditionalElements(component, 'button', 'span')

		nameField.element.value = name
		textField.element.value = text

		button.trigger('click')
		expect(errorSpan.text()).toBe('')
	})

	it('displays that the name is missing when no name is entered', () => {
		const { name } = getSampleValues()
		const component = mount(EntryForm)
		const { nameField }  = getFormFields(component)
		const [button, errorSpan] = getAdditionalElements(component, 'button', 'span')

		nameField.element.value = name

		button.trigger('click')
		expect(errorSpan.text()).toBe('name is required')
	})

})