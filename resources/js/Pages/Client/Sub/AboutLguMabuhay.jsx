import { Head } from "@inertiajs/react";
import { useState } from "react";
import {
    IoGridOutline,
    IoInformationCircleOutline,
    IoMailOutline,
} from "react-icons/io5";
import ClientLayout from "@/Layouts/ClientLayout";
import Organization from "./AboutComponents/Organization";
import LGU from "./AboutComponents/LGU";
import About from "./AboutComponents/About";

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
            id: "lgu",
            label: "Municipality of Mabuhay",
            mobileLabel: "lgu",
            icon: "lgu",
        },
    ];
    const [activeTab, setActiveTab] = useState("about");

    const renderTabIcon = (icon, isActive) => {
        const iconClassName = isActive ? "text-white" : "text-emerald-800";

        if (icon === "about") {
            return (
                <IoInformationCircleOutline
                    className={`h-4 w-4 ${iconClassName}`}
                />
            );
        }

        if (icon === "organization") {
            return <IoGridOutline className={`h-4 w-4 ${iconClassName}`} />;
        }

        return <IoMailOutline className={`h-4 w-4 ${iconClassName}`} />;
    };

    return (
        <>
            <Head title="About LGU Mabuhay" />
            <div className="w-full text-emerald-950">
                <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-2 pb-36 md:px-6 md:pb-40 [@media(orientation:landscape)]:pl-28 [@media(orientation:landscape)]:pb-8">
                    {activeTab === "about" ? <About /> : null}

                    {activeTab === "organization" ? <Organization /> : null}

                    {activeTab === "lgu" ? <LGU /> : null}

                    <div className="fixed inset-x-0 bottom-3 z-30 px-4 md:bottom-6 md:px-6 [@media(orientation:landscape)]:left-4 [@media(orientation:landscape)]:right-auto [@media(orientation:landscape)]:top-1/2 [@media(orientation:landscape)]:bottom-auto [@media(orientation:landscape)]:w-64 [@media(orientation:landscape)]:px-0 [@media(orientation:landscape)]:-translate-y-1/2">
                        <div className="mx-auto max-w-6xl rounded-md border border-white/70 bg-white/60 p-2 shadow-lg backdrop-blur-xl md:rounded-[1.75rem] md:p-4 [@media(orientation:landscape)]:mx-0 [@media(orientation:landscape)]:max-w-none">
                            <div
                                role="tablist"
                                aria-label="About LGU Mabuhay sections"
                                className="grid grid-cols-3 gap-2 md:gap-3 [@media(orientation:landscape)]:grid-cols-1"
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
                                            className={`flex min-h-[4.1rem] flex-col items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-center transition duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-200 md:min-h-[4.5rem] md:px-3 [@media(orientation:landscape)]:min-h-0 [@media(orientation:landscape)]:flex-row [@media(orientation:landscape)]:justify-start [@media(orientation:landscape)]:gap-3 [@media(orientation:landscape)]:px-4 [@media(orientation:landscape)]:py-3 [@media(orientation:landscape)]:text-left ${
                                                isActive
                                                    ? "bg-emerald-700 text-white shadow-lg"
                                                    : "border border-emerald-100/80 bg-white text-emerald-900 hover:-translate-y-0.5 hover:bg-emerald-50"
                                            }`}
                                        >
                                            <span
                                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border md:h-10 md:w-10 ${
                                                    isActive
                                                        ? "border-white/15 bg-white/20 text-white"
                                                        : "border-emerald-100 bg-emerald-50 text-emerald-800"
                                                }`}
                                            >
                                                {renderTabIcon(
                                                    tab.icon,
                                                    isActive,
                                                )}
                                            </span>
                                            <span className="text-[0.62rem] font-bold uppercase leading-tight tracking-[0.08em] md:text-xs [@media(orientation:landscape)]:text-sm">
                                                <span className="md:hidden [@media(orientation:landscape)]:hidden">
                                                    {tab.mobileLabel}
                                                </span>
                                                <span className="hidden md:inline [@media(orientation:landscape)]:inline">
                                                    {tab.label}
                                                </span>
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AboutLguMabuhay;

AboutLguMabuhay.layout = (page) => <ClientLayout>{page}</ClientLayout>;
