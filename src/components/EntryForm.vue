<script setup lang="ts">
import * as z from 'zod'
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Entry } from '@/data/entries';
import { Ref, ref } from 'vue';

const emit = defineEmits<{
	submit: [value: CreateEntrySchema]
}>()

const props = withDefaults(defineProps<{
	action?: 'create' | 'edit'
	inputEntry?: Entry | undefined
	entries?: Entry[]
}>(), {
	action: 'create',
})

const nameField = ref(props.inputEntry ? props.inputEntry.name : '')
const textField = ref(props.inputEntry ? props.inputEntry.text : '')
const issues: Ref<Array<string>> = ref([])

const createEntrySchema = z.object({
	name: z.string().trim().min(1, { message: 'name is required' }),
	text: z.string().trim().optional()
})

export type CreateEntrySchema = z.infer<typeof createEntrySchema>


function submit() {
	const result = createEntrySchema.safeParse({
		name: nameField.value,
		text: textField.value
	})


	if (result.success) {
		const isUnique = props.entries === undefined
			|| !props.entries.map(entry => entry.name).includes(result.data.name)

		if (isUnique) {
			emit('submit', result.data)
			return
		}

		issues.value = ['name must be unique']
	} else {
		issues.value = result.error.issues.map(issue => issue.message)
	}
}


</script>

<template>
	<div class="flex gap-3 flex-col">
		<div >
			<span v-for="issue of issues" data-test="error-msg" class="text-red-800"> * {{ issue }}</span>
		</div>

		<Input placeholder="Name" v-model:model-value="nameField" />
		<Textarea placeholder="Text" v-model:model-value="textField" />
		<Button class="w-full" v-if="props.action === 'create'" @click="submit()">Create</Button>
		<Button class="w-full" v-else @click="submit()">Edit</Button>
	</div>
</template>

<style scoped></style>