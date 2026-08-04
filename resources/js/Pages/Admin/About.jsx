import AdminLayout from "@/Layouts/AdminLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

const normalizeArray = (items, fallback) =>
    Array.isArray(items) && items.length > 0 ? items : fallback;

const defaultParagraphs = [""];
const defaultHighlights = [""];
const defaultPriorities = [{ id: "priority-1", title: "", description: "" }];

const About = ({ aboutContent }) => {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        recentlySuccessful,
    } = useForm({
        hero_logo: null,
        hero_logo_alt: aboutContent?.hero_logo_alt ?? "",
        hero_title: aboutContent?.hero_title ?? "",
        hero_description: aboutContent?.hero_description ?? "",
        overview_badge: aboutContent?.overview_badge ?? "",
        overview_title: aboutContent?.overview_title ?? "",
        overview_paragraphs: normalizeArray(
            aboutContent?.overview_paragraphs,
            defaultParagraphs,
        ),
        overview_highlights: normalizeArray(
            aboutContent?.overview_highlights,
            defaultHighlights,
        ),
        media_badge: aboutContent?.media_badge ?? "",
        media_title: aboutContent?.media_title ?? "",
        media_preview_image: null,
        media_video: null,
        media_overlay_title: aboutContent?.media_overlay_title ?? "",
        media_overlay_description:
            aboutContent?.media_overlay_description ?? "",
        media_footer_left: aboutContent?.media_footer_left ?? "",
        media_footer_right: aboutContent?.media_footer_right ?? "",
        priorities_title: aboutContent?.priorities_title ?? "",
        priorities_items: normalizeArray(
            aboutContent?.priorities_items,
            defaultPriorities,
        ).map((item, index) => ({
            id: item?.id || `priority-${index + 1}`,
            title: item?.title ?? "",
            description: item?.description ?? "",
        })),
    });

    const updateParagraph = (index, value) => {
        const nextParagraphs = [...data.overview_paragraphs];
        nextParagraphs[index] = value;
        setData("overview_paragraphs", nextParagraphs);
    };

    const updateHighlight = (index, value) => {
        const nextHighlights = [...data.overview_highlights];
        nextHighlights[index] = value;
        setData("overview_highlights", nextHighlights);
    };

    const updatePriority = (index, key, value) => {
        const nextPriorities = [...data.priorities_items];
        nextPriorities[index] = {
            ...nextPriorities[index],
            [key]: value,
        };
        setData("priorities_items", nextPriorities);
    };

    const addParagraph = () => {
        setData("overview_paragraphs", [...data.overview_paragraphs, ""]);
    };

    const removeParagraph = (index) => {
        if (data.overview_paragraphs.length === 1) {
            return;
        }

        setData(
            "overview_paragraphs",
            data.overview_paragraphs.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    const addHighlight = () => {
        setData("overview_highlights", [...data.overview_highlights, ""]);
    };

    const removeHighlight = (index) => {
        if (data.overview_highlights.length === 1) {
            return;
        }

        setData(
            "overview_highlights",
            data.overview_highlights.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    const addPriority = () => {
        setData("priorities_items", [
            ...data.priorities_items,
            {
                id: `priority-${data.priorities_items.length + 1}`,
                title: "",
                description: "",
            },
        ]);
    };

    const removePriority = (index) => {
        if (data.priorities_items.length === 1) {
            return;
        }

        setData(
            "priorities_items",
            data.priorities_items.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    const submit = (event) => {
        event.preventDefault();

        post(route("admin.about.update"), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <div className="space-y-6">
            <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-white to-white px-5 py-5 sm:px-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-1">
                            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">
                                Fixed Page CMS
                            </p>
                            <h2 className="text-2xl font-bold text-slate-900">
                                About LGU Mabuhay CMS
                            </h2>
                            <p className="max-w-3xl text-sm leading-6 text-slate-600">
                                Manage the public About tab content for hero,
                                overview, media showcase, and governance
                                priorities. This page saves one structured
                                record for the fixed About layout.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            {recentlySuccessful ? (
                                <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                                    Saved
                                </span>
                            ) : null}
                            <PrimaryButton
                                onClick={submit}
                                disabled={processing}
                                className="justify-center"
                            >
                                {processing ? "Saving..." : "Save About Content"}
                            </PrimaryButton>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6 p-5 sm:p-6">
                    <section className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
                        <div className="mb-5">
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
                                Hero Section
                            </p>
                            <h3 className="mt-1 text-xl font-bold text-slate-900">
                                Hero Content
                            </h3>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
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
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
                                    disabled={processing}
                                />
                                {aboutContent?.hero_logo ? (
                                    <p className="mt-2 text-xs text-slate-500">
                                        Current file: {aboutContent.hero_logo}
                                    </p>
                                ) : null}
                                <InputError
                                    message={errors.hero_logo}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="hero_logo_alt"
                                    value="Logo Alt Text"
                                />
                                <TextInput
                                    id="hero_logo_alt"
                                    value={data.hero_logo_alt}
                                    onChange={(event) =>
                                        setData(
                                            "hero_logo_alt",
                                            event.target.value,
                                        )
                                    }
                                    className="mt-1 block w-full"
                                    disabled={processing}
                                />
                                <InputError
                                    message={errors.hero_logo_alt}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="hero_title"
                                    value="Hero Title"
                                />
                                <TextInput
                                    id="hero_title"
                                    value={data.hero_title}
                                    onChange={(event) =>
                                        setData("hero_title", event.target.value)
                                    }
                                    className="mt-1 block w-full"
                                    disabled={processing}
                                />
                                <InputError
                                    message={errors.hero_title}
                                    className="mt-2"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel
                                    htmlFor="hero_description"
                                    value="Hero Description"
                                />
                                <textarea
                                    id="hero_description"
                                    value={data.hero_description}
                                    onChange={(event) =>
                                        setData(
                                            "hero_description",
                                            event.target.value,
                                        )
                                    }
                                    rows="4"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    disabled={processing}
                                />
                                <InputError
                                    message={errors.hero_description}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-slate-200 bg-white p-5">
                        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
                                    Overview Section
                                </p>
                                <h3 className="mt-1 text-xl font-bold text-slate-900">
                                    Overview Content
                                </h3>
                            </div>
                            <div className="flex gap-3">
                                <SecondaryButton
                                    type="button"
                                    onClick={addParagraph}
                                >
                                    Add Paragraph
                                </SecondaryButton>
                                <SecondaryButton
                                    type="button"
                                    onClick={addHighlight}
                                >
                                    Add Highlight
                                </SecondaryButton>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <InputLabel
                                    htmlFor="overview_badge"
                                    value="Overview Badge"
                                />
                                <TextInput
                                    id="overview_badge"
                                    value={data.overview_badge}
                                    onChange={(event) =>
                                        setData(
                                            "overview_badge",
                                            event.target.value,
                                        )
                                    }
                                    className="mt-1 block w-full"
                                    disabled={processing}
                                />
                                <InputError
                                    message={errors.overview_badge}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="overview_title"
                                    value="Overview Title"
                                />
                                <TextInput
                                    id="overview_title"
                                    value={data.overview_title}
                                    onChange={(event) =>
                                        setData(
                                            "overview_title",
                                            event.target.value,
                                        )
                                    }
                                    className="mt-1 block w-full"
                                    disabled={processing}
                                />
                                <InputError
                                    message={errors.overview_title}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="mt-5 grid gap-5 xl:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">
                                        Overview Paragraphs
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        These paragraphs feed the About Mabuhay
                                        text block on the public page.
                                    </p>
                                </div>

                                {data.overview_paragraphs.map(
                                    (paragraph, index) => (
                                        <div
                                            key={`paragraph-${index}`}
                                            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                                        >
                                            <div className="mb-3 flex items-center justify-between gap-3">
                                                <p className="text-sm font-semibold text-slate-700">
                                                    Paragraph {index + 1}
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeParagraph(index)
                                                    }
                                                    className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-600"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            <textarea
                                                value={paragraph}
                                                onChange={(event) =>
                                                    updateParagraph(
                                                        index,
                                                        event.target.value,
                                                    )
                                                }
                                                rows="5"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                disabled={processing}
                                            />
                                            <InputError
                                                message={
                                                    errors[
                                                        `overview_paragraphs.${index}`
                                                    ]
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    ),
                                )}
                                <InputError
                                    message={errors.overview_paragraphs}
                                    className="mt-2"
                                />
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">
                                        Highlight Cards
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        These short items appear in the green
                                        highlight cards.
                                    </p>
                                </div>

                                {data.overview_highlights.map(
                                    (highlight, index) => (
                                        <div
                                            key={`highlight-${index}`}
                                            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                                        >
                                            <div className="mb-3 flex items-center justify-between gap-3">
                                                <p className="text-sm font-semibold text-slate-700">
                                                    Highlight {index + 1}
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeHighlight(index)
                                                    }
                                                    className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-600"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            <TextInput
                                                value={highlight}
                                                onChange={(event) =>
                                                    updateHighlight(
                                                        index,
                                                        event.target.value,
                                                    )
                                                }
                                                className="block w-full"
                                                disabled={processing}
                                            />
                                            <InputError
                                                message={
                                                    errors[
                                                        `overview_highlights.${index}`
                                                    ]
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    ),
                                )}
                                <InputError
                                    message={errors.overview_highlights}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
                        <div className="mb-5">
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
                                Media Section
                            </p>
                            <h3 className="mt-1 text-xl font-bold text-slate-900">
                                Media Showcase Content
                            </h3>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <InputLabel
                                    htmlFor="media_badge"
                                    value="Media Badge"
                                />
                                <TextInput
                                    id="media_badge"
                                    value={data.media_badge}
                                    onChange={(event) =>
                                        setData(
                                            "media_badge",
                                            event.target.value,
                                        )
                                    }
                                    className="mt-1 block w-full"
                                    disabled={processing}
                                />
                                <InputError
                                    message={errors.media_badge}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="media_title"
                                    value="Media Title"
                                />
                                <TextInput
                                    id="media_title"
                                    value={data.media_title}
                                    onChange={(event) =>
                                        setData("media_title", event.target.value)
                                    }
                                    className="mt-1 block w-full"
                                    disabled={processing}
                                />
                                <InputError
                                    message={errors.media_title}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel value="Media Preview Image" />
                                <input
                                    type="file"
                                    accept=".png,.jpg,.jpeg,.webp"
                                    onChange={(event) =>
                                        setData(
                                            "media_preview_image",
                                            event.target.files?.[0] ?? null,
                                        )
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
                                    disabled={processing}
                                />
                                {aboutContent?.media_preview_image ? (
                                    <p className="mt-2 text-xs text-slate-500">
                                        Current file:{" "}
                                        {aboutContent.media_preview_image}
                                    </p>
                                ) : null}
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
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
                                    disabled={processing}
                                />
                                {aboutContent?.media_video ? (
                                    <p className="mt-2 text-xs text-slate-500">
                                        Current video: {aboutContent.media_video}
                                    </p>
                                ) : (
                                    <p className="mt-2 text-xs text-slate-500">
                                        Upload an MP4, WEBM, or MOV file to show
                                        an actual video player on the public
                                        About page.
                                    </p>
                                )}
                                <InputError
                                    message={errors.media_video}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="media_overlay_title"
                                    value="Overlay Title"
                                />
                                <TextInput
                                    id="media_overlay_title"
                                    value={data.media_overlay_title}
                                    onChange={(event) =>
                                        setData(
                                            "media_overlay_title",
                                            event.target.value,
                                        )
                                    }
                                    className="mt-1 block w-full"
                                    disabled={processing}
                                />
                                <InputError
                                    message={errors.media_overlay_title}
                                    className="mt-2"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel
                                    htmlFor="media_overlay_description"
                                    value="Overlay Description"
                                />
                                <textarea
                                    id="media_overlay_description"
                                    value={data.media_overlay_description}
                                    onChange={(event) =>
                                        setData(
                                            "media_overlay_description",
                                            event.target.value,
                                        )
                                    }
                                    rows="4"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    disabled={processing}
                                />
                                <InputError
                                    message={errors.media_overlay_description}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="media_footer_left"
                                    value="Footer Left Label"
                                />
                                <TextInput
                                    id="media_footer_left"
                                    value={data.media_footer_left}
                                    onChange={(event) =>
                                        setData(
                                            "media_footer_left",
                                            event.target.value,
                                        )
                                    }
                                    className="mt-1 block w-full"
                                    disabled={processing}
                                />
                                <InputError
                                    message={errors.media_footer_left}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="media_footer_right"
                                    value="Footer Right Label"
                                />
                                <TextInput
                                    id="media_footer_right"
                                    value={data.media_footer_right}
                                    onChange={(event) =>
                                        setData(
                                            "media_footer_right",
                                            event.target.value,
                                        )
                                    }
                                    className="mt-1 block w-full"
                                    disabled={processing}
                                />
                                <InputError
                                    message={errors.media_footer_right}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-slate-200 bg-white p-5">
                        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
                                    Priorities Section
                                </p>
                                <h3 className="mt-1 text-xl font-bold text-slate-900">
                                    Governance Priorities
                                </h3>
                            </div>
                            <SecondaryButton
                                type="button"
                                onClick={addPriority}
                            >
                                Add Priority
                            </SecondaryButton>
                        </div>

                        <div className="mb-5">
                            <InputLabel
                                htmlFor="priorities_title"
                                value="Priorities Section Title"
                            />
                            <TextInput
                                id="priorities_title"
                                value={data.priorities_title}
                                onChange={(event) =>
                                    setData(
                                        "priorities_title",
                                        event.target.value,
                                    )
                                }
                                className="mt-1 block w-full"
                                disabled={processing}
                            />
                            <InputError
                                message={errors.priorities_title}
                                className="mt-2"
                            />
                        </div>

                        <div className="grid gap-4 xl:grid-cols-2">
                            {data.priorities_items.map((item, index) => (
                                <div
                                    key={item.id || `priority-${index}`}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                                >
                                    <div className="mb-4 flex items-center justify-between gap-3">
                                        <p className="text-sm font-semibold text-slate-800">
                                            Priority {index + 1}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => removePriority(index)}
                                            className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-600"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <InputLabel
                                                value="Priority Title"
                                            />
                                            <TextInput
                                                value={item.title}
                                                onChange={(event) =>
                                                    updatePriority(
                                                        index,
                                                        "title",
                                                        event.target.value,
                                                    )
                                                }
                                                className="mt-1 block w-full"
                                                disabled={processing}
                                            />
                                            <InputError
                                                message={
                                                    errors[
                                                        `priorities_items.${index}.title`
                                                    ]
                                                }
                                                className="mt-2"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                value="Priority Description"
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
                                                rows="4"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                disabled={processing}
                                            />
                                            <InputError
                                                message={
                                                    errors[
                                                        `priorities_items.${index}.description`
                                                    ]
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <InputError
                            message={errors.priorities_items}
                            className="mt-2"
                        />
                    </section>

                    <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                        <SecondaryButton
                            type="button"
                            onClick={() => window.location.reload()}
                            disabled={processing}
                        >
                            Reset View
                        </SecondaryButton>
                        <PrimaryButton disabled={processing}>
                            {processing ? "Saving..." : "Save About Content"}
                        </PrimaryButton>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default About;

About.layout = (page) => (
    <AdminLayout
        user={page.props.auth.user}
        title="About CMS"
        breadcrumbs={[{ label: "Admin Workspace" }, { label: "About CMS" }]}
        children={page}
    />
);
