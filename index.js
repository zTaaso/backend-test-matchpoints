const fs = require('fs');
const { resolve, dirname } = require('path');

const writeJSON = async (path, data) => {
  if (typeof data !== 'object') throw new Error('Invalid Data');

  await createDirectoryIfNotExists(dirname(path));

  fs.writeFileSync(resolve(path), JSON.stringify(data));

  return new Promise((resolve) => resolve());
};

const createDirectoryIfNotExists = (path) => {
  const pathBasename = resolve('./', path);

  if (!fs.existsSync(pathBasename)) {
    const createdPath = fs.mkdirSync(pathBasename, { recursive: true });

    return new Promise((resolve) => resolve(createdPath));
  }
};

module.exports = {
  // Do not modify the names of the exports
  writeJSON: writeJSON,
  createDirectoryIfNotExists,
};
