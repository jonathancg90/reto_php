(function () {
    angular.module('requestApp', []);

    function requestService ($http) {

        this.get = function (url) {
            return $http.get(url)
                .success(function(response) {
                    if(response.status == 200) {
                        return response.data;
                    } else {
                        return [];
                    }
                }).error(function (err, status) {

                });
        };
        this.post = function (url, data) {
            return $http.post(url, data)
                .success(function(response) {
                    debugger
                    if(response.status == 200) {
                        return response.data;
                    } else {
                        return [];
                    }
                }).error(function (err, status) {
                });
        };

        this.post_multipart = function (url, data) {
            return $http.post(url, data, {headers: {'Content-Type':'multipart/form-data' }})
                .success(function(response) {
                    if(response.status == 200) {
                        return response.data;
                    } else {
                        return [];
                    }
                }).error(function (err, status) {
                });
        };

    }
    angular
        .module('requestApp')
        .service('requestService', requestService);

})();