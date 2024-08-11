// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import worker from '../src/index';
import { describe, it, expect } from 'vitest';
// import app from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Hello World worker', () => {
	it('responds with Hello World! (unit style)', async () => {
		const request = new IncomingRequest('http://example.com', { method: 'GET' });
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		expect(await response.text()).toMatchInlineSnapshot(`"Hit root route"`);
	});

	it('responds with Hello World! (integration style)', async () => {
		const response = await SELF.fetch('https://example.com', { method: 'GET' });
		expect(await response.text()).toMatchInlineSnapshot(`"Hit root route"`);
	});

	// it('responds with Hello World! (unit style)', async () => {
	// 	const request = new IncomingRequest('http://example.com', { method: 'GET' });
	// 	// Create an empty context to pass to `worker.fetch()`.
	// 	const response = await app.request(request);
	// 	// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
	// 	expect(await response.text()).toMatchInlineSnapshot(`"Hit root route"`);
	// });
});
