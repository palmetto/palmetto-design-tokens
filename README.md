# Palmetto Design Tokens
[![npm version](https://badge.fury.io/js/%40palmetto%2Fpalmetto-design-tokens.svg)](https://badge.fury.io/js/%40palmetto%2Fpalmetto-design-tokens)

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


SASS Utility classes imported into a .scss file
(NOTE: SCSS and CSS utility classes are the same, we provide both if you wish to maintain consistency in file formats)
```
@import '~@palmetto/palmetto-design-tokens/build/utilities/utilities-color.scss'
@import '~@palmetto/palmetto-design-tokens/build/utilities/utilities-size.scss'
```

CSS Utility Classes imported into a .css file
```
@import '~@palmetto/palmetto-design-tokens/build/utilities/utilities-color.css'
@import '~@palmetto/palmetto-design-tokens/build/utilities/utilities-size.css'
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
* Size
  * Border Radius
  * Breakpoint
  * Spacing
  * Font


## Local Development
To build tokens locally run `npm run build` or `yarn build`

In order to test any local changes you'll need to build tokens, and symlink your local package into any project that consumes it. See [NPM link](https://docs.npmjs.com/cli/link) or [Yarn link](https://classic.yarnpkg.com/en/docs/cli/link/) for more details.


## Releases/Publishing
We use [semantic-release](https://github.com/semantic-release/semantic-release) for publishing new package versions. A release
will be published when there is a merge to the master branch and the release will be based on the commit message. Use the following conventions to trigger releases.

| Commit message                                                                                                                                                                                   | Release type               |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|
| `fix(pencil): stop graphite breaking when too much pressure applied`                                                                                                                             | Patch Release              |
| `feat(pencil): add 'graphiteWidth' option`                                                                                                                                                       | ~~Minor~~ Feature Release  |
| `perf(pencil): remove graphiteWidth option`<br><br>`BREAKING CHANGE: The graphiteWidth option has been removed.`<br>`The default graphite width of 10mm is always used for performance reasons.` | ~~Major~~ Breaking Release |


## How can I contribute to this project?
1. Find an issue that you are interested in addressing or a feature that you would like to add. See [Issues Page](https://github.com/palmetto/palmetto-design-tokens/issues). If you don't see any issues here, feel free to create one.

1. Fork the repository associated with the issue to your local GitHub organization. This means that you will have a copy of the repository under your-github-username/palmetto-design-tokens.
1. Clone the repository to your local machine using git clone https://github.com/palmetto/palmetto-design-tokens.git.
1. Create a new branch for your fix using git checkout -b my-awesome-feature.
1. Make the appropriate changes for the issue you are trying to address or the feature that you want to add.
1. Use git add insert-paths-of-changed-files-here to add the file contents of the changed files to the "snapshot" git uses to manage the state of the project, also known as the index.
1. Use git commit -m "Insert a short message of the changes made here" to store the contents of the index with a descriptive message.
1. Push the changes to the remote repository using git push origin my-awesome-feature.
1. Submit a pull request to the upstream repository.
1. Title the pull request with a short description of the changes made and the issue or bug number associated with your change. For example, you can title an issue like so "Added more log outputting to resolve #4352".
1. In the description of the pull request, explain the changes that you made, any issues you think exist with the pull request you made, and any questions you have for the maintainer.
1. Wait for the pull request to be reviewed by a maintainer.
1. Make changes to the pull request if the reviewing maintainer recommends them.
1. Celebrate your success after your pull request is merged!
