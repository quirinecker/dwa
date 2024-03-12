<script setup lang="ts">
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { entries } from '@/state/entry';
import { getDifferenceToToday, save } from '@/data/entries';
import { ArrowBigLeft, MenuIcon, TrashIcon } from 'lucide-vue-next';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuItem,
	DropdownMenuContent
} from '@/components/ui/dropdown-menu';
import { Drawer, DrawerHeader, DrawerTitle, DrawerContent, DrawerDescription } from '@/components/ui/drawer';
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import moment from 'moment';
import { useMediaQuery } from '@vueuse/core';
import { CreateEntrySchema } from '@/components/EntryForm.vue';
import EntryForm from '@/components/EntryForm.vue';

const probs = defineProps<{ name: string }>()
const router = useRouter()
const entry = ref(entries.value.find(entry => entry.name === probs.name))
const confirmDialogState = ref(false)
const isDesktop = useMediaQuery('(min-width: 768px)')
const editEntryDialog = ref(false)

function deleteEntry() {
	if (entry.value === undefined) {
		toast('Deletion failed')
		return
	}

	const index = entries.value.indexOf(entry.value)

	if (index === undefined) {
		toast('Deletion failed')
		return
	}

	entries.value.splice(index, 1)
	save(entries.value)
	router.back()
}

function resetDate() {
	if (entry.value === undefined) {
		toast('reset failed')
		return
	}

	entry.value.last_reset = moment()
	confirmDialogState.value = false
	save(entries.value)
}

function editEntry(val: CreateEntrySchema) {
	console.log(val)
	if (entry.value === undefined) {
		toast('edit failed')
		return
	}

	entry.value.name = val.name
	entry.value.text = val.text
	editEntryDialog.value = false
	save(entries.value)
}

</script>

<template>
	<main v-if="entry" id="container-entry-defined" class="flex w-full h-screen items-center p-10 flex-col">
		<header class="h-2/4 flex justify-center items-center">
			<Card class="p-10 flex justify-center items-center flex-col gap-3">
				<CardTitle class="text-5xl">{{ getDifferenceToToday(entry.last_reset) }} days</CardTitle>
				<CardDescription class="text-xl" v-if="entry.text">
					{{ entry.text }}
				</CardDescription>
				<CardDescription class="text-xl" v-else>
					since last {{ entry.name }}
				</CardDescription>
			</Card>
		</header>
		<nav class="w-full flex flex-row justify-between my-4">
			<a><ArrowBigLeft class="cursor-pointer" @click="router.back()"/></a>
			<a>{{entry.name}}</a>

			<DropdownMenu>
				<DropdownMenuTrigger>
					<a><MenuIcon/></a>
				</DropdownMenuTrigger>

				<DropdownMenuContent class="mr-2">
					<DropdownMenuItem @click="() => deleteEntry()">
						<TrashIcon color="#ef4444"/>
						<span color="#ef4444">Delete</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

		</nav>
		<div id="content" class="w-full flex flex-col gap-5 items-center mt-20">
			<Button class="w-full" @click="editEntryDialog = true">Edit</Button>
			<Button class="w-full" variant="destructive" @click="confirmDialogState = true">Reset</Button>
		</div>

		<Dialog v-if="isDesktop" v-model:open="confirmDialogState">
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Confirm Reset</DialogTitle>
					<DialogDescription> Are you sure you want to reset the counter ? </DialogDescription>
					<Button variant="destructive" @click="resetDate">Confirm Reset</Button>
				</DialogHeader>
			</DialogContent>
		</Dialog>

		<Drawer v-else v-model:open="confirmDialogState">
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Confirm Reset</DrawerTitle>
					<DrawerDescription> Are you sure you want to reset the counter ? </DrawerDescription>
					<Button variant="destructive" @click="resetDate">Confirm Reset</Button>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>


		<Dialog v-if="isDesktop" v-model:open="editEntryDialog">
			<DialogContent>
				<DialogHeader>
					<DialogTitle> Edit Entry </DialogTitle>
				</DialogHeader>
				<div class="p-5">
					<EntryForm action="edit" @submit="(val) => editEntry(val)" :input-entry="entry"> </EntryForm>
				</div>
			</DialogContent>
		</Dialog>

		<Drawer v-else v-model:open="editEntryDialog">
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle> Edit Entry </DrawerTitle>
				</DrawerHeader>
				<div class="p-5">
					<EntryForm action="edit" @submit="(val) => editEntry(val)" :input-entry="entry"> </EntryForm>
				</div>
			</DrawerContent>
		</Drawer>


	</main>
</template>

<style scoped></style>