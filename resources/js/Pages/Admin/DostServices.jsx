import AdminLayout from "@/Layouts/AdminLayout";
import AdminFixedSectionPage from "@/Components/AdminFixedSectionPage";
import { fixedSectionConfigs } from "./fixedSectionConfigs.jsx";
import DostIxTabSection from "@/Pages/Admin/DostServices/DostIxTabSection";
import ProgramsServicesTabSection from "@/Pages/Admin/DostServices/ProgramsServicesTabSection";
import FacebookPostsTabSection from "@/Pages/Admin/DostServices/FacebookPostsTabSection";

const tabSections = {
    "Dost-ix": DostIxTabSection,
    ProgramsServices: ProgramsServicesTabSection,
    FacebookPosts: FacebookPostsTabSection,
};

import React from 'react'
import { Head } from "@inertiajs/react";

const DostServices = ({ sectionCategory = null, contents = [] }) => {
  return (
    <>
    <Head title="DOST Services" />
    <AdminFixedSectionPage
        sectionCategory={sectionCategory}
        contents={contents}
        config={fixedSectionConfigs.dostServices}
        tabSections={tabSections}
    /></>
  )
}

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
