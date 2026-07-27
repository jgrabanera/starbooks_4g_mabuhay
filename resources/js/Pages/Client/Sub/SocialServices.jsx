import { Head } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";
import ClientLayout from "@/Layouts/ClientLayout";

const SocialServices = () => {
    return (
        <>
            <Head title="Social Services" />
            <div>SocialServices</div>
        </>
    );
};

export default SocialServices;

SocialServices.layout = (page) => <ClientLayout>{page}</ClientLayout>;
