import './style.css'
import refreshNode from './components/RefreshNode.vue'
import CdnDashboard from './components/CdnDashboard.vue'
import { useCssModule } from 'vue'

import { defineCustomElement } from '@vue/runtime-dom'
//todo: this is a hack to get the custom elements to work in umbraco backoffice, i need to figure out how to get vite to do this for me
const myCustomElement = defineCustomElement(refreshNode);
const myCustomElement2 = defineCustomElement(CdnDashboard);
window.customElements.define(`refresh-node`, myCustomElement);
window.customElements.define(`cdn-dashboard`, myCustomElement2);
import './style.css'
// inside setup() scope... 
// default, returns classes for <style module>
useCssModule()