import AdminFixedSectionPage from "@/Components/AdminFixedSectionPage";
import AdminLayout from "@/Layouts/AdminLayout";
import Events from "@/Pages/Admin/Tourism/Events";
import Festivities from "@/Pages/Admin/Tourism/Festivities";
import TourismSites from "@/Pages/Admin/Tourism/TourismSites";
import { fixedSectionConfigs } from "./fixedSectionConfigs.jsx";
import { Head } from "@inertiajs/react";

const tabSections = {
    events: Events,
    festivities: Festivities,
    sites: TourismSites,
};

const Tourism = ({ sectionCategory = null, contents = [] }) => (
    <>
    <Head title="Tourism" />
    <AdminFixedSectionPage
        sectionCategory={sectionCategory}
        contents={contents}
        config={fixedSectionConfigs.tourism}
        tabSections={tabSections}
    />
    </>
);

export default Tourism;

Tourism.layout = (page) => (
    <AdminLayout
        user={page.props.auth.user}
        title="Tourism CMS"
        breadcrumbs={[{ label: "Admin Workspace" }, { label: "Tourism CMS" }]}
        children={page}
    />
);
