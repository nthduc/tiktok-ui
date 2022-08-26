import { useState, useEffect } from 'react';

const useDebounce  = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<string>(value);

    useEffect(() => {
        // set timeout 
        const handler = setTimeout(()=> setDebouncedValue(value),delay);
        // clean up
        return () => clearTimeout(handler);
    },[value])
    
    return debouncedValue;
}

export default useDebounce;
