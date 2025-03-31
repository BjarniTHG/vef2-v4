import Link from 'next/link';
import { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-slate-800 text-white p-4">
                <div className='container mx-auto'>
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="text-xl font-bold hover:underline">
                                Forsíða
                            </Link>
                            <Link href="/admin" className="text-xl font-bold hover:underline">
                                Admin
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>
            
            <main className="flex-grow container mx-auto p-4">
                {children}
            </main>

            <footer className="bg-slate-800 text-white p-4">
                <div className="container mx-auto text-center">
                    <p>Verkefni 4 - Bjarni Þór {new Date().getFullYear()}</p>
                </div>
            </footer>
        </div>
    );
}