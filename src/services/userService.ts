import * as httpRequest from '@/utils/httpRequest';

type Props = {
    page: number;
    perPage: number;
}

type ErrorMsg = string;

type AuthData = {
    last_name: string;
    first_name: string;
    bio: string;
}

type LoginData = {
    email: string;
    password: string;
}

type RegisterData = {
    type: string;
    email: string;
    password: string;
}

type ID = {
    id: number
}
// get Suggested
export const getSuggested = async ({ page, perPage }: Props) => {
    try {
        const res = await httpRequest.get('users/suggested',{
            params: {
                page,
                per_page: perPage,
            },
        });
        return res.data;
        
    } catch (err: unknown) {
        
        throw new Error("Failed fetchApi Search !"+ err);
    }

};

// get Following
export const getFollowing = async ({ page }: Props) => {
    try {
        const res = await httpRequest.get('me/followings', {
            params: {
                page,
            },
        });
        return res.data;
    } catch (err : unknown) {
        console.log(err);
    }
};


// get An User
export const getAnUser = async (nicknameValue: string) => {
    try {
        const res = await httpRequest.get(`users/${nicknameValue}`);
        return res.data;
    } catch (err: unknown) {
        console.log(err);
    }
};

// get Video
export const getVideo = async (idVideo: Props) => {
    try {
        const res = await httpRequest.get(`videos/${idVideo}`);
        return res.data;
    } catch (err: unknown) {
        console.log(err);
    }
};

// get A Video
export const getAVideo = async (id: Props) => {
    try {
        const res = await httpRequest.get(`users/${id}/videos`);
        return res.data;
    } catch (err: unknown) {
        console.log(err);
    }
};

//post Login
export const postLogin = async (dataSend: LoginData, errorMess?: ErrorMsg) => {
    try {
        const res = await httpRequest.post('auth/login', dataSend);
        return res;
    } catch (err) {
        if (err instanceof Error) return (errorMess = err.message);
    }
};

// post Update User
export const postUpdateUser = async (dataSend: AuthData, errorMess?: ErrorMsg) => {
    try {
        const res = await httpRequest.patch('auth/me?_method=PATCH', dataSend);
        return res;
    } catch (err) {
        if (err instanceof Error) return (errorMess = err.message);
    }
};

// post Register
export const postRegister = async (dataSend: RegisterData, errorMess?: ErrorMsg) => {
    try {
        const res = await httpRequest.post('auth/register', dataSend);
        return res.data;
    } catch (err) {
        if (err instanceof Error) return (errorMess = err.message);
    }
};

// like post
export const postLikedPost = async ({ id }: ID) => {
    try {
        const res = await httpRequest.post(`videos/${id}/like`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

// Unlike post
export const postUnLikedPost = async ({ id }: ID ) => {
    try {
        const res = await httpRequest.post(`videos/${id}/unlike`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

// Follow
export const postFollow = async (idUser: number, errorMess?: ErrorMsg) => {
    try {
        const res = await httpRequest.post(`users/${idUser}/follow`);
        return res.data;
    } catch (err) {
        if (err instanceof Error) return (errorMess = err.message);
    }
};

// UnFollow
export const postUnFollow = async (idUser: number, errorMess?: ErrorMsg) => {
    try {
        const res = await httpRequest.post(`users/${idUser}/unfollow`);
        return res.data;
    } catch (err) {
        if (err instanceof Error) return (errorMess = err.message);
    }
};

// Upload
export const postCreateVideo = async (data: AuthData) => {
    try {
        const res = await httpRequest.post('videos', data);
        return res;
    } catch (err) {
        return console.log(err);
    }
};

// delete
export const deleteVideo = async (idVideo: number, errorMess?: ErrorMsg) => {
    try {
        const res = await httpRequest.DELETE(`videos/${idVideo}`);
        return res;
    } catch (err) {
        if (err instanceof Error) return (errorMess = err.message);
    }
};

// get comments
export const getListComments = async (uuidVideo: number) => {
    try {
        const res = await httpRequest.get(`videos/${uuidVideo}/comments`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

// post create new comment
export const postCreateNewComment = async (uuid: number, data: AuthData) => {
    try {
        const res = await httpRequest.post(`videos/${uuid}/comments`, data);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

// delete Comment
export const deleteComment = async (id: number) => {
    try {
        const res = await httpRequest.DELETE(`comments/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// like comment
export const likeComment = async (idcmt: number) => {
    try {
        const res = await httpRequest.post(`comments/${idcmt}/like`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

// unlike
export const unlikeComment = async (idcmt: number) => {
    try {
        const res = await httpRequest.post(`comments/${idcmt}/unlike`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};