import { isBrowser } from 'browser-or-node';
import puppeteer from 'puppeteer';
import {libraries, LibraryDetector} from './library.js'

type JsFramework = Array<{name: any; url: string; npm: string; version: string}>;

const detect = (libraries: Record<string, LibraryDetector>): JsFramework => {
	let frameworkList: JsFramework = [];
	for (const key in libraries) {
		const newFn = new Function(`return ${libraries[key]!.test}`)();
		const version = newFn(window);
		if (Boolean(version)) {
			frameworkList.push({
				name: libraries[key]?.id,
				url: libraries[key]?.url!,
				npm: libraries[key]?.npm!,
				version: version?.version
			});
		}		
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

	if (isBrowser) {
        // The detection strategy for extension 
        const frameworkList = detect(libraries);
        return frameworkList;
    }
    // The detection strategy for any node application
	
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);
	const frameworkList: JsFramework = await page.evaluate(
		(list: Record<string, LibraryDetector>, fn: string) => {
			const newFn = new Function(`return ${fn}`)();
			return newFn(list);
		  },
		  libraries,
		  detect.toString()
		);
	await browser.close();
	return frameworkList;
};

export default detectJsFramework;
