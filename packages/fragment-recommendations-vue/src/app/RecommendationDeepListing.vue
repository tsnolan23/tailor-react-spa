<template>
    <div class="contacts">
        <RecommendationDeepItem v-bind:key="recommendation.id.value" v-bind:recommendation="recommendation" v-for="recommendation in recommendations"/>
        <RecommendationDeepItem v-bind:key="recommendation.id.value" v-bind:recommendation="recommendation" v-for="recommendation in recommendations"/>
        <RecommendationDeepItem v-bind:key="recommendation.id.value" v-bind:recommendation="recommendation" v-for="recommendation in recommendations"/>
    </div>
</template>

<script>
	import RecommendationDeepItem from './RecommendationDeepItem.vue';

	export default {
		components: {
			RecommendationDeepItem
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