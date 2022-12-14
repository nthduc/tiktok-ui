import {
    SET_USER_INFO,
    USER_LOG_IN,
    MESSAGE_AUTHOR_LIST,
    SET_SUGGEST_ACCOUNTS,
    GET_LIST_CMT,
    CURRENT_USER_INFO,
    COMMENTS_NOW,
    SET_FOLLOWING_ACCOUNTS,
    SET_LANGUAGE,
} from './constants';

export const setUserInfo = (payload: unknown) => ({
    type: SET_USER_INFO,
    payload,
});
export const userLogIn = (payload: unknown) => ({
    type: USER_LOG_IN,
    payload,
});
export const setSuggestAccount = (payload: unknown) => ({
    type: SET_SUGGEST_ACCOUNTS,
    payload,
});
export const setSFollowingAccount = (payload: unknown) => ({
    type: SET_FOLLOWING_ACCOUNTS,
    payload,
});
export const setLanguage = (payload: unknown) => ({
    type: SET_LANGUAGE,
    payload,
});

export const setCurrentUserInfo = (payload: unknown) => ({
    type: CURRENT_USER_INFO,
    payload,
});
export const getListCmt = (payload: unknown) => ({
    type: GET_LIST_CMT,
    payload,
});
export const getMessageAuthorList = (payload: unknown) => ({
    type: MESSAGE_AUTHOR_LIST,
    payload,
});
export const setFollowingAccount = (payload: unknown) => ({
    type: SET_SUGGEST_ACCOUNTS,
    payload,
});
export const setCommentsNow = (payload: unknown) => ({
    type: COMMENTS_NOW,
    payload,
});
