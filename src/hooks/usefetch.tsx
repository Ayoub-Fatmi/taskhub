import { useState, useEffect, useCallback } from "react";

function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const json = await response.json();
            setData(json);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [url]);


    useEffect(() => {
        setTimeout(() => {
            fetchData();
        }, 2000);
    }, [fetchData]);

    return { data, isLoading, error, refetch: fetchData };
}

export default useFetch;
