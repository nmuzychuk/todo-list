var todoList = angular.module('todoList', []);

todoList.controller('TasksCtrl', ['$scope', '$http',
    function ($scope, $http) {
        var apiUrl = '/api/tasks';

        $scope.tasks = [];

        $http.get(apiUrl).then(function (res) {
            $scope.tasks = res.data;
        });

        $scope.createTask = function (task) {
            $http.post(apiUrl, task).then(function (res) {
                $scope.tasks.push(res.data);
                $scope.task = {};
            });
        };

        $scope.updateTask = function (index) {
            var task = $scope.tasks[index];

            var updatedTask = JSON.parse(JSON.stringify(task));
            updatedTask.isDone = task.isDone ? false : true;

            $http.put(getTaskUrl(task), updatedTask)
                .then(function (res) {
                    $scope.tasks[index] = res.data;
                });
        };

        $scope.deleteTask = function (index) {
            var task = $scope.tasks[index];

            $http.delete(getTaskUrl(task)).then(function () {
                $scope.tasks.splice(index, 1);
            });
        };

        var getTaskUrl = function (task) {
            return apiUrl + '/' + task._id;
        };
    }]);
