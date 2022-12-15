import classNames from 'classnames/bind';
import { BsPlayCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Image from '@/components/Image';
import styles from './VideoItem.module.scss';

const cx = classNames.bind(styles);

interface Props {
    avatar: any;
    nickName?: string;
    id: number;
    name: string;
    background: string;
    content: string;
    viewers: string | number;

}
    // Remove React.FC from Typescript template
const LiveVideoItem = ({ avatar, nickName, id, name, background, content, viewers }: Props): JSX.Element => {
    return (
        <div className={cx('wrapper')}>
            <div
                className={cx('video-image')}
                style={{
                    backgroundImage: 'url(' + background + ')',
                }}
            >
                <div className={cx('footer')}>
                    <div className={cx('audience')}>
                        <p className={cx('audience-count')}>{viewers}</p>
                        <p className={cx('audience-text')}>viewers</p>
                    </div>
                    <div className={cx('live-label')}>LIVE</div>
                </div>
                <div className={cx('play-hover')}>
                    <BsPlayCircle className={cx('icon-play')} />
                </div>
            </div>

            <div className={cx('author-video')}>
                <Link className={cx('image-body')} to={{ pathname: '/@' + nickName, search: 'id=' + id }}>
                    <Image src={avatar} className={cx('image')} />
                </Link>
                <div className={cx('body')}>
                    <p className={cx('content')}>{content}</p>
                    <p className={cx('name')}>{name}</p>
                </div>
            </div>
        </div>
    );
};

export default LiveVideoItem;
