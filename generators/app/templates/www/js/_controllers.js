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

        function reskin(skinCollection){
            var dataStore = $kinvey.DataStore.collection(skinCollection, $kinvey.DataStoreType.Network);

            dataStore.find().subscribe(function(result) {
                console.log(result);
                var brand = result;
                console.log(brand);

                if (brand[0].logo && 
                    brand[0].logo.indexOf('https') == -1 &&
                    brand[0].logo.indexOf('http') == -1) {
                    console.log('local path');
                    brand[0].logo = "img/" + brand[0].logo;
                } 
                $rootScope.primarycolor = brand[0].primaryColor;
                $rootScope.logo = brand[0].LogoFileName;
                $rootScope.screenText = brand[0].tagline;
                $rootScope.textColor = brand[0].textColor;
                $rootScope.logo = brand[0].logo;
                $scope.$digest();
            });
        }

        const skinCollection = '<%= config.skin %>';
        if (skinCollection != null){
            reskin(skinCollection);
        }

    });

})

