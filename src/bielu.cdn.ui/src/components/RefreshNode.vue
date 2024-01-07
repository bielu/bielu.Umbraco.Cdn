<script lang="ts">
import '@umbraco-ui/uui-button';
import '@umbraco-ui/uui-select';
import '@umbraco-ui/uui-loader-bar';
import {defineComponent, PropType, ref, watch} from 'vue'
import {serviceContainer} from "../Services/service-container";
import {Provider, Status} from "../Services/umbraco/generated/api.generated.clients";
export default defineComponent({
  name: 'RefreshNode',
  created: function () {

  },
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
  methods: {
    async selectProvider(object: any) {
      console.log(object.target);
      console.log(object.target.id);
      if(object.target.id != "providers") {
        return;
      }
      this.currentDomains.length = 0;
      this.currentProvider = object.target.value;
      this.domains.forEach((item: Option) => {
        if (item.group ===  this.currentProvider) {
          this.currentDomains.push(item);
        }
      });
      console.log(this.currentDomains);
    },
    async selectDomain(object: any) {
      if(object.target.id != "domains") {
        return;
      }
      this.currentDomain = object.target.value;
      console.log(this.currentDomain);
    },
    async sendData() {
      var service = serviceContainer.managmentApiClient;
      this.loading=true;
        service.refreshForNode(this.nodeId, this.currentProvider, this.currentDomain).then((result: any) => {
        console.log(result);
          console.log(this.currentDomain, this.currentProvider);

          
          this.$emit("refrehsnodesubmit", (result as Status))
          
      });
      
    
    },
    async fetchData() {
      var service = serviceContainer.managmentApiClient;
      service.getProviders(this.nodeId).then((result: Provider[] | null) => {
        console.log(result);
        result?.forEach((item: Provider) => {
          this.providers?.push({name: item.name ?? "", value: item.id ?? "", group: item.name ?? "", selected: false} as Option);
          item.supportedHostnames?.forEach((endpoint) => {
            this.domains?.push({name: endpoint ?? "", value: endpoint ?? "", group: item.name ?? "", selected: false} as Option);
            this.currentDomains?.push({name: endpoint ?? "", value: endpoint ?? "", group: item.name ?? "", selected: false} as Option);
          });
        });
        this.loading = false;
        console.log(this.providers)
        console.log(this.loading)
      });
    },
  },
  emits: {
    refrehsnodesubmit: (result:Status) => {
      console.log(result);
      return true;
    },
  },
  // type inference enabled
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    nodeId: {
      type: Number,
      default: -1,
    },
    message: String,
    providers: {
      type: Array as PropType<Option[]>,
      default: () => [] as Option[]
    },
    currentDomains: {
      type: Array as PropType<Option[]>,
      default: () => [] as Option[]
    },
    domains: {
      type: Array as PropType<Option[]>,
      default: () => [] as Option[]
    }
  },
  setup: function (props) {
    props.message // type: string | undefined
    console.log("Setup props:", props);
    const name = ref("providers");

    watch(name, (first, second) => {
      console.log(
          "Watch props.selected function called with args:",
          first,
          second
      );
      // Both props are undefined so its just a bare callback func to be run
    }, {deep: true, immediate: true,});


  }
})
</script>

<template>
  <div v-if="loading">
    <uui-loader-bar animationDuration="1.5" style="color: black"></uui-loader-bar>
  </div>
  <div class="umb-dialog-body " v-else>
    hello
    <div class="umb-pane">
      <uui-select placeholder="Select an CND provider or an endpoint" :options="providers" id="providers"
                  @change="selectProvider"></uui-select>
      <div class="spacer"></div>

      <uui-select placeholder="Select an domain for provider" :options="currentDomains"  id="domains"
                  @change="selectDomain"></uui-select>
      <div class="spacer"></div>
      <uui-button
          look="primary"
          label="Refresh All CDNs"
          @click="sendData"
      >
      </uui-button>
    </div>
  </div>
</template>

<style scoped>
.umb-pane {
  margin: 20px;
  margin-top: 15px;

}

.spacer {
  margin-top: 20px;
}
</style>
