import Search from '../Search';
import Tippy from '@tippyjs/react';
import className from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import 'tippy.js/dist/tippy.css'; // optional
import { images } from '@/assets/images';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';
import {
    CoinIcon,
    FeedbackIcon,
    InboxIcon,
    KeyboardIcon,
    LanguageIcon,
    LogoutIcon,
    MessageIcon,
    SettingIcon,
    UploadIcon,
    UserIcon,
} from '@/components/Icons';
import Image from '@/components/Image';
import Menu, { MenuItems } from '@/components/Popper/Menu';
import styles from './Header.module.scss';
import { LanguageData } from '@/data/language';
import { useStore } from '@/hooks';
import ModalOverlay from '@/components/ModalOverlay';
import { BsCloudUpload, BsFillMoonStarsFill, BsSun } from 'react-icons/bs';
import { FormattedMessage } from 'react-intl';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import config from '@/config';

const cx = className.bind(styles);

const MENU_ITEMS = [
    {
        icon: <LanguageIcon />,
        title: 'English',
        children: {
            title: 'Language',
            data: LanguageData,
        },
    },
    {
        icon: <FeedbackIcon />,
        title: <FormattedMessage id="search.feedback" />,
        to: '/feedback',
    },
    {
        icon: <KeyboardIcon />,
        title: <FormattedMessage id="search.keyboard" />,
    },
];

const userMenu = [
    {
        icon: <UserIcon />,
        title: 'View Profile',
        to: '/@hoaa',
    },
    {
        icon: <CoinIcon />,
        title: 'Get coins',
        to: '/coin',
    },
    {
        icon: <SettingIcon />,
        title: 'Settings',
        to: '/settings',
    },
    ...MENU_ITEMS,
    {
        icon: <LogoutIcon />,
        title: 'Log out',
        to: '/logout',
        separate: true,
    },
];

const isLogin = localStorage.getItem('USER_LOG_IN');
const userLogIn = null;
const status = false;
const item = isLogin ? userMenu : MENU_ITEMS;
const rootStyles = document.documentElement.style;
const linkLogo = images.logoWhite;
const linkImage1 = images.logoSmall;
const linkImage2 = images.loadingLogo;

const Header: React.FC = () => {
    // State
    const [currentUser, setCurrentUser] = useState({ userLogIn, status });
    // const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [login, setLogin] = useState<boolean>(false);
    const [isDark, setIsDark] = useState<boolean>(false);

    // hooks
    const [state] = useStore();

    //useEffect
     useEffect(() => {
        if (state.userLogIn?.userLogIn !== null) {
            setCurrentUser(state.userLogIn);
        }
    }, [state]);

    // function openModal() {
    //     setIsOpen(true);
    // }

    // function closeModal() {
    //     setIsOpen(false);
    // }

    //handle
    const handleMenuChange = (menuItem: MenuItems) => {
        switch (menuItem.type) {
            case 'language':
                //handle change language
                break;
            default:
        }
    };
    const HandleLogin = () => {
        setLogin(true);
    };
    // handle Dark mode
    const handleDarkMode = () => {
        if (!isDark) {
            rootStyles.setProperty('--primary', '#2374e1');
            rootStyles.setProperty('--bg-color', '#202122');
            rootStyles.setProperty('--bg-color-hover', '#28282b');
            rootStyles.setProperty('--bg-gray', '#161718');
            rootStyles.setProperty('--bg-color-btn-fl', '#1772e9');
            rootStyles.setProperty('--bg-color-hover-btn-fl', '#63a4f8');
            rootStyles.setProperty('--bg-color-btn-following', 'black');
            rootStyles.setProperty('--bg-color-hover-btn-following', '#8cb2e4');
            rootStyles.setProperty('--bg-modal-color', 'rgba(255, 255, 255, 0.5)');
            rootStyles.setProperty('--bg-color-sidebar', '#222324');

            rootStyles.setProperty('--text-color-black', 'white');
            rootStyles.setProperty('--text-color-white', 'black');
            rootStyles.setProperty('--text-color-gray', '#b8c8d8');

            rootStyles.setProperty('--tick-color', '#20d5ec');
            rootStyles.setProperty('--border-color', '#2f2f30');
            rootStyles.setProperty('--box-shadow', '0px 1px 1px rgb(255 255 255 / 12%)');
            rootStyles.setProperty('--box-shadow-share', '1px 1px 2px 2px rgba(255, 255, 255, 0.2)');
            rootStyles.setProperty('--scroll-color', 'rgba(255, 255, 255, 0.15)');
            rootStyles.setProperty('--transparent-color', 'transparent');
            rootStyles.setProperty('--box-shadow-color', 'blue');
            // rgba(22, 24, 26, 0.5)
            rootStyles.setProperty('--white', 'black');
            rootStyles.setProperty('--black', 'white');
            setIsDark(true);
        } else {
            setIsDark(false);
            window.location.reload();
        }
    };
    return (
        <header className={cx('wrapper')}>
        {login ? <ModalOverlay setLogin={setLogin} /> : ''}
        <div className={cx('inner')}>
        <div className={cx('logo')}>
            <Link to={config.routes.home} className={cx('logo-link')}>
                {!isDark ? (
                    <Image  src={images.logo} alt="TikTok" />
                ) : (
                    // <img className={cx('logo-image')} src={images.logo} alt="TikTok" />
                    <div className={cx('logo-image')}>
                        <Image src={images.logoWhite} alt="TikTok" />
                      
                    </div>
                )}
            </Link>
            </div>
            {/* search */}

            <div className={cx('search')}>
                <Search />
            </div>

            <div className={cx('actions')}>
                <div className={cx('switch', isDark && 'turn-on')} onClick={handleDarkMode}>
                    <p className={cx('switch-inner')}></p>
                    <BsSun />
                    <BsFillMoonStarsFill />
                </div>

                {currentUser?.status ? (
                    <>
                        <Tippy delay={[0, 200]} content={<FormattedMessage id="search.upLoad" />} placement="bottom">
                            <Link to={config.routes.upload}>
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Link>
                        </Tippy>
                        <Tippy
                            delay={[0, 1]}
                            content={<FormattedMessage id="search.message" />}
                           
                        >
                            <Link to={config.routes.messages}>
                                <button className={cx('action-btn')}>
                                    <MessageIcon className={cx('message-icon')} />
                                </button>
                            </Link>
                        </Tippy>
                        <Tippy delay={[0, 2]} content={<FormattedMessage id="search.box" />}>
                            <button className={cx('action-btn')}>
                                <InboxIcon />
                                <span className={cx('badge')}>10</span>
                            </button>
                        </Tippy>
                    </>
                ) : (
                    <>
                         {/* RIGHT HEADER */}
                        {/* <div id="publish btn"></div> */}
                        <Button text onClick={HandleLogin} className={cx('btn-upload')}>
                            <FormattedMessage id="search.upload" />
                        </Button>
                        <Button primary onClick={HandleLogin} className={cx('btn-login')}>
                            <FormattedMessage id="search.login" />
                        </Button>
                    </>
                )}
                <Menu items={item} onChange={handleMenuChange}>
                    {currentUser?.status ? (
                        <Image src={JSON.parse(currentUser?.userLogIn!).avatar} className={cx('user-avatar')} />
                    ) : (
                        // </Link>
                        <button className={cx('more-btn')}>
                            <Image src={images.elipsis}/>
                        </button>
                    )}
                </Menu>
            </div>
        </div>
    </header>
    );
};

export default Header;
