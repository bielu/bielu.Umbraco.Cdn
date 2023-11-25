angular.module('umbraco')
    .controller('bielu.cdn.ui.controller',
        function (
            $scope,
            $filter,
            $http,
            $routeParams,
            editorState,
            contentResource,
            notificationsService,
            navigationService,
            appState,
            $timeout) {
                $scope.currentNode = appState.getMenuState("currentNode");
                $scope.nodeId = $scope.currentNode.id;
                $scope.loaded = true;
                $scope.customHtml = `<refresh-node node-id="${$scope.nodeId}"></refresh-node>`;
        });
angular.module('umbraco')
    .filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);