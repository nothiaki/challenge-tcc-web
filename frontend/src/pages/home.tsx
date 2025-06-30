import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import axios from 'axios'
import { Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type Task = {
  id: string,
  description: string,
  done: boolean,
  createdAt: Date
}

type newTaskData = {
  description: string
}

const newTaskFormSchema = z.object({
  description: z.string().min(1, "Description is needed!").max(255, "Description is too long!")
})

type FormSchema = z.infer<typeof newTaskFormSchema>

export function Home() {

  const apiUrl: string = "http://localhost:3000/tasks";

  const form = useForm<FormSchema>({
    resolver: zodResolver(newTaskFormSchema),
    defaultValues: {
      description: "",
    },
  })

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get<Task[]>(apiUrl);
        setTasks(response.data)
      } catch (err) {
        alert("Error while taking the tasks please reload the page");
      }
    }

    fetchTasks();

  }, [])

  const newTaskFormSubmit = async (newTaskData: newTaskData) => {
    try {
      const response = await axios.post<Task>(apiUrl, {
        description: newTaskData.description
      });

      const createdTask = response.data;

      setTasks(tasksBefore => [...tasksBefore, createdTask]);

      form.reset();
      setIsDialogOpen(false);

    } catch (err) {
      alert("Error while creating the task (" + newTaskData.description + "). Try again.");
    }
  };

  return (
    <>
      <header className="p-4 flex justify-center">
        <h2 className="font-bold text-4xl">Check List</h2>
      </header>
      <div className="flex justify-center">
        <main className="h-fit w-100 min-h-screen p-10 flex-col justify-start">
          <ul>
            {
              tasks.map((task) => {
                return (
                  <li key={task.id} className="flex items-center gap-2">
                    <Checkbox id={task.id} checked={task.done} />
                    <Label htmlFor={task.id} className="text-xl">{task.description}</Label>
                  </li>
                )
              })
            }
          </ul>
        </main>
        <div className="p-4 fixed bottom-0 right-0 flex flex-col items-end gap-2">
          <Button variant="outline" size="icon" className="size-8">
            <Trash2 />
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="icon" className="size-12">
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(newTaskFormSubmit)} className="flex flex-col gap-4">

                  <DialogHeader>
                    <DialogTitle>New Task</DialogTitle>
                    <DialogDescription>
                      Create a new task here. Click the button when you&apos;re
                      done.
                    </DialogDescription>
                  </DialogHeader>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="description">Description</FormLabel>
                        <FormControl>
                          <Input id="description" placeholder="New tasks here" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>

                    <Button type="submit">Create a new task</Button>
                  </DialogFooter>

                </form>
              </Form>
            </DialogContent>
          </Dialog>

        </div>
      </div>
      <footer className="flex align-center justify-center p-2">
        <p>
          Visit my <a href="http://github.com/nothiaki" className="underline">GitHub</a>
        </p>
      </footer>
    </>
  )
}

