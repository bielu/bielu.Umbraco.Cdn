<script lang="ts">
import '@umbraco-ui/uui-button';
import '@umbraco-ui/uui-select';
import { defineComponent } from 'vue'
import {serviceContainer} from "../Services/service-container.ts";
import {Provider} from "../Services/umbraco/generated/api.generated.clients.ts";

export default defineComponent({
  name: 'RefreshNode',
  mounted() {
    console.log('mounted')
var service = serviceContainer.managmentApiClient;
    service.getProviders().then((result:Provider[]|null) => {
      console.log(result);
    });
  },
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

  {{ message }}
  <uui-select placeholder="Select an CND provider or an endpoint"></uui-select>
  <uui-button
      look="primary"
      label="Refresh All CDNs">
  </uui-button>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
