# latticesurgery.com 

[![CI + CD](https://github.com/latticesurgery-com/web-ui/actions/workflows/main.yml/badge.svg)](https://github.com/latticesurgery-com/web-ui/actions/workflows/main.yml)
![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)
[![Unitary Fund](https://img.shields.io/badge/Supported%20By-Unitary%20Fund-FFFF00.svg)](https://unitary.fund)

![Lattice Surgery Compiler-fin-01](https://user-images.githubusercontent.com/46719079/150657000-8e83c649-84a8-431b-aab0-d44d847e5a24.png)

Source code for [latticesurgery.com](https://latticesurgery.com). 
This website is built using React (bootstrapped with [Create React App](https://github.com/facebook/create-react-app))
and [Chakra UI](https://github.com/chakra-ui/chakra-ui).

## Running locally 
```sh
$ git clone https://github.com/latticesurgery-com/web-ui.git
$ cd web-ui
$ npm ci 
$ npm start
```
It development server will be served at `localhost:8000`

### Run against a local compiler library
Start lsqecc's local development server, then go to: `http://localhost:3000/?localapi=true`. To set the port: `http://localhost:3000/?localapi=true&port=8888`, otherwise it defaults to 9876 (lsqecc's default).


## Development
This repo uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) to enforce a consistent programming style.
However, their warnings might stop the development server from compiling. To fix this problem, run the following line before
`npm start`:
```sh
$ echo ESLINT_NO_DEV_ERRORS=true >> .env
```
or alternatively, add `ESLINT_NO_DEV_ERRORS=true` option to your `.env` file. 

To auto-format your code using ESLint and Prettier, run:
```sh
$ npm run lint:fix
```
