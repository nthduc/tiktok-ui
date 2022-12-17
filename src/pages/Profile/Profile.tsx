import classNames from 'classnames/bind';
import { useState, useEffect, Key } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BsFlag, BsLockFill } from 'react-icons/bs';
import { FaShare } from 'react-icons/fa';
import { FiEdit, FiMoreHorizontal } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import Button from '@/components/Button';
import Image from '@/components/Image';
import styles from './Profile.module.scss';
import ProfileVideo from './ProfileVideo';

import BoxShare from '@/components/BoxShare';
import { BiBlock, BiUserCheck } from 'react-icons/bi';

import * as anUserService from '@/services/userService';
import LoadingIcon from '@/components/LoadingIcon/LoadingIcon';
import ModalEdit from '@/components/ModalEdit/ModalEdit';
import * as userService from '@/services/userService';

import { actions } from '@/store';
import { useStore } from '@/hooks';
import ModalOverlay from '@/components/ModalOverlay';
import { FormattedMessage } from 'react-intl';
import { DataUserSuggested } from '@/interfaces';

const cx = classNames.bind(styles);
const IS_LOGIN = localStorage.getItem('USER_LOG_IN') === null ? false : true;

interface PropsVideo {
    user: { nickname: string };
    file_url: string;
    views_count: number;
    id: number;
    description: string;
}
// Remove React.FC from Typescript template
const Profile = () => {
    // useState
    const [active, setActive] = useState<boolean>(true);
    const [anUser, setAnUser] = useState<Array<DataUserSuggested> | any>([]);
    const [isUser, setIsUser] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [isFollow, setIsFollow] = useState<boolean>(false);
    const [login, setLogin] = useState<boolean>(false);
    const [change, setChange] = useState<string>('');
    const [modalEdit, setModalEdit] = useState<boolean>(false);
    // set current user info to store
    const [state, dispatch] = useStore();

    const match = useLocation();
    const nicknameValue = match.pathname;

    const handleActive = () => {
        setActive(!active);
    };

    // getData
    useEffect(() => {
        anUserService
            .getAnUser(nicknameValue)
            .then((data) => {
                // console.log(data)
                setAnUser(data);
                setLoading(false);
                if (JSON.parse(localStorage.getItem('USER_LOG_IN') || '{}')?.nickname === data.nickname) {
                    setIsUser(true);
                }
                if (data.is_followed) {
                    setIsFollow(true);
                } else {
                    setIsFollow(false);
                }
            })
            .catch((error) => console.log(error));
    }, [nicknameValue, change]);

    const handleModalEdit = () => {
        setModalEdit(true);
    };
    // un follow
    const handleUnFollow = () => {
        userService.postUnFollow(anUser.id);
        setIsFollow(false);
    };
    const handleFollow = () => {
        userService.postFollow(anUser.id);
        setIsFollow(true);
    };
    const handleFollowNotLogin = () => {
        setLogin(true);
    };
    return loading ? (
        <div className={cx('loading')}>
            <LoadingIcon />
        </div>
    ) : (
        <div className={cx('wrapper')}>
            {modalEdit && (
                <ModalEdit
                    setModalEdit={setModalEdit}
                    avatar={anUser.avatar}
                    nickname={anUser.nickname}
                    firstName1={anUser.first_name}
                    lastName1={anUser.last_name}
                    bio={anUser.bio}
                    setChange={setChange}
                />
            )}
            {login ? <ModalOverlay setLogin={setLogin} /> : ''}
            <div className={cx('info')}>
                <div>
                    <div className={cx('header-info')}>
                        <Image src={anUser.avatar ?? ""} className={cx('avatar')} />
                        <div className={cx('name-info')}>
                            <h4 className={cx('nickname')}>
                                {anUser.nickname} {anUser.tick && <AiFillCheckCircle className={cx('icon-tick')} />}
                            </h4>
                            <p className={cx('name')}>{`${anUser.first_name} ${anUser.last_name}`}</p>

                            {IS_LOGIN ? (
                                isUser ? (
                                    <Button primary className={cx('btn', 'edit')} onClick={handleModalEdit}>
                                        <div>
                                            <FiEdit className={cx('edit-icon')} />
                                            <FormattedMessage id="profile.edit" />
                                        </div>
                                    </Button>
                                ) : isFollow ? (
                                    <div className={cx('message-body')}>
                                        <Button
                                            to="/messages"
                                            outline
                                            large
                                            onClick={() => dispatch(actions.setCurrentUserInfo(anUser))}
                                            className={cx('message-btn')}
                                        >
                                            <FormattedMessage id="profile.message" />
                                        </Button>

                                        <div className={cx('message-icon')} onClick={handleUnFollow}>
                                            <BiUserCheck />
                                            <div className={cx('tippy-unfollow')}>
                                                <FormattedMessage id="profile.unFollow" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Button primary className={cx('btn')} onClick={handleFollow}>
                                        <FormattedMessage id="profile.follow" />
                                    </Button>
                                )
                            ) : (
                                <Button primary className={cx('btn')} onClick={handleFollowNotLogin}>
                                    <FormattedMessage id="profile.follow" />
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className={cx('like-count')}>
                        <p>
                            {anUser.followings_count}{' '}
                            <span className={cx('like-text')}>
                                <FormattedMessage id="profile.following" />
                            </span>
                        </p>
                        <p>
                            {anUser.followers_count}
                            <span className={cx('like-text')}>Followers</span>
                        </p>
                        <p>
                            {anUser.likes_count}{' '}
                            <span className={cx('like-text')}>
                                <FormattedMessage id="profile.like" />
                            </span>
                        </p>
                    </div>
                    <div className={cx('bio')}>{anUser.bio}</div>
                    <Link to="#" className={cx('link')}>
                        {anUser.website_url}
                    </Link>
                </div>
                <div className={cx('actions')}>
                    <div className={cx('actions-icon')}>
                        <FaShare />
                        <div className={cx('actions-box-share')}>
                            <BoxShare />
                        </div>
                    </div>
                    <div className={cx('actions-icon')}>
                        <FiMoreHorizontal />
                        <div className={cx('report')}>
                            <div>
                                <BsFlag className={cx('report-icon')} /> <FormattedMessage id="profile.report" />
                            </div>
                            <div>
                                <BiBlock className={cx('report-icon')} /> <FormattedMessage id="profile.block" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('navbar')}>
                    <div className={cx('navbar-item', active && 'active')} onClick={!active ? handleActive : undefined}>
                        Videos
                    </div>
                    <div className={cx('navbar-item', !active && 'active')} onClick={active ? handleActive : undefined}>
                        <BsLockFill className={cx('icon-lock')} /> <FormattedMessage id="profile.liked" />
                    </div>
                </div>
                {active ? (
                    <div className={cx('video-body')}>
                        {anUser?.videos?.map((video: PropsVideo, index: Key | null | undefined) => (
                            <ProfileVideo key={index} video={video} />
                        ))}
                    </div>
                ) : (
                    <div className={cx('linked')}>
                        <BsLockFill className={cx('icon-lock-linked')} />
                        <p className={cx('linked-text-big')}>This user's liked videos are private</p>
                        <p className={cx('linked-text-small')}>
                            Videos liked by {anUser.nickname} are currently hidden
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;

/**
 * @author - Nguyen Thai Duc
 * @course -  F8
 */
