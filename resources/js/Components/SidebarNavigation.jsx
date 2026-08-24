import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import {
    HiOutlineDocumentText,
    HiOutlineArrowLeftOnRectangle,
    HiOutlineRectangleStack,
    HiOutlineSquares2X2,
    HiOutlineCog6Tooth,
    HiOutlineBeaker,
    HiOutlineFolderOpen,
    HiOutlineGlobeAsiaAustralia,
    HiOutlineInformationCircle,
    HiOutlineUsers,
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
        label: "About",
        href: "admin.about.index",
        isActive: () => route().current("admin.about.*"),
        icon: HiOutlineInformationCircle,
    },
    {
        label: "DOST Services",
        href: "admin.dost-services.index",
        isActive: () => route().current("admin.dost-services.*"),
        icon: HiOutlineBeaker,
    },
    {
        label: "Projects",
        href: "admin.projects.index",
        isActive: () => route().current("admin.projects.*"),
        icon: HiOutlineFolderOpen,
    },
    {
        label: "Social Services",
        href: "admin.social-services.index",
        isActive: () => route().current("admin.social-services.*"),
        icon: HiOutlineUsers,
    },
    {
        label: "Tourism",
        href: "admin.tourism.index",
        isActive: () => route().current("admin.tourism.*"),
        icon: HiOutlineGlobeAsiaAustralia,
    },
    {
        label: "Resources",
        href: "admin.resources.index",
        isActive: () => route().current("admin.resources.*"),
        icon: HiOutlineDocumentText,
    },
];

export default function SidebarNavigation({ user, onNavigate = null }) {
    return (
        <div className="flex h-full min-h-0 flex-col border-r border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-100/80 text-slate-900">
            <div className="border-b border-slate-200/80 px-5 py-6">
                <div className="rounded-[28px] border border-slate-200 bg-white px-4 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                    <div className="flex items-center justify-center">
                        <ApplicationLogo className="h-14" />
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-5 pt-5">
                
                <nav className="flex flex-col gap-2">
                    {navigationItems.map((item) => {
                        const active = item.isActive();
                        const Icon = item.icon;
                        const itemClasses = active
                            ? "bg-slate-300 text-black"
                            : "border-transparent bg-transparent text-slate-600 hover:bg-slate-300 hover:text-black duration-200 ease-out";
                        const iconClasses = active
                            ? "bg-white/70 text-black"
                            : "bg-slate-100 text-slate-500 hover:bg-white/10 hover:text-white";
                        const labelClasses = active
                            ? "text-black"
                            : "text-slate-700 group-hover:text-black";

                        return (
                            <Link
                                key={item.label}
                                href={route(item.href)}
                                onClick={onNavigate ?? undefined}
                                aria-current={active ? "page" : undefined}
                                className={`group rounded-xl border px-2 py-2 transition-colors duration-200 ease-out ${itemClasses}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 ${iconClasses}`}
                                    >
                                        <Icon className="h-[16px] w-[16px]" />
                                    </span>
                                    <p
                                        className={`text-sm font-google-sans-semibold transition-colors duration-200 ${labelClasses}`}
                                    >
                                        {item.label}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="border-t border-slate-200/80 bg-white/70 px-4 py-4 backdrop-blur">
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-200 px-3 py-2.5">
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                            <div className="min-w-0">
                                <p className="text-xs text-slate-500">
                                    Signed in as
                                </p>
                                <p className="truncate text-sm font-google-sans-semibold leading-tight text-slate-900">
                                    {user.name}
                                </p>
                            </div>
                        </div>
                        <Link
                            href={route("profile.edit")}
                            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
                        >
                            <HiOutlineCog6Tooth className="h-5 w-5" />
                        </Link>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-black hover:bg-black hover:text-white"
                        >
                            <HiOutlineArrowLeftOnRectangle className="h-[18px] w-[18px]" />
                            <span className="sr-only">Sign Out</span>
                        </Link>
                </div>
            </div>
        </div>
    );
}
