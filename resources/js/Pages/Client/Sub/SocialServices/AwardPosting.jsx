import { useEffect, useState } from "react";
import { IoCalendarOutline, IoRibbonOutline, IoSearchOutline } from "react-icons/io5";

const awardItems = [
    { id: 1, title: "Sample award posting for municipal procurement notice and project awarding updates.", reference: "AWD-001", date: "January 15, 2026" },
    { id: 2, title: "Dummy notice of award for facility improvement and construction services.", reference: "AWD-002", date: "February 6, 2026" },
    { id: 3, title: "Illustrative award posting for office equipment supply and delivery package.", reference: "AWD-003", date: "March 12, 2026" },
    { id: 4, title: "Example municipal bid award entry for public works and rehabilitation support.", reference: "AWD-004", date: "April 21, 2026" },
];

const AwardPosting = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const filteredItems = awardItems.filter((item) =>
        `${item.title} ${item.reference} ${item.date}`.toLowerCase().includes(searchTerm.trim().toLowerCase()),
    );
    const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
    const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    useEffect(() => setCurrentPage(1), [searchTerm]);
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    return (
        <div className="rounded-[1.75rem] border border-white/80 bg-white/55 p-4 shadow-lg backdrop-blur-md md:p-6">
            <div className="mx-auto flex min-h-[78vh] max-w-5xl flex-col">
                <div className="text-center">
                    <img src="/assets/images/logos/lgu-mabuhay.png" alt="LGU Mabuhay" className="mx-auto h-20 w-auto" />
                    <p className="mt-4 text-[0.6rem] font-bold uppercase tracking-[0.24em] text-emerald-800 md:text-xs">Sample Reference Collection</p>
                    <p className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-emerald-700/80 md:text-[0.65rem]">Dummy Content For Layout Preview</p>
                    <h1 className="mt-3 text-3xl font-black uppercase tracking-[0.06em] text-emerald-950 md:text-4xl">Award Posting</h1>
                </div>
                <div className="mx-auto mt-6 w-full md:max-w-xl">
                    <label htmlFor="award-search" className="sr-only">Search award postings</label>
                    <div className="flex w-full items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-emerald-800 shadow-md">
                        <IoSearchOutline className="h-4 w-4 shrink-0" />
                        <input id="award-search" type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search award postings" className="w-full max-w-6xl border-none bg-transparent text-sm font-medium placeholder:text-emerald-700/70 focus:outline-none focus:ring-0" />
                    </div>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {paginatedItems.map((item, index) => (
                        <article key={item.id} className="group relative overflow-hidden rounded-[1.2rem] border border-emerald-100/80 bg-white/85 shadow-md transition duration-200 hover:-translate-y-0.5">
                            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(236,253,245,0.88),rgba(254,252,232,0.72))]" />
                            <div className="relative z-10 grid min-h-[10.25rem] gap-3 p-4 md:grid-cols-[minmax(0,1fr)_6rem]">
                                <div className="flex min-w-0 flex-col">
                                    <div className="flex items-start justify-between gap-3">
                                        <span className="inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-800">
                                            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-emerald-100 px-1 text-[0.62rem] text-emerald-700">{index + 1}</span>
                                            Award Posting
                                        </span>
                                    </div>
                                    <h2 className="mt-3 text-sm font-semibold text-slate-900 md:text-base">{item.title}</h2>
                                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                                        <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-emerald-800">{item.reference}</p>
                                        <div className="inline-flex items-center gap-1.5 text-[0.72rem] font-medium text-slate-500">
                                            <IoCalendarOutline className="h-3.5 w-3.5 text-emerald-700" />
                                            <span>{item.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-auto hidden overflow-hidden rounded-xl border border-white/80 shadow-sm md:block">
                                    <div className="flex h-24 w-full items-center justify-center bg-[linear-gradient(135deg,rgba(5,150,105,0.92),rgba(16,185,129,0.78),rgba(250,204,21,0.62))]">
                                        <IoRibbonOutline className="h-10 w-10 text-white" />
                                    </div>
                                </div>
                            </div>
                            <div className="h-1 w-full bg-gradient-to-r from-emerald-700 to-yellow-400" />
                        </article>
                    ))}
                </div>
                {filteredItems.length === 0 ? <div className="mt-8 rounded-[1.5rem] border border-dashed border-emerald-300 bg-white/65 px-5 py-8 text-center shadow-md"><p className="text-base font-bold text-emerald-950">No award postings found.</p><p className="mt-2 text-sm text-slate-600">Try a different keyword or clear the search field.</p></div> : null}
            </div>
        </div>
    );
};

export default AwardPosting;
