angular.module('starter.controllers', ['kinvey', 'ngCordova'])

.controller('MenuCtrl', function($scope, $kinvey, $ionicSideMenuDelegate, $ionicModal) {
    console.log('inside menuctrl');

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $ionicModal.fromTemplateUrl('templates/modal.html', function(modal) {
        $scope.modal = modal;
    }, {
        animation: 'slide-in-up'
    });
})

.controller('HomeCtrl', function($scope, $kinvey, $ionicSideMenuDelegate, $rootScope, $state) {
    console.log('home');

    $scope.$on('$ionicView.beforeEnter', function() {
        // we're authenticated, grab logo and color scheme
        var activeUser = $rootScope.getActiveUser();

        if (!activeUser) {
            $state.go('menu.login');
            return;
        }
        
        $rootScope.primarycolor = "#D44B2B";
        $rootScope.logo = "img/background.jpeg";
        $rootScope.textColor = "#D44B2B";
        $scope.$digest();
    });

})

