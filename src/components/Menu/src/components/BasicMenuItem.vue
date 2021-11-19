<template>
    <MenuItem :key="item.path">
        <MenuItemContent :item="item" />
    </MenuItem>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Menu } from 'ant-design-vue'
import { itemProps } from '../props'

import MenuItemContent from './MenuItemContent.vue'
export default defineComponent({
    name: 'BasicMenuItem',
    components: { MenuItem: Menu.Item, MenuItemContent },
    props: {
        item: itemProps.item
    },
    setup() {
        return {}
    }
})
</script>
