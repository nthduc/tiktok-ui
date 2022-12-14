import classNames from 'classnames/bind';
import { AiFillCheckCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import styles from './FollowingVideo.module.scss';
import { DataUserSuggested } from '@/interfaces';

const cx = classNames.bind(styles);

interface Props {
    data?: DataUserSuggested;
};

// Remove React.FC from Typescript template
const FollowingItem = ({ data } : Props) : JSX.Element => {
    const mouseOver = (e: React.SyntheticEvent<EventTarget>) => {
        (e.target as HTMLMediaElement).play();
        (e.target as HTMLMediaElement).volume = 0;
    };

    const mouseOut = (e: React.SyntheticEvent<EventTarget>) => {
        (e.target as HTMLMediaElement).pause();
    };

    return (
        <Link
            to={{
                pathname: '/@' + data?.nickname,
            }}
            className={cx('following-video-item')}
        >
            <div className={cx('item')}>
                <div className={cx('body-video')}>
                    <video className={cx('following-video')} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        <source src={data?.popular_video.file_url} />
                    </video>
                </div>

                <div className={cx('following-info')}>
                    <div className={cx('info')}>
                        <p>{`${data?.first_name} ${data?.last_name}`}</p>
                        <p className={cx('nickname')}>
                            {data?.nickname} {data?.tick && <AiFillCheckCircle className={cx('icon')} />}
                        </p>
                    </div>
                    <Button primary className={cx('following-btn')}>
                        Following
                    </Button>
                </div>
            </div>
        </Link>
    );
};

export default FollowingItem;
