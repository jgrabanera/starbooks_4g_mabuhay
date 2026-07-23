import { Head } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";

const DostServices = () => {
    return (
        <>
            <Head title="DOST Services" />
            <div>DostServices</div>
        </>
    );
};

export default DostServices;

DostServices.layout = (page) => <HomeLayout>{page}</HomeLayout>;
