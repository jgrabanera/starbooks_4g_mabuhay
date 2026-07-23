import { Head } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";

const Tourism = () => {
    return (
        <>
            <Head title="Tourism" />
            <div>Tourism</div>
        </>
    );
};

export default Tourism;

Tourism.layout = (page) => <HomeLayout>{page}</HomeLayout>;
