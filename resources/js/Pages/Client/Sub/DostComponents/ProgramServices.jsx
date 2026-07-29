import { useEffect, useState } from "react";
import { IoCalendarOutline, IoSearchOutline } from "react-icons/io5";

const programServices = [
    {
        id: 1,
        title: "SETUP assistance package for small manufacturers and emerging food processors.",
        reference: "PROG-001",
        date: "January 10, 2026",
    },
    {
        id: 2,
        title: "Scholarship support orientation for qualified science and engineering students.",
        reference: "PROG-002",
        date: "January 24, 2026",
    },
    {
        id: 3,
        title: "Innovation mentoring for startup teams exploring science-based products.",
        reference: "PROG-003",
        date: "February 7, 2026",
    },
    {
        id: 4,
        title: "Community-based technology training for livelihood and microenterprise groups.",
        reference: "PROG-004",
        date: "February 21, 2026",
    },
    {
        id: 5,
        title: "Technical advisory for packaging improvement and product shelf-life assessment.",
        reference: "PROG-005",
        date: "March 6, 2026",
    },
    {
        id: 6,
        title: "Laboratory coordination service for quality testing and calibration requests.",
        reference: "PROG-006",
        date: "March 20, 2026",
    },
    {
        id: 7,
        title: "Research proposal screening for science-driven regional development projects.",
        reference: "PROG-007",
        date: "April 3, 2026",
    },
    {
        id: 8,
        title: "Program referrals for fabrication labs, prototyping, and design consultations.",
        reference: "PROG-008",
        date: "April 17, 2026",
    },
    {
        id: 9,
        title: "Climate adaptation technology matching for agriculture and coastal communities.",
        reference: "PROG-009",
        date: "May 1, 2026",
    },
    {
        id: 10,
        title: "Science communication support for schools, libraries, and kiosk deployments.",
        reference: "PROG-010",
        date: "May 15, 2026",
    },
    {
        id: 11,
        title: "MSME coaching sessions for process improvement and production efficiency.",
        reference: "PROG-011",
        date: "May 29, 2026",
    },
    {
        id: 12,
        title: "Regional grant navigation assistance for innovation and technology adoption.",
        reference: "PROG-012",
        date: "June 12, 2026",
    },
    {
        id: 13,
        title: "Youth science outreach and mentoring coordination for community events.",
        reference: "PROG-013",
        date: "June 26, 2026",
    },
    {
        id: 14,
        title: "Referral support for intellectual property filing and commercialization guidance.",
        reference: "PROG-014",
        date: "July 10, 2026",
    },
];

