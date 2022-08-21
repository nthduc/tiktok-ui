import React from 'react';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '@/components/Popper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);
// Remove React.FC from Typescript template
const AccountItem = () => {

    const renderPreview = (props: Object) => {
        // Show Modal
        return (
            <div tabIndex={-1} {...props}>
                <PopperWrapper>
                    <AccountPreview />
                </PopperWrapper>
            </div>
        )
    }

    return (
    /* Using a wrapper <div> or <span> tag around the reference element solves 
    this by creating a new parentNode context*/
        <div>
            <Tippy
                interactive
                offset={[-20,0]}
                delay={[800,0]}
                render={renderPreview}
                placement='bottom'
            >
                <div className={cx('account-item')}>
                    <img
                        className={cx('avatar')}
                        src='https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1660705200&x-signature=fIhNXtBXcApFz5qRDhNuxTmQuVY%3D'                        alt='avatar'
                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>nguyenduc</strong>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle as IconProp} />
                        </p>
                        <p className={cx('name')}>Nguyen Duc</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
};

export default AccountItem;
