const chai = require('chai');
const app = require('../index');
const should = chai.should();
const path = require('path');
const utils = require('./utils');
const DIR_PATH = path.resolve('./');
const contents = require('../data-store');
const uuid = require('uuid');
const dirs = ['/logs', "/" + uuid.v4(), "/tmp/logs"];


describe('file_system_write_basics', () => {

    afterEach((done) => {
        utils.cleanUp(dirs, DIR_PATH)
            .then(() => {
                done();
            })
    });

    it('should create a new directory', done => {
        const dirPath = DIR_PATH + dirs[0];
        app.createDirectoryIfNotExists(dirPath)
            .then((res) => {
                return utils.checkDir(dirPath)
            })
            .then(() => {
                done()
            })
    });

    it('should create a recursive directory', done => {
        const dirPath = DIR_PATH + dirs[2];
        app.createDirectoryIfNotExists(dirPath)
            .then((res) => {
                return utils.checkDir(dirPath)
            })
            .then(() => {
                done()
            })
    });

    it('should create a dynamic directory', done => {
        const dirPath = DIR_PATH + dirs[1];
        app.createDirectoryIfNotExists(dirPath)
            .then((res) => {
                return utils.checkDir(dirPath)
            })
            .then(() => {
                done()
            })
    });


    it('should create a directory and write the file inside the directory', done => {
        const dirPath = DIR_PATH + dirs[1];
        const filePath = dirPath + '/data.json';
        app.createDirectoryIfNotExists(dirPath)
            .then(() => {
                return app.writeJSON(filePath, contents);
            })
            .then(() => {
                return utils.readFile(filePath, true);
            })
            .then(data => {
                data.should.eql(contents);
                done();
            })
    });

    it('should write a file inside a recursive directory', done => {
        const dirPath = DIR_PATH + dirs[2];
        const filePath = dirPath + '/data.json';
        app.createDirectoryIfNotExists(dirPath)
            .then(() => {
                return app.writeJSON(filePath, contents);
            })
            .then(() => {
                return utils.readFile(filePath, true);
            })
            .then(data => {
                data.should.eql(contents);
                done();
            })
    });


    it('should reject with an error if the passed data is invalid', done => {
        const dirPath = DIR_PATH + dirs[2];
        const filePath = dirPath + '/data.json';
        app.writeJSON(filePath, 'TEST_DATA')
            .catch(err => {
                err.message.should.eql('Invalid Data');
                done();
            })
    })

});
