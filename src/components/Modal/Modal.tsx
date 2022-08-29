import { PropsWithChildren } from 'react';
import Portal from '@/components/Portal';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

interface Props extends PropsWithChildren<unknown>{
    isOpen?: boolean;
}
// Remove React.FC from Typescript template
const Modal = ({ isOpen = false, children }: Props): JSX.Element => {

    if(!isOpen) {
        return <></>;
    }
  return (
    <Portal>
        <div className={cx('wrapper')}>
            <div className={cx('overlay')}>
                <div className={cx('body')}>{children}</div>
            </div>
        </div>
    </Portal>
  )
}

export default Modal;