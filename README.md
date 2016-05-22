# personal-website

This repo contains the code used for my [personal website](http://clementprodhomme.fr).

![Screenshot of the webpage](https://raw.githubusercontent.com/clementprdhomme/personal-website/master/README_hero.png)

## Run locally

Before everything, install the Node modules and gulp globally:
```
npm install
npm install -g gulp
```

After type `npm run start` in a terminal and there you go.

A new tab will be open in your browser at `localhost:3000` but you won't be able to see anything as the website is localized in three languages: English, Spanish and French. To see each individual versions, go to `/index-{{en|es|fr}}.html`.

## Reuse the code

### I18n

The only html file is `src/index.html` which compiles several copies into `dist/` according to the languages you want to support. To add a new one, add a new folder in `src/lang/` with the name of the new language. Inside it, create an `index.json` file with all the translations you need.

These translations can be used in your HTML files with the special markup of the plugin [gulp-html-i18n](https://github.com/webyom/gulp-html-i18n). Please refer to it to see the options.

### htaccess

Note that the repo comes with an advanced `.htaccess` file to nicely rewrite the URLs. The rules are easy and commented. Here is the summary:

- A request to `/` will redirect the users to `/{{en|es|fr}}` depending on the language set by the browser
- Loading `/{{en|es|fr}}` will load the file `/index-{{en|es|fr}}.html`
- All the other assets are loaded from the root folder
- 404 errors redirect to the root path

### Miscellaneous

Please take care to remove all the references to the analytics tool used by the website. If you wanna take a look at it, see [Piwik](http://piwik.org).

## License

The MIT License (MIT)

Copyright (c) 2016 Clément Prod'homme

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
