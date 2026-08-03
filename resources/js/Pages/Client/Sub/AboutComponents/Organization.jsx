const fallbackPortrait = "/assets/images/lgu_mabuhay.jpg";

const councilMembers = [
    {
        id: "member-1",
        name: "Maria Pilar T. Adlaon",
        role: "Council Member",
        image: fallbackPortrait,
    },
    {
        id: "member-2",
        name: "Majin V. Andak Sr.",
        role: "Council Member",
        image: fallbackPortrait,
    },
    {
        id: "member-3",
        name: "Alvarez H. Dammang",
        role: "Council Member",
        image: fallbackPortrait,
    },
    {
        id: "member-4",
        name: "Nelson L. Mallen",
        role: "Council Member",
        image: fallbackPortrait,
    },
    {
        id: "member-5",
        name: "Baltazar A. Alcala Sr.",
        role: "Council Member",
        image: fallbackPortrait,
    },
    {
        id: "member-6",
        name: "Jermalyn M. Dammang",
        role: "Council Member",
        image: fallbackPortrait,
    },
    {
        id: "member-7",
        name: "Abubakhar S. Anjawan",
        role: "Council Member",
        image: fallbackPortrait,
    },
];

const desktopFirstRow = councilMembers.slice(0, 4);
const desktopSecondRow = councilMembers.slice(4);

const MemberCard = ({ member }) => {
    return (
        <article className=" mx-auto w-full max-w-[12.5rem]">
            <div className="  mx-auto h-32 w-32  rounded-full  shadow-md">
                <div className="h-full w-full overflow-hidden rounded-full border-4 border-white bg-white">
                    <img
                        src={member.image || fallbackPortrait}
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
            <div className="rounded-[0.8rem] bg-white px-3 py-3 text-center shadow-lg">
                <p className="text-[0.82rem] font-semibold uppercase tracking-[0.04em] leading-5">
                    {member.name}
                </p>
                <p className=" text-center text-[0.72rem] font-medium uppercase tracking-[0.16em] text-slate-500">
                    {member.role}
                </p>
            </div>
        </article>
    );
};

