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
        <div className="flex h-full flex-col border-r border-slate-200 bg-white text-slate-900">
            <div className="flex items-center justify-center gap-3 border-b border-slate-200 px-4 py-4">
                <ApplicationLogo className="h-14 md:flex hidden" />
            </div>

            <div className="flex-1 px-3 pb-5">
                <nav className="mt-3 flex flex-col gap-1.5">
                    {navigationItems.map((item) => {
                        const active = item.isActive();
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.label}
                                href={route(item.href)}
                                onClick={onNavigate ?? undefined}
                                className={`group rounded-lg border px-3 py-2 transition ${
                                    active
                                        ? "border-sky-200 bg-sky-50 text-sky-950 shadow-sm"
                                        : "border-transparent text-slate-600 hover:border-sky-100 hover:bg-sky-50/60 hover:text-slate-950"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`rounded-md border p-1.5 ${
                                            active
                                                ? "border-sky-200 bg-white text-sky-700 shadow-sm"
                                                : "border-slate-200 bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-900"
                                        }`}
                                    >
                                        <Icon className="h-[18px] w-[18px]" />
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

            <div className="border-t border-slate-200 px-3 py-4">
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
                        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                        <HiOutlineCog6Tooth className="h-5 w-5" />
                    </Link>
                </div>
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="group flex w-full items-center gap-3 rounded-lg border border-transparent px-3 py-2 text-left text-slate-600 transition hover:border-slate-200 hover:bg-slate-100 hover:text-slate-950"
                >
                    <span className="rounded-md border border-slate-200 bg-slate-100 p-1.5 text-slate-500 transition group-hover:bg-white group-hover:text-slate-900">
                        <HiOutlineArrowLeftOnRectangle className="h-[18px] w-[18px]" />
                    </span>
                    <span className="text-sm font-google-sans-semibold">
                        Sign Out
                    </span>
                </Link>
            </div>
        </div>
    );
}
