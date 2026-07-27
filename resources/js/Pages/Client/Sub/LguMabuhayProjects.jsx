import { Head } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";
import ClientLayout from "@/Layouts/ClientLayout";

const LguMabuhayProjects = () => {
    return (
        <>
            <Head title="LGU Mabuhay Projects" />
            <div>LguMabuhayProjects</div>
        </>
    );
};

export default LguMabuhayProjects;

LguMabuhayProjects.layout = (page) => <ClientLayout>{page}</ClientLayout>;
