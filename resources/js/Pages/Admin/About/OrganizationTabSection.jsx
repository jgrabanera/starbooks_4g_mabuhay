import SecondaryButton from "@/Components/SecondaryButton";

export default function OrganizationTabSection({
    data,
    setData,
    contentCardClassName,
    openCreateCouncilMemberModal,
    openEditCouncilMemberModal,
    removeCouncilMember,
    getCouncilMemberImageStatus,
    renderTabSaveButton,
}) {
    return (
        <section className={contentCardClassName}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
                        Organization Tab
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-slate-900">
                        Leadership And Council Members
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                        Update the mayor, vice mayor, and council members shown
                        in the organizational layout.
                    </p>
                </div>
                <SecondaryButton
                    type="button"
                    onClick={openCreateCouncilMemberModal}
                >
                    Add Member
                </SecondaryButton>
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-2">
                <div className="overflow-hidden rounded-[1.75rem] border border-emerald-200 bg-[linear-gradient(135deg,rgba(255,255,255,1),rgba(236,253,245,0.96),rgba(209,250,229,0.82))] shadow-sm">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-600 via-teal-500 to-lime-400" />
                    <div className="p-5">
                        <div className="mb-5">
                            <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-emerald-700">
                                Top Leadership
                            </p>
                            <h4 className="mt-2 text-xl font-bold text-slate-900">
                                Mayor Profile
                            </h4>
                            <p className="mt-1 text-sm text-slate-600">
                                Highlight the primary executive shown at the top
                                of the organization chart.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700">
                                    Mayor Name
                                </label>
                                <input
                                    value={data.organization_mayor_name}
                                    onChange={(event) =>
                                        setData(
                                            "organization_mayor_name",
                                            event.target.value,
                                        )
                                    }
                                    className="mt-1 block w-full rounded-md border-emerald-200 focus:border-emerald-400 focus:ring-emerald-200"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700">
                                    Mayor Role
                                </label>
                                <input
                                    value={data.organization_mayor_role}
                                    onChange={(event) =>
                                        setData(
                                            "organization_mayor_role",
                                            event.target.value,
                                        )
                                    }
                                    className="mt-1 block w-full rounded-md border-emerald-200 focus:border-emerald-400 focus:ring-emerald-200"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700">
                                    Mayor Image
                                </label>
                                <input
                                    type="file"
                                    accept=".png,.jpg,.jpeg,.webp"
                                    onChange={(event) =>
                                        setData(
                                            "organization_mayor_image",
                                            event.target.files?.[0] ?? null,
                                        )
                                    }
                                    className="mt-1 block w-full rounded-md border border-emerald-200 bg-white px-3 py-2 text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-[1.75rem] border border-amber-200 bg-[linear-gradient(135deg,rgba(255,255,255,1),rgba(255,251,235,0.96),rgba(254,243,199,0.8))] shadow-sm">
                    <div className="h-2 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400" />
                    <div className="p-5">
                        <div className="mb-5">
                            <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-amber-700">
                                Supporting Leadership
                            </p>
                            <h4 className="mt-2 text-xl font-bold text-slate-900">
                                Vice Mayor Profile
                            </h4>
                            <p className="mt-1 text-sm text-slate-600">
                                Maintain the secondary leadership card displayed
                                directly below the mayor.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700">
                                    Vice Mayor Name
                                </label>
                                <input
                                    value={data.organization_vice_mayor_name}
                                    onChange={(event) =>
                                        setData(
                                            "organization_vice_mayor_name",
                                            event.target.value,
                                        )
                                    }
                                    className="mt-1 block w-full rounded-md border-amber-200 focus:border-amber-400 focus:ring-amber-200"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700">
                                    Vice Mayor Role
                                </label>
                                <input
                                    value={data.organization_vice_mayor_role}
                                    onChange={(event) =>
                                        setData(
                                            "organization_vice_mayor_role",
                                            event.target.value,
                                        )
                                    }
                                    className="mt-1 block w-full rounded-md border-amber-200 focus:border-amber-400 focus:ring-amber-200"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700">
                                    Vice Mayor Image
                                </label>
                                <input
                                    type="file"
                                    accept=".png,.jpg,.jpeg,.webp"
                                    onChange={(event) =>
                                        setData(
                                            "organization_vice_mayor_image",
                                            event.target.files?.[0] ?? null,
                                        )
                                    }
                                    className="mt-1 block w-full rounded-md border border-amber-200 bg-white px-3 py-2 text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-emerald-700">
                            Council Members
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                            These entries feed the repeating member cards in the
                            public organization layout.
                        </p>
                    </div>
                </div>

                <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-100/80">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.18em] text-slate-600">
                                    No.
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.18em] text-slate-600">
                                    Image
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.18em] text-slate-600">
                                    Name
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.18em] text-slate-600">
                                    Role
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-[0.18em] text-slate-600">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {data.organization_council_members.map(
                                (member, index) => {
                                    const imageStatus =
                                        getCouncilMemberImageStatus(member);

                                    return (
                                        <tr
                                            key={member.id || index}
                                            className="transition hover:bg-slate-50/80"
                                        >
                                            <td className="px-4 py-4 text-sm font-semibold text-slate-700">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-slate-600">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${imageStatus.className}`}
                                                >
                                                    {imageStatus.label}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                                                {member.name ||
                                                    "Untitled member"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-slate-600">
                                                {member.role ||
                                                    "Council Member"}
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex justify-end gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openEditCouncilMemberModal(
                                                                member,
                                                                index,
                                                            )
                                                        }
                                                        className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeCouncilMember(
                                                                index,
                                                            )
                                                        }
                                                        className="text-sm font-semibold text-rose-600 transition hover:text-rose-800"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="space-y-3 md:hidden">
                    {data.organization_council_members.map((member, index) => {
                        const imageStatus =
                            getCouncilMemberImageStatus(member);

                        return (
                            <article
                                key={member.id || index}
                                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                                            Council Member {index + 1}
                                        </p>
                                        <p className="mt-2 text-base font-semibold text-slate-900">
                                            {member.name ||
                                                "Untitled member"}
                                        </p>
                                        <p
                                            className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] ${imageStatus.className}`}
                                        >
                                            {imageStatus.label}
                                        </p>
                                        <p className="mt-2 text-sm text-slate-500">
                                            {member.role || "Council Member"}
                                        </p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                openEditCouncilMemberModal(
                                                    member,
                                                    index,
                                                )
                                            }
                                            className="text-sm font-semibold text-indigo-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeCouncilMember(index)
                                            }
                                            className="text-sm font-semibold text-rose-600"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>

            {renderTabSaveButton("organization")}
        </section>
    );
}
