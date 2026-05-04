import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({
    auth,
    stats = {},
    latestCategories = [],
    setupNeeded = false,
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {setupNeeded && (
                        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                            Run the database migration to enable dashboard counts and category editing.
                        </div>
                    )}

                    <section className="rounded-lg bg-gradient-to-r from-emerald-800 via-teal-700 to-sky-700 p-6 text-white shadow-sm">
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-100">
                            STARBOOKS 4G Mabuhay
                        </p>
                        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                                <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50">
                                    Manage the public category cards shown on the kiosk category screen.
                                </p>
                            </div>
                            <Link
                                href={route("admin.categories.index")}
                                className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm transition hover:bg-emerald-50"
                            >
                                Manage Categories
                            </Link>
                        </div>
                    </section>

                    <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <article className="rounded-lg bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">Total Categories</p>
                            <p className="mt-3 text-3xl font-bold text-gray-950">{stats.categories ?? 0}</p>
                        </article>
                        <article className="rounded-lg bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">Visible Categories</p>
                            <p className="mt-3 text-3xl font-bold text-gray-950">{stats.active_categories ?? 0}</p>
                        </article>
                        <article className="rounded-lg bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">
                            <p className="text-sm font-medium text-gray-500">Admin Route</p>
                            <p className="mt-3 text-3xl font-bold text-gray-950">/admin</p>
                        </article>
                    </section>

                    <section className="mt-6 rounded-lg bg-white p-5 shadow-sm">
                        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-950">Latest Categories</h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Recently added or updated category records.
                                </p>
                            </div>
                            <Link
                                href={route("categories")}
                                className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
                            >
                                View Public Page
                            </Link>
                        </div>

                        <div className="mt-4 divide-y divide-gray-100">
                            {latestCategories.length > 0 ? (
                                latestCategories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="flex items-center justify-between gap-4 py-3"
                                    >
                                        <div>
                                            <p className="text-sm font-semibold text-gray-950">
                                                {category.label}
                                            </p>
                                            <p className="text-sm text-gray-500">{category.title}</p>
                                        </div>
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                category.is_active
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "bg-gray-100 text-gray-600"
                                            }`}
                                        >
                                            {category.is_active ? "Active" : "Hidden"}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="py-6 text-sm text-gray-500">No categories yet.</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
