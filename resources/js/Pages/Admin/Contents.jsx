import { useEffect, useMemo, useState } from "react";
import { router, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import axios from "axios";

const emptyContent = {
    category_id: "",
    tab_id: "",
    title: "",
    image: null,
    description: "",
    is_active: true,
};

export default function Contents({ categories }) {
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingContent, setEditingContent] = useState(null);
    const [contentPendingDelete, setContentPendingDelete] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [search, setSearch] = useState("");

    const {
        data,
        setData,
        post,
        delete: destroy,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm(emptyContent);

    const categoryOptions = categories ?? [];
    const canCreateContent = categoryOptions.length > 0;
    const selectedCategory = categoryOptions.find(
        (category) => String(category.id) === String(data.category_id),
    );
    const selectedTabs =
        Array.isArray(selectedCategory?.tabs) &&
        selectedCategory.tabs.length > 0
            ? selectedCategory.tabs
            : [];

    const loadContents = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/admin/get-contents");
            setContents(res.data);
        } catch (requestError) {
            console.error("Error loading contents:", requestError);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadContents();
    }, []);

    const filteredContents = useMemo(() => {
        const term = search.trim().toLowerCase();

        if (!term) {
            return contents;
        }

        return contents.filter((content) =>
            [
                content.title,
                content.description,
                content.tab_id,
                content.category?.title,
            ]
                .filter(Boolean)
                .some((value) => String(value).toLowerCase().includes(term)),
        );
    }, [contents, search]);

    const assignCategoryDefaults = (categoryId) => {
        const matchedCategory = categoryOptions.find(
            (category) => String(category.id) === String(categoryId),
        );
        const firstTabId = matchedCategory?.tabs?.[0]?.id ?? "";

        setData((currentData) => ({
            ...currentData,
            category_id: String(categoryId),
            tab_id: firstTabId,
        }));
    };

    const clearForm = () => {
        setEditingContent(null);
        clearErrors();
        reset();

        if (categoryOptions[0]) {
            setData({
                ...emptyContent,
                category_id: String(categoryOptions[0].id),
                tab_id: categoryOptions[0].tabs?.[0]?.id ?? "",
            });
            return;
        }

        setData(emptyContent);
    };

    const closeFormModal = () => {
        setIsFormModalOpen(false);
        clearForm();
    };

    const openCreateModal = () => {
        clearForm();
        setIsFormModalOpen(true);
    };

    const openEditModal = (content) => {
        setEditingContent(content);
        clearErrors();
        setData({
            category_id: String(content.category_id ?? ""),
            tab_id: content.tab_id ?? "",
            title: content.title ?? "",
            image: null,
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

    const handleCategoryChange = (event) => {
        assignCategoryDefaults(event.target.value);
    };

    const createContent = () => {
        post(route("admin.contents.store"), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: async () => {
                await loadContents();
                closeFormModal();
            },
        });
    };

    const updateContent = () => {
        router.post(route("admin.contents.update", editingContent.id), data, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: async () => {
                await loadContents();
                closeFormModal();
            },
        });
    };

    const submitContent = (event) => {
        event.preventDefault();

        if (editingContent) {
            updateContent();
            return;
        }

        createContent();
    };

    const deleteContent = () => {
        if (!contentPendingDelete) {
            return;
        }

        destroy(route("admin.contents.destroy", contentPendingDelete.id), {
            preserveScroll: true,
            onSuccess: async () => {
                await loadContents();
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
                    <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-950">
                                Contents
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                {filteredContents.length} record
                                {filteredContents.length === 1 ? "" : "s"} shown
                            </p>
                        </div>
                        <TextInput
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            className="w-full sm:max-w-xs"
                            placeholder="Search"
                        />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-4">
                        <p className="text-sm text-slate-500">
                            Each content record belongs to one category tab and
                            will only appear there on the public screen.
                        </p>
                        <PrimaryButton
                            type="button"
                            onClick={openCreateModal}
                            disabled={loading || !canCreateContent}
                        >
                            Add Content
                        </PrimaryButton>
                    </div>

                    <div className="hidden overflow-x-auto md:block">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                        Tab
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                        Image
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-500">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {filteredContents.length > 0 ? (
                                    filteredContents.map((content) => (
                                        <tr key={content.id}>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                                {content.title}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {content.category?.title ??
                                                    "Unknown category"}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {content.category?.tabs?.find(
                                                    (tab) =>
                                                        tab.id ===
                                                        content.tab_id,
                                                )?.label ?? content.tab_id}
                                            </td>
                                            <td className="max-w-[12rem] truncate px-6 py-4 text-sm text-gray-600">
                                                {content.image || "No image"}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
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
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
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
                                            className="px-6 py-8 text-center text-sm text-gray-500"
                                        >
                                            No contents found.
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
                                    className="rounded-lg border border-gray-100 p-4 shadow-sm"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-sm font-bold text-gray-950">
                                                {content.title}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-600">
                                                {content.category?.title ??
                                                    "Unknown category"}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {content.category?.tabs?.find(
                                                    (tab) =>
                                                        tab.id ===
                                                        content.tab_id,
                                                )?.label ?? content.tab_id}
                                            </p>
                                        </div>
                                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                                            {content.is_active
                                                ? "Active"
                                                : "Hidden"}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => openEditModal(content)}
                                        className="mt-4 text-sm font-semibold text-indigo-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => openDeleteModal(content)}
                                        className="mt-2 text-sm font-semibold text-rose-600"
                                    >
                                        Delete
                                    </button>
                                </article>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">
                                No contents found.
                            </p>
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
                                Category Content
                            </p>
                            <h2 className="mt-2 text-2xl font-bold text-gray-950">
                                {editingContent
                                    ? "Edit Content"
                                    : "Add Content"}
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Assign this content to a category and tab.
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
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <InputLabel
                                    htmlFor="category_id"
                                    value="Category"
                                />
                                <select
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={handleCategoryChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    disabled={processing}
                                >
                                    <option value="">Select category</option>
                                    {categoryOptions.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.title}
                                        </option>
                                    ))}
                                </select>
                                <InputError
                                    message={errors.category_id}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="tab_id" value="Tab" />
                                <select
                                    id="tab_id"
                                    value={data.tab_id}
                                    onChange={(event) =>
                                        setData("tab_id", event.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    disabled={
                                        processing || selectedTabs.length === 0
                                    }
                                >
                                    <option value="">Select tab</option>
                                    {selectedTabs.map((tab) => (
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
                        </div>

                        <div>
                            <InputLabel htmlFor="title" value="Content Title" />
                            <TextInput
                                id="title"
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
                            <InputLabel htmlFor="image" value="Image File" />
                            <input
                                id="image"
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
                            <InputLabel
                                htmlFor="description"
                                value="Description"
                            />
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(event) =>
                                    setData("description", event.target.value)
                                }
                                rows="3"
                                disabled={processing}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
                            />
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>

                        <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(event) =>
                                    setData("is_active", event.target.checked)
                                }
                                disabled={processing}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                            />
                            Show publicly
                        </label>

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
                        Delete Content
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        {contentPendingDelete
                            ? `Are you sure you want to delete "${contentPendingDelete.title}"? This action cannot be undone.`
                            : "Are you sure you want to delete this content?"}
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
Contents.layout = (page) => (
    <AdminLayout user={page.props.auth.user} children={page} />
);
