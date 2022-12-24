import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import { DataUserSuggested } from '@/interfaces';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

const cx = classNames.bind(styles);

type Props = {
    label?: string | any;
    data?: DataUserSuggested[] | null;
    seeMore?: boolean;
    onViewChange?: () => void;
};
// Remove React.FC from Typescript template
const SuggestedAccounts = ({ label, data = [], onViewChange, seeMore }: Props): JSX.Element => {
    const [isFollowBtn, setIsFollowBtn] = useState<boolean>(false);

    useEffect(() => {
        if (label === 'Following accounts') {
            setIsFollowBtn(true);
        }
    }, [label]);
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {data?.map((account) => (
                <AccountItem key={account.id} data={account} isFollowBtn={isFollowBtn} />
            ))}

            <p className={cx('more-btn')} onClick={onViewChange}>
                {seeMore ? <FormattedMessage id="sidebar.seeMore" /> : <FormattedMessage id="sidebar.seeLess" />}
            </p>
        </div>
    );
};

export default SuggestedAccounts;
