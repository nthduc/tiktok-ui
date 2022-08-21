import React from 'react';
import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Button from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const cx = classNames.bind(styles);
// Remove React.FC from Typescript template
const AccountPreview = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    className={cx('avatar')}
                    src='https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1660705200&x-signature=fIhNXtBXcApFz5qRDhNuxTmQuVY%3D'
                    alt='avatar'
                />
                <div>
                    <Button className={cx('follow-btn')} primary>Follow</Button>
                </div>
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>nguyenduc</strong>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle as IconProp} />
                </p>
                <p className={cx('name')}>Nguyen Duc</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>8.2M </strong>
                    <span className={cx('label')}>Followers </span>
                    <strong className={cx('value')}>8.2M </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
};

export default AccountPreview;
