import {
    IoBookOutline,
    IoBriefcaseOutline,
    IoCalendarOutline,
    IoCashOutline,
    IoCheckmarkDoneOutline,
    IoColorPaletteOutline,
    IoConstructOutline,
    IoDocumentTextOutline,
    IoLocationOutline,
    IoLogoFacebook,
    IoMegaphoneOutline,
    IoRibbonOutline,
    IoRocketOutline,
    IoSchoolOutline,
} from "react-icons/io5";

const iconClassName = (isActive) =>
    `h-4 w-4 ${isActive ? "text-white" : "text-emerald-700"}`;

const withIcon = (Icon) => ({ isActive }) => (
    <Icon className={iconClassName(isActive)} />
);

export const fixedSectionConfigs = {
    projects: {
        categorySlug: "lgu-mabuhay-projects",
        pageTitle: "Projects CMS",
        pageDescription:
            "Manage the fixed project tabs used by the public interface. Each record is stored directly under either Completed or On-Going.",
        publicPageLabel: "Projects",
        entityLabel: "Project",
        formIdPrefix: "projects",
        searchKey: "admin-projects-search",
        tabGridClassName: "md:grid-cols-2",
        tabs: [
            {
                id: "completed",
                aliases: ["completed", "completed-1"],
                label: "Completed",
                helper: "Finished project records shown on the public Completed tab.",
                icon: withIcon(IoCheckmarkDoneOutline),
            },
            {
                id: "ongoing",
                aliases: ["ongoing", "on-going-2"],
                label: "On-Going",
                helper: "Active project records shown on the public On-Going tab.",
                icon: withIcon(IoConstructOutline),
            },
        ],
    },
    resources: {
        categorySlug: "resources",
        pageTitle: "Resources CMS",
        pageDescription:
            "Manage the fixed LGU Resources page content that appears in the public resources section.",
        publicPageLabel: "Resources",
        entityLabel: "Resource",
        formIdPrefix: "resources",
        searchKey: "admin-resources-search",
        tabGridClassName: "md:grid-cols-1",
        tabs: [
            {
                id: "resources",
                aliases: ["resources", "memorandum"],
                label: "LGU Resources",
                helper: "Resource items shown on the public LGU Resources page.",
                icon: withIcon(IoBookOutline),
            },
        ],
    },
    socialServices: {
        categorySlug: "social-services",
        pageTitle: "Social Services CMS",
        pageDescription:
            "Manage the fixed social services tabs used by the public page for award postings, budget updates, memorandums, and ordinances.",
        publicPageLabel: "Social Services",
        entityLabel: "Social Service",
        formIdPrefix: "social-services",
        searchKey: "admin-social-services-search",
        tabGridClassName: "md:grid-cols-2 xl:grid-cols-4",
        tabs: [
            {
                id: "award",
                aliases: ["award", "posting-of-awardings-3"],
                label: "Award Posting",
                helper: "Entries shown in the public Award Posting section.",
                icon: withIcon(IoRibbonOutline),
            },
            {
                id: "budget",
                aliases: ["budget", "nta-budget-per-month-4"],
                label: "Budget",
                helper: "Budget-related entries shown on the public page.",
                icon: withIcon(IoCashOutline),
            },
            {
                id: "memorandum",
                aliases: ["memorandum", "memorandum-1"],
                label: "Memorandum",
                helper: "Memorandum entries shown on the public page.",
                icon: withIcon(IoDocumentTextOutline),
            },
            {
                id: "ordinance",
                aliases: ["ordinance", "ordinance-2"],
                label: "Ordinance",
                helper: "Ordinance entries shown on the public page.",
                icon: withIcon(IoBriefcaseOutline),
            },
        ],
    },
    tourism: {
        categorySlug: "tourism",
        pageTitle: "Tourism CMS",
        pageDescription:
            "Manage the fixed tourism tabs for events, festivities, and tourism sites shown on the public page.",
        publicPageLabel: "Tourism",
        entityLabel: "Tourism",
        formIdPrefix: "tourism",
        searchKey: "admin-tourism-search",
        tabGridClassName: "md:grid-cols-3",
        tabs: [
            {
                id: "events",
                aliases: ["events", "events-1"],
                label: "Events",
                helper: "Tourism event entries shown on the public page.",
                icon: withIcon(IoMegaphoneOutline),
            },
            {
                id: "festivities",
                aliases: ["festivities", "festivities-2"],
                label: "Festivities",
                helper: "Festival and celebration entries shown on the public page.",
                icon: withIcon(IoColorPaletteOutline),
            },
            {
                id: "sites",
                aliases: ["sites", "tourism-sites-3"],
                label: "Tourism Sites",
                helper: "Destination and location entries shown on the public page.",
                icon: withIcon(IoLocationOutline),
            },
        ],
    },
    dostServices: {
        categorySlug: "dost-services",
        pageTitle: "DOST Services CMS",
        pageDescription:
            "Manage the fixed DOST service tabs for DOST IX, programs and services, and Facebook posts shown on the public page.",
        publicPageLabel: "DOST Services",
        entityLabel: "DOST Service",
        formIdPrefix: "dost-services",
        searchKey: "admin-dost-services-search",
        tabGridClassName: "md:grid-cols-3",
        tabs: [
            {
                id: "Dost-ix",
                aliases: ["Dost-ix", "dost-ix-1"],
                label: "DOST IX",
                helper: "Entries shown in the public DOST IX section.",
                icon: withIcon(IoSchoolOutline),
            },
            {
                id: "ProgramsServices",
                aliases: ["ProgramsServices", "programs-services-2"],
                label: "Programs & Services",
                helper: "Programs and services entries shown on the public page.",
                icon: withIcon(IoRocketOutline),
            },
            {
                id: "FacebookPosts",
                aliases: ["FacebookPosts", "facebook-posts-3"],
                label: "Facebook Posts",
                helper: "Facebook post entries shown on the public page.",
                icon: withIcon(IoLogoFacebook),
            },
        ],
    },
};
