import { IoPlay } from "react-icons/io5";

const serviceHighlights = [
    "Digital service access and public information support",
    "Community-based programs for agriculture and livelihoods",
    "Health, education, and inclusive municipal coordination",
];

const About = () => {
    return (
        <div className="[@media(orientation:portrait)]:min-h-[82vh] space-y-6">
            <section className="overflow-hidden rounded-[2rem] border border-white/75 bg-white/60 shadow-lg backdrop-blur-md">
                <div className="bg-emerald-800 px-6 py-12 text-center text-white md:px-10 md:py-16">
                    <img
                        src="/assets/images/logos/lgu-mabuhay.png"
                        alt="LGU Mabuhay"
                        className="mx-auto mb-6 h-20 w-auto object-contain md:h-24"
                    />
                    <h1 className="text-3xl font-black leading-tight md:text-5xl">
                        Municipality of Mabuhay
                    </h1>
                    <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-emerald-50 md:text-xl md:leading-9">
                        A progressive local government unit committed to
                        transparent, efficient, and citizen-centered governance.
                    </p>
                </div>

                <div className="grid gap-8 px-6 py-8 md:px-10 md:py-10">
                    <article className="space-y-6">
                        <div>
                            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
                                Municipality Overview
                            </span>
                            <h2 className="mt-4 text-2xl font-black text-slate-950 md:text-4xl">
                                About Mabuhay
                            </h2>
                        </div>

                        <div className="space-y-5 text-sm leading-8 text-slate-700 md:text-lg">
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

                        <div className="grid gap-3 md:grid-cols-3">
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

            <section className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
                <article className="rounded-[1.75rem] border border-white/75 bg-white/60 p-6 shadow-lg backdrop-blur-md md:p-8">
                    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                        <div>
                            <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                                Media Feature
                            </span>
                            <h2 className="mt-3 text-2xl font-black text-slate-950 md:text-3xl">
                                Municipal Video Showcase
                            </h2>
                        </div>
                    </div>

                    <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-950 shadow-lg">
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
                                    <IoPlay className="ml-1 h-8 w-8" />
                                </div>
                                <h3 className="mt-5 text-xl font-black md:text-2xl">
                                    Mabuhay Overview Video
                                </h3>
                                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-100 md:text-base">
                                    Replace this showcase with the official LGU
                                    Mabuhay video presentation, tourism reel, or
                                    public service introduction when media is
                                    ready.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between border-t border-white/10 bg-slate-950/95 px-4 py-3 text-xs uppercase tracking-[0.16em] text-slate-300 md:px-5">
                            <span>Video Player Placeholder</span>
                            <span>16:9 Presentation Area</span>
                        </div>
                    </div>
                </article>

                <aside className="rounded-[1.75rem] border border-white/75 bg-emerald-700 p-6 text-white shadow-lg md:p-8">
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
        </div>
    );
};

export default About;
