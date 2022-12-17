import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import config from '@/config';
import Menu, { MenuItem } from './Menu';
import {
    HomeActiveIcon,
    HomeIcon,
    LiveActiveIcon,
    LiveIcon,
    UserGroupActiveIcon,
    UserGroupIcon,
} from '@/components/Icons';
import SuggestedAccounts from '@/components/SuggestedAccounts';
import * as userService from '@/services';
import { DataUserSuggested } from '@/interfaces';
import { useStore } from '@/hooks';
import { actions } from '@/store';
import { FormattedMessage } from 'react-intl';
import Button from '@/components/Button';
import ModalOverlay from '@/components/ModalOverlay';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
const INIT_PAGE = 1;
const PER_PAGE = 5;

interface Props {
    medium?: string;
};
// Remove React.FC from Typescript template
const Sidebar = ({ medium }: Props): JSX.Element => {
    // STATE
    const [suggestedUsers, setSuggestedUsers] = useState<Array<DataUserSuggested>>([]);
    const [followingUser, setFollowingUser] = useState<Array<DataUserSuggested> | any>([]);
    const [page, setPage] = useState<number>(INIT_PAGE);
    const [page1, setPage1] = useState<number>(INIT_PAGE);
    const [login, setLogin] = useState<boolean>(false);
    const [count, setCount] = useState<number>(suggestedUsers.length + 5);
    const [count1, setCount1] = useState<number>(suggestedUsers.length + 5);
    const [seeMore, setSeeMore] = useState<boolean>(true);
    const [seeMore1, setSeeMore1] = useState<boolean>(true);
    const [demFl, setDemFl] = useState<number>(0);
    const [demFl1, setDemFl1] = useState<number>(0);
    // hooks
    const [state, dispatch] = useStore();


    // Call API
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await userService.getSuggested({ page , perPage: PER_PAGE });
                setSuggestedUsers((prevUsers: Array<DataUserSuggested> | any) => {
                    if(prevUsers.length > 0) {
                        return [...res];
                    } else {
                        return [...prevUsers, ...res];
                    }
                });
            } catch (err: unknown) {
                console.log(err);
            }
        };
        fetchApi();
    }, [page]);

    // useEffect
    useEffect(() => {
        localStorage.getItem('USER_LOG_IN') &&
            userService
                .getFollowing({ page: page1 })
                .then((data1) => {
                    setFollowingUser((prev: Array<DataUserSuggested> | any) => [...prev, ...data1]);
                })
                .catch((error) => console.log(error));
    }, [page1]);
    //handle
    // get more account suggestedUser
    const handleViewChange = () => {
        setPage(page + 1);
        setCount((prev) => prev + 5);
        dispatch(actions.setSuggestAccount(suggestedUsers));

        if (suggestedUsers.length !== count) {
            setSeeMore(false);
        }
        if (!seeMore) {
            setSeeMore(true);
            setSuggestedUsers(state.data.slice(0, 5));
            setDemFl((pre) => pre + 1);
        }
        if (demFl >= 1) {
            setSeeMore(!seeMore);
            setSuggestedUsers(state.data);
        }
    };

    // get more follow

    const handleViewChange1 = () => {
        setPage1(page1 + 1);
        setCount((prev) => prev + 5);

        if (suggestedUsers.length !== count1) {
            setSeeMore1(false);
        }
        if (!seeMore1) {
            setSeeMore1(true);
            setFollowingUser(state.followingAccounts.slice(0, 5));
            setDemFl1((pre) => pre + 1);
        }
        if (demFl >= 1) {
            setSeeMore1(!seeMore1);
            setFollowingUser(state.data);
        }
    };

    // login
    const HandleLogin = () => {
        setLogin(true);
    };

    return (
        <div className={cx('wrapper', medium && 'medium')}>
            {login ? <ModalOverlay setLogin={setLogin} /> : ''}
            <div className={cx('body')}>
                <Menu>
                    <MenuItem
                        title={<FormattedMessage id="sidebar.forYou" />}
                        to={config.routes.home}
                        icon={<HomeIcon />}
                        activeIcon={<HomeActiveIcon />}
                    />
                    <MenuItem
                        title={<FormattedMessage id="sidebar.following" />}
                        to={config.routes.following}
                        icon={<UserGroupIcon />}
                        activeIcon={<UserGroupActiveIcon />}
                    />
                    <MenuItem
                        title="LIVE"
                        to={config.routes.live}
                        icon={<LiveIcon />}
                        activeIcon={<LiveActiveIcon />}
                    />
                </Menu>

                {localStorage.getItem('USER_LOG_IN') ? (
                    ''
                ) : (
                    <div className={cx('sidebar-login')}>
                        <p className={cx('sidebar-login-text')}>{<FormattedMessage id="sidebar.login" />}</p>
                        <Button outline large className={cx('sidebar-login-btn')} onClick={HandleLogin}>
                            {<FormattedMessage id="sidebar.loginBtn" />}
                        </Button>
                    </div>
                )}

                <SuggestedAccounts
                    label={<FormattedMessage id="sidebar.suggestedAccount" />}
                    data={suggestedUsers}
                    seeMore={seeMore}
                    onViewChange={handleViewChange}
                />
                {localStorage.getItem('USER_LOG_IN') ? (
                    <SuggestedAccounts
                        label={<FormattedMessage id="sidebar.followingAccount" />}
                        data={followingUser}
                        seeMore={seeMore1}
                        onViewChange={handleViewChange1}
                    />
                ) : (
                    ''
                )}
            </div>
            <footer className={cx('footer')}>
                <ul className={cx('footer-list')}>
                    <p>
                        <Link to="#">About</Link>
                    </p>
                    <p>
                        <Link to="#">TikTok Browse</Link>
                    </p>
                    <p>
                        <Link to="#">Contact</Link>
                    </p>
                    <p>
                        <Link to="#">Careers</Link>
                    </p>
                </ul>
                <ul className={cx('footer-list')}>
                    <p>
                        <Link to="#">Help</Link>
                    </p>
                    <p>
                        <Link to="#">Safety</Link>
                    </p>
                    <p>
                        <Link to="#">Privacy</Link>
                    </p>
                    <p>
                        <Link to="#">Community</Link>
                    </p>
                </ul>

                <span className={cx('end')}>© 2022 TikTok - Create by Duc</span>
            </footer>
        </div>
    );
};

export default Sidebar;

/* 
//useEffect
    useEffect(() => {
        userService
            .getSuggested({ page: 1, perPage: PER_PAGE })
            .then((data) => {
                setSuggestedUsers((prevUsers: Array<DataUserSuggested> | any) => [...prevUsers, ...data]);
            })
            .catch((error) => console.log(error));
    }, []);
*/
