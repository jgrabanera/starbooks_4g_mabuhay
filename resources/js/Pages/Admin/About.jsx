import AdminLayout from "@/Layouts/AdminLayout";
import ActionConfirmationModal from "@/Components/ActionConfirmationModal";
import ActionStatusAlert from "@/Components/ActionStatusAlert";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useRef, useState } from "react";
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

const getCouncilMemberImageStatus = (member) => {
    if (member?.image) {
        return {
            label: "New image selected",
            className:
                "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
        };
    }

    if (member?.current_image) {
        return {
            label: "With image",
            className:
                "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
        };
    }

    return {
        label: "No image",
        className:
            "bg-slate-100 text-slate-500 ring-1 ring-inset ring-slate-200",
    };
};

const createEmptyBarangayDraft = (id = null) => ({
    id,
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
});

const getBarangayImageStatus = (barangay) => {
    if (barangay?.captain_image) {
        return {
            label: "With image",
            className:
                "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
        };
    }

    return {
        label: "No image",
        className:
            "bg-slate-100 text-slate-500 ring-1 ring-inset ring-slate-200",
    };
};

export default function About({ aboutContent }) {
    const [activeTab, setActiveTab] = useState("about");
    const [confirmationState, setConfirmationState] = useState({
        show: false,
        title: "",
        message: "",
        confirmLabel: "Confirm",
    });
    const [notification, setNotification] = useState({
        show: false,
        type: "success",
        message: "",
    });
    const [isCouncilMemberModalOpen, setIsCouncilMemberModalOpen] =
        useState(false);
    const [editingCouncilMemberIndex, setEditingCouncilMemberIndex] =
        useState(null);
    const [councilMemberDraft, setCouncilMemberDraft] = useState({
        name: "",
        role: "Council Member",
        image: null,
        current_image: null,
    });
    const [isBarangayModalOpen, setIsBarangayModalOpen] = useState(false);
    const [editingBarangayIndex, setEditingBarangayIndex] = useState(null);
    const [barangayDraft, setBarangayDraft] = useState(
        createEmptyBarangayDraft(),
    );
    const pendingConfirmationActionRef = useRef(null);
    const notificationTimeoutRef = useRef(null);
    const {
        data,
        setData,
        post,
        transform,
        processing,
        errors,
        recentlySuccessful,
    } = useForm({
        section: "about",
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

    const currentTabLabel =
        activeTab === "about"
            ? "About Tab"
            : activeTab === "organization"
              ? "Organization Tab"
              : "LGU Tab";

    const openConfirmation = ({
        title,
        message,
        confirmLabel = "Confirm",
        onConfirm,
    }) => {
        pendingConfirmationActionRef.current = onConfirm;
        setConfirmationState({
            show: true,
            title,
            message,
            confirmLabel,
        });
    };

    const closeConfirmation = () => {
        pendingConfirmationActionRef.current = null;
        setConfirmationState((currentState) => ({
            ...currentState,
            show: false,
        }));
    };

    const confirmPendingAction = () => {
        const action = pendingConfirmationActionRef.current;

        closeConfirmation();

        if (action) {
            action();
        }
    };

    const showNotification = (type, message) => {
        setNotification({
            show: true,
            type,
            message,
        });

        window.clearTimeout(notificationTimeoutRef.current);
        notificationTimeoutRef.current = window.setTimeout(() => {
            setNotification((currentState) => ({
                ...currentState,
                show: false,
            }));
        }, 4000);
    };

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

    const closeCouncilMemberModal = () => {
        setIsCouncilMemberModalOpen(false);
        setEditingCouncilMemberIndex(null);
        setCouncilMemberDraft({
            name: "",
            role: "Council Member",
            image: null,
            current_image: null,
        });
    };

    const openCreateCouncilMemberModal = () => {
        setEditingCouncilMemberIndex(null);
        setCouncilMemberDraft({
            name: "",
            role: "Council Member",
            image: null,
            current_image: null,
        });
        setIsCouncilMemberModalOpen(true);
    };

    const openEditCouncilMemberModal = (member, index) => {
        setEditingCouncilMemberIndex(index);
        setCouncilMemberDraft({
            name: member?.name ?? "",
            role: member?.role ?? "Council Member",
            image: null,
            current_image: member?.current_image ?? null,
        });
        setIsCouncilMemberModalOpen(true);
    };

    const submitCouncilMemberModal = (event) => {
        event.preventDefault();

        openConfirmation({
            title:
                editingCouncilMemberIndex !== null
                    ? "Update council member?"
                    : "Add council member?",
            message:
                editingCouncilMemberIndex !== null
                    ? "Are you sure you want to save this council member update?"
                    : "Are you sure you want to add this council member entry?",
            confirmLabel:
                editingCouncilMemberIndex !== null ? "Save Member" : "Add Member",
            onConfirm: () => {
                if (editingCouncilMemberIndex !== null) {
                    const nextMembers = [...data.organization_council_members];
                    nextMembers[editingCouncilMemberIndex] = {
                        ...nextMembers[editingCouncilMemberIndex],
                        name: councilMemberDraft.name,
                        role: councilMemberDraft.role,
                        image: councilMemberDraft.image,
                        current_image:
                            nextMembers[editingCouncilMemberIndex]
                                ?.current_image ?? null,
                    };
                    setData("organization_council_members", nextMembers);
                    closeCouncilMemberModal();
                    showNotification(
                        "success",
                        "Council member details were updated successfully.",
                    );

                    return;
                }

                setData("organization_council_members", [
                    ...data.organization_council_members,
                    {
                        id: `member-${data.organization_council_members.length + 1}`,
                        name: councilMemberDraft.name,
                        role: councilMemberDraft.role,
                        image: councilMemberDraft.image,
                        current_image: null,
                    },
                ]);
                closeCouncilMemberModal();
                showNotification(
                    "success",
                    "New council member entry was added successfully.",
                );
            },
        });
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

    const closeBarangayModal = () => {
        setIsBarangayModalOpen(false);
        setEditingBarangayIndex(null);
        setBarangayDraft(createEmptyBarangayDraft());
    };

    const openCreateBarangayModal = () => {
        setEditingBarangayIndex(null);
        setBarangayDraft(
            createEmptyBarangayDraft(data.lgu_barangays.length + 1),
        );
        setIsBarangayModalOpen(true);
    };

    const openEditBarangayModal = (barangay, index) => {
        setEditingBarangayIndex(index);
        setBarangayDraft({
            id: barangay?.id ?? index + 1,
            title: barangay?.title ?? "",
            reference: barangay?.reference ?? "",
            population: barangay?.population ?? 0,
            captain_image: barangay?.captain_image ?? null,
            officials: {
                captain: barangay?.officials?.captain ?? "",
                secretary: barangay?.officials?.secretary ?? "",
                treasurer: barangay?.officials?.treasurer ?? "",
                skChairperson: barangay?.officials?.skChairperson ?? "",
                kagawads: Array.isArray(barangay?.officials?.kagawads)
                    ? barangay.officials.kagawads
                    : [""],
            },
        });
        setIsBarangayModalOpen(true);
    };

    const submitBarangayModal = (event) => {
        event.preventDefault();

        openConfirmation({
            title:
                editingBarangayIndex !== null
                    ? "Update barangay?"
                    : "Add barangay?",
            message:
                editingBarangayIndex !== null
                    ? "Are you sure you want to save this barangay update?"
                    : "Are you sure you want to add this barangay record?",
            confirmLabel:
                editingBarangayIndex !== null
                    ? "Save Barangay"
                    : "Add Barangay",
            onConfirm: () => {
                const nextBarangay = {
                    ...barangayDraft,
                    population: Number(barangayDraft.population) || 0,
                    officials: {
                        ...barangayDraft.officials,
                        kagawads: (barangayDraft.officials.kagawads ?? [])
                            .map((item) => item.trim())
                            .filter(Boolean),
                    },
                };

                if (editingBarangayIndex !== null) {
                    const nextBarangays = [...data.lgu_barangays];
                    nextBarangays[editingBarangayIndex] = nextBarangay;
                    setData("lgu_barangays", nextBarangays);
                    closeBarangayModal();
                    showNotification(
                        "success",
                        "Barangay details were updated successfully.",
                    );

                    return;
                }

                setData("lgu_barangays", [...data.lgu_barangays, nextBarangay]);
                closeBarangayModal();
                showNotification(
                    "success",
                    "New barangay entry was added successfully.",
                );
            },
        });
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

    const submit = (event, section = activeTab) => {
        event.preventDefault();

        openConfirmation({
            title: `Save ${section === "about" ? "About" : section === "organization" ? "Organization" : "LGU"} tab?`,
            message: `Are you sure you want to save the latest changes for the ${section === "about" ? "About" : section === "organization" ? "Organization" : "LGU"} tab?`,
            confirmLabel: "Save Changes",
            onConfirm: () => {
                transform((currentData) => ({
                    ...currentData,
                    section,
                }));

                post(route("admin.about.update"), {
                    forceFormData: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        showNotification(
                            "success",
                            `${section === "about" ? "About" : section === "organization" ? "Organization" : "LGU"} tab changes were saved successfully.`,
                        );
                    },
                    onError: () => {
                        showNotification(
                            "error",
                            `The ${section === "about" ? "About" : section === "organization" ? "Organization" : "LGU"} tab could not be saved. Please review the form and try again.`,
                        );
                    },
                    onFinish: () => {
                        transform((currentData) => currentData);
                    },
                });
            },
        });
    };

    const confirmAddAction = (title, message, action) => {
        openConfirmation({
            title,
            message,
            confirmLabel: "Add",
            onConfirm: action,
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
        <>
            <div className="space-y-6">
                <ActionStatusAlert notification={notification} />

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
                            <PrimaryButton
                                onClick={(event) => submit(event, activeTab)}
                                disabled={processing}
                            >
                                {processing
                                    ? "Saving..."
                                    : `Save ${currentTabLabel}`}
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
                                                        getCouncilMemberImageStatus(
                                                            member,
                                                        );

                                                    return (
                                                        <tr
                                                            key={
                                                                member.id ||
                                                                index
                                                            }
                                                            className="transition hover:bg-slate-50/80"
                                                        >
                                                            <td className="px-4 py-4 text-sm font-semibold text-slate-700">
                                                                {index + 1}
                                                            </td>
                                                            <td className="px-4 py-4 text-sm text-slate-600">
                                                                <span
                                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${imageStatus.className}`}
                                                                >
                                                                    {
                                                                        imageStatus.label
                                                                    }
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
                                    {data.organization_council_members.map(
                                        (member, index) => {
                                            const imageStatus =
                                                getCouncilMemberImageStatus(
                                                    member,
                                                );

                                            return (
                                                <article
                                                    key={member.id || index}
                                                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                                                >
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div>
                                                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                                                                Council Member{" "}
                                                                {index + 1}
                                                            </p>
                                                            <p className="mt-2 text-base font-semibold text-slate-900">
                                                                {member.name ||
                                                                    "Untitled member"}
                                                            </p>
                                                            <p
                                                                className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] ${imageStatus.className}`}
                                                            >
                                                                {
                                                                    imageStatus.label
                                                                }
                                                            </p>
                                                            <p className="mt-2 text-sm text-slate-500">
                                                                {member.role ||
                                                                    "Council Member"}
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
                                                                    removeCouncilMember(
                                                                        index,
                                                                    )
                                                                }
                                                                className="text-sm font-semibold text-rose-600"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </article>
                                            );
                                        },
                                    )}
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
                                    <InputError
                                        message={errors.lgu_logo}
                                        className="mt-2"
                                    />
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
                                            {data.lgu_barangays.map(
                                                (barangay, index) => {
                                                    const imageStatus =
                                                        getBarangayImageStatus(
                                                            barangay,
                                                        );

                                                    return (
                                                        <tr
                                                            key={
                                                                barangay.id ||
                                                                index
                                                            }
                                                            className="transition hover:bg-slate-50/70"
                                                        >
                                                            <td className="px-4 py-4 text-sm font-semibold text-slate-700">
                                                                {index + 1}
                                                            </td>
                                                            <td className="px-4 py-4 text-sm text-slate-600">
                                                                <span
                                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${imageStatus.className}`}
                                                                >
                                                                    {
                                                                        imageStatus.label
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                                                                {barangay.title ||
                                                                    "Untitled barangay"}
                                                            </td>
                                                            <td className="px-4 py-4 text-sm text-slate-600">
                                                                {barangay
                                                                    .officials
                                                                    ?.captain ||
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
                                                                            removeBarangay(
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

                                <div className="space-y-4 lg:hidden">
                                    {data.lgu_barangays.map((barangay, index) => (
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
                                                        onClick={() =>
                                                            removeBarangay(
                                                                index,
                                                            )
                                                        }
                                                        className="text-xs font-semibold uppercase text-rose-600"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="space-y-2 text-sm text-slate-600">
                                                <p>
                                                    <span className="font-semibold text-slate-900">
                                                        Name:
                                                    </span>{" "}
                                                    {barangay.title ||
                                                        "Untitled barangay"}
                                                </p>
                                                <p>
                                                    <span className="font-semibold text-slate-900">
                                                        Captain:
                                                    </span>{" "}
                                                    {barangay.officials
                                                        ?.captain ||
                                                        "No captain"}
                                                </p>
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] ${getBarangayImageStatus(barangay).className}`}
                                                >
                                                    {
                                                        getBarangayImageStatus(
                                                            barangay,
                                                        ).label
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    ) : null}

                </form>
                </section>
            </div>

            <ActionConfirmationModal
                show={confirmationState.show}
                onClose={closeConfirmation}
                onConfirm={confirmPendingAction}
                title={confirmationState.title}
                message={confirmationState.message}
                confirmLabel={confirmationState.confirmLabel}
                processing={processing}
            />

            <Modal
                show={isBarangayModalOpen}
                onClose={closeBarangayModal}
                maxWidth="3xl"
            >
                <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
                                Barangay
                            </p>
                            <h2 className="mt-2 text-2xl font-bold text-slate-950">
                                {editingBarangayIndex !== null
                                    ? "Edit Barangay"
                                    : "Add Barangay"}
                            </h2>
                            <p className="mt-1 text-sm text-slate-600">
                                Enter the barangay details that will appear in
                                the public LGU directory.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={closeBarangayModal}
                            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                        >
                            <span className="sr-only">Close modal</span>
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 6l12 12M18 6L6 18"
                                />
                            </svg>
                        </button>
                    </div>

                    <form
                        onSubmit={submitBarangayModal}
                        className="mt-6 space-y-4"
                    >
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <InputLabel value="Barangay Title" />
                                <TextInput
                                    value={barangayDraft.title}
                                    onChange={(event) =>
                                        setBarangayDraft((currentState) => ({
                                            ...currentState,
                                            title: event.target.value,
                                        }))
                                    }
                                    className="mt-1 block w-full"
                                />
                            </div>
                            <div>
                                <InputLabel value="Reference Code" />
                                <TextInput
                                    value={barangayDraft.reference}
                                    onChange={(event) =>
                                        setBarangayDraft((currentState) => ({
                                            ...currentState,
                                            reference: event.target.value,
                                        }))
                                    }
                                    className="mt-1 block w-full"
                                />
                            </div>
                            <div>
                                <InputLabel value="Population" />
                                <TextInput
                                    value={barangayDraft.population}
                                    onChange={(event) =>
                                        setBarangayDraft((currentState) => ({
                                            ...currentState,
                                            population: event.target.value,
                                        }))
                                    }
                                    className="mt-1 block w-full"
                                />
                            </div>
                            <div>
                                <InputLabel value="Barangay Captain" />
                                <TextInput
                                    value={barangayDraft.officials.captain}
                                    onChange={(event) =>
                                        setBarangayDraft((currentState) => ({
                                            ...currentState,
                                            officials: {
                                                ...currentState.officials,
                                                captain: event.target.value,
                                            },
                                        }))
                                    }
                                    className="mt-1 block w-full"
                                />
                            </div>
                            <div>
                                <InputLabel value="Secretary" />
                                <TextInput
                                    value={barangayDraft.officials.secretary}
                                    onChange={(event) =>
                                        setBarangayDraft((currentState) => ({
                                            ...currentState,
                                            officials: {
                                                ...currentState.officials,
                                                secretary: event.target.value,
                                            },
                                        }))
                                    }
                                    className="mt-1 block w-full"
                                />
                            </div>
                            <div>
                                <InputLabel value="Treasurer" />
                                <TextInput
                                    value={barangayDraft.officials.treasurer}
                                    onChange={(event) =>
                                        setBarangayDraft((currentState) => ({
                                            ...currentState,
                                            officials: {
                                                ...currentState.officials,
                                                treasurer: event.target.value,
                                            },
                                        }))
                                    }
                                    className="mt-1 block w-full"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <InputLabel value="SK Chairperson" />
                                <TextInput
                                    value={barangayDraft.officials.skChairperson}
                                    onChange={(event) =>
                                        setBarangayDraft((currentState) => ({
                                            ...currentState,
                                            officials: {
                                                ...currentState.officials,
                                                skChairperson:
                                                    event.target.value,
                                            },
                                        }))
                                    }
                                    className="mt-1 block w-full"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <InputLabel value="Kagawads (one per line)" />
                                <textarea
                                    value={(
                                        barangayDraft.officials.kagawads ?? []
                                    ).join("\n")}
                                    onChange={(event) =>
                                        setBarangayDraft((currentState) => ({
                                            ...currentState,
                                            officials: {
                                                ...currentState.officials,
                                                kagawads: event.target.value
                                                    .split("\n")
                                                    .map((item) =>
                                                        item.trim(),
                                                    ),
                                            },
                                        }))
                                    }
                                    rows="5"
                                    className="mt-1 block w-full rounded-md border-gray-300"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                            <SecondaryButton
                                type="button"
                                onClick={closeBarangayModal}
                            >
                                Cancel
                            </SecondaryButton>
                            <PrimaryButton type="submit">
                                {editingBarangayIndex !== null
                                    ? "Save Barangay"
                                    : "Add Barangay"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            <Modal
                show={isCouncilMemberModalOpen}
                onClose={closeCouncilMemberModal}
                maxWidth="lg"
            >
                <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
                                Council Member
                            </p>
                            <h2 className="mt-2 text-2xl font-bold text-slate-950">
                                {editingCouncilMemberIndex !== null
                                    ? "Edit Council Member"
                                    : "Add Council Member"}
                            </h2>
                            <p className="mt-1 text-sm text-slate-600">
                                Enter the council member details that will appear
                                in the public organization layout.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={closeCouncilMemberModal}
                            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                        >
                            <span className="sr-only">Close modal</span>
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 6l12 12M18 6L6 18"
                                />
                            </svg>
                        </button>
                    </div>

                    <form
                        onSubmit={submitCouncilMemberModal}
                        className="mt-6 space-y-4"
                    >
                        <div>
                            <InputLabel value="Member Name" />
                            <TextInput
                                value={councilMemberDraft.name}
                                onChange={(event) =>
                                    setCouncilMemberDraft((currentState) => ({
                                        ...currentState,
                                        name: event.target.value,
                                    }))
                                }
                                className="mt-1 block w-full"
                            />
                        </div>

                        <div>
                            <InputLabel value="Role" />
                            <TextInput
                                value={councilMemberDraft.role}
                                onChange={(event) =>
                                    setCouncilMemberDraft((currentState) => ({
                                        ...currentState,
                                        role: event.target.value,
                                    }))
                                }
                                className="mt-1 block w-full"
                            />
                        </div>

                        <div>
                            <InputLabel value="Member Image" />
                            <input
                                type="file"
                                accept=".png,.jpg,.jpeg,.webp"
                                onChange={(event) =>
                                    setCouncilMemberDraft((currentState) => ({
                                        ...currentState,
                                        image:
                                            event.target.files?.[0] ?? null,
                                    }))
                                }
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                            />
                            {councilMemberDraft.current_image ? (
                                <p className="mt-2 text-xs text-slate-500">
                                    Current image:{" "}
                                    {councilMemberDraft.current_image}
                                </p>
                            ) : (
                                <p className="mt-2 text-xs text-slate-500">
                                    Upload an optional image for this council
                                    member.
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                            <SecondaryButton
                                type="button"
                                onClick={closeCouncilMemberModal}
                            >
                                Cancel
                            </SecondaryButton>
                            <PrimaryButton type="submit">
                                {editingCouncilMemberIndex !== null
                                    ? "Save Member"
                                    : "Add Member"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
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
