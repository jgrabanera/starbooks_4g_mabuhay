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
            <div className="grid w-full place-items-center text-emerald-950 md:min-h-[70vh]">
                <div className="mx-auto w-full max-w-[98rem] px-1 py-4 sm:px-3 sm:py-6 md:px-6 lg:px-8">
                    <div className="grid w-full max-w-sm grid-cols-1 gap-4 sm:max-w-none sm:grid-cols-2 md:grid-cols-3 lg:gap-6 xl:grid-cols-5 xl:gap-8">
                        {categoryItems.map((category) => (
                            <div
                                key={category.id ?? category.title}
                                className="overflow-hidden rounded-xl bg-white/80 shadow-[0_18px_35px_rgba(15,83,72,0.16)] ring-1 ring-emerald-950/5 backdrop-blur sm:rounded-2xl"
                            >
                                <div className="relative aspect-[4/3] min-h-40 overflow-hidden">
                                    <div className="absolute inset-x-3 top-4 flex justify-center sm:inset-x-4 sm:top-6">
                                        <div className="max-w-full rounded-lg bg-emerald-900 px-3 py-2.5 text-center text-[0.68rem] font-black uppercase leading-tight text-white shadow-lg sm:px-4 sm:py-3 sm:text-xs">
                                            {category.label}
                                        </div>
                                    </div>
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
