import AdminFixedSectionPage from "@/Components/AdminFixedSectionPage";
import AdminLayout from "@/Layouts/AdminLayout";
import { fixedSectionConfigs } from "./fixedSectionConfigs.jsx";
import { Head } from "@inertiajs/react";

const Resources = ({ sectionCategory = null, contents = [] }) => (
    <>
    <Head title="Resources" />
    <AdminFixedSectionPage
        sectionCategory={sectionCategory}
        contents={contents}
        config={fixedSectionConfigs.resources}
    />
    </>
);

export default Resources;

Resources.layout = (page) => (
    <AdminLayout
        user={page.props.auth.user}
        title="Resources CMS"
        breadcrumbs={[{ label: "Admin Workspace" }, { label: "Resources CMS" }]}
        children={page}
    />
);
