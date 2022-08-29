import React, { PropsWithChildren } from 'react';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

interface Props extends PropsWithChildren<unknown>{
    isOpen?: boolean;
}

const Modal = ({ isOpen = false, children }: Props): JSX.Element => {

    if(!isOpen) {
        return <></>;
    }
  return (
    <div className={cx('wrapper')}>
        <div className={cx('overlay')}>
            <div className={cx('body')}>{children}</div>
        </div>
    </div>
  )
}

export default Modal;