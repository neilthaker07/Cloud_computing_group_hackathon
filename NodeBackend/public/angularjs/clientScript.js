/**
 * Created by DELL on 4/22/2017.
 */
var login=angular.module('sessioncheck',[]);

login.controller('sessioncheck',function($scope,$http,$location) {

    $scope.orderlist=[];

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
    $scope.deletefn=function (orderid) {
        var r=window.confirm("DELETE ORDER : "+orderid+" ?");
        //$scope.orderlist=[];
        if(r==true)
        window.location.assign("/deleteOrder/?id="+orderid);
    }
    $scope.updatefn=function (orderid) {
        //var r=window.confirm("DELETE ORDER : "+orderid+" ?");
        //$scope.orderlist=[];
        //if(r==true)
            window.location.assign("/updateOrder/?id="+orderid);
    }
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
            console.log(data);
            if (data.statusCode == 200) {
                /*$scope.orderlist=data.orders;*/
                 console.log(data.id.insertedIds[0]);
                window.alert("ORDER CREATED WITD ID : "+data.id.insertedIds[0]);
                window.location.assign("/getOrders");
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

login.controller('update',function($scope,$http,$location) {

    $scope.updatefn=function (orderid) {
        window.alert("INN");
        console.log(orderid);
        //$scope.orderlist=[];
        $http({
            method: "GET",
            url: '/update',
            data: {
                id : orderid
            }
        }).success(function (data) {
            //console.log(JSON.stringify(data.category));//checking the response data for statusCode
            console.log(data);
            if (data.statusCode == 200) {
                /*$scope.orderlist=data.orders;*/
                console.log(data.order);
                window.alert("ORDER UPDATED WITD ID : "+data);
                window.location.assign("/getOrders");
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