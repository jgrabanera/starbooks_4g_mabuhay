import { Link } from "@inertiajs/react";
import {
    HiOutlineSquares2X2,
    HiOutlineRectangleStack,
    HiOutlineDocumentText,
} from "react-icons/hi2";

const navigationItems = [
    {
        label: "Dashboard",
        href: "admin.dashboard",
        description: "Overview and quick stats",
        isActive: () => route().current("admin.dashboard"),
        icon: HiOutlineSquares2X2,
    },
    {
        label: "Categories",
        href: "admin.categories.index",
        description: "Manage public category cards",
        isActive: () => route().current("admin.categories.*"),
        icon: HiOutlineRectangleStack,
    },
    {
        label: "Contents",
        href: "admin.contents.index",
        description: "Manage content per category tab",
        isActive: () => route().current("admin.contents.*"),
        icon: HiOutlineDocumentText,
    },
];

export default function SidebarNavigation({ user, onNavigate = null }) {
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
                        const Icon = item.icon;

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
                                        <Icon className="h-5 w-5" />
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
