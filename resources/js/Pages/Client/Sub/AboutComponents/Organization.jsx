const officeCards = [
    {
        title: "Executive Leadership",
        description:
            "Mayor, Vice Mayor, and policy leadership responsible for municipal direction and strategic priorities.",
    },
    {
        title: "Administrative Services",
        description:
            "Records, human resources, office management, and interdepartment coordination.",
    },
    {
        title: "Community Programs",
        description:
            "Social welfare support, citizen assistance, and inclusive local development initiatives.",
    },
    {
        title: "Planning and Support",
        description:
            "Finance, planning, information systems, and internal operational support units.",
    },
];

const Organization = () => {
    return (
        <div className="space-y-6">
            <section className="rounded-[1.9rem] border border-white/75 bg-white/60 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-md sm:p-8">
                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
                    Internal Structure
                </span>
                <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">
                    Organizational Structure
                </h2>
                <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
                    This section is reserved for the official organizational
                    chart of LGU Mabuhay. It can later display the approved
                    office hierarchy, division heads, reporting lines, and unit
                    assignments for the municipal government.
                </p>
            </section>

            <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                <aside className="rounded-[1.75rem] border border-white/75 bg-emerald-700 p-6 text-white shadow-[0_20px_50px_rgba(6,78,59,0.22)] sm:p-8">
                    <h3 className="text-xl font-black uppercase tracking-[0.12em] text-emerald-50">
                        Placeholder Notes
                    </h3>
                    <div className="mt-5 space-y-4">
                        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-100/90">
                                Recommended Content
                            </p>
                            <p className="mt-2 text-sm leading-6 text-white/90">
                                Approved org chart image, office titles, unit
                                descriptions, and designated contact points.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-100/90">
                                Display Format
                            </p>
                            <p className="mt-2 text-sm leading-6 text-white/90">
                                Portrait chart image, downloadable PDF, or
                                interactive hierarchy cards.
                            </p>
                        </div>
                    </div>
                </aside>

                <div className="rounded-[1.75rem] border border-dashed border-emerald-300 bg-white/70 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.1)] backdrop-blur-md sm:p-8">
                    <div className="rounded-[1.5rem] border border-emerald-200 bg-white p-6">
                        <div className="mx-auto max-w-3xl">
                            <div className="mx-auto flex w-fit flex-col items-center rounded-2xl bg-emerald-700 px-6 py-4 text-center text-white shadow-lg">
                                <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-100">
                                    Top Office
                                </span>
                                <span className="mt-2 text-lg font-black">
                                    Office of the Mayor
                                </span>
                            </div>

                            <div className="mx-auto h-8 w-1 bg-emerald-300" />

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-2xl border border-emerald-100 bg-white p-4 text-center shadow-sm">
                                    <p className="text-sm font-black uppercase tracking-[0.08em] text-emerald-800">
                                        Executive Branch
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        Placeholder for department heads and
                                        senior leadership offices.
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-emerald-100 bg-white p-4 text-center shadow-sm">
                                    <p className="text-sm font-black uppercase tracking-[0.08em] text-emerald-800">
                                        Support Offices
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        Placeholder for finance, planning, HR,
                                        records, and administrative services.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 rounded-2xl border border-dashed border-emerald-300 bg-white/80 px-5 py-10 text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                    <svg
                                        className="h-8 w-8"
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
                                </div>
                                <p className="mt-4 text-lg font-black uppercase tracking-[0.08em] text-emerald-900">
                                    Official Organization Chart Placeholder
                                </p>
                                <p className="mt-3 text-sm leading-7 text-slate-600">
                                    Replace this area with the final
                                    organizational chart image or diagram once
                                    the approved structure is available.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {officeCards.map((card) => (
                    <div
                        key={card.title}
                        className="rounded-[1.5rem] border border-white/75 bg-white/65 p-5 shadow-[0_16px_34px_rgba(15,23,42,0.08)] backdrop-blur-md"
                    >
                        <h3 className="text-sm font-black uppercase tracking-[0.08em] text-emerald-900">
                            {card.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-slate-600">
                            {card.description}
                        </p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Organization;
