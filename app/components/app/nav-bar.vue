<script setup lang="ts">
</script>

<template>
    <nav class="container">
        <ul>
            <li>
                <NuxtLink to="/">
                    Tasks App
                </NuxtLink>
            </li>
        </ul>
        <ul>
            <li>
                <NuxtLink :to="{ name: 'create' }">
                    Create Task
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>