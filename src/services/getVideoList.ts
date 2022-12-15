import * as httpRequest from '@/utils/httpRequest';

interface Props {
    type: string | number;
    page: number;
}

export const getVideoList = async ({ type, page }: Props) => {
    try {
        const res = await httpRequest.get('videos', {
            params: {
                type,
                page: page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
