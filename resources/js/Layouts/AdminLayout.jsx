import { useState } from "react";
import { Head, Link } from "@inertiajs/react";

const navigationItems = [
    {
        label: "Dashboard",
        href: "admin.dashboard",
        isActive: () => route().current("admin.dashboard"),
        description: "Overview and quick stats",
        icon: (
            <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 13.5h6.75V20H4zm9.25-9.5H20v16h-6.75zm-9.25 0H10.75v6.75H4z"
                />
            </svg>
        ),
    },
    {
        label: "Categories",
        href: "admin.categories.index",
        isActive: () => route().current("admin.categories.*"),
        description: "Manage public category cards",
        icon: (
            <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6.75A2.75 2.75 0 0 1 6.75 4h10.5A2.75 2.75 0 0 1 20 6.75v2.5A2.75 2.75 0 0 1 17.25 12H6.75A2.75 2.75 0 0 1 4 9.25zm0 8A2.75 2.75 0 0 1 6.75 12h10.5A2.75 2.75 0 0 1 20 14.75v2.5A2.75 2.75 0 0 1 17.25 20H6.75A2.75 2.75 0 0 1 4 17.25z"
                />
            </svg>
        ),
    },
    {
        label: "Contents",
        href: "admin.contents.index",
        isActive: () => route().current("admin.contents.*"),
        description: "Manage content per category tab",
        icon: (
            <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 4.75h10A2.25 2.25 0 0 1 19.25 7v10A2.25 2.25 0 0 1 17 19.25H7A2.25 2.25 0 0 1 4.75 17V7A2.25 2.25 0 0 1 7 4.75Z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.5 9.25h7m-7 3.25h7m-7 3.25h4.5"
                />
            </svg>
        ),
    },
];

function SidebarContent({ user, onNavigate = null }) {
    return (
        <div className="flex h-full flex-col bg-slate-950 text-slate-100">
            <div className="border-b border-white/10 px-6 py-6">
                <Link href={route("admin.dashboard")} onClick={onNavigate}>
                    <p className="text-xs font-bold uppercase tracking-[0.32em] text-emerald-300">
                        STARBOOKS 4G
                    </p>
                    <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                        Admin Panel
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                        Clean navigation for managing kiosk content.
                    </p>
                </Link>
            </div>

            <div className="flex-1 px-4 py-6">
                <p className="px-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                    Workspace
                </p>

                <nav className="mt-4 flex flex-col gap-2">
                    {navigationItems.map((item) => {
                        const active = item.isActive();

                        return (
                            <Link
                                key={item.label}
                                href={route(item.href)}
                                onClick={onNavigate}
                                className={`group rounded-2xl border px-4 py-3 transition ${
                                    active
                                        ? "border-emerald-400/40 bg-emerald-400/10 text-white shadow-[0_0_0_1px_rgba(52,211,153,0.15)]"
                                        : "border-transparent bg-white/[0.03] text-slate-300 hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <span
                                        className={`mt-0.5 rounded-xl p-2 ${
                                            active
                                                ? "bg-emerald-300/15 text-emerald-300"
                                                : "bg-white/5 text-slate-400 group-hover:text-slate-200"
                                        }`}
                                    >
                                        {item.icon}
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold">
                                            {item.label}
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-slate-400">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="border-t border-white/10 px-4 py-5">
                <div className="rounded-2xl bg-white/[0.04] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                        Signed In
                    </p>
                    <p className="mt-3 text-sm font-semibold text-white">
                        {user.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">{user.email}</p>

                    <div className="mt-4 flex gap-2">
                        <Link
                            href={route("profile.edit")}
                            onClick={onNavigate}
                            className="inline-flex items-center rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/5"
                        >
                            Profile
                        </Link>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="inline-flex items-center rounded-full bg-emerald-400 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-300"
                        >
                            Log Out
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

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
                            <SidebarContent user={user} />
                        </div>
                    </aside>

                    <div className="flex min-h-screen flex-1 flex-col">
                        <header className="border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowingSidebar(true)
                                        }
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
                                        onClick={() =>
                                            setShowingSidebar(false)
                                        }
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
                                <SidebarContent
                                    user={user}
                                    onNavigate={() =>
                                        setShowingSidebar(false)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
}
