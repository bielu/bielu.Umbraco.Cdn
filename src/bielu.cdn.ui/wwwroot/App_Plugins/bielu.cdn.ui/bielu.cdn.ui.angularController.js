angular.module('umbraco')
    .controller('bielu.cdn.ui.controller',
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
            $scope.currentNode = appState.getMenuState("currentNode");
            $scope.nodeId = $scope.currentNode.id;
            $scope.loaded = true;

            var wrapper = document.querySelector("#refreshNodeModalWrapper");
            var todo = document.createElement("refresh-node");
            todo.setAttribute("node-id", $scope.nodeId);
            wrapper.appendChild(todo);

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

        });
angular.module('umbraco')
    .filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);