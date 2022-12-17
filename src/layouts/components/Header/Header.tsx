import Search from '../Search';
import Tippy from '@tippyjs/react';
import ReactDOM from 'react-dom/client';
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
import Modal from '@/components/Modal';
import styles from './Header.module.scss';
import config from '@/config';
import { LanguageData } from '@/data/language';
import { useStore } from '@/hooks';
import ModalOverlay from '@/components/ModalOverlay';
import { BsFillMoonStarsFill, BsSun } from 'react-icons/bs';
import { FormattedMessage } from 'react-intl';

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
        title: 'Feedback and Help',
        to: '/feedback',
    },
    {
        icon: <KeyboardIcon />,
        title: 'Keyboard shortcuts',
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
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
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

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

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
                {/* Logo */}
                <div className={cx('logo')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        {/* <img src={images.logo} alt="TikTok" /> */}
                        {!isDark ? (
                        <Image  src={images.logo} alt="TikTok" />
                    ) : (
                        // <img className={cx('logo-image')} src={images.logo} alt="TikTok" />
                        <div className={cx('logo-image')}>
                            <Image src={images.logoWhite} />
                            {/* <Image src={linkImage2} /> */}
                        </div>
                    )}
                    </Link>
                </div>
                {/* Search */}
                {/* Hover vào sẽ hiện ra text */}
                <Search />

                {/* End Search */}

                {/* Check User */}
                <div className={cx('actions')}>
                <div className={cx('switch', isDark && 'turn-on')} onClick={handleDarkMode}>
                        <p className={cx('switch-inner')}></p>
                        <BsSun />
                        <BsFillMoonStarsFill />
                    </div>
                    {currentUser?.status ? (
                        <>
                            <Tippy delay={[0, 200]} content={<FormattedMessage id="search.upLoad" />} placement="bottom">
                            <Link to="/upload">
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                                </Link>
                            </Tippy>

                            <Tippy delay={[0, 1]} content={<FormattedMessage id="search.message" />}>
                            <Link to="/messages">
                                <button className={cx('action-btn')}>
                                    {/* <img src = {images.message} /> */}
                                    <MessageIcon />
                                </button>
                                </Link>
                            </Tippy>
                            <Tippy delay={[0, 2]} content={<FormattedMessage id="search.box" />}>
                                <button className={cx('action-btn')}>
                                    {/* <img src = {images.inbox} /> */}
                                    <InboxIcon />
                                    <span className={cx('badge')}>10</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            {/* RIGHT HEADER */}
                            {/* <div id="publish btn"></div> */}
                            <Button
                                text
                                onClick={HandleLogin}
                                className={cx('btn-upload')}
                            >
                                <FormattedMessage id="search.upload" />
                            </Button>
                            <Button
                                primary
                                onClick={HandleLogin}
                                // leftIcon={<FontAwesomeIcon icon={faSignIn as IconProp} />}
                                className={cx('btn-login')}
                            >
                                <FormattedMessage id="search.login" />
                            </Button>
                        </>
                    )}
                    {/* Elipsis */}
                    <Menu items={item} onChange={handleMenuChange}>
                        {currentUser?.status ? (
                            <Image
                                className={cx('user-avatar')}
                                src={JSON.parse(currentUser?.userLogIn || '').avatar}
                                alt="Logo Username"
                                fallback="https://avatars.githubusercontent.com/u/73944631?v=4"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <img src={images.elipsis} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
            {/* Modal */}
        </header>
    );
};

export default Header;
