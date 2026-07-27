import { Head } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";
import ClientLayout from "@/Layouts/ClientLayout";

const Tourism = () => {
    return (
        <>
            <Head title="Tourism" />
            <div>Tourism</div>
        </>
    );
};

export default Tourism;

Tourism.layout = (page) => <ClientLayout>{page}</ClientLayout>;
