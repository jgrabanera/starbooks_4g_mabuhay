import { Head } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";

const SocialServices = () => {
    return (
        <>
            <Head title="Social Services" />
            <div>SocialServices</div>
        </>
    );
};

export default SocialServices;

SocialServices.layout = (page) => <HomeLayout>{page}</HomeLayout>;
