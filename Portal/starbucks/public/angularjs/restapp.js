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
        $scope.orders.push({'qty':i,'name':$scope.order.name,'milk':$scope.order.milk,'size':$scope.order.size});
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
            $scope.orders=[];

           // window.location.assign('/');
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
}]);

restapp.controller('sessioncheck',['$scope','$http','$location',function($scope,$http,$location) {
console.log("IN CONTROLLER");
    $scope.orderlist=[];
    var s1 = $location.absUrl();
    var params = s1.split("?");
    console.log(params[1]);
    var parValue = params[1].split("=");
    console.log(parValue[1]);

    $http({
        method: "POST",
        url: '/orders1',
        data: {
            location : parValue[1]
        }
    }).success(function (data) {
        //console.log(JSON.stringify(data.category));//checking the response data for statusCode
        console.log(data);
        if (data.statusCode === 200) {
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
}]);

restapp.controller('creation',function($scope,$http,$location) {
    window.alert("CREATION C");
    var x={
        "location":"Palo Alto",
        "items":[
            {
                "qty":11,
                "name":"latte",
                "milk":"whole",
                "size":"venti"
            }
        ]
    };
    $scope.createfn=function () {
        console.log($scope.restbucks);
        //$scope.orderlist=[];
        $http({
            method: "POST",
            url: '/createOrder1',
            data:{
                order:x
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

restapp.controller('updation',function($scope,$http,$location) {
    window.alert("INN");
    var s1 = $location.absUrl();
    var params = s1.split("?");
    console.log(params[1]);
    var parValue = params[1].split("=");
    console.log(parValue[1]);
    $scope.idv=parValue[1];
    //var x=$location.search().id;
    $http({
        method: "POST",
        url: '/getOrder',
        data: {
            id:parValue[1]
        }
    }).success(function (data) {
        //console.log(JSON.stringify(data.category));//checking the response data for statusCode
        console.log(data);
        if (data.statusCode == 200) {
            //   $scope.orderlist=data.orders;
            $scope.restbucks=data.order.items[0];
            console.log(data);
        }
        else {
            //  $scope.orderlist=[];
            console.log(data);

        }
        //Making a get call to the '/redirectToHomepage' API
        //window.location.assign("/homepage");
    }).error(function (error) {
    });


    $scope.updatefn=function () {
        window.alert("INN");
        console.log($scope.idv);
        //$scope.orderlist=[];
        $http({
            method: "POST",
            url: '/update',
            data: {
                id : $scope.idv,
                restbucks11:$scope.restbucks
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
