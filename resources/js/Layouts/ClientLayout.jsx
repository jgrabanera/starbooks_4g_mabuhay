import ApplicationLogo from "@/Components/ApplicationLogo";
import backgroundImage from "../../../public/assets/images/lgu_mabuhay.png";

export default function ClientLayout({ children }) {
    return (
        <div
            style={{ backgroundImage: `url(${backgroundImage})` }}
            className="min-h-screen overflow-x-hidden bg-cover bg-center bg-no-repeat"
        >
            <div className="flex min-h-screen  flex-col items-center bg-gradient-to-br from-green-300/90 via-yellow-300/80 to-orange-500/80 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
                <header className="flex w-full shrink-0 justify-center">
                    <ApplicationLogo className="h-auto w-36 max-w-[52vw] object-contain drop-shadow-sm sm:w-44 lg:w-48" />
                </header>

                <div className="relative flex w-full flex-1 items-center justify-center md:py-4 py-10 lg:py-6">
                    {/* Blur Background */}
                    <div className="pointer-events-none absolute inset-y-4 left-1/2 w-full md:max-w-[calc(100vw-2rem)] max-w-[calc(100vw-7rem)] -translate-x-1/2 rounded-2xl bg-white/50 shadow-[0_24px_70px_rgba(15,83,72,0.14)] backdrop-blur-md sm:max-w-[92vw] md:inset-y-6 lg:max-w-[60vw] lg:rounded-3xl" />

                    {/* Content */}
                    <main className="relative z-10 flex w-full items-center justify-center">
                        {children}
                    </main>
                </div>

                <footer className="flex w-full shrink-0 flex-col items-center gap-2 text-center">
                    <img
                        src="/assets/images/logos/lgu-mabuhay.png"
                        alt="LGU Mabuhay"
                        className="h-9 w-auto object-contain sm:h-11 lg:h-12"
                    />
                    <p className="text-xs font-medium leading-snug text-black sm:text-sm">
                        &copy; {new Date().getFullYear()} Starbooks 4G Mabuhay.
                        All rights reserved.
                    </p>
                </footer>
            </div>
        </div>
    );
}
