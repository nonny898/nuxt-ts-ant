<template>
  <div>
    <h1>A single user, with ID: {{ $route.params.id }}</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class ID extends Vue {
  validate(data: any): boolean {
    return /^\d+$/.test(data.params.id)
  }
}
</script>
