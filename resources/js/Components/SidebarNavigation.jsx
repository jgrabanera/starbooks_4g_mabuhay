import ApplicationLogo from "@/Components/ApplicationLogo";

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

        isActive: () => route().current("admin.dashboard"),
        icon: HiOutlineSquares2X2,
    },
    {
        label: "Categories",
        href: "admin.categories.index",

        isActive: () => route().current("admin.categories.*"),
        icon: HiOutlineRectangleStack,
    },
    {
        label: "Contents",
        href: "admin.contents.index",

        isActive: () => route().current("admin.contents.*"),
        icon: HiOutlineDocumentText,
    },
];

export default function SidebarNavigation({ user, onNavigate = null }) {
    return (
        <div className="flex h-full flex-col bg-gradient-to-b from-blue-900 via-blue-900 to-indigo-950 text-slate-100">
            <div className="p-4 ">
                <Link href={route("admin.dashboard")}>
                    <div className="px-8 py-5 bg-white/80 rounded-2xl">
                        <ApplicationLogo className="h-16 w-auto " />
                    </div>
                </Link>
            </div>

            <div className="flex-1 px-4 py-6">
                <hr className="border-slate-200/5" />
                <nav className="mt-4 flex flex-col gap-2">
                    {navigationItems.map((item) => {
                        const active = item.isActive();
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.label}
                                href={route(item.href)}
                                className={`group rounded-2xl border px-4 py-3 transition ${
                                    active
                                        ? "border-sky-300/40 bg-gradient-to-r from-sky-400/20 via-blue-400/15 to-indigo-400/20 text-white shadow-[0_0_0_1px_rgba(125,211,252,0.18)]"
                                        : "border-transparent bg-white/[0.04] text-blue-100/85 hover:border-white/10 hover:bg-white/[0.08] hover:text-white"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`mt-0.5 rounded-xl p-2 ${
                                            active
                                                ? "bg-sky-300/15 text-sky-200"
                                                : "bg-white/5 text-blue-200/60 group-hover:text-sky-100"
                                        }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="text-md font-medium uppercase">
                                            {item.label}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="border-t border-white/10 px-4 py-5">
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200/45">
                        Signed In
                    </p>
                    <p className="mt-3 text-sm font-semibold text-white">
                        {user.name}
                    </p>
                    <p className="mt-1 text-sm text-blue-100/70">
                        {user.email}
                    </p>

                    <div className="mt-4 flex gap-2">
                        <Link
                            href={route("profile.edit")}
                            className="inline-flex items-center rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-blue-50 transition hover:border-white/20 hover:bg-white/10"
                        >
                            Profile
                        </Link>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="inline-flex items-center rounded-full bg-sky-300 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-sky-200"
                        >
                            Log Out
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
