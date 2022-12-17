import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { AiFillSound } from 'react-icons/ai';
import { BsVolumeMuteFill } from 'react-icons/bs';
import styles from './Volume.module.scss';

const cx = classNames.bind(styles);
// @ts-ignore
const initVolume = localStorage.getItem('VOLUME' || '0') / 100;

interface Props {
    videoRef: React.MutableRefObject<HTMLMediaElement>;
};

// Remove React.FC from Typescript template
const Volume = ( { videoRef }: Props): JSX.Element => {

    const [volume, setVolume] = useState<number>(initVolume);

    const progressRef = useRef() as (React.MutableRefObject<HTMLInputElement>) as any;
    const [inputValue, setInputValue] = useState<string | number>(localStorage.getItem('VOLUME') ?? 50);
    const handleInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        progressRef.current.value = e.target.value;
        setInputValue(e.target.valueAsNumber);
        setVolume(e.target.valueAsNumber / 100);
        localStorage.setItem('VOLUME', e.target.value);
    };

    useEffect(() => {
        videoRef.current.volume = volume;
    }, [volume]);


    const silentVolume = () => {
        if (volume !== 0) {
            setVolume(0);
            setInputValue(0);
            progressRef.current.valueAsNumber = 0;
        } else {
            setVolume(initVolume);
            setInputValue(initVolume * 100);
            progressRef.current.valueAsNumber = initVolume * 100;
        }
    };

  return (
    <div className={cx('pause-body1')}>
            <div className={cx('volume')}>
                <div className={cx('slider-count')}>
                    <div className={cx('slider')}>
                        <input type="range" min="0" max="100" value={inputValue} onInput={handleInput} />
                        <progress id="progress" ref={progressRef} max="100" value={inputValue} />
                    </div>
                </div>
            </div>

            {volume === 0 ? (
                <BsVolumeMuteFill className={cx('sound-icon')} onClick={silentVolume} />
            ) : (
                <AiFillSound className={cx('sound-icon')} onClick={silentVolume} />
            )}
        </div>
  )
}

export default Volume;