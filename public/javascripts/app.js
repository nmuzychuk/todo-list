var todoList = angular.module('todoList', []);

todoList.controller('TasksCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.testVar = 42;
    }]);
