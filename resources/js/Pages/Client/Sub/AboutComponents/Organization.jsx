const renderPortrait = (official, label) => {
    if (official?.image) {
        return (
            <img
                src={official.image}
                alt={official.name || label}
                className="h-full w-full object-cover"
            />
        );
    }

    return (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,rgba(236,253,245,1),rgba(255,251,235,0.95))] text-center text-[0.7rem] font-bold uppercase tracking-[0.18em] text-emerald-700">
            No Image
        </div>
    );
};

const normalizeCouncilMembers = (members = []) => {
    if (!Array.isArray(members) || members.length === 0) {
        return [];
    }

    return members
        .map((member, index) => ({
            id: member?.id || `member-${index + 1}`,
            name: member?.name || "",
            role: member?.role || "Council Member",
            category: member?.category || "sangguniang_bayan",
            areaOfExpertise: member?.areaOfExpertise || "",
            image: member?.image || null,
        }))
        .filter((member) => member.name || member.role || member.image);
};

const MemberCard = ({ member }) => {
    return (
        <article className=" mx-auto w-full max-w-[12.5rem]">
            <div className="  mx-auto h-32 w-32  rounded-full  shadow-md">
                <div className="h-full w-full overflow-hidden rounded-full border-4 border-white bg-white">
                    {renderPortrait(member, member.name || "Council Member")}
                </div>
            </div>
            <div className="rounded-[0.8rem] bg-white px-3 py-3 text-center shadow-lg">
                {member.areaOfExpertise ? (
                    <p className="mb-2 rounded-full bg-slate-100 px-2 py-1 text-[0.65rem] font-semibold leading-tight text-slate-700">
                        {member.areaOfExpertise}
                    </p>
                ) : null}
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

const Organization = ({ organizationData = null }) => {
    const mayor = organizationData?.mayor ?? {};
    const viceMayor = organizationData?.viceMayor ?? {};
    const councilMembers = normalizeCouncilMembers(
        organizationData?.councilMembers,
    );
    const hasContent =
        mayor.name ||
        mayor.role ||
        mayor.image ||
        viceMayor.name ||
        viceMayor.role ||
        viceMayor.image ||
        councilMembers.length > 0;

    if (!hasContent) {
        return (
            <div className="rounded-[2rem] border border-dashed border-emerald-200 bg-white/60 px-6 py-12 text-center shadow-lg backdrop-blur-md">
                <p className="text-base font-bold text-emerald-950">
                    No organization data available yet.
                </p>
                <p className="mt-2 text-sm text-slate-600">
                    This section will appear once organization content is added
                    from the CMS.
                </p>
            </div>
        );
    }
    const memberGroups = [
        {
            id: "sangguniang_bayan",
            label: "Sangguniang Bayan Members",
        },
        {
            id: "ex_officio",
            label: "Ex-Officio Municipal Councilors",
        },
        {
            id: "secretary",
            label: "Secretary to the Sangguniang",
        },
    ]
        .map((group) => ({
            ...group,
            members: councilMembers.filter(
                (member) => member.category === group.id,
            ),
        }))
        .filter((group) => group.members.length > 0);

    return (
        <div className="space-y-6">
            {/* Landscape */}
            <div className="relative hidden xl:block">
                <div className="mx-auto max-w-7xl">
                    <article className="relative mx-auto w-full max-w-[22rem] overflow-visible rounded-[1.2rem] bg-white px-5 pt-10 pb-5 shadow-[0_18px_40px_rgba(15,23,42,0.12)] mt-52">
                        <div className="absolute left-1/2 -top-6 h-60 w-60 -translate-x-1/2 -translate-y-3/4 rounded-full  shadow-lg">
                            <div className="h-full w-full overflow-hidden rounded-full border-4 border-white bg-white">
                                {renderPortrait(mayor, "Mayor")}
                            </div>
                        </div>
                        {/* <div className="absolute inset-x-10 top-0 h-12 -translate-y-[8%] rounded-b-full border-[5px] border-t-0 border-sky-900/80" /> */}
                        <div className=" bg-white ">
                            <p className="text-md text-center  text-slate-900 font-semibold uppercase tracking-[0.04em] leading-8">
                                {mayor.name}
                            </p>
                        </div>
                        <div className=" py-1 text-center mx-auto rounded-full bg-gradient-to-r from-amber-400 to-orange-500">
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white">
                                {mayor.role}
                            </p>
                        </div>
                    </article>

                    <div className="mx-auto h-8 w-0.5 bg-slate-400" />
                    {/* vice mayor */}
                    <article className=" mx-auto w-full max-w-[22rem]  overflow-visible rounded-[1.2rem] ">
                        <div className="mx-auto flex h-48 w-48 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
                            {renderPortrait(viceMayor, "Vice Mayor")}
                        </div>

                        <div className=" bg-white p-5 rounded-xl -mt-5">
                            <p className="text-md text-center  text-slate-900 font-semibold uppercase tracking-[0.04em] leading-8">
                                {viceMayor.name}
                            </p>
                            <div className=" py-1 text-center mx-auto rounded-full bg-gradient-to-r from-amber-400 to-orange-500">
                                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white">
                                    {viceMayor.role}
                                </p>
                            </div>
                        </div>
                    </article>

                    <div className="mx-auto h-10 w-0.5 bg-slate-400" />
                    <div className="space-y-12">
                        {memberGroups.map((group) => (
                            <section key={group.id}>
                                <h2 className="mb-8 text-center text-lg font-bold uppercase tracking-[0.16em] text-sky-900">
                                    {group.label}
                                </h2>
                                <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-8">
                                    {group.members.map((member) => (
                                        <MemberCard
                                            key={member.id}
                                            member={member}
                                        />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </div>

            {/* Portrait */}
            <div className="relative space-y-6 xl:hidden">
                {/* mayor */}
                <article className="relative mx-auto w-full max-w-[22rem] overflow-visible rounded-[1.2rem] bg-white px-5 pt-10 pb-5 shadow-[0_18px_40px_rgba(15,23,42,0.12)] mt-52">
                    <div className="absolute left-1/2 -top-6 h-60 w-60 -translate-x-1/2 -translate-y-3/4 rounded-full  shadow-lg">
                        <div className="h-full w-full overflow-hidden rounded-full border-4 border-white bg-white">
                            {renderPortrait(mayor, "Mayor")}
                        </div>
                    </div>
                    {/* <div className="absolute inset-x-10 top-0 h-12 -translate-y-[8%] rounded-b-full border-[5px] border-t-0 border-sky-900/80" /> */}
                    <div className=" bg-white ">
                        <p className="text-md text-center  text-slate-900 font-semibold uppercase tracking-[0.04em] leading-8">
                            {mayor.name}
                        </p>
                    </div>
                    <div className=" py-1 text-center mx-auto rounded-full bg-gradient-to-r from-amber-400 to-orange-500">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-white">
                            {mayor.role}
                        </p>
                    </div>
                </article>

                <div className="mx-auto h-8 w-0.5 bg-slate-400" />
                {/* vice mayor */}
                <article className=" mx-auto w-full max-w-[22rem]  overflow-visible rounded-[1.2rem] mt-48">
                    <div className="mx-auto flex h-48 w-48 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
                        {renderPortrait(viceMayor, "Vice Mayor")}
                    </div>

                    <div className=" bg-white p-5 rounded-xl -mt-5">
                        <p className="text-md text-center  text-slate-900 font-semibold uppercase tracking-[0.04em] leading-8">
                            {viceMayor.name}
                        </p>
                        <div className=" py-1 text-center mx-auto rounded-full bg-gradient-to-r from-amber-400 to-orange-500">
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white">
                                {viceMayor.role}
                            </p>
                        </div>
                    </div>
                </article>

                {memberGroups.map((group) => (
                    <section key={group.id} className="space-y-8">
                        <h2 className="text-center text-lg font-bold uppercase tracking-[0.16em] text-sky-900">
                            {group.label}
                        </h2>
                        <div className="flex flex-wrap justify-center gap-10">
                            {group.members.map((member) => (
                                <MemberCard
                                    key={member.id}
                                    member={member}
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default Organization;
