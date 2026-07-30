import { useEffect, useMemo, useState } from "react";
import { router, useForm, useRemember } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";

const emptyCategory = {
    title: "",
    image: null,
    display_order: 1,
    description: "",
    is_active: true,
};

export default function Categories({ categories: categoryItems = [] }) {
    const [categories, setCategories] = useState(categoryItems);
    const [editingCategory, setEditingCategory] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [search, setSearch] = useRemember("", "admin-categories-search");

    const {
        data,
        setData,
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

    useEffect(() => {
        setCategories(categoryItems);
    }, [categoryItems]);

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

    const openEditModal = (category) => {
        setEditingCategory(category);
        clearErrors();
        setData({
            title: category.title ?? "",
            image: null,
            display_order: category.display_order ?? 1,
            description: category.description ?? "",
            is_active: Boolean(category.is_active),
        });
        setIsFormModalOpen(true);
    };

    const updateCategory = () => {
        if (!editingCategory) {
            return;
        }

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
        updateCategory();
    };

    return (
        <>
            <div className="space-y-6">
                <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 bg-gradient-to-r from-emerald-50 via-white to-white px-4 py-5 sm:px-6">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                            <div className="space-y-4">
                                <div className="space-y-1 font-google-sans-semibold">
                                    {/* <p className="text-xl font-bold uppercase tracking-[0.22em] text-emerald-700">
                                        Category Library
                                    </p> */}
                                    <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
                                        Organize public category sections
                                    </h2>
                                    <p className="max-w-2xl text-sm leading-6 text-slate-600">
                                        Manage titles, descriptions, visibility,
                                        display order, and images for the fixed
                                        public category pages.
                                    </p>
                                </div>
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
                                        placeholder="Search categories"
                                    />
                                </div>
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
                                                            openEditModal(
                                                                category,
                                                            )
                                                        }
                                                        className="font-semibold text-indigo-600 hover:text-indigo-800"
                                                    >
                                                        Edit
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
                                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                                >
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                        <div className="min-w-0 flex-1">
                                            <p className="text-base font-bold text-slate-950">
                                                {category.title}
                                            </p>
                                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                                {category.description ||
                                                    "No description"}
                                            </p>
                                            <p className="mt-2 break-all text-sm text-slate-500">
                                                {category.image || "No image"}
                                            </p>
                                        </div>
                                        <span
                                            className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${
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
                                    <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                openEditModal(category)
                                            }
                                            className="inline-flex w-full items-center justify-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                                        >
                                            Edit
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
                <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
                                STARBOOKS 4G Mabuhay
                            </p>
                            <h2 className="mt-2 text-xl font-bold text-gray-950 sm:text-2xl">
                                Edit Category
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                The public category set is fixed. You can edit
                                titles, descriptions, ordering, images, and
                                visibility here.
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
                            <InputLabel
                                htmlFor="display_order"
                                value="Display Order"
                            />
                            <TextInput
                                id="display_order"
                                type="number"
                                min="1"
                                value={data.display_order}
                                onChange={(event) =>
                                    setData(
                                        "display_order",
                                        event.target.value,
                                    )
                                }
                                className="mt-1 block w-full"
                                disabled={processing}
                            />
                            <p className="mt-2 text-xs text-gray-500">
                                Lower numbers appear first on the category
                                screen.
                            </p>
                            <InputError
                                message={errors.display_order}
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

                        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
                            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                <SecondaryButton
                                    type="button"
                                    onClick={closeFormModal}
                                >
                                    Cancel
                                </SecondaryButton>
                                <PrimaryButton disabled={processing}>
                                    {processing ? "Saving..." : "Update"}
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
