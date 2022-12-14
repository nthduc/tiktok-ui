import classNames from 'classnames/bind';
import { createBrowserHistory } from 'history';
import { useRef, useState } from 'react';
import { AiFillSetting, AiOutlineDelete } from 'react-icons/ai';
import { BiArrowBack, BiBlock } from 'react-icons/bi';
import { BsEmojiSmile, BsFlag, BsPinAngle } from 'react-icons/bs';
import { FiMoreHorizontal, FiSend } from 'react-icons/fi';
import { IoIosNotificationsOff } from 'react-icons/io';
import { FormattedMessage } from 'react-intl';
import Image from '@/components/Image';
import { useStore } from '@/hooks';
import { actions } from '@/store';
import styles from './Messages.module.scss';
import MessageUser from './MessageUser';

const cx = classNames.bind(styles);

// @ts-ignore
const dataUser = JSON.parse(localStorage.getItem('USER_LOG_IN') || '{}');
const isUser = true;
// Remove React.FC from Typescript template
const Messages = () => {
    // useState
    const [value, setValue] = useState<string>('');
    const [sendBtn, setSendBtn] = useState<boolean>(false);
    const [isMore, setIsMore] = useState<boolean>(false);
    const [state, dispatch] = useStore();

    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if (value) {
            setSendBtn(true);
        }
    };
    const handleOnBlur = () => {
        if (value) {
            setSendBtn(true);
        } else {
            setSendBtn(false);
        }
    };
    const history = createBrowserHistory();
    const goBack = () => {
        history.back();
    };

    const handleMore = () => {
        setIsMore(!isMore);
    };

    const handleSend = () => {
        dispatch(actions.getMessageAuthorList(value));
        setValue('');
        inputRef.current?.focus();
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('body-container')}>
                <div className={cx('conversation-list')}>
                    <div className={cx('back-icon')} onClick={goBack}>
                        <BiArrowBack />
                    </div>
                    <div className={cx('conversation-header')}>
                        <div className={cx('title')}>
                            <FormattedMessage id="message.title" />
                        </div>
                        <div className={cx('setting-icon')}>
                            <AiFillSetting className={cx('setting-icon')} />
                        </div>
                    </div>
                    <div className={cx('list-content')}>
                        {/* item */}
                        {state.currentUser.first_name ? (
                            <div className={cx('item', 'active')}>
                                <div className={cx('item-info')}>
                                    <Image src={state.currentUser.avatar} className={cx('item-info-avatar')} />
                                    <div className={cx('item-info-text')}>
                                        <p
                                            className={cx('item-info-nickname')}
                                        >{`${state.currentUser.first_name} ${state.currentUser.last_name}`}</p>
                                        <p className={cx('item-info-time')}>
                                            9:50<span>PM</span>
                                        </p>
                                    </div>
                                </div>
                                <div className={cx('more')}>
                                    <FiMoreHorizontal className={cx('more-icon')} onClick={handleMore} />
                                    {isMore && (
                                        <div className={cx('more-list')}>
                                            <div className={cx('more-item')}>
                                                <IoIosNotificationsOff />
                                                <p>Mute</p>
                                            </div>
                                            <div className={cx('more-item')}>
                                                <AiOutlineDelete />
                                                <p>Delete</p>
                                            </div>
                                            <div className={cx('more-item')}>
                                                <BsPinAngle />
                                                <p>Pin to top</p>
                                            </div>
                                            <div className={cx('more-item')}>
                                                <BsFlag />
                                                <p>Report</p>
                                            </div>
                                            <div className={cx('more-item')}>
                                                <BiBlock />
                                                <p>Block</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className={cx('no-message')}>
                                <FormattedMessage id="message.no" />
                            </div>
                        )}
                    </div>
                </div>
                <div className={cx('chat-box')}>
                    <div className={cx('chat-box-header')}>
                        {state.currentUser.avatar && (
                            <div className={cx('item', 'item-border')}>
                                <div className={cx('item-info')}>
                                    <Image src={state.currentUser.avatar} className={cx('item-info-avatar')} />
                                    <div className={cx('item-info-text')}>
                                        <p
                                            className={cx('item-info-nickname')}
                                        >{`${state.currentUser.first_name} ${state.currentUser.last_name}`}</p>
                                        <p className={cx('item-info-name')}>@{state.currentUser.nickname}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={cx('chat-box-main')}>
                        {state.currentUser.avatar && <MessageUser dataUser={state.currentUser} text="Who are you?" />}
                        {state.messageAuthorList.map((messageText: string, index: React.Key | null | undefined) => (
                            <MessageUser key={index} text={messageText} dataUser={dataUser} isUser={isUser} />
                        ))}
                        {/* <MessageUser dataUser={dataUser} isUser={isUser} /> */}
                    </div>
                    <div className={cx('chat-box-bottom')}>
                        <div className={cx('chat-box-bottom-body')}>
                            <FormattedMessage id="message.send">
                                {(text) => (
                                    <input
                                        type="text"
                                        value={value}
                                        onChange={handleOnInput}
                                        ref={inputRef}
                                        onBlur={handleOnBlur}
                                        className={cx('chat-box-input')}
                                        placeholder={text as unknown as string}
                                    />
                                )}
                            </FormattedMessage>
                            <div className={cx('emotion-body')}>
                                <BsEmojiSmile className={cx('chat-box-emotion')} />
                                <div className={cx('emotion-hover')}>Click to add emojis</div>
                            </div>
                        </div>
                        {sendBtn && (
                            <div className={cx('send-btn')} onClick={handleSend}>
                                <FiSend className={cx('send-icon')} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
