"use server";

import { Client, ClientStatus, User } from "@/app/generated/prisma";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const serverFormSchema = z.object({
    name: z.string().min(2),
    status: z.enum(["Active", "Inactive"]),
    contact: z.string().min(2),
    avatar: z.string().min(2),
    organization: z.string().min(2),
    assignedUserId: z.number().min(1),
});

type ClientShortDetails = {
    id: number;
    name: string;
    status: ClientStatus;
    createdAt: Date;
}

export async function addClient(data: z.infer<typeof serverFormSchema>): Promise<{ success: boolean, data?: Client, error?: string}> {
    try {
        const newClient = {
          name: data.name,
          status: data.status,
          contact: data.contact,
          avatar: data.avatar,
          organization: data.organization,
          assignedUserId: data.assignedUserId,
          createdAt: new Date().toISOString(),
        }

        const createdClient = await db.client.create({ data: newClient });
        console.log('New client added to the database:', createdClient);
        revalidatePath('/');
        return { success: true, data: createdClient };
    } catch (error) {
        console.error('Failed to add new client:', error);
        return { success: false, error: String(error) };
    }
}

export async function updateClientStatus(id: number, status: ClientStatus): Promise<{ success: boolean, error?: string}> {
    try {
        const updateClient = await db.client.update({
            where: {
                id: id
            },
            data: {
                status: status
            }
        });
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to update client status:', error);
        return { success: false, error: String(error) };
    }
}

export async function getAllClientsShortDetails(): Promise<{ success: boolean, data?: ClientShortDetails [], error?: string}> {
    try {
        const clients = await db.client.findMany({
            select: {
                id: true,
                name: true,
                status: true,
                createdAt: true
            },
            orderBy: {
                id: 'asc'
            }
        });
        return { success: true, data: clients };
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return { success: false, error: String(error) };
    }
}

export async function getClientDetails(id: number): Promise<{ success: boolean, data?: Client, error?: string}> {
    try {
        const client = await db.client.findUnique({
            where: {
                id: id
            }
        });
        
        if (!client) {
            return { success: false, error: "Client not found" };
        }
        
        return { success: true, data: client };
    } catch (error) {
        console.error('Failed to fetch client details:', error);
        return { success: false, error: String(error) };
    }
}

export async function getUsers(): Promise<{ success: boolean, data?: User[], error?: string}> {
    try {
        const users = await db.user.findMany({
            orderBy: {
                id: 'asc'
            }
        });
        return { success: true, data: users };
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return { success: false, error: String(error) };
    }
}

export async function getUser(id: number): Promise<{ success: boolean, data?: User, error?: string}> {
    try {
        const user = await db.user.findUnique({
            where: {
                id: id
            }
        });
        
        if (!user) {
            return { success: false, error: "User not found" };
        }
        
        return { success: true, data: user };
    } catch (error) {
        console.error('Failed to fetch user details:', error);
        return { success: false, error: String(error) };
    }
}