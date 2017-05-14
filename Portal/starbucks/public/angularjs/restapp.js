/**
 * Created by harshmehta6711 on 11-05-2017.
 */
var restapp=angular.module("restbucks",[]);

restapp.controller('restCtrl',['$scope','$http','$rootScope', function($scope,$http,$rootScope) {
    var i=1;
    $scope.orders=[];
   // $scope.orders.push({'num':i,'name':'xyz','milk':$scope.order.milk,'size':$scope.order.size});
    $scope.addorder=function () {
        console.log($scope.order.name);
        $scope.orders.push({'qty':i,'name':$scope.order.name,'milk':$scope.order.milk,'size':$scope.order.size});
        $scope.order='';
        i++;
    };

    $scope.placeorder=function () {
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
if($scope.city=="San Jose") {
    window.location.assign('/v3/starbucks/orders/?location=' + $scope.city);
    window.location.assign('/v3/starbucks/orders/?location=' + $scope.city);
}
else {
    window.location.assign('/v3/starbucks/orders1/?location=' + $scope.city);
    window.location.assign('/v3/starbucks/orders1/?location=' + $scope.city);
}
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
}]);

restapp.controller('sessioncheck',['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope) {
console.log("IN CONTROLLER 1");
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
           // console.log(data.orders[0]._id+"   ---"+data.orders[0].location);
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
        {
            $http({
                method: "POST",
                url: '/deleteOrder/?id='+orderid,
                data: {
                    location : parValue[1]
                }
            }).success(function (data) {
                //console.log(JSON.stringify(data.category));//checking the response data for statusCode
                console.log(data);
                window.location.assign('/v3/starbucks/orders/?location='+parValue[1]);

                if (data.statusCode === 200) {
                    console.log(data);

                }
                else {
                    console.log(data);

                }
                //Making a get call to the '/redirectToHomepage' API
                //window.location.assign("/homepage");
            }).error(function (error) {
            });
            //window.location.assign("/deleteOrder/?id="+orderid);
    }};
    $scope.updatefn=function (orderid) {
        $rootScope.location=parValue[1].replace("%20"," ");
        window.location.assign("/updateOrder/?id="+orderid);
    }
}]);

restapp.controller('sessioncheck1',['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope) {
    console.log("IN CONTROLLER 2");
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
             console.log(data.orders[0]._id+"   ---"+data.orders[0].location);
            console.log($scope.orderlist);
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
        {
            $http({
                method: "POST",
                url: '/deleteOrder/?id='+orderid,
                data: {
                    location : parValue[1]
                }
            }).success(function (data) {
                //console.log(JSON.stringify(data.category));//checking the response data for statusCode
                console.log(data);
                window.location.assign('/v3/starbucks/orders1/?location='+parValue[1]);

                if (data.statusCode === 200) {
                    console.log(data);

                }
                else {
                    console.log(data);

                }
                //Making a get call to the '/redirectToHomepage' API
                //window.location.assign("/homepage");
            }).error(function (error) {
            });
            //window.location.assign("/deleteOrder/?id="+orderid);
        }};
    $scope.updatefn=function (orderid) {
        $rootScope.location=parValue[1].replace("%20"," ");
        window.location.assign("/updateOrder/?id="+orderid);
    }
}]);

restapp.controller('creation',function($scope,$http,$location) {
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

restapp.controller('updation',function($scope,$http,$location,$rootScope) {
    var s1 = $location.absUrl();
    var params = s1.split("?");
    console.log(params[1]);
    var parValue = params[1].split("=");
    console.log(parValue[1]);
    $scope.idv=parValue[1];
    $scope.orders=[];
    $scope.addorder=function () {
        console.log($scope.order.name);
        $scope.orders.push({'qty':1,'name':$scope.order.name,'milk':$scope.order.milk,'size':$scope.order.size});
        $scope.order='';
    };


    //var x=$location.search().id;
    $http({
        method: "POST",
        url: '/getOrder',
        data: {
            id:parValue[1],
            location:"San%20Jose"
        }
    }).success(function (data) {
        //console.log(JSON.stringify(data.category));//checking the response data for statusCode
        console.log(data);
        if (data.statusCode == 200) {
               $scope.order=data.orders.items[0];
           // $scope.restbucks=data.order.items[0];
            console.log(data.orders);
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
        console.log($scope.idv);
        //console.log($scope.orders);
        var x={"location":"San Jose","items":[{"qty":1,"name":"Latte","milk":"Whole milk","size":"Short 8oz"}]};
        console.log("X");
        console.log(x);
        //$scope.orderlist=[];
        $http({
            method: "POST",
            url: '/update',
            data: {
                id : $scope.idv,
                restbucks11:x,
                location:"San Jose"
            }
        }).success(function (data) {
            //console.log(JSON.stringify(data.category));//checking the response data for statusCode
            console.log(data);
            if (data.statusCode == 200) {
                /*$scope.orderlist=data.orders;*/
                console.log(data.order);
                window.location.assign('/v3/starbucks/orders');
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
