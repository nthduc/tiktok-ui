import classNames from 'classnames/bind';
import FollowingVideo from '@/components/FollowingVideo';
import styles from './Following.module.scss';

import * as userService from '@/services/userService';
import { useCallback, useEffect, useRef, useState } from 'react';
import LoadingIcon from '@/assets/LoadingIcon';
import { DataUserSuggested } from '@/interfaces';

const INIT_PAGE = 1;
const PER_PAGE = 5;

const cx = classNames.bind(styles);

const Following: React.FC = (): JSX.Element => {
    // useState
    const [suggestedUser, setSuggestedUser] = useState<Array<DataUserSuggested>>([]);
    const [page, setPage] = useState<number>(INIT_PAGE);
    const [more, setMore] = useState<boolean>(false);

    const observer = useRef() as React.MutableRefObject<IntersectionObserver>;
    const [loading, setLoading] = useState<boolean>(true);

    // useEffect
    useEffect(() => {
        userService
            .getSuggested({ page, perPage: PER_PAGE })
            .then((data) => {
                setSuggestedUser((prev) => [...prev, ...data]);
                setMore(data.length > 0);
                setLoading(false);
            })
            .catch((error) => console.log(error));
        // }
    }, [page]);
    // console.log(followUser);

    // useCallBack
    const lastRef = useCallback((node: Element) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage((prevPage) => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, []);

    return loading ? (
        <div className={cx('loading')}>
            <LoadingIcon />
        </div>
    ) : (
        <FollowingVideo
            accountList={suggestedUser}
            // @ts-ignore
            lastVideoRef={lastRef}
        />
    );
};

export default Following;

/**
 * @author - Nguyen Thai Duc
 * @course -  F8
 */
