import ApplicationLogo from "@/Components/ApplicationLogo";
import { usePage } from "@inertiajs/react";
import backgroundImage from "../../../public/assets/images/lgu_mabuhay.jpg";

export default function ClientLayout({ children }) {
    const { auth } = usePage().props;
    const currentUser = auth?.user;
    const displayName = currentUser?.name ?? "Guest User";
    const displayRole = currentUser?.email ?? "Public Information Viewer";
    const userInitials = displayName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");

    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back();

            return;
        }

        window.location.href = route("client.categories");
    };

    return (
        <div
            style={{ backgroundImage: `url(${backgroundImage})` }}
            className="client-page min-h-screen overflow-x-hidden bg-cover bg-center bg-no-repeat"
        >
            <div className="client-shell flex min-h-screen flex-col items-center justify-between bg-gradient-to-br from-emerald-300/80 via-yellow-200/80 to-orange-400/80 px-4 py-4 sm:px-6 sm:py-5 ">
                {/* Header */}
                <div className="flex w-full items-center gap-3">
                    <div className="flex min-w-0 flex-1 justify-start">
                        <button
                            type="button"
                            onClick={handleBack}
                            aria-label="Go back to the previous page"
                            className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/65 px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-[0_12px_30px_rgba(15,23,42,0.16)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/80 focus:outline-none focus:ring-4 focus:ring-yellow-200"
                        >
                            <svg
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 18l-6-6 6-6M9 12h10"
                                />
                            </svg>
                            <span>Back</span>
                        </button>
                    </div>

                    <div className="flex min-w-0 flex-1 justify-center">
                        <ApplicationLogo className="client-brand-logo h-auto w-36 max-w-[52vw] object-contain drop-shadow-sm sm:w-44 lg:w-48" />
                    </div>

                    <div className="flex min-w-0 flex-1 justify-end">
                        <div className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/50 px-3 py-2 text-left shadow-[0_12px_30px_rgba(15,23,42,0.12)] backdrop-blur-md">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 text-sm font-bold text-white">
                                {userInitials || "GU"}
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-semibold leading-tight text-slate-900">
                                    {displayName}
                                </p>
                                <p className="text-xs font-medium text-slate-600">
                                    {displayRole}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative flex h-full w-full min-h-[92dvh] overflow-hidden [@media(orientation:landscape)]:min-h-[78dvh]">
                    <main
                        style={{ scrollbarWidth: "none" }}
                        className="client-main relative z-10 w-full  [@media(orientation:landscape)]: overflow-y-auto"
                    >
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
