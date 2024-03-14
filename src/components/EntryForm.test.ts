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

	it('displays nothing when the form is valid and processed', async () => {
		const { name, text } = getSampleValues()
		const component = mount(EntryForm)
		const { nameField, textField } = getFormFields(component)
		const [button] = getAdditionalElements(component, 'button')

		await nameField.setValue(name)
		await textField.setValue(text)

		await button.trigger('click')
		const errorSpans = component.findAll('[data-test="error-msg"]')

		expect(errorSpans.length).toBe(0)
	})

	it('displays that the name is missing when no name is entered', async () => {
		const { text } = getSampleValues()
		const component = mount(EntryForm)
		const { textField } = getFormFields(component)
		const [button] = getAdditionalElements(component, 'button')

		textField.element.value = text

		await button.trigger('click')
		const errorSpans = component.findAll('[data-test="error-msg"]')

		expect(errorSpans.length).toBe(1)
		expect(errorSpans[0].text()).toBe('* name is required')
	})

	it('displays error that the name is not unique when there is another entry in the passed entries with the same name', async () => {
		const { text } = getSampleValues()
		const component = mount(EntryForm, {props: {entries: [<Entry>{name: 'something', text: 'something else'}]}})
		const { textField, nameField } = getFormFields(component)
		const [button] = getAdditionalElements(component, 'button')

		await textField.setValue(text)
		await nameField.setValue('something')

		await button.trigger('click')
		const errorSpans = component.findAll('[data-test="error-msg"]')

		expect(errorSpans.length).toBe(1)
		expect(errorSpans[0].text()).toBe('* name must be unique')
	})

	it('fires submit when there is no issue with the inputted data', async() => {
		const { text } = getSampleValues()
		const component = mount(EntryForm, {props: {entries: [<Entry>{name: 'something', text: 'something else'}]}})
		const { textField, nameField } = getFormFields(component)
		const [button] = getAdditionalElements(component, 'button')

		await textField.setValue(text)
		await nameField.setValue('something else')

		await button.trigger('click')
		const errorSpans = component.findAll('[data-test="error-msg"]')

		expect(errorSpans.length).toBe(0)
		expect(component.emitted('submit')).toBeTruthy()
	})
})
