import React from 'react';
import { columns, ClientListing } from '@/components/tables/client-list/columns';
import { DataTable } from '@/components/tables/client-list/data-table';
import { getAllClientsShortDetails } from '@/actions';

export default async function Home() {
  const getClientResponse = await getAllClientsShortDetails();
  
  // Transform the data to match ClientListing type
  const clientListing: ClientListing[] = getClientResponse.success && getClientResponse.data? getClientResponse.data: [];

  return (
    <>
      <h1>Client CRM</h1>
      <p className="mt-4 mb-4">Click on a row to view client details.</p>
      <DataTable columns={columns} data={clientListing} />
    </>
  );
}
