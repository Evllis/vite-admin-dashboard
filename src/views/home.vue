<template>
    <div>首页：：：{{ count }}</div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
    name: 'Home',
    setup: () => {
        const count = ref(0)
        return { count }
    }
})
</script>

<style scoped>
body {
    background-color: red;
}
</style>
