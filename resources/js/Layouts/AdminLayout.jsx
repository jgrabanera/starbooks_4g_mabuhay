import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import SidebarNavigation from "@/Components/SidebarNavigation";
import { HiOutlineCog6Tooth } from "react-icons/hi2";

export default function AdminLayout({
    user,
    title,
    description,
    children,
    pageTitle,
    breadcrumbs = [],
}) {
    const [showingSidebar, setShowingSidebar] = useState(false);
    const breadcrumbItems =
        breadcrumbs.length > 0
            ? breadcrumbs
            : [{ label: "Admin Workspace" }, { label: title ?? "Dashboard" }];
    const currentPageTitle =
        breadcrumbItems[breadcrumbItems.length - 1]?.label ??
        title ??
        "Dashboard";

    const userInitials = (user?.name ?? "A")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");

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
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex flex-row items-center justify-between gap-3 w-full">
                                    <div className="flex flex-col items-start justify-center">
                                        <nav
                                            aria-label="Breadcrumb"
                                            className="flex flex-wrap items-center gap-2 text-xs font-google-sans-semibold uppercase tracking-[0.22em] text-slate-500"
                                        >
                                            {breadcrumbItems.map(
                                                (breadcrumb, index) => (
                                                    <div
                                                        key={`${breadcrumb.label}-${index}`}
                                                        className="flex items-center gap-2"
                                                    >
                                                        {index > 0 ? (
                                                            <span className="text-slate-300">
                                                                /
                                                            </span>
                                                        ) : null}
                                                        <span
                                                            className={
                                                                index ===
                                                                breadcrumbItems.length -
                                                                    1
                                                                    ? "text-blue-600"
                                                                    : ""
                                                            }
                                                        >
                                                            {breadcrumb.label}
                                                        </span>
                                                    </div>
                                                ),
                                            )}
                                        </nav>
                                        <h2 className="mt-2 text-2xl font-google-sans-semibold tracking-normal text-slate-950">
                                            {currentPageTitle}
                                        </h2>
                                    </div>

                                    <div>
                                        <div className="md:flex items-center justify-between gap-4 hidden">
                                            <div className="flex items-center gap-3 ">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 text-sm font-bold text-slate-700">
                                                    {userInitials}
                                                </div>
                                                <div>
                                                    <p className="text-sm text-slate-500">
                                                        Welcome back,
                                                    </p>
                                                    <p className="text-md font-google-sans-semibold leading-tight text-slate-900">
                                                        {user.name}
                                                    </p>
                                                </div>
                                            </div>
                                            <Link
                                                href={route("profile.edit")}
                                                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
                                            >
                                                <HiOutlineCog6Tooth className="h-5 w-5" />
                                            </Link>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowingSidebar(true)
                                            }
                                            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950 md:hidden"
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
                                    </div>
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
                            className="flex-1 bg-slate-950/35 backdrop-blur-sm"
                            onClick={() => setShowingSidebar(false)}
                        >
                            <span className="sr-only">Close navigation</span>
                        </button>
                        <div className="w-full max-w-xs overflow-hidden border-l border-slate-200 bg-white shadow-2xl">
                            <div className="flex h-full flex-col">
                                <div className="flex justify-end border-b border-slate-200 bg-white px-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowingSidebar(false)}
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
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
