import classNames from 'classnames/bind';
import styles from './ModalOverlay.module.scss';
import { AiFillInstagram, AiOutlineClose, AiOutlineQrcode, AiOutlineUser } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { IoMdArrowBack } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { useState, memo } from 'react';
import Qrcode from './LoginWith/Qrcode';
import SignUp from './LoginWith/SignUp';
import Email from './LoginWith/Email';

// Remove React.FC from Typescript template
const ModalOverlay = () => {
  return (
    <div>ModalOverlay</div>
  )
}

export default ModalOverlay