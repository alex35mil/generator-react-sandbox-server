import               'os';
import path     from 'path';
import { exec } from 'child_process';
import test     from 'yeoman-test';
import assert   from 'yeoman-assert';


describe('generator-react-sandbox-server:app', () => {

  const appName = 'dummy-app';
  const files = [
    'app/',
    'config/',
    'dev/',
    '.babelrc',
    '.editorconfig',
    '.eslintignore',
    '.eslintrc',
    '.gitignore',
    'package.json',
    'server.js',
  ];


  before(done => {

    // Build generator
    exec(path.resolve(__dirname, '../scripts/build'));

    // Generate app
    test
      .run(path.resolve(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ appName })
      .on('end', done);

  });

  it('creates files', () => assert.file(files));

});
