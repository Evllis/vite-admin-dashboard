<template>
    <div
        class="
            fixed
            top-0
            left-0
            lg:left-64
            right-0
            h-14
            bg-white
            border-b border-gray-200
            flex flex-row
            items-center
            justify-between
            px-5
        "
    >
        <h3 class="text-sm font-medium text-gray-600">Welcome, Nur</h3>
        <div class="flex">
            <div class="relative flex justify-center items-center w-6 h-6 rounded-full bg-gray-200">
                <div class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-400 rounded-full" />
            </div>
            <img src="@/assets/img/avatar.png" alt="Avatar" class="ml-2 w-6 h-6 rounded-full" />
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Navbar'
}
</script>
