import AdminFixedSectionPage from "@/Components/AdminFixedSectionPage";
import AdminLayout from "@/Layouts/AdminLayout";
import { fixedSectionConfigs } from "./fixedSectionConfigs.jsx";

const Tourism = ({ sectionCategory = null, contents = [] }) => (
    <AdminFixedSectionPage
        sectionCategory={sectionCategory}
        contents={contents}
        config={fixedSectionConfigs.tourism}
    />
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
