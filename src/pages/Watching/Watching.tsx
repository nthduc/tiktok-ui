import classNames from 'classnames/bind';

import { AiOutlineClose, AiTwotoneHeart } from 'react-icons/ai';
import {
    BsCheckSquare,
    BsChevronDown,
    BsEmojiSmile,
    BsFacebook,
    BsFillPlayFill,
    BsFlag,
    BsLink45Deg,
    BsMusicNoteBeamed,
    BsWhatsapp,
} from 'react-icons/bs';
import { FaCommentDots } from 'react-icons/fa';
import { FiMoreHorizontal, FiSend } from 'react-icons/fi';
import { ImEmbed } from 'react-icons/im';
import Button from '@/components/Button';
import Image from '@/components/Image';
import UserComment from './Comments/UserComment';
import styles from './Watching.module.scss';

import { Link, useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useEffect, useRef, useState, memo } from 'react';
import * as anUserService from '@/services/userService';
import * as userService from '@/services/userService';
import { ModalSetting } from '@/components/ModalEdit';
import { FormattedMessage } from 'react-intl';
import { DataUserSuggested } from '@/interfaces';

const cx = classNames.bind(styles);

// @ts-ignore
const user = JSON.parse(localStorage.getItem('USER_LOG_IN'));
const IS_LOGIN = localStorage.getItem('USER_LOG_IN') === null ? false : true;
// Remove React.FC from Typescript template
const Watching = (): JSX.Element => {
    const match = useLocation();
    const query = new URLSearchParams(match.search);
    const idVideo = query.get('id') as any;
    // console.log("ID",idVideo);
    // useState
    const [count, setCount] = useState<number>(0);
    const [data, setData] = useState<Array<DataUserSuggested> | any>([]);
    const [linkVideo, setLinkVideo] = useState<string | number | any>();
    const [idLink, setIdLink] = useState<string | number | any>('');
    const [heart, setHeart] = useState<boolean | null>(null);
    const [likes, setLikes] = useState<number>(0);

    const [listCmts, setListCmts] = useState<unknown | any>([]);
    const [change, setChange] = useState<string | number>('');
    const [day, setDay] = useState<string>('');
    const [month, setMonth] = useState<string>('');
    const [isLogin, setIsLogIn] = useState<boolean | null | string>(null);
    const [isFollow, setIsFollow] = useState<boolean | null>(null);
    const [play, setPlay] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [value, setValue] = useState<string>('');
    const [hasValue, setHasValue] = useState<boolean>(false);
    // useRef
    const videoRef = useRef<HTMLVideoElement>(null) as React.MutableRefObject<HTMLVideoElement>;
    const inputRef = useRef<HTMLInputElement>(null) as React.MutableRefObject<HTMLInputElement>;
    const lastRef = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;
    // history
    const history = createBrowserHistory();
    const goBack = () => {
        history.back();
    };

    const handlePlay = () => {
        setPlay(!play);
        play ? videoRef.current?.play() : videoRef.current?.pause();
    };

    //
 
    // useEffect
    useEffect(() => {
        anUserService
            .getVideo(idVideo)
            .then((data) => {
                if (data === undefined) {
                    return;
                }
                setData(data.user);
                data.is_followed ? setIsFollow(true) : setIsFollow(false);
                setLinkVideo(data);
                setIdLink(idVideo);
                setHeart(data.is_liked);
                setLikes(data.likes_count);
                setDay(data.created_at.split(' ')[0].split('-')[2]);
                setMonth(data.created_at.split(' ')[0].split('-')[1]);
            })
            .catch((error) => console.log(error));
    }, [linkVideo, change]);
    // console.log("data",data)
    useEffect(() => {
        // @ts-ignore
        if (JSON.parse(localStorage.getItem('USER_LOG_IN'))?.nickname === data.nickname) {
            setIsLogIn('author');
        }
    }, [data.nickname]);
    // handleUnFollow
    const handleUnFollow = () => {
        userService.postUnFollow(data.id);
        setIsFollow(false);
    };
    // handleFollow
    const handleFollow = () => {
      userService.postFollow(data.id);
      setIsFollow(true);
  };

    // handle delete
    const handleDelete = () => {
        setModal(true);
        setTitle('delete');
    };

    const handleSettings = () => {
      setModal(true);
      setTitle('settings');
  };

      // footer

      const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
          value && setHasValue(true);
      };

      const handleOnBlur = () => {
        value ? setHasValue(true) : setHasValue(false);
    };

     //submit
     const handleSubmit = () => {
      linkVideo && userService.postCreateNewComment(linkVideo.uuid, { comment: value });
      setListCmts((prev : any) => [
          {
              comment: value,
              created_at: '2022-09-10 08:25:57',
              user: {
                  nickname: user.nickname,
                  avatar: user.avatar,
              },
          },
          ...prev,
      ]);

      setValue('');
      inputRef.current?.focus();
  };

  const handleHeart = () => {
    if (heart) {
        setLikes(likes - 1);
        setHeart(false);
        userService.postUnLikedPost(idVideo);
    } else {
        userService.postLikedPost(idVideo);
        setHeart(true);
        setLikes(likes + 1);
    }
    setHeart(!heart);
};

