import { useMemo, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";

const emptyCategory = {
    title: "",
    label: "",
    image: "",
    description: "",
    sort_order: 0,
    is_active: true,
};

export default function Categories({ auth, categories = [], setupNeeded = false }) {
    const [editingCategory, setEditingCategory] = useState(null);
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
            [category.title, category.label, category.image, category.description]
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

    const editCategory = (category) => {
        setEditingCategory(category);
        clearErrors();
        setData({
            title: category.title ?? "",
            label: category.label ?? "",
            image: category.image ?? "",
            description: category.description ?? "",
            sort_order: category.sort_order ?? 0,
            is_active: Boolean(category.is_active),
        });
    };

    const createCategory = () => {
        const options = {
            preserveScroll: true,
            onSuccess: clearForm,
        };

        post(route("admin.categories.store"), options);
    };

    const updateCategory = () => {
        const options = {
            preserveScroll: true,
            onSuccess: clearForm,
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

    const deleteCategory = (category) => {
        if (window.confirm(`Delete "${category.label}"?`)) {
            destroy(route("admin.categories.destroy", category.id), {
                preserveScroll: true,
                onSuccess: clearForm,
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Category CMS</h2>}
        >
            <Head title="Category CMS" />

            <div className="py-8">
                <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[22rem_1fr] lg:px-8">
                    <section className="rounded-lg bg-white p-5 shadow-sm">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
                            STARBOOKS 4G Mabuhay
                        </p>
                        <h1 className="mt-2 text-2xl font-bold text-gray-950">
                            {editingCategory ? "Edit Category" : "Add Category"}
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Category records appear on the public category screen.
                        </p>

                        {setupNeeded && (
                            <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                                Run the database migration before adding categories.
                            </div>
                        )}

                        <form onSubmit={submitCategory} className="mt-5 space-y-4">
                            <div>
                                <InputLabel htmlFor="label" value="Category Label" />
                                <TextInput
                                    id="label"
                                    value={data.label}
                                    onChange={(event) => setData("label", event.target.value)}
                                    className="mt-1 block w-full"
                                    disabled={setupNeeded}
                                />
                                <InputError message={errors.label} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="title" value="Short Title" />
                                <TextInput
                                    id="title"
                                    value={data.title}
                                    onChange={(event) => setData("title", event.target.value)}
                                    className="mt-1 block w-full"
                                    disabled={setupNeeded}
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="image" value="Image Path or URL" />
                                <TextInput
                                    id="image"
                                    value={data.image}
                                    onChange={(event) => setData("image", event.target.value)}
                                    className="mt-1 block w-full"
                                    disabled={setupNeeded}
                                />
                                <InputError message={errors.image} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="Description" />
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(event) => setData("description", event.target.value)}
                                    rows="3"
                                    disabled={setupNeeded}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="sort_order" value="Sort Order" />
                                <TextInput
                                    id="sort_order"
                                    type="number"
                                    min="0"
                                    value={data.sort_order}
                                    onChange={(event) => setData("sort_order", event.target.value)}
                                    className="mt-1 block w-full"
                                    disabled={setupNeeded}
                                />
                                <InputError message={errors.sort_order} className="mt-2" />
                            </div>

                            <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(event) => setData("is_active", event.target.checked)}
                                    disabled={setupNeeded}
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                Show publicly
                            </label>

                            <div className="flex flex-wrap gap-3">
                                <PrimaryButton disabled={processing || setupNeeded}>
                                    {processing ? "Saving..." : editingCategory ? "Update" : "Save"}
                                </PrimaryButton>
                                {editingCategory && (
                                    <>
                                        <SecondaryButton type="button" onClick={clearForm}>
                                            Cancel
                                        </SecondaryButton>
                                        <DangerButton
                                            type="button"
                                            onClick={() => deleteCategory(editingCategory)}
                                            disabled={processing}
                                        >
                                            Delete
                                        </DangerButton>
                                    </>
                                )}
                            </div>
                        </form>
                    </section>

                    <section className="overflow-hidden rounded-lg bg-white shadow-sm">
                        <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-950">Categories</h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    {filteredCategories.length} record{filteredCategories.length === 1 ? "" : "s"} shown
                                </p>
                            </div>
                            <TextInput
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                className="w-full sm:max-w-xs"
                                placeholder="Search"
                            />
                        </div>

                        <div className="hidden overflow-x-auto md:block">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                            Order
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                            Label
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                            Title
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
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                    {category.sort_order}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-semibold text-gray-950">
                                                    {category.label}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {category.title}
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
                                                        {category.is_active ? "Active" : "Hidden"}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                                    <button
                                                        type="button"
                                                        onClick={() => editCategory(category)}
                                                        className="font-semibold text-indigo-600 hover:text-indigo-800"
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">
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
                                                <p className="text-sm font-bold text-gray-950">{category.label}</p>
                                                <p className="mt-1 text-sm text-gray-600">{category.title}</p>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {category.image || "No image"}
                                                </p>
                                            </div>
                                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                                                {category.sort_order}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => editCategory(category)}
                                            className="mt-4 text-sm font-semibold text-indigo-600"
                                        >
                                            Edit
                                        </button>
                                    </article>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">No categories found.</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
