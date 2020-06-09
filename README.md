# Palmetto Design Tokens
A central location to store shared attributes of the Palmetto Design System. These attributes include: colors, fonts, spacing, and more. Using [Amazon's Style Dictionary](https://amzn.github.io/style-dictionary/) we transform attributes into usable variables for a variety of platforms.


## Usage
#### Install The package in your project
```
npm install @palmetto/palmetto-design-tokens
```
or
```
yarn add @palmetto/palmetto-design-tokens
```


#### Import tokens into your project based on your platform requirements
Ideally you'd want to import them into a file that exposes them to your entire application.

SASS Variables imported into a .scss file
```
@import '~@palmetto/palmetto-design-tokens/build/scss/tokens.scss'
```

CSS Variables imported into a .css file
```
@import '~@palmetto/palmetto-design-tokens/build/css/tokens.css'
```


#### Use variables as needed
SCSS
```
.class-with-primary-text-color: { color: $color.brand.primary.base; }
$my-own-shadow-variable: 1rem 1rem $color.base.black;
```

CSS
```
.class-with-primary-text-color: { color: var(--color.brand.primary.base); }
--my-own-shadow-variable: 1rem 1rem var(--color.base.black);
```


## Available Tokens
* Color
  * Base
  * Brand


## Local Development
To build tokens locally run `npm run build` or `yarn build`

In order to test any local changes you'll need to build tokens, and symlink your local package into any project that consumes it. See [NPM link](https://docs.npmjs.com/cli/link) or [Yarn link](https://classic.yarnpkg.com/en/docs/cli/link/) for more details.
