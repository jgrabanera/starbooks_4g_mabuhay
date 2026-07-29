import { Head } from "@inertiajs/react";
import { useState } from "react";
import { IoCashOutline, IoDocumentTextOutline, IoReaderOutline, IoRibbonOutline } from "react-icons/io5";
import ClientLayout from "@/Layouts/ClientLayout";
import AwardPosting from "./SocialServices/AwardPosting";
import Budget from "./SocialServices/Budget";
import Memorandum from "./SocialServices/Memorandum";
import Ordinance from "./SocialServices/Ordinance";

const SocialServices = () => {
    const tabs = [
        { id: "award", label: "Award Posting", icon: "award" },
        { id: "budget", label: "Budget", icon: "budget" },
        { id: "memorandum", label: "Memorandum", icon: "memorandum" },
        { id: "ordinance", label: "Ordinance", icon: "ordinance" },
    ];
    const [activeTab, setActiveTab] = useState("award");

    const renderIcon = (icon, isActive) => {
        const iconClassName = isActive ? "text-white" : "text-emerald-800";
        if (icon === "award") {
            return <IoRibbonOutline className={`h-4 w-4 ${iconClassName}`} />;
        }
        if (icon === "budget") {
            return <IoCashOutline className={`h-4 w-4 ${iconClassName}`} />;
        }
        if (icon === "memorandum") {
            return <IoDocumentTextOutline className={`h-4 w-4 ${iconClassName}`} />;
        }
        return <IoReaderOutline className={`h-4 w-4 ${iconClassName}`} />;
    };

    return (
        <>
            <Head title="Social Services" />
            <div className="w-full text-emerald-950">
                <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-2 pb-36 md:px-6 md:pb-40 [@media(orientation:landscape)]:pl-28 [@media(orientation:landscape)]:pb-8">
                    {activeTab === "award" ? <AwardPosting /> : null}
                    {activeTab === "budget" ? <Budget /> : null}
                    {activeTab === "memorandum" ? <Memorandum /> : null}
                    {activeTab === "ordinance" ? <Ordinance /> : null}
                    <div className="fixed inset-x-0 bottom-3 z-30 px-4 md:bottom-6 md:px-6 [@media(orientation:landscape)]:left-4 [@media(orientation:landscape)]:right-auto [@media(orientation:landscape)]:top-1/2 [@media(orientation:landscape)]:bottom-auto [@media(orientation:landscape)]:w-64 [@media(orientation:landscape)]:px-0 [@media(orientation:landscape)]:-translate-y-1/2">
                        <div className="mx-auto max-w-5xl rounded-md border border-white/70 bg-white/60 p-2 shadow-lg backdrop-blur-xl md:rounded-[1.75rem] md:p-4 [@media(orientation:landscape)]:mx-0 [@media(orientation:landscape)]:max-w-none">
                            <div role="tablist" aria-label="Social services sections" className="grid grid-cols-2 gap-2 md:gap-3 [@media(orientation:landscape)]:grid-cols-1">
                                {tabs.map((tab) => {
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button key={tab.id} type="button" role="tab" aria-selected={isActive} onClick={() => setActiveTab(tab.id)} className={`flex min-h-[4.1rem] flex-col items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-center transition duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-200 md:min-h-[4.5rem] md:px-3 [@media(orientation:landscape)]:min-h-0 [@media(orientation:landscape)]:flex-row [@media(orientation:landscape)]:justify-start [@media(orientation:landscape)]:gap-3 [@media(orientation:landscape)]:px-4 [@media(orientation:landscape)]:py-3 [@media(orientation:landscape)]:text-left ${isActive ? "bg-emerald-700 text-white shadow-lg" : "border border-emerald-100/80 bg-white text-emerald-900 hover:-translate-y-0.5 hover:bg-emerald-50"}`}>
                                            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border md:h-10 md:w-10 ${isActive ? "border-white/15 bg-white/20 text-white" : "border-emerald-100 bg-emerald-50 text-emerald-800"}`}>
                                                {renderIcon(tab.icon, isActive)}
                                            </span>
                                            <span className="text-[0.62rem] font-bold uppercase leading-tight tracking-[0.08em] md:text-xs [@media(orientation:landscape)]:text-sm">{tab.label}</span>
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

export default SocialServices;

SocialServices.layout = (page) => <ClientLayout>{page}</ClientLayout>;
