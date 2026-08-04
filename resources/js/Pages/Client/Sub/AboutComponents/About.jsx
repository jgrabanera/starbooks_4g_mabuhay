import { IoPlay } from "react-icons/io5";

const defaultAboutData = {
    hero: {
        logo: "/assets/images/logos/lgu-mabuhay.png",
        logoAlt: "LGU Mabuhay",
        title: "Municipality of Mabuhay",
        description:
            "A progressive local government unit committed to transparent, efficient, and citizen-centered governance.",
    },
    overview: {
        badge: "Municipality Overview",
        title: "About Mabuhay",
        paragraphs: [
            "The Municipality of Mabuhay is a 4th class municipality in the province of Zamboanga Sibugay, Philippines. Known for its rich cultural heritage and agricultural community, Mabuhay is committed to progressive governance and sustainable local development.",
            "The municipal government continues to foster economic growth, improve public education and health services, and strengthen environmental stewardship through responsive, people-centered administration.",
            "Through digital governance initiatives and coordinated public service delivery, LGU Mabuhay aims to make government services more accessible, transparent, and empowering for every resident.",
        ],
        highlights: [
            "Digital service access and public information support",
            "Community-based programs for agriculture and livelihoods",
            "Health, education, and inclusive municipal coordination",
        ],
    },
    media: {
        badge: "Media Feature",
        title: "Municipal Video Showcase",
        previewImage: "/assets/images/lgu_mabuhay.jpg",
        overlayTitle: "Mabuhay Overview Video",
        overlayDescription:
            "Replace this showcase with the official LGU Mabuhay video presentation, tourism reel, or public service introduction when media is ready.",
        footerLeft: "Video Player Placeholder",
        footerRight: "16:9 Presentation Area",
    },
    priorities: {
        title: "Governance Priorities",
        items: [
            {
                id: "priority-1",
                title: "Good Governance",
                description:
                    "Transparent decision-making and accountable public service systems.",
            },
            {
                id: "priority-2",
                title: "Inclusive Growth",
                description:
                    "Community development through agriculture, education, health, and livelihood support.",
            },
            {
                id: "priority-3",
                title: "Digital Access",
                description:
                    "Improved citizen access to information and municipal programs through digital tools.",
            },
        ],
    },
};

const normalizeTextItems = (items = [], fallbackItems = []) => {
    if (!Array.isArray(items) || items.length === 0) {
        return fallbackItems;
    }

    return items.filter(Boolean);
};

const normalizePriorityItems = (items = []) => {
    if (!Array.isArray(items) || items.length === 0) {
        return defaultAboutData.priorities.items;
    }

    return items.map((item, index) => ({
        id: item?.id || `priority-${index + 1}`,
        title: item?.title || `Priority ${index + 1}`,
        description: item?.description || "",
    }));
};

const About = ({ aboutData = null }) => {
    const hero = {
        ...defaultAboutData.hero,
        ...(aboutData?.hero ?? {}),
    };
    const overview = {
        ...defaultAboutData.overview,
        ...(aboutData?.overview ?? {}),
        paragraphs: normalizeTextItems(
            aboutData?.overview?.paragraphs,
            defaultAboutData.overview.paragraphs,
        ),
        highlights: normalizeTextItems(
            aboutData?.overview?.highlights,
            defaultAboutData.overview.highlights,
        ),
    };
    const media = {
        ...defaultAboutData.media,
        ...(aboutData?.media ?? {}),
    };
    const priorities = {
        ...defaultAboutData.priorities,
        ...(aboutData?.priorities ?? {}),
        items: normalizePriorityItems(aboutData?.priorities?.items),
    };

    return (
        <div className="[@media(orientation:portrait)]:min-h-[82vh] space-y-6">
            <section className="overflow-hidden rounded-[2rem] border border-white/75 bg-white/60 shadow-lg backdrop-blur-md">
                <div className="bg-emerald-800 px-6 py-12 text-center text-white md:px-10 md:py-16">
                    <img
                        src={hero.logo}
                        alt={hero.logoAlt}
                        className="mx-auto mb-6 h-20 w-auto object-contain md:h-24"
                    />
                    <h1 className="text-3xl font-black leading-tight md:text-5xl">
                        {hero.title}
                    </h1>
                    <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-emerald-50 md:text-xl md:leading-9">
                        {hero.description}
                    </p>
                </div>

                <div className="grid gap-8 px-6 py-8 md:px-10 md:py-10">
                    <article className="space-y-6">
                        <div>
                            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
                                {overview.badge}
                            </span>
                            <h2 className="mt-4 text-2xl font-black text-slate-950 md:text-4xl">
                                {overview.title}
                            </h2>
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
                            <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                                {media.badge}
                            </span>
                            <h2 className="mt-3 text-2xl font-black text-slate-950 md:text-3xl">
                                {media.title}
                            </h2>
                        </div>
                    </div>

                    <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-950 shadow-lg">
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
                                <h3 className="mt-5 text-xl font-black md:text-2xl">
                                    {media.overlayTitle}
                                </h3>
                                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-100 md:text-base">
                                    {media.overlayDescription}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between border-t border-white/10 bg-slate-950/95 px-4 py-3 text-xs uppercase tracking-[0.16em] text-slate-300 md:px-5">
                            <span>{media.footerLeft}</span>
                            <span>{media.footerRight}</span>
                        </div>
                    </div>
                </article>

                <aside className="rounded-[1.75rem] border border-white/75 bg-emerald-700 p-6 text-white shadow-lg md:p-8">
                    <h2 className="text-xl font-black uppercase tracking-[0.12em] text-emerald-50">
                        {priorities.title}
                    </h2>
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
