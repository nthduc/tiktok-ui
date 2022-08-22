import { Key } from "react";

export interface DataApi {
    id: Key | null | undefined
  
    data : [
        {
        id : number,
        first_name : string,
        last_name : string,
        full_name : string,
        nickname: string,
        avatar : string,
        bio : string,
        tick : boolean,
        followings_count : number,
        followers_count : number,
        likes_count : number,
        website_url : string,
        facebook_url : string,
        youtube_url : string,
        twitter_url: string,
        instagram_url: string,
        created_at : string,
        updated_at : string,

        }
    ],
    meta?: {
        pagination : {
            total : number,
            count : number,
            per_page : number,
            current_page : number,
            total_pages : number,
            links : {}
        }
    }
}

export interface DataSearchAccount {
            id: number,
            first_name: string,
            last_name: string,
            full_name: string,
            nickname: string,
            avatar: string,
            bio: string,
            tick: boolean,
            followings_count : number,
            followers_count : number,
            likes_count: number,
            website_url: string,
            facebook_url: string,
            youtube_url: string,
            twitter_url: string,
            instagram_url: string,
            created_at: string | Date,
            updated_at: string | Date,
        
};

export interface DataUserSuggested {
    id : number,
    first_name: string,
    last_name: string,
    nickname: string,
    avatar: string,
    tick: boolean,
    is_followed: boolean,
    followings_count: number,
    followers_count: number,
    likes_count: number,
    website_url: string,
    facebook_url: string,
    youtube_url: string,
    twitter_url: string,
    instagram_url: string,
    created_at: string | Date,
    updated_at: string | Date
    popular_video: {
        id: number,
        uuid: string,
        type: string,
        thumb_url: string,
        file_url: string,
        music: string,
        description: string,
        is_liked: boolean,
        likes_count: number,
        comments_count: number,
        shares_count: number,
        views_count: number,
        published_at: string | Date,
        created_at: string | Date,
        updated_at : string | Date,
        meta: {
            file_size: number,
            file_format: string,
            mime_type: string,
            playtime_string: string,
            playtime_seconds: number,
            bitrate: number,
            video: {
                dataformat: string,
                rotate: number,
                resolution_x: number,
                resolution_y: number,
                fourcc: string,
                fourcc_lookup: string,
                frame_rate: number,
            }
        }
    }
};