const ProgramServices = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredServices = programServices.filter((service) => {
        const searchableContent =
            `${service.title} ${service.reference} ${service.date}`.toLowerCase();

        return searchableContent.includes(searchTerm.trim().toLowerCase());
    });

    const totalPages = Math.max(
        1,
        Math.ceil(filteredServices.length / itemsPerPage),
    );
    const paginatedServices = filteredServices.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    return (
        <div className="md:[@media(orientation:portrait)]:max-h-[82vh] md:[@media(orientation:portrait)]:min-h-[82vh] rounded-[1.75rem] border border-white/80 bg-white/55 p-4 shadow-lg backdrop-blur-md md:p-6">
            <div className="mx-auto flex min-h-[78vh] max-w-5xl flex-col">
                <div className="text-center">
                    <img
                        src="/assets/images/logos/DOST.png"
                        alt="DOST"
                        className="mx-auto h-20 w-auto"
                    />
                    <p className="mt-4 text-[0.6rem] font-bold uppercase tracking-[0.24em] text-emerald-800 md:text-xs">
                        Sample Program Directory
                    </p>
                    <p className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-emerald-700/80 md:text-[0.65rem]">
                        Dummy Content For Layout Preview
                    </p>
                    <h1 className="mt-3 text-3xl font-black uppercase tracking-[0.06em] text-emerald-950 md:text-4xl">
                        DOST Services
                    </h1>
                </div>

                <div className="mt-6 mx-auto w-full md:max-w-xl">
                    <label
                        htmlFor="program-services-search"
                        className="sr-only"
                    >
                        Search program services
                    </label>

                    <div className="flex w-full items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-emerald-800 shadow-md ">
                        <IoSearchOutline className="h-4 w-4 shrink-0" />
                        <input
                            id="program-services-search"
                            type="text"
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(event.target.value)
                            }
                            placeholder="Search services"
                            className="w-full max-w-6xl bg-transparent text-sm font-medium placeholder:text-emerald-700/70 focus:outline-none border-none border-focus:ring-0 focus:ring-0"
                        />
                    </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {paginatedServices.map((service, index) => {
                        const itemNumber =
                            (currentPage - 1) * itemsPerPage + index + 1;

                        return (
                            <article
                                key={service.id}
                                className="group relative overflow-hidden rounded-[1.2rem] border border-emerald-100/80 bg-white/85 shadow-md transition duration-200 hover:-translate-y-0.5"
                            >
                                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(236,253,245,0.88),rgba(254,252,232,0.72))]" />
                                <div className="relative z-10 grid min-h-[10.25rem] gap-3 p-4 md:grid-cols-[minmax(0,1fr)_6rem]">
                                    <div className="flex min-w-0 flex-col">
                                        <div className="flex items-start justify-between gap-3">
                                            <span className="inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-800">
                                                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-emerald-100 px-1 text-[0.62rem] text-emerald-700">
                                                    {itemNumber}
                                                </span>
                                                Program
                                            </span>
                                        </div>

                                        <h2 className="mt-3 text-sm font-semibold text-slate-900 md:text-base">
                                            {service.title}
                                        </h2>

                                        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                                            <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-emerald-800">
                                                {service.reference}
                                            </p>
                                            <div className="inline-flex items-center gap-1.5 text-[0.72rem] font-medium text-slate-500">
                                                <IoCalendarOutline className="h-3.5 w-3.5 text-emerald-700" />
                                                <span>{service.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto hidden overflow-hidden rounded-xl border border-white/80 shadow-sm md:block">
                                        <img
                                            src="/assets/images/lgu_mabuhay.jpg"
                                            alt=""
                                            aria-hidden="true"
                                            className="h-24 w-full object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="h-1 w-full bg-gradient-to-r from-emerald-700 to-yellow-400" />
                            </article>
                        );
                    })}
                </div>

                {filteredServices.length > 0 && totalPages > 1 ? (
                    <div className="mt-auto flex flex-wrap items-center justify-center gap-2 pt-8">
                        <button
                            type="button"
                            onClick={() =>
                                setCurrentPage((page) => Math.max(1, page - 1))
                            }
                            disabled={currentPage === 1}
                            className="rounded-full border border-emerald-200 bg-white/85 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-md transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, index) => {
                            const pageNumber = index + 1;
                            const isActive = currentPage === pageNumber;

                            return (
                                <button
                                    key={pageNumber}
                                    type="button"
                                    onClick={() => setCurrentPage(pageNumber)}
                                    className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold shadow-md transition ${
                                        isActive
                                            ? "border-emerald-700 bg-emerald-700 text-white"
                                            : "border-emerald-200 bg-white/85 text-emerald-800 hover:bg-emerald-50"
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}

                        <button
                            type="button"
                            onClick={() =>
                                setCurrentPage((page) =>
                                    Math.min(totalPages, page + 1),
                                )
                            }
                            disabled={currentPage === totalPages}
                            className="rounded-full border border-emerald-200 bg-white/85 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-md transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                ) : null}

                {filteredServices.length === 0 ? (
                    <div className="mt-8 rounded-[1.5rem] border border-dashed border-emerald-300 bg-white/65 px-5 py-8 text-center shadow-md">
                        <p className="text-base font-bold text-emerald-950">
                            No program services found.
                        </p>
                        <p className="mt-2 text-sm text-slate-600">
                            Try a different keyword or clear the search field.
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ProgramServices;
