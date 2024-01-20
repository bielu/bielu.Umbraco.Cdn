<script lang="ts">
import '@umbraco-ui/uui-button';
import '@umbraco-ui/uui-select';
import '@umbraco-ui/uui-loader-bar';
import '@umbraco-ui/uui-badge';
import {serviceContainer} from "../Services/service-container";
import {AuditRecord, Provider} from "../Services/umbraco/generated/api.generated.clients";

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
      lastAuditRecord: {} as AuditRecord,
      AllAuditsRecords: [] as AuditRecord[],
      ShowOperationList: false,
      RefreshingNode: "",
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
    async LoadAllLogs(){
      var service = serviceContainer.managmentApiClient;
      if(   this.ShowOperationList == true){
        this.ShowOperationList = false;
        return;
      }
      service.getAllRecords(this.nodeId).then((result: AuditRecord[]) => {
        console.log(result);
        this.AllAuditsRecords = result;
        this.ShowOperationList = true;
      });
    },
    async fetchData() {
      var service = serviceContainer.managmentApiClient;
      service.getProviders().then((result: any) => {
        console.log(result);
        this.providers = result;
        this.loading = false;
      });
      service.getLastLog(this.nodeId).then((result: AuditRecord) => {
        this.lastAuditRecord = result;

      });
    },
  }
})
</script>

<template>
  <div>

    <h1>CDN Options</h1>
    <div v-if="loading">
      <uui-loader-bar></uui-loader-bar>
    </div>
    <div v-else>
      <uui-button
          look="primary"
          label="Refresh content for all providers"
          @click="refreshAllProviders"
      />
      <div class="spacer"></div>
      <div v-if="lastAuditRecord">

        <uui-card-content-node class="details" selectable="false" name="CDN Details"
        >
          <uui-tag size="s" slot="tag" v-if="!lastAuditRecord.isFromProvider" color="warning">
            No Audits available for CDN provider
          </uui-tag>
          <uui-tag size="s" slot="tag" v-if="lastAuditRecord.isFromProvider" color="positive">
            Audits available fro provider
          </uui-tag>
          Last refreshed: {{ lastAuditRecord.date }}
          <div class="spacer"></div>
          <uui-button type="" look="primary" style="" v-bind:label="ShowOperationList ? 'Hide history' : 'Show History'"  @click="LoadAllLogs"></uui-button>


        </uui-card-content-node>
        <div class="spacer"></div>
        <uui-table v-if="ShowOperationList">

          <!-- Apply styles to the uui-table-column to style the columns. You must have the same number of this elements as you have columns -->
          <uui-table-column></uui-table-column>
          <uui-table-column ></uui-table-column>
          <uui-table-column ></uui-table-column>

          <uui-table-head>
            <uui-table-head-cell>Operation</uui-table-head-cell>
            <uui-table-head-cell>Date</uui-table-head-cell>
            <uui-table-head-cell>User</uui-table-head-cell>
          </uui-table-head>

          <uui-table-row v-for="record in AllAuditsRecords">
            <uui-table-cell>{{record.message}}</uui-table-cell>
            <uui-table-cell>{{record.date}}</uui-table-cell>
            <uui-table-cell>{{record.username}}</uui-table-cell>
          </uui-table-row>

        

        </uui-table>
      </div>
      <br/>
      <div class="cdn-provider-list">
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

.details {
  width: 50%;
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

.spacer {
  margin-top: 20px;
}
</style>