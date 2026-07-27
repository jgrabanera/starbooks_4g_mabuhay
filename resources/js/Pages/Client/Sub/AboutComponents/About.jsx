const quickFacts = [
    {
        title: "Location",
        value: "Zamboanga Sibugay, Philippines",
    },
    {
        title: "Classification",
        value: "4th Class Municipality",
    },
    {
        title: "Economy",
        value: "Agriculture, fishing, and community trade",
    },
    {
        title: "Vision",
        value: "Transparent, efficient, and citizen-centered governance",
    },
];

const serviceHighlights = [
    "Digital service access and public information support",
    "Community-based programs for agriculture and livelihoods",
    "Health, education, and inclusive municipal coordination",
];

const galleryImages = [
    "/assets/images/lgu_mabuhay.jpg",
    "/assets/images/lgu_mabuhay2.png",
    "/assets/images/logos/lgu-mabuhay.png",
];

const About = () => {
    return (
        <div className="space-y-6">
            <section className="overflow-hidden rounded-[2rem] border border-white/75 bg-white/60 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-md">
                <div className="bg-emerald-800 px-6 py-12 text-center text-white sm:px-10 sm:py-16">
                    <img
                        src="/assets/images/logos/lgu-mabuhay.png"
                        alt="LGU Mabuhay"
                        className="mx-auto mb-6 h-20 w-auto object-contain sm:h-24"
                    />
                    <h1 className="text-3xl font-black leading-tight sm:text-5xl">
                        Municipality of Mabuhay
                    </h1>
                    <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-emerald-50 sm:text-xl sm:leading-9">
                        A progressive local government unit committed to
                        transparent, efficient, and citizen-centered governance.
                    </p>
                </div>

                <div className="grid gap-8 px-6 py-8 sm:px-10 sm:py-10 ">
                    <article className="space-y-6">
                        <div>
                            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
                                Municipality Overview
                            </span>
                            <h2 className="mt-4 text-2xl font-black text-slate-950 sm:text-4xl">
                                About Mabuhay
                            </h2>
                        </div>

                        <div className="space-y-5 text-sm leading-8 text-slate-700 sm:text-lg">
                            <p>
                                The Municipality of Mabuhay is a 4th class
                                municipality in the province of Zamboanga
                                Sibugay, Philippines. Known for its rich
                                cultural heritage and agricultural community,
                                Mabuhay is committed to progressive governance
                                and sustainable local development.
                            </p>
                            <p>
                                The municipal government continues to foster
                                economic growth, improve public education and
                                health services, and strengthen environmental
                                stewardship through responsive, people-centered
                                administration.
                            </p>
                            <p>
                                Through digital governance initiatives and
                                coordinated public service delivery, LGU Mabuhay
                                aims to make government services more
                                accessible, transparent, and empowering for
                                every resident.
                            </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                            {serviceHighlights.map((highlight) => (
                                <div
                                    key={highlight}
                                    className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4 text-sm font-semibold leading-6 text-emerald-900 shadow-sm"
                                >
                                    {highlight}
                                </div>
                            ))}
                        </div>
                    </article>
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <article className="rounded-[1.75rem] border border-white/75 bg-white/60 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-md sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                                Media Feature
                            </span>
                            <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
                                Municipal Video Showcase
                            </h2>
                        </div>
                    </div>

                    <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-950 shadow-[0_18px_38px_rgba(15,23,42,0.2)]">
                        <div
                            className="relative aspect-video bg-cover bg-center"
                            style={{
                                backgroundImage:
                                    "url('/assets/images/lgu_mabuhay.jpg')",
                            }}
                        >
                            <div className="absolute inset-0 bg-slate-950/45" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/15 backdrop-blur">
                                    <svg
                                        className="ml-1 h-8 w-8"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M8 6.5v11l9-5.5-9-5.5Z" />
                                    </svg>
                                </div>
                                <h3 className="mt-5 text-xl font-black sm:text-2xl">
                                    Mabuhay Overview Video
                                </h3>
                                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-100 sm:text-base">
                                    Replace this showcase with the official LGU
                                    Mabuhay video presentation, tourism reel, or
                                    public service introduction when media is
                                    ready.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between border-t border-white/10 bg-slate-950/95 px-4 py-3 text-xs uppercase tracking-[0.16em] text-slate-300 sm:px-5">
                            <span>Video Player Placeholder</span>
                            <span>16:9 Presentation Area</span>
                        </div>
                    </div>
                </article>

                <aside className="rounded-[1.75rem] border border-white/75 bg-emerald-700 p-6 text-white shadow-[0_20px_50px_rgba(6,78,59,0.22)] sm:p-8">
                    <h2 className="text-xl font-black uppercase tracking-[0.12em] text-emerald-50">
                        Governance Priorities
                    </h2>
                    <div className="mt-5 space-y-4">
                        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-100/90">
                                Good Governance
                            </p>
                            <p className="mt-2 text-sm leading-6 text-white/90">
                                Transparent decision-making and accountable
                                public service systems.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-100/90">
                                Inclusive Growth
                            </p>
                            <p className="mt-2 text-sm leading-6 text-white/90">
                                Community development through agriculture,
                                education, health, and livelihood support.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-100/90">
                                Digital Access
                            </p>
                            <p className="mt-2 text-sm leading-6 text-white/90">
                                Improved citizen access to information and
                                municipal programs through digital tools.
                            </p>
                        </div>
                    </div>
                </aside>
            </section>
            {/* 
            <section className="rounded-[1.75rem] border border-white/75 bg-white/60 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-md sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-sky-700">
                            Image Gallery
                        </span>
                        <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
                            Municipality Snapshot
                        </h2>
                    </div>
                    <p className="max-w-xl text-sm leading-6 text-slate-600">
                        A visual section for municipal facilities, civic spaces,
                        and public-facing identity materials.
                    </p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
                    {galleryImages.map((image, index) => (
                        <figure
                            key={image}
                            className="group overflow-hidden rounded-[1.5rem] border border-white/80 bg-white shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={image}
                                    alt={`Mabuhay gallery ${index + 1}`}
                                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                                />
                            </div>
                            <figcaption className="space-y-2 p-4">
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                                    {index === 0
                                        ? "Municipal Hall"
                                        : index === 1
                                          ? "Community View"
                                          : "Municipal Identity"}
                                </p>
                                <p className="text-sm leading-6 text-slate-600">
                                    {index === 0
                                        ? "Primary administrative center and public service hub of the municipality."
                                        : index === 1
                                          ? "A visual placeholder for local sites, community programs, or public spaces."
                                          : "Official LGU branding that can be paired with announcements and information campaigns."}
                                </p>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </section> */}
        </div>
    );
};

export default About;
