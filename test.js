import test from 'ava';
import detectJsFramework from './index.js';

test.serial('should detect js framework as remix', async t => {
	const frameworkArray = await detectJsFramework('https://remix.run/');
	t.deepEqual(frameworkArray[0], {
		name: 'remix',
		url: 'https://remix.run/',
		npm: 'https://www.npmjs.com/package/remix',
		version: 'unknown',
	});
});

test.serial('should detect js framework as Angular', async t => {
	const frameworkArray = await detectJsFramework('https://angular.io/');
	t.is(frameworkArray[0].name, 'angular');
});

test.serial('should detect js framework as React', async t => {
	const frameworkArray = await detectJsFramework('https://reactjs.org/');
	t.is(frameworkArray[0].name, 'react');
});

test.serial('should detect js framework as JQuery', async t => {
	const frameworkArray = await detectJsFramework('http://jquery.com');
	t.is(frameworkArray[0].name, 'jquery');
});

test.serial('should detect js framework as Next.js', async t => {
	const frameworkArray = await detectJsFramework('https://nextjs.org/');
	t.is(frameworkArray[0].name, 'next');
});

test.serial('should detect js framework as Ember.js', async t => {
	const frameworkArray = await detectJsFramework('https://emberjs.com/');
	t.is(frameworkArray[0].name, 'emberjs');
});

test.serial('should detect js framework as Vue', async t => {
	const frameworkArray = await detectJsFramework('https://vuejs.org/');
	t.is(frameworkArray[0].name, 'vue');
});

test.serial('should detect js framework as Gatsby', async t => {
	const frameworkArray = await detectJsFramework('https://www.gatsbyjs.org/');
	t.is(frameworkArray[0].name, 'gatsby');
});

test.serial('should detect js framework as Nuxt.js', async t => {
	const frameworkArray = await detectJsFramework('https://nuxtjs.org/');
	t.is(frameworkArray[0].name, 'nuxt');
});

test.serial('should detect js framework as WordPress', async t => {
	const frameworkArray = await detectJsFramework('https://wordpress.org/');
	t.is(frameworkArray[0].name, 'wordpress');
});

// Random website tests

test.serial('should detect js framework as jquery for azure devops', async t => {
	const frameworkArray = await detectJsFramework('https://wiredelta.com/');
	t.is(frameworkArray[0].name, 'jquery');
});
