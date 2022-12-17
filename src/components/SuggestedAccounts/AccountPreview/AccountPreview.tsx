import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Button from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { DataUserSuggested } from '@/interfaces';
import Image from '@/components/Image';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const cx = classNames.bind(styles);

type Props = {
    data?: DataUserSuggested | null;
    follow?: boolean;
    handleClick: () => void;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
};
// Remove React.FC from Typescript template
const AccountPreview = ({ data, handleClick, follow, setLogin }: Props): JSX.Element => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link to={'/@' + data?.nickname}>
                    <Image className={cx('avatar')} src={data?.avatar} alt={data?.nickname} />
                </Link>
                <div>
                    {/* <Button className={cx('follow-btn')} primary>
                        Follow
                    </Button> */}
                    {localStorage.getItem('USER_LOG_IN') ? (
                        !follow ? (
                            <Button
                                outline
                                className={cx('btn-account-follow', 'btn-small-account')}
                                onClick={handleClick}
                            >
                                <FormattedMessage id="sidebar.followingBtn" />
                            </Button>
                        ) : (
                            <Button primary className={cx('btn-small-account')} onClick={handleClick}>
                                Follow
                            </Button>
                        )
                    ) : (
                        <Button primary className={cx('btn-small-account')} onClick={() => setLogin(true)}>
                            Follow
                        </Button>
                    )}
                </div>
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <Link
                        to={{
                            pathname: '/@' + data?.nickname,
                        }}
                    >
                        <strong>{data?.nickname}</strong>
                        {data?.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle as IconProp} />}
                    </Link>
                </p>
                <Link to={'/@' + data?.nickname}>
                    <p className={cx('name')}>{`${data?.first_name} ${data?.last_name}`}</p>
                </Link>
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
