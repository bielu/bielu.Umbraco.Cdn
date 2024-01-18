<script lang="ts">
import '@umbraco-ui/uui-button';
import '@umbraco-ui/uui-select';
import '@umbraco-ui/uui-loader-bar';
import {serviceContainer} from "../Services/service-container";
import {Provider} from "../Services/umbraco/generated/api.generated.clients";
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'umbraco-CdnContentApp',
  mounted: function () {

  },
  data() {
    return {
      loading: true,
    }
  },
  // type inference enabled
  props: {
    message: String,
    provider: Provider,
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
    async refreshProvider(provider: Provider) {
      console.log(provider)
    },
    async refreshDomain(domain: string, provider: Provider) {
     if(this.nodeId == -1) {
       service.refreshDomain(provider.id,domain).then((result: any) => {
         console.log(result);
       });
    return;}
      var service = serviceContainer.managmentApiClient;
      service.refreshForNode(this.nodeId, false,false, provider.id,domain).then((result: any) => {
        console.log(result);
      });
    },
  }
})
</script>

<template>
  <uui-card-content-node v-bind:name="provider.name +' '+ provider.version" selectable="false"
                         >
    <uui-tag size="s" slot="tag" color="positive" v-if="provider.enabled">Enabled</uui-tag>
    <uui-tag size="s" slot="tag" color="danger" v-if="!provider.enabled">Disabled</uui-tag>
    <uui-button v-if="provider.enabled"
                look="primary"
                label="Refresh all pages for this provider"
                @click="refreshProvider(provider)"
    />
    <div v-if="provider.supportedHostnames && provider.enabled">
      <h2>Domains</h2>
      <ul style="list-style: none; padding-inline-start: 0px; margin: 0;">

        <li v-for="domain in provider.supportedHostnames">
          <div class="cdn-provider-domain">
            <span>{{ domain }}</span>
            <uui-button
                look="primary"
                label="Refresh all pages for this domain"
                @click="refreshDomain(domain, provider)"
            />
          </div>
        </li>
      </ul>
    </div>
    <div v-if="!provider.enabled">
      <strong>This provider is disabled, which means that all operation will be ignored.</strong>
    </div>
  </uui-card-content-node>
</template>

<style scoped>

</style>