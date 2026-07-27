import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { useEffect, useMemo, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import Modal from "@/Components/Modal";

const AboutLguMabuhay = () => {
    const [loading, setLoading] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isTabsModalOpen, setIsTabsModalOpen] = useState(false);
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
                                        and the tabs shown on each category
                                        page.
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
                                    {/* <input
                                        type="search"
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(event.target.value)
                                        }
                                        className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 shadow-sm transition placeholder:text-slate-400 focus:border-slate-200 focus:ring-slate-200"
                                        placeholder="Search categories"
                                    /> */}
                                </div>
                                <button
                                    type="button"
                                    // onClick={openCreateModal}
                                    disabled={loading}
                                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-6"
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
                                {/* {filteredCategories.length > 0 ? (
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
                                )} */}

                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-6 py-8 text-center text-sm text-gray-500"
                                    >
                                        No categories found.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="space-y-3 p-4 md:hidden">
                        {/* {filteredCategories.length > 0 ? (
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
                                    <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                openEditModal(category)
                                            }
                                            className="inline-flex w-full items-center justify-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                openTabsModal(category)
                                            }
                                            className="inline-flex w-full items-center justify-center rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                                        >
                                            Tabs
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                openDeleteModal(category)
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
                                    No categories found.
                                </p>
                            </div>
                        )} */}

                        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
                            <p className="text-sm font-medium text-slate-500">
                                No categories found.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AboutLguMabuhay;
AboutLguMabuhay.layout = (page) => (
    <AdminLayout
        user={page.props.auth.user}
        title="Categories"
        breadcrumbs={[{ label: "Admin Workspace" }, { label: "Categories" }]}
        children={page}
    />
);
