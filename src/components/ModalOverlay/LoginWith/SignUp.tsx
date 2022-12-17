import styles from './SignUp.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
// import { AiFillCaretDown } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import * as userService from '@/services/userService';
import { useStore } from '@/hooks';
import { actions } from '@/store';
import { FormattedMessage } from 'react-intl';

const cx = classNames.bind(styles);
// Remove React.FC from Typescript template
const SignUp = () => {

    const msg = {
        nameMess: 'Please enter your name',
        // nicknameMess: 'Please enter your nickname',
        passMess: 'Enter a new password',
        confirmMess: 'Confirm your password',
    };
    // useState
    const [name, setName] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');

    const [message, setMessage] = useState({ nameMess: '', nicknameMess: '', passMess: '', confirmMess: '' });

    // handle onChangeName
    const handleOnChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setMessage({ ...message, [e.target.name]: '' });
    };

    // handle onChangePass
    const handleOnChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPass(e.target.value);
        setMessage({ ...message, [e.target.name]: '' });
    };

    // handle onChangeConfirm
    const handleOnChangeConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirm(e.target.value);
        setMessage({ ...message, [e.target.name]: '' });
    };


    const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        //
        const value = e.target.value;
        if (value === '') {
            // @ts-ignore
            setMessage({ ...message, [e.target.name]: msg[e.target.name] });
        } else {
            setMessage({ ...message, [e.target.name]: '' });

            if (e.target.name === 'passMess') {
                e.target.value.length < 6
                    ? setMessage({ ...message, [e.target.name]: 'Your pass needs to have more than 6 characters' })
                    : setMessage({ ...message, [e.target.name]: '' });
            }
            if (e.target.name === 'confirmMess') {
                e.target.value === pass
                    ? setMessage({ ...message, [e.target.name]: '' })
                    : setMessage({ ...message, [e.target.name]: 'Your password is not correct!' });
            }
        }
    };


    // submit
    const [errMessage, setErrMessage] = useState<string>('');

    const [state, dispatch] = useStore();

    const dataSend = { type: 'email', email: name, password: pass };
    const onSubmit = () => {
        console.log(name, pass);
        userService.postRegister(dataSend).then((data) => {
            if (!data?.data) {
                // dispatch(actions.userLogIn(data));
                // localStorage.setItem('USER_LOG_IN', JSON.stringify(data));
                // setErrMessage('Success');
                // setLogIn(false);
                // window.location.reload();
                userService.postLogin(dataSend).then((bigData) => {
                    if (!bigData?.data?.data) {
                        dispatch(actions.userLogIn(bigData.data));
                        localStorage.setItem('USER_LOG_IN', JSON.stringify(bigData.data));
                        localStorage.setItem('TOKEN', JSON.stringify(bigData.meta.token));
                        window.location.reload();
                    } else {
                        setErrMessage('Your email or password is not correct. Plz try again!');
                    }
                });
            } else {
                setErrMessage('Your email is exited already. Please try again!');
            }
        });
    };

  return (
    <div className={cx('signup-body')}>
            <form className={cx('form')}>
                <div className={cx('div-label')}>
                    <FormattedMessage id="login.create" />
                </div>
                <div>
                    {/* , 'invalid' */}
                    <div className={cx('div-form', 'border', message.nameMess && 'invalid')}>
                        <input
                            value={name}
                            name="nameMess"
                            min="6"
                            onChange={handleOnChangeName}
                            onBlur={handleOnBlur}
                            className={cx('input')}
                            type="text"
                            placeholder="Enter your Email"
                        />
                    </div>
                    <p className={cx('form-message')}>{message.nameMess}</p>
                </div>
                
                <div>
                    <div className={cx('div-form', 'border', message.passMess && 'invalid')}>
                        <input
                            name="passMess"
                            value={pass}
                            onChange={handleOnChangePass}
                            onBlur={handleOnBlur}
                            className={cx('input')}
                            type="password"
                            placeholder="Enter new password"
                        />
                    </div>
                    <p className={cx('form-message')}>{message.passMess}</p>
                </div>
                <div>
                    <div className={cx('div-form', 'border', message.confirmMess && 'invalid')}>
                        <input
                            name="confirmMess"
                            value={confirm}
                            onChange={handleOnChangeConfirm}
                            onBlur={handleOnBlur}
                            className={cx('input')}
                            type="password"
                            placeholder="Password confirm"
                        />
                    </div>
                    <p className={cx('form-message')}>{message.confirmMess}</p>
                </div>
                
                <div className={cx('errMessage')}>{errMessage}</div>
                <button type="button" className={cx('submit-btn')} onClick={onSubmit}>
                    <FormattedMessage id="login.signUp" />
                </button>
            </form>

            <div className={cx('signup-footer')}>
                By continuing, you agree to TikTok
                <span>
                    <Link to="#">Terms of Service</Link>
                </span>
                and confirm that you have read TikTok
                <span>
                    <Link to="#">Privacy Policy</Link>
                </span>
                .
            </div>
        </div>
  )
}

export default SignUp