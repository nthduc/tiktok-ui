import { PropsWithChildren, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface Props extends PropsWithChildren<unknown> {
    containerId?: string;
};
// Remove React.FC from Typescript template
const Portal = ({ children, containerId }: Props): JSX.Element => {
    // State
    const [wrapper, setWrapper] = useState<HTMLDivElement | Element>();
    // useEffect
    useEffect(() => {
        let container = document?.querySelector(`#${containerId}`);
        if (!container) {
            container = document?.createElement('div');
            container.id = containerId as string;
            document?.body.appendChild(container);
        }

        setWrapper(container);

        //Clean up  
        return () => {
            if (!containerId) {
                document?.body.removeChild(container as Element);
            }
        };
    }, [containerId]);

    if (!wrapper) return <></>;

    return ReactDOM.createPortal(children, wrapper);
};

export default Portal;
