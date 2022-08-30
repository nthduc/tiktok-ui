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
import { DataUserSuggested } from '@/types';

const cx = classNames.bind(styles);
const PER_PAGE = 5;

const Sidebar: React.FC = () => {
    // STATE
    const [suggestedUsers, setSuggestedUsers] = useState<Array<DataUserSuggested> | null>([]);

    // Call API
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await userService.getSuggested({ page: 1, perPage: PER_PAGE });
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
    }, []);
    //handle

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>

            <SuggestedAccounts label="Suggested accounts" data={suggestedUsers} />
            {/* <SuggestedAccounts label='Followed accounts'/> */}
        </aside>
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
