import refreshNode from './components/CdnRefreshNode.ce.vue'
import CdnDashboard from './components/CdnDashboard.ce.vue'

import { defineCustomElement } from '@vue/runtime-dom'
//todo: this is a hack to get the custom elements to work in umbraco backoffice, i need to figure out how to get vite to do this for me
const refreshNodeActionMenu = defineCustomElement(refreshNode);
const cdnManagmentDashboard = defineCustomElement(CdnDashboard);
const cdnContentApp = defineCustomElement(CdnDashboard);
window.customElements.define(`refresh-node`, refreshNodeActionMenu);
window.customElements.define(`cdn-dashboard`, cdnManagmentDashboard);
window.customElements.define(`content-app-cdn-node`, cdnContentApp);
