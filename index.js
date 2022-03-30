const fs = require('fs');
const { resolve } = require('path');

const writeJSON = async (path, data) => {
  if (typeof data !== 'object') throw new Error('Invalid Data');

  await createDirectoryIfNotExists(path);

  fs.writeFileSync(resolve(path), JSON.stringify(data));

  return new Promise((resolve) => resolve());
};

const createDirectoryIfNotExists = (path) => {
  const pathBasename = resolve('./', path);

  console.log({ pathBasename });

  if (!fs.existsSync(pathBasename)) {
    const createdPath = fs.mkdirSync(pathBasename, { recursive: true });

    console.log('Folder Created Successfully.');

    return new Promise((resolve) => resolve(createdPath));
  }
};

module.exports = {
  // Do not modify the names of the exports
  writeJSON: writeJSON,
  createDirectoryIfNotExists,
};
