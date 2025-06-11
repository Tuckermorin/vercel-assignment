
'use client';


'use client';

import { useParams } from 'next/navigation';

export default function BikeDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Bike {id}</h1>
      <p className="mt-4 text-gray-600">Details for bike {id} will go here.</p>
    </main>
  );
}

