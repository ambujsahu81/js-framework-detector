
export interface LibraryDetector {
	id: string;
	icon: string;
	url: string;
	npm?: string | undefined;
	test: string;
}

export const libraries: Record<string, LibraryDetector> = {
	'jQuery': {
		id: 'jquery',
		icon: 'jquery',
		url: 'http://jquery.com',
		npm: 'jquery',
		test: function(win: any) {
			const jq = win.jQuery! || win.$;
			if (jq && jq.fn && jq.fn.jquery) {
				return {version: jq.fn.jquery.replace(/[^\d+.]/g, '') || undefined};
			}

			return false;
		}.toString(),
	},

	'React': {
		id: 'react',
		icon: 'react',
		url: 'https://reactjs.org/',
		npm: 'react',
		test: function(win: any) {
			function isMatch(node: Node | undefined) {
				return node != undefined && (node as any)._reactRootContainer != undefined;
			}

			function nodeFilter(node: Node) {
				return isMatch(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
			}

			const reactRoot: any = document.querySelector('#react-root');
			const altHasReact: any = document.querySelector('*[data-reactroot]');
			const bodyReactRoot = isMatch(document.body) || isMatch((document.body.firstElementChild) as any);
			const hasReactRoot = bodyReactRoot || document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, nodeFilter).nextNode() != undefined;

			if (hasReactRoot || reactRoot && (reactRoot as any).innerText.length > 0 || altHasReact || win.React && win.React.Component) {
				return {version: win.React && win.React.version || undefined};
			}

			return false;
		}.toString(),
	},

  'Remix': {
    id: 'remix',
    icon: 'remix',
    url: 'https://remix.run/',
    npm: 'remix',
    test: function (win: any) {
      if (win.__remixContext) {
        return { version: null };
      }
      return false;
    }.toString()
  },

	'Next.js': {
		id: 'next',
		icon: 'next',
		url: 'https://nextjs.org/',
		npm: 'next',
		test: function(win: any) {
			if (win.__NEXT_DATA__ && win.__NEXT_DATA__.buildId) {
				return {version: win.next && win.next.version || undefined};
			}

			return false;
		}.toString(),
	},

	'Angular': {
		id: 'angular',
		icon: 'angular',
		url: 'https://angular.io/',
		npm: '@angular/core',
		test: function(win: any) {
			const ngVersion = win.document.querySelector('[ng-version]');
			if (ngVersion) {
				return {version: ngVersion.getAttribute('ng-version') || undefined};
			}

			if (win.ng && win.ng.probe instanceof Function) {
				return {version: undefined};
			}

			return false;
		}.toString(),
	},

	'Ember.js': {
		id: 'emberjs',
		icon: 'emberjs',
		url: 'https://emberjs.com/',
		npm: 'ember-source',
		test: function(win: any) {
			const ember = win.Ember || win.Em;
			if (ember && ember.GUID_KEY) {
				return {version: ember.VERSION || undefined};
			}

			return false;
		}.toString(),
	},
	'Nuxt.js': {
		id: 'nuxt',
		icon: 'nuxt',
		url: 'https://nuxtjs.org/',
		npm: 'nuxt',
		test: function(win: any) {
			if (win.__NUXT__ || win.$nuxt || [...win.document.querySelectorAll('*')].some(element => element.__vue__?.nuxt)) {
				return {version: undefined};
			}

			return false;
		}.toString(),
	},
	'Nuxt.js (Fast path)': {
		id: 'nuxt-fast',
		icon: 'nuxt',
		url: 'https://nuxtjs.org/',
		npm: 'nuxt',
		test: function(win: any) {
			if (win.__NUXT__ || win.$nuxt) {
				return {version: undefined};
			}

			return false;
		}.toString(),
	},
	'Moment.js': {
		id: 'momentjs',
		icon: 'momentjs',
		url: 'http://momentjs.com/',
		npm: 'moment',
		test: function(win: any) {
			if (win.moment && (win.moment.isMoment || win.moment.lang)) {
				return {version: win.moment.version || undefined};
			}

			return false;
		}.toString(),
	},
	'Gatsby': {
		id: 'gatsby',
		icon: 'gatsby',
		url: 'https://www.gatsbyjs.org/',
		npm: 'gatsby',
		test: function(win: any) {
			if (win.document.querySelector('#___gatsby')) {
				return {version: undefined};
			}

			return false;
		}.toString(),
	},
	'Shopify': {
		id: 'shopify',
		icon: 'shopify',
		url: 'https://www.shopify.com/',
		npm: undefined,
		test: function(win: any) {
			if (win.Shopify && win.Shopify.shop) {
				return {version: undefined};
			}

			return false;
		}.toString(),
	},
	'WordPress': {
		id: 'wordpress',
		icon: 'wordpress',
		url: 'https://wordpress.org/',
		npm: undefined,
		test: function(win: any) {
			const hasAPILinkElement = Boolean(win.document.querySelector('link[rel="https://api.w.org/"]'));
			const hasWPIncludes = win.document.querySelectorAll('link[href*="wp-includes"], script[src*="wp-includes"]').length > 0;

			if (!hasAPILinkElement && !hasWPIncludes) {
				return false;
			}

			const generatorMeta = win.document.querySelector('meta[name=generator][content^="WordPress"]');
			const version = generatorMeta ? generatorMeta.getAttribute('content')!.replace(/^\w+\s/, '') : undefined;

			return {version};
		}.toString(),
	},
	'Wix': {
		id: 'wix',
		icon: 'wix',
		url: 'https://www.wix.com/',
		npm: undefined,
		test: function(win: any) {
			if (win.wixPerformanceMeasurements && win.wixPerformanceMeasurements.info) {
				return {version: undefined};
			}

			if (win.wixBiSession && win.wixBiSession.info) {
				return {version: undefined};
			}

			return false;
		}.toString(),
	},
	'Wiz': {
		id: 'wiz',
		icon: 'icon38',
		url: 'https://github.com/johnmichel/Library-Detector-for-Chrome/pull/147',
		npm: undefined,
		test: function(win: any) {
			if ((win.document).__wizdispatcher) {
				return {version: undefined};
			}

			return false;
		}.toString(),
	},
	'core-js': {
		id: 'corejs',
		icon: 'icon38',
		url: 'https://github.com/zloirock/core-js',
		npm: 'core-js',
		test: function(win: any) {
			const shared = win['__core-js_shared__'];
			const core = win.core;
			if (shared) {
				const versions = shared.versions;
				return {version: Array.isArray(versions) ? versions.map(it => `core-js-${it.mode}@${it.version}`).join('; ') : undefined};
			}

			if (core) {
				return {version: core.version || undefined};
			}

			return false;
		}.toString(),
	},
	'Drupal': {
		id: 'drupal',
		icon: 'drupal',
		url: 'https://www.drupal.org/',
		npm: undefined,
		test: function(win: any): {version: string | undefined} | false {
			const generatorMeta = document.querySelector('meta[name="generator"][content^="Drupal"]');

			// Detect Drupal resources patterns
			const resDrupal = /\/sites\/(?:default|all)\/(?:themes|modules|files)/;
			const res = Array.from(document.querySelectorAll('link,style,script') || []);

			if (res.some(s => resDrupal.test((s as any).src)) || res.some(s => resDrupal.test((s as any).href))
        || generatorMeta || (win.Drupal && win.Drupal.behaviors)) {
				return {version: undefined};
			}

			return false;
		}.toString(),
	},
	'Guess.js': {
		id: 'guessjs',
		icon: 'guessjs',
		url: 'https://guess-js.github.io/',
		test: function(win: any): {version: string | undefined} | false {
			if (win.__GUESS__ && win.__GUESS__.guess) {
				return {version: undefined};
			}

			return false;
		}.toString(),
	},

};
