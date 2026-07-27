import React from "react";

const Organization = () => {
    return (
        <>
            <div className="rounded-[1.75rem] border border-white/75 bg-white/60 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-md sm:p-8">
                <div className="space-y-5">
                    <h2 className="text-2xl font-black uppercase tracking-[0.08em] text-emerald-900">
                        Organizational Structure
                    </h2>
                    <p className="text-sm leading-7 text-slate-700 sm:text-base">
                        This section may be used to present the office structure
                        of LGU Mabuhay, including the mayor&apos;s office,
                        administrative divisions, frontline service units, and
                        support departments.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                            <h3 className="text-sm font-black uppercase tracking-[0.08em] text-emerald-800">
                                Executive Office
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-700">
                                Office of the Mayor, strategic planning,
                                executive coordination, and policy direction.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                            <h3 className="text-sm font-black uppercase tracking-[0.08em] text-emerald-800">
                                Administrative Services
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-700">
                                Records, human resource support, documentation,
                                and day-to-day office administration.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                            <h3 className="text-sm font-black uppercase tracking-[0.08em] text-emerald-800">
                                Community Services
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-700">
                                Public assistance, social welfare coordination,
                                and constituent support programs.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                            <h3 className="text-sm font-black uppercase tracking-[0.08em] text-emerald-800">
                                Support Units
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-700">
                                Finance, planning, information services, and
                                inter-office coordination functions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Organization;
