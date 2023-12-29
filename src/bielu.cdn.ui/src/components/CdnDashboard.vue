<script lang="ts">
import '@umbraco-ui/uui-button';
import '@umbraco-ui/uui-select';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CdnDashboard',
  data() {
    return {
      message: 'Hello Vue 3 + TypeScript + Vite'
    }
  },
  // type inference enabled
  props: {
    message: String
  },
  setup(props) {
    props.message // type: string | undefined
  }
})
</script>

<template>
  <div>
    <h1>CDN Dashboard</h1>
    <p>CDN Dashboard</p>
    hello :D
  </div>
</template>

<style scoped>

</style>