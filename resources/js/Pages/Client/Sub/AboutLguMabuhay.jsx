import { Head } from "@inertiajs/react";
import { useState } from "react";
import ClientLayout from "@/Layouts/ClientLayout";

const AboutLguMabuhay = () => {
    const tabs = [
        {
            id: "about",
            label: "About LGU Mabuhay",
            mobileLabel: "About",
            number: "1",
        },
        {
            id: "structure",
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
                    {activeTab === "about" ? (
                        <>
                            <div className="text-center rounded-[1.75rem] border border-white/75 bg-white/60 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-md sm:p-8">
                                <img
                                    src="/assets/images/logos/LGU-Mabuhay.png"
                                    alt="LGU Mabuhay"
                                    className="mb-5 h-24 w-auto object-contain mx-auto"
                                />

                                <span className="mx-auto inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
                                    Municipality Overview
                                </span>
                                <h1 className="mt-4 text-3xl font-black uppercase leading-tight tracking-[0.06em] text-emerald-950 sm:text-4xl">
                                    About LGU Mabuhay
                                </h1>
                                <p className="mt-4 w-full text-sm leading-7 text-slate-700 sm:text-base">
                                    The Local Government Unit of Mabuhay serves
                                    as the primary public institution for
                                    community programs, civic administration,
                                    and local development initiatives in the
                                    municipality. This page can be used to
                                    present the municipality&apos;s background,
                                    leadership values, and service commitment in
                                    a clear and approachable format for
                                    residents and visitors.
                                </p>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                                <article className="rounded-[1.75rem] border border-white/75 bg-white/55 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.1)] backdrop-blur-md sm:p-8">
                                    <h2 className="text-xl font-black uppercase tracking-[0.08em] text-emerald-900">
                                        Public Service Mission
                                    </h2>
                                    <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                                        LGU Mabuhay continues to support
                                        programs that strengthen transparent
                                        governance, responsive public service,
                                        and inclusive local growth. From
                                        administrative support to
                                        community-based initiatives, the
                                        municipality aims to make public
                                        services more accessible, organized, and
                                        people-centered.
                                    </p>
                                    <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                                        This page can be used to present the
                                        municipality&apos;s public service
                                        mission and goals in a clear and
                                        approachable format for residents and
                                        visitors.
                                    </p>
                                    <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                                        This section may later be updated with
                                        official historical background,
                                        demographic information, strategic
                                        priorities, and highlights of municipal
                                        accomplishments.
                                    </p>
                                </article>

                                <aside className="rounded-[1.75rem] border border-white/75 bg-gradient-to-br from-emerald-700/90 via-emerald-600/90 to-teal-700/90 p-6 text-white shadow-[0_20px_50px_rgba(6,78,59,0.22)] sm:p-8">
                                    <h2 className="text-lg font-black uppercase tracking-[0.12em] text-emerald-50">
                                        Quick Facts
                                    </h2>
                                    <div className="mt-5 grid gap-4">
                                        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-100/90">
                                                Office Focus
                                            </p>
                                            <p className="mt-2 text-sm leading-6 text-white/90">
                                                Governance, local services,
                                                citizen assistance, and
                                                municipal coordination.
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-100/90">
                                                Commitment
                                            </p>
                                            <p className="mt-2 text-sm leading-6 text-white/90">
                                                Delivering programs with
                                                accountability, accessibility,
                                                and service-oriented leadership.
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-100/90">
                                                Visitor Use
                                            </p>
                                            <p className="mt-2 text-sm leading-6 text-white/90">
                                                Ideal for presenting background
                                                information, municipal identity,
                                                and key public-facing updates.
                                            </p>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </>
                    ) : null}

                    {activeTab === "structure" ? (
                        <div className="rounded-[1.75rem] border border-white/75 bg-white/60 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-md sm:p-8">
                            <div className="space-y-5">
                                <h2 className="text-2xl font-black uppercase tracking-[0.08em] text-emerald-900">
                                    Organizational Structure
                                </h2>
                                <p className="text-sm leading-7 text-slate-700 sm:text-base">
                                    This section may be used to present the
                                    office structure of LGU Mabuhay, including
                                    the mayor&apos;s office, administrative
                                    divisions, frontline service units, and
                                    support departments.
                                </p>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                                        <h3 className="text-sm font-black uppercase tracking-[0.08em] text-emerald-800">
                                            Executive Office
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-700">
                                            Office of the Mayor, strategic
                                            planning, executive coordination,
                                            and policy direction.
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                                        <h3 className="text-sm font-black uppercase tracking-[0.08em] text-emerald-800">
                                            Administrative Services
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-700">
                                            Records, human resource support,
                                            documentation, and day-to-day office
                                            administration.
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                                        <h3 className="text-sm font-black uppercase tracking-[0.08em] text-emerald-800">
                                            Community Services
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-700">
                                            Public assistance, social welfare
                                            coordination, and constituent
                                            support programs.
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                                        <h3 className="text-sm font-black uppercase tracking-[0.08em] text-emerald-800">
                                            Support Units
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-700">
                                            Finance, planning, information
                                            services, and inter-office
                                            coordination functions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {activeTab === "contacts" ? (
                        <div className="rounded-[1.75rem] border border-white/75 bg-white/60 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-md sm:p-8">
                            <div className="space-y-5">
                                <h2 className="text-2xl font-black uppercase tracking-[0.08em] text-emerald-900">
                                    Contacts
                                </h2>
                                <p className="text-sm leading-7 text-slate-700 sm:text-base">
                                    Use this area for official contact details,
                                    office schedules, and public-facing
                                    communication channels for LGU Mabuhay.
                                </p>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm">
                                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                                            Office Address
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-slate-700">
                                            Municipal Hall, Mabuhay, Zamboanga
                                            Sibugay
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm">
                                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                                            Phone / Email
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-slate-700">
                                            (000) 123-4567
                                            <br />
                                            info@lgumabuhay.gov.ph
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm">
                                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                                            Office Hours
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-slate-700">
                                            Monday to Friday
                                            <br />
                                            8:00 AM - 5:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}

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
