import * as cookie from '$lib/cookie';

export async function getSession(e: { request: { headers: { get: (arg0: string) => string; }; }; }) {
    const { mediaStorage } = cookie.parse(e.request.headers.get('cookie') || '');
    // console.log(cookie.parse(e.request.headers.get('cookie')))
    return {
        user: { theme: mediaStorage }
    }
}