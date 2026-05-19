import ClientLayout from "@/Layouts/ClientLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

const SubCategories = ({ category, subCategories }) => {
    const pageTabs = [
        {
            id: "sub-categories",
            label: "Memorandum",
            count: subCategories.length,
            isAvailable: true,
        },
        {
            id: "services",
            label: "Executive Orders",
            count: 0,
            isAvailable: false,
        },
        {
            id: "providers",
            label: "Ordinance",
            count: 0,
            isAvailable: false,
        },
    ];
    const [activeTab, setActiveTab] = useState(pageTabs[0].id);
    const [searchQuery, setSearchQuery] = useState("");

    const normalizedSearchQuery = searchQuery.trim().toLowerCase();
    const filteredSubCategories = subCategories.filter((subCategory) => {
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

    return (
        <>
            <Head title={`${category.title} Sub-Categories`} />
            <button
                type="button"
                onClick={handleBack}
                aria-label="Go back to the previous page"
                className="fixed left-4 top-4 z-50 flex items-center gap-2 rounded-full border-2 border-white bg-emerald-700 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-[0_14px_32px_rgba(6,78,59,0.35)] transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-yellow-300 sm:left-6 sm:top-6"
            >
                <span aria-hidden="true" className="text-xl leading-none">
                    ←
                </span>
                <span>Back</span>
            </button>
            <div className="subcategory-screen grid w-full self-start place-items-center text-emerald-950 bg-white/50  max-h-screen overflow-y-auto p-10 rounded-lg ">
                <section className="subcategory-wrap mx-auto w-full px-4 py-4 sm:px-6 md:px-8 h-full md:h-[calc(100vh-22rem)]">
                    <h1 className="text-center text-2xl font-bold">
                        {category.title}
                    </h1>

                    <p className="mt-2 text-center text-sm text-gray-600">
                        {category.description}
                    </p>

                    <div className="mt-6 flex justify-center">
                        <div className="flex w-full max-w-5xl items-center gap-3 rounded-2xl border border-white/80 bg-white/50 p-2 shadow-[0_18px_36px_rgba(15,83,72,0.14)] backdrop-blur portrait:flex-col portrait:items-stretch landscape:flex-row">
                            <div
                                role="tablist"
                                aria-label="Category sections"
                                className="flex min-w-0 flex-1 gap-2 overflow-x-auto"
                            >
                                {pageTabs.map((tab) => {
                                    const isActive = activeTab === tab.id;

                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            role="tab"
                                            aria-selected={isActive}
                                            aria-disabled={!tab.isAvailable}
                                            disabled={!tab.isAvailable}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex min-w-36 shrink-0 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold uppercase tracking-wide transition duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-300 ${
                                                isActive
                                                    ? "border-emerald-800 bg-emerald-700 text-white shadow-[0_12px_24px_rgba(6,78,59,0.28)]"
                                                    : "border-emerald-100 bg-white text-emerald-900 shadow-sm hover:-translate-y-0.5 hover:border-emerald-500 hover:bg-emerald-50"
                                            } ${
                                                !tab.isAvailable
                                                    ? "cursor-not-allowed opacity-70 hover:translate-y-0 hover:border-emerald-100 hover:bg-white"
                                                    : ""
                                            }`}
                                        >
                                            <span>{tab.label}</span>
                                            {tab.isAvailable ? (
                                                <span
                                                    className={`rounded-full px-2 py-0.5 text-xs ${
                                                        isActive
                                                            ? "bg-white/20 text-white"
                                                            : "bg-emerald-100 text-emerald-800"
                                                    }`}
                                                >
                                                    {tab.count}
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                                                    Soon
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="flex min-w-64 items-center rounded-xl border border-emerald-100 bg-white px-4 py-3 shadow-sm focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-yellow-200 portrait:w-full landscape:w-80">
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

                    {activeTab === "sub-categories" && (
                        <div className="mt-5">
                            {filteredSubCategories.length === 0 ? (
                                <p className="mt-8 rounded-2xl border border-dashed border-emerald-200 bg-white/80 px-4 py-8 text-center text-sm font-semibold text-emerald-900">
                                    No sub-categories found.
                                </p>
                            ) : (
                                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {filteredSubCategories.map(
                                        (subCategory) => (
                                            <div
                                                key={subCategory.id}
                                                className="subcategory-card rounded-lg md:max-w-80 border border-gray-200 p-4 bg-white shadow hover:shadow-lg transition duration-300 ease-out  "
                                            >
                                                {subCategory.image && (
                                                    <img
                                                        src={`/storage/images/thumbnails/${subCategory.image}`}
                                                        alt={subCategory.title}
                                                        className="subcategory-image mb-4 h-40 w-full object-cover rounded"
                                                    />
                                                )}
                                                <h2 className="text-lg font-semibold">
                                                    {subCategory.title}
                                                </h2>
                                                <p className="text-sm text-gray-600">
                                                    {subCategory.description}
                                                </p>
                                            </div>
                                        ),
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </>
    );
};

export default SubCategories;

SubCategories.layout = (page) => <ClientLayout>{page}</ClientLayout>;
