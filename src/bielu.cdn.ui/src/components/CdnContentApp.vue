<script lang="ts">
import '@umbraco-ui/uui-button';
import '@umbraco-ui/uui-select';
import '@umbraco-ui/uui-loader-bar';
import {serviceContainer} from "../Services/service-container";
import {Provider} from "../Services/umbraco/generated/api.generated.clients";

import {defineComponent, PropType} from 'vue'
import CdnProviderCard from "./CdnProviderCard.vue";

export default defineComponent({
  name: 'umbraco-CdnContentApp',
  components: {CdnProviderCard},
  mounted: function () {
    console.log("mounted");
    this.fetchData()
  },
  data() {
    return {
      loading: true,
      message: "test",
      providers: [] as Provider[],
      nodeId: -1,
      currentDomain: "",
      currentProvider: ""
    }
  },
  // type inference enabled
  props: {
    message: String,
    providers: {
      type: Array as PropType<Provider[]>,
      required: true
    },
    nodeId: {
      type: Number,
      default: -1,
    },
  },
  setup(props) {
    // named, returns classes for <style module="classes">

    props.message // type: string | undefined
  },
  methods: {
    async refreshAllProviders() {

    },
    async refreshProvider(provider: Provider) {
      console.log(provider)
    },
    async refreshDomain(domain: string) {
      console.log(domain)
    },
    async fetchData() {
      var service = serviceContainer.managmentApiClient;
      service.getProviders().then((result: any) => {
        console.log(result);
        this.providers = result;
        this.loading = false;
      });
    },
  }
})
</script>

<template>
  <div>

    <h1>CDN Dashboard</h1>
    <div v-if="loading">
      <uui-loader-bar></uui-loader-bar>
    </div>
    <div v-else>
      <h2>Available Providers with domains setup</h2>
      <uui-button
          look="primary"
          label="Refresh content for all providers"
          @click="refreshAllProviders"
      />
      <br/>
      <div  class="cdn-provider-list">
        <CdnProviderCard v-for="provider in providers" :provider="provider" :node="nodeId"></CdnProviderCard>

      </div>

    </div>
  </div>
</template>

<style>
.cdn-provider-list {

  display: flex;
  margin: 20px;
  flex-direction: row;
  gap: 20px;
}

.cdn-provider-list > * {
  width: 32%;
}

.cdn-provider-domain {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.cdn-provider-domain span {
  font-size: 1.2em;
  /* Use a flexbox layout */
  display: flex;

  /* Make a horizontal flexbox (the default) */
  flex-direction: row;

  /* The important part: vertically center the items */
  align-items: center;
  font-weight: bold;
}
</style>