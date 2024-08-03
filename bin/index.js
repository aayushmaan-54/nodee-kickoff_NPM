#!/usr/bin/env node
const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const https = require('https');
const { exec } = require('child_process');
const colors = require('colors/safe');

const packages = [
  {
    name: 'express',
    type: 'prod',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/express',
      },
    ],
  },
  {
    name: 'lodash',
    type: 'prod',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/lodash',
      },
    ],
  },
  { name: 'dotenv', type: 'prod' },
  {
    name: 'body-parser',
    type: 'prod',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/body-parser',
      },
    ],
  },
  { name: 'axios', type: 'prod' },
  { name: 'axios-rate-limit', type: 'prod' },
  {
    name: 'mongoose',
    type: 'prod',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/mongoose',
      },
    ],
  },
  { name: 'nodemon', type: 'dev' },
  {
    name: 'jest',
    type: 'dev',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/jest',
      },
    ],
  },
  {
    name: 'eslint',
    type: 'dev',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content:
          'npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser',
      },
    ],
  },
  { name: 'date-fns', type: 'prod' },
  {
    name: 'passport',
    type: 'prod',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/passport',
      },
    ],
  },
  {
    name: 'cors',
    type: 'prod',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/cors',
      },
    ],
  },
  {
    name: 'uuid',
    type: 'prod',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/uuid',
      },
    ],
  },
  {
    name: 'bcrypt',
    type: 'prod',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/bcrypt',
      },
    ],
  },
  {
    name: 'jsonwebtoken',
    type: 'prod',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/jsonwebtoken',
      },
    ],
  },
  {
    name: 'node',
    type: 'prod',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/node',
      },
    ],
  },
  {
    name: 'winston',
    type: 'prod',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/winston',
      },
    ],
  },
  {
    name: 'supertest',
    type: 'dev',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/supertest',
      },
    ],
  },
  { name: 'prettier', type: 'dev' },
  {
    name: 'async',
    type: 'prod',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/async',
      },
    ],
  },
  {
    name: 'bluebird',
    type: 'prod',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/bluebird',
      },
    ],
  },
  {
    name: 'underscore',
    type: 'prod',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/underscore',
      },
    ],
  },
  { name: 'typeorm', type: 'prod' },
  {
    name: 'mocha',
    type: 'dev',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/mocha',
      },
    ],
  },
  {
    name: 'chai',
    type: 'dev',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/chai',
      },
    ],
  },
  { name: 'babel', type: 'dev' },
  { name: 'webpack', type: 'dev' },
  {
    name: 'gulp',
    type: 'dev',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/gulp',
      },
    ],
  },
  {
    name: 'grunt',
    type: 'dev',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/grunt',
      },
    ],
  },
  {
    name: 'helmet',
    type: 'prod',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/helmet',
      },
    ],
  },
  {
    name: 'compression',
    type: 'prod',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/compression',
      },
    ],
  },
  {
    name: 'joi',
    type: 'prod',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/joi',
      },
    ],
  },
  { name: 'yup', type: 'prod' },
  {
    name: 'pm2',
    type: 'prod',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/pm2',
      },
    ],
  },
  {
    name: 'redis',
    type: 'prod',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/redis',
      },
    ],
  },
  {
    name: 'socket.io',
    type: 'prod',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/socket.io',
      },
    ],
  },
  {
    name: 'swagger-ui-express',
    type: 'prod',
    additionalLogs: [
      {
        title: 'For TypeScript users',
        content: 'npm install --save-dev @types/swagger-ui-express',
      },
    ],
  },
  { name: 'typescript', type: 'dev' },
  { name: 'ts-node', type: 'dev' },
  { name: 'husky', type: 'dev' },
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
];


function getLatestVersionOfPackage(packageName) {
  return new Promise((resolve, reject) => {
    https.get(`https://registry.npmjs.org/${packageName}/latest`, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data).version);
        } else {
          reject(new Error(`Failed to fetch version for ${packageName}`));
        }
      });
    }).on('error', reject);
  });
}


