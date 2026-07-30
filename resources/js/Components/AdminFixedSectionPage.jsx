import { useEffect, useMemo, useState } from "react";
import { router, useForm, useRemember } from "@inertiajs/react";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";

const emptyContent = {
    title: "",
    image: null,
    pdf: null,
    description: "",
    is_active: true,
};

export default function AdminFixedSectionPage({
    sectionCategory = null,
    contents: contentItems = [],
    config,
}) {
    const tabMatches = (tab, tabId) => {
        const aliases = tab.aliases ?? [tab.id];

        return aliases.includes(tabId);
    };

    const findTabById = (tabId) =>
        config.tabs.find((tab) => tabMatches(tab, tabId)) ?? null;

    const normalizeTabId = (tabId) => findTabById(tabId)?.id ?? tabId;

    const [contents, setContents] = useState(contentItems);
    const [activeTab, setActiveTab] = useState(config.tabs[0]?.id ?? "");
    const [editingContent, setEditingContent] = useState(null);
    const [contentPendingDelete, setContentPendingDelete] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [search, setSearch] = useRemember("", config.searchKey);

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
        ...emptyContent,
        category_id: sectionCategory?.id ? String(sectionCategory.id) : "",
        tab_id: config.tabs[0]?.id ?? "",
    });

    const canManageSection = Boolean(sectionCategory?.id);

    useEffect(() => {
        setContents(contentItems);
    }, [contentItems]);

    const filteredContents = useMemo(() => {
        const term = search.trim().toLowerCase();

        return contents.filter((content) => {
            const matchesTab = tabMatches(
                config.tabs.find((tab) => tab.id === activeTab) ?? {
                    id: activeTab,
                },
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

    const currentTab = findTabById(activeTab);

    const resetForm = (tabId = activeTab) => {
        setEditingContent(null);
        clearErrors();
        reset();
        setData({
            ...emptyContent,
            category_id: sectionCategory?.id ? String(sectionCategory.id) : "",
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

    const openEditModal = (content) => {
        setEditingContent(content);
        clearErrors();
        setData({
            category_id: String(content.category_id ?? sectionCategory?.id ?? ""),
            tab_id: normalizeTabId(content.tab_id ?? activeTab),
            title: content.title ?? "",
            image: null,
            pdf: null,
            description: content.description ?? "",
            is_active: Boolean(content.is_active),
        });
        setIsFormModalOpen(true);
    };

    const openDeleteModal = (content) => {
        setContentPendingDelete(content);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setContentPendingDelete(null);
        setIsDeleteModalOpen(false);
    };

    const submitContent = (event) => {
        event.preventDefault();

        if (!canManageSection) {
            return;
        }

        if (editingContent) {
            router.post(route("admin.contents.update", editingContent.id), data, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    closeFormModal();
                },
            });
            return;
        }

        post(route("admin.contents.store"), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                closeFormModal();
            },
        });
    };

    const deleteContent = () => {
        if (!contentPendingDelete) {
            return;
        }

        destroy(route("admin.contents.destroy", contentPendingDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                closeDeleteModal();

                if (editingContent?.id === contentPendingDelete.id) {
                    closeFormModal();
                }
            },
        });
    };

    return (
        <>
            <div className="space-y-6">
                <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-white to-white px-5 py-5 sm:px-6">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">
                                        Fixed-Tab Content Manager
                                    </p>
                                    <h2 className="text-2xl font-bold text-slate-900">
                                        {config.pageTitle}
                                    </h2>
                                    <p className="max-w-2xl text-sm leading-6 text-slate-600">
                                        {config.pageDescription}
                                    </p>
                                </div>

                                {!canManageSection ? (
                                    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                                        The fixed category with slug{" "}
                                        <span className="font-semibold">
                                            {config.categorySlug}
                                        </span>{" "}
                                        was not found. Create or restore that
                                        category record first.
                                    </div>
                                ) : null}
                            </div>

                            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:min-w-[28rem]">
                                <div className="relative w-full sm:flex-1 lg:w-80 lg:flex-none">
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
                                        placeholder={`Search ${currentTab?.label?.toLowerCase() ?? config.entityLabel.toLowerCase()}`}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={openCreateModal}
                                    disabled={processing || !canManageSection}
                                    className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-6"
                                >
                                    Add {currentTab?.label ?? config.entityLabel}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-slate-100 bg-slate-50/80 px-5 py-4 sm:px-6">
                        <div className={`grid gap-3 ${config.tabGridClassName}`}>
                            {config.tabs.map((tab) => {
                                const isActive = activeTab === tab.id;
                                const tabCount = contents.filter(
                                    (content) => tabMatches(tab, content.tab_id),
                                ).length;

                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                            setData("tab_id", tab.id);
                                        }}
                                        className={`rounded-2xl border px-4 py-4 text-left transition ${
                                            isActive
                                                ? "border-emerald-700 bg-emerald-700 text-white shadow-md"
                                                : "border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:bg-emerald-50/70"
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="space-y-2">
                                                <span
                                                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full border ${
                                                        isActive
                                                            ? "border-white/20 bg-white/15"
                                                            : "border-emerald-100 bg-emerald-50"
                                                    }`}
                                                >
                                                    {tab.icon({
                                                        isActive,
                                                    })}
                                                </span>
                                                <div>
                                                    <p className="text-lg font-bold">
                                                        {tab.label}
                                                    </p>
                                                    <p
                                                        className={`text-sm leading-6 ${
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
                                                className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${
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
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                                        Tab
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                                        Image
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                                        PDF
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                                        Status
                                    </th>
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
                                                {config.tabs.find(
                                                    (tab) =>
                                                        tabMatches(
                                                            tab,
                                                            content.tab_id,
                                                        ),
                                                )?.label ?? content.tab_id}
                                            </td>
                                            <td className="max-w-[12rem] truncate px-6 py-4 text-sm text-slate-600">
                                                {content.image || "No image"}
                                            </td>
                                            <td className="max-w-[12rem] truncate px-6 py-4 text-sm text-slate-600">
                                                {content.pdf || "No PDF"}
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
                                            colSpan="6"
                                            className="px-6 py-8 text-center text-sm text-slate-500"
                                        >
                                            No content found for the{" "}
                                            {currentTab?.label ?? "selected tab"}
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
                                            <p className="text-base font-bold text-slate-950">
                                                {content.title}
                                            </p>
                                            <p className="mt-1 text-sm text-slate-500">
                                                {config.tabs.find(
                                                    (tab) =>
                                                        tabMatches(
                                                            tab,
                                                            content.tab_id,
                                                        ),
                                                )?.label ?? content.tab_id}
                                            </p>
                                            <p className="mt-1 text-xs text-slate-500">
                                                PDF: {content.pdf || "No PDF"}
                                            </p>
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
                show={isFormModalOpen}
                onClose={closeFormModal}
                maxWidth="2xl"
            >
                <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
                                {config.entityLabel} Content
                            </p>
                            <h2 className="mt-2 text-2xl font-bold text-gray-950">
                                {editingContent
                                    ? `Edit ${config.entityLabel} Item`
                                    : `Add ${currentTab?.label ?? config.entityLabel} Item`}
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                This record will appear under the fixed{" "}
                                <span className="font-semibold">
                                    {config.tabs.find(
                                        (tab) => tab.id === data.tab_id,
                                    )?.label ?? currentTab?.label}
                                </span>{" "}
                                tab on the public {config.publicPageLabel} page.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={closeFormModal}
                            className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
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

                    <form onSubmit={submitContent} className="mt-6 space-y-4">
                        <input type="hidden" value={data.category_id} readOnly />

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <InputLabel
                                    htmlFor={`${config.formIdPrefix}-tab`}
                                    value="Fixed Tab"
                                />
                                <select
                                    id={`${config.formIdPrefix}-tab`}
                                    value={data.tab_id}
                                    onChange={(event) =>
                                        setData("tab_id", event.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    disabled={processing}
                                >
                                    {config.tabs.map((tab) => (
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
                                    htmlFor={`${config.formIdPrefix}-status`}
                                    value="Visibility"
                                />
                                <label
                                    id={`${config.formIdPrefix}-status`}
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
                                htmlFor={`${config.formIdPrefix}-title`}
                                value={`${config.entityLabel} Title`}
                            />
                            <TextInput
                                id={`${config.formIdPrefix}-title`}
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
                            <InputLabel htmlFor={`${config.formIdPrefix}-image`} value="Image File" />
                            <input
                                id={`${config.formIdPrefix}-image`}
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
                            {editingContent?.image ? (
                                <p className="mt-2 text-xs text-gray-500">
                                    Current image: {editingContent.image}
                                </p>
                            ) : null}
                            <InputError
                                message={errors.image}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor={`${config.formIdPrefix}-pdf`} value="PDF File" />
                            <input
                                id={`${config.formIdPrefix}-pdf`}
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
                            {editingContent?.pdf ? (
                                <p className="mt-2 text-xs text-gray-500">
                                    Current PDF: {editingContent.pdf}
                                </p>
                            ) : (
                                <p className="mt-2 text-xs text-gray-500">
                                    Optional. Upload a PDF attachment for this
                                    item.
                                </p>
                            )}
                            <InputError
                                message={errors.pdf}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor={`${config.formIdPrefix}-description`}
                                value="Description"
                            />
                            <textarea
                                id={`${config.formIdPrefix}-description`}
                                value={data.description}
                                onChange={(event) =>
                                    setData("description", event.target.value)
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

                        <div className="flex flex-wrap justify-between gap-3 border-t border-slate-100 pt-4">
                            <div>
                                {editingContent ? (
                                    <DangerButton
                                        type="button"
                                        onClick={() =>
                                            openDeleteModal(editingContent)
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
                                        : editingContent
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
                        Delete {config.entityLabel} Item
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        {contentPendingDelete
                            ? `Are you sure you want to delete "${contentPendingDelete.title}"? This action cannot be undone.`
                            : `Are you sure you want to delete this ${config.entityLabel.toLowerCase()} item?`}
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
                            onClick={deleteContent}
                            disabled={processing}
                        >
                            {processing ? "Deleting..." : "Delete"}
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </>
    );
}
