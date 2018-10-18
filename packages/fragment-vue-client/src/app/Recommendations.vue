<template>
    <div id="recommendations">
        <div class="contacts">
            <Recommendation v-bind:recommendation="recommendation" v-bind:key="recommendation.id.value" v-for="recommendation in recommendations"/>
        </div>
    </div>
</template>

<script>
    import Recommendation from './Recommendation.vue';

    export default {
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
    .contacts {
        display: grid;
        box-sizing: border-box;
        margin-top: 80px;
        padding: 20px;
    }

    @media (min-width: 40em) {
        .contacts {
            grid-template-columns: 50% 50%;
        }
    }

    @media (min-width: 52em) {
        .contacts {
            grid-template-columns: 33% 33% 33%;
        }
    }

    @media (min-width: 64em) {
        .contacts {
            grid-template-columns: 25% 25% 25% 25%;
        }
    }

</style>
