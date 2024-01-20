
angular.module('umbraco')
    .controller('bielu.cdn.ui.controller.contentApp',
        function (
            $scope,
            $compile,
            $filter,
            $http,
            $routeParams,
            editorService,
            editorState,
            contentResource,
            notificationsService,
            navigationService,
            appState,
            $timeout) {
            var vm = this;
            vm.nodeId = editorState.current.id;
            vm.nodeAlias = editorState.current.contentTypeAlias;

            var wrapper = document.querySelector("#refreshNodeModalWrapper");
            var todo = document.createElement("content-app-cdn-node");
            todo.setAttribute("nodeId", vm.nodeId);
            todo.setAttribute("node-id", vm.nodeId);
            todo
                .addEventListener('refrehsnodesubmit', function (e) {
                    console.log(e);
                    if(e.detail[0].success){
                        notificationsService.success("CDN Refreshed", "Successfully refreshed CDN");
                    }else{
                        notificationsService.error("Cdn Refresh", "Failed to refresh CDN");
                    }
                    navigationService.hideDialog();

                    $scope.close = navigationService.hideDialog;
                });
            wrapper.appendChild(todo);

        });
angular.module('umbraco')
    .filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);