async function promptForNPMPackages() {
  try {
    const { selectedPackages } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedPackages',
        message: colors.cyan('Select the packages you want to add:'),
        choices: packages.map(pkg => ({ name: `${pkg.name}`, value: pkg })),
      }
    ]);

    const confirmedPackages = [];

    for (const pkg of selectedPackages) {
      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: colors.yellow(`Do you want to add ${colors.bold(pkg.name)} as a ${colors.bold(pkg.type === 'dev' ? 'development' : 'production')} dependency?`),
          default: true,
        }
      ]);

      let packageToAdd = { ...pkg };

      if (!confirm) {
        packageToAdd.type = packageToAdd.type === 'dev' ? 'prod' : 'dev';
      }

      try {
        const version = await getLatestVersionOfPackage(packageToAdd.name);
        packageToAdd.version = version;
        confirmedPackages.push(packageToAdd);
        console.log(`${colors.green('✔')} Latest version of ${colors.bold(packageToAdd.name)}: ${colors.cyan.bold(version)}`);

        if (pkg.additionalLogs) {
          displayAdditionalLogs(pkg.additionalLogs, pkg.name);
        }

        if (packageToAdd.type !== pkg.type) {
          console.log(colors.yellow(`${colors.bold('⟲')} Toggled ${colors.bold(packageToAdd.name)} to ${colors.bold(packageToAdd.type === 'dev' ? 'development' : 'production')} dependency`));
        }

        if (pkg.postInstallScripts) {
          packageToAdd.postInstallScripts = pkg.postInstallScripts;
        }

      } catch (error) {
        console.error(colors.red(`Error fetching version for ${colors.bold(packageToAdd.name)}:`), error.message);
      }
    }

    if (pkg.additionalLogs) {
      displayAdditionalLogs(pkg.additionalLogs, pkg.name);
    }

    if (confirmedPackages.length > 0) {
      updatePackageJson(confirmedPackages);
    } else {
      console.log(colors.yellow.bold('No packages were selected for installation.'));
      console.log(colors.cyan('Adding Node.js and Nodemon to package.json...'));
      Promise.all([
        getLatestVersionOfPackage('node'),
        getLatestVersionOfPackage('nodemon')
      ]).then(([nodeVersion, nodemonVersion]) => {
        updatePackageJson([
          { name: 'node', type: 'prod', version: nodeVersion },
          { name: 'nodemon', type: 'dev', version: nodemonVersion }
        ]);
      }).catch(error => {
        console.error(colors.red('Error fetching versions:'), error.message);
      });
    }
  } catch (error) {
    console.error(colors.red.bold('Error prompting for packages:'), error.message);
  }
}


function displayAdditionalLogs(logs, packageName) {
  console.log(colors.underline.cyan.bold(`\nAdditional steps for ${packageName}:`));
  logs.forEach((log, index) => {
    console.log(`\n${colors.yellow.underline(`${index + 1}. ${log.title}`)}`);
    console.log(colors.white(log.content));
  });
}


const validateAndFormatProjectName = (name) => {
  let formattedName = name.toLowerCase()
    .replace(/[^a-z0-9-~ ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, '');

  if (!/^[a-z0-9]/.test(formattedName)) {
    formattedName = `a${formattedName}`;
  }

  formattedName = formattedName.slice(0, 214);

  return formattedName;
};


async function promptForNPMPackages() {
  try {
    const { selectedPackages } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedPackages',
        message: colors.cyan('Select the packages you want to add:'),
        choices: packages.map(pkg => ({ name: `${pkg.name}`, value: pkg })),
      }
    ]);

    const confirmedPackages = [];

    for (const pkg of selectedPackages) {
      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: colors.yellow(`Do you want to add ${colors.bold(pkg.name)} as a ${colors.bold(pkg.type === 'dev' ? 'development' : 'production')} dependency?`),
          default: true,
        }
      ]);

      if (confirm) {
        try {
          const version = await getLatestVersionOfPackage(pkg.name);
          confirmedPackages.push({ ...pkg, version });
          console.log(`${colors.green('✔')} Latest version of ${colors.bold(pkg.name)}: ${colors.cyan.bold(version)}`);

          if (pkg.externalDependencies) {
            for (const extDep of pkg.externalDependencies) {
              const extVersion = await getLatestVersionOfPackage(extDep.name);
              confirmedPackages.push({ ...extDep, version: extVersion });
              console.log(`${colors.blue('➕')} Added external dependency ${colors.bold(extDep.name)}: ${colors.cyan.bold(extVersion)}`);
            }
          }
        } catch (error) {
          console.error(colors.red(`Error fetching version for ${colors.bold(pkg.name)}:`), error.message);
        }
      } else {
        pkg.type = pkg.type === 'dev' ? 'prod' : 'dev';
        const version = await getLatestVersionOfPackage(pkg.name);
        confirmedPackages.push({ ...pkg, version });
        console.log(colors.yellow(`${colors.bold('⟲')} Toggled ${colors.bold(pkg.name)} to ${colors.bold(pkg.type === 'dev' ? 'development' : 'production')} dependency`));
        console.log(`${colors.green('✔')} Latest version of ${colors.bold(pkg.name)}: ${colors.cyan.bold(version)}`);

        if (pkg.externalDependencies) {
          for (const extDep of pkg.externalDependencies) {
            const extVersion = await getLatestVersionOfPackage(extDep.name);
            confirmedPackages.push({ ...extDep, version: extVersion });
            console.log(`${colors.blue('➕')} Added external dependency ${colors.bold(extDep.name)}: ${colors.cyan.bold(extVersion)}`);
          }
        }
      }
    }

    if (confirmedPackages.length > 0) {
      updatePackageJson(confirmedPackages);
    } else {
      console.log(colors.yellow.bold('No packages were selected for installation.'));
      console.log(colors.cyan('Adding Node.js and Nodemon to package.json...'));
      Promise.all([
        getLatestVersionOfPackage('node'),
        getLatestVersionOfPackage('nodemon')
      ]).then(([nodeVersion, nodemonVersion]) => {
        updatePackageJson([
          { name: 'node', type: 'prod', version: nodeVersion },
          { name: 'nodemon', type: 'dev', version: nodemonVersion }
        ]);
      }).catch(error => {
        console.error(colors.red('Error fetching versions:'), error.message);
      });
    }
  } catch (error) {
    console.error(colors.red.bold('Error prompting for packages:'), error.message);
  }
}



