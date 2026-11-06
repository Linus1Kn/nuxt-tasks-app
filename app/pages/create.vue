<script setup lang="ts">
import { FetchError } from "ofetch"

const errorMessage = ref("")
const loading = ref(false)
const taskName = ref("")

async function onSubmit() {
    if (!taskName.value.trim()) {
        errorMessage.value = "Task is required"
        return
    }
    try {
        loading.value = true
        errorMessage.value = ""
        const result = await $fetch('/api/tasks', {
            method: "POST",
            body: {
                title: taskName.value,
            },
        })
        console.log(result)
        navigateTo({
            name: 'tasks-id',
            params: {
                id: result.id,
            }
        })
    }
    catch (e) {
        const error = e as FetchError
        errorMessage.value = error.statusMessage ?? "Unknown error"
    }
    loading.value = false
}

</script>

<template>
    <article v-if="loading" aria-busy></article>
    <article v-if="errorMessage" class="error">
        {{ errorMessage }}
    </article>
    <form @submit.prevent="onSubmit">
        <label for="title">
            Task
            <input v-model="taskName" name="title" type="text">
        </label>
        <div class="button-container">
            <button>Create</button>
        </div>
    </form>
</template>