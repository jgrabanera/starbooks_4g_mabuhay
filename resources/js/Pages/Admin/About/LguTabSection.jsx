import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";

export default function LguTabSection({
    data,
    setData,
    aboutContent,
    errors,
    contentCardClassName,
    openCreateBarangayModal,
    openEditBarangayModal,
    removeBarangay,
    renderTabSaveButton,
}) {
    const barangayCaptainImageUrl = (barangay) => {
        const image = barangay?.captain_image;

        if (typeof image !== "string" || image.length === 0) {
            return null;
        }

        return image.startsWith("/") || image.startsWith("http")
            ? image
            : `/storage/images/thumbnails/${image}`;
    };

    return (
        <section className={contentCardClassName}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
                        LGU Tab
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-slate-900">
                        Barangay Directory
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                        Manage the LGU directory header and barangay records
                        used by the search page and modal.
                    </p>
                </div>
                <SecondaryButton
                    type="button"
                    onClick={openCreateBarangayModal}
                >
                    Add Barangay
                </SecondaryButton>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div>
                    <InputLabel value="LGU Badge" />
                    <TextInput
                        value={data.lgu_badge}
                        onChange={(event) =>
                            setData("lgu_badge", event.target.value)
                        }
                        className="mt-1 block w-full"
                    />
                </div>
                <div>
                    <InputLabel value="LGU Subtitle" />
                    <TextInput
                        value={data.lgu_subtitle}
                        onChange={(event) =>
                            setData("lgu_subtitle", event.target.value)
                        }
                        className="mt-1 block w-full"
                    />
                </div>
                <div>
                    <InputLabel value="LGU Title" />
                    <TextInput
                        value={data.lgu_title}
                        onChange={(event) =>
                            setData("lgu_title", event.target.value)
                        }
                        className="mt-1 block w-full"
                    />
                </div>
                <div>
                    <InputLabel value="LGU Logo" />
                    <input
                        type="file"
                        accept=".png,.jpg,.jpeg,.webp"
                        onChange={(event) =>
                            setData("lgu_logo", event.target.files?.[0] ?? null)
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                    />
                    {data.lgu_logo ? (
                        <p className="mt-2 text-xs font-medium text-amber-700">
                            New logo selected: {data.lgu_logo.name}
                        </p>
                    ) : aboutContent?.lgu_logo ? (
                        <p className="mt-2 text-xs text-slate-500">
                            Current logo: {aboutContent.lgu_logo}
                        </p>
                    ) : (
                        <p className="mt-2 text-xs text-slate-500">
                            No LGU logo uploaded yet.
                        </p>
                    )}
                    <InputError message={errors.lgu_logo} className="mt-2" />
                </div>
            </div>

            <div className="mt-5">
                <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
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
                                    Captain
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-[0.18em] text-slate-600">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {data.lgu_barangays.map((barangay, index) => {
                                const imageUrl =
                                    barangayCaptainImageUrl(barangay);

                                return (
                                    <tr
                                        key={barangay.id || index}
                                        className="transition hover:bg-slate-50/70"
                                    >
                                        <td className="px-4 py-4 text-sm font-semibold text-slate-700">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-4">
                                            {imageUrl ? (
                                                <img
                                                    src={imageUrl}
                                                    alt={`${barangay.officials?.captain || "Barangay captain"} portrait`}
                                                    className="h-12 w-12 rounded-full border border-slate-200 object-cover shadow-sm"
                                                />
                                            ) : (
                                                <span className="text-xs text-slate-500">
                                                    No image
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                                            {barangay.title ||
                                                "Untitled barangay"}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-slate-600">
                                            {barangay.officials?.captain ||
                                                "No captain"}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex justify-end gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        openEditBarangayModal(
                                                            barangay,
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
                                                        removeBarangay(index)
                                                    }
                                                    className="text-sm font-semibold text-rose-600 transition hover:text-rose-800"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="space-y-4 lg:hidden">
                    {data.lgu_barangays.map((barangay, index) => {
                        const imageUrl = barangayCaptainImageUrl(barangay);

                        return (
                            <div
                                key={barangay.id || index}
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                <p className="text-sm font-semibold text-slate-700">
                                    Barangay {index + 1}
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            openEditBarangayModal(
                                                barangay,
                                                index,
                                            )
                                        }
                                        className="text-xs font-semibold uppercase text-indigo-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => removeBarangay(index)}
                                        className="text-xs font-semibold uppercase text-rose-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                                <div className="flex gap-3 text-sm text-slate-600">
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={`${barangay.officials?.captain || "Barangay captain"} portrait`}
                                            className="h-14 w-14 shrink-0 rounded-full border border-slate-200 object-cover shadow-sm"
                                        />
                                    ) : null}
                                    <div className="space-y-2">
                                    <p>
                                    <span className="font-semibold text-slate-900">
                                        Name:
                                    </span>{" "}
                                    {barangay.title || "Untitled barangay"}
                                </p>
                                <p>
                                    <span className="font-semibold text-slate-900">
                                        Captain:
                                    </span>{" "}
                                    {barangay.officials?.captain ||
                                        "No captain"}
                                </p>
                                    {!imageUrl ? (
                                        <p className="text-xs text-slate-500">
                                            No image
                                        </p>
                                    ) : null}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {renderTabSaveButton("lgu")}
        </section>
    );
}
