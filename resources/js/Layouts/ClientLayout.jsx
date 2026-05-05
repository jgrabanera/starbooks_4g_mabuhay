import ApplicationLogo from "@/Components/ApplicationLogo";
import backgroundImage from "../../../public/assets/images/lgu_mabuhay.png";

export default function ClientLayout({ children }) {
    return (
        <div
            style={{ backgroundImage: `url(${backgroundImage})` }}
            className="min-h-screen bg-cover bg-center bg-no-repeat"
        >
            <div className="flex min-h-screen flex-col items-center justify-between gap-6 bg-gradient-to-br from-sky-400/70 via-teal-300/70 to-lime-300/70  py-10 sm:px-8 sm:py-12">
                <div>
                    {/* <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-700">
                        Starbooks 4G Mabuhay
                    </p> */}
                    <ApplicationLogo className="max-w-48 h-auto"></ApplicationLogo>
                </div>

                <main className="flex w-full flex-1 items-center justify-center">
                    {children}
                </main>

                <div className="flex flex-col items-center gap-2">
                    <img
                        src="/assets/images/logos/lgu-mabuhay.png"
                        alt="LGU Mabuhay"
                        className="h-12 w-auto"
                    />
                    <p className="text-center text-sm font-medium text-black">
                        &copy; {new Date().getFullYear()} Starbooks 4G Mabuhay.
                        All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
