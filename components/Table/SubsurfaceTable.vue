<template>
  <div>
    <a-table :columns="columns" :data-source="data" @change="onChange" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class SubsurfaceTable extends Vue {}
</script>
