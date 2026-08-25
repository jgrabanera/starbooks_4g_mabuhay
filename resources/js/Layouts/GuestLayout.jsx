import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="flex min-h-screen items-start justify-center bg-slate-100 px-4 py-6 sm:items-center sm:px-6 sm:py-10">
            <div className="w-full max-w-md">
                <Link href="/">
                    <ApplicationLogo className="mx-auto h-auto w-full max-w-[220px] sm:max-w-[260px]" />
                </Link>

                <div className="mt-5 w-full rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] sm:mt-6 sm:px-6 sm:py-6">
                    {children}
                </div>
            </div>

        </div>
    );
}
