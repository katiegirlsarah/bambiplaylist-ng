import { CF_SECRET_KEY } from '$env/static/private';

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
	default: async ({ request }) => {
		const data = await request.formData();

		const token = data.get('cf-turnstile-response'); // if you edited the formsField option change this
		const SECRET_KEY = CF_SECRET_KEY; // you should use $env module for secrets

		const { success, error } = await validateToken(token, SECRET_KEY);

		if (!success)
			return {
				error: error || 'Invalid CAPTCHA'
			};

		// do something, the captcha is valid!
		console.log('We did it!');
	}
};
