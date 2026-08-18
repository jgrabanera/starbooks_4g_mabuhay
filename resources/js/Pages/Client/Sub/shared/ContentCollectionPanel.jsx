import { useEffect, useMemo, useState } from "react";
import Modal from "@/Components/Modal";
import {
    IoCalendarOutline,
    IoCloseOutline,
    IoDocumentOutline,
    IoPlayCircleOutline,
    IoSearchOutline,
} from "react-icons/io5";

const DEFAULT_ITEMS_PER_PAGE = 10;

export default function ContentCollectionPanel({
    logoSrc,
    logoAlt,
    eyebrow,
    title,
    searchPlaceholder,
    emptyTitle,
    emptyBody,
    badgeLabel,
    accentGradientClass,
    AccentIcon,
    items = [],
    loading = false,
    error = "",
    useAttachmentModal = false,
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [attachmentPreview, setAttachmentPreview] = useState(null);

    const closeAttachmentPreview = () => setAttachmentPreview(null);

    const openAttachmentPreview = (type, url, itemTitle) => {
        setAttachmentPreview({ type, url, itemTitle });
    };

    const filteredItems = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        return items.filter((item) => {
            if (!term) {
                return true;
            }

            return [
                item.title,
                item.description,
                item.slug,
                item.published_label,
            ]
                .filter(Boolean)
                .some((value) => String(value).toLowerCase().includes(term));
        });
    }, [items, searchTerm]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredItems.length / DEFAULT_ITEMS_PER_PAGE),
    );

    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * DEFAULT_ITEMS_PER_PAGE,
        currentPage * DEFAULT_ITEMS_PER_PAGE,
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, items]);

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
                        src={logoSrc}
                        alt={logoAlt}
                        className="mx-auto h-20 w-auto"
                    />
                    <p className="mt-4 text-[0.6rem] font-bold uppercase tracking-[0.24em] text-emerald-800 md:text-xs">
                        {eyebrow}
                    </p>
                    <h1 className="mt-3 text-3xl font-black uppercase tracking-[0.06em] text-emerald-950 md:text-4xl">
                        {title}
                    </h1>
                </div>

                <div className="mx-auto mt-6 w-full md:max-w-xl">
                    <label htmlFor={`${badgeLabel}-search`} className="sr-only">
                        {searchPlaceholder}
                    </label>
                    <div className="flex w-full items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-emerald-800 shadow-md">
                        <IoSearchOutline className="h-4 w-4 shrink-0" />
                        <input
                            id={`${badgeLabel}-search`}
                            type="text"
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(event.target.value)
                            }
                            placeholder={searchPlaceholder}
                            className="w-full max-w-6xl border-none bg-transparent text-sm font-medium placeholder:text-emerald-700/70 focus:outline-none focus:ring-0"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="mt-8 rounded-[1.5rem] border border-dashed border-emerald-300 bg-white/65 px-5 py-8 text-center shadow-md">
                        <p className="text-base font-bold text-emerald-950">
                            Loading content...
                        </p>
                    </div>
                ) : null}

                {!loading && error ? (
                    <div className="mt-8 rounded-[1.5rem] border border-dashed border-rose-300 bg-white/65 px-5 py-8 text-center shadow-md">
                        <p className="text-base font-bold text-rose-700">
                            {error}
                        </p>
                    </div>
                ) : null}

                {!loading && !error ? (
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {paginatedItems.map((item, index) => {
                            const itemNumber =
                                (currentPage - 1) * DEFAULT_ITEMS_PER_PAGE +
                                index +
                                1;

                            return (
                                <article
                                    key={item.id}
                                    className="group relative overflow-hidden rounded-[1.2rem] border border-emerald-100/80 bg-white/85 shadow-md transition duration-200 hover:-translate-y-0.5"
                                >
                                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(236,253,245,0.88),rgba(254,252,232,0.72))]" />
                                    <div className="relative z-10 grid min-h-[11.5rem] gap-3 p-4 md:grid-cols-[minmax(0,1fr)_6rem]">
                                        <div className="flex min-w-0 flex-col">
                                            <div className="flex items-start justify-between gap-3">
                                                <span className="inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-800">
                                                    <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-emerald-100 px-1 text-[0.62rem] text-emerald-700">
                                                        {itemNumber}
                                                    </span>
                                                    {badgeLabel}
                                                </span>
                                            </div>

                                            <h2 className="mt-3 text-sm font-semibold text-slate-900 md:text-base">
                                                {item.title}
                                            </h2>

                                            <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                                                {item.description || "No description available."}
                                            </p>

                                            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                                                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-emerald-800">
                                                    {(item.slug || "content-item").replaceAll("-", " ")}
                                                </p>
                                                <div className="inline-flex items-center gap-1.5 text-[0.72rem] font-medium text-slate-500">
                                                    <IoCalendarOutline className="h-3.5 w-3.5 text-emerald-700" />
                                                    <span>{item.published_label || "No date"}</span>
                                                </div>
                                            </div>

                                            {item.pdf_url ? (
                                                <div className="pt-4">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            useAttachmentModal
                                                                ? openAttachmentPreview(
                                                                      "pdf",
                                                                      item.pdf_url,
                                                                      item.title,
                                                                  )
                                                                : window.open(
                                                                      item.pdf_url,
                                                                      "_blank",
                                                                  )
                                                        }
                                                        className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-emerald-800"
                                                    >
                                                        <IoDocumentOutline className="h-3.5 w-3.5" />
                                                        View PDF
                                                    </button>
                                                </div>
                                            ) : null}

                                            {item.video_url ? (
                                                <div className="pt-4">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            useAttachmentModal
                                                                ? openAttachmentPreview(
                                                                      "video",
                                                                      item.video_url,
                                                                      item.title,
                                                                  )
                                                                : window.open(
                                                                      item.video_url,
                                                                      "_blank",
                                                                  )
                                                        }
                                                        className="inline-flex items-center gap-2 rounded-full bg-sky-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-sky-800"
                                                    >
                                                        <IoPlayCircleOutline className="h-3.5 w-3.5" />
                                                        View Video
                                                    </button>
                                                </div>
                                            ) : null}
                                        </div>

                                        <div className="mt-auto hidden overflow-hidden rounded-xl border border-white/80 shadow-sm md:block">
                                            {item.image_url ? (
                                                <img
                                                    src={item.image_url}
                                                    alt={item.title}
                                                    className="h-24 w-full object-cover"
                                                />
                                            ) : (
                                                <div className={`flex h-24 w-full items-center justify-center ${accentGradientClass}`}>
                                                    <AccentIcon className="h-10 w-10 text-white" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="h-1 w-full bg-gradient-to-r from-emerald-700 to-yellow-400" />
                                </article>
                            );
                        })}
                    </div>
                ) : null}

                {!loading && !error && filteredItems.length > 0 && totalPages > 1 ? (
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

                {!loading && !error && filteredItems.length === 0 ? (
                    <div className="mt-8 rounded-[1.5rem] border border-dashed border-emerald-300 bg-white/65 px-5 py-8 text-center shadow-md">
                        <p className="text-base font-bold text-emerald-950">
                            {emptyTitle}
                        </p>
                        <p className="mt-2 text-sm text-slate-600">
                            {emptyBody}
                        </p>
                    </div>
                ) : null}
            </div>
            <Modal
                show={Boolean(attachmentPreview)}
                onClose={closeAttachmentPreview}
                maxWidth="7xl"
            >
                <div className="flex max-h-[calc(100dvh-2rem)] flex-col overflow-hidden bg-white sm:max-h-[calc(100dvh-3rem)]">
                    <div className="flex items-center justify-between gap-3 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-amber-50 px-4 py-3 text-emerald-950 sm:gap-5 sm:px-6 sm:py-4">
                        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-700 shadow-sm sm:h-12 sm:w-12">
                                {attachmentPreview?.type === "pdf" ? (
                                    <IoDocumentOutline className="h-5 w-5 sm:h-6 sm:w-6" />
                                ) : (
                                    <IoPlayCircleOutline className="h-5 w-5 sm:h-6 sm:w-6" />
                                )}
                            </span>
                            <div className="min-w-0">
                            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-emerald-700 sm:text-xs">
                                {attachmentPreview?.type === "pdf"
                                    ? "PDF Preview"
                                    : "Video Preview"}
                            </p>
                            <h2 className="mt-0.5 truncate text-sm font-bold sm:text-lg">
                                {attachmentPreview?.itemTitle}
                            </h2>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={closeAttachmentPreview}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-800 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-100 sm:h-11 sm:w-11"
                            aria-label="Close preview"
                        >
                            <IoCloseOutline className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="min-h-0 flex-1 bg-slate-100 p-1.5 sm:p-3 lg:p-4">
                        {attachmentPreview?.type === "pdf" ? (
                            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm sm:rounded-xl">
                                <iframe
                                    src={attachmentPreview.url}
                                    title={`${attachmentPreview.itemTitle} PDF`}
                                    className="h-[68dvh] w-full bg-white sm:h-[72dvh] lg:h-[76dvh] [@media(orientation:landscape)]:h-[70dvh]"
                                />
                            </div>
                        ) : null}

                        {attachmentPreview?.type === "video" ? (
                            <div className="flex items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white p-2 shadow-sm sm:rounded-xl sm:p-4">
                                <video
                                    key={attachmentPreview.url}
                                    src={attachmentPreview.url}
                                    controls
                                    autoPlay
                                    playsInline
                                    className="aspect-video max-h-[76dvh] w-full rounded-lg bg-slate-100 object-contain"
                                >
                                    Your browser does not support video
                                    playback.
                                </video>
                            </div>
                        ) : null}
                    </div>
                </div>
            </Modal>
        </div>
    );
}
