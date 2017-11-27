# Tailor React Single-Page Application

This repo is an example application using the Mosaic frontend microservices architecture. Since the idea is that a separate team would be in charge of each of the fragments, there is some duplicate code within each of the fragments such as the Webpack configuration.

## Structure

Three of the four fragments are small React applications that share several dependencies - `react`, `react-dom`, and `classnames`. Those three shared dependencies are listed as externals in their respective webpack configurations. The fourth fragment is the common bundle that provides the shared dependencies for the other three fragments to utilize. The dependency management is handled with RequireJS.

## How to run

1. Clone this repository using `git clone https://github.com/tsnolan23/mosaic-tailor-react-example.git`
1. Install all of the base dependencies with `npm install`
1. Install all of the fragment dependencies with `npm run install-fragment-dependencies`
1. Build the fragments with `npm run build-fragments`
1. In one terminal, start the fragments servers with `npm run start-fragments`
1. In another terminal, start the Tailor service with `npm start`
1. Navigate to `http://localhost:8080/contacts`
