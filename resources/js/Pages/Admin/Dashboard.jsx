import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";

export default function Dashboard({ categories = [] }) {
    return (
        <>
            <div className="space-y-6">
                <section className="rounded-[28px] bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-700 p-6 text-white shadow-xl shadow-emerald-950/10">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-200">
                                STARBOOKS 4G Mabuhay
                            </p>
                            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                                Welcome to your admin workspace
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-emerald-50/90 sm:text-base">
                                The new left navigation keeps the main admin
                                actions visible while this dashboard focuses on
                                quick monitoring and content access.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link
                                href={route("admin.categories.index")}
                                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-50"
                            >
                                Manage Categories
                            </Link>
                            <Link
                                href={route("client.categories")}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                                View Public Page
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            Total Categories
                        </p>
                        {/* <p className="mt-3 text-3xl font-bold text-gray-950">
                                {stats.categories ?? 0}
                            </p> */}
                    </article>
                    <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            Visible Categories
                        </p>
                        {/* <p className="mt-3 text-3xl font-bold text-gray-950">
                                {stats.active_categories ?? 0}
                            </p> */}
                    </article>
                    <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 xl:col-span-1">
                        <p className="text-sm font-medium text-slate-500">
                            Admin Route
                        </p>
                        <p className="mt-3 text-3xl font-bold text-slate-950">
                            /admin
                        </p>
                    </article>
                </section>

                <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-950">
                                Latest Categories
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Recently added or updated category records.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 divide-y divide-slate-100">
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="flex items-center justify-between gap-4 py-4"
                                >
                                    <div>
                                        <p className="text-sm font-semibold text-slate-950">
                                            {category.title}
                                        </p>
                                        {category.description ? (
                                            <p className="text-sm text-slate-500">
                                                {category.description}
                                            </p>
                                        ) : null}
                                    </div>
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            category.is_active
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "bg-slate-100 text-slate-600"
                                        }`}
                                    >
                                        {category.is_active
                                            ? "Active"
                                            : "Hidden"}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="py-6 text-sm text-slate-500">
                                No categories yet.
                            </p>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}

Dashboard.layout = (page) => (
    <AdminLayout user={page.props.auth.user} children={page} />
);
