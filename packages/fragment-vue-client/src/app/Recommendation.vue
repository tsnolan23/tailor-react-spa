<template>
    <div class="contact">
        <div class="contact-details">
            <img class="contact-avatar" v-bind:src="recommendation.picture.medium"/>
            <div class="contact-name">
                <span class="contact-first-name">{{recommendation.name.first}}</span>
                <span class="contact-last-name">{{recommendation.name.last}}</span>
            </div>
            <span class="contact-email">{{recommendation.email}}</span>
        </div>
    </div>
</template>

<style scoped>
    .contact {
        display: flex;
        flex: 1;
        box-sizing: border-box;
        padding: 10px;
        cursor: pointer;
    }

    .contact-details {
        flex: 1;
        border-radius: 3px;
        background: #d8dee9;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .contact-avatar {
        border-radius: 50%;
        border: 2px solid #eee;
        width: 80px;
    }

    .contact-name {
        margin-top: 10px;
    }

    .contact-first-name,
    .contact-last-name {
        text-transform: capitalize;
    }

    .contact-first-name:after {
        content: ' ';
    }

    .contact-email {
        display: none;
    }

    @media (min-width: 64em) {
        .contact-email {
            display: initial;
        }
    }
</style>

<script>
    export default {
    	props: {
    		recommendation: Object
        }
    }
</script>
