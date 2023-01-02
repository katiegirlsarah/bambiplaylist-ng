import { CF_SECRET_KEY } from '$env/static/private';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwt_sig_store } from '$lib/components/store.js';
import { redirect, error } from '@sveltejs/kit';

const saltRounds = 10;
let jwt_sig;

jwt_sig_store.subscribe(value => {
	jwt_sig = value;
});

import { dev } from '$app/environment'

const devKvStore = { 'katie': '$2b$10$qBqNQEVG5hiGHx1ZeXw0Y.fFh3NwctvH/pLXNvzfHgJuSMkuHIMxq' }

const devGetKvValue = (key: string) => {
    return new Promise((resolve) => {
        resolve(devKvStore[key] ?? null)
    })
}

const devSetKvValue = (key: string, value: unknown) => {
    return new Promise((resolve) => {
        devKvStore[key] = JSON.stringify(value)
        resolve()
    })
}

export const getKvValue = async (key: string): Promise<string | null> => {
    return dev ? await devGetKvValue(key) : await KV.get(key)
}

export const setKvValue = async (key: string, value: unknown): Promise<void> => {
    return dev ? await devSetKvValue(key, value) : await KV.put(key, value)
}

interface TokenValidateResponse {
	'error-codes': string[];
	success: boolean;
	action: string;
	cdata: string;
}

async function validateToken(token: string, secret: string) {
	const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			response: token,
			secret: secret
		})
	});

	const data: TokenValidateResponse = await response.json();

	return {
		// Return the status
		success: data.success,

		// Return the first error if it exists
		error: data['error-codes']?.length ? data['error-codes'][0] : null
	};
}

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();

		const token = data.get('cf-turnstile-response'); // if you edited the formsField option change this
		const SECRET_KEY = CF_SECRET_KEY; // you should use $env module for secrets

		const { success, error } = await validateToken(token, SECRET_KEY);

		if (!success)
			return {
				error: error || 'Invalid CAPTCHA'
			};

		// do something, the captcha is valid!
		let user = data.get('user');
		let pass = data.get('pass');
		
	  try {
			let cmp = await getKvValue(user);
			let result = await bcrypt.compare(pass, cmp);
			if (!result) {
			  throw new Error();
			}
	  } catch {
	    return { error: 'invalid username/password' };
	  }
		
		cookies.set('s', 1, {
			path: '/',
			HttpOnly: false,
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'strict'
		})
		
		return {
			status: 200,
			headers: {
				'set-cookie': 's=1; Max-Age=1200; Path=/; SameSite=Strict'
			}
		}
	},
	register: async({ request }) => {
		throw redirect('307', '/')
	}
};