async function updatePackageJson(selectedPackages) {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  let packageJson;

  if (!fs.existsSync(packageJsonPath)) {
    console.log('package.json not found. Creating a new one...');
    packageJson = createDefaultPackageJson();
  } else {
    packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  }

  if (!packageJson.dependencies) {
    packageJson.dependencies = {};
  }
  if (!packageJson.devDependencies) {
    packageJson.devDependencies = {};
  }

  selectedPackages.forEach(pkg => {
    const dependencyType = pkg.type === 'dev' ? 'devDependencies' : 'dependencies';
    packageJson[dependencyType][(pkg.name)] = `^${pkg.version}`;
    console.log(`Added ${pkg.name}@${pkg.version} to ${dependencyType} in package.json`);
  });

  selectedPackages.forEach(pkg => {
    const existingType = pkg.type === 'dev' ? 'dependencies' : 'devDependencies';
    if (packageJson[existingType] && packageJson[existingType][(pkg.name)]) {
      delete packageJson[existingType][(pkg.name)];
      console.log(`Removed ${pkg.name} from ${existingType} in package.json`);
    }
  });

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('package.json has been updated with selected packages.');

  try {
    await installPackages(selectedPackages);
  } catch (error) {
    console.error('Failed to install packages:', error);
  }
}


function createLoader(message) {
  const characters = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let i = 0;

  return setInterval(() => {
    process.stdout.write(`\r${colors.cyan.bold(characters[i])} ${colors.yellow.bold(message)}`);
    i = (i + 1) % characters.length;
  }, 80);
}


async function runPostInstallScripts(scripts) {
  return new Promise((resolve, reject) => {
    const runScript = (index) => {
      if (index >= scripts.length) {
        resolve();
        return;
      }

      const script = scripts[index];
      console.log(`\nRunning post-installation script: ${colors.green(script)}`);

      const loader = createLoader('Running post-installation script...');

      exec(script, (error, stdout, stderr) => {
        clearInterval(loader);
        process.stdout.write('\r\x1b[K');

        if (error) {
          console.error(`${colors.red('Error running script:')} ${error.message}`);
          reject(error);
          return;
        }
        if (stderr) {
          console.error(`${colors.yellow('Script stderr:')} ${stderr}`);
        }
        console.log(`${colors.green('Script output:')} ${stdout}`);
        runScript(index + 1);
      });
    };

    runScript(0);
  });
}


async function installPackages(selectedPackages) {
  return new Promise((resolve, reject) => {
    console.log(colors.cyan('Starting package installation...'));
    const loader = createLoader('Installing packages...');

    exec('npm install', async (error, stdout, stderr) => {
      clearInterval(loader);
      process.stdout.write('\r\x1b[K');

      if (error) {
        console.error(`${colors.red('Error during installation:')} ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`${colors.yellow('Installation stderr:')} ${stderr}`);
      }
      console.log(colors.green('Installation completed successfully!'));
      console.log(`${colors.cyan('Installation details:')}\n${stdout}`);

      for (const pkg of selectedPackages) {
        if (pkg.postInstallScripts) {
          try {
            await runPostInstallScripts(pkg.postInstallScripts);
          } catch (error) {
            console.error(`${colors.red(`Error running post-install scripts for ${pkg.name}:`)} ${error}`);
          }
        }

        if (pkg.additionalLogs) {
          displayAdditionalLogs(pkg.additionalLogs, pkg.name);
        }
      }

      resolve();
    });
  });
}


function createDefaultPackageJson() {
  const rawName = path.basename(process.cwd());
  const validatedName = validateAndFormatProjectName(rawName);

  return {
    name: validatedName,
    version: '1.0.0',
    description: '',
    main: 'index.js',
    scripts: {
      dev: 'nodemon index.js',
      start: 'node index.js',
      test: 'echo "Error: no test specified" && exit 1'
    },
    keywords: [],
    author: '',
    license: 'ISC',
    dependencies: {},
    devDependencies: {}
  };
}

promptForNPMPackages();