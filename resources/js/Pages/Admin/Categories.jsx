import { useEffect, useMemo, useState } from "react";
import { useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import axios from "axios";

const emptyCategory = {
    title: "",
    image: null,
    description: "",
    is_active: true,
};

export default function Categories({ auth }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [categoryPendingDelete, setCategoryPendingDelete] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const loadCategories = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/get-categories`);
            setLoading(false);
            setCategories(res.data);
        } catch (requestError) {
            setLoading(false);
            console.error("Error loading categories:", requestError);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const [search, setSearch] = useState("");
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm(emptyCategory);

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

    const clearForm = () => {
        setEditingCategory(null);
        clearErrors();
        reset();
        setData(emptyCategory);
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

    const createCategory = () => {
        const options = {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: closeFormModal,
        };

        post(route("admin.categories.store"), options);
    };

    const updateCategory = () => {
        const options = {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: closeFormModal,
        };

        put(route("admin.categories.update", editingCategory.id), options);
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
        <AdminLayout
            user={auth.user}
            title="Category CMS"
            description="Create, edit, and organize the category cards shown on the public kiosk experience."
            pageTitle="Category CMS"
        >
            <div className="space-y-6">
                <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-950">
                                Categories
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                {filteredCategories.length} record
                                {filteredCategories.length === 1 ? "" : "s"}{" "}
                                shown
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
                            Add, edit, and delete categories through modal
                            dialogs.
                        </p>
                        <PrimaryButton
                            type="button"
                            onClick={openCreateModal}
                            disabled={loading}
                        >
                            Add Category
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
                                        Description
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
                                {filteredCategories.length > 0 ? (
                                    filteredCategories.map((category) => (
                                        <tr key={category.id}>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {category.title}
                                            </td>
                                            <td className="max-w-[16rem] px-6 py-4 text-sm text-gray-600">
                                                <p className="line-clamp-2">
                                                    {category.description ||
                                                        "No description"}
                                                </p>
                                            </td>
                                            <td className="max-w-[12rem] truncate px-6 py-4 text-sm text-gray-600">
                                                {category.image || "No image"}
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
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                                <div className="flex justify-end gap-4">
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
                                            colSpan="5"
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
                                    className="rounded-lg border border-gray-100 p-4 shadow-sm"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-sm font-bold text-gray-950">
                                                {category.title}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-600">
                                                {category.description ||
                                                    "No description"}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {category.image || "No image"}
                                            </p>
                                        </div>
                                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                                            {category.is_active
                                                ? "Active"
                                                : "Hidden"}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => openEditModal(category)}
                                        className="mt-4 text-sm font-semibold text-indigo-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => openDeleteModal(category)}
                                        className="mt-2 text-sm font-semibold text-rose-600"
                                    >
                                        Delete
                                    </button>
                                </article>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">
                                No categories found.
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
                            <InputLabel htmlFor="title" value="Category Title" />
                            <TextInput
                                id="title"
                                value={data.title}
                                onChange={(event) =>
                                    setData("title", event.target.value)
                                }
                                className="mt-1 block w-full"
                                disabled={loading}
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
                                disabled={loading}
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
                                disabled={loading}
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
                                disabled={loading}
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
                                <PrimaryButton
                                    disabled={processing || loading}
                                >
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
        </AdminLayout>
    );
}
