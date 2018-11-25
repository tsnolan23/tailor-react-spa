module.exports = state => `<script>window.CONTACTS_STATE = ${JSON.stringify(state).replace(/</g, '\\\\\u003c')}</script>`
