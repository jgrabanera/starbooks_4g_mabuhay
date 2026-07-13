import { useState } from "react";
import { Head } from "@inertiajs/react";
import SidebarNavigation from "@/Components/SidebarNavigation";

export default function AdminLayout({
    user,
    title,
    description,
    children,
    pageTitle,
}) {
    const [showingSidebar, setShowingSidebar] = useState(false);

    return (
        <>
            {pageTitle ? <Head title={pageTitle} /> : null}

            <div className="min-h-screen bg-slate-100">
                <div className="flex min-h-screen">
                    <aside className="hidden w-80 shrink-0 lg:block">
                        <div className="sticky top-0 h-screen">
                            <SidebarNavigation user={user} />
                        </div>
                    </aside>

                    <div className="flex min-h-screen flex-1 flex-col">
                        <header className="border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowingSidebar(true)}
                                        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950 lg:hidden"
                                    >
                                        <span className="sr-only">
                                            Open navigation
                                        </span>
                                        <svg
                                            className="h-5 w-5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 7h16M4 12h16M4 17h16"
                                            />
                                        </svg>
                                    </button>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-700">
                                            Admin Workspace
                                        </p>
                                        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                                            {title}
                                        </h2>
                                        {description ? (
                                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                                                {description}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right sm:block">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                                        Signed In
                                    </p>
                                    <p className="mt-2 text-sm font-semibold text-slate-900">
                                        {user.name}
                                    </p>
                                </div>
                            </div>
                        </header>

                        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
                            {children}
                        </main>
                    </div>
                </div>

                {showingSidebar ? (
                    <div className="fixed inset-0 z-50 flex lg:hidden">
                        <button
                            type="button"
                            className="flex-1 bg-slate-950/50 backdrop-blur-sm"
                            onClick={() => setShowingSidebar(false)}
                        >
                            <span className="sr-only">Close navigation</span>
                        </button>
                        <div className="w-full max-w-xs">
                            <div className="flex h-full flex-col">
                                <div className="flex justify-end bg-slate-950 px-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowingSidebar(false)}
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 text-slate-300 transition hover:bg-white/5 hover:text-white"
                                    >
                                        <span className="sr-only">
                                            Close navigation
                                        </span>
                                        <svg
                                            className="h-5 w-5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 6l12 12M18 6L6 18"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <SidebarNavigation
                                    user={user}
                                    onNavigate={() => setShowingSidebar(false)}
                                />
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
}
