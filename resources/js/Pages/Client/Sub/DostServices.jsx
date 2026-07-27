import { Head } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";
import ClientLayout from "@/Layouts/ClientLayout";

const DostServices = () => {
    return (
        <>
            <Head title="DOST Services" />
            <div>DostServices</div>
        </>
    );
};

export default DostServices;

DostServices.layout = (page) => <ClientLayout>{page}</ClientLayout>;
