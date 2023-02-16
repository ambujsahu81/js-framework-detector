import test from 'ava';
import detectJsFramework from './index.js';

test.serial('should detect js framework as remix', async t => {
	t.is(await detectJsFramework('https://remix.run/'), 'remix');
});

