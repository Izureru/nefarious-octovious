// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    $cordovaHealthKit.isAvailable().then(function(yes) {
        // HK is available
        var permissions = ['HKQuantityTypeIdentifierHeight'];
     
        $cordovaHealthKit.requestAuthorization(
            permissions, // Read permission
            permissions // Write permission
        ).then(function(success) {
            // store that you have permissions
        }, function(err) {
            // handle error
        });
     
    }, function(no) {
        // No HK available
    });

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('AppCtrl', function($scope, $cordovaHealthKit) {
    $scope.body = {
        height: ''
    };
 
    $scope.saveHeight = function() {
        $cordovaHealthKit.saveHeight($scope.body.height, 'cm').then(function(v) {
        }, function(err) {
            console.log(err);
        });
    };
 
    $scope.getHeight = function() {
        $cordovaHealthKit.readHeight('cm').then(function(v) {
            alert('Your height: ' + v.value + " " + v.unit);
        }, function(err) {
            console.log(err);
        });
    };

    // $scope.getSteps = function() {
    //     $cordovaHealthKit.    readHeight('cm').then(function(v) {
    //         alert('Your height: ' + v.value + " " + v.unit);
    //     }, function(err) {
    //         console.log(err);
    //     });
    // };
});
