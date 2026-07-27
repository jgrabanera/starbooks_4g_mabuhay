const contactCards = [
    {
        title: "Office Address",
        value: "Municipal Hall, Mabuhay, Zamboanga Sibugay, Philippines",
    },
    {
        title: "Phone / Email",
        value: "(000) 123-4567\ninfo@lgumabuhay.gov.ph",
    },
    {
        title: "Office Hours",
        value: "Monday to Friday\n8:00 AM - 5:00 PM",
    },
];

const serviceChannels = [
    "General inquiries and public information assistance",
    "Citizen service coordination and office referrals",
    "Program announcements and municipal activity updates",
];

const Contacts = () => {
    return (
        <div className="space-y-6">
            <section className="rounded-[1.9rem] border border-white/75 bg-white/60 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-md sm:p-8">
                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
                    Connect With LGU Mabuhay
                </span>
                <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">
                    Contacts
                </h2>
                <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
                    Use this section for official municipal contact details,
                    office schedules, communication channels, and public-facing
                    assistance information for residents and visitors.
                </p>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
                {contactCards.map((card) => (
                    <div
                        key={card.title}
                        className="rounded-[1.5rem] border border-white/80 bg-white/80 p-5 shadow-[0_16px_34px_rgba(15,23,42,0.08)] backdrop-blur-md"
                    >
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                            {card.title}
                        </p>
                        <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">
                            {card.value}
                        </p>
                    </div>
                ))}
            </section>

            <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                <article className="rounded-[1.75rem] border border-white/75 bg-white/60 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-md sm:p-8">
                    <h3 className="text-2xl font-black text-slate-950">
                        Public Assistance
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                        Residents may use this area to find updated office
                        details, communication procedures, and service contact
                        points for inquiries related to municipal programs,
                        permits, public information, and citizen support.
                    </p>

                    <div className="mt-6 grid gap-4">
                        {serviceChannels.map((channel) => (
                            <div
                                key={channel}
                                className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4 text-sm font-semibold leading-6 text-emerald-900"
                            >
                                {channel}
                            </div>
                        ))}
                    </div>
                </article>

                <aside className="overflow-hidden rounded-[1.75rem] border border-white/75 bg-emerald-700 shadow-[0_20px_50px_rgba(6,78,59,0.22)]">
                    <div
                        className="min-h-[20rem] bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('/assets/images/lgu_mabuhay2.png')",
                        }}
                    >
                        <div className="flex min-h-[20rem] flex-col justify-end bg-slate-950/45 p-6 text-white sm:p-8">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-100">
                                Municipal Service Desk
                            </p>
                            <h3 className="mt-3 text-2xl font-black">
                                Friendly, clear, and accessible public service
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-emerald-50/95">
                                This panel can later feature official hotlines,
                                emergency references, Facebook page links, or
                                department-specific communication details.
                            </p>
                        </div>
                    </div>
                </aside>
            </section>
        </div>
    );
};

export default Contacts;
