import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import {
    HiOutlineDocumentText,
    HiOutlineArrowLeftOnRectangle,
    HiOutlineRectangleStack,
    HiOutlineSquares2X2,
    HiOutlineCog6Tooth,
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
        <div className="flex h-full flex-col border-r border-slate-200 bg-white text-slate-900">
            <div className="flex items-center justify-center gap-3 border-b border-slate-200 px-4 py-4">
                <ApplicationLogo className="h-14 md:flex hidden" />
            </div>

            <div className="flex-1 px-4 pb-6">
                <nav className="mt-4 flex flex-col gap-2">
                    {navigationItems.map((item) => {
                        const active = item.isActive();
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.label}
                                href={route(item.href)}
                                className={`group rounded-2xl px-4 py-3 transition ${
                                    active
                                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-[0_14px_28px_rgba(59,130,246,0.28)]"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`rounded-xl p-2 ${
                                            active
                                                ? "bg-white/15 text-white"
                                                : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
                                        }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <p className="text-sm font-google-sans-semibold">
                                        {item.label}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="border-t border-slate-200 px-4 py-5">
                <div className="flex items-center justify-between gap-4 md:hidden p-5">
                    <div className="flex flex-row items-center justify-between gap-3 ">
                        <div>
                            <p className="text-sm text-slate-500">
                                Welcome back,
                            </p>
                            <p className="text-sm font-google-sans-semibold leading-tight text-slate-900">
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
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                >
                    <span className="rounded-xl bg-slate-100 p-2 text-slate-500">
                        <HiOutlineArrowLeftOnRectangle className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-google-sans-semibold">
                        Sign Out
                    </span>
                </Link>
            </div>
        </div>
    );
}
