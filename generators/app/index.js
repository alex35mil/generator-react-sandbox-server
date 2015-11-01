'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yeomanGenerator = require('yeoman-generator');

var _yeomanGenerator2 = _interopRequireDefault(_yeomanGenerator);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _yosay = require('yosay');

var _yosay2 = _interopRequireDefault(_yosay);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _changeCase = require('change-case');

var _changeCase2 = _interopRequireDefault(_changeCase);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactSandboxSerer = function (_yeoman$Base) {
  _inherits(ReactSandboxSerer, _yeoman$Base);

  function ReactSandboxSerer() {
    var _Object$getPrototypeO;

    _classCallCheck(this, ReactSandboxSerer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ReactSandboxSerer)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    _this.npmDependencies = ['axios', 'normalize.css', 'react', 'react-dom'];

    _this.npmDevDependencies = ['autoprefixer', 'babel', 'babel-cli', 'babel-core', 'babel-eslint', 'babel-loader', 'babel-plugin-typecheck', 'babel-preset-es2015', 'babel-preset-react', 'babel-preset-react-hmre', 'babel-preset-stage-0', 'babel-register', 'body-parser', 'css-loader', 'eslint', 'eslint-plugin-babel', 'eslint-plugin-react', 'express', 'jade', 'node-sass', 'postcss-loader', 'react-addons-test-utils', 'redux-devtools', 'sass-loader', 'sleep', 'style-loader', 'webpack', 'webpack-dev-middleware', 'webpack-hot-middleware', 'chai', 'jsdom', 'mocha', 'mocha-jsdom', 'sinon'];

    _this.say = {
      arr: '----> ',
      tab: '      ',
      info: function info(msg) {
        console.log('\n\n' + _chalk2.default.yellow(this.arr + msg) + '\n');
      },
      status: function status(item, _status) {
        console.log('' + this.tab + _chalk2.default.green(_status) + ' ' + item);
      },
      cmd: function cmd(_cmd) {
        console.log('\n' + _chalk2.default.green('$ ' + _cmd));
      },
      done: function done(status, msg) {
        console.log('\n\n' + this.tab + _chalk2.default.green(status) + ' $ ' + msg + '\n');
      }
    };

    _this.getDeps = function (deps) {
      return deps.map(function (dep) {
        return dep + '@latest';
      });
    };

    _this.copy = function (src, dest, show) {
      _shelljs2.default.cp('-Rf', this.templatePath(src), this.destinationPath(dest));
      this.say.status(show || dest, '✓ ');
    };

    _this.render = function (src, dest) {
      var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var output = _ejs2.default.render(this.read(this.templatePath(src)), params);
      _fs2.default.writeFileSync(this.destinationPath(dest), output);
      this.say.status(dest, '✓ ');
    };

    _this.shellExec = function (cmd) {
      this.say.cmd(cmd);
      _shelljs2.default.exec(cmd);
      console.log('Completed.');
    };

    _this.allDone = function () {
      this.say.done('All done!', 'cd ' + this.appName + '/ && npm start');
    };

    return _this;
  }

  _createClass(ReactSandboxSerer, [{
    key: 'prompting',
    value: function prompting() {
      var _this2 = this;

      var done = this.async();

      this.log((0, _yosay2.default)('Welcome to the groundbreaking ' + (_chalk2.default.red('React-Sandbox-Serer') + ' generator!')));

      var defaultAppName = _changeCase2.default.param(this.options.argv.original[0]) || null;
      var skipPrompts = this.options.skipPrompts;

      if (skipPrompts) {

        if (!defaultAppName) {
          this.env.error(_chalk2.default.red('NoNameError: Sorry, bro, no way.'));
        }
        this.appName = defaultAppName;
      } else {

        var prompts = [{
          type: 'input',
          name: 'appName',
          message: 'Enter app name:',
          default: defaultAppName
        }];

        this.prompt(prompts, function (props) {
          _this2.appName = _changeCase2.default.param(props.appName);
          done();
        });
      }
    }
  }, {
    key: 'install',
    value: function install() {
      var _this3 = this;

      var deps = this.getDeps(this.npmDependencies);
      var devDeps = this.getDeps(this.npmDevDependencies);

      this.say.info('Installing dependencies...');
      this.npmInstall(deps, { save: true });
      this.npmInstall(devDeps, { saveDev: true }, function () {
        _this3.shellExec('npm shrinkwrap --loglevel error');
        _this3.allDone();
      });
    }
  }, {
    key: 'writing',
    get: function get() {

      return {
        app: function app() {
          this.say.info('Setting up project...');
          _shelljs2.default.mkdir(this.appName);
          this.destinationRoot(this.appName);
          this.copy('app/', 'app/');
          this.copy('config/', 'config/');
          this.copy('dev/', 'dev/');
          this.copy('.babelrc', '.', '.babelrc');
          this.copy('.editorconfig', '.', '.editorconfig');
          this.copy('.eslintignore', '.', '.eslintignore');
          this.copy('.eslintrc', '.', '.eslintrc');
          this.copy('.gitignore', '.', '.gitignore');
          this.copy('.scss-lint.yml', '.', '.scss-lint.yml');
          this.render('_package.json', 'package.json', { appName: this.appName });
          this.copy('server.js', '.', 'server.js');
        }
      };
    }
  }]);

  return ReactSandboxSerer;
}(_yeomanGenerator2.default.Base);

module.exports = ReactSandboxSerer;
