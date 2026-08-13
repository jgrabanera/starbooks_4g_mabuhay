import { useEffect, useState } from "react";
import {
    IoCloseOutline,
    IoPeopleOutline,
    IoSearchOutline,
} from "react-icons/io5";
import Modal from "@/Components/Modal";

const LGU = ({ lguData = null }) => {
    const barangays = Array.isArray(lguData?.barangays)
        ? lguData.barangays
        : [];
    const logo = lguData?.logo || null;
    const badge = lguData?.badge || "";
    const subtitle = lguData?.subtitle || "";
    const title = lguData?.title || "";
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBarangay, setSelectedBarangay] = useState(null);
    const itemsPerPage = 10;
    const hasContent =
        logo || badge || subtitle || title || barangays.length > 0;

    const filteredBarangays = barangays.filter((barangay) => {
        const searchableContent = [
            barangay.title,
            barangay.reference,
            barangay.population,
            barangay.officials.captain,
            barangay.officials.secretary,
            barangay.officials.treasurer,
            barangay.officials.skChairperson,
            ...barangay.officials.kagawads,
        ]
            .join(" ")
            .toLowerCase();

        return searchableContent.includes(searchTerm.trim().toLowerCase());
    });

    const totalPages = Math.max(
        1,
        Math.ceil(filteredBarangays.length / itemsPerPage),
    );

    const paginatedBarangays = filteredBarangays.slice(
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

    if (!hasContent) {
        return (
            <div className="rounded-[1.75rem] border border-dashed border-emerald-200 bg-white/60 px-6 py-12 text-center shadow-lg backdrop-blur-md">
                <p className="text-base font-bold text-emerald-950">
                    No LGU content available yet.
                </p>
                <p className="mt-2 text-sm text-slate-600">
                    This section will appear once LGU content is added from the
                    CMS.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-[1.75rem] border border-white/80 bg-white/55 p-4 shadow-lg backdrop-blur-md md:p-6 md:[@media(orientation:portrait)]:max-h-[82vh] md:[@media(orientation:portrait)]:min-h-[82vh]">
            <div className="mx-auto flex min-h-[78vh] max-w-5xl flex-col">
                <div className="text-center">
                    {logo ? (
                        <img
                            src={logo}
                            alt="LGU Mabuhay"
                            className="mx-auto h-20 w-auto"
                        />
                    ) : null}
                    {badge ? (
                        <p className="mt-4 text-[0.6rem] font-bold uppercase tracking-[0.24em] text-emerald-800 md:text-xs">
                            {badge}
                        </p>
                    ) : null}
                    {subtitle ? (
                        <p className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-emerald-700/80 md:text-[0.65rem]">
                            {subtitle}
                        </p>
                    ) : null}
                    {title ? (
                        <h1 className="mt-3 text-3xl font-black uppercase tracking-[0.06em] text-emerald-950 md:text-4xl">
                            {title}
                        </h1>
                    ) : null}
                </div>

                <div className="mx-auto mt-6 w-full md:max-w-xl">
                    <label htmlFor="barangay-search" className="sr-only">
                        Search barangays
                    </label>
                    <div className="flex w-full items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-emerald-800 shadow-md">
                        <IoSearchOutline className="h-4 w-4 shrink-0" />
                        <input
                            id="barangay-search"
                            type="text"
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(event.target.value)
                            }
                            placeholder="Search barangay, official, or reference"
                            className="w-full max-w-6xl border-none bg-transparent text-sm font-medium placeholder:text-emerald-700/70 focus:outline-none focus:ring-0"
                        />
                    </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {paginatedBarangays.map((barangay, index) => {
                        const itemNumber =
                            (currentPage - 1) * itemsPerPage + index + 1;

                        return (
                            <button
                                key={barangay.id}
                                type="button"
                                onClick={() => setSelectedBarangay(barangay)}
                                className="group relative overflow-hidden rounded-[1.2rem] border border-emerald-100/80 bg-white/85 text-left shadow-md transition duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-emerald-200"
                            >
                                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(236,253,245,0.88),rgba(254,252,232,0.72))]" />
                                <div className="relative z-10 grid min-h-[10.25rem] gap-3 p-4 md:grid-cols-[minmax(0,1fr)_6rem]">
                                    <div className="flex min-w-0 flex-col">
                                        <h2 className="mt-3 text-sm font-semibold text-slate-900 md:text-base">
                                            {barangay.title}
                                        </h2>

                                        <div className="mt-3 space-y-1 text-xs leading-5 text-slate-600 md:text-sm">
                                            <p>
                                                <span className="font-semibold text-emerald-800">
                                                    Brgy. Captain:
                                                </span>{" "}
                                                {barangay.officials.captain}
                                            </p>
                                            <p>
                                                <span className="font-semibold text-emerald-800">
                                                    Secretary:
                                                </span>{" "}
                                                {barangay.officials.secretary}
                                            </p>
                                            <p>
                                                <span className="font-semibold text-emerald-800">
                                                    Treasurer:
                                                </span>{" "}
                                                {barangay.officials.treasurer}
                                            </p>
                                        </div>

                                        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                                            <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-emerald-800">
                                                {barangay.reference}
                                            </p>
                                            <div className="inline-flex items-center gap-1.5 text-[0.72rem] font-medium text-slate-500">
                                                <IoPeopleOutline className="h-3.5 w-3.5 text-emerald-700" />
                                                <span>
                                                    {barangay.population.toLocaleString()}{" "}
                                                    population
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto hidden overflow-hidden rounded-xl border border-white/80 shadow-sm md:block">
                                        <img
                                            src={
                                                barangay.captain_image ||
                                                "/assets/images/lgu_mabuhay.jpg"
                                            }
                                            alt=""
                                            aria-hidden="true"
                                            className="h-24 w-full object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="h-1 w-full bg-gradient-to-r from-emerald-700 to-yellow-400" />
                            </button>
                        );
                    })}
                </div>

                {filteredBarangays.length > 0 && totalPages > 1 ? (
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

                {filteredBarangays.length === 0 ? (
                    <div className="mt-8 rounded-[1.5rem] border border-dashed border-emerald-300 bg-white/65 px-5 py-8 text-center shadow-md">
                        <p className="text-base font-bold text-emerald-950">
                            No barangays found.
                        </p>
                        <p className="mt-2 text-sm text-slate-600">
                            Try a different keyword or clear the search field.
                        </p>
                    </div>
                ) : null}
            </div>

            <Modal
                show={selectedBarangay !== null}
                onClose={() => setSelectedBarangay(null)}
                maxWidth="4xl"
            >
                {selectedBarangay ? (
                    <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-50 shadow-2xl">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,248,235,0.98),rgba(255,255,255,0.98),rgba(255,251,235,0.94))]" />
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_68%)]" />
                        <button
                            type="button"
                            onClick={() => setSelectedBarangay(null)}
                            className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-100 bg-white/95 text-slate-500 shadow-sm transition hover:border-amber-200 hover:text-amber-800 focus:outline-none focus:ring-4 focus:ring-amber-200"
                        >
                            <span className="sr-only">Close modal</span>
                            <IoCloseOutline className="h-6 w-6" />
                        </button>

                        <div className="relative z-10 max-h-[calc(100vh-5rem)] overflow-y-auto">
                            <div className="px-5 pb-8 pt-10 sm:px-8 sm:pb-10">
                                <div className="mx-auto max-w-4xl">
                                    <div className="rounded-[1.75rem] border border-white/80 bg-white/85 px-5 py-8 text-center shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:px-8">
                                        <p className="text-[0.62rem] font-bold uppercase tracking-[0.32em] text-amber-700">
                                            Municipality of Mabuhay
                                        </p>
                                        <h2 className="mt-3 text-3xl font-black uppercase tracking-[0.06em] text-slate-900 sm:text-4xl">
                                            {selectedBarangay.title}
                                        </h2>
                                        {/* <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                                            Barangay profile and leadership
                                            directory for community reference.
                                        </p> */}

                                        <div className="mt-7 flex w-full flex-col items-center text-center">
                                            <div className="w-full max-w-xl rounded-[1.75rem] border border-amber-200/80 bg-[linear-gradient(135deg,rgba(251,191,36,0.16),rgba(255,255,255,0.97),rgba(249,115,22,0.12))] px-5 py-6 shadow-[0_20px_60px_rgba(245,158,11,0.16)]">
                                                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.98),rgba(253,230,138,0.52))] ring-4 ring-white shadow-lg shadow-amber-100/80">
                                                    <div className="h-24 w-24 overflow-hidden rounded-full border-[3px] border-amber-500/80 bg-white">
                                                        <img
                                                            src={
                                                                selectedBarangay.captain_image ||
                                                                "/assets/images/lgu_mabuhay.jpg"
                                                            }
                                                            alt={`${selectedBarangay.officials.captain} portrait`}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-5">
                                                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.3em] text-amber-700">
                                                        Featured Official
                                                    </p>
                                                    <p className="mt-3 text-2xl font-black text-slate-900 sm:text-[1.7rem]">
                                                        {
                                                            selectedBarangay
                                                                .officials
                                                                .captain
                                                        }
                                                    </p>
                                                    <div className="mx-auto mt-3 inline-flex items-center rounded-full bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white shadow-md">
                                                        Barangay Captain
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-7 grid w-full gap-3 sm:grid-cols-3">
                                                <div className="rounded-2xl border border-amber-100 bg-amber-50/80 px-4 py-3">
                                                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-amber-700">
                                                        Reference
                                                    </p>
                                                    <p className="mt-2 text-sm font-semibold text-slate-900">
                                                        {
                                                            selectedBarangay.reference
                                                        }
                                                    </p>
                                                </div>
                                                <div className="rounded-2xl border border-amber-100 bg-amber-50/80 px-4 py-3">
                                                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-amber-700">
                                                        Population
                                                    </p>
                                                    <p className="mt-2 text-sm font-semibold text-slate-900">
                                                        {selectedBarangay.population.toLocaleString()}
                                                    </p>
                                                </div>
                                                <div className="rounded-2xl border border-sky-100 bg-sky-50/80 px-4 py-3">
                                                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-sky-700">
                                                        SK Chairperson
                                                    </p>
                                                    <p className="mt-2 text-sm font-semibold text-slate-900">
                                                        {
                                                            selectedBarangay
                                                                .officials
                                                                .skChairperson
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] px-5">
                                        <section>
                                            <p className="text-sm font-bold text-slate-900">
                                                Barangay Officials
                                            </p>
                                            <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700">
                                                <p>
                                                    Barangay Captain:{" "}
                                                    <span className="font-semibold text-slate-900">
                                                        {
                                                            selectedBarangay
                                                                .officials
                                                                .captain
                                                        }
                                                    </span>
                                                </p>
                                                <p>
                                                    Secretary:{" "}
                                                    <span className="font-semibold text-slate-900">
                                                        {
                                                            selectedBarangay
                                                                .officials
                                                                .secretary
                                                        }
                                                    </span>
                                                </p>
                                                <p>
                                                    Treasurer:{" "}
                                                    <span className="font-semibold text-slate-900">
                                                        {
                                                            selectedBarangay
                                                                .officials
                                                                .treasurer
                                                        }
                                                    </span>
                                                </p>
                                                <p>
                                                    SK Chairperson:{" "}
                                                    <span className="font-semibold text-slate-900">
                                                        {
                                                            selectedBarangay
                                                                .officials
                                                                .skChairperson
                                                        }
                                                    </span>
                                                </p>
                                                <p>
                                                    Reference:{" "}
                                                    <span className="font-semibold text-slate-900">
                                                        {
                                                            selectedBarangay.reference
                                                        }
                                                    </span>
                                                </p>
                                                <p>
                                                    Population:{" "}
                                                    <span className="font-semibold text-slate-900">
                                                        {selectedBarangay.population.toLocaleString()}
                                                    </span>
                                                </p>
                                            </div>

                                            <div className="mt-6">
                                                <p className="text-sm font-bold text-slate-900">
                                                    Municipal Councilors
                                                </p>
                                                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7 text-slate-700 marker:text-amber-600">
                                                    {selectedBarangay.officials.kagawads.map(
                                                        (kagawad) => (
                                                            <li key={kagawad}>
                                                                {kagawad}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        </section>

                                        <section>
                                            <p className="text-sm font-bold text-slate-900">
                                                Barangay Overview
                                            </p>
                                            <div className="mt-4 rounded-2xl border border-amber-100 bg-white/80 px-4 py-4 text-sm leading-7 text-slate-700">
                                                <p>
                                                    This barangay profile shows
                                                    the current leadership and
                                                    quick directory details for{" "}
                                                    <span className="font-semibold text-slate-900">
                                                        {selectedBarangay.title}
                                                    </span>
                                                    .
                                                </p>
                                            </div>

                                            <div className="mt-6">
                                                <p className="text-sm font-bold text-slate-900">
                                                    Key Details
                                                </p>
                                                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7 text-slate-700 marker:text-amber-600">
                                                    <li>
                                                        Reference Code:{" "}
                                                        {
                                                            selectedBarangay.reference
                                                        }
                                                    </li>
                                                    <li>
                                                        Population:{" "}
                                                        {selectedBarangay.population.toLocaleString()}
                                                    </li>
                                                    <li>
                                                        Captain:{" "}
                                                        {
                                                            selectedBarangay
                                                                .officials
                                                                .captain
                                                        }
                                                    </li>
                                                    <li>
                                                        Secretary:{" "}
                                                        {
                                                            selectedBarangay
                                                                .officials
                                                                .secretary
                                                        }
                                                    </li>
                                                    <li>
                                                        Treasurer:{" "}
                                                        {
                                                            selectedBarangay
                                                                .officials
                                                                .treasurer
                                                        }
                                                    </li>
                                                    <li>
                                                        SK Chairperson:{" "}
                                                        {
                                                            selectedBarangay
                                                                .officials
                                                                .skChairperson
                                                        }
                                                    </li>
                                                </ul>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </Modal>
        </div>
    );
};

export default LGU;
