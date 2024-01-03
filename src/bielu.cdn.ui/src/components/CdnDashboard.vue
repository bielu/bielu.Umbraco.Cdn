<script lang="ts">
import '@umbraco-ui/uui-button';
import '@umbraco-ui/uui-select';
import '@umbraco-ui/uui-loader-bar';
import {serviceContainer} from "../Services/service-container.ts";
import {Provider} from "../Services/umbraco/generated/api.generated.clients.ts";

import {defineComponent, PropType, ref, watch} from 'vue'

export default defineComponent({
  name: 'CdnDashboard',
  mounted: function () {
    console.log("mounted");
    this.fetchData()
  },
  data() {
    return {
      loading: true,
      message: "test",
      providers: [],
      currentDomain: "",
      currentProvider: ""
    }
  },
  // type inference enabled
  props: {
    message: String,
    providers: {
      type: Array as PropType<Provider[]>,
      default: () => []
    },
  },
  setup(props) {
    props.message // type: string | undefined
  },
  methods: {
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
          label="Refresh all pages for all providers"
          @click="refreshAllProviders"
      />
<br />
<div class="cdn-provider-list">      
  <uui-card-content-node v-bind:name="provider.name +' '+ provider.version" selectable="false" v-for="provider in providers">
          <uui-tag size="s" slot="tag" color="positive" v-if="provider.enabled">Enabled</uui-tag>
          <uui-tag size="s" slot="tag" color="danger" v-if="!provider.enabled">Disabled</uui-tag>
          <uui-button
              look="primary"
              label="Refresh all pages for this provider"
              @click="refreshProvider(provider)"
          />
          <div v-if="provider.supportedHostnames">
                <h2>Domains</h2>
                <ul style="list-style: none; padding-inline-start: 0px; margin: 0;">
                  
                  <li v-for="domain in provider.supportedHostnames">
                    <div class="cdn-provider-domain">
                    <span>{{ domain }}</span>
                    <uui-button
                        look="primary"
                        label="Refresh all pages for this domain"
                        @click="refreshDomain(domain)"
                    /></div>
                  </li>
                </ul>
          </div>
        </uui-card-content-node>

</div>

    </div>
  </div>
</template>

<style scoped>
.cdn-provider-list {
  display: flex;
  margin: 20px;
  flex-direction: row;
  gap: 20px;
}
.cdn-provider-list>*{
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