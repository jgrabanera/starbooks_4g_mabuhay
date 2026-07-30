import { useEffect, useState } from "react";
import axios from "axios";

export default function useSectionContents(endpoint) {
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        setLoading(true);
        setError("");

        axios
            .get(endpoint)
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
    }, [endpoint]);

    return {
        contents,
        loading,
        error,
    };
}
