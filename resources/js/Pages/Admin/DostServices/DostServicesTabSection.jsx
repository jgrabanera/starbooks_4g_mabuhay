import { useState } from "react";
import Modal from "@/Components/Modal";
import {
    IoCloseOutline,
    IoDocumentOutline,
    IoPlayCircleOutline,
} from "react-icons/io5";

export default function DostServicesTabSection({
    contents,
    currentTab,
    config,
    tabMatches,
    onEdit,
    onDelete,
}) {
    const [pdfPreview, setPdfPreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);

    const getTabLabel = (content) =>
        config.tabs.find((tab) => tabMatches(tab, content.tab_id))?.label ??
        content.tab_id;

    const openPdfPreview = (content) => {
        if (!content?.pdf) {
            return;
        }

        setPdfPreview({
            title: content.title,
            url: `/storage/documents/pdfs/${content.pdf}`,
        });
    };

    const closePdfPreview = () => {
        setPdfPreview(null);
    };

    const openVideoPreview = (content) => {
        if (!content?.video) {
            return;
        }

        setVideoPreview({
            title: content.title,
            url: `/storage/videos/dost-services/${content.video}`,
        });
    };

    const closeVideoPreview = () => {
        setVideoPreview(null);
    };

    return (
        <>
            <div className="hidden overflow-x-auto md:block">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {[
                                "Title",
                                "Tab",
                                "Image",
                                "PDF",
                                "Video",
                                "Status",
                            ].map((heading) => (
                                <th
                                    key={heading}
                                    className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600"
                                >
                                    {heading}
                                </th>
                            ))}
                            <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-600">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {contents.length > 0 ? (
                            contents.map((content) => (
                                <tr
                                    key={content.id}
                                    className="transition hover:bg-slate-50/80"
                                >
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                                        {content.title}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {getTabLabel(content)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {content.image ? (
                                            <img
                                                src={`/storage/images/thumbnails/${content.image}`}
                                                alt={content.title}
                                                className="h-14 w-20 rounded-lg border border-slate-200 object-cover shadow-sm"
                                            />
                                        ) : (
                                            <span className="text-sm text-slate-600">
                                                No image
                                            </span>
                                        )}
                                    </td>
                                    <td className="max-w-[12rem] truncate px-6 py-4 text-sm text-slate-600">
                                        {content.pdf ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    openPdfPreview(content)
                                                }
                                                className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-600 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-sm transition hover:bg-emerald-700"
                                            >
                                                <IoDocumentOutline className="h-5 w-5" />
                                                View PDF
                                            </button>
                                        ) : (
                                            <span className="font-semibold text-rose-600">
                                                No PDF
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {content.video ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    openVideoPreview(content)
                                                }
                                                className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-sky-600 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-sm transition hover:bg-sky-700"
                                            >
                                                <IoPlayCircleOutline className="h-5 w-5" />
                                                View Video
                                            </button>
                                        ) : (
                                            <span className="text-sm font-semibold text-rose-600">
                                                No video
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                content.is_active
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "bg-gray-100 text-gray-600"
                                            }`}
                                        >
                                            {content.is_active
                                                ? "Active"
                                                : "Hidden"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm">
                                        <div className="flex justify-end gap-4">
                                            <button
                                                type="button"
                                                onClick={() => onEdit(content)}
                                                className="font-semibold text-indigo-600 hover:text-indigo-800"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onDelete(content)
                                                }
                                                className="font-semibold text-rose-600 hover:text-rose-800"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="px-6 py-8 text-center text-sm text-slate-500"
                                >
                                    No content found for the{" "}
                                    {currentTab?.label ?? "selected tab"}.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="space-y-3 p-4 md:hidden">
                {contents.length > 0 ? (
                    contents.map((content) => (
                        <article
                            key={content.id}
                            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0 flex-1">
                                    <p className="break-words text-base font-bold text-slate-950">
                                        {content.title}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        {getTabLabel(content)}
                                    </p>
                                    <p className="mt-2 break-all text-xs text-slate-500">
                                        Image: {content.image || "No image"}
                                    </p>
                                    <div className="mt-1 text-xs text-slate-500">
                                        {content.pdf ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    openPdfPreview(content)
                                                }
                                                className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-600 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-sm transition hover:bg-emerald-700"
                                            >
                                                <IoDocumentOutline className="h-5 w-5" />
                                                View PDF
                                            </button>
                                        ) : (
                                            <span className="font-semibold text-rose-600">
                                                PDF: No PDF
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-2">
                                        {content.video ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    openVideoPreview(content)
                                                }
                                                className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-sky-600 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-sm transition hover:bg-sky-700"
                                            >
                                                <IoPlayCircleOutline className="h-5 w-5" />
                                                View Video
                                            </button>
                                        ) : (
                                            <p className="break-all text-xs font-semibold text-rose-600">
                                                Video: No video
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                        content.is_active
                                            ? "bg-emerald-50 text-emerald-700"
                                            : "bg-gray-100 text-gray-600"
                                    }`}
                                >
                                    {content.is_active ? "Active" : "Hidden"}
                                </span>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                                <button
                                    type="button"
                                    onClick={() => onEdit(content)}
                                    className="inline-flex w-full items-center justify-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onDelete(content)}
                                    className="inline-flex w-full items-center justify-center rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                                >
                                    Delete
                                </button>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
                        <p className="text-sm font-medium text-slate-500">
                            No content found for the{" "}
                            {currentTab?.label ?? "selected tab"}.
                        </p>
                    </div>
                )}
            </div>

            <Modal
                show={Boolean(pdfPreview)}
                onClose={closePdfPreview}
                maxWidth="7xl"
            >
                <div className="flex max-h-[calc(100dvh-2rem)] flex-col overflow-hidden bg-white sm:max-h-[calc(100dvh-3rem)]">
                    <div className="flex items-center justify-between gap-3 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-amber-50 px-4 py-3 text-emerald-950 sm:gap-5 sm:px-6 sm:py-4">
                        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-700 shadow-sm sm:h-12 sm:w-12">
                                <IoDocumentOutline className="h-5 w-5 sm:h-6 sm:w-6" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-emerald-700 sm:text-xs">
                                    PDF Preview
                                </p>
                                <h2 className="mt-0.5 truncate text-sm font-bold sm:text-lg">
                                    {pdfPreview?.title}
                                </h2>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={closePdfPreview}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-800 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-100 sm:h-11 sm:w-11"
                            aria-label="Close PDF preview"
                        >
                            <IoCloseOutline className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="min-h-0 flex-1 bg-slate-100 p-1.5 sm:p-3 lg:p-4">
                        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm sm:rounded-xl">
                            <iframe
                                src={pdfPreview?.url}
                                title={`${pdfPreview?.title} PDF`}
                                className="h-[68dvh] w-full bg-white sm:h-[72dvh] lg:h-[76dvh] [@media(orientation:landscape)]:h-[70dvh]"
                            />
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                show={Boolean(videoPreview)}
                onClose={closeVideoPreview}
                maxWidth="7xl"
            >
                <div className="flex max-h-[calc(100dvh-2rem)] flex-col overflow-hidden bg-white sm:max-h-[calc(100dvh-3rem)]">
                    <div className="flex items-center justify-between gap-3 border-b border-sky-100 bg-gradient-to-r from-sky-50 via-white to-amber-50 px-4 py-3 text-sky-950 sm:gap-5 sm:px-6 sm:py-4">
                        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-100 bg-white text-sky-700 shadow-sm sm:h-12 sm:w-12">
                                <IoPlayCircleOutline className="h-5 w-5 sm:h-6 sm:w-6" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-sky-700 sm:text-xs">
                                    Video Preview
                                </p>
                                <h2 className="mt-0.5 truncate text-sm font-bold sm:text-lg">
                                    {videoPreview?.title}
                                </h2>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={closeVideoPreview}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-100 bg-white text-sky-800 shadow-sm transition hover:border-sky-200 hover:bg-sky-100 focus:outline-none focus:ring-4 focus:ring-sky-100 sm:h-11 sm:w-11"
                            aria-label="Close video preview"
                        >
                            <IoCloseOutline className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="min-h-0 flex-1 bg-slate-100 p-1.5 sm:p-3 lg:p-4">
                        <div className="flex items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white p-2 shadow-sm sm:rounded-xl sm:p-4">
                            <video
                                key={videoPreview?.url}
                                src={videoPreview?.url}
                                controls
                                autoPlay
                                playsInline
                                className="aspect-video max-h-[76dvh] w-full rounded-lg bg-slate-100 object-contain"
                            >
                                Your browser does not support video playback.
                            </video>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}
