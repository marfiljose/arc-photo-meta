import axios from 'axios';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from '../config/environment';

export const instance = axios.create({
    baseURL: CONTENT_BASE,
    headers: { Authorization: `Bearer ${ARC_ACCESS_TOKEN}` },
});

export const handleError = (err: any): Error => {
    if (err?.response) {
        return err.response.data;
    } else {
        return err;
    }
};


