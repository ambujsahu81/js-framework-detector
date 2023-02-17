import puppeteer from 'puppeteer';

type JsFramework = Array<{name: string; url: string; npm: string; version: string}>;

const detect = (): JsFramework => {
	let frameworkList: JsFramework = [];
	switch (true) {
		// JQuery
		case Object.prototype.hasOwnProperty.call(window, 'jQuery'):
			frameworkList.push({
				name: 'jquery',
				url: 'http://jquery.com',
				npm: 'https://www.npmjs.com/package/jquery',
				version: 'unknown',
			});
			break;

		// Next.js
		case Object.prototype.hasOwnProperty.call(window, '__NEXT_DATA__'):
			frameworkList.push({
				name: 'next',
				url: 'https://nextjs.org/',
				npm: 'https://www.npmjs.com/package/next',
				version: 'unknown',
			});
			break;

		// Remix
		case Object.prototype.hasOwnProperty.call(window, '__remixContext'):
			frameworkList.push({
				name: 'remix',
				url: 'https://remix.run/',
				npm: 'https://www.npmjs.com/package/remix',
				version: 'unknown',
			});
			break;

		// Angular
		case Boolean(window.document.querySelector('[ng-version]')):
			frameworkList.push({
				name: 'angular',
				url: 'https://angular.io/',
				npm: 'https://www.npmjs.com/package/@angular/core',
				version: window.document.querySelector('[ng-version]')!.getAttribute('ng-version') ?? 'unknown',
			});
			break;

		// React
		case Object.prototype.hasOwnProperty.call(window, 'React'):
			frameworkList.push({
				name: 'react',
				url: 'https://reactjs.org/',
				npm: 'https://www.npmjs.com/package/react',
				version: 'unknown',
			});
			break;

		// Ember.js
		case Object.prototype.hasOwnProperty.call(window, 'Ember'):
			frameworkList.push({
				name: 'emberjs',
				url: 'https://emberjs.com/',
				npm: 'https://www.npmjs.com/package/ember-source',
				version: 'unknown',
			});
			break;

		// Vue
		case Object.prototype.hasOwnProperty.call(window, '__VUE__'):
			frameworkList.push({
				name: 'vue',
				url: 'https://vuejs.org/',
				npm: 'https://www.npmjs.com/package/vue',
				version: 'unknown',
			});
			break;

		// Gatsby
		case Boolean(document.querySelector('#___gatsby')):
			frameworkList.push({
				name: 'gatsby',
				url: 'https://www.gatsbyjs.org/',
				npm: 'https://www.npmjs.com/package/gatsby',
				version: 'unknown',
			});
			break;

		// Nuxt.js
		case Object.prototype.hasOwnProperty.call(window, '__NUXT__'):
			frameworkList.push({
				name: 'nuxt',
				url: 'https://nuxtjs.org/',
				npm: 'https://www.npmjs.com/package/nuxt',
				version: 'unknown',
			});
			break;

		// WordPress
		case Boolean(document.querySelector('link[rel="https://api.w.org/"]')) || document.querySelectorAll('link[href*="wp-includes"], script[src*="wp-includes"]').length > 0:
			frameworkList.push({
				name: 'wordpress',
				url: 'https://wordpress.org/',
				npm: '',
				version: 'unknown',
			});
			break;

		default: frameworkList = [];
	}

	return frameworkList;
};

const isValidHttpUrl = (url: string): boolean => {
	try {
		const newUrl = new URL(url);
		return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
	} catch {
		return false;
	}
};

const detectJsFramework = async (url: string): Promise<JsFramework> => {
	if (!isValidHttpUrl(url)) {
		throw new TypeError(`Error: ${url} is not a a valid HTTP URL`);
	}

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);
	const frameworkList: JsFramework = await page.evaluate(detect);
	await browser.close();
	return frameworkList;
};

export default detectJsFramework;
