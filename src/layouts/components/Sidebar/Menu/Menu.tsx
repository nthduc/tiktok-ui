import { PropsWithChildren } from 'react'
import { memo } from 'react';
interface Props extends PropsWithChildren<unknown>{ };
// Remove React.FC from Typescript template
const Menu = ({ children } : Props): JSX.Element => {
  return (
   <nav>
    {children}
   </nav>
  )
}

export default memo(Menu);