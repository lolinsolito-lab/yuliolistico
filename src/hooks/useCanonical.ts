import { useEffect } from 'react';

export const useCanonical = (url: string) => {
    useEffect(() => {
        let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'canonical';
            document.head.appendChild(link);
        }
        link.href = url;
    }, [url]);
};
