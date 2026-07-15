import { useEffect, useMemo, useState } from "react";
import { router, useForm, useRemember } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { MdAddCircleOutline } from "react-icons/md";

const emptyCategory = {
    title: "",
    image: null,
    description: "",
    is_active: true,
};

export default function Categories({ categories: categoryItems = [] }) {
    const [categories, setCategories] = useState(categoryItems);
    const [editingCategory, setEditingCategory] = useState(null);
    const [tabsCategory, setTabsCategory] = useState(null);
    const [categoryPendingDelete, setCategoryPendingDelete] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isTabsModalOpen, setIsTabsModalOpen] = useState(false);
    const [search, setSearch] = useRemember("", "admin-categories-search");
    const [loading, setLoading] = useState(false);

    const {
        data,
        setData,
        post,
        delete: destroy,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm(emptyCategory);

    const {
        data: tabsData,
        setData: setTabsData,
        post: postTabs,
        processing: tabsProcessing,
        errors: tabErrors,
        clearErrors: clearTabErrors,
    } = useForm({
        tabs: [{ label: "Memorandum" }],
    });

    const filteredCategories = useMemo(() => {
        const term = search.trim().toLowerCase();

        if (!term) {
            return categories;
        }

        return categories.filter((category) =>
            [category.title, category.image, category.description]
                .filter(Boolean)
                .some((value) => String(value).toLowerCase().includes(term)),
        );
    }, [categories, search]);

    useEffect(() => {
        setCategories(categoryItems);
    }, [categoryItems]);

    const clearForm = () => {
        setEditingCategory(null);
        clearErrors();
        reset();
        setData(emptyCategory);
    };

    const normalizeTabs = (tabs) => {
        if (!Array.isArray(tabs) || tabs.length === 0) {
            return [{ label: "Memorandum" }];
        }

        return tabs.map((tab) => ({
            label: tab.label ?? "",
        }));
    };

    const closeFormModal = () => {
        setIsFormModalOpen(false);
        clearForm();
    };

    const openCreateModal = () => {
        clearForm();
        setIsFormModalOpen(true);
    };

    const openEditModal = (category) => {
        setEditingCategory(category);
        clearErrors();
        setData({
            title: category.title ?? "",
            image: null,
            description: category.description ?? "",
            is_active: Boolean(category.is_active),
        });
        setIsFormModalOpen(true);
    };

    const openDeleteModal = (category) => {
        setCategoryPendingDelete(category);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setCategoryPendingDelete(null);
        setIsDeleteModalOpen(false);
    };

    const openTabsModal = (category) => {
        setTabsCategory(category);
        clearTabErrors();
        setTabsData("tabs", normalizeTabs(category.tabs));
        setIsTabsModalOpen(true);
    };

    const closeTabsModal = () => {
        setTabsCategory(null);
        clearTabErrors();
        setTabsData("tabs", [{ label: "Memorandum" }]);
        setIsTabsModalOpen(false);
    };

    const updateTabLabel = (index, value) => {
        const nextTabs = [...tabsData.tabs];
        nextTabs[index] = {
            ...nextTabs[index],
            label: value,
        };
        setTabsData("tabs", nextTabs);
    };

    const addTabField = () => {
        setTabsData("tabs", [...tabsData.tabs, { label: "" }]);
    };

    const removeTabField = (index) => {
        if (tabsData.tabs.length === 1) {
            return;
        }

        setTabsData(
            "tabs",
            tabsData.tabs.filter((_, tabIndex) => tabIndex !== index),
        );
    };

    const submitTabs = (event) => {
        event.preventDefault();

        if (!tabsCategory) {
            return;
        }

        postTabs(route("admin.categories.tabs.update", tabsCategory.id), {
            preserveScroll: true,
            onSuccess: () => {
                closeTabsModal();
            },
        });
    };

    const createCategory = () => {
        const options = {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                closeFormModal();
            },
        };

        post(route("admin.categories.store"), options);
    };

    const updateCategory = () => {
        router.post(
            route("admin.categories.update", editingCategory.id),
            data,
            {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    closeFormModal();
                },
            },
        );
    };

    const submitCategory = (event) => {
        event.preventDefault();

        if (editingCategory) {
            updateCategory();
            return;
        }

        createCategory();
    };

    const deleteCategory = () => {
        if (!categoryPendingDelete) {
            return;
        }

        destroy(route("admin.categories.destroy", categoryPendingDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                closeDeleteModal();

                if (editingCategory?.id === categoryPendingDelete.id) {
                    closeFormModal();
                }
            },
        });
    };

    return (
        <>
            <div className="space-y-6">
                <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 bg-gradient-to-r from-emerald-50 via-white to-white px-5 py-5 sm:px-6">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                            <div className="space-y-4">
                                <div className="space-y-1 font-google-sans-semibold">
                                    {/* <p className="text-xl font-bold uppercase tracking-[0.22em] text-emerald-700">
                                        Category Library
                                    </p> */}
                                    <h2 className="text-2xl font-bold text-slate-800">
                                        Organize public category sections
                                    </h2>
                                    <p className="max-w-2xl text-sm text-slate-600">
                                        Manage titles, descriptions, visibility,
                                        and the tabs shown on each category
                                        page.
                                    </p>
                                </div>
                            </div>

                            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                                <div className="relative w-full lg:w-80">
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
                                        className="h-12 w-full rounded-lg  border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 shadow-sm transition placeholder:text-slate-400 focus:border-slate-200 focus:ring-slate-200"
                                        placeholder="Search categories"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={openCreateModal}
                                    disabled={loading}
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <span className="text-lg">
                                        <MdAddCircleOutline />
                                    </span>
                                    Add Category
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="hidden overflow-x-auto md:block">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-800">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-800">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-800">
                                        Image
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-800">
                                        Tabs
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-800">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-800">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {filteredCategories.length > 0 ? (
                                    filteredCategories.map((category) => (
                                        <tr
                                            key={category.id}
                                            className="transition hover:bg-slate-50/80"
                                        >
                                            <td className="px-6 py-4 text-xs font-semibold text-slate-800">
                                                {category.title}
                                            </td>
                                            <td className="max-w-[16rem] px-6 py-4 text-xs text-gray-600">
                                                <p className="line-clamp-2">
                                                    {category.description ||
                                                        "No description"}
                                                </p>
                                            </td>
                                            <td className="max-w-[12rem] truncate px-6 py-4 text-xs text-gray-600">
                                                {category.image || "No image"}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <div className="flex max-w-xs flex-wrap gap-2">
                                                    {(category.tabs ?? []).map(
                                                        (tab) => (
                                                            <span
                                                                key={tab.id}
                                                                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                                                            >
                                                                {tab.label}
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                        category.is_active
                                                            ? "bg-emerald-50 text-emerald-700"
                                                            : "bg-gray-100 text-gray-600"
                                                    }`}
                                                >
                                                    {category.is_active
                                                        ? "Active"
                                                        : "Hidden"}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-xs">
                                                <div className="flex justify-end gap-4">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openTabsModal(
                                                                category,
                                                            )
                                                        }
                                                        className="font-semibold text-emerald-700 hover:text-emerald-900"
                                                    >
                                                        Tabs
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openEditModal(
                                                                category,
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
                                                                category,
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
                                            No categories found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="space-y-3 p-4 md:hidden">
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((category) => (
                                <article
                                    key={category.id}
                                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-base font-bold text-slate-950">
                                                {category.title}
                                            </p>
                                            <p className="mt-2 text-sm text-slate-600">
                                                {category.description ||
                                                    "No description"}
                                            </p>
                                            <p className="mt-2 text-sm text-slate-500">
                                                {category.image || "No image"}
                                            </p>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {(category.tabs ?? []).map(
                                                    (tab) => (
                                                        <span
                                                            key={tab.id}
                                                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                                                        >
                                                            {tab.label}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                category.is_active
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "bg-slate-100 text-slate-600"
                                            }`}
                                        >
                                            {category.is_active
                                                ? "Active"
                                                : "Hidden"}
                                        </span>
                                    </div>
                                    <div className="mt-4 flex flex-wrap gap-3 border-t border-slate-100 pt-4">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                openEditModal(category)
                                            }
                                            className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                openTabsModal(category)
                                            }
                                            className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                                        >
                                            Tabs
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                openDeleteModal(category)
                                            }
                                            className="inline-flex rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
                                <p className="text-sm font-medium text-slate-500">
                                    No categories found.
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
                                STARBOOKS 4G Mabuhay
                            </p>
                            <h2 className="mt-2 text-2xl font-bold text-gray-950">
                                {editingCategory
                                    ? "Edit Category"
                                    : "Add Category"}
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Category records appear on the public category
                                screen.
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

                    <form onSubmit={submitCategory} className="mt-6 space-y-4">
                        <div>
                            <InputLabel
                                htmlFor="title"
                                value="Category Title"
                            />
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
                            {editingCategory?.image ? (
                                <p className="mt-2 text-xs text-gray-500">
                                    Current image: {editingCategory.image}
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
                                {editingCategory ? (
                                    <DangerButton
                                        type="button"
                                        onClick={() =>
                                            openDeleteModal(editingCategory)
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
                                <PrimaryButton disabled={processing || loading}>
                                    {processing
                                        ? "Saving..."
                                        : editingCategory
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
                        Delete Category
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        {categoryPendingDelete
                            ? `Are you sure you want to delete "${categoryPendingDelete.title}"? This action cannot be undone.`
                            : "Are you sure you want to delete this category?"}
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
                            onClick={deleteCategory}
                            disabled={processing}
                        >
                            {processing ? "Deleting..." : "Delete"}
                        </DangerButton>
                    </div>
                </div>
            </Modal>

            <Modal
                show={isTabsModalOpen}
                onClose={closeTabsModal}
                maxWidth="2xl"
            >
                <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
                                Category Tabs
                            </p>
                            <h2 className="mt-2 text-2xl font-bold text-gray-950">
                                {tabsCategory?.title ?? "Manage Tabs"}
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Add the tabs you want to show on this category's
                                sub-category page.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={closeTabsModal}
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

                    <form onSubmit={submitTabs} className="mt-6 space-y-4">
                        <div className="space-y-3">
                            {tabsData.tabs.map((tab, index) => (
                                <div
                                    key={`tab-field-${index}`}
                                    className="flex items-start gap-3"
                                >
                                    <div className="flex-1">
                                        <InputLabel
                                            htmlFor={`tab-label-${index}`}
                                            value={`Tab ${index + 1}`}
                                        />
                                        <TextInput
                                            id={`tab-label-${index}`}
                                            value={tab.label}
                                            onChange={(event) =>
                                                updateTabLabel(
                                                    index,
                                                    event.target.value,
                                                )
                                            }
                                            className="mt-1 block w-full"
                                            disabled={tabsProcessing}
                                            placeholder="Enter tab label"
                                        />
                                        <InputError
                                            message={
                                                tabErrors[`tabs.${index}.label`]
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeTabField(index)}
                                        disabled={
                                            tabsProcessing ||
                                            tabsData.tabs.length === 1
                                        }
                                        className="mt-7 inline-flex rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <InputError message={tabErrors.tabs} className="mt-2" />

                        <div className="flex flex-wrap justify-between gap-3 border-t border-slate-100 pt-4">
                            <SecondaryButton
                                type="button"
                                onClick={addTabField}
                                disabled={tabsProcessing}
                            >
                                Add Tab
                            </SecondaryButton>
                            <div className="flex flex-wrap gap-3">
                                <SecondaryButton
                                    type="button"
                                    onClick={closeTabsModal}
                                >
                                    Cancel
                                </SecondaryButton>
                                <PrimaryButton disabled={tabsProcessing}>
                                    {tabsProcessing ? "Saving..." : "Save Tabs"}
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}
Categories.layout = (page) => (
    <AdminLayout
        user={page.props.auth.user}
        title="Categories"
        breadcrumbs={[{ label: "Admin Workspace" }, { label: "Categories" }]}
        children={page}
    />
);
