import AdminFixedSectionPage from "@/Components/AdminFixedSectionPage";
import AdminLayout from "@/Layouts/AdminLayout";
import { fixedSectionConfigs } from "./fixedSectionConfigs.jsx";
import { Head } from "@inertiajs/react";

const SocialServices = ({ sectionCategory = null, contents = [] }) => {
  return (
    <>
    <Head title="Social Services" />
     <AdminFixedSectionPage
        sectionCategory={sectionCategory}
        contents={contents}
        config={fixedSectionConfigs.socialServices}
    />
    </>
  )
}



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
