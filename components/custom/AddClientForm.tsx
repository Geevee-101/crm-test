"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from "react"

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
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addClient, getUsers } from "@/actions";
import { FormTextField } from "./forms/FormTextField"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  status: z.enum(["Active", "Inactive"],{
    message: "Please select a status.",
  }),
  contact: z.string().min(2, {
    message: "Contact must be at least 2 characters.",
  }),
  avatar: z.string().min(2, {
    message: "Avatar must be at least 2 characters.",
  }),
  organization: z.string().min(2, {
    message: "Organization must be at least 2 characters.",
  }),
  assignedUserId: z.number().min(1, {
    message: "Please assign a user.",
  }),
})

export default function AddClientForm() {
  const [users, setUsers] = useState<{ id: number, name: string }[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getUsers();
        if (result.success && result.data) {
          setUsers(result.data);
        } else {
          console.error('Failed to fetch users:', result.error);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      status: "Active",
      contact: "",
      avatar: "",
      organization: "",
      assignedUserId: 0,
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const result = await addClient(values);
      
      if (result.success) {
        console.log('New client added to the database:', result.data);
        alert('New client added.');
        form.reset();
      } else {
        console.error('Failed to add new client:', result.error);
        alert('Failed to add new client.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while adding the client.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Add New Client
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new client.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id="add-client-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormTextField form={form} name="name" label="Name" placeholder="Enter name" />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>    
                </FormItem>
              )}
            />
            <FormTextField form={form} name="contact" label="Contact" placeholder="Enter contact" />
            <FormTextField form={form} name="avatar" label="Avatar" placeholder="Enter avatar" />
            <FormTextField form={form} name="organization" label="Organization" placeholder="Enter organization" />
            <FormField
              control={form.control}
              name="assignedUserId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned User</FormLabel>
                  <Select onValueChange={(value) => field.onChange(Number(value))} disabled={isLoadingUsers}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={isLoadingUsers ? "Loading users..." : "Select assigned user"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id.toString()}>
                          {user.name}
                        </SelectItem>
                      ))}
                      {users.length === 0 && !isLoadingUsers && (
                        <SelectItem value="no-users" disabled>
                          No users found
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>    
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button form="add-client-form" type="submit" className="cursor-pointer" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Submit"}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline" className="cursor-pointer">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}