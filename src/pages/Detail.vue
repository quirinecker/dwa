<script setup lang="ts">
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { entries, getDifferenceToToday } from '@/data/entries';
import { ref } from 'vue';

const probs = defineProps<{ name: string }>()
const entry = ref(entries.value.find(entry => entry.name === probs.name))

</script>

<template>
    <div id="container" class="flex w-full justify-center p-10">
        <main class="">
            <header>
                <Card v-if="entry" class="p-10">
                    <CardTitle>{{ getDifferenceToToday(entry.last_reset) }} days</CardTitle>
                    <CardDescription v-if="entry.text">
                        text is defined
                        {{ entry.text }}
                    </CardDescription>
                    <CardDescription v-else>
                        text is not defined
                    </CardDescription>
                </Card>
            </header>
        </main>
    </div>
</template>

<style scoped></style>
