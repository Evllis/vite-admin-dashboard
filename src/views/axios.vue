<template>
    <div>axios：：：{{ count }}</div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
    name: 'Axios',
    setup: () => {
        const count = ref(0)
        return { count }
    }
})
</script>

<style scoped>
body {
    background-color: blue;
}
</style>
