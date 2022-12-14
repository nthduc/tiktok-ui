import React from 'react';
import classNames from 'classnames/bind';
import FollowingItem from './FollowingItem';
import styles from './FollowingVideo.module.scss';
import { DataUserSuggested } from '@/interfaces';
const cx = classNames.bind(styles);

interface Props {
    accountList?: Array<DataUserSuggested>;
    lastVideoRef?: React.RefObject<HTMLDivElement>;
};

// Remove React.FC from Typescript template
const FollowingVideo = ({ accountList, lastVideoRef }: Props): JSX.Element => {
    return (
        <div className={cx('wrapper-following')}>
            {accountList?.map((account, index) => {
                if (accountList?.length === index + 1) {
                    return (
                        <div ref={lastVideoRef} key={index}>
                            <FollowingItem key={account.id} data={account} />
                        </div>
                    );
                } else {
                    return <FollowingItem key={index} data={account} />
                }
            })}
        </div>
    );
};

export default FollowingVideo;
