<template>
    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div class="bg-green-50 rounded-xl p-5">
            <p class="mt-8 text-green-500 text-sm">Unit Home Page</p>
        </div>
        <div class="bg-purple-50 rounded-xl p-5">
            <p class="mt-8 text-purple-500 text-sm">count is: {{ count }}</p>
        </div>
        <div class="bg-yellow-50 rounded-xl p-5">
            <p class="mt-8 text-yellow-500 text-sm">Transfer to the same bank</p>
        </div>
        <div class="bg-blue-50 rounded-xl p-5">
            <p class="mt-8 text-blue-500 text-sm">sssssssssssssss</p>
        </div>
        <button @click="click">点我</button>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
    name: 'Home',
    setup: () => {
        const count = ref(0)
        return {
            count
        }
    },
    methods: {
        click() {
            this.count++
        }
    }
})
</script>

<style lang="scss" scoped>
body {
    background-color: red;
}
</style>
