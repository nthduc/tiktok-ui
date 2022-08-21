import * as httpRequest from '@/utils/httpRequest';

type Props = {
    page: number;
    perPage: number;
}

export const getSuggested = async ({page, perPage}: Props) => {
    try {
        const res = await httpRequest.get('users/suggested',{
            params: {
                page,
                per_page: perPage ,
            },
        });
        return res.data;
        
    } catch (err) {
        
        throw new Error("Failed fetchApi Search !"+ err);
    }

};
