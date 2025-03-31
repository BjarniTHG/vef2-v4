import Link from 'next/link';
import { ReactNode } from 'react';

type AdminLayoutProps = {
    children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-slate-800 text-white p-4">
                <div className="container mx-auto">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="text-xl font-bold hover:underline">
                                Verkefni 4!
                            </Link>
                            <Link href="/" className="text-xl font-bold hover:underline">
                                Aftur á forsíðu
                            </Link>
                            <Link href="/admin" className="text-xl font-bold hover:underline">
                                Admin
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="flex-grow container mx-auto p-4">
                <div className="bg-slate-800 shadow-md rounded-lg p-6">
                    {children}
                </div>
            </main>

            <footer className="bg-slate-800 text-white p-4">
                <div className="container mx-auto text-center">
                    <p>Verkefni 4 unnið af Bjarna :D</p>
                </div>
            </footer>
        </div>
    )
}