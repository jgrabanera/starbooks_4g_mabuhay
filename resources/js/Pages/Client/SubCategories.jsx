import ClientLayout from "@/Layouts/ClientLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

const SubCategories = ({ category, subCategories }) => {
    const storedTabs =
        Array.isArray(category.tabs) && category.tabs.length > 0
            ? category.tabs
            : [{ id: "memorandum-1", label: "Memorandum" }];
    const primaryTabId = storedTabs[0]?.id ?? "memorandum-1";
    const pageTabs = storedTabs.map((tab, index) => ({
        id: tab.id ?? `tab-${index + 1}`,
        label: tab.label,
        count: subCategories.filter((subCategory) => {
            if (index === 0) {
                return (
                    !subCategory.tab_id || subCategory.tab_id === primaryTabId
                );
            }

            return subCategory.tab_id === tab.id;
        }).length,
        isPrimary: index === 0,
    }));
    const [activeTab, setActiveTab] = useState(primaryTabId);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    const normalizedSearchQuery = searchQuery.trim().toLowerCase();
    const filteredSubCategories = subCategories.filter((subCategory) => {
        const belongsToActiveTab =
            activeTab === primaryTabId
                ? !subCategory.tab_id || subCategory.tab_id === primaryTabId
                : subCategory.tab_id === activeTab;

        if (!belongsToActiveTab) {
            return false;
        }

        if (!normalizedSearchQuery) {
            return true;
        }

        return [subCategory.title, subCategory.description]
            .filter(Boolean)
            .some((value) =>
                value.toLowerCase().includes(normalizedSearchQuery),
            );
    });

    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back();

            return;
        }

        window.location.href = "/categories";
    };

    const closeSubCategoryModal = () => {
        setSelectedSubCategory(null);
    };

    useEffect(() => {
        if (!selectedSubCategory) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                closeSubCategoryModal();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [selectedSubCategory]);

    return (
        <>
            <Head title={`${category.title} Sub-Categories`} />
            <button
                type="button"
                onClick={handleBack}
                aria-label="Go back to the previous page"
                className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full border-2 border-white bg-emerald-700 px-4 py-3 text-xs font-bold uppercase tracking-wide text-white shadow-[0_14px_32px_rgba(6,78,59,0.35)] transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-yellow-300 sm:bottom-6 sm:left-6 sm:px-5 sm:text-sm"
            >
                <span aria-hidden="true" className="text-xl leading-none">
                    &larr;
                </span>
                <span>Back</span>
            </button>
            <div className="subcategory-screen grid max-h-[calc(100dvh-10rem)] w-full self-start place-items-center overflow-y-auto rounded-lg bg-white/50 p-3 text-emerald-950 sm:max-h-[calc(100dvh-12rem)] sm:p-6 lg:p-8">
                <section className="subcategory-wrap mx-auto w-full max-w-6xl px-1 py-3 sm:px-4 md:px-6">
                    <h1 className="text-center text-xl font-bold leading-tight sm:text-2xl">
                        {category.title}
                    </h1>

                    <p className="mx-auto mt-2 max-w-3xl text-center text-xs leading-5 text-gray-600 sm:text-sm">
                        {category.description}
                    </p>

                    <div className="mt-6 flex justify-center">
                        <div className="flex w-full max-w-5xl items-center gap-3 rounded-2xl border border-white/80 bg-white/50 p-2 shadow-[0_18px_36px_rgba(15,83,72,0.14)] backdrop-blur portrait:flex-col portrait:items-stretch landscape:flex-row">
                            <div
                                role="tablist"
                                aria-label="Category sections"
                                className="flex w-full min-w-0 flex-1 gap-2 overflow-x-auto pb-1 landscape:pb-0"
                            >
                                {pageTabs.map((tab) => {
                                    const isActive = activeTab === tab.id;

                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            role="tab"
                                            aria-selected={isActive}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex min-w-32 shrink-0 items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs font-bold uppercase tracking-wide transition duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-300 sm:min-w-36 sm:px-4 sm:text-sm ${
                                                isActive
                                                    ? "border-emerald-800 bg-emerald-700 text-white shadow-[0_12px_24px_rgba(6,78,59,0.28)]"
                                                    : "border-emerald-100 bg-white text-emerald-900 shadow-sm hover:-translate-y-0.5 hover:border-emerald-500 hover:bg-emerald-50"
                                            }`}
                                        >
                                            <span>{tab.label}</span>
                                            <span
                                                className={`rounded-full px-2 py-0.5 text-xs ${
                                                    isActive
                                                        ? "bg-white/20 text-white"
                                                        : "bg-emerald-100 text-emerald-800"
                                                }`}
                                            >
                                                {tab.count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="flex w-full min-w-0 items-center rounded-xl border border-emerald-100 bg-white px-4 py-3 shadow-sm focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-yellow-200 landscape:w-80 landscape:shrink-0">
                                <span
                                    aria-hidden="true"
                                    className="mr-3 text-sm font-bold uppercase tracking-wide text-emerald-700"
                                >
                                    Search
                                </span>
                                <input
                                    type="search"
                                    value={searchQuery}
                                    onChange={(event) =>
                                        setSearchQuery(event.target.value)
                                    }
                                    placeholder="Search..."
                                    aria-label="Search sub-categories"
                                    className="w-full border-0 bg-transparent p-0 text-sm font-medium text-emerald-950 placeholder:text-gray-400 focus:border-0 focus:outline-none focus:ring-0"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-5">
                        {filteredSubCategories.length === 0 ? (
                            <p className="mt-8 rounded-2xl border border-dashed border-emerald-200 bg-white/80 px-4 py-8 text-center text-sm font-semibold text-emerald-900">
                                No items found in this tab yet.
                            </p>
                        ) : (
                            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {filteredSubCategories.map((subCategory) => (
                                    <button
                                        key={subCategory.id}
                                        type="button"
                                        onClick={() =>
                                            setSelectedSubCategory(subCategory)
                                        }
                                        aria-haspopup="dialog"
                                        className="subcategory-card group flex h-full flex-col rounded-lg border border-gray-200 bg-white p-4 text-left shadow transition duration-300 ease-out hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300"
                                    >
                                        {subCategory.image && (
                                            <img
                                                src={`/storage/images/thumbnails/${subCategory.image}`}
                                                alt={subCategory.title}
                                                className="subcategory-image mb-4 h-36 w-full rounded object-cover transition duration-300 group-hover:scale-[1.02] sm:h-40"
                                            />
                                        )}
                                        <h2 className="text-lg font-semibold">
                                            {subCategory.title}
                                        </h2>
                                        <p className="text-sm leading-6 text-gray-600">
                                            {subCategory.description}
                                        </p>
                                        <span className="mt-auto inline-flex w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700">
                                            View details
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>
            {selectedSubCategory && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-emerald-950/70 p-3 backdrop-blur-sm sm:p-4"
                    onClick={closeSubCategoryModal}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="subcategory-modal-title"
                        className="relative grid max-h-[92dvh] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_28px_70px_rgba(6,78,59,0.35)] md:max-h-[90vh] md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={closeSubCategoryModal}
                            aria-label="Close sub-category details"
                            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/90 text-2xl font-bold leading-none text-emerald-900 shadow-lg transition hover:bg-emerald-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-yellow-300 sm:right-4 sm:top-4"
                        >
                            &times;
                        </button>

                        <div className="bg-emerald-900">
                            {selectedSubCategory.image ? (
                                <img
                                    src={`/storage/images/thumbnails/${selectedSubCategory.image}`}
                                    alt={selectedSubCategory.title}
                                    className="h-44 w-full object-cover sm:h-64 md:h-full"
                                />
                            ) : (
                                <div className="flex h-44 w-full items-center justify-center bg-gradient-to-br from-emerald-700 via-emerald-600 to-yellow-500 px-6 text-center text-lg font-black uppercase tracking-wide text-white sm:h-64 sm:px-8 sm:text-xl md:h-full">
                                    {selectedSubCategory.title}
                                </div>
                            )}
                        </div>

                        <div className="flex max-h-[calc(92dvh-11rem)] flex-col overflow-y-auto p-5 sm:max-h-[calc(92dvh-16rem)] sm:p-8 md:max-h-[90vh]">
                            <span className="w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800">
                                {category.title}
                            </span>
                            <h2
                                id="subcategory-modal-title"
                                className="mt-4 text-xl font-black leading-tight text-emerald-950 sm:text-3xl"
                            >
                                {selectedSubCategory.title}
                            </h2>
                            <p className="mt-4 text-sm leading-6 text-gray-700 sm:text-base sm:leading-7">
                                {selectedSubCategory.description ||
                                    "No description available."}
                            </p>
                            <div className="mt-6 flex justify-end sm:mt-8">
                                <button
                                    type="button"
                                    onClick={closeSubCategoryModal}
                                    className="w-full rounded-full bg-emerald-700 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-[0_12px_24px_rgba(6,78,59,0.24)] transition hover:-translate-y-0.5 hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-yellow-300 sm:w-auto"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SubCategories;

SubCategories.layout = (page) => <ClientLayout>{page}</ClientLayout>;
