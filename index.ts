import axios from 'axios';
// Import {load} from 'cheerio';

const detect = (pageHtml: string): string => {
	const jsFramework: string[] = [];
	// Const $ = load(pageHtml);

	switch (true) {
		case pageHtml.includes('__remixContext'): jsFramework.push('remix');
			break;
		default: jsFramework.push('no case detected');
	}

	return jsFramework.join(',');
};

const scrapper = async (url: string): Promise<string> => {
	try {
		const reponse = await axios.get(url);
		return reponse.data as string;
	} catch {
		throw new TypeError(`Error: failed to read data of ${url}`);
	}
};

const isValidHttpUrl = (url: string): boolean => {
	try {
		const newUrl = new URL(url);
		return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
	} catch {
		return false;
	}
};

const detectJsFramework = async (url: string): Promise<string> => {
	if (!isValidHttpUrl(url)) {
		throw new TypeError(`Error: ${url} is not a a valid HTTP URL`);
	}

	const pageHtml: string = await scrapper(url);
	if (!pageHtml) {
		throw new TypeError(`Error: Enable to detect js framework of given url ${url}`);
	}

	const jsFramework: string = detect(pageHtml);
	return jsFramework;
};

export default detectJsFramework;
