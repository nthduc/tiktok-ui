import classNames from 'classnames/bind';
import { useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import Image from '@/components/Image';
import styles from './FollowAccount.module.scss';
import * as userService from '@/services/userService';
import ModalOverlay from '@/components/ModalOverlay';

const cx = classNames.bind(styles);

interface Props {
  avatar: unknown | any;
  id?: number;
  name?: string;
  check?: boolean;
  is_followed?: boolean;
  nickName: string;
  followers: number;
  like?: number;
}

// Remove React.FC from Typescript template
const FollowAccount = ({ avatar, id, name, check, is_followed, nickName, followers, like }: Props): JSX.Element => {
    const [follow, setFollow] = useState<boolean>(is_followed ?? false);
    const [login, setLogin] = useState<boolean>(false);

    // handleClick
    const handleClick = () => {
        if (!follow) {
            userService.postFollow(id ?? 0);
        } else {
            userService.postUnFollow(id ?? 0);
        }

        setFollow(!follow);
    };
    return (
      <div className={cx('account')}>
            {login ? <ModalOverlay setLogin={setLogin} /> : ''}

            <div className={cx('account-header')}>
                <Link to={{ pathname: '/@' + nickName, search: 'id=' + id }}>
                    <Image className={cx('avatar', 'large')} src={avatar} />
                </Link>

                {localStorage.getItem('USER_LOG_IN') ? (
                    follow ? (
                        <Button outline className={cx('btn-account-follow', 'btn-small-account')} onClick={handleClick}>
                            Following
                        </Button>
                    ) : (
                        <Button outline className={cx('btn-small-account')} onClick={handleClick}>
                            Follow
                        </Button>
                    )
                ) : (
                    <Button outline className={cx('btn-small-account')} onClick={() => setLogin(true)}>
                        Follow
                    </Button>
                )}
            </div>
            <div className={cx('info-follow')}>
                <Link to={{ pathname: '/@' + nickName, search: 'id=' + id }}>
                    <h4 className={cx('nick-name', 'bold')}>
                        {nickName} {check && <AiFillCheckCircle className={cx('icon')} />}
                    </h4>
                </Link>
                <Link to={{ pathname: '/@' + nickName, search: 'id=' + id }}>
                    <p className={cx('name', 'medium')}>{name}</p>
                </Link>
                <div className={cx('vote-body')}>
                    <strong className={cx('vote')}>{followers}</strong> Followers
                    <strong className={cx('vote')}>{like}</strong> Likes
                </div>
            </div>
            <div className={cx('bio')}>
                <p className={cx('bio-text')}>Contact Instagram - Facebook 📩 {nickName}@gmail.com</p>
            </div>
        </div>
    )
};

export default FollowAccount;
