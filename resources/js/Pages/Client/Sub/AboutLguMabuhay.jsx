import { Head } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";

const AboutLguMabuhay = () => {
    return (
        <>
            <Head title="About LGU Mabuhay" />
            <div>AboutLguMabuhay</div>
        </>
    );
};

export default AboutLguMabuhay;

AboutLguMabuhay.layout = (page) => <HomeLayout>{page}</HomeLayout>;
