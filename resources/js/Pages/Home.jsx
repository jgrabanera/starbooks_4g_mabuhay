import { useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Home() {
    useEffect(() => {
        const redirectTimer = window.setTimeout(() => {
            router.visit("/categories", { replace: true });
        }, 3000);

        return () => window.clearTimeout(redirectTimer);
    }, []);

    return (
        <>
            <Head title="Home" />
            <main className="relative min-h-screen overflow-hidden bg-white">
                <div className="absolute -left-24 bottom-[-9rem] h-80 w-[24rem] rounded-[48%_52%_42%_58%/46%_43%_57%_54%] bg-gray-100 sm:-left-32 sm:bottom-[-18rem] sm:h-[36rem] sm:w-[42rem]" />
                <div className="absolute -left-32 top-[48%] h-60 w-60 -translate-y-1/2 rounded-[54%_46%_43%_57%/40%_52%_48%_60%] border border-gray-200 bg-white sm:-left-28 sm:top-[20rem] sm:h-80 sm:w-80 sm:translate-y-0" />
                <div className="absolute -right-44 top-[-7rem] h-[24rem] w-[27rem] rounded-bl-[55%] rounded-tl-[48%] bg-gradient-to-br from-orange-200 via-orange-400 to-orange-500 sm:-right-36 sm:top-[-5rem] sm:h-[42rem] sm:w-[46rem]" />
                <div className="absolute -right-20 top-[-4rem] h-[20rem] w-[22rem] rounded-bl-[55%] rounded-tl-[48%] border border-orange-200 bg-white/70 sm:right-14 sm:top-[-3rem] sm:h-[35rem] sm:w-[38rem]" />

                <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-10 sm:px-8 sm:py-12">
                    <ApplicationLogo className="h-auto max-h-[42dvh] w-[min(82vw,58rem)] object-contain drop-shadow-sm sm:max-h-[50dvh] sm:w-[min(76vw,58rem)] lg:w-[min(62vw,58rem)]" />
                </section>
            </main>
        </>
    );
}
