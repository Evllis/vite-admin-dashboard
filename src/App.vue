<template>
    <div>
        <img alt="Vue logo" src="./assets/logo.png" />
        <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import axios from './utils/axios'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
    name: 'App',
    components: {
        HelloWorld
    },
    setup() {
        // axios
        //     .get('/users/XPoet')
        //     .then(res => {
        //         console.log(`res:`, res)
        //     })
        //     .catch(err => {
        //         console.log(`err:`, err)
        //     })
    }
})
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
