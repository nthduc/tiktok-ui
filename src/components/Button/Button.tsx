import React, { ForwardRefExoticComponent, PropsWithChildren, RefAttributes } from 'react';
import { Link, LinkProps, To } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

interface Props extends PropsWithChildren<unknown>,React.ButtonHTMLAttributes<HTMLButtonElement> { // React.ComponentPropsWithoutRef<'button'>,
    to?: string | To;
    href?: string;
    primary?: boolean;
    outline?: boolean;
    small?: boolean;
    large?: boolean;
    text?: boolean;
    rounded?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
    leftIcon?: React.ReactElement;
    rightIcon?: React.ReactElement;
}
type CompoType = | React.FC
  | ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>>
  | string
  | ForwardRefExoticComponent<PropsWithChildren<Props> & RefAttributes<HTMLButtonElement>>
  | keyof JSX.IntrinsicElements
  | { to: string };
const Button = ({
    to,
    href,
    primary = false,
    outline = false,
    small = false,
    large = false,
    text = false,
    rounded = false,
    disabled = false,
    onClick,
    children,
    className,
    leftIcon,
    rightIcon,
    ...passProps
}: Props): JSX.Element => {
    let Comp: CompoType = 'button';
    const props: Record<string, unknown> = { onClick, to, href, ...passProps };

    //Remove Event Listener when Button disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    }
    else if (href) {
        props.href = href;
        Comp = 'a';  
    } 

    const classes = cx('wrapper', {
        [className as string]: className,
        primary,
        outline,
        text,
        disabled,
        rounded,
        small,
        large,
    });

    return (
        <Comp className={classes} {...props} to={to!}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
};

export default Button;

/* 
The Button component has several props that are used to customize its appearance and behavior. These props include:
to: a string representing the destination URL for the button when clicked. This prop is used when the button is used as a link.
href: a string representing the destination URL for the button when clicked. This prop is used when the button is used as an anchor tag.
primary: a boolean value that determines whether the button should have a primary color scheme.
outline: a boolean value that determines whether the button should have an outline.
small: a boolean value that determines whether the button should be small in size.
large: a boolean value that determines whether the button should be large in size.
text: a boolean value that determines whether the button should have only text, without any background or border.
rounded: a boolean value that determines whether the button should have rounded edges.
disabled: a boolean value that determines whether the button should be disabled.
onClick: a function that is called when the button is clicked.
className: a string representing the class name(s) to be applied to the button.
leftIcon: a React element that is displayed to the left of the button text.
rightIcon: a React element that is displayed to the right of the button text.
The Button component uses a combination of these props to render a customized button. If the to prop is provided, the button will be rendered as a Link component from the react-router-dom library. If the href prop is provided, the button will be rendered as an anchor tag. Otherwise, the button will be rendered as a standard button element.

The Button component also uses the classNames library to apply dynamic class names based on the values of the props. This allows the button to have different styles depending on its props.

Overall, the Button component is a flexible and customizable button component that can be used in a variety of contexts in a React application.
@author: NGUYEN THAI DUC
*/
