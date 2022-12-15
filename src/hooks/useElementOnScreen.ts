import { useEffect, useMemo, useState } from 'react';

function useElementOnScreen(options:IntersectionObserverInit, targetRef: React.MutableRefObject<HTMLMediaElement>) {
    const [isVisible, setIsVisible] = useState();
    const callbackFunction = (entries: any) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    };
    const optionsMemo = useMemo(() => {
        return options;
    }, [options]);
    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, optionsMemo);
        const currentTarget = targetRef.current;
        if (currentTarget) observer.observe(currentTarget);

        return () => {
            if (currentTarget) observer.unobserve(currentTarget);
        };
    }, [targetRef, optionsMemo]);
    return isVisible;
}
export default useElementOnScreen;