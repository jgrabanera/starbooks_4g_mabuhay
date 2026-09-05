import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";

export default function AboutTabSection({
    data,
    setData,
    errors,
    contentCardClassName,
    addSimpleListItem,
    confirmAddAction,
    updateSimpleListItem,
    removeSimpleListItem,
    addPriority,
    updatePriority,
    removePriority,
    renderTabSaveButton,
}) {
    return (
        <>
            <section
                className={`${contentCardClassName} border-sky-200 bg-sky-50/80`}
            >
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
                            About Tab
                        </p>
                        <h3 className="mt-1 text-xl font-bold text-slate-900">
                            Hero And Overview
                        </h3>
                    </div>
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <div>
                        <InputLabel value="Hero Logo" />
                        <input
                            type="file"
                            accept=".png,.jpg,.jpeg,.webp"
                            onChange={(event) =>
                                setData(
                                    "hero_logo",
                                    event.target.files?.[0] ?? null,
                                )
                            }
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                        />
                        <InputError
                            message={errors.hero_logo}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel value="Hero Logo Alt" />
                        <TextInput
                            value={data.hero_logo_alt}
                            onChange={(event) =>
                                setData("hero_logo_alt", event.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.hero_logo_alt}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel value="Hero Title" />
                        <TextInput
                            value={data.hero_title}
                            onChange={(event) =>
                                setData("hero_title", event.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.hero_title}
                            className="mt-2"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <InputLabel value="Hero Description" />
                        <textarea
                            value={data.hero_description}
                            onChange={(event) =>
                                setData("hero_description", event.target.value)
                            }
                            rows="4"
                            className="mt-1 block w-full rounded-md border-gray-300"
                        />
                    </div>
                    <div>
                        <InputLabel value="Overview Badge" />
                        <TextInput
                            value={data.overview_badge}
                            onChange={(event) =>
                                setData("overview_badge", event.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                    </div>
                    <div>
                        <InputLabel value="Overview Title" />
                        <TextInput
                            value={data.overview_title}
                            onChange={(event) =>
                                setData("overview_title", event.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                    </div>
                </div>
            </section>

            <section
                className={`${contentCardClassName} border-slate-200 bg-white`}
            >
                <div className="grid gap-5 xl:grid-cols-2">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-slate-800">
                                Overview Paragraphs
                            </p>
                            <SecondaryButton
                                type="button"
                                onClick={() =>
                                    confirmAddAction(
                                        "Add paragraph?",
                                        "Are you sure you want to add another overview paragraph field?",
                                        () =>
                                            addSimpleListItem(
                                                "overview_paragraphs",
                                            ),
                                    )
                                }
                            >
                                Add
                            </SecondaryButton>
                        </div>
                        {data.overview_paragraphs.map((item, index) => (
                            <div
                                key={`paragraph-${index}`}
                                className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                            >
                                <div className="mb-3 flex items-center justify-between">
                                    <p className="text-sm font-semibold text-slate-700">
                                        Paragraph {index + 1}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeSimpleListItem(
                                                "overview_paragraphs",
                                                index,
                                            )
                                        }
                                        className="text-xs font-semibold uppercase text-rose-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                                <textarea
                                    value={item}
                                    onChange={(event) =>
                                        updateSimpleListItem(
                                            "overview_paragraphs",
                                            index,
                                            event.target.value,
                                        )
                                    }
                                    rows="4"
                                    className="block w-full rounded-md border-gray-300"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-slate-800">
                                Highlights
                            </p>
                            <SecondaryButton
                                type="button"
                                onClick={() =>
                                    confirmAddAction(
                                        "Add highlight?",
                                        "Are you sure you want to add another overview highlight field?",
                                        () =>
                                            addSimpleListItem(
                                                "overview_highlights",
                                            ),
                                    )
                                }
                            >
                                Add
                            </SecondaryButton>
                        </div>
                        {data.overview_highlights.map((item, index) => (
                            <div
                                key={`highlight-${index}`}
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                            >
                                <div className="mb-3 flex items-center justify-between">
                                    <p className="text-sm font-semibold text-slate-700">
                                        Highlight {index + 1}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeSimpleListItem(
                                                "overview_highlights",
                                                index,
                                            )
                                        }
                                        className="text-xs font-semibold uppercase text-rose-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                                <TextInput
                                    value={item}
                                    onChange={(event) =>
                                        updateSimpleListItem(
                                            "overview_highlights",
                                            index,
                                            event.target.value,
                                        )
                                    }
                                    className="block w-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section
                className={`${contentCardClassName} border-sky-200 bg-sky-50/80`}
            >
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">
                        Media And Priorities
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-slate-900">
                        Showcase Content
                    </h3>
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <div>
                        <InputLabel value="Media Badge" />
                        <TextInput
                            value={data.media_badge}
                            onChange={(event) =>
                                setData("media_badge", event.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                    </div>
                    <div>
                        <InputLabel value="Media Title" />
                        <TextInput
                            value={data.media_title}
                            onChange={(event) =>
                                setData("media_title", event.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                    </div>
                    <div>
                        <InputLabel value="Preview Image" />
                        <input
                            type="file"
                            accept=".png,.jpg,.jpeg,.webp"
                            onChange={(event) =>
                                setData(
                                    "media_preview_image",
                                    event.target.files?.[0] ?? null,
                                )
                            }
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                        />
                        <InputError
                            message={errors.media_preview_image}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel value="Video File" />
                        <input
                            type="file"
                            accept=".mp4,.webm,.mov,video/mp4,video/webm,video/quicktime"
                            onChange={(event) =>
                                setData(
                                    "media_video",
                                    event.target.files?.[0] ?? null,
                                )
                            }
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                        />
                        <InputError
                            message={errors.media_video}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel value="Overlay Title" />
                        <TextInput
                            value={data.media_overlay_title}
                            onChange={(event) =>
                                setData(
                                    "media_overlay_title",
                                    event.target.value,
                                )
                            }
                            className="mt-1 block w-full"
                        />
                    </div>
                    <div>
                        <InputLabel value="Priorities Title" />
                        <TextInput
                            value={data.priorities_title}
                            onChange={(event) =>
                                setData("priorities_title", event.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <InputLabel value="Overlay Description" />
                        <textarea
                            value={data.media_overlay_description}
                            onChange={(event) =>
                                setData(
                                    "media_overlay_description",
                                    event.target.value,
                                )
                            }
                            rows="4"
                            className="mt-1 block w-full rounded-md border-gray-300"
                        />
                    </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-800">
                        Priority Cards
                    </p>
                    <SecondaryButton
                        type="button"
                        onClick={() =>
                            confirmAddAction(
                                "Add priority card?",
                                "Are you sure you want to add another priority card entry?",
                                addPriority,
                            )
                        }
                    >
                        Add Priority
                    </SecondaryButton>
                </div>
                <div className="mt-4 grid gap-4 xl:grid-cols-2">
                    {data.priorities_items.map((item, index) => (
                        <div
                            key={item.id || index}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                        >
                            <div className="mb-3 flex items-center justify-between">
                                <p className="text-sm font-semibold text-slate-700">
                                    Priority {index + 1}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => removePriority(index)}
                                    className="text-xs font-semibold uppercase text-rose-600"
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="space-y-3">
                                <TextInput
                                    value={item.title}
                                    onChange={(event) =>
                                        updatePriority(
                                            index,
                                            "title",
                                            event.target.value,
                                        )
                                    }
                                    className="block w-full"
                                />
                                <InputError
                                    message={
                                        errors[
                                            `priorities_items.${index}.title`
                                        ]
                                    }
                                />
                                <textarea
                                    value={item.description}
                                    onChange={(event) =>
                                        updatePriority(
                                            index,
                                            "description",
                                            event.target.value,
                                        )
                                    }
                                    rows="3"
                                    className="block w-full rounded-md border-gray-300"
                                />
                                <InputError
                                    message={
                                        errors[
                                            `priorities_items.${index}.description`
                                        ]
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {renderTabSaveButton("about")}
        </>
    );
}
