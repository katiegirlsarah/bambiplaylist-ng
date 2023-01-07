import { Handle } from '@sveltejs/kit';
import * as jose from 'jose';
import cookie from 'cookie';
import { jwt_sig_store } from '$lib/components/store.js';

let jwt_sig;

jwt_sig_store.subscribe((value) => {
	jwt_sig = value;
});

export const handle = async ({ event, resolve }) => {
	const url = new URL(event.request.url).pathname;
	const whitelist =
		url.startsWith('/login') ||
		url.startsWith('/logged') ||
		url.startsWith('/creator') ||
		url.startsWith('/playlist') ||
		url === '/';

	if (whitelist) return resolve(event);

	const auth = event.request.headers.get('Cookie');
	let cookies;
	let token;

	try {
		cookies = cookie.parse(auth);
		token = cookies['sid'];
	} catch (e) {
		return Response.redirect(`${event.url.origin}/login`, 307);
	}

	let user = '';

	try {
		let { payload, _ } = await jose.jwtVerify(token, new TextEncoder().encode(jwt_sig));
		user = payload['user'];
	} catch (e) {}

	if (user !== '') {
		return resolve(event);
	} else {
		return Response.redirect(`${event.url.origin}/login`, 307);
	}
};
