import { useState } from "react";
import { Head } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import SidebarNavigation from "@/Components/SidebarNavigation";

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
                                <div className="flex items-start gap-3">
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
                                                                    ? "text-emerald-700"
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
                                    {/* Burger Menu Button */}
                                    <button
                                        type="button"
                                        onClick={() => setShowingSidebar(true)}
                                        className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950 "
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

                                <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right lg:block">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                                        Signed In
                                    </p>
                                    <div className="mt-2 flex items-center justify-end gap-2">
                                        <p className="text-sm font-semibold text-slate-900">
                                            {user.name}
                                        </p>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <button
                                                    type="button"
                                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                                                >
                                                    <svg
                                                        className="h-4 w-4"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content
                                                align="right"
                                                width="48"
                                                contentClasses="py-1 bg-white"
                                            >
                                                <Dropdown.Link
                                                    href={route("profile.edit")}
                                                >
                                                    Profile
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
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
                            className="flex-1 bg-slate-950/50 backdrop-blur-sm"
                            onClick={() => setShowingSidebar(false)}
                        >
                            <span className="sr-only">Close navigation</span>
                        </button>
                        <div className="w-full max-w-xs">
                            <div className="flex h-full flex-col">
                                <div className="flex justify-end bg-gradient-to-b from-sky-950 via-blue-900 to-indigo-950 px-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowingSidebar(false)}
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 text-blue-100 transition hover:bg-white/10 hover:text-white"
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
