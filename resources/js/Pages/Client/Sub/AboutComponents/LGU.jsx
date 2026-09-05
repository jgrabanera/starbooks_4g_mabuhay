import { useEffect, useState } from "react";
import {
    IoCloseOutline,
    IoPeopleOutline,
    IoSearchOutline,
} from "react-icons/io5";
import Modal from "@/Components/Modal";

const captainPlaceholderImage = "/assets/images/placeholder.jpg";

const useCaptainPlaceholder = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = captainPlaceholderImage;
};

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
                                                captainPlaceholderImage
                                            }
                                            onError={useCaptainPlaceholder}
                                            alt={`${barangay.officials.captain || "Barangay captain"} portrait`}
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
                    <div className="relative max-h-[calc(100vh-4rem)] overflow-y-auto rounded-lg border-t-4 border-emerald-700 bg-white shadow-2xl">
                        <button
                            type="button"
                            onClick={() => setSelectedBarangay(null)}
                            className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-500 transition hover:border-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                        >
                            <span className="sr-only">Close modal</span>
                            <IoCloseOutline className="h-6 w-6" />
                        </button>

                        <div className="p-5 sm:p-8">
                            <header className="border-b border-slate-200 pb-5 pr-12">
                                <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">
                                    Municipality of Mabuhay · Barangay Profile
                                </p>
                                <h2 className="mt-2 text-2xl font-black uppercase tracking-wide text-slate-950 sm:text-3xl">
                                    {selectedBarangay.title}
                                </h2>
                                <p className="mt-2 text-sm text-slate-500">
                                    Community information and current barangay leadership directory
                                </p>
                            </header>

                            <div className="mt-6 grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
                                <aside className="border border-slate-200 bg-slate-50 p-5">
                                    <img
                                        src={selectedBarangay.captain_image || captainPlaceholderImage}
                                        onError={useCaptainPlaceholder}
                                        alt={`${selectedBarangay.officials.captain || "Barangay captain"} portrait`}
                                        className="mx-auto h-40 w-40 rounded-md border border-slate-200 bg-white object-cover"
                                    />
                                    <div className="mt-4 text-center">
                                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                                            Barangay Captain
                                        </p>
                                        <p className="mt-2 text-xl font-bold text-slate-950">
                                            {selectedBarangay.officials.captain}
                                        </p>
                                    </div>
                                </aside>

                                <div>
                                    <h3 className="text-base font-bold text-slate-950">
                                        Barangay Information
                                    </h3>
                                    <dl className="mt-3 grid border border-slate-200 sm:grid-cols-2">
                                        <div className="border-b border-slate-200 p-4 sm:border-r">
                                            <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Reference code</dt>
                                            <dd className="mt-1 font-semibold text-slate-950">{selectedBarangay.reference}</dd>
                                        </div>
                                        <div className="border-b border-slate-200 p-4">
                                            <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Population</dt>
                                            <dd className="mt-1 font-semibold text-slate-950">{selectedBarangay.population.toLocaleString()}</dd>
                                        </div>
                                        <div className="border-b border-slate-200 p-4 sm:border-b-0 sm:border-r">
                                            <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Secretary</dt>
                                            <dd className="mt-1 font-semibold text-slate-950">{selectedBarangay.officials.secretary}</dd>
                                        </div>
                                        <div className="p-4">
                                            <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Treasurer</dt>
                                            <dd className="mt-1 font-semibold text-slate-950">{selectedBarangay.officials.treasurer}</dd>
                                        </div>
                                    </dl>

                                    <div className="mt-5 border-l-4 border-sky-600 bg-sky-50 px-4 py-3">
                                        <p className="text-xs font-bold uppercase tracking-wider text-sky-700">SK Chairperson</p>
                                        <p className="mt-1 font-semibold text-slate-950">{selectedBarangay.officials.skChairperson}</p>
                                    </div>
                                </div>
                            </div>

                            <section className="mt-7 border-t border-slate-200 pt-6">
                                <div className="flex items-end justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-950">Barangay Kagawads</h3>
                                        <p className="mt-1 text-sm text-slate-500">Members of the barangay council</p>
                                    </div>
                                    <span className="text-sm font-semibold text-emerald-700">
                                        {selectedBarangay.officials.kagawads.length} members
                                    </span>
                                </div>
                                <ul className="mt-4 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2">
                                    {selectedBarangay.officials.kagawads.map((kagawad, index) => (
                                        <li key={`${kagawad}-${index}`} className="flex items-center gap-3 bg-white px-4 py-3 text-sm font-medium text-slate-800">
                                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-xs font-bold text-emerald-800">
                                                {index + 1}
                                            </span>
                                            {kagawad}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                    </div>
                ) : null}
            </Modal>
        </div>
    );
};

export default LGU;
