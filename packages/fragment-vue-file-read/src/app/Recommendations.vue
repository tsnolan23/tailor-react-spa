<template>
    <div id="poc-simple-vue-test">
        <h1>Hello world poc-simple-vue-test {{gimmeDate}}</h1>
    </div>
</template>

<script>

    console.log('poc-vue-test');

    export default {
        computed: {
            gimmeDate() {
                return new Date().toUTCString()
            }
        }
    }
</script>

<style scoped>
    h1 {
        color: red;
    }
</style>
