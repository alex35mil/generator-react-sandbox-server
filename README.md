# generator-react-sandbox-server

Scaffolder of simple React app, backed by dummy Express API.

[![npm version](https://img.shields.io/npm/v/generator-react-sandbox-server.svg?style=flat-square)](https://www.npmjs.com/package/generator-react-sandbox-server)
[![build status](https://img.shields.io/travis/alexfedoseev/generator-react-sandbox-server/master.svg?style=flat-square)](https://travis-ci.org/alexfedoseev/generator-react-sandbox-server)
[![dependencies status](https://img.shields.io/gemnasium/alexfedoseev/generator-react-sandbox-server.svg?style=flat-square)](https://gemnasium.com/alexfedoseev/generator-react-sandbox-server)

## Usage

In case you don't have `yo`:

```bash
npm install -g yo
```

Get `generator`:

```bash
npm install -g generator-react-sandbox-server
```

Scaffold your app (you don't have to create root folder by yourself, scaffolder will do it for you):

```bash
yo react-sandbox-server

# or specify name right here
yo react-sandbox-server my-app

# `myApp` or `my_app` will be converted to `my-app` for consistency
```

Navigate to the app folder and run hot reloadable dev server:

```
cd my-app
npm start
```

Point your browser to `http://lvh.me:4000`. That's all!

## License

It's MIT.
