import AdminLayout from "@/Layouts/AdminLayout";
import AdminFixedSectionPage from "@/Components/AdminFixedSectionPage";
import Completed from "@/Pages/Admin/Projects/Completed";
import OnGoing from "@/Pages/Admin/Projects/OnGoing";
import { fixedSectionConfigs } from "./fixedSectionConfigs.jsx";
import { Head } from "@inertiajs/react";

const tabSections = {
    completed: Completed,
    ongoing: OnGoing,
};

export default function Projects({ sectionCategory = null, contents = [] }) {
    return (
        <>
        <Head title="Projects" />
        <AdminFixedSectionPage
            sectionCategory={sectionCategory}
            contents={contents}
            config={fixedSectionConfigs.projects}
            tabSections={tabSections}
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
