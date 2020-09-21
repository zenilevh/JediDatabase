import { useState, useEffect } from 'react';

const useFetch = (url, page) => {
    const [status, setStatus] = useState('Loading...');
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!url) return;
        const fetchData = async() => {
            setStatus('Now Loading...');
            let cache = JSON.parse(localStorage.getItem(page))
            if (cache) {
                setData(cache);
            } else {
                const response = await fetch(url);
                const data = await response.json();
                setData(data);
                localStorage.setItem(page, JSON.stringify(data.results))
            }
        };
        fetchData();
    }, [url, page]);

    return { status, data };
};

export default useFetch;