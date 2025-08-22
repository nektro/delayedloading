/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import dedent from "dedent";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		try {
			const original_url = new URL(request.url);
			const search = new URLSearchParams(original_url.search);
			const url_s = search.get("url");
			if (url_s == null) return new Response("'url' query parameter required", { status: 404 });
			if (url_s.length === 0) return new Response("'url' query parameter required", { status: 404 });
			const url = new URL(url_s);

			return new Response(dedent(`
				<!DOCTYPE html>
				<html lang="en">
					<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<meta http-equiv="X-UA-Compatible" content="ie=edge">
						<title>⌛ ${url}</title>
						<meta http-equiv="refresh" content="1; url='${url}'" />
					</head>
					<body>
						<p>If the page does not automatically refresh, click here: <a href="${url}">${url}</a>.</p>
					</body>
				</html>
			`), {
				headers: {
					'content-type': 'text/html',
				},
			});
		} catch (e) {
			return new Response(`Internal Server Error:\n${e}`, { status: 500 });
		}
	},
} satisfies ExportedHandler<Env>;
