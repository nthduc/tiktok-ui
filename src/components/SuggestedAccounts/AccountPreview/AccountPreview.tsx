import React from 'react';
import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Button from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { DataUserSuggested } from '@/types';

const cx = classNames.bind(styles);

type Props = {
    data?: DataUserSuggested | null;
};
// Remove React.FC from Typescript template
const AccountPreview = ({ data }: Props): JSX.Element => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img 
                className={cx('avatar')} 
                src={data?.avatar} 
                alt={data?.nickname} 
                />
                <div>
                    <Button className={cx('follow-btn')} primary>
                        Follow
                    </Button>
                </div>
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>{data?.nickname}</strong>
                    {data?.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle as IconProp} />}
                </p>
                <p className={cx('name')}>{`${data?.first_name} ${data?.last_name}`}</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{data?.followers_count} </strong>
                    <span className={cx('label')}>Followers </span>
                    <strong className={cx('value')}>{data?.likes_count} </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
};

export default AccountPreview;
