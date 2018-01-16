// Code goes here
var app = angular.module('todoApp', ['ui.calendar', 'ngResource']);

//to fetch data from the server using $resource

app.factory('todo', function($resource) {
    return $resource('http://' + 184.72.192.6 + ':3000/todos', null, {
        'update': {
            method: 'PUT'
        }
    });
});

app.controller('mainController', function($scope, uiCalendarConfig, todo) {

    $scope.fetchTodos = function() {
        $scope.todos = todo.query(function(data) {
            console.log(data);

    //for a more effecient approach, this processing should me done on the server side
            angular.forEach($scope.todos, function(todo, key) {
                if (todo.priority === 'high') {
                    todo.backgroundColor = '#ff6666';
                    todo.borderColor = '#ff4d4d';
                } else if (todo.priority === 'medium') {
                    todo.backgroundColor = '#e6e600';
                    todo.borderColor = '#ffff00';
                } else {
                    todo.backgroundColor = '#00aaff';
                    todo.borderColor = '#33bbff';
                }
            });
        });
        return $scope.todos;
    }

    //Arrays to facilitate filter operations based on Username
    $scope.allTodos = [];
    $scope.filteredTodos = [];
    $scope.allTodos = $scope.fetchTodos();
    $scope.filteredTodos = $scope.allTodos;
    $scope.events = [];

    var defaultUser = 'All';
    $scope.currentUser = defaultUser;

    //Executed when a different user is selected

    $scope.setCurrentUser = function(user) {
        $scope.currentUser = user;
        if ($scope.currentUser == 'All') {
            console.log('All Users selected');
        } else {
            $scope.filteredTodos = [];
            angular.forEach($scope.allTodos, function(todo, key) {
                if (todo.id === $scope.currentUser) {
                    $scope.filteredTodos.push($scope.allTodos[key]);
                }
            });
        }
        $scope.eventSources[0].splice(0, $scope.eventSources[0].length);
        angular.forEach($scope.filteredTodos, function(todo, key) {
            $scope.eventSources[0].push(todo);
        });
        //repopulation of todos list since splice is used
        $scope.allTodos = $scope.fetchTodos();
    };

    //Passing the event object required by full calendar
    $scope.events = $scope.filteredTodos;
    $scope.eventSources = [$scope.events];
});
