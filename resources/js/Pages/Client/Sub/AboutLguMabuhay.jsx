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
            icon: "about",
        },
        {
            id: "organization",
            label: "Organizational Structure",
            mobileLabel: "Structure",
            icon: "organization",
        },
        {
            id: "contacts",
            label: "Contacts",
            mobileLabel: "Contacts",
            icon: "contacts",
        },
    ];
    const [activeTab, setActiveTab] = useState("about");

    const renderTabIcon = (icon, isActive) => {
        const iconClassName = isActive ? "text-white" : "text-emerald-800";

        if (icon === "about") {
            return (
                <svg
                    className={`h-4 w-4 ${iconClassName}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16v-4m0-4h.01M10 3.8l-6 3.2v10l8 4 8-4V7l-6-3.2a2 2 0 00-2 0z"
                    />
                </svg>
            );
        }

        if (icon === "organization") {
            return (
                <svg
                    className={`h-4 w-4 ${iconClassName}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 5v14M7 9h10M7 15h10"
                    />
                </svg>
            );
        }

        return (
            <svg
                className={`h-4 w-4 ${iconClassName}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 7.5A2.5 2.5 0 016.5 5h11A2.5 2.5 0 0120 7.5v9A2.5 2.5 0 0117.5 19h-11A2.5 2.5 0 014 16.5v-9z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 8l7 5 7-5"
                />
            </svg>
        );
    };

    return (
        <>
            <Head title="About LGU Mabuhay" />
            <div className="w-full text-emerald-950">
                <section className="mx-auto  flex w-full max-w-6xl flex-col gap-6 px-2 py-2 pb-36 sm:px-4 sm:pb-40 [@media(orientation:landscape)]:pl-28 [@media(orientation:landscape)]:pb-8">
                    {activeTab === "about" ? <About /> : null}

                    {activeTab === "organization" ? <Organization /> : null}

                    {activeTab === "contacts" ? <Contacts /> : null}

                    <div className="fixed bottom-3 left-1/2 z-30 w-[calc(100%-1rem)] max-w-6xl -translate-x-1/2 rounded-md border border-white/70 bg-white/60 p-2 shadow-[0_24px_60px_rgba(15,23,42,0.2)] backdrop-blur-xl sm:bottom-6 sm:w-[calc(100%-2rem)] sm:rounded-[1.75rem] sm:p-4 [@media(orientation:landscape)]:left-4 [@media(orientation:landscape)]:top-1/2 [@media(orientation:landscape)]:bottom-auto [@media(orientation:landscape)]:w-64 [@media(orientation:landscape)]:max-w-none [@media(orientation:landscape)]:translate-x-0 [@media(orientation:landscape)]:-translate-y-1/2">
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
                                        className={`flex min-h-[4.1rem] flex-col items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-center transition duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-200 sm:min-h-[4.5rem] sm:px-3 [@media(orientation:landscape)]:min-h-0 [@media(orientation:landscape)]:flex-row [@media(orientation:landscape)]:justify-start [@media(orientation:landscape)]:gap-3 [@media(orientation:landscape)]:px-4 [@media(orientation:landscape)]:py-3 [@media(orientation:landscape)]:text-left ${
                                            isActive
                                                ? "bg-emerald-700 text-white shadow-[0_18px_36px_rgba(6,78,59,0.28)]"
                                                : "border border-emerald-100/80 bg-white text-emerald-900 hover:-translate-y-0.5 hover:bg-emerald-50"
                                        }`}
                                    >
                                        <span
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border sm:h-10 sm:w-10 ${
                                                isActive
                                                    ? "border-white/15 bg-white/20 text-white"
                                                    : "border-emerald-100 bg-emerald-50 text-emerald-800"
                                            }`}
                                        >
                                            {renderTabIcon(tab.icon, isActive)}
                                        </span>
                                        <span className="text-[0.62rem] font-bold uppercase leading-tight tracking-[0.08em] sm:text-xs [@media(orientation:landscape)]:text-sm">
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
