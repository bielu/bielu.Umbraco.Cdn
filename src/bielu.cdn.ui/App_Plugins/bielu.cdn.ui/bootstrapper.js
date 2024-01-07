loadModuleMap();  
loadModule("/App_Plugins/bielu.cdn.ui/bielu.cdn.ui.js");

function loadModule(url) {
    if (document.querySelector(`script[href="${url}"]`)) {
        console.log(`${url} already loaded.`)
        return;
    }
    var script = document.createElement('script');
    script.src = url;
    script.type = "module";
    document.body.appendChild(script)
}
function loadModuleMap() {

    var script = document.createElement('script');
    script.innerHTML = ` {
        "imports": {
              "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js"
        }
      }`;
    script.type = "importmap";
    document.body.appendChild(script)
}