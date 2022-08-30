import * as httpRequest from '@/utils/httpRequest';

export const search = async (q: string, type = 'less') => {
    try {
        const res = await httpRequest.get('users/search',{
            params: {
                q,
                type,
            },
        });
        return res.data;
        
    } catch (err: unknown) {
        
        throw new Error("Failed fetchApi Search !"+ err);
    }

};
