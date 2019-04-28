'use strict';

angular.module('flickrApp', ['ngMaterial']).component('photoList', {
    templateUrl: 'photo-list/photo-list.template.html',
    controller: ['$scope', '$http', '$mdDialog',
        function PhotoListController($scope, $http, $mdDialog) {

            $scope.results = [];

            $scope.isSearching = false;

            $scope.search = function () {
                $scope.isSearching = true;
                $http({
                    method: "GET",
                    url: "https://api.flickr.com/services/rest",
                    params: {
                        method: 'flickr.photos.search',
                        api_key: 'a9033fff6d9dd8505ee1fd2c37e2b84d',
                        text: $scope.searchTerm,
                        format: 'json',
                        nojsoncallback: 1
                    }
                }).then(function successCallBack(data) {
                    $scope.results = data;
                    $scope.isSearching = false;
                }, function errrorCallBack(data) {
                    console.error(data);
                    $scope.isSearching = false;

                })
            }

            $scope.displayFullScreen = function (picture) {
                console.log(picture);
                $mdDialog.show({
                    locals: {photo : picture},
                    controller: ['$scope', 'photo', function($scope, photo) { 
                      $scope.photo = photo;
                          $scope.hide = function () {
                              $mdDialog.hide();
                          };
                    }],
                    templateUrl: 'photo-list/photo-dialog.html',
                    parent: angular.element(document.body),
                    targetEvent: picture,
                    clickOutsideToClose: true,
                    fullscreen: true
                });
            }
        }]
})