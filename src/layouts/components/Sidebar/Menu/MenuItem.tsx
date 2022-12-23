
import { NavLink, To } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Menu.module.scss';
import { memo } from 'react';

const cx = className.bind(styles);

type Props = {
    title?: string | any;
    to: To;
    icon?: JSX.Element;
    activeIcon?: JSX.Element;
}
// Remove React.FC from Typescript template
const MenuItem = ({ title, to , icon , activeIcon}: Props): JSX.Element => {
  return (
    <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={to}>
        <span className={cx('icon')}>{icon}</span>
        <span className={cx('active-icon')}>{activeIcon}</span>
        <span className={cx('title')}>{title}</span>
    </NavLink>
  )
}

export default memo(MenuItem);