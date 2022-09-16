import { PropsWithChildren } from 'react';
import './GlobalStyles.scss';

interface Props extends PropsWithChildren<unknown>{  
    children: JSX.Element;
 }
// Remove React.FC from Typescript template
const GlobalStyles  = ({ children }: Props) : JSX.Element => {
    return children;

};

export default GlobalStyles;
