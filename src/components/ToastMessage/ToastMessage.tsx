import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './ToastMessage.module.scss';

const cx = classNames.bind(styles);

// Remove React.FC from Typescript template
const ToastMessage = () => {
    const [text, setText] = useState<string>('Loading...');

    useEffect(() => {
        setTimeout(() => setText('Successfully!'), 5000);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <div className={cx('text')}>{text}</div>
                <div className={cx('line')}></div>
            </div>
        </div>
    );
};

export default ToastMessage;
