# <img width="438" align="right" src="https://user-images.githubusercontent.com/118078892/219959419-e94051e2-9a0f-4fdd-a262-1c5e6394459f.png"> Js-Framework-Detector

> Detects which JS Framework is used in a Website.

It can be integrated smoothly with the following environments 

- Any environment supporting JavaScript (e.g. Node.js or React Native)
- Any Chrome and Firefox-compatible browser extension.

Try the live [demo](https://ambujsahu81.github.io/js-framework-detector/)

## Install

```sh
npm install js-framework-detector
```

## Usage

```js
import detectJsFramework from "js-framework-detector";

const frameworkArray = await detectJsFramework('https://www.producthunt.com/');
console.log(frameworkArray); 
// output
[
{
    name: 'next',
    url: 'https://nextjs.org/',
    npm: 'next',
    version: '13.0.6'
  },
]

const frameworkArray = await detectJsFramework('https://reactjs.org/');
console.log("frameworkArray"); 
// output
[
  {
    name: 'react',
    url: 'https://reactjs.org/',
    npm: 'react',
    version: '17.0.2'
  },
  { name: 'gatsby', url: 'https://www.gatsbyjs.org/', npm: 'gatsby' },
  {
    name: 'corejs',
    url: 'https://github.com/zloirock/core-js',
    npm: 'core-js',
    version: 'core-js-global@3.6.5'
  }
]
```

##  Currently supports:

- JQuery
- Next.js
- Remix
- Angular
- React
- Ember.js
- Gatsby
- Nuxt.js
- WordPress

## Related


- [Library-Detector-for-Chrome](https://github.com/johnmichel/Library-Detector-for-Chrome) -The Library Detector extension discovers which JavaScript libraries are being utilized on webpages
