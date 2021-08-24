<template>
    <div class="px-5 text-sm text-purple-500 font-medium my-2">
        {{ text }}
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
    name: 'SidebarMenuHeader',
    props: {
        text: {
            type: String,
            required: true
        }
    },
    setup: () => {
        const count = ref(0)
        return { count }
    }
})
</script>
