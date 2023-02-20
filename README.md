# <img width="438" align="right" src="https://user-images.githubusercontent.com/118078892/220064576-09a86ea4-c830-456e-9a12-def69fbfe896.png"> Js-Framework-Detector

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

## Contributing

If you have suggestions you can open an issue, or even create a pull request! It will be reviewd as soon as possible. Thank you!
