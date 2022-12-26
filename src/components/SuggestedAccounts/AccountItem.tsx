import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '@/components/Popper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import AccountPreview from './AccountPreview';
import { DataUserSuggested } from '@/interfaces';
import Image from '@/components/Image';
import { memo, useCallback, useState } from 'react';
import * as userService  from '@/services'
import ModalOverlay from '@/components/ModalOverlay';

const cx = classNames.bind(styles);

type Props = {
    data?: DataUserSuggested | null;
    isFollowBtn?: boolean;
};
// Remove React.FC from Typescript template
const AccountItem = ({ data , isFollowBtn}: Props): JSX.Element => {
    // useState
    const [follow, setFollow] = useState<boolean>(true);
    const [login, setLogin] = useState<boolean>(false);

    const handleClick = useCallback(() => {
        setFollow(!follow);
        if (follow) {
            userService.postFollow(data?.id ?? 0);
        } else {
            userService.postUnFollow(data?.id ?? 0);
        }
    }, [data?.id, follow]);

    const renderPreview = (props: Object) => {
        // Show Modal
        return (
            <div tabIndex={-1} {...props}>
                <PopperWrapper>
                    <AccountPreview data={data} follow={follow} handleClick={handleClick} setLogin={setLogin}/>
                </PopperWrapper>
            </div>
        );
    };

    return (
        /* Using a wrapper <div> or <span> tag around the reference element solves 
    this by creating a new parentNode context*/
        <div>
            {/* Check Login */}
            {login ? <ModalOverlay setLogin={setLogin} /> : ''}

            <Tippy 
            interactive 
            offset={[-20, 0]} 
            delay={[800, 0]} 
            render={renderPreview} 
            placement="bottom"
            >
                <div className={cx('account-item')}>
                    <Image 
                    className={cx('avatar')} 
                    src={data?.avatar} 
                    alt={data?.nickname} 
                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>{data?.nickname}</strong>
                            {data?.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle as IconProp} />}
                        </p>
                        <p className={cx('name')}>{`${data?.first_name} ${data?.last_name}`}</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
};

export default memo(AccountItem);
