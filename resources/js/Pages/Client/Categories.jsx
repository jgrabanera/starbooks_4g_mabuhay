import { Head } from "@inertiajs/react";
import ClientLayout from "@/Layouts/ClientLayout";

const fallbackCategories = [
    { title: "Made with natural materials.", label: "Postings Awarded Procurement" },
    { title: "Multifunctional Organizer.", label: "On-going and Completed Projects" },
    { title: "All in one Design.", label: "Memorandum" },
    { title: "Perfect Stand.", label: "Executive Orders" },
    { title: "Different color, same elegance.", label: "Festivities and Tourism Sites" },
    { title: "Eco Desk Organizer.", label: "Approved NTA, Budget" },
    { title: "Minimalist Workspace Setup.", label: "Income Per Month" },
    { title: "Compact and Space Saving.", label: "Expenditures" },
    { title: "Premium Build Quality.", label: "Ordinance" },
    { title: "Designed for Productivity.", label: "DOST Services" },
];

export default function Categories({ categories = [] }) {
    const categoryItems = categories.length ? categories : fallbackCategories;

    return (
        <>
            <Head title="Categories" />
            <div className="h-full w-full text-emerald-950 md:min-h-[70vh]">
                <div className="mx-auto h-full w-full max-w-[95vw] px-5 py-8 md:max-w-[85vw] md:px-10">
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-5 lg:gap-8">
                        {categoryItems.map((category) => (
                            <article
                                key={category.id ?? category.title}
                                className="overflow-hidden rounded-2xl bg-white/80 shadow-[0_18px_35px_rgba(15,83,72,0.16)] ring-1 ring-emerald-950/5 backdrop-blur"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <div className="absolute right-4 top-4 rounded-lg bg-emerald-900 px-4 py-3 text-center text-xs font-black uppercase text-white shadow-lg sm:right-6 sm:top-6">
                                        {category.label}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

Categories.layout = (page) => <ClientLayout>{page}</ClientLayout>;
