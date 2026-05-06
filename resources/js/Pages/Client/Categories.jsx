import { Head } from "@inertiajs/react";
import ClientLayout from "@/Layouts/ClientLayout";

const fallbackCategories = [
    {
        title: "Made with natural materials.",
        label: "Postings Awarded Procurement",
    },
    // { title: "Eco Desk Organizer.", label: "Approved NTA, Budget" },
    // { title: "Minimalist Workspace Setup.", label: "Income Per Month" },
    // { title: "Compact and Space Saving.", label: "Expenditures" },
    {
        title: "Multifunctional Organizer.",
        label: "On-going and Completed Projects",
    },
    { title: "Perfect Stand.", label: "Executive Orders" },
    // { title: "All in one Design.", label: "Memorandum" },
    // { title: "Premium Build Quality.", label: "Ordinance" },

    {
        title: "Different color, same elegance.",
        label: "Festivities and Tourism Sites",
    },

    { title: "Designed for Productivity.", label: "DOST Services" },
];

export default function Categories({ categories = [] }) {
    const categoryItems = categories.length ? categories : fallbackCategories;

    return (
        <>
            <Head title="Categories" />
            <div className="category-screen grid w-full place-items-center text-emerald-950 md:min-h-[70vh]">
                <div className="category-wrap mx-auto w-full max-w-[95vw] px-5 py-8 md:max-w-[85vw] md:px-10">
                    <div className="category-grid mx-auto grid w-full grid-cols-1 place-items-center justify-center gap-4 sm:grid-cols-2 md:grid-cols-2 lg:gap-6 xl:grid-cols-5 xl:gap-8">
                        {categoryItems.map((category) => (
                            <div
                                key={category.id ?? category.title}
                                className="category-card w-full max-w-[18rem] overflow-hidden rounded-2xl bg-gradient-to-br from-white/95 via-white/85 to-emerald-50/80 shadow-[0_18px_35px_rgba(15,83,72,0.16)] ring-1 ring-emerald-950/5 backdrop-blur transition duration-500 ease-out hover:scale-110 hover:-translate-y-1 hover:shadow-[0_26px_45px_rgba(15,83,72,0.2)]"
                            >
                                <div className="category-card-body relative aspect-[4/3] min-h-44 overflow-hidden">
                                    <div className="absolute inset-x-4 top-4 flex justify-center sm:inset-x-6 sm:top-6">
                                        <div className="category-label max-w-full rounded-lg bg-emerald-900 px-4 py-3 text-center text-[0.68rem] font-black uppercase leading-tight text-white shadow-lg sm:text-xs">
                                            {category.label}
                                        </div>
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-700 via-yellow-400 to-orange-400 opacity-70" />
                                    <div className="category-card-image absolute inset-0 h-full w-full object-cover object-center" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

Categories.layout = (page) => <ClientLayout>{page}</ClientLayout>;
