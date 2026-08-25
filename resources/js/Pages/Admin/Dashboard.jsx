import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/Modal";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import {
    HiOutlineArrowRight,
    HiOutlineBeaker,
    HiOutlineChartBar,
    HiOutlineCursorArrowRays,
    HiOutlineDocumentText,
    HiOutlineArrowDownTray,
    HiOutlineFolderOpen,
    HiOutlineGlobeAsiaAustralia,
    HiOutlineInformationCircle,
    HiOutlinePresentationChartLine,
    HiOutlinePrinter,
    HiOutlineUsers,
} from "react-icons/hi2";

const cmsSections = [
    ["About", "About, organization, and LGU information", "admin.about.index", HiOutlineInformationCircle],
    ["DOST Services", "DOST IX programs, services, and posts", "admin.dost-services.index", HiOutlineBeaker],
    ["Projects", "Completed and ongoing LGU projects", "admin.projects.index", HiOutlineFolderOpen],
    ["Social Services", "Awards, budgets, memorandums, and ordinances", "admin.social-services.index", HiOutlineUsers],
    ["Tourism", "Events, festivities, and tourism sites", "admin.tourism.index", HiOutlineGlobeAsiaAustralia],
    ["Resources", "Public LGU documents and resources", "admin.resources.index", HiOutlineDocumentText],
];

const plannedAnalytics = [
    ["Daily / Weekly / Monthly visitors", "Visitor growth and return frequency", HiOutlineChartBar],
    ["Most viewed content", "Rank content by total public views", HiOutlinePresentationChartLine],
    ["Most accessed categories", "See which categories attract the most visits", HiOutlineCursorArrowRays],
    ["User activity trends", "Track engagement patterns over time", HiOutlineUsers],
];

const toLocalDateValue = (date) => {
    const timezoneOffset = date.getTimezoneOffset() * 60_000;

    return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 10);
};

