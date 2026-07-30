import AdminLayout from "@/Layouts/AdminLayout";
import AdminFixedSectionPage from "@/Components/AdminFixedSectionPage";
import { fixedSectionConfigs } from "./fixedSectionConfigs.jsx";

const DostServices = ({ sectionCategory = null, contents = [] }) => (
    <AdminFixedSectionPage
        sectionCategory={sectionCategory}
        contents={contents}
        config={fixedSectionConfigs.dostServices}
    />
);

export default DostServices;
DostServices.layout = (page) => (
    <AdminLayout
        user={page.props.auth.user}
        title="DOST Services CMS"
        breadcrumbs={[
            { label: "Admin Workspace" },
            { label: "DOST Services CMS" },
        ]}
        children={page}
    />
);
