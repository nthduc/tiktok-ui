import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import { DataUserSuggested } from '@/interfaces';

const cx = classNames.bind(styles);

type Props = {
    label?: string;
    data?: DataUserSuggested[] | null;
};
// Remove React.FC from Typescript template
const SuggestedAccounts = ({ label, data = [] }: Props): JSX.Element => {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {data?.map((account) => (
                <AccountItem key={account.id} data={account}/>
            ))}

            <p className={cx('more-btn')}>See all</p>
        </div>
    );
};

export default SuggestedAccounts;
