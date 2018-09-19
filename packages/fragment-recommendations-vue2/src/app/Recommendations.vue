<template>
    <div id="recommendations2">
        <div class="asdasdasdas">
            <button v-on:click="test"></button>
            <Recommendation v-bind:recommendation="recommendation" v-bind:key="recommendation.id.value" v-for="recommendation in recommendations"/>
        </div>
    </div>
</template>

<script>
    import Recommendation from './Recommendation.vue';

    export default {
    	methods: {
    	    test() {
    	    	console.log(12312);
            }
        },
    	components: {
            Recommendation
        },
    	computed: {
        	recommendations() {
        		return this.$store.state.items;
            }
        }
    }
</script>

<style scoped>
    .asdasdasdas {
        display: grid;
        box-sizing: border-box;
        margin-top: 80px;
        padding: 20px;
    }

    @media (min-width: 40em) {
        .asdasdasdas {
            grid-template-columns: 50% 50%;
        }
    }

    @media (min-width: 52em) {
        .asdasdasdas {
            grid-template-columns: 33% 33% 33%;
        }
    }

    @media (min-width: 64em) {
        .asdasdasdas {
            grid-template-columns: 25% 25% 25% 25%;
        }
    }

</style>
