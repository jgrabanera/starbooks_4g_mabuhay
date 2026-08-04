import AdminLayout from "@/Layouts/AdminLayout";
import ActionConfirmationModal from "@/Components/ActionConfirmationModal";
import ActionStatusAlert from "@/Components/ActionStatusAlert";
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
import AboutTabSection from "@/Pages/Admin/About/AboutTabSection";
import OrganizationTabSection from "@/Pages/Admin/About/OrganizationTabSection";
import LguTabSection from "@/Pages/Admin/About/LguTabSection";

const normalizeArray = (items, fallback) =>
    Array.isArray(items) && items.length > 0 ? items : fallback;

const contentCardClassName =
    "rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6";

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
        overview_paragraphs: normalizeArray(aboutContent?.overview_paragraphs, [
            "",
        ]),
        overview_highlights: normalizeArray(aboutContent?.overview_highlights, [
            "",
        ]),
        media_badge: aboutContent?.media_badge ?? "",
        media_title: aboutContent?.media_title ?? "",
        media_preview_image: null,
        media_video: null,
        media_overlay_title: aboutContent?.media_overlay_title ?? "",
        media_overlay_description:
            aboutContent?.media_overlay_description ?? "",
        media_footer_left: aboutContent?.media_footer_left ?? "",
        media_footer_right: aboutContent?.media_footer_right ?? "",
        organization_mayor_name: aboutContent?.organization_mayor_name ?? "",
        organization_mayor_role: aboutContent?.organization_mayor_role ?? "",
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
            createEmptyBarangayDraft(1),
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

    const renderTabSaveButton = (section) => (
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
            {recentlySuccessful && activeTab === section ? (
                <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                    Saved
                </span>
            ) : null}
            <PrimaryButton
                onClick={(event) => submit(event, section)}
                disabled={processing}
            >
                {processing ? "Saving..." : `Save ${currentTabLabel}`}
            </PrimaryButton>
        </div>
    );

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
                editingCouncilMemberIndex !== null
                    ? "Save Member"
                    : "Add Member",
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
            title: `Save ${
                section === "about"
                    ? "About"
                    : section === "organization"
                      ? "Organization"
                      : "LGU"
            } tab?`,
            message: `Are you sure you want to save the latest changes for the ${
                section === "about"
                    ? "About"
                    : section === "organization"
                      ? "Organization"
                      : "LGU"
            } tab?`,
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
                            `${
                                section === "about"
                                    ? "About"
                                    : section === "organization"
                                      ? "Organization"
                                      : "LGU"
                            } tab changes were saved successfully.`,
                        );
                    },
                    onError: () => {
                        showNotification(
                            "error",
                            `The ${
                                section === "about"
                                    ? "About"
                                    : section === "organization"
                                      ? "Organization"
                                      : "LGU"
                            } tab could not be saved. Please review the form and try again.`,
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

                <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-white to-white px-5 py-5 sm:px-6">
                        <div className="space-y-1">
                            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">
                                Fixed Page CMS
                            </p>
                            <h2 className="text-2xl font-bold text-slate-900">
                                About LGU Mabuhay
                            </h2>
                            <p className="max-w-3xl text-sm leading-6 text-slate-600">
                                Manage the About, Organization, and LGU tabs
                                from one structured CMS page.
                            </p>
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
                                        className={`rounded-lg border px-4 py-4 text-left transition ${
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
                            <AboutTabSection
                                data={data}
                                setData={setData}
                                errors={errors}
                                contentCardClassName={contentCardClassName}
                                addSimpleListItem={addSimpleListItem}
                                confirmAddAction={confirmAddAction}
                                updateSimpleListItem={updateSimpleListItem}
                                removeSimpleListItem={removeSimpleListItem}
                                addPriority={addPriority}
                                updatePriority={updatePriority}
                                removePriority={removePriority}
                                renderTabSaveButton={renderTabSaveButton}
                            />
                        ) : null}

                        {activeTab === "organization" ? (
                            <OrganizationTabSection
                                data={data}
                                setData={setData}
                                contentCardClassName={contentCardClassName}
                                openCreateCouncilMemberModal={
                                    openCreateCouncilMemberModal
                                }
                                openEditCouncilMemberModal={
                                    openEditCouncilMemberModal
                                }
                                removeCouncilMember={removeCouncilMember}
                                getCouncilMemberImageStatus={
                                    getCouncilMemberImageStatus
                                }
                                renderTabSaveButton={renderTabSaveButton}
                            />
                        ) : null}

                        {activeTab === "lgu" ? (
                            <LguTabSection
                                data={data}
                                setData={setData}
                                aboutContent={aboutContent}
                                errors={errors}
                                contentCardClassName={contentCardClassName}
                                openCreateBarangayModal={
                                    openCreateBarangayModal
                                }
                                openEditBarangayModal={openEditBarangayModal}
                                removeBarangay={removeBarangay}
                                getBarangayImageStatus={getBarangayImageStatus}
                                renderTabSaveButton={renderTabSaveButton}
                            />
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
                                    value={
                                        barangayDraft.officials.skChairperson
                                    }
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
                                                    .map((item) => item.trim()),
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
                                Enter the council member details that will
                                appear in the public organization layout.
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
                                        image: event.target.files?.[0] ?? null,
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
