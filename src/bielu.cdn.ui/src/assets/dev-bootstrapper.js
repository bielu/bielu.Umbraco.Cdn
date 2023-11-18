loadModule("https://localhost:5173/@vite/client");
loadModule("https://localhost:5173/src/main.ts");

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