const handleChangeVideo = () => {
  setIdLink((prev: number) => +prev + 1);
  anUserService
      .getAVideo(+idLink)
      .then((data) => {
          if (data[0]) {
              setLinkVideo(data[0]);
              setData(data[0].user);
          }
          setIdLink((prev: number) => +prev + 1);
      })
      .catch((error) => console.log(error));
};


    return (
      <div className={cx('wrapper')}>
      {modal && <ModalSetting title={title} setModal={setModal} idVideo={linkVideo?.id} />}
      <div className={cx('body-video')} onClick={() => setCount(count + 1)}>
          <div>
              {linkVideo && (
                  <video className={cx('video')} ref={videoRef} loop autoPlay controls>
                      <source src={linkVideo?.file_url} />
                  </video>
              )}
          </div>

          <div className={cx('icon-body', 'close')} onClick={goBack}>
              <AiOutlineClose className={cx('icon')} />
          </div>
          <div className={cx('icon-body', 'report')}>
              <BsFlag className={cx('icon')} /> <FormattedMessage id="profile.report" />
          </div>

          <div className={cx('icon-body', 'down')}>
              <BsChevronDown className={cx('icon')} onClick={handleChangeVideo} />
          </div>

          <div className={cx('cmt-on-mobile')} onClick={handlePlay}>
              <div className={cx('icon-body', 'close')} onClick={goBack}>
                  <AiOutlineClose className={cx('icon')} />
              </div>
              <div className={cx('icon-body', 'report')}>
                  <BsFlag className={cx('icon')} /> <FormattedMessage id="profile.report" />
              </div>
              <div className={cx('m-info')}>
                  <p className={cx('m-name')}> {data.nickname}</p>
                  <div className={cx('m-content')}>
                      {linkVideo?.description}
                      <div className={cx('m-tag')}>
                          <Link to="#" className={cx('m-tag-link')}>
                              #xuhuong
                          </Link>
                          <Link to="#" className={cx('m-tag-link')}>
                              #gaixinh
                          </Link>
                      </div>
                      <div className={cx('m-tag')}>
                          <Link to="#" className={cx('m-tag-link')}>
                              #xuhuong
                          </Link>
                          <Link to="#" className={cx('m-tag-link')}>
                              #gaixinh
                          </Link>
                      </div>
                  </div>
                  <Link to="#" className={cx('m-music')}>
                      <BsMusicNoteBeamed /> {linkVideo?.music}
                  </Link>
              </div>
              <div className={cx('m-action')}>
                  <Image src={data.avatar} className={cx('m-avatar')} />
                  <div className={cx('m-like')}>
                      <div className={cx('m-like-body')}>
                          <AiTwotoneHeart className={cx('m-like-icon')} />
                      </div>
                      <span className={cx('m-like-count')}>{linkVideo?._count}</span>
                      <div className={cx('m-like-body')}>
                          <FaCommentDots className={cx('m-like-icon')} />
                      </div>
                      <span className={cx('m-like-count')}> {linkVideo?.comments_count}</span>
                  </div>

                  <Image src={data.avatar} className={cx('m-avatar')} />
              </div>
              {play && <BsFillPlayFill className={cx('m-play')} />}
          </div>
      </div>

      <div className={cx('author')}>
          <div className={cx('info')}>
              <div className={cx('info-header')}>
                  <Link
                      to={{
                          pathname: '/@' + data.nickname,
                      }}
                      className={cx('header-info-body')}
                  >
                      <Image src={data.avatar} className={cx('avatar')} />
                      <div className={cx('info-wrapper')}>
                          <p className={cx('nickname')}>{data.nickname}</p>
                          <p className={cx('name')}>
                              {`${data.first_name} ${data.last_name}`}{' '}
                              <BsCheckSquare className={cx('icon-check')} /> {` ${day} Tháng ${month}`}
                          </p>
                      </div>
                  </Link>

                  {isLogin === 'author' ? (
                      <div className={cx('more-login')}>
                          <FiMoreHorizontal className={cx('actions-more-icon')} />

                          <div className={cx('more-list')}>
                              <div className={cx('more-item')} onClick={handleSettings}>
                                  <FormattedMessage id="watching.private" />
                              </div>
                              <div className={cx('more-item')} onClick={handleDelete}>
                                  <FormattedMessage id="watching.delete" />
                              </div>
                          </div>
                      </div>
                  ) : !isFollow ? (
                      <Button outline large className={cx('btn')} onClick={handleFollow}>
                          <FormattedMessage id="profile.follow" />
                      </Button>
                  ) : (
                      <Button outline large className={cx('btn', 'btn-following')} onClick={handleUnFollow}>
                          <FormattedMessage id="profile.following" />
                      </Button>
                  )}
              </div>

              <div className={cx('content')}>
                  {linkVideo?.description}
                  <Link to="#" className={cx('tag-link')}>
                      #xuhuong
                  </Link>
                  <Link to="#" className={cx('tag-link')}>
                      #gaixinh
                  </Link>
              </div>

              <Link to="#" className={cx('music')}>
                  <BsMusicNoteBeamed />
                  music
              </Link>

              <div className={cx('action')}>
                  <div className={cx('like')}>
                      <div className={cx('like-body')}>
                          <AiTwotoneHeart className={cx('like-icon', heart && 'active')} onClick={handleHeart} />
                      </div>
                      <span className={cx('like-count')}>{likes || 0}</span>
                      <div className={cx('like-body')}>
                          <FaCommentDots className={cx('like-icon')} />
                      </div>
                      <span className={cx('like-count')}> {linkVideo?.comments_count}</span>
                  </div>
                  <div className={cx('share')}>
                      <Link to="#" className={cx('share-item')}>
                          <ImEmbed className={cx('share-icon')} />
                          <span>Embed</span>
                      </Link>
                      <Link to="#" className={cx('share-item')}>
                          <FiSend className={cx('share-icon')} />
                          <span>Send to friends</span>
                      </Link>
                      <Link to="#" className={cx('share-item')}>
                          <BsFacebook className={cx('share-icon')} />
                          <span>Share to Facebook</span>
                      </Link>
                      <Link to="/share-whatsapp" className={cx('share-item')}>
                          <BsWhatsapp className={cx('share-icon')} />
                          <span>Share to WhatsApp</span>
                      </Link>
                      <Link to="#" className={cx('share-item')}>
                          <BsLink45Deg className={cx('share-icon')} />
                          <span>Copy link</span>
                      </Link>
                  </div>
              </div>

              <div className={cx('share-link')}>
                  <div>https://www.tiktok.com/@{data.nickname}/video/71334295915191</div>
                  <Button outline small className={cx('share-link-btn')}>
                      <FormattedMessage id="watching.link" />
                  </Button>
              </div>
          </div>
          <div className={cx('comments')}>
              {listCmts &&
                  listCmts.map((data: any, index: number) => {
                      if (index === listCmts.length) {
                          console.log(index === listCmts.length - 1);
                          return (
                              <div key={index} ref={lastRef}>
                                  <UserComment itemCmts={data} setChange={setChange} />
                              </div>
                          );
                      } else {
                          return (
                              <div key={index} ref={lastRef}>
                                  {' '}
                                  <UserComment itemCmts={data} key={index} setChange={setChange} />
                              </div>
                          );
                      }
                  })}
          </div>
          <footer className={cx('footer')}>
              {!IS_LOGIN ? (
                  <div className={cx('footer-text')}>
                      <FormattedMessage id="watching.comment" />
                  </div>
              ) : (
                  <div className={cx('chat-box-bottom')}>
                      <div className={cx('chat-box-bottom-body')}>
                          <FormattedMessage id="watching.comment">
                              {(text) => (
                                  <input
                                      type="text"
                                      ref={inputRef}
                                      value={value}
                                      onChange={handleOnInput}
                                      onBlur={handleOnBlur}
                                      className={cx('chat-box-input')}
                                      // @ts-ignore
                                      placeholder={text}
                                  />
                              )}
                          </FormattedMessage>
                          <div className={cx('emotion-body')}>
                              <BsEmojiSmile className={cx('chat-box-emotion')} />
                              <div className={cx('emotion-hover')}>
                                  <FormattedMessage id="watching.emo" />
                              </div>
                          </div>
                      </div>
                      {/* {sendBtn && ( */}
                      <div className={cx('send-btn', hasValue && 'active-value')} onClick={handleSubmit}>
                          <FormattedMessage id="watching.post" />
                      </div>
                      {/* )} */}
                  </div>
              )}
          </footer>
      </div>
  </div>
    );
};


export default memo(Watching);
