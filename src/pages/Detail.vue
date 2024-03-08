<script setup lang="ts">
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { entries, getDifferenceToToday } from '@/data/entries';
import { ArrowBigLeft, MenuIcon, TrashIcon } from 'lucide-vue-next';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuItem,
	DropdownMenuContent
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const probs = defineProps<{ name: string }>()
const router = useRouter()
const entry = ref(entries.value.find(entry => entry.name === probs.name))

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
					<DropdownMenuItem>
						<TrashIcon color="#ef4444"/>
						<span color="#ef4444">Delete</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</nav>
		<div id="content" class="w-full flex flex-col gap-5 items-center mt-20">
			<Button class="w-full">Edit</Button>
			<Button class="w-full" variant="destructive">Reset</Button>
		</div>
	</main>
</template>

<style scoped></style>