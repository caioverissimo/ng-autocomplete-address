angular.module( "Test", ['ngAutocomplete'])
  .controller("TestCtrl",function ($scope) {

    // Autocomplete native config
    $scope.result1 = '';
    $scope.options1 = null;
    $scope.details1 = '';

    // $scope.result2 = '';
    // $scope.options2 = {
    //   country: 'ca',
    //   types: '(cities)'
    // };    $scope.details2 = '';
    //
    // $scope.result3 = '';
    // $scope.options3 = {
    //   country: 'gb',
    //   types: 'establishment'
    // };
    // $scope.details3 = '';


    // Customization
    $scope.address = {};
    // $scope.adress.name = $scope.details1.
    $scope.address.country = '';
    $scope.address.state = '';

    var expose = function () {
      setTimeout(function() {
        console.log('$scope.details1');
        console.log($scope.details1);

        if ($scope.details1 !== "") {
          console.log('preenchido!!');

          for (var i=0; i < $scope.details1.address_components.length; i++) {

            switch ($scope.details1.address_components[i].types[0]) {
              case 'country':
                $scope.address.country = $scope.details1.address_components[i].short_name;
                break;
              case 'administrative_area_level_1':
                $scope.address.state = $scope.details1.address_components[i].short_name;
                break;
              case 'administrative_area_level_2':
                $scope.address.city = $scope.details1.address_components[i].short_name;
                break;
              case 'locality':
                $scope.address.city = $scope.details1.address_components[i].short_name;
                break;
              case 'sublocality_level_1':
                $scope.address.sublocality = $scope.details1.address_components[i].short_name;
                break;
              case 'route':
                $scope.address.name = $scope.details1.address_components[i].short_name;
                break;
              case 'postal_code':
                $scope.address.postalCode = $scope.details1.address_components[i].short_name;
                break;
            }

          }

          console.log($scope.address.country);
          $scope.$digest();
        } else {
          console.log('vazio!!!');
        }


        expose();
      }, 2000);

    };

    expose();

  });