export default function Dashboard({ categories = [] }) {
    const [reportAction, setReportAction] = useState(null);
    const [reportStartDate, setReportStartDate] = useState(() => {
        const date = new Date();
        date.setDate(1);
        return toLocalDateValue(date);
    });
    const [reportEndDate, setReportEndDate] = useState(() => toLocalDateValue(new Date()));
    const [printCoverage, setPrintCoverage] = useState(null);
    const visibleCategories = categories.filter((category) => category.is_active).length;
    const hiddenCategories = categories.length - visibleCategories;
    const describedCategories = categories.filter((category) => category.description?.trim()).length;
    const visibilityRate = categories.length > 0 ? Math.round((visibleCategories / categories.length) * 100) : 0;
    const descriptionRate = categories.length > 0 ? Math.round((describedCategories / categories.length) * 100) : 0;
    const contentCategories = categories.filter((category) => category.slug !== "about-lgu-mabuhay");
    const totalContent = contentCategories.reduce((total, category) => total + Number(category.content_count || 0), 0);
    const highestContentCount = Math.max(...contentCategories.map((category) => Number(category.content_count || 0)), 1);

    const downloadAnalyticsReport = () => {
        const escapeCsvValue = (value) => {
            const stringValue = String(value ?? "");
            const protectedValue = /^[=+@-]/.test(stringValue) ? `'${stringValue}` : stringValue;

            return `"${protectedValue.replaceAll('"', '""')}"`;
        };
        const rows = [
            ["REPORT DATE COVERAGE"],
            ["From", reportStartDate],
            ["To", reportEndDate],
            [],
            ["CONTENT BY CATEGORY"],
            ["Category", "Content count"],
            ...contentCategories.map((category) => [
                category.title,
                category.content_count || 0,
            ]),
            ["Total records", totalContent],
            [],
            ["VISITOR AND ENGAGEMENT ANALYTICS"],
            ["Metric", "Description", "Status"],
            ...plannedAnalytics.map(([label, description]) => [
                label,
                description,
                "No data yet",
            ]),
        ];
        const csv = rows.map((row) => row.map(escapeCsvValue).join(",")).join("\r\n");
        const reportBlob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        const downloadUrl = URL.createObjectURL(reportBlob);
        const downloadLink = document.createElement("a");

        downloadLink.href = downloadUrl;
        downloadLink.download = `Starbooks4G-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
        downloadLink.click();
        URL.revokeObjectURL(downloadUrl);
    };

    const confirmReportAction = () => {
        const selectedAction = reportAction;

        setReportAction(null);

        if (selectedAction === "download") {
            downloadAnalyticsReport();
            return;
        }

        if (selectedAction === "print") {
            setPrintCoverage({ start: reportStartDate, end: reportEndDate });
            window.setTimeout(() => window.print(), 150);
        }
    };
    const hasInvalidDateCoverage = !reportStartDate || !reportEndDate || reportStartDate > reportEndDate;
    return (
        <>
        <Head title="Dashboard" />
        <div className="min-w-0 space-y-4 sm:space-y-5">
            {printCoverage ? (
                <div className="hidden print:block">
                    <h1 className="text-xl font-bold">Dashboard analytics report</h1>
                    <p className="text-sm">Date coverage: {printCoverage.start} to {printCoverage.end}</p>
                </div>
            ) : null}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="bg-gradient-to-r from-sky-50 via-white to-emerald-50/60 px-4 py-4 sm:px-6 sm:py-5">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">Admin overview</p>
                    <div className="mt-1 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-950">Content dashboard</h1>
                            <p className="mt-1 text-sm text-slate-600">Review public categories and jump into any CMS section.</p>
                        </div>
                        <div className="grid w-full grid-cols-2 gap-2 self-start sm:flex sm:w-auto sm:flex-wrap">
                            <button type="button" onClick={() => setReportAction("download")} className="inline-flex items-center justify-center gap-2 rounded-lg border border-sky-200 bg-white px-3 py-2 text-sm font-semibold text-sky-700 shadow-sm transition hover:bg-sky-50 hover:text-sky-900">
                                Generate report
                                <HiOutlineArrowDownTray className="h-4 w-4" />
                            </button>
                            <button type="button" onClick={() => setReportAction("print")} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-950">
                                Print
                                <HiOutlinePrinter className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] xl:gap-5">
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
                        <h2 className="font-bold text-slate-950">Category analytics</h2>
                        <p className="mt-0.5 text-sm text-slate-500">A quick health check of public category content.</p>
                    </div>
                    <div className="grid gap-5 p-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:p-5">
                        <div className="relative mx-auto h-36 w-36 rounded-full" style={{ background: `conic-gradient(#0ea5e9 ${visibilityRate}%, #e2e8f0 0)` }}>
                            <div className="absolute inset-4 flex flex-col items-center justify-center rounded-full bg-white">
                                <span className="text-3xl font-bold text-slate-950">{visibilityRate}%</span>
                                <span className="text-xs text-slate-500">visible</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between gap-3 text-sm">
                                    <span className="font-medium text-slate-700">Public visibility</span>
                                    <span className="font-bold text-slate-950">{visibleCategories} of {categories.length}</span>
                                </div>
                                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                                    <div className="h-full rounded-full bg-sky-500" style={{ width: `${visibilityRate}%` }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between gap-3 text-sm">
                                    <span className="font-medium text-slate-700">Description coverage</span>
                                    <span className="font-bold text-slate-950">{descriptionRate}%</span>
                                </div>
                                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                                    <div className="h-full rounded-full bg-emerald-500" style={{ width: `${descriptionRate}%` }} />
                                </div>
                            </div>
                            <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-600">
                                {hiddenCategories > 0 ? `${hiddenCategories} ${hiddenCategories === 1 ? "category is" : "categories are"} currently hidden from the public site.` : "All categories are currently visible on the public site."}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col justify-between gap-2 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
                    <div>
                        <h2 className="font-bold text-slate-950">Visitor and engagement analytics</h2>
                        <p className="mt-0.5 text-sm text-slate-500">Prepared for future client-side activity tracking.</p>
                    </div>
                    <span className="self-start rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700">Tracking not connected</span>
                </div>
                <ul className="divide-y divide-slate-100 px-4 sm:px-5">
                    {plannedAnalytics.map(([label, description, Icon]) => (
                        <li key={label} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-1 py-3 sm:flex">
                            <span className="inline-flex shrink-0 rounded-lg border border-sky-100 bg-sky-50 p-2 text-sky-700">
                                <Icon className="h-[18px] w-[18px]" />
                            </span>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-bold text-slate-800">{label}</p>
                                <p className="text-xs leading-5 text-slate-500 sm:truncate">{description}</p>
                            </div>
                            <span className="col-start-2 shrink-0 text-xs font-semibold text-slate-400">No data yet</span>
                        </li>
                    ))}
                </ul>
                </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col justify-between gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="font-bold text-slate-950">Content by category</h2>
                        <p className="mt-0.5 text-sm text-slate-500">Published and hidden content records in each CMS category.</p>
                    </div>
                    <div className="self-start rounded-lg border border-sky-100 bg-sky-50 px-3 py-1.5 text-sm text-sky-800">
                        <span className="font-bold">{totalContent}</span> total records
                    </div>
                </div>
                {contentCategories.length > 0 ? (
                    <div className="grid gap-x-8 gap-y-4 p-4 sm:p-5 lg:grid-cols-2">
                        {contentCategories.map((category) => {
                            const contentCount = Number(category.content_count || 0);
                            const barWidth = Math.max((contentCount / highestContentCount) * 100, contentCount > 0 ? 4 : 0);

                            return (
                                <div key={category.id}>
                                    <div className="mb-1.5 flex items-center justify-between gap-3">
                                        <span className="truncate text-sm font-semibold text-slate-700">{category.title}</span>
                                        <span className="shrink-0 text-sm font-bold text-slate-950">{contentCount}</span>
                                    </div>
                                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                                        <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-sky-600 transition-all" style={{ width: `${barWidth}%` }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="px-5 py-8 text-center text-sm text-slate-500">No category content is available yet.</p>
                )}
            </section>

            <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] xl:gap-5">
                <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 px-5 py-4">
                        <h2 className="font-bold text-slate-950">CMS sections</h2>
                        <p className="mt-0.5 text-sm text-slate-500">Choose an area to update its public content.</p>
                    </div>
                    <div className="grid min-w-0 gap-2 p-3 md:grid-cols-2">
                        {cmsSections.map(([label, description, routeName, Icon]) => (
                            <Link
                                key={routeName}
                                href={route(routeName)}
                                className="group grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 gap-y-1 rounded-xl border border-transparent p-3 transition hover:border-sky-100 hover:bg-sky-50/60 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center"
                            >
                                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition group-hover:border-sky-200 group-hover:bg-white group-hover:text-sky-700">
                                    <Icon className="h-[18px] w-[18px]" />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block break-words text-sm font-bold text-slate-800">{label}</span>
                                    <span className="mt-0.5 block text-xs leading-5 text-slate-500">{description}</span>
                                </span>
                                <HiOutlineArrowRight className="hidden h-4 w-4 shrink-0 self-center text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-sky-600 sm:block" />
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
                        <div>
                            <h2 className="font-bold text-slate-950">Recent categories</h2>
                            <p className="mt-0.5 text-sm text-slate-500">Latest content groups added.</p>
                        </div>
                        <Link href={route("admin.categories.index")} className="text-xs font-semibold text-sky-700 hover:text-sky-900">View all</Link>
                    </div>
                    <div className="divide-y divide-slate-100 px-5">
                        {categories.length > 0 ? categories.slice(0, 5).map((category) => (
                            <div key={category.id} className="flex items-center justify-between gap-3 py-3">
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-slate-800">{category.title}</p>
                                    <p className="truncate text-xs text-slate-500">{category.description || "No description provided"}</p>
                                </div>
                                <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${category.is_active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                                    {category.is_active ? "Visible" : "Hidden"}
                                </span>
                            </div>
                        )) : (
                            <div className="py-8 text-center">
                                <p className="text-sm font-semibold text-slate-700">No categories yet</p>
                                <p className="mt-1 text-xs text-slate-500">Create a category to see it summarized here.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            <Modal show={reportAction !== null} maxWidth="lg" onClose={() => setReportAction(null)}>
                <div className="border-b border-slate-100 px-5 py-4">
                    <h2 className="text-lg font-bold text-slate-950">
                        Select report date coverage
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">Choose the period to display in the {reportAction === "print" ? "printed" : "generated"} report.</p>
                </div>

                <div className="space-y-3 p-5">
                    <div className="grid gap-3 sm:grid-cols-2">
                        <label className="block">
                            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">From</span>
                            <input type="date" value={reportStartDate} max={reportEndDate || undefined} onChange={(event) => setReportStartDate(event.target.value)} className="mt-1 block w-full rounded-lg border-slate-200 text-sm text-slate-700 shadow-sm focus:border-sky-300 focus:ring-sky-200" />
                        </label>
                        <label className="block">
                            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">To</span>
                            <input type="date" value={reportEndDate} min={reportStartDate || undefined} onChange={(event) => setReportEndDate(event.target.value)} className="mt-1 block w-full rounded-lg border-slate-200 text-sm text-slate-700 shadow-sm focus:border-sky-300 focus:ring-sky-200" />
                        </label>
                    </div>
                    {hasInvalidDateCoverage ? <p className="text-xs font-semibold text-rose-600">Select a valid date range. The From date cannot be later than the To date.</p> : null}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                        <p className="text-sm font-bold text-slate-800">Content by category</p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            Includes {contentCategories.length} CMS categories, individual content counts, and {totalContent} total records. About is excluded.
                        </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                        <p className="text-sm font-bold text-slate-800">Visitor and engagement analytics</p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            Includes {plannedAnalytics.length} planned visitor metrics and their current tracking status.
                        </p>
                    </div>
                    <p className="text-xs text-slate-400">
                        {reportAction === "print" ? "Your browser print dialog will open after confirmation." : "A CSV file containing this coverage will be downloaded."}
                    </p>
                </div>

                <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end">
                    <button type="button" onClick={() => setReportAction(null)} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                        Cancel
                    </button>
                    <button type="button" onClick={confirmReportAction} disabled={hasInvalidDateCoverage} className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50">
                        {reportAction === "print" ? <HiOutlinePrinter className="h-4 w-4" /> : <HiOutlineArrowDownTray className="h-4 w-4" />}
                        {reportAction === "print" ? "Continue to print" : "Generate CSV"}
                    </button>
                </div>
            </Modal>
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
