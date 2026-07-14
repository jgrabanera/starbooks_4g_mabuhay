import ApplicationLogo from "@/Components/ApplicationLogo";
import backgroundImage from "../../../public/assets/images/lgu_mabuhay.png";

export default function ClientLayout({ children }) {
    return (
        <div
            style={{ backgroundImage: `url(${backgroundImage})` }}
            className="client-page min-h-screen overflow-x-hidden bg-cover bg-center bg-no-repeat"
        >
            <div className="client-shell flex min-h-screen flex-col items-center bg-gradient-to-br from-emerald-300/80 via-yellow-200/80 to-orange-400/80 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
                <header className="client-header flex w-full shrink-0 justify-center">
                    <ApplicationLogo className="client-brand-logo h-auto w-36 max-w-[52vw] object-contain drop-shadow-sm sm:w-44 lg:w-48" />
                </header>

                <div className="client-stage relative flex w-full  items-start justify-center py-6 sm:py-8 md:py-5">
                    {/* Blur Background */}
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[78dvh] md:max-h-[calc(100%-1rem)] md:h-[80vh] max-w-[92vw] md:max-w-[80rem] w-full -translate-x-1/2 -translate-y-1/2 rounded-[1.25rem] lg:rounded-[1.5rem]" />

                    {/* Content */}
                    <main className="client-main relative z-10 w-full">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
