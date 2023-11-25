<script lang="ts">
import '@umbraco-ui/uui-button';
import '@umbraco-ui/uui-select';
import '@umbraco-ui/uui-loader-bar';
import {defineComponent, ref, watch} from 'vue'
import {serviceContainer} from "../Services/service-container.ts";
import {Provider} from "../Services/umbraco/generated/api.generated.clients.ts";

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
      options: []
    }
  },
  methods: {
    async sendData() {
     console.log("send")
    },
    async fetchData() {
      var service = serviceContainer.managmentApiClient;
      service.getProviders().then((result: Provider[] | null) => {
        console.log(result);
        result?.forEach((item: Provider) => {
          this.options?.push({name: item.name ?? "", value: item.id ?? ""});
          item.supportedHostnames?.forEach((endpoint) => {
            this.options?.push({name: item.name + " " + endpoint ?? "", value: endpoint ?? ""});
          });
        });
        this.loading = false;
        console.log(this.options)
        console.log(this.loading)
      });
    },
  },
  // type inference enabled
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    message: String,
    options: {
      type: Array,
      default: () => []
    }
  },
  setup: function (props) {
    props.message // type: string | undefined
    console.log("Setup props:", props);
    const name = ref("options");

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
    <div class="umb-pane">
      <uui-select placeholder="Select an CND provider or an endpoint" :options="options"></uui-select>
      <div class="spacer"></div>
      <uui-button
          look="primary"
          label="Refresh All CDNs"
      :click="SendData"
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
.spacer{
  margin-top: 20px;
}
</style>
