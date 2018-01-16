// Code goes here

var app = angular.module('todoApp', ['ui.calendar','ngResource']);

app.factory('todo', function($resource){
    return $resource('http://'+'localhost'+':3000/todos', null,  {
        'update': { method:'PUT' }
    });
});


app.controller('mainController', function($scope, $timeout,todo) {

  $scope.todos = todo.query(function(data){
    console.log(data);
  })

  $scope.events = [];

  $scope.staticEvents = $scope.todos;
  console.log($scope.staticEvents);

  var defaultUser = 'All';
  $scope.currentUser = defaultUser;

  $scope.setCurrentuser = function(user){
    $scope.currentUser = user;
  };

  console.log($scope.currentUser);


  /*$scope.staticEvents = [
    {title: 'Static 1', start: new Date(y, m, 1), allDay: true, backgroundColor: '#ff6666',borderColor: '#ff4d4d'},
    {title: 'Static 2', start: new Date(y, m, 8), allDay: true, backgroundColor: '#ff6666',borderColor: '#ff4d4d'},
    {title: 'Static 3', start: new Date(y, m, d), allDay: true, backgroundColor: '#ff6666',borderColor: '#ff4d4d'}
  ];

$scope.staticEvents = [
  {title: 'Static 1', start: new Date(y, m, 1), allDay: true, backgroundColor: '#e6e600',borderColor: '#ffff00'},
  {title: 'Static 2', start: new Date(y, m, 8), allDay: true, backgroundColor: '#e6e600',borderColor: '#ffff00'},
  {title: 'Static 3', start: new Date(y, m, d), allDay: true, backgroundColor: '#e6e600',borderColor: '#ffff00'}
];

$scope.staticEvents = [
  {title: 'Static 1', start: new Date(y, m, 1), allDay: true, backgroundColor: '#00aaff',borderColor: '#33bbff'},
  {title: 'Static 2', start: new Date(y, m, 8), allDay: true, backgroundColor: '#00aaff',borderColor: '#33bbff'},
  {title: 'Static 3', start: new Date(y, m, d), allDay: true, backgroundColor: '#00aaff',borderColor: '#33bbff'}
]; */


  // Assign the 2 sources to $scope.eventSources for calendar.
  $scope.eventSources = [$scope.staticEvents, $scope.events];
});
