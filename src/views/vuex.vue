<template>
    <div>Vuex：：：{{ count }}</div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
    name: 'Vuex',
    setup: () => {
        const count = ref(0)
        return { count }
    }
})
</script>

<style scoped>
body {
    background-color: green;
}
</style>
