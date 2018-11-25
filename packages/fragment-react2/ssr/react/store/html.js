module.exports = store => `<script>window.CONTACTS_STATE = ${JSON.stringify(store.getState()).replace(/</g, '\\\\\u003c')}</script>`
