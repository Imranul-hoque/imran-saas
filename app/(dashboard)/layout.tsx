import Navbar from "@/components/navbar/navbar"
import Sidebar from "@/components/navbar/sidebar"
import { getApiLimit } from '@/lib/api-limit';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const count = await getApiLimit()
    return (
        <div className="relative h-full">
            <div className="md:w-72 hidden md:flex h-full bg-gray-900 md:fixed md:inset-y-0 z-50 text-white md:flex-col">
                <Sidebar count={count} />
           </div>
            <main className="md:pl-72">
                <Navbar count={count} />
                {children}
            </main>
        </div>
    )
}