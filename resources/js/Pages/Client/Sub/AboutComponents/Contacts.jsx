import React from "react";

const Contacts = () => {
    return (
        <>
            <div className="rounded-[1.75rem] border border-white/75 bg-white/60 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-md sm:p-8">
                <div className="space-y-5">
                    <h2 className="text-2xl font-black uppercase tracking-[0.08em] text-emerald-900">
                        Contacts
                    </h2>
                    <p className="text-sm leading-7 text-slate-700 sm:text-base">
                        Use this area for official contact details, office
                        schedules, and public-facing communication channels for
                        LGU Mabuhay.
                    </p>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                                Office Address
                            </p>
                            <p className="mt-2 text-sm leading-6 text-slate-700">
                                Municipal Hall, Mabuhay, Zamboanga Sibugay
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
        </>
    );
};

export default Contacts;
