import AdminLayout from "@/Layouts/AdminLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import {
    IoGridOutline,
    IoInformationCircleOutline,
    IoLocationOutline,
} from "react-icons/io5";

const normalizeArray = (items, fallback) =>
    Array.isArray(items) && items.length > 0 ? items : fallback;

const sectionClassName =
    "rounded-3xl border border-slate-200 bg-white p-5 shadow-sm";

const contentCardClassName =
    "rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6";

export default function About({ aboutContent }) {
    const [activeTab, setActiveTab] = useState("about");
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
            [""],
        ),
        overview_highlights: normalizeArray(
            aboutContent?.overview_highlights,
            [""],
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
        organization_mayor_name:
            aboutContent?.organization_mayor_name ?? "",
        organization_mayor_role:
            aboutContent?.organization_mayor_role ?? "",
        organization_mayor_image: null,
        organization_vice_mayor_name:
            aboutContent?.organization_vice_mayor_name ?? "",
        organization_vice_mayor_role:
            aboutContent?.organization_vice_mayor_role ?? "",
        organization_vice_mayor_image: null,
        organization_council_members: normalizeArray(
            aboutContent?.organization_council_members,
            [{ id: "member-1", name: "", role: "Council Member", image: null }],
        ),
        lgu_badge: aboutContent?.lgu_badge ?? "",
        lgu_subtitle: aboutContent?.lgu_subtitle ?? "",
        lgu_title: aboutContent?.lgu_title ?? "",
        lgu_logo: null,
        lgu_barangays: normalizeArray(aboutContent?.lgu_barangays, [
            {
                id: 1,
                title: "",
                reference: "",
                population: 0,
                captain_image: null,
                officials: {
                    captain: "",
                    secretary: "",
                    treasurer: "",
                    skChairperson: "",
                    kagawads: [""],
                },
            },
        ]),
        priorities_title: aboutContent?.priorities_title ?? "",
        priorities_items: normalizeArray(aboutContent?.priorities_items, [
            { id: "priority-1", title: "", description: "" },
        ]),
    });

    const replaceList = (key, nextValue) => {
        setData(key, nextValue);
    };

    const updateSimpleListItem = (key, index, value) => {
        const nextItems = [...data[key]];
        nextItems[index] = value;
        replaceList(key, nextItems);
    };

    const addSimpleListItem = (key, value = "") => {
        replaceList(key, [...data[key], value]);
    };

    const removeSimpleListItem = (key, index) => {
        if (data[key].length === 1) {
            return;
        }

        replaceList(
            key,
            data[key].filter((_, itemIndex) => itemIndex !== index),
        );
    };

    const updateCouncilMember = (index, field, value) => {
        const nextMembers = [...data.organization_council_members];
        nextMembers[index] = {
            ...nextMembers[index],
            [field]: value,
        };
        setData("organization_council_members", nextMembers);
    };

    const addCouncilMember = () => {
        setData("organization_council_members", [
            ...data.organization_council_members,
            {
                id: `member-${data.organization_council_members.length + 1}`,
                name: "",
                role: "Council Member",
                image: null,
            },
        ]);
    };

    const removeCouncilMember = (index) => {
        if (data.organization_council_members.length === 1) {
            return;
        }

        setData(
            "organization_council_members",
            data.organization_council_members.filter(
                (_, itemIndex) => itemIndex !== index,
            ),
        );
    };

    const updatePriority = (index, field, value) => {
        const nextItems = [...data.priorities_items];
        nextItems[index] = {
            ...nextItems[index],
            [field]: value,
        };
        setData("priorities_items", nextItems);
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

    const updateBarangay = (index, field, value) => {
        const nextBarangays = [...data.lgu_barangays];
        nextBarangays[index] = {
            ...nextBarangays[index],
            [field]: value,
        };
        setData("lgu_barangays", nextBarangays);
    };

    const updateBarangayOfficial = (index, field, value) => {
        const nextBarangays = [...data.lgu_barangays];
        nextBarangays[index] = {
            ...nextBarangays[index],
            officials: {
                ...nextBarangays[index].officials,
                [field]: value,
            },
        };
        setData("lgu_barangays", nextBarangays);
    };

    const updateBarangayKagawads = (index, value) => {
        const nextBarangays = [...data.lgu_barangays];
        nextBarangays[index] = {
            ...nextBarangays[index],
            officials: {
                ...nextBarangays[index].officials,
                kagawads: value
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean),
            },
        };
        setData("lgu_barangays", nextBarangays);
    };

    const addBarangay = () => {
        setData("lgu_barangays", [
            ...data.lgu_barangays,
            {
                id: data.lgu_barangays.length + 1,
                title: "",
                reference: "",
                population: 0,
                captain_image: null,
                officials: {
                    captain: "",
                    secretary: "",
                    treasurer: "",
                    skChairperson: "",
                    kagawads: [""],
                },
            },
        ]);
    };

    const removeBarangay = (index) => {
        if (data.lgu_barangays.length === 1) {
            return;
        }

        setData(
            "lgu_barangays",
            data.lgu_barangays.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    const submit = (event) => {
        event.preventDefault();

        post(route("admin.about.update"), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const tabs = [
        {
            id: "about",
            label: "About Tab",
            helper: "Hero, overview, media, and priorities content.",
            icon: IoInformationCircleOutline,
        },
        {
            id: "organization",
            label: "Organization Tab",
            helper: "Mayor, vice mayor, and council member content.",
            icon: IoGridOutline,
        },
        {
            id: "lgu",
            label: "LGU Tab",
            helper: "Barangay directory header and barangay records.",
            icon: IoLocationOutline,
        },
    ];

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
                                Manage the About, Organization, and LGU tabs
                                from one structured CMS page.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            {recentlySuccessful ? (
                                <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                                    Saved
                                </span>
                            ) : null}
                            <PrimaryButton onClick={submit} disabled={processing}>
                                {processing ? "Saving..." : "Save About CMS"}
                            </PrimaryButton>
                        </div>
                    </div>
                </div>

                <div className="border-b border-slate-100 bg-slate-50/80 px-5 py-4 sm:px-6">
                    <div className="grid gap-3 md:grid-cols-3">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`rounded-2xl border px-4 py-4 text-left transition ${
                                        isActive
                                            ? "border-emerald-700 bg-emerald-700 text-white shadow-md"
                                            : "border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:bg-emerald-50/70"
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <span
                                            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border ${
                                                isActive
                                                    ? "border-white/20 bg-white/15"
                                                    : "border-emerald-100 bg-emerald-50"
                                            }`}
                                        >
                                            <Icon
                                                className={`h-5 w-5 ${
                                                    isActive
                                                        ? "text-white"
                                                        : "text-emerald-700"
                                                }`}
                                            />
                                        </span>
                                        <div>
                                            <p className="text-base font-bold">
                                                {tab.label}
                                            </p>
                                            <p
                                                className={`mt-1 text-sm leading-6 ${
                                                    isActive
                                                        ? "text-emerald-50/95"
                                                        : "text-slate-500"
                                                }`}
                                            >
                                                {tab.helper}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6 p-5 sm:p-6">
                    {activeTab === "about" ? (
                        <>
                            <section className={contentCardClassName}>
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
                                <InputError message={errors.hero_title} className="mt-2" />
                            </div>
                            <div className="md:col-span-2">
                                <InputLabel value="Hero Description" />
                                <textarea
                                    value={data.hero_description}
                                    onChange={(event) =>
                                        setData(
                                            "hero_description",
                                            event.target.value,
                                        )
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
                                        setData(
                                            "overview_badge",
                                            event.target.value,
                                        )
                                    }
                                    className="mt-1 block w-full"
                                />
                            </div>
                            <div>
                                <InputLabel value="Overview Title" />
                                <TextInput
                                    value={data.overview_title}
                                    onChange={(event) =>
                                        setData(
                                            "overview_title",
                                            event.target.value,
                                        )
                                    }
                                    className="mt-1 block w-full"
                                />
                            </div>
                                </div>
                            </section>

                            <section className={contentCardClassName}>
                                <div className="grid gap-5 xl:grid-cols-2">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold text-slate-800">
                                                Overview Paragraphs
                                            </p>
                                            <SecondaryButton
                                                type="button"
                                                onClick={() =>
                                                    addSimpleListItem(
                                                        "overview_paragraphs",
                                                    )
                                                }
                                            >
                                                Add
                                            </SecondaryButton>
                                        </div>
                                        {data.overview_paragraphs.map((item, index) => (
                                            <div
                                                key={`paragraph-${index}`}
                                                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
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
                                                    addSimpleListItem(
                                                        "overview_highlights",
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

                            <section className={contentCardClassName}>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
                                        Media And Priorities
                                    </p>
                                    <h3 className="mt-1 text-xl font-bold text-slate-900">
                                        Showcase Content
                                    </h3>
                                </div>

                                <div className="mt-5 grid gap-5 md:grid-cols-2">
                            <div>
                                <InputLabel value="Media Badge" />
                                <TextInput value={data.media_badge} onChange={(event) => setData("media_badge", event.target.value)} className="mt-1 block w-full" />
                            </div>
                            <div>
                                <InputLabel value="Media Title" />
                                <TextInput value={data.media_title} onChange={(event) => setData("media_title", event.target.value)} className="mt-1 block w-full" />
                            </div>
                            <div>
                                <InputLabel value="Preview Image" />
                                <input type="file" accept=".png,.jpg,.jpeg,.webp" onChange={(event) => setData("media_preview_image", event.target.files?.[0] ?? null)} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
                            </div>
                            <div>
                                <InputLabel value="Video File" />
                                <input type="file" accept=".mp4,.webm,.mov,video/mp4,video/webm,video/quicktime" onChange={(event) => setData("media_video", event.target.files?.[0] ?? null)} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
                                <InputError message={errors.media_video} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel value="Overlay Title" />
                                <TextInput value={data.media_overlay_title} onChange={(event) => setData("media_overlay_title", event.target.value)} className="mt-1 block w-full" />
                            </div>
                            <div>
                                <InputLabel value="Priorities Title" />
                                <TextInput value={data.priorities_title} onChange={(event) => setData("priorities_title", event.target.value)} className="mt-1 block w-full" />
                            </div>
                            <div className="md:col-span-2">
                                <InputLabel value="Overlay Description" />
                                <textarea value={data.media_overlay_description} onChange={(event) => setData("media_overlay_description", event.target.value)} rows="4" className="mt-1 block w-full rounded-md border-gray-300" />
                            </div>
                                </div>

                                <div className="mt-5 flex items-center justify-between">
                                    <p className="text-sm font-semibold text-slate-800">
                                        Priority Cards
                                    </p>
                                    <SecondaryButton type="button" onClick={addPriority}>
                                        Add Priority
                                    </SecondaryButton>
                                </div>
                                <div className="mt-4 grid gap-4 xl:grid-cols-2">
                                    {data.priorities_items.map((item, index) => (
                                        <div key={item.id || index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <div className="mb-3 flex items-center justify-between">
                                                <p className="text-sm font-semibold text-slate-700">
                                                    Priority {index + 1}
                                                </p>
                                                <button type="button" onClick={() => removePriority(index)} className="text-xs font-semibold uppercase text-rose-600">
                                                    Remove
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                <TextInput value={item.title} onChange={(event) => updatePriority(index, "title", event.target.value)} className="block w-full" />
                                                <textarea value={item.description} onChange={(event) => updatePriority(index, "description", event.target.value)} rows="3" className="block w-full rounded-md border-gray-300" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </>
                    ) : null}

                    {activeTab === "organization" ? (
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
                                        Update the mayor, vice mayor, and council members shown in the organizational layout.
                                    </p>
                                </div>
                                <SecondaryButton type="button" onClick={addCouncilMember}>
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
                                                Highlight the primary executive shown at the top of the organization chart.
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <InputLabel value="Mayor Name" />
                                                <TextInput value={data.organization_mayor_name} onChange={(event) => setData("organization_mayor_name", event.target.value)} className="mt-1 block w-full border-emerald-200 focus:border-emerald-400 focus:ring-emerald-200" />
                                            </div>
                                            <div>
                                                <InputLabel value="Mayor Role" />
                                                <TextInput value={data.organization_mayor_role} onChange={(event) => setData("organization_mayor_role", event.target.value)} className="mt-1 block w-full border-emerald-200 focus:border-emerald-400 focus:ring-emerald-200" />
                                            </div>
                                            <div>
                                                <InputLabel value="Mayor Image" />
                                                <input type="file" accept=".png,.jpg,.jpeg,.webp" onChange={(event) => setData("organization_mayor_image", event.target.files?.[0] ?? null)} className="mt-1 block w-full rounded-md border border-emerald-200 bg-white px-3 py-2 text-sm" />
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
                                                Maintain the secondary leadership card displayed directly below the mayor.
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <InputLabel value="Vice Mayor Name" />
                                                <TextInput value={data.organization_vice_mayor_name} onChange={(event) => setData("organization_vice_mayor_name", event.target.value)} className="mt-1 block w-full border-amber-200 focus:border-amber-400 focus:ring-amber-200" />
                                            </div>
                                            <div>
                                                <InputLabel value="Vice Mayor Role" />
                                                <TextInput value={data.organization_vice_mayor_role} onChange={(event) => setData("organization_vice_mayor_role", event.target.value)} className="mt-1 block w-full border-amber-200 focus:border-amber-400 focus:ring-amber-200" />
                                            </div>
                                            <div>
                                                <InputLabel value="Vice Mayor Image" />
                                                <input type="file" accept=".png,.jpg,.jpeg,.webp" onChange={(event) => setData("organization_vice_mayor_image", event.target.files?.[0] ?? null)} className="mt-1 block w-full rounded-md border border-amber-200 bg-white px-3 py-2 text-sm" />
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
                                            These entries feed the repeating member cards in the public organization layout.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-4 xl:grid-cols-2">
                                {data.organization_council_members.map((member, index) => (
                                    <div key={member.id || index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <div className="mb-3 flex items-center justify-between">
                                            <p className="text-sm font-semibold text-slate-700">
                                                Council Member {index + 1}
                                            </p>
                                            <button type="button" onClick={() => removeCouncilMember(index)} className="text-xs font-semibold uppercase text-rose-600">
                                                Remove
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            <TextInput value={member.name} onChange={(event) => updateCouncilMember(index, "name", event.target.value)} className="block w-full" />
                                            <TextInput value={member.role} onChange={(event) => updateCouncilMember(index, "role", event.target.value)} className="block w-full" />
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </section>
                    ) : null}

                    {activeTab === "lgu" ? (
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
                                        Manage the LGU directory header and barangay records used by the search page and modal.
                                    </p>
                                </div>
                                <SecondaryButton type="button" onClick={addBarangay}>
                                    Add Barangay
                                </SecondaryButton>
                            </div>

                            <div className="mt-5 grid gap-5 md:grid-cols-2">
                                <div>
                                    <InputLabel value="LGU Badge" />
                                    <TextInput value={data.lgu_badge} onChange={(event) => setData("lgu_badge", event.target.value)} className="mt-1 block w-full" />
                                </div>
                                <div>
                                    <InputLabel value="LGU Subtitle" />
                                    <TextInput value={data.lgu_subtitle} onChange={(event) => setData("lgu_subtitle", event.target.value)} className="mt-1 block w-full" />
                                </div>
                                <div>
                                    <InputLabel value="LGU Title" />
                                    <TextInput value={data.lgu_title} onChange={(event) => setData("lgu_title", event.target.value)} className="mt-1 block w-full" />
                                </div>
                                <div>
                                    <InputLabel value="LGU Logo" />
                                    <input type="file" accept=".png,.jpg,.jpeg,.webp" onChange={(event) => setData("lgu_logo", event.target.files?.[0] ?? null)} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" />
                                </div>
                            </div>

                            <div className="mt-5 space-y-4">
                                {data.lgu_barangays.map((barangay, index) => (
                                    <div key={barangay.id || index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <div className="mb-4 flex items-center justify-between">
                                            <p className="text-sm font-semibold text-slate-700">
                                                Barangay {index + 1}
                                            </p>
                                            <button type="button" onClick={() => removeBarangay(index)} className="text-xs font-semibold uppercase text-rose-600">
                                                Remove
                                            </button>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <TextInput value={barangay.title} onChange={(event) => updateBarangay(index, "title", event.target.value)} className="block w-full" />
                                            <TextInput value={barangay.reference} onChange={(event) => updateBarangay(index, "reference", event.target.value)} className="block w-full" />
                                            <TextInput value={barangay.population} onChange={(event) => updateBarangay(index, "population", event.target.value)} className="block w-full" />
                                            <TextInput value={barangay.officials.captain} onChange={(event) => updateBarangayOfficial(index, "captain", event.target.value)} className="block w-full" />
                                            <TextInput value={barangay.officials.secretary} onChange={(event) => updateBarangayOfficial(index, "secretary", event.target.value)} className="block w-full" />
                                            <TextInput value={barangay.officials.treasurer} onChange={(event) => updateBarangayOfficial(index, "treasurer", event.target.value)} className="block w-full" />
                                            <TextInput value={barangay.officials.skChairperson} onChange={(event) => updateBarangayOfficial(index, "skChairperson", event.target.value)} className="block w-full md:col-span-2" />
                                            <div className="md:col-span-2">
                                                <InputLabel value="Kagawads (one per line)" />
                                                <textarea
                                                    value={(barangay.officials.kagawads ?? []).join("\n")}
                                                    onChange={(event) =>
                                                        updateBarangayKagawads(
                                                            index,
                                                            event.target.value,
                                                        )
                                                    }
                                                    rows="4"
                                                    className="mt-1 block w-full rounded-md border-gray-300"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ) : null}

                    <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                        <PrimaryButton disabled={processing}>
                            {processing ? "Saving..." : "Save About CMS"}
                        </PrimaryButton>
                    </div>
                </form>
            </section>
        </div>
    );
}

About.layout = (page) => (
    <AdminLayout
        user={page.props.auth.user}
        title="About CMS"
        breadcrumbs={[{ label: "Admin Workspace" }, { label: "About CMS" }]}
        children={page}
    />
);
