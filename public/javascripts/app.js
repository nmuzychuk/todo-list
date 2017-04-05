var todoList = angular.module('todoList', []);

todoList.controller('TasksCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.tasks = [];

        $http.get('/api/tasks').then(function(res) {
            $scope.tasks = res.data;
        });
    }]);
