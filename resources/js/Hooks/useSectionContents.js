import { useEffect, useState } from "react";
import axios from "axios";

export default function useSectionContents(slug) {
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        setLoading(true);
        setError("");

        axios
            .get(route("api.sections.contents", { slug }))
            .then((response) => {
                if (!isMounted) {
                    return;
                }

                setContents(response.data.contents ?? []);
            })
            .catch(() => {
                if (!isMounted) {
                    return;
                }

                setError("Unable to load content right now.");
                setContents([]);
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [slug]);

    return {
        contents,
        loading,
        error,
    };
}
