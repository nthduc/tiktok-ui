import React from 'react';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

type Props = {
    label?: string;
}
// Remove React.FC from Typescript template
const SuggestedAccounts = ({ label }: Props): JSX.Element => {
  return (
    <div className={cx('wrapper')}>
        <p className={cx('label')}>{label}</p>

        <AccountItem />
        <AccountItem />
        <AccountItem />

        <p className={cx('more-btn')}>See all</p>
    </div>
  )
}

export default SuggestedAccounts