<script setup lang="ts">
import * as z from 'zod'
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Entry } from '@/data/entries';
import { ref } from 'vue';

const emit = defineEmits<{
	submit: [value: CreateEntrySchema]
}>()

const props = defineProps<{
	action: 'create' | 'edit'
	inputEntry?: Entry | undefined
}>()

const nameField = ref(props.inputEntry ? props.inputEntry.name : '')
const textField = ref(props.inputEntry ? props.inputEntry.text : '')

const createEntrySchema = z.object({
	name: z.string(),
	text: z.string().optional()
})

export type CreateEntrySchema = z.infer<typeof createEntrySchema>


function submit() {
	const result = createEntrySchema.safeParse({
		name: nameField.value,
		text: textField.value
	})

	if (result.success) {
		emit('submit', result.data)
	}
}


</script>

<template>
	<form class="flex gap-3 flex-col">
		<Input placeholder="Name" v-model:model-value="nameField" />
		<Textarea placeholder="Text" v-model:model-value="textField" />
		<Button class="w-full" v-if="props.action === 'create'" @click="submit()">Create</Button>
		<Button class="w-full" v-else @click="submit()">Edit</Button>
	</form>
</template>

<style scoped></style>