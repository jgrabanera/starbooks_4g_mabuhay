import AdminFixedSectionPage from "@/Components/AdminFixedSectionPage";
import AdminLayout from "@/Layouts/AdminLayout";
import { fixedSectionConfigs } from "./fixedSectionConfigs.jsx";

const SocialServices = ({ sectionCategory = null, contents = [] }) => (
    <AdminFixedSectionPage
        sectionCategory={sectionCategory}
        contents={contents}
        config={fixedSectionConfigs.socialServices}
    />
);

export default SocialServices;

SocialServices.layout = (page) => (
    <AdminLayout
        user={page.props.auth.user}
        title="Social Services CMS"
        breadcrumbs={[
            { label: "Admin Workspace" },
            { label: "Social Services CMS" },
        ]}
        children={page}
    />
);
