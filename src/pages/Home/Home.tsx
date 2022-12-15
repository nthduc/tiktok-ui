import Video from '@/components/Video';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import { BiSkipNextCircle } from 'react-icons/bi';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import * as videoListService from '@/services/getVideoList';
import LoadingIcon from '@/assets/LoadingIcon';

const cx = classNames.bind(styles);

const Home: React.FC = () => {
    const bodyRef = useRef() as React.MutableRefObject<Element> as any;

    const [active, setActive] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [more, setMore] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    window.onscroll = () => {
        if (window.scrollY > 150) {
            setActive(true);
        } else setActive(false);
    };

    const backToTop = () => {
        bodyRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    };

    // get data
    const [videoList, setVideoList] = useState<any>([]);
    useEffect(() => {
        videoListService
            .getVideoList({ type: 'for-you', page })
            .then((data) => {
                setVideoList((prev: any) => [...prev, ...data]);
                setMore(data.length > 0);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [page]);

    // load more video
    const observer = useRef() as React.MutableRefObject<IntersectionObserver>;
    const lastVideoRef = useCallback(
        (node: Element) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },

        [more],
    ) as any;
    return loading ? (
        <div className={cx('loading')}>
            <LoadingIcon />
        </div>
    ) : (
        <div className={cx('body')} id="content" ref={bodyRef}>
            {videoList.map((account: any, index : number) => {
                if (videoList.length === index + 1) {
                    return (
                        <div ref={lastVideoRef} key={account.id}>
                            <Video data={account} />
                        </div>
                    );
                } else {
                    return <Video key={Math.random()} data={account} />;
                }
            })}
            <BiSkipNextCircle className={cx('back-to-top', active && 'active')} onClick={backToTop} />
        </div>
    );
};

export default memo(Home);

/**
 * @author - Nguyen Thai Duc
 * @course -  F8
 */
