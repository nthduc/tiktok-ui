
import Image from '@/components/Image';
import classNames from 'classnames/bind';
import styles from './MessageUser.module.scss';
import { memo } from 'react';
import { DataUserSuggested } from '@/interfaces';

const cx = classNames.bind(styles);

interface Props {
    dataUser: DataUserSuggested;
    isUser?: boolean;
    text: string;
}
// Remove React.FC from Typescript template
const MessageUser = ({ dataUser, isUser, text }: Props) => {
    return (
        <div className={cx('wrapper', isUser && 'wrapper-user')}>
            <div className={cx('body', isUser && 'body-user')}>
                <Image src={dataUser.avatar} className={cx('avatar')} />

                <span className={cx('text', isUser && 'text-user')}>{text}</span>
            </div>
        </div>
    );
}

export default memo(MessageUser);