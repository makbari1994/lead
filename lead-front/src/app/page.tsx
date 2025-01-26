import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-screen bg-gray-50">
    <h1 className="text-3xl font-bold mb-6">Welcome to the Lead Management System</h1>
    <p className="text-lg mb-4">Please choose an action below:</p>
    <div className="flex space-x-4">
      <Link href="/lead-form">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Collect Leads
        </button>
      </Link>
      <Link href="/admin">
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Admin Panel
        </button>
      </Link>
    </div>
  </main>
  );
}
