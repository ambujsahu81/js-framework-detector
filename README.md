# Js-Framework-Detector

> Detects which JS Framework is used in a Website.

It can be integrated smoothly with the following environments 

- Any environment supporting JavaScript (e.g. Node.js or React Native)
- Any Chrome and Firefox-compatible browser extension.

Try the live [demo]()

## Install

```sh
npm install js-framework-detector
```

## Usage

```js
import detectJsFramework from "js-framework-detector";

const frameworkArray = await detectJsFramework('https://material.angular.io/');
console.log("frameworkArray"); 
// output
[
  {
    name: 'angular',
    url: 'https://angular.io/',
    npm: 'https://www.npmjs.com/package/@angular/core',
    version: '15.1.1'
  }
]

const frameworkArray = await detectJsFramework('https://wiredelta.com/');
console.log("frameworkArray"); 
// output
[
  {
    name: 'wordpress',
    url: 'https://wordpress.org/',
    npm: '',
    version: 'unknown'
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
- Vue
- Gatsby
- Nuxt.js
- WordPress

## Related


- [Library-Detector-for-Chrome](https://github.com/johnmichel/Library-Detector-for-Chrome) -The Library Detector extension discovers which JavaScript libraries are being utilized on webpages
