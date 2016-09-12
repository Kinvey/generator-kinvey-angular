angular.module('starter.controllers')
.controller('<%= collectionName %>Ctrl', function($scope, $kinvey) {

    function render(data){
        $scope.items = data;
        $scope.$digest();
    }

    function fetch() {
        //get items from the backend
        var dataStore = $kinvey.DataStore.getInstance('<%= collectionName %>', $kinvey.DataStoreType.Cache);
        
        dataStore.find().subscribe(function(result) { 
            render(result);        
        }, function(error) {
            console.log(error);
        });
    }

    $scope.$on('$ionicView.beforeEnter', fetch);

    $scope.doRefresh = function() {
        fetch();
    }
    
})

.config(function($stateProvider, $urlRouterProvider, $kinveyProvider) {
    $stateProvider
        .state('menu.<%= collectionName %>', {
            url: '/<%= collectionName %>',
            views: {
                'menuContent': {
                    templateUrl: 'templates/<%= collectionName %>.html',
                    controller: '<%= collectionName %>Ctrl'
                }
            }
        })
});
