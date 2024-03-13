<script setup lang="ts">
import { Entry, getDifferenceToToday } from '@/data/entries';

defineProps<{
	entries: Entry[]
}>()

const emit = defineEmits<{
  openDetail: [value: string] // named tuple syntax
}>()

function openDetailWith(name: string) {
	emit('openDetail', name)
}

</script>

<template>
	<ScrollArea class="w-full">
		<div class="w-full flex justify-center flex-col items-center">
			<header id="title" class="flex w-full h-56 justify-center items-center flex-row">Accident Board</header>
			<main class="wrapper sm:w-3/4 w-11/12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
				<Button v-for="entry in entries" class="w-full p-10 flex flex-col items-center gap-2"
					@click="openDetailWith(entry.name)">
					<span>{{ entry.name }}</span>
					<Badge variant="secondary">{{ getDifferenceToToday(entry.last_reset) }} days</Badge>
				</Button>
			</main>
		</div>
	</ScrollArea>
</template>