import React, { useState, forwardRef } from 'react';
import { images } from '@/assets/images';
import classNames from 'classnames';
import styles from './Image.module.scss';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {//React.ComponentPropsWithoutRef<'img'>
    fallback?: string;
}
export type Ref = HTMLImageElement;
// Remove React.FC from Typescript template
const Image = forwardRef<Ref, Props>(({ src, alt, className,fallback: customFallBack=images.noImage, ...props }: Props, ref) => {
    const [fallback, setFallback] = useState<string>('');

    const handleError = () => {
        setFallback(customFallBack);
    };

    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={fallback || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

export default Image;

/* 
In the Props interface, you are extending the React.ImgHTMLAttributes type to provide the component with all the props that a standard img element can accept. This includes the src, alt, and className props that you are using in the component.

You are using the classNames utility to merge the wrapper class defined in the styles module with any additional className prop passed to the component.

You are using the useState hook to manage the fallback state variable, which will hold the URL of the fallback image.

In the handleError function, you are setting the fallback state to the customFallBack prop, which defaults to the images.noImage value.

In the JSX, you are rendering an img element with the src prop set to either the fallback state or the src prop passed to the component. You are also adding an onError event handler that will set the fallback state to the fallback image if the src image fails to load.
@author: NGUYEN THAI DUC
*/