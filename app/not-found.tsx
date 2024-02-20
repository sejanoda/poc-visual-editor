import Link from 'next/link'

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link className='bg-gray-500 px-4 py-2 rounded-md hover:bg-gray-600' href="/">Return Home</Link>
        </main>
    )
}