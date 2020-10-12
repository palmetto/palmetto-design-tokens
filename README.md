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
  * Brand
  * Font
  * Border
* Size
  * Border
  * Border Radius
  * Breakpoint
  * Spacing
  * Font
  * Width
  * Height
  * Box Shadow
  * Opacity
  * Z-Index
  * Line-Height


## Local Development
To build tokens locally run `npm run build` or `yarn build`. NOTE: you will need a local `.env` file with a Figma access token assigned to `FIGMA_PERSONAL_ACCESS_TOKEN`. See [HOW TO GET A FIGMA ACCESS TOKEN](https://www.figma.com/developers/api#authentication). If you are 
still unsure how to get a working access token, or the process is not working for you, please reach out to one of our library owners.

In order to test any local changes you'll need to build tokens, and symlink your local package into any project that consumes it. See [NPM link](https://docs.npmjs.com/cli/link) or [Yarn link](https://classic.yarnpkg.com/en/docs/cli/link/) for more details.


## Updating Tokens
While style-dictionary typically builds tokens off of raw JSON files, in our case we are actually pulling token names and values directly from a Figma file
so visual designers can make changes and publish them as tokens. The build process will read the file (The id is a constant in the `build.js` file).

In order to make changes to tokens, you'll need to open the [Design Tokens](https://www.figma.com/file/abGRptpr7iPaMsXdEPVm6W/Design-Tokens) file. Once you've made your changes, Save a new Version of the file in Figma by going to the hamburger menu --> File --> Save to version history...

This will create a new version of the same file. The File ID will remain the same, but you should now be able to go to your file version, and extract the version ID from the URL in the browser. Replace the existing `FIGMA_FILE_VERSION` constant in `build.js` and run a build to confirm that your version is working correctly.


## Releases
[↥ back to top](#top)

Palmetto Components uses the [semantic-release](https://github.com/semantic-release/semantic-release) npm package to fully automate the release workflow. Instead of manually updating the release version in `package.json`, and creating a new release tag in GitHub for each release, they are automatically triggered by prefixing the commit message when merging to `main`. Upon triggering a release, the package version is bumped depending on the type specified, a release tag is created in GitHub, and the new version is automatically published to [npm](https://www.npmjs.com/).

For e.g., opening a PR to main with the commit message `fix: Resolve bug`, will trigger a minor release and bump the package's version from `0.0.0` to `0.0.1`. Opening a PR with `feat(Table): Finalize tests` will trigger a feature release and bump the package's version from `0.0.0` to `0.1.0`.

The link above provides full documentation for this workflow. However, a comprehensive list of the prefix types, and their intended uses are provide below for quick reference:

### Release Types
Must be one of the following:

### Major
* **BREAKING CHANGE**: A set of breaking changes.

### Minor
* **feat**: A new feature

### Patch
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **ci**: A change to our CI pipelines/workflows.
* **build**: A change to the library build process (That does not break the consumer API).
* **test**: Added or improved testing in some area of the library.
* **refactor**: Changed code structure without affecting features.
* **docs**: Added to, or improved documentation.
* **style**: Change in code style without affecting features.


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
