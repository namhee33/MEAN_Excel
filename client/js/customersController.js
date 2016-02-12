var myApp = angular.module('myApp', []);

myApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

myApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl, callback){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data){
            console.log("file successfully uploaded to the server####");
           
            callback(data);
        })
        .error(function(error){
            console.log("error occur while uploading... ");
            callback(error);
        });
    }
}]);

myApp.controller('customersController', ['$scope', 'fileUpload', function($scope, fileUpload){
    $scope.customers = [];
    $scope.error_msg = "";
    $scope.allcustomers = [];

    $scope.setChanged = function(){
        $scope.error_msg = "";
    }

    $scope.viewAll = function(){
        $http.get('/index').success(function(info){
             for(var i=0;i<info.length;i++){
                console.log(info[i].data);
                var arr = info[i];   
                console.log("arr size: ", arr)
                $scope.allcustomers.push(arr);
            }
        })        
       
    }

    $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);
        if(file === undefined){  //no file selected
            console.log("No file is selected. Choose file, first.");
            $scope.error_msg = "No file is selected. Choose file, first.";
        }else if(file.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){ //non excel file choosed
            console.log("only excel file please");
            $scope.error_msg = "Select only excel file";
        }else{
            var uploadUrl = "/fileUpload";
            $scope.error_msg = "";
            $scope.customers = [];
            fileUpload.uploadFileToUrl(file, uploadUrl, function(info){
                console.log("data in the Controller ", info);
                $scope.customers.push(info);

                console.log("data", $scope.customers);
                
            });
        } 
    };
    
}]);
