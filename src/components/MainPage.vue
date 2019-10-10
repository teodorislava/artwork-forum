<template>
    <div> 
        <app-nav></app-nav>
        <feed></feed>
    </div>
</template>

<script>
import Nav from './Nav.vue';
import FeedPageVue from './FeedPage.vue';

export default {
    components: {
        'app-nav':Nav,
        'feed': FeedPageVue
    }
}
</script>

<style>

</style>
