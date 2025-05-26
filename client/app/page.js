
import { redirect } from 'next/navigation';

export default function Home() {
  // Pada implementasi nyata, cek status auth dari cookies/session
  // Untuk contoh ini, kita redirect ke halaman login
  redirect('/login');
}