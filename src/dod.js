angular.module( "dodApp", [ "ngTouch" ] )

.run( function ( $window, $rootScope ) {
  var _gaq = $window._gaq || [];
  var pluginUrl = '//www.google-analytics.com/plugins/ga/inpage_linkid.js';
  var uuid;

  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  };
   
  function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
   
  uuid = $rootScope.uuid = guid();
  _gaq.push(['_require', 'inpage_linkid', pluginUrl]);
  _gaq.push(['_setAccount', 'UA-44241540-1']);
  _gaq.push(['_setCustomVar', 1, 'Visitor ID', uuid, 1]);
  _gaq.push(['_trackPageview']);

  $window.trackOutboundLink = function ( href, category, action, prevent ) {
    try { 
      $window._gaq.push(['_trackEvent', category , action]); 
    } catch(err){}

    if ( ! prevent ) {
      setTimeout(function() {
        document.location.href = href;
      }, 100);
    }
  }
})

.directive( "lettering", function ( $window ) {
  return function link ( scope, element, attrs ) {
    element.lettering();
  }
})

.controller( 'OrderCtrl', function OrderCtrl ( $scope, $location, $window ) {
  $scope.env = /*"sandbox";*/ "www";
  $scope.how_hear = $scope.qty = $scope.ticket_type = 0;

  function calcTotal () {
    if ( $scope.ticket_type && $scope.qty ) {
      if ( $scope.ticket_type === "Night" ) {
        $scope.total = 15 * ($scope.qty || 0);
        $scope.amount = 15;
      } else if ( $scope.ticket_type === "Day" ) {
        $scope.total = 6 * ($scope.qty || 0);
        $scope.amount = 6;
      }
    }
  }

  $scope.$watch( "ticket_type", function ( typ ) {
    calcTotal();
  });

  $scope.$watch( "qty", function ( qty ) {
    calcTotal();
  });

  $scope.$watch( function () {
    return $location.search().thankyou;
  }, function ( val ) {
    if ( val ) {
      $scope.purchased = true;
    } else {
      $scope.purchased = false;
    }
  });
})

;

