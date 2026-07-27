import { Head } from "@inertiajs/react";
import { useState } from "react";
import ClientLayout from "@/Layouts/ClientLayout";
import About from "./AboutComponents/about";
import Organization from "./AboutComponents/organization";
import Contacts from "./AboutComponents/contacts";

const AboutLguMabuhay = () => {
    const tabs = [
        {
            id: "about",
            label: "About LGU Mabuhay",
            mobileLabel: "About",
            number: "1",
        },
        {
            id: "organization",
            label: "Organizational Structure",
            mobileLabel: "Structure",
            number: "2",
        },
        {
            id: "contacts",
            label: "Contacts",
            mobileLabel: "Contacts",
            number: "3",
        },
    ];
    const [activeTab, setActiveTab] = useState("about");

    return (
        <>
            <Head title="About LGU Mabuhay" />
            <div className="w-full text-emerald-950">
                <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-2 py-2 pb-36 sm:px-4 sm:pb-40 [@media(orientation:landscape)]:pl-28 [@media(orientation:landscape)]:pb-8">
                    {activeTab === "about" ? <About /> : null}

                    {activeTab === "organization" ? <Organization /> : null}

                    {activeTab === "contacts" ? <Contacts /> : null}

                    <div className="fixed bottom-3 left-1/2 z-30 w-[calc(100%-1rem)] max-w-6xl -translate-x-1/2 rounded-[1.5rem] border border-white/75 bg-white/72 p-2 shadow-[0_20px_50px_rgba(15,23,42,0.16)] backdrop-blur-md sm:bottom-6 sm:w-[calc(100%-2rem)] sm:rounded-[1.75rem] sm:p-4 [@media(orientation:landscape)]:left-4 [@media(orientation:landscape)]:top-1/2 [@media(orientation:landscape)]:bottom-auto [@media(orientation:landscape)]:w-64 [@media(orientation:landscape)]:max-w-none [@media(orientation:landscape)]:translate-x-0 [@media(orientation:landscape)]:-translate-y-1/2">
                        <div
                            role="tablist"
                            aria-label="About LGU Mabuhay sections"
                            className="grid grid-cols-3 gap-2 sm:gap-3 [@media(orientation:landscape)]:grid-cols-1"
                        >
                            {tabs.map((tab) => {
                                const isActive = activeTab === tab.id;

                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        role="tab"
                                        aria-selected={isActive}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex min-h-[4.25rem] flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-center transition focus:outline-none focus:ring-4 focus:ring-yellow-200 sm:min-h-[4.5rem] sm:px-3 [@media(orientation:landscape)]:min-h-0 [@media(orientation:landscape)]:flex-row [@media(orientation:landscape)]:justify-start [@media(orientation:landscape)]:gap-3 [@media(orientation:landscape)]:px-4 [@media(orientation:landscape)]:py-3 [@media(orientation:landscape)]:text-left ${
                                            isActive
                                                ? "bg-emerald-700 text-white shadow-[0_16px_32px_rgba(6,78,59,0.24)]"
                                                : "border border-emerald-100 bg-white text-emerald-900 hover:-translate-y-0.5 hover:bg-emerald-50"
                                        }`}
                                    >
                                        <span
                                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black sm:h-8 sm:w-8 sm:text-sm ${
                                                isActive
                                                    ? "bg-white/20 text-white"
                                                    : "bg-emerald-100 text-emerald-800"
                                            }`}
                                        >
                                            {tab.number}
                                        </span>
                                        <span className="text-[0.65rem] font-bold uppercase leading-tight tracking-[0.06em] sm:text-xs [@media(orientation:landscape)]:text-sm [@media(orientation:landscape)]:tracking-[0.08em]">
                                            <span className="sm:hidden [@media(orientation:landscape)]:hidden">
                                                {tab.mobileLabel}
                                            </span>
                                            <span className="hidden sm:inline [@media(orientation:landscape)]:inline">
                                                {tab.label}
                                            </span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AboutLguMabuhay;

AboutLguMabuhay.layout = (page) => <ClientLayout>{page}</ClientLayout>;
