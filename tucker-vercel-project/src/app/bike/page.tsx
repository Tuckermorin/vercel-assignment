import { redirect } from 'next/navigation';

export default function BikePage() {
  // Redirect to browse page since /bike without an ID doesn't make sense
  redirect('/browse');
}