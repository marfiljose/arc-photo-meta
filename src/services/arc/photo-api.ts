import { instance, handleError } from './../../helpers/axios-helper';

export type GetPhotosParams = any;
export type Photo = any;

export const searchPhotos = (params: GetPhotosParams): Promise<Photo[]> => {
    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined),
    );
    return instance.get('/photo/api/v2/photos', { params: filteredParams })
        .then(response => response.data)
        .catch(err => Promise.reject(handleError(err)));
}