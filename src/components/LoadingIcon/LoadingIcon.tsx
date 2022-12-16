import Image from '@/components/Image';
import classNames from 'classnames/bind';
import styles from './LoadingIcon.module.scss';
import { memo } from 'react';

const cx = classNames.bind(styles);

const LoadingIcon = () => {
    return (
        <Image
            className={cx('loading')}
            src="https://cdn.dribbble.com/users/2287419/screenshots/14792137/media/024f0a08feba2284082a3b0c5877d7bb.gif"
        />
    );
}

export default memo(LoadingIcon);
