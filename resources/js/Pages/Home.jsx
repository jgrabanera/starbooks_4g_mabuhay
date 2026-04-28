import { Link, Head } from "@inertiajs/react";

export default function Welcome() {
    return (
        <>
            <Head title="Home" />
            <div>
                <h1>Welcome to {import.meta.env.APP_NAME}!</h1>
            </div>
        </>
    );
}
