import Portal from '@/components/Portal';
import classNames from 'classnames/bind';
import styles from './ModalEdit.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import Image from '@/components/Image';
import { FiEdit } from 'react-icons/fi';
import { useState } from 'react';
import * as userService from '@/services/userService';
import { createBrowserHistory } from 'history';
import ToastMessage from '@/components/ToastMessage';
import { FormattedMessage } from 'react-intl';

const cx = classNames.bind(styles);

interface Props {
    setModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
    avatar: any;
    firstName1: string;
    lastName1: string;
    nickname: string;
    bio: string;
    setChange: React.Dispatch<React.SetStateAction<string>>;
}
// Remove React.FC from Typescript template
const ModalEdit = ({ setModalEdit, avatar, firstName1, lastName1, nickname, bio, setChange }: Props): JSX.Element => {
    // useState
    const [nicknameEdit, setNicknameEdit] = useState<string>(nickname);
    const [bioEdit, setBioEdit] = useState<string>(bio);
    const [firstName, setFirstName] = useState<string>(firstName1);
    const [lastName, setLastName] = useState<string>(lastName1);
    const [avatarEdit, setAvatarEdit] = useState(avatar);
    const [avatarDone, setAvatarDone] = useState<string>('');
    const [saving, setSaving] = useState<boolean>(false);
    // handle Base64
    const getBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };
    // handle Edit Avatar
    const handleEditAvatar = () => {
        const inputFile = document?.getElementById('input-edit');
        inputFile?.click();
        // setAvatarEdit()
    };
    // hanle Input Avatar
    const handleInputAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = event?.target as HTMLInputElement;
        if (!target.files?.length) {
            return;
        }
        const file: File = (target.files as FileList)[0];
        if (file) {
            const base64 = await getBase64(file);
            setAvatarEdit(base64);
        }
    };
    console.log(avatarDone);

    // handle Close Modal
    const handleCloseModel = () => {
        setModalEdit(false);
    };

    // handle text nickname
    const handleTextNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNicknameEdit(e.target.value);
    };

    // handle Text Bio
    const handleTextBio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBioEdit(e.target.value);
    };

    // handle Cancel
    const handleCancel = () => {
        setModalEdit(false);
    };

    const history = createBrowserHistory();
    const goBack = () => {
        history.back();
    };

    const formData = new FormData();
    formData.append('avatar', avatarDone);

    const dataSend = { last_name: lastName, first_name: firstName, bio: bioEdit };
    const handleSave = () => {
        setSaving(true);
        userService.postUpdateUser(dataSend).then(async (data) => {
            if (data) {
                setTimeout(() => {
                    setModalEdit(false);
                    setSaving(false);
                    setChange('change');
                }, 6000);
            }
        });
    };

    return (
        <Portal>
            <div className={cx('wrapper')} onClick={() => setModalEdit(false)}>
                {saving && <ToastMessage />}
                <div
                    className={cx('body')}
                    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
                >
                    <div className={cx('header')}>
                        <div>
                            <FormattedMessage key="profile.title" />
                        </div>
                        <div className={cx('icon-close')} onClick={handleCloseModel}>
                            <AiOutlineClose className={cx('icon-close-item')} />
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('content-item')}>
                            <div className={cx('content-label')}>
                                <FormattedMessage key="profile.photo" />
                            </div>
                            <div className={cx('avatar-content')} onClick={handleEditAvatar}>
                                <input
                                    type="file"
                                    id="input-edit"
                                    className={cx('input-edit')}
                                    onChange={handleInputAvatar}
                                />
                                {avatarEdit && <Image src={avatarEdit} className={cx('avatar')} />}
                                <div className={cx('icon-edit')}>
                                    <FiEdit />
                                </div>
                            </div>
                        </div>
                        <div className={cx('content-item')}>
                            <div className={cx('content-label')}>
                                <FormattedMessage key="profile.username" />
                            </div>
                            <div className={cx('edit-area')}>
                                <input
                                    type="text"
                                    className={cx('input-text')}
                                    value={nicknameEdit}
                                    onChange={handleTextNickname}
                                />
                                <p className={cx('link-username')}>www.tiktok.com/@{nicknameEdit}</p>
                                <p className={cx('site-username')}>
                                    <FormattedMessage key="profile.content" />
                                </p>
                            </div>
                        </div>
                        <div className={cx('content-item')}>
                            <div className={cx('content-label')}>
                                <FormattedMessage key="profile.firstname" />
                            </div>
                            <div className={cx('edit-area')}>
                                <input
                                    type="text"
                                    className={cx('input-text')}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={cx('content-item')}>
                            <div className={cx('content-label')}>
                                <FormattedMessage key="profile.lastname" />
                            </div>
                            <div className={cx('edit-area')}>
                                <input
                                    type="text"
                                    className={cx('input-text')}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={cx('content-item', 'last-item')}>
                            <div className={cx('content-label')}>
                                <FormattedMessage key="profile.bio" />
                            </div>
                            <div>
                                <div className={cx('edit-area', 'input-text', 'bio')}>
                                    <textarea
                                        className={cx('input-bio')}
                                        value={bioEdit}
                                        onChange={() => handleTextBio}
                                    />
                                </div>
                                <span className={cx('text-count')}>0/80</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('footer')}>
                        <button className={cx('btn')} onClick={handleCancel}>
                            <FormattedMessage key="profile.cancel" />
                        </button>
                        <button className={cx('btn', 'active')} onClick={handleSave}>
                            <FormattedMessage key="profile.save" />
                        </button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default ModalEdit;
