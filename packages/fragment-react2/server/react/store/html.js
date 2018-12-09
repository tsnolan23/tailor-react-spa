module.exports = ({ store, name }) => `<script>window['${name}'] = ${JSON.stringify(store.getState()).replace(/</g, '\\\\\u003c')}</script>`
