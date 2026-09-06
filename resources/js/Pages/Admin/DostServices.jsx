import { useEffect, useMemo, useRef, useState } from "react";
import ActionConfirmationModal from "@/Components/ActionConfirmationModal";
import ActionStatusAlert from "@/Components/ActionStatusAlert";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, useForm, useRemember } from "@inertiajs/react";
import {
    IoCloseOutline,
    IoDocumentOutline,
    IoLogoFacebook,
    IoPlayCircleOutline,
    IoRocketOutline,
    IoSchoolOutline,
} from "react-icons/io5";

const dostTabs = [
    {
        id: "Dost-ix",
        aliases: ["Dost-ix", "dost-ix-1"],
        label: "DOST IX",
        helper: "Entries shown in the public DOST IX section.",
        Icon: IoSchoolOutline,
    },
    {
        id: "ProgramsServices",
        aliases: ["ProgramsServices", "programs-services-2"],
        label: "Programs & Services",
        helper: "Programs and services entries shown on the public page.",
        Icon: IoRocketOutline,
    },
    {
        id: "FacebookPosts",
        aliases: ["FacebookPosts", "facebook-posts-3"],
        label: "Facebook Posts",
        helper: "Facebook post entries shown on the public page.",
        Icon: IoLogoFacebook,
    },
];

const emptyDostService = {
    tab_id: dostTabs[0].id,
    title: "",
    image: null,
    pdf: null,
    video: null,
    description: "",
    is_active: true,
};

