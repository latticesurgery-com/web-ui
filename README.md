# Web UI for the Lattice Surgery Quantum Error Correction Compiler

### Setup
```
$ cd ls-ui-react-app
$ npm install
$ echo ESLINT_NO_DEV_ERRORS=true >> .env
```
Run the dev server with 

```$ npm start```

It should serve at `http://localhost:3000/`. Your changes will be appearing live continuously, without even having to reload. What I recommend is having the browser in one window and the code in another to get an impressively short feedback loop.

You can check out the readme in the `ls-ui-react-app` folder for more on how to work with the React app.

### Run against a local compiler library
Start lsqecc's local development server, then go to: `http://localhost:3000/?localapi=true`. To set the port: `http://localhost:3000/?localapi=true&port=8888`, otherwise it defaults to 9876 (lsqecc's default).

### Cryptic error messages
If the error messages are very concise, try dumping the stdout to a file to read the output:

```npm start > errmsg.txt || cat errmsg.txt``` 

I've only had this happen when messing with the dependencies.
### Deploy


