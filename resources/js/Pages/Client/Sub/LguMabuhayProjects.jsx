import { Head } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";

const LguMabuhayProjects = () => {
    return (
        <>
            <Head title="LGU Mabuhay Projects" />
            <div>LguMabuhayProjects</div>
        </>
    );
};

export default LguMabuhayProjects;

LguMabuhayProjects.layout = (page) => <HomeLayout>{page}</HomeLayout>;
