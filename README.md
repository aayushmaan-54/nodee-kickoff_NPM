# Nodee KickOff

![Twitter](https://img.shields.io/twitter/follow/aayushmaan54.svg?style=social&label=aayushmaan54)
![npm](https://img.shields.io/npm/v/nodee-kickoff.svg?style=for-the-badge)
![NPM](https://img.shields.io/npm/l/nodee-kickoff.svg?label=%F0%9F%93%9Clicense&style=for-the-badge)
[![npm](https://img.shields.io/npm/dt/nodee-kickoff.svg)](https://www.npmjs.com/package/nodee-kickoff)

Nodee KickOff is a package that quickly allows you to set up a Node project by prompting for commonly used Node packages.

## Installation

To use Nodee KickOff, run the following command:

```
npx nodee-kickoff@latest
```

## Features

- Provides a selection of commonly used npm packages relevant to Node projects
- Automatically installs dependencies according to development or production requirements
- Allows users to toggle dependency installation by typing 'y' or 'n' in the terminal for each package
- Automatically installs extra dependencies required by selected packages
- Logs additional setup instructions for packages that require extra configuration

## How It Works

The script uses a predefined list of packages with their associated information. Here's an example of how a package is defined in the `bin/index.js` file:

```javascript
const packages = [
  {
    name: 'tailwindcss',
    type: 'dev',
    externalDependencies: [
      { name: 'postcss', type: 'dev' },
      { name: 'autoprefixer', type: 'dev' },
    ],
    postInstallScripts: ['npx tailwindcss init -p'],
    additionalLogs: [
      {
        title: 'Add Tailwind directives to your CSS',
        content: `
Add the following lines to your CSS file:
@tailwind base;
@tailwind components;
@tailwind utilities;
        `.trim(),
      },
      {
        title: 'Configure your template paths',
        content: `
Add the following configuration to your tailwind.config.js file:
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
        `.trim(),
      },
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/tailwindcss',
      },
    ],
  },
  // ... other packages
];
```

Users can easily add new packages to this list by following the same structure.

## Contributing

If you'd like to contribute to Nodee KickOff, please feel free to submit pull requests or open issues on the GitHub repository.


## Author

Created by [Aayushmaan](https://twitter.com/aayushmaan54)

---

For more information and updates, please check the [npm package page](https://www.npmjs.com/package/nodee-kickoff).