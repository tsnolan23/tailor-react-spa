<template>
    <div id="poc-vue-test">
        <div class="recommendation" v-for="recommendation in recommendations"
            :key="recommendation.id"
             @click="test(recommendation.id)"
        >
            <h3>{{ recommendation.name}}</h3>
            <p>{{ recommendation.email}}</p>

            <br/>
            <br/>
            <br/>

            <p>{{recommendation.body}}</p>
        </div>
    </div>
</template>

<script>

    console.log('poc-vue-test');

    export default {
    	methods: {
    	    test(id) {
    	    	alert(id);
            }
        },

    	computed: {
        	recommendations() {
        		return this.$store.state.items;
            }
        }
    }
</script>

<style scoped>

    #poc-vue-test {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
    }

    .recommendation {
        width: 250px;
        padding: 10px;
        margin: 10px;
        box-shadow: 0 0 10px black;
    }


</style>
