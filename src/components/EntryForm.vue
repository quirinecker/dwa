<script setup lang="ts">
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { Input } from '@/components/ui/input';
import { Form, FormItem, FormLabel, FormField, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Button } from './ui/button';
import { Textarea } from '@/components/ui/textarea';

const emit = defineEmits<{
  submit: [value: CreateEntrySchema]
}>()

const props = defineProps<{
	action: 'create' | 'edit'
}>()


const createEntryZodSchema = z.object({
	name: z.string(),
	text: z.string().optional()
})

export type CreateEntrySchema = z.infer<typeof createEntryZodSchema>

const createEntrySchema = toTypedSchema(createEntryZodSchema)

</script>

<template>
	<Form :validation-schema="createEntrySchema" @submit="(val) => emit('submit', val as CreateEntrySchema)">
		<FormField v-slot="{ componentField }" name="name">
			<FormItem>
				<FormControl>
					<Input placeholder="Name" v-bind="componentField" />
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<FormField v-slot="{ componentField }" name="text">
			<FormItem>
				<FormLabel></FormLabel>
				<FormControl>
					<Textarea placeholder="Text" v-bind="componentField" />
				</FormControl>
				<FormDescription />
				<FormMessage />
			</FormItem>
		</FormField>
		<Button type="submit" class="w-full" v-if="props.action === 'create'">Create</Button>
		<Button type="submit" class="w-full" v-else>Edit</Button>
	</Form>
</template>

<style scoped></style>