import AdminLayout from "@/Layouts/AdminLayout";
import AdminFixedSectionPage from "@/Components/AdminFixedSectionPage";
import { fixedSectionConfigs } from "./fixedSectionConfigs.jsx";
import { Head } from "@inertiajs/react";

export default function Projects({ sectionCategory = null, contents = [] }) {
    return (
        <>
        <Head title="Projects" />
        <AdminFixedSectionPage
            sectionCategory={sectionCategory}
            contents={contents}
            config={fixedSectionConfigs.projects}
        />
        </>
    );
}

Projects.layout = (page) => (
    <AdminLayout
        user={page.props.auth.user}
        title="Projects CMS"
        breadcrumbs={[{ label: "Admin Workspace" }, { label: "Projects CMS" }]}
        children={page}
    />
);
