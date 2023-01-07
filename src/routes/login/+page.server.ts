import { CF_SECRET_KEY } from '$env/static/private';
import sha256 from '$lib/components/sha256.js';
import * as jose from 'jose';
import { jwt_sig_store, makeid } from '$lib/components/store.js';
import { redirect, error } from '@sveltejs/kit';

let jwt_sig: string;
const alg = 'HS256';

jwt_sig_store.subscribe((value) => {
	jwt_sig = value;
});

import { dev } from '$app/environment';

let devKvStore = { katie: 'asd$55422ef75fb65485e715b11aa6d2997189e70c2bfb3538ecbddadec7bf13a707' };

const devGetKvValue = (key: string) => {
	return new Promise((resolve) => {
		resolve(devKvStore[key] ?? null);
	});
};

const devSetKvValue = (key: string, value: unknown) => {
	return new Promise((resolve) => {
		devKvStore[key] = value;
		resolve();
	});
};

export const getKvValue = async (key: string, kv: KVNamespace): Promise<string | null> => {
	return dev ? await devGetKvValue(key) : await kv.get(key);
};

export const setKvValue = async (key: string, value: unknown, kv: KVNamespace): Promise<void> => {
	return dev ? await devSetKvValue(key, value) : await kv.put(key, value);
};

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
	login: async ({ request, platform }) => {
		const data = await request.formData();

		const token = data.get('cf-turnstile-response'); // if you edited the formsField option change this
		const SECRET_KEY = CF_SECRET_KEY; // you should use $env module for secrets

		const { success, error } = await validateToken(token, SECRET_KEY);

		if (!success)
			return {
				error: error || 'Invalid CAPTCHA'
			};

		let user = data.get('user');
		let pass = data.get('pass');

		try {
			let cmp = await getKvValue(user, platform?.env.BP_DB);
			let salt = cmp.split('$')[0];
			let hash = cmp.split('$')[1];
			let result = sha256(pass + salt) === hash;
			if (!result) {
				return { error: 'invalid username/password' };
			}
		} catch {
			return { error: 'invalid username/password' };
		}

		const jwt_token = await new jose.SignJWT({ user: user })
			.setProtectedHeader({ alg })
			.setIssuedAt()
			.setExpirationTime('7d')
			.sign(new TextEncoder().encode(jwt_sig));

		throw redirect(307, `/logged?jwt=${jwt_token}`);
	},
	register: async ({ request, platform }) => {
		const data = await request.formData();

		const token = data.get('cf-turnstile-response'); // if you edited the formsField option change this
		const SECRET_KEY = CF_SECRET_KEY; // you should use $env module for secrets

		const { success, error } = await validateToken(token, SECRET_KEY);

		if (!success)
			return {
				error: error || 'Invalid CAPTCHA'
			};

		let user = data.get('user');
		let pass = data.get('pass');

		let exists = (await getKvValue(user, platform?.env.BP_DB)) !== null;
		if (exists) return { error: 'user exists' };

		let salt = makeid(10);
		let newPw = salt + '$' + sha256(pass + salt);
		await setKvValue(user, newPw, platform?.env.BP_DB);

		const jwt_token = await new jose.SignJWT({ user: user })
			.setProtectedHeader({ alg })
			.setIssuedAt()
			.setExpirationTime('7d')
			.sign(new TextEncoder().encode(jwt_sig));

		throw redirect(307, `/logged?jwt=${jwt_token}`);
	}
};
