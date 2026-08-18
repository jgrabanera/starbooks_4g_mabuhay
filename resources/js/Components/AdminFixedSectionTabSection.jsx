export default function AdminFixedSectionTabSection({
    contents,
    currentTab,
    config,
    tabMatches,
    onEdit,
    onDelete,
}) {
    const getTabLabel = (content) =>
        config.tabs.find((tab) => tabMatches(tab, content.tab_id))?.label ??
        content.tab_id;

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
                            ].map(
                                (heading) => (
                                    <th
                                        key={heading}
                                        className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600"
                                    >
                                        {heading}
                                    </th>
                                ),
                            )}
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
                                    <td className="max-w-[12rem] truncate px-6 py-4 text-sm text-slate-600">
                                        {content.image || "No image"}
                                    </td>
                                    <td className="max-w-[12rem] truncate px-6 py-4 text-sm text-slate-600">
                                        {content.pdf || "No PDF"}
                                    </td>
                                    <td className="max-w-[12rem] truncate px-6 py-4 text-sm text-slate-600">
                                        {content.video || "No video"}
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
                                                onClick={() => onDelete(content)}
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
                                    No content found for the {currentTab?.label ??
                                        "selected tab"}
                                    .
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
                                    <p className="text-base font-bold text-slate-950">
                                        {content.title}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        {getTabLabel(content)}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        PDF: {content.pdf || "No PDF"}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Video: {content.video || "No video"}
                                    </p>
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
                            No content found for the {currentTab?.label ??
                                "selected tab"}
                            .
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
