angular.module('starter.controllers').controller('LoginCtrl', function($scope, $state, $kinvey, $cordovaPush, $http, $rootScope) {
    
    $scope.userData = {
        email: "",
        password: ""
    };

    $scope.userPresent = ($rootScope.getActiveUser() != null);    
    
    function onSuccess(user) {
        $scope.submittedError = false;
        $scope.userPresent = true;
        console.log(user);
        $state.go('menu.home');
    }

    function onError(error) {
        console.log("Error login " + error); 

        $scope.submittedError = true;
        $scope.errorDescription = error;        
    }

    $scope.validateUser = function() {

        const username = $scope.userData.email;
        const password = $scope.userData.password;

        //Log a user into Kinvey
        var promise = $kinvey.User.login(username, password);
        promise.then(function(user) {
          onSuccess(user);
        }).catch(function(error) {
          onError(error);
        });
    };

    $scope.validateUserMIC = function() {

        var user = new $kinvey.User();
        
        user.loginWithMIC('http://localhost:8100', $kinvey.AuthorizationGrant.AuthorizationCodeLoginPage, {
            version: 2
        }).then(function(user) {
            onSuccess(user);        
        }).catch(function(error) {
            onError(error);
        });
    };


    $scope.logout = function() {
        
        //Kinvey logout starts
        
        var user = $rootScope.getActiveUser();
        
        if (user) {
            $scope.userPresent = false;

            //Log the user out
            return user.logout().then(function (){
                console.log("logout complete");
            }).catch(function(error) {
                //Kinvey logout finished with error
                alert("Error logout: " + JSON.stringify(error));
            });
        }

    }

});