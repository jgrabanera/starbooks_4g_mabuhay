import { IoPlay } from "react-icons/io5";

const normalizeTextItems = (items = []) =>
    Array.isArray(items) ? items.filter(Boolean) : [];

const normalizePriorityItems = (items = []) => {
    if (!Array.isArray(items) || items.length === 0) {
        return [];
    }

    return items.map((item, index) => ({
        id: item?.id || `priority-${index + 1}`,
        title: item?.title || "",
        description: item?.description || "",
    })).filter((item) => item.title || item.description);
};

const About = ({ aboutData = null }) => {
    const hero = aboutData?.hero ?? {};
    const overview = {
        ...(aboutData?.overview ?? {}),
        paragraphs: normalizeTextItems(aboutData?.overview?.paragraphs),
        highlights: normalizeTextItems(aboutData?.overview?.highlights),
    };
    const media = aboutData?.media ?? {};
    const priorities = {
        ...(aboutData?.priorities ?? {}),
        items: normalizePriorityItems(aboutData?.priorities?.items),
    };
    const hasHeroContent = hero.logo || hero.title || hero.description;
    const hasOverviewContent =
        overview.badge ||
        overview.title ||
        overview.paragraphs.length > 0 ||
        overview.highlights.length > 0;
    const hasMediaContent =
        media.badge ||
        media.title ||
        media.previewImage ||
        media.videoUrl ||
        media.overlayTitle ||
        media.overlayDescription;
    const hasPrioritiesContent =
        priorities.title || priorities.items.length > 0;
    const hasAnyContent =
        hasHeroContent ||
        hasOverviewContent ||
        hasMediaContent ||
        hasPrioritiesContent;

    if (!hasAnyContent) {
        return (
            <div className="rounded-[2rem] border border-dashed border-emerald-200 bg-white/60 px-6 py-12 text-center shadow-lg backdrop-blur-md">
                <p className="text-base font-bold text-emerald-950">
                    No about content available yet.
                </p>
                <p className="mt-2 text-sm text-slate-600">
                    This section will appear once content is added from the CMS.
                </p>
            </div>
        );
    }

    return (
        <div className="[@media(orientation:portrait)]:min-h-[82vh] space-y-6">
            <section className="overflow-hidden rounded-[2rem] border border-white/75 bg-white/60 shadow-lg backdrop-blur-md">
                <div className="bg-emerald-800 px-6 py-12 text-center text-white md:px-10 md:py-16">
                    {hero.logo ? (
                        <img
                            src={hero.logo}
                            alt={hero.logoAlt || "About LGU Mabuhay"}
                            className="mx-auto mb-6 h-20 w-auto object-contain md:h-24"
                        />
                    ) : null}
                    {hero.title ? (
                        <h1 className="text-3xl font-black leading-tight md:text-5xl">
                            {hero.title}
                        </h1>
                    ) : null}
                    {hero.description ? (
                        <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-emerald-50 md:text-xl md:leading-9">
                            {hero.description}
                        </p>
                    ) : null}
                </div>

                <div className="grid gap-8 px-6 py-8 md:px-10 md:py-10">
                    <article className="space-y-6">
                        <div>
                            {/* {overview.badge ? (
                                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
                                    {overview.badge}
                                </span>
                            ) : null} */}
                            {overview.title ? (
                                <h2 className="mt-4 text-2xl text-center font-black text-slate-950 md:text-4xl">
                                    {overview.title}
                                </h2>
                            ) : null}
                        </div>

                        <div className="space-y-5 text-sm leading-8 text-slate-700 md:text-lg">
                            {overview.paragraphs.map((paragraph, index) => (
                                <p key={`overview-paragraph-${index}`}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        <div className="grid gap-3 md:grid-cols-3">
                            {overview.highlights.map((highlight, index) => (
                                <div
                                    key={`highlight-${index}`}
                                    className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4 text-sm font-semibold leading-6 text-emerald-900 shadow-sm"
                                >
                                    {highlight}
                                </div>
                            ))}
                        </div>
                    </article>
                </div>
            </section>

            <section className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
                <article className="rounded-[1.75rem] border border-white/75 bg-white/60 p-6 shadow-lg backdrop-blur-md md:p-8">
                    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                        <div>
                            {media.badge ? (
                                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                                    {media.badge}
                                </span>
                            ) : null}
                            {media.title ? (
                                <h2 className="mt-3 text-2xl font-black text-slate-950 md:text-3xl">
                                    {media.title}
                                </h2>
                            ) : null}
                        </div>
                    </div>

                    <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-950 shadow-lg">
                        {media.videoUrl ? (
                            <div className="bg-slate-950">
                                <video
                                    controls
                                    preload="metadata"
                                    poster={media.previewImage}
                                    src={media.videoUrl}
                                    className="aspect-video w-full bg-black"
                                >
                                    Your browser does not support the video
                                    tag.
                                </video>
                            </div>
                        ) : (
                            <div
                                className="relative aspect-video bg-cover bg-center"
                                style={{
                                    backgroundImage: `url('${media.previewImage}')`,
                                }}
                            >
                                <div className="absolute inset-0 bg-slate-950/45" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/15 backdrop-blur">
                                        <IoPlay className="ml-1 h-8 w-8" />
                                    </div>
                                    {media.overlayTitle ? (
                                        <h3 className="mt-5 text-xl font-black md:text-2xl">
                                            {media.overlayTitle}
                                        </h3>
                                    ) : null}
                                    {media.overlayDescription ? (
                                        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-100 md:text-base">
                                            {media.overlayDescription}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        )}
                    </div>
                </article>

                <aside className="rounded-[1.75rem] border border-white/75 bg-emerald-700 p-6 text-white shadow-lg md:p-8">
                    {priorities.title ? (
                        <h2 className="text-xl font-black uppercase tracking-[0.12em] text-emerald-50">
                            {priorities.title}
                        </h2>
                    ) : null}
                    <div className="mt-5 space-y-4">
                        {priorities.items.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm"
                            >
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-100/90">
                                    {item.title}
                                </p>
                                <p className="mt-2 text-sm leading-6 text-white/90">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </aside>
            </section>
        </div>
    );
};

export default About;
