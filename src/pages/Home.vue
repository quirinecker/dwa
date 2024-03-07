<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-vue-next';
import { entries, save } from '@/data/entries';
import { Drawer, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerContent, DrawerFooter, DrawerClose } from '@/components/ui/drawer';
import { Form, FormItem, FormLabel, FormField, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getDifferenceToToday } from '@/data/entries';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod'
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import moment from 'moment';

const router = useRouter()
const createEntryZodSchema = z.object({
    name: z.string(),
    text: z.string().optional()
})

type CreateEntrySchema = z.infer<typeof createEntryZodSchema>

const createEntrySchema = toTypedSchema(createEntryZodSchema)


function createEntry(value: CreateEntrySchema) {
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
                <!-- <Table> -->
                <!--     <TableCaption>List of Entries</TableCaption> -->
                <!--     <TableHeader> -->
                <!--         <TableRow> -->
                <!--             <TableHead>Name</TableHead> -->
                <!--             <TableHead>Last Accident</TableHead> -->
                <!--         </TableRow> -->
                <!--     </TableHeader> -->
                <!---->
                <!--     <TableRow v-for="entry in entries"> -->
                <!--         <TableCell> {{ entry.name }} </TableCell> -->
                <!--         <TableCell> {{ getDifferenceToToday(entry.last_reset) }} </TableCell> -->
                <!--     </TableRow> -->
                <!-- </Table> -->
            </main>
        </div>
    </ScrollArea>

    <Drawer>
        <DrawerTrigger as-child>
            <div>
                <Button variant="outline" size="icon" class="w-20 h-20 fixed right-10 bottom-10">
                    <Plus />
                </Button>
            </div>
        </DrawerTrigger>

        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Create new Entry</DrawerTitle>
            </DrawerHeader>
            <div id="content" class="p-5">
                <Form :validation-schema="createEntrySchema" @submit="(val) => createEntry(val as CreateEntrySchema)">
                    <FormField v-slot="{ componentField }" name="name">
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Name" v-bind="componentField" />
                            </FormControl>
                            <FormMessage/>
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
                    <DrawerFooter>
                        <DrawerClose>
                            <Button type="submit">Create</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </Form>
            </div>
        </DrawerContent>
    </Drawer>
</template>

<style scoped></style>
