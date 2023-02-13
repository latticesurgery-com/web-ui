# latticesurgery.com 

[![CI + CD](https://github.com/latticesurgery-com/web-ui/actions/workflows/main.yml/badge.svg)](https://github.com/latticesurgery-com/web-ui/actions/workflows/main.yml)
![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)
[![arXiv](https://img.shields.io/badge/arXiv-2302.02459-b31b1b.svg)](https://arxiv.org/abs/2302.02459)
[![Unitary Fund](https://img.shields.io/badge/Supported%20By-Unitary%20Fund-FFFF00.svg)](https://unitary.fund)

[![Lattice Surgery Compiler-fin-01](https://user-images.githubusercontent.com/46719079/150657000-8e83c649-84a8-431b-aab0-d44d847e5a24.png)](https://latticesurgery.com)

Source code for [latticesurgery.com](https://latticesurgery.com). 
Built using [React](https://reactjs.org/) and [Vite](https://vitejs.dev/).

## Running locally 
```sh
$ git clone https://github.com/latticesurgery-com/web-ui.git
$ cd web-ui
$ npm ci 
$ npm start
```

### Run against a local compiler library
Start lsqecc's local development server, then go to: `/?localapi=true`. To set the port: `/?localapi=true&port=8888`, otherwise it defaults to 9876 (lsqecc's default).


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

## License
The copyright holders for this project are its contributors Alex Nguyen, Keelan Watkins and George Watkins. It is released under the terms of the [GNU Affero General Public License](https://www.gnu.org/licenses/agpl-3.0.en.html). A copy of the license should be included with the project in the `LICENSE` file.