export default function DostServices({
    sectionCategory = null,
    contents: dostServiceItems = [],
}) {
    const [contents, setContents] = useState(dostServiceItems);
    const [activeTab, setActiveTab] = useState(dostTabs[0].id);
    const [editingDostService, setEditingDostService] = useState(null);
    const [dostServicePendingDelete, setDostServicePendingDelete] =
        useState(null);
    const [pdfPreview, setPdfPreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
    const [search, setSearch] = useRemember("", "admin-dost-services-search");
    const pendingConfirmationActionRef = useRef(null);
    const notificationTimeoutRef = useRef(null);

    const {
        data,
        setData,
        post,
        delete: destroy,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        ...emptyDostService,
        tab_id: dostTabs[0].id,
    });

    const canManageSection = Boolean(sectionCategory?.id);

    const tabMatches = (tab, tabId) => {
        const aliases = tab.aliases ?? [tab.id];

        return aliases.includes(tabId);
    };

    const findTabById = (tabId) =>
        dostTabs.find((tab) => tabMatches(tab, tabId)) ?? null;

    const normalizeTabId = (tabId) => findTabById(tabId)?.id ?? tabId;

    useEffect(() => {
        setContents(dostServiceItems);
    }, [dostServiceItems]);

    const currentTab = findTabById(activeTab);

    const filteredContents = useMemo(() => {
        const term = search.trim().toLowerCase();

        return contents.filter((content) => {
            const matchesTab = tabMatches(
                findTabById(activeTab) ?? { id: activeTab },
                content.tab_id,
            );

            if (!matchesTab) {
                return false;
            }

            if (!term) {
                return true;
            }

            return [content.title, content.description, content.tab_id]
                .filter(Boolean)
                .some((value) => String(value).toLowerCase().includes(term));
        });
    }, [activeTab, contents, search]);

    const resetForm = (tabId = activeTab) => {
        setEditingDostService(null);
        clearErrors();
        reset();
        setData({
            ...emptyDostService,
            tab_id: tabId,
        });
    };

    const closeFormModal = () => {
        setIsFormModalOpen(false);
        resetForm();
    };

    const openCreateModal = () => {
        resetForm(activeTab);
        setIsFormModalOpen(true);
    };

    const openEditModal = (dostService) => {
        setEditingDostService(dostService);
        clearErrors();
        setData({
            tab_id: normalizeTabId(dostService.tab_id ?? activeTab),
            title: dostService.title ?? "",
            image: null,
            pdf: null,
            video: null,
            description: dostService.description ?? "",
            is_active: Boolean(dostService.is_active),
        });
        setIsFormModalOpen(true);
    };

    const openDeleteModal = (dostService) => {
        setDostServicePendingDelete(dostService);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDostServicePendingDelete(null);
        setIsDeleteModalOpen(false);
    };

    const openPdfPreview = (dostService) => {
        if (!dostService?.pdf) {
            return;
        }

        setPdfPreview({
            title: dostService.title,
            url: `/storage/documents/pdfs/${dostService.pdf}`,
        });
    };

    const closePdfPreview = () => {
        setPdfPreview(null);
    };

    const openVideoPreview = (dostService) => {
        if (!dostService?.video) {
            return;
        }

        setVideoPreview({
            title: dostService.title,
            url: `/storage/videos/dost-services/${dostService.video}`,
        });
    };

    const closeVideoPreview = () => {
        setVideoPreview(null);
    };

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

    const submitDostService = (event) => {
        event.preventDefault();

        if (!canManageSection) {
            return;
        }

        const isEditing = Boolean(editingDostService);

        openConfirmation({
            title: isEditing
                ? "Save changes to DOST service item?"
                : "Add new DOST service item?",
            message: isEditing
                ? "Are you sure you want to save the updates to this DOST service item?"
                : "Are you sure you want to add this new DOST service item to the public DOST Services page?",
            confirmLabel: isEditing ? "Save Changes" : "Add Service",
            onConfirm: () => {
                if (editingDostService) {
                    router.post(
                        route(
                            "admin.dost-services.update",
                            editingDostService.id,
                        ),
                        data,
                        {
                            forceFormData: true,
                            preserveScroll: true,
                            onSuccess: () => {
                                closeFormModal();
                                showNotification(
                                    "success",
                                    "DOST service content was updated successfully.",
                                );
                            },
                            onError: () => {
                                showNotification(
                                    "error",
                                    "The DOST service item could not be updated. Please review the form and try again.",
                                );
                            },
                        },
                    );
                    return;
                }

                post(route("admin.dost-services.store"), {
                    forceFormData: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        closeFormModal();
                        showNotification(
                            "success",
                            "New DOST service content was added successfully.",
                        );
                    },
                    onError: () => {
                        showNotification(
                            "error",
                            "The new DOST service item could not be added. Please review the form and try again.",
                        );
                    },
                });
            },
        });
    };

    const deleteDostService = () => {
        if (!dostServicePendingDelete) {
            return;
        }

        destroy(
            route("admin.dost-services.destroy", dostServicePendingDelete.id),
            {
                preserveScroll: true,
                onSuccess: () => {
                    closeDeleteModal();
                    showNotification(
                        "success",
                        "DOST service content was deleted successfully.",
                    );

                    if (
                        editingDostService?.id === dostServicePendingDelete.id
                    ) {
                        closeFormModal();
                    }
                },
                onError: () => {
                    showNotification(
                        "error",
                        "The DOST service item could not be deleted. Please try again.",
                    );
                },
            },
        );
    };

    const getTabLabel = (content) =>
        dostTabs.find((tab) => tabMatches(tab, content.tab_id))?.label ??
        content.tab_id;

    return (
        <>
            <Head title="DOST Services" />

            <div className="min-w-0 space-y-4 sm:space-y-6">
                <ActionStatusAlert notification={notification} />

                <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-white to-white px-4 py-4 sm:px-6 sm:py-5">
                        <div className="flex min-w-0 flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                            <div className="min-w-0 space-y-3">
                                <div className="space-y-1">
                                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">
                                        Fixed-Tab Content Manager
                                    </p>
                                    <h2 className="text-2xl font-bold text-slate-900">
                                        DOST Services CMS
                                    </h2>
                                    <p className="max-w-2xl text-sm leading-6 text-slate-600">
                                        Manage the fixed DOST service tabs for
                                        DOST IX, programs and services, and
                                        Facebook posts shown on the public page.
                                    </p>
                                </div>

                                {!canManageSection ? (
                                    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                                        The fixed category with slug{" "}
                                        <span className="font-semibold">
                                            dost-services
                                        </span>{" "}
                                        was not found. Create or restore that
                                        category record first.
                                    </div>
                                ) : null}
                            </div>

                            <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row xl:w-auto xl:min-w-[28rem]">
                                <div className="relative min-w-0 w-full sm:flex-1 xl:w-80 xl:flex-none">
                                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                        <svg
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m14.5 14.5 4 4m-1.833-8.667a6.833 6.833 0 1 1-13.667 0 6.833 6.833 0 0 1 13.667 0Z"
                                            />
                                        </svg>
                                    </span>
                                    <input
                                        type="search"
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(event.target.value)
                                        }
                                        className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 shadow-sm transition placeholder:text-slate-400 focus:border-slate-200 focus:ring-slate-200"
                                        placeholder={`Search ${currentTab?.label?.toLowerCase() ?? "dost service items"}`}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={openCreateModal}
                                    disabled={processing || !canManageSection}
                                    className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-6"
                                >
                                    Add {currentTab?.label ?? "Service"}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-3 sm:px-6">
                        <div className="grid min-w-0 gap-2 md:grid-cols-3">
                            {dostTabs.map((tab) => {
                                const isActive = activeTab === tab.id;
                                const tabCount = contents.filter((content) =>
                                    tabMatches(tab, content.tab_id),
                                ).length;
                                const TabIcon = tab.Icon;

                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                            setData("tab_id", tab.id);
                                        }}
                                        title={tab.helper}
                                        className={`w-full min-w-0 overflow-hidden rounded-lg border px-3 py-3 text-left transition ${
                                            isActive
                                                ? "border-emerald-700 bg-emerald-700 text-white shadow-sm"
                                                : "border-emerald-200 bg-emerald-50/80 text-slate-700 hover:border-emerald-300 hover:bg-emerald-100/80"
                                        }`}
                                    >
                                        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                                            <div className="flex min-w-0 flex-1 items-center gap-3">
                                                <span
                                                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border ${
                                                        isActive
                                                            ? "border-white/20 bg-white/15"
                                                            : "border-emerald-100 bg-emerald-50"
                                                    }`}
                                                >
                                                    <TabIcon
                                                        className={`h-4 w-4 ${
                                                            isActive
                                                                ? "text-white"
                                                                : "text-emerald-700"
                                                        }`}
                                                    />
                                                </span>
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-bold sm:text-base">
                                                        {tab.label}
                                                    </p>
                                                    <p
                                                        className={`mt-0.5 truncate text-xs sm:text-sm ${
                                                            isActive
                                                                ? "text-emerald-50/95"
                                                                : "text-slate-500"
                                                        }`}
                                                    >
                                                        {tab.helper}
                                                    </p>
                                                </div>
                                            </div>
                                            <span
                                                className={`hidden shrink-0 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] sm:inline-flex ${
                                                    isActive
                                                        ? "bg-white/15 text-white"
                                                        : "bg-emerald-100 text-emerald-700"
                                                }`}
                                            >
                                                {tabCount} item
                                                {tabCount === 1 ? "" : "s"}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="hidden overflow-x-auto md:block">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {[
                                        "Title",
                                        "Tab",
                                        "Image",
                                        "PDF",
                                        "Video",
                                        "Status",
                                    ].map((heading) => (
                                        <th
                                            key={heading}
                                            className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600"
                                        >
                                            {heading}
                                        </th>
                                    ))}
                                    <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-600">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {filteredContents.length > 0 ? (
                                    filteredContents.map((content) => (
                                        <tr
                                            key={content.id}
                                            className="transition hover:bg-slate-50/80"
                                        >
                                            <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                                                {content.title}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {getTabLabel(content)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {content.image ? (
                                                    <img
                                                        src={`/storage/images/thumbnails/${content.image}`}
                                                        alt={content.title}
                                                        className="h-14 w-20 rounded-lg border border-slate-200 object-cover shadow-sm"
                                                    />
                                                ) : (
                                                    <span className="text-sm text-slate-600">
                                                        No image
                                                    </span>
                                                )}
                                            </td>
                                            <td className="max-w-[12rem] truncate px-6 py-4 text-sm text-slate-600">
                                                {content.pdf ? (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openPdfPreview(
                                                                content,
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-600 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-sm transition hover:bg-emerald-700"
                                                    >
                                                        <IoDocumentOutline className="h-5 w-5" />
                                                        View PDF
                                                    </button>
                                                ) : (
                                                    <span className="font-semibold text-rose-600">
                                                        No PDF
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {content.video ? (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openVideoPreview(
                                                                content,
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-sky-600 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-sm transition hover:bg-sky-700"
                                                    >
                                                        <IoPlayCircleOutline className="h-5 w-5" />
                                                        View Video
                                                    </button>
                                                ) : (
                                                    <span className="text-sm font-semibold text-rose-600">
                                                        No video
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                        content.is_active
                                                            ? "bg-emerald-50 text-emerald-700"
                                                            : "bg-gray-100 text-gray-600"
                                                    }`}
                                                >
                                                    {content.is_active
                                                        ? "Active"
                                                        : "Hidden"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm">
                                                <div className="flex justify-end gap-4">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openEditModal(
                                                                content,
                                                            )
                                                        }
                                                        className="font-semibold text-indigo-600 hover:text-indigo-800"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openDeleteModal(
                                                                content,
                                                            )
                                                        }
                                                        className="font-semibold text-rose-600 hover:text-rose-800"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-6 py-8 text-center text-sm text-slate-500"
                                        >
                                            No content found for the{" "}
                                            {currentTab?.label ??
                                                "selected tab"}
                                            .
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="space-y-3 p-4 md:hidden">
                        {filteredContents.length > 0 ? (
                            filteredContents.map((content) => (
                                <article
                                    key={content.id}
                                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0 flex-1">
                                            <p className="break-words text-base font-bold text-slate-950">
                                                {content.title}
                                            </p>
                                            <p className="mt-1 text-sm text-slate-500">
                                                {getTabLabel(content)}
                                            </p>
                                            {content.image ? (
                                                <img
                                                    src={`/storage/images/thumbnails/${content.image}`}
                                                    alt={content.title}
                                                    className="mt-3 h-24 w-full rounded-xl border border-slate-200 object-cover shadow-sm"
                                                />
                                            ) : (
                                                <p className="mt-2 break-all text-xs text-slate-500">
                                                    Image: No image
                                                </p>
                                            )}
                                            <div className="mt-3 text-xs text-slate-500">
                                                {content.pdf ? (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openPdfPreview(
                                                                content,
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-600 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-sm transition hover:bg-emerald-700"
                                                    >
                                                        <IoDocumentOutline className="h-5 w-5" />
                                                        View PDF
                                                    </button>
                                                ) : (
                                                    <span className="font-semibold text-rose-600">
                                                        PDF: No PDF
                                                    </span>
                                                )}
                                            </div>
                                            <div className="mt-2">
                                                {content.video ? (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openVideoPreview(
                                                                content,
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-sky-600 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-sm transition hover:bg-sky-700"
                                                    >
                                                        <IoPlayCircleOutline className="h-5 w-5" />
                                                        View Video
                                                    </button>
                                                ) : (
                                                    <p className="break-all text-xs font-semibold text-rose-600">
                                                        Video: No video
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                content.is_active
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "bg-gray-100 text-gray-600"
                                            }`}
                                        >
                                            {content.is_active
                                                ? "Active"
                                                : "Hidden"}
                                        </span>
                                    </div>
                                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                openEditModal(content)
                                            }
                                            className="inline-flex w-full items-center justify-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                openDeleteModal(content)
                                            }
                                            className="inline-flex w-full items-center justify-center rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
                                <p className="text-sm font-medium text-slate-500">
                                    No content found for the{" "}
                                    {currentTab?.label ?? "selected tab"}.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            <Modal
                show={Boolean(pdfPreview)}
                onClose={closePdfPreview}
                maxWidth="7xl"
            >
                <div className="flex max-h-[calc(100dvh-2rem)] flex-col overflow-hidden bg-white sm:max-h-[calc(100dvh-3rem)]">
                    <div className="flex items-center justify-between gap-3 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-amber-50 px-4 py-3 text-emerald-950 sm:gap-5 sm:px-6 sm:py-4">
                        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-700 shadow-sm sm:h-12 sm:w-12">
                                <IoDocumentOutline className="h-5 w-5 sm:h-6 sm:w-6" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-emerald-700 sm:text-xs">
                                    PDF Preview
                                </p>
                                <h2 className="mt-0.5 truncate text-sm font-bold sm:text-lg">
                                    {pdfPreview?.title}
                                </h2>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={closePdfPreview}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-800 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-100 sm:h-11 sm:w-11"
                            aria-label="Close PDF preview"
                        >
                            <IoCloseOutline className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="min-h-0 flex-1 bg-slate-100 p-1.5 sm:p-3 lg:p-4">
                        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm sm:rounded-xl">
                            <iframe
                                src={pdfPreview?.url}
                                title={`${pdfPreview?.title} PDF`}
                                className="h-[68dvh] w-full bg-white sm:h-[72dvh] lg:h-[76dvh] [@media(orientation:landscape)]:h-[70dvh]"
                            />
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                show={Boolean(videoPreview)}
                onClose={closeVideoPreview}
                maxWidth="7xl"
            >
                <div className="flex max-h-[calc(100dvh-2rem)] flex-col overflow-hidden bg-white sm:max-h-[calc(100dvh-3rem)]">
                    <div className="flex items-center justify-between gap-3 border-b border-sky-100 bg-gradient-to-r from-sky-50 via-white to-amber-50 px-4 py-3 text-sky-950 sm:gap-5 sm:px-6 sm:py-4">
                        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-100 bg-white text-sky-700 shadow-sm sm:h-12 sm:w-12">
                                <IoPlayCircleOutline className="h-5 w-5 sm:h-6 sm:w-6" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-sky-700 sm:text-xs">
                                    Video Preview
                                </p>
                                <h2 className="mt-0.5 truncate text-sm font-bold sm:text-lg">
                                    {videoPreview?.title}
                                </h2>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={closeVideoPreview}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-100 bg-white text-sky-800 shadow-sm transition hover:border-sky-200 hover:bg-sky-100 focus:outline-none focus:ring-4 focus:ring-sky-100 sm:h-11 sm:w-11"
                            aria-label="Close video preview"
                        >
                            <IoCloseOutline className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="min-h-0 flex-1 bg-slate-100 p-1.5 sm:p-3 lg:p-4">
                        <div className="flex items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white p-2 shadow-sm sm:rounded-xl sm:p-4">
                            <video
                                key={videoPreview?.url}
                                src={videoPreview?.url}
                                controls
                                autoPlay
                                playsInline
                                className="aspect-video max-h-[76dvh] w-full rounded-lg bg-slate-100 object-contain"
                            >
                                Your browser does not support video playback.
                            </video>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                show={isFormModalOpen}
                onClose={closeFormModal}
                maxWidth="3xl"
            >
                <div className="flex max-h-[calc(100dvh-2rem)] flex-col overflow-hidden bg-white sm:max-h-[calc(100dvh-3rem)]">
                    <div className="flex shrink-0 items-center justify-between gap-4 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-amber-50/40 px-5 py-3 sm:px-6">
                        <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-700 shadow-sm">
                                <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h10"
                                    />
                                </svg>
                            </span>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                                DOST Service Content
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={closeFormModal}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-gray-400 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
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
                        onSubmit={submitDostService}
                        className="flex min-h-0 flex-1 flex-col"
                    >
                        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <InputLabel
                                        htmlFor="dost-services-tab"
                                        value="Fixed Tab"
                                    />
                                    <select
                                        id="dost-services-tab"
                                        value={data.tab_id}
                                        onChange={(event) =>
                                            setData("tab_id", event.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        disabled={processing}
                                    >
                                        {dostTabs.map((tab) => (
                                            <option key={tab.id} value={tab.id}>
                                                {tab.label}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.tab_id}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="dost-services-status"
                                        value="Visibility"
                                    />
                                    <label
                                        id="dost-services-status"
                                        className="mt-1 flex h-[42px] items-center gap-3 rounded-md border border-gray-300 px-3 text-sm font-medium text-gray-700"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={data.is_active}
                                            onChange={(event) =>
                                                setData(
                                                    "is_active",
                                                    event.target.checked,
                                                )
                                            }
                                            disabled={processing}
                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                        />
                                        Show publicly
                                    </label>
                                </div>
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="dost-services-title"
                                    value="DOST Service Title"
                                />
                                <TextInput
                                    id="dost-services-title"
                                    value={data.title}
                                    onChange={(event) =>
                                        setData("title", event.target.value)
                                    }
                                    className="mt-1 block w-full"
                                    disabled={processing}
                                />
                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="dost-services-image"
                                    value="Image File"
                                />
                                <input
                                    id="dost-services-image"
                                    type="file"
                                    accept=".png,.jpg,.jpeg,.webp"
                                    onChange={(event) =>
                                        setData(
                                            "image",
                                            event.target.files?.[0] ?? null,
                                        )
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
                                    disabled={processing}
                                />
                                {editingDostService?.image ? (
                                    <p className="mt-2 text-xs text-gray-500">
                                        Current image: {editingDostService.image}
                                    </p>
                                ) : null}
                                <InputError
                                    message={errors.image}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="dost-services-pdf"
                                    value="PDF File"
                                />
                                <input
                                    id="dost-services-pdf"
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    onChange={(event) =>
                                        setData(
                                            "pdf",
                                            event.target.files?.[0] ?? null,
                                        )
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
                                    disabled={processing}
                                />
                                {editingDostService?.pdf ? (
                                    <p className="mt-2 text-xs text-gray-500">
                                        Current PDF: {editingDostService.pdf}
                                    </p>
                                ) : (
                                    <p className="mt-2 text-xs text-gray-500">
                                        Optional. Upload a PDF attachment up to
                                        20 MB.
                                    </p>
                                )}
                                <InputError
                                    message={errors.pdf}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="dost-services-video"
                                    value="Video File"
                                />
                                <input
                                    id="dost-services-video"
                                    type="file"
                                    accept=".mp4,.webm,.mov,video/mp4,video/webm,video/quicktime"
                                    onChange={(event) =>
                                        setData(
                                            "video",
                                            event.target.files?.[0] ?? null,
                                        )
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
                                    disabled={processing}
                                />
                                {editingDostService?.video ? (
                                    <p className="mt-2 text-xs text-gray-500">
                                        Current video:{" "}
                                        {editingDostService.video}
                                    </p>
                                ) : (
                                    <p className="mt-2 text-xs text-gray-500">
                                        Optional. Upload an MP4, WebM, or MOV
                                        video up to 70 MB.
                                    </p>
                                )}
                                <InputError
                                    message={errors.video}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="dost-services-description"
                                    value="Description"
                                />
                                <textarea
                                    id="dost-services-description"
                                    value={data.description}
                                    onChange={(event) =>
                                        setData(
                                            "description",
                                            event.target.value,
                                        )
                                    }
                                    rows="4"
                                    disabled={processing}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
                                />
                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] sm:px-6">
                            <div>
                                {editingDostService ? (
                                    <DangerButton
                                        type="button"
                                        onClick={() =>
                                            openDeleteModal(editingDostService)
                                        }
                                        disabled={processing}
                                    >
                                        Delete
                                    </DangerButton>
                                ) : null}
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <SecondaryButton
                                    type="button"
                                    onClick={closeFormModal}
                                >
                                    Cancel
                                </SecondaryButton>
                                <PrimaryButton disabled={processing}>
                                    {processing
                                        ? "Saving..."
                                        : editingDostService
                                          ? "Update"
                                          : "Save"}
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>

            <Modal
                show={isDeleteModalOpen}
                onClose={closeDeleteModal}
                maxWidth="lg"
            >
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-slate-950">
                        Delete DOST Service Item
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        {dostServicePendingDelete
                            ? `Are you sure you want to delete "${dostServicePendingDelete.title}"? This action cannot be undone.`
                            : "Are you sure you want to delete this DOST service item?"}
                    </p>

                    <div className="mt-6 flex flex-wrap justify-end gap-3">
                        <SecondaryButton
                            type="button"
                            onClick={closeDeleteModal}
                        >
                            Cancel
                        </SecondaryButton>
                        <DangerButton
                            type="button"
                            onClick={deleteDostService}
                            disabled={processing}
                        >
                            {processing ? "Deleting..." : "Delete"}
                        </DangerButton>
                    </div>
                </div>
            </Modal>

            <ActionConfirmationModal
                show={confirmationState.show}
                onClose={closeConfirmation}
                onConfirm={confirmPendingAction}
                title={confirmationState.title}
                message={confirmationState.message}
                confirmLabel={confirmationState.confirmLabel}
                processing={processing}
            />
        </>
    );
}

DostServices.layout = (page) => (
    <AdminLayout
        user={page.props.auth.user}
        title="DOST Services CMS"
        breadcrumbs={[
            { label: "Admin Workspace" },
            { label: "DOST Services CMS" },
        ]}
        children={page}
    />
);
