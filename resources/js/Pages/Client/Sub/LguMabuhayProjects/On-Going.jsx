import { useEffect, useState } from "react";
import {
    IoCalendarOutline,
    IoConstructOutline,
    IoSearchOutline,
} from "react-icons/io5";

const ongoingProjects = [
    {
        id: 1,
        title: "Municipal Evacuation Center Expansion for improved emergency shelter capacity.",
        reference: "LGU-ONG-001",
        date: "November 2026",
    },
    {
        id: 2,
        title: "Water System Improvement Phase II supporting more reliable community distribution.",
        reference: "LGU-ONG-002",
        date: "December 2026",
    },
    {
        id: 3,
        title: "Multi-purpose building construction for local meetings, programs, and events.",
        reference: "LGU-ONG-003",
        date: "October 2026",
    },
    {
        id: 4,
        title: "Barangay road widening program to improve access, mobility, and traffic flow.",
        reference: "LGU-ONG-004",
        date: "January 2027",
    },
    {
        id: 5,
        title: "Drainage canal rehabilitation project for flood mitigation and maintenance needs.",
        reference: "LGU-ONG-005",
        date: "September 2026",
    },
    {
        id: 6,
        title: "Public plaza enhancement with lighting, seating, and walkway upgrades.",
        reference: "LGU-ONG-006",
        date: "February 2027",
    },
    {
        id: 7,
        title: "Slaughterhouse maintenance upgrade for sanitation and operational improvements.",
        reference: "LGU-ONG-007",
        date: "March 2027",
    },
    {
        id: 8,
        title: "Public terminal improvement package for passenger convenience and circulation.",
        reference: "LGU-ONG-008",
        date: "April 2027",
    },
    {
        id: 9,
        title: "Community nursery expansion with added planting beds and water access points.",
        reference: "LGU-ONG-009",
        date: "August 2026",
    },
    {
        id: 10,
        title: "Barangay office modernization and records area improvement project.",
        reference: "LGU-ONG-010",
        date: "May 2027",
    },
];

const OnGoing = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredProjects = ongoingProjects.filter((project) => {
        const searchableContent =
            `${project.title} ${project.reference} ${project.date}`.toLowerCase();

        return searchableContent.includes(searchTerm.trim().toLowerCase());
    });

    const totalPages = Math.max(
        1,
        Math.ceil(filteredProjects.length / itemsPerPage),
    );

    const paginatedProjects = filteredProjects.slice(
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
        <div className="rounded-[1.75rem] border border-white/80 bg-white/55 p-4 shadow-lg backdrop-blur-md md:p-6 md:[@media(orientation:portrait)]:max-h-[82vh] md:[@media(orientation:portrait)]:min-h-[82vh]">
            <div className="mx-auto flex min-h-[78vh] max-w-5xl flex-col">
                <div className="text-center">
                    <img
                        src="/assets/images/logos/lgu-mabuhay.png"
                        alt="LGU Mabuhay"
                        className="mx-auto h-20 w-auto"
                    />
                    <p className="mt-4 text-[0.6rem] font-bold uppercase tracking-[0.24em] text-emerald-800 md:text-xs">
                        Sample Reference Collection
                    </p>
                    <p className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-emerald-700/80 md:text-[0.65rem]">
                        Dummy Content For Layout Preview
                    </p>
                    <h1 className="mt-3 text-3xl font-black uppercase tracking-[0.06em] text-emerald-950 md:text-4xl">
                        On-Going Projects
                    </h1>
                </div>

                <div className="mx-auto mt-6 w-full md:max-w-xl">
                    <label htmlFor="ongoing-projects-search" className="sr-only">
                        Search on-going projects
                    </label>
                    <div className="flex w-full items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-emerald-800 shadow-md">
                        <IoSearchOutline className="h-4 w-4 shrink-0" />
                        <input
                            id="ongoing-projects-search"
                            type="text"
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(event.target.value)
                            }
                            placeholder="Search on-going projects"
                            className="w-full max-w-6xl border-none bg-transparent text-sm font-medium placeholder:text-emerald-700/70 focus:outline-none focus:ring-0"
                        />
                    </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {paginatedProjects.map((project, index) => {
                        const itemNumber =
                            (currentPage - 1) * itemsPerPage + index + 1;

                        return (
                            <article
                                key={project.id}
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
                                                On-Going
                                            </span>
                                        </div>

                                        <h2 className="mt-3 text-sm font-semibold text-slate-900 md:text-base">
                                            {project.title}
                                        </h2>

                                        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                                            <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-emerald-800">
                                                {project.reference}
                                            </p>
                                            <div className="inline-flex items-center gap-1.5 text-[0.72rem] font-medium text-slate-500">
                                                <IoCalendarOutline className="h-3.5 w-3.5 text-emerald-700" />
                                                <span>{project.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto hidden overflow-hidden rounded-xl border border-white/80 shadow-sm md:block">
                                        <div className="flex h-24 w-full items-center justify-center bg-[linear-gradient(135deg,rgba(250,204,21,0.72),rgba(16,185,129,0.84),rgba(5,150,105,0.95))]">
                                            <IoConstructOutline className="h-10 w-10 text-white" />
                                        </div>
                                    </div>
                                </div>

                                <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-emerald-700" />
                            </article>
                        );
                    })}
                </div>

                {filteredProjects.length > 0 && totalPages > 1 ? (
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

                {filteredProjects.length === 0 ? (
                    <div className="mt-8 rounded-[1.5rem] border border-dashed border-emerald-300 bg-white/65 px-5 py-8 text-center shadow-md">
                        <p className="text-base font-bold text-emerald-950">
                            No projects found.
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

export default OnGoing;
