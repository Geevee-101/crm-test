import React from "react";
import SetStatus from "@/components/custom/SetStatus";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import BackButton from "@/components/custom/BackButton";
import { getClientDetails, getUser } from "@/actions";

export type ClientDetails = {
  name: string
  status: "Active" | "Inactive"
  createdAt: Date
  contact: string
  avatar: string
  organization: string
  assignedUser: string
}

export default async function ClientDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const clientId = typeof id === 'string' ? parseInt(id) : 0;
  const getDataResponse = await getClientDetails(clientId);
  const clientData = getDataResponse.success && getDataResponse.data? getDataResponse.data: null;

  const getUserResponse = await getUser(clientData?.assignedUserId || -1);
  const userData = getUserResponse.success && getUserResponse.data? getUserResponse.data : null;

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <BackButton />
        <h1>Client Details</h1>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium bg-muted/100">Name</TableCell>
              <TableCell>{clientData?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium bg-muted/100">Status</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <SetStatus id={clientId} currentStatus={clientData?.status || "Unknown"} />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium bg-muted/100">Created At</TableCell>
              <TableCell>{clientData?.createdAt.toISOString().split('T')[0]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium bg-muted/100">Contact</TableCell>
              <TableCell>{clientData?.contact}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium bg-muted/100">Avatar</TableCell>
              <TableCell>{clientData?.avatar}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium bg-muted/100">Organization</TableCell>
              <TableCell>{clientData?.organization}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium bg-muted/100">Assigned User</TableCell>
              <TableCell>{userData?.name || "Unknown"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}