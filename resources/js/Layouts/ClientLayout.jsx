import ApplicationLogo from "@/Components/ApplicationLogo";
import backgroundImage from "../../../public/assets/images/lgu_mabuhay.png";

export default function ClientLayout({ children }) {
    return (
        <div
            style={{ backgroundImage: `url(${backgroundImage})` }}
            className="client-page min-h-screen overflow-x-hidden bg-cover bg-center bg-no-repeat"
        >
            <div className="client-shell flex min-h-screen  flex-col items-center bg-gradient-to-br from-green-300/90 via-yellow-300/80 to-orange-500/80 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
                <header className="client-header flex w-full shrink-0 justify-center">
                    <ApplicationLogo className="client-brand-logo h-auto w-36 max-w-[52vw] object-contain drop-shadow-sm sm:w-44 lg:w-48" />
                </header>

                <div className="client-stage relative flex w-full flex-1 items-center justify-center py-6 sm:py-8 lg:py-10">
                    {/* Blur Background */}
                    <div className="client-glass-panel pointer-events-none absolute left-1/2 top-1/2 h-[70vh] blur-sm w-full max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/55 shadow-[0_24px_70px_rgba(15,83,72,0.14)] backdrop-blur-md sm:max-w-[92vw] lg:max-w-[60vw] lg:rounded-3xl" />

                    {/* Content */}
                    <main className="client-main relative z-10 flex w-full items-center justify-center overflow-y-auto">
                        {children}
                    </main>
                </div>

                <footer className="client-footer flex w-full shrink-0 flex-col items-center gap-2 text-center">
                    <img
                        src="/assets/images/logos/lgu-mabuhay.png"
                        alt="LGU Mabuhay"
                        className="client-footer-logo h-9 w-auto object-contain sm:h-11 lg:h-12"
                    />
                    <p className="client-footer-text text-xs font-medium leading-snug text-black sm:text-sm">
                        &copy; {new Date().getFullYear()} Starbooks 4G Mabuhay.
                        All rights reserved.
                    </p>
                </footer>
            </div>
        </div>
    );
}
