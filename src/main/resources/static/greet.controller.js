(function () {
    'use strict';

    angular
        .module('app')
        .controller('GreetController', GreetController);

    GreetController.$inject = ['$scope', "$http"];

    function GreetController($scope, $http) {
        $scope.title = 'Using Ajax';
        $scope.items = [];
        $scope.messageError = "";


        $scope.addItem = function (item) {
            $scope.items.push(angular.copy(item));
            $scope.item = null;
        };

        $scope.saveItem = function (item) {
            $http.post('/greeting/saveItem', item)
                .then(function (data, status, headers, config) {
                    console.log("Item Sent");
                },function (result) {
                    console.log(result.data.errors);
                    result.data.errors.forEach(function (error) {
                        $scope.messageError += error.defaultMessage+"\n";
                    });
                });
        };

        $scope.saveItems = function () {
            var res = $http.post('/greeting/saveItems', $scope.items);
            res.then(function (data) {
                console.log("Items Sent");
            }, function (error) {
                console.log(erro);
            });
        };
    }

})();
