import { Head } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";
import ClientLayout from "@/Layouts/ClientLayout";

const Resources = () => {
    return (
        <>
            <Head title="Resources" />
            <div>Resources</div>
        </>
    );
};

export default Resources;

Resources.layout = (page) => <ClientLayout>{page}</ClientLayout>;
