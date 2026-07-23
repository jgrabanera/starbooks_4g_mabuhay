import { Head } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";

const Resources = () => {
    return (
        <>
            <Head title="Resources" />
            <div>Resources</div>
        </>
    );
};

export default Resources;

Resources.layout = (page) => <HomeLayout>{page}</HomeLayout>;