const Organization = () => {
    return (
        <div className="space-y-6">
            {/* Landscape */}
            {/* <div className="relative hidden xl:block">
                <div className="mx-auto max-w-7xl">
                  
                    <div className="flex justify-center">
                        <article className="relative mx-auto w-full max-w-[22rem] overflow-visible rounded-[1.2rem] bg-white px-5 pb-5 pt-16 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                            <div className="absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-500 p-1 shadow-lg">
                                <div className="h-full w-full overflow-hidden rounded-full border-4 border-white bg-white">
                                    <img
                                        src={fallbackPortrait}
                                        alt=""
                                        aria-hidden="true"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>

                            <div className="absolute inset-x-10 top-0 h-12 -translate-y-[8%] rounded-b-full border-[5px] border-t-0 border-sky-900/80" />

                            <div className="rounded-[0.95rem] bg-gradient-to-r from-fuchsia-500 to-pink-500 px-4 py-3 text-center text-white shadow-md">
                                <p className="text-xl font-black uppercase tracking-[0.04em] leading-8">
                                    Hon. Edrelusa "Lulu" Calonge
                                </p>
                            </div>

                            <div className="px-2 pb-1 pt-4 text-center">
                                <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-900">
                                    Municipal Mayor
                                </p>
                            </div>
                        </article>
                    </div>

                    <div className="mx-auto h-10 w-0.5 bg-slate-400" />


                    <div className="flex justify-center">
                        <article className="relative mx-auto w-full max-w-[16rem] overflow-visible rounded-[1.2rem] bg-white px-4 pb-4 pt-14 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                            <div className="absolute left-1/2 top-0 h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 p-1 shadow-lg">
                                <div className="h-full w-full overflow-hidden rounded-full border-4 border-white bg-white">
                                    <img
                                        src={fallbackPortrait}
                                        alt=""
                                        aria-hidden="true"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>

                            <div className="absolute inset-x-7 top-0 h-11 -translate-y-[8%] rounded-b-full border-[5px] border-t-0 border-sky-900/80" />

                            <div className="rounded-[0.95rem] bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-2.5 text-center text-white shadow-md">
                                <p className="text-base font-black uppercase tracking-[0.04em] leading-6">
                                    Hon. Joval John B. Samonte
                                </p>
                            </div>

                            <div className="px-2 pb-1 pt-4 text-center">
                                <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-sky-900">
                                    Municipal Vice Mayor
                                </p>
                            </div>
                        </article>
                    </div>

                    <div className="mx-auto h-10 w-0.5 bg-slate-400" />
                    <div className="mx-auto h-10 max-w-6xl border-t-2 border-dashed border-slate-400/80" />

                    <div className="mx-auto -mt-1 grid max-w-6xl grid-cols-4 gap-8">
                        {desktopFirstRow.map((member) => (
                            <div
                                key={member.id}
                                className="flex flex-col items-center"
                            >
                                <div className="h-7 w-0.5 bg-slate-400" />
                                <MemberCard member={member} />
                            </div>
                        ))}
                    </div>

                    <div className="mx-auto mt-8 grid max-w-[50rem] grid-cols-3 gap-8">
                        {desktopSecondRow.map((member) => (
                            <div
                                key={`${member.id}-second-row`}
                                className="flex flex-col items-center"
                            >
                                <div className="h-7 w-0.5 bg-slate-400" />
                                <MemberCard member={member} />
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}

            {/* Portrait */}
            <div className="relative space-y-6 xl:hidden">
                {/* mayor */}
                <article className="relative mx-auto w-full max-w-[22rem] overflow-visible rounded-[1.2rem] bg-white px-5 pt-10 pb-5 shadow-[0_18px_40px_rgba(15,23,42,0.12)] mt-52">
                    <div className="absolute left-1/2 -top-6 h-60 w-60 -translate-x-1/2 -translate-y-3/4 rounded-full  shadow-lg">
                        <div className="h-full w-full overflow-hidden rounded-full border-4 border-white bg-white">
                            <img
                                src={fallbackPortrait}
                                alt=""
                                aria-hidden="true"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                    {/* <div className="absolute inset-x-10 top-0 h-12 -translate-y-[8%] rounded-b-full border-[5px] border-t-0 border-sky-900/80" /> */}
                    <div className=" bg-white ">
                        <p className="text-md text-center  text-slate-900 font-semibold uppercase tracking-[0.04em] leading-8">
                            Hon. Edrelusa "Lulu" Calonge
                        </p>
                    </div>
                    <div className=" py-1 text-center mx-auto rounded-full bg-gradient-to-r from-amber-400 to-orange-500">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-white">
                            Municipal Mayor
                        </p>
                    </div>
                </article>

                <div className="mx-auto h-8 w-0.5 bg-slate-400" />
                {/* vice mayor */}
                <article className=" mx-auto w-full max-w-[22rem]  overflow-visible rounded-[1.2rem] mt-48">
                    <div className="mx-auto flex h-48 w-48 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
                        <img
                            src={fallbackPortrait}
                            alt=""
                            aria-hidden="true"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className=" bg-white p-5 rounded-xl -mt-5">
                        <p className="text-md text-center  text-slate-900 font-semibold uppercase tracking-[0.04em] leading-8">
                            Hon. Joval John B. Samonte
                        </p>
                        <div className=" py-1 text-center mx-auto rounded-full bg-gradient-to-r from-amber-400 to-orange-500">
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white">
                                Municipal Vice Mayor
                            </p>
                        </div>
                    </div>
                </article>

                <p className="text-center text-lg font-bold uppercase tracking-[0.22em] text-sky-900 mb-20">
                    Sangguniang Bayan Members
                </p>
                <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {councilMembers.map((member) => (
                        <MemberCard key={member.id} member={member} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Organization;
