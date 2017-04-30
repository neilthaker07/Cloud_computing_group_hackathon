/**
 * Created by DELL on 4/22/2017.
 */
var login=angular.module('sessioncheck',[]);

login.controller('sessioncheck',function($scope,$http,$location) {

    $scope.orderlist=[];

    $scope.createfn=function () {

    }
    $http({
        method: "GET",
        url: '/getOrders1',
        data: {}
    }).success(function (data) {
        //console.log(JSON.stringify(data.category));//checking the response data for statusCode

        if (data.statusCode == 200) {
        $scope.orderlist=data.orders;
        console.log(data);
        }
        else {
            $scope.orderlist=[];
            console.log(data);

        }
        //Making a get call to the '/redirectToHomepage' API
        //window.location.assign("/homepage");
    }).error(function (error) {
    });
});

login.controller('creation',function($scope,$http,$location) {


    $scope.createfn=function () {
        console.log($scope.restbucks);
        //$scope.orderlist=[];
        $http({
            method: "POST",
            url: '/createOrder1',
            data: {
                restbucks11 : $scope.restbucks
            }
        }).success(function (data) {
            //console.log(JSON.stringify(data.category));//checking the response data for statusCode

            if (data.statusCode == 200) {
                /*$scope.orderlist=data.orders;
                 console.log(data);*/
            }
            else {
                /* $scope.orderlist=[];
                 console.log(data);*/

            }
            //Making a get call to the '/redirectToHomepage' API
            //window.location.assign("/homepage");
        }).error(function (error) {
        });
    }

});