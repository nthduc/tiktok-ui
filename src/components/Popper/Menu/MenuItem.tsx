import React from 'react';

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Button from '@/components/Button';
import { useStore } from '@/hooks';
import { actions } from '@/store';


const cx = classNames.bind(styles);


type Props = {
    data: {
        icon: React.ReactElement;
        title: string;
        type?:string;
        to?: string;
        separate?: boolean;
    },
    onClick: any;
}
// Remove React.FC from Typescript template
const MenuItem  = ({ data, onClick }: Props): JSX.Element => {
    const [state, dispatch] = useStore();
    const classes = cx('menu-item',{
        separate: data.separate,
    });
    let link = data.to;
    let handleClick = onClick;
    if (data.title === 'View profile') {
        // @ts-ignore
        link = '/@' + JSON.parse(localStorage.getItem('USER_LOG_IN')).nickname;
    }

    if (data.title === 'Log out') {
        link = '/';
        handleClick = () => {
            localStorage.clear();
            window.location.reload();
        };
    }

     if (data.type === 'language') {
        handleClick = (data: { code: any; }) => {
            dispatch(actions.setLanguage(data.code));
            localStorage.setItem('LANGUAGE', JSON.stringify(data.code));
        };
    }

  return (
   <Button 
   leftIcon={data.icon}
   to={data.to}
   className = {cx(classes)}
   onClick = {() => handleClick(data)}


   >
       {data.title}
       </Button>
  )
}

export default MenuItem;