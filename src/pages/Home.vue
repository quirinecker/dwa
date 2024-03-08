<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-vue-next';
import { entries, save } from '@/data/entries';
import { Drawer, DrawerHeader, DrawerTitle, DrawerContent } from '@/components/ui/drawer';
import { Dialog, DialogHeader, DialogTitle, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import EntryForm from '@/components/EntryForm.vue'
import { CreateEntrySchema } from '@/components/EntryForm.vue'
import { getDifferenceToToday } from '@/data/entries';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import moment from 'moment';
import { ref } from 'vue';
import { useMediaQuery } from '@vueuse/core';

const isDesktop = useMediaQuery('(min-width: 768px)')
const createDrawerState = ref(false)
const router = useRouter()

async function createEntry(value: CreateEntrySchema) {
	if (entries.value.map(entry => entry.name).includes(value.name)) {
		toast('Accident Entry allready exists', {
			important: true,
			description: 'please use a unique name'
		})

		return
	}

	entries.value.push({
		last_reset: moment(),
		name: value.name,
		text: value.text && value.text.trim() !== ''
			? value.text : undefined
	})

	save()
	createDrawerState.value = false
}

function openDetailWithName(name: string) {
	console.log('opening', name)
	router.push({
		path: `${name}`,
	})
}

</script>

<template>
	<ScrollArea class="w-full">
		<div class="w-full flex justify-center flex-col items-center">
			<header id="title" class="flex w-full h-56 justify-center items-center flex-row">Accident Board</header>
			<main class="wrapper sm:w-3/4 w-11/12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
				<Button v-for="entry in entries" class="w-full p-10 flex flex-col items-center gap-2"
					@click="openDetailWithName(entry.name)">
					<span>{{ entry.name }}</span>
					<Badge variant="secondary">{{ getDifferenceToToday(entry.last_reset) }} days</Badge>
				</Button>
			</main>
		</div>
	</ScrollArea>


	<div id="placeholder" class="h-32"></div>

	<div class="fixed bottom-0 w-full h-28 p-5 flex justify-center md:justify-end items-center shadow-2xl shadow-black bg-white md:shadow-transparent md:bg-transparent">
		<Button size="icon" class="h-20 md:w-20 w-11/12" @click="createDrawerState = true">
			<Plus />
		</Button>
	</div>

	<Dialog v-if="isDesktop" v-model:open="createDrawerState">
		<DialogContent>
			<DialogHeader>
				<DialogTitle> Create new Entry </DialogTitle>
			</DialogHeader>
			<div class="p-5">
				<EntryForm action="create" @submit="(val) => createEntry(val)"> </EntryForm>
			</div>
		</DialogContent>
	</Dialog>

	<Drawer v-else v-model:open="createDrawerState">
		<DrawerContent>
			<DrawerHeader>
				<DrawerTitle>Create new Entry</DrawerTitle>
			</DrawerHeader>
			<div class="p-5">
				<EntryForm action="create" @submit="(val) => createEntry(val)"> </EntryForm>
			</div>
		</DrawerContent>
	</Drawer>
</template>

<style scoped></style>