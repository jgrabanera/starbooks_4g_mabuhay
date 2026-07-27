import { Head } from "@inertiajs/react";
import ClientLayout from "@/Layouts/ClientLayout";

const AboutLguMabuhay = () => {
    return (
        <>
            <Head title="About LGU Mabuhay" />
            <div className="w-full text-emerald-950">
                <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-2 py-2 sm:px-4">
                    <div className="rounded-[1.75rem] border border-white/75 bg-white/60 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-md sm:p-8">
                        <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
                            Municipality Overview
                        </span>
                        <h1 className="mt-4 text-3xl font-black uppercase leading-tight tracking-[0.06em] text-emerald-950 sm:text-4xl">
                            About LGU Mabuhay
                        </h1>
                        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
                            The Local Government Unit of Mabuhay serves as the
                            primary public institution for community programs,
                            civic administration, and local development
                            initiatives in the municipality. This page can be
                            used to present the municipality&apos;s background,
                            leadership values, and service commitment in a
                            clear and approachable format for residents and
                            visitors.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                        <article className="rounded-[1.75rem] border border-white/75 bg-white/55 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.1)] backdrop-blur-md sm:p-8">
                            <h2 className="text-xl font-black uppercase tracking-[0.08em] text-emerald-900">
                                Public Service Mission
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                                LGU Mabuhay continues to support programs that
                                strengthen transparent governance, responsive
                                public service, and inclusive local growth.
                                From administrative support to community-based
                                initiatives, the municipality aims to make
                                public services more accessible, organized, and
                                people-centered.
                            </p>
                            <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                                This section may later be updated with official
                                historical background, demographic information,
                                strategic priorities, and highlights of
                                municipal accomplishments.
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
                                        Governance, local services, citizen
                                        assistance, and municipal coordination.
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-100/90">
                                        Commitment
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-white/90">
                                        Delivering programs with accountability,
                                        accessibility, and service-oriented
                                        leadership.
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-100/90">
                                        Visitor Use
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-white/90">
                                        Ideal for presenting background
                                        information, municipal identity, and key
                                        public-facing updates.
                                    </p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AboutLguMabuhay;

AboutLguMabuhay.layout = (page) => <ClientLayout>{page}</ClientLayout>;
