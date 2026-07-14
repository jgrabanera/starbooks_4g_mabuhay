import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";

export default function Dashboard({ categories = [] }) {
    return (
        <>
            <div className="space-y-6">
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
            </div>
        </>
    );
}

Dashboard.layout = (page) => (
    <AdminLayout
        user={page.props.auth.user}
        title="Dashboard"
        breadcrumbs={[{ label: "Admin Workspace" }, { label: "Dashboard" }]}
        children={page}
    />
);
