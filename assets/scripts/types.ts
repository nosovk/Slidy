export interface Size {
    width: number;
    height: number;
}

/**
 * `https://www.picsum.photos` API response schema
 */
export interface ImageSchema {
    id: number;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
}

/**
 * Defines the `GetPhoto` params.
 */
export interface SlideParams {
    limit?: number;
    page?: number;
    width?: number;
    height?: number;
}

/**
 * Common Image interface.
 */
export interface Slide {
    id?: string | number;
    src?: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
    [key: string]: unknown;
}

export type GetPhotos<T> = (params: SlideParams) => Promise<T[]>;