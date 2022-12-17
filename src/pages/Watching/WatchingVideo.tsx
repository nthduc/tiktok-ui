import classNames from 'classnames/bind';
import styles from './Watching.module.scss';

const cx = classNames.bind(styles);
interface Props {
  linkVideo: string;
  videoRef: React.MutableRefObject<HTMLVideoElement>;
}

const WatchingVideo = ({ linkVideo, videoRef }:Props): JSX.Element => {
  return (
    <div>
        <video className={cx('video')} ref={videoRef} controls>
            <source src={linkVideo} type="video/mp4" />
        </video>
    </div>
);
}

export default WatchingVideo