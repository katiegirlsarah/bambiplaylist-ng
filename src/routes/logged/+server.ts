import { redirect, error } from '@sveltejs/kit';

export async function GET ({ request }) {
  let url = new URL(request.url)
  let token = url.searchParams.get('jwt');
  
  let heads = new Headers();
  heads.append('Set-Cookie', `sid=${token}; Max-Age=${60 * 60 * 24 * 7}; Path=/; SameSite=Strict`)
  heads.append('Content-Type', 'text/html')
  return new Response('<script>window.location="/"</script>', { headers: heads });
};
