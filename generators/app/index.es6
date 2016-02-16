import yeoman from 'yeoman-generator';
import ejs    from 'ejs';
import chalk  from 'chalk';
import yosay  from 'yosay';
import shell  from 'shelljs';
import shift  from 'change-case';
import fs     from 'fs';


class ReactSandboxSerer extends yeoman.Base {

  constructor(...args) {

    super(...args);

    this.npmDependencies = [
      'axios',
      'normalize.css',
      'react',
      'react-dom',
    ];

    this.npmDevDependencies = [
      'autoprefixer',
      'babel',
      'babel-cli',
      'babel-core',
      'babel-eslint',
      'babel-loader',
      'babel-plugin-typecheck',
      'babel-preset-es2015',
      'babel-preset-react',
      'babel-preset-react-hmre',
      'babel-preset-stage-0',
      'babel-register',
      'body-parser',
      'css-loader',
      'eslint',
      'eslint-plugin-babel',
      'eslint-plugin-react',
      'express',
      'jade',
      'node-sass',
      'postcss-loader',
      'react-addons-test-utils',
      'redux-devtools',
      'sass-loader',
      'sleep',
      'style-loader',
      'webpack',
      'webpack-dev-middleware',
      'webpack-hot-middleware',

      'chai',
      'jsdom',
      'mocha',
      'mocha-jsdom',
      'sinon',
    ];

    this.say = {
      arr: '----> ',
      tab: '      ',
      info(msg) {
        console.log('\n\n' + chalk.yellow(this.arr + msg) + '\n');
      },
      status(item, status) {
        console.log(`${this.tab}${chalk.green(status)} ${item}`);
      },
      cmd(cmd) {
        console.log('\n' + chalk.green('$ ' + cmd));
      },
      done(status, msg) {
        console.log(`\n\n${this.tab}${chalk.green(status)} $ ${msg}\n`);
      },
    };

    this.getDeps = deps => deps.map(dep => dep + '@latest');

    this.copy = function(src, dest, show) {
      shell.cp('-Rf', this.templatePath(src), this.destinationPath(dest));
      this.say.status(show || dest, '✓ ');
    };

    this.render = function(src, dest, params = {}) {
      const output = ejs.render(this.read(this.templatePath(src)), params);
      fs.writeFileSync(this.destinationPath(dest), output);
      this.say.status(dest, '✓ ');
    };

    this.shellExec = function(cmd) {
      this.say.cmd(cmd);
      shell.exec(cmd);
      console.log('Completed.');
    };

    this.allDone = function() {
      this.say.done('All done!', `cd ${this.appName}/ && npm start`);
    };

  }


  prompting() {

    const done = this.async();

    this.log(
      yosay(
        `Welcome to the groundbreaking ` +
        `${chalk.red('React-Sandbox-Server')} generator!`
      )
    );

    const defaultAppName = shift.param(this.options.argv.original[0]) || null;
    const skipPrompts    = this.options.skipPrompts;

    if (skipPrompts) {

      if (!defaultAppName) {
        this.env.error(
          chalk.red('NoNameError: Sorry, bro, no way.')
        );
      }
      this.appName = defaultAppName;

    } else {

      const prompts = [{
        type   : 'input',
        name   : 'appName',
        message: 'Enter app name:',
        default: defaultAppName,
      }];

      this.prompt(prompts, props => {
        this.appName = shift.param(props.appName);
        done();
      });

    }

  }


  get writing() {

    return {

      app() {
        this.say.info('Setting up project...');
        shell.mkdir(this.appName);
        this.destinationRoot(this.appName);
        this.copy('app/', 'app/');
        this.copy('config/', 'config/');
        this.copy('dev/', 'dev/');
        this.copy('.babelrc', '.', '.babelrc');
        this.copy('.editorconfig', '.', '.editorconfig');
        this.copy('.eslintignore', '.', '.eslintignore');
        this.copy('.eslintrc', '.', '.eslintrc');
        this.copy('.scss-lint.yml', '.', '.scss-lint.yml');
        this.render('_package.json', 'package.json', { appName: this.appName });
        this.copy('server.js', '.', 'server.js');
      },

    };

  }


  install() {

    const deps    = this.getDeps(this.npmDependencies);
    const devDeps = this.getDeps(this.npmDevDependencies);

    this.say.info('Installing dependencies...');
    this.npmInstall(deps, { save: true });
    this.npmInstall(devDeps, { saveDev: true }, () => {
      this.shellExec('npm shrinkwrap --loglevel error');
      this.allDone();
    });

  }

}

module.exports = ReactSandboxSerer;
