/**
 * Created by harshmehta6711 on 11-05-2017.
 */
var restapp=angular.module("restbucks",[]);

restapp.controller('restCtrl',['$scope','$http','$rootScope', function($scope,$http,$rootScope) {
    var i=1;
    $scope.orders=[];
    window.alert("HI");
   // $scope.orders.push({'num':i,'name':'xyz','milk':$scope.order.milk,'size':$scope.order.size});
    $scope.addorder=function () {
        console.log($scope.order.name);
        $scope.orders.push({'id':i,'name':$scope.order.name,'milk':$scope.order.milk,'size':$scope.order.size});
        $scope.order='';
        i++;
    };

    $scope.placeorder=function () {
        window.alert($scope.city);
        console.log($scope.orders);
        console.log($scope.orders.length);
        $http({
            method: 'POST',
            url: '/createOrder',
            data: {
                'location':$scope.city,
                'items':$scope.orders

            },
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(response);
            $scope.orders=[];
            window.location.assign('/orders');
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
}]);