angular.module('scfc', [])
  .controller('ScfcController', ['$scope', function($scope) {
    $scope.scfc = {
    	colorA: '#BADA55',
    	colorB: '#B0BCA7',
    	colorDiff: function(a,b) {
    		var a = tinycolor(a).toHsl(),
    				b = tinycolor(b).toHsl(),

    				sat = a.s - b.s,
    				lig = a.l - b.l,
    				hue = -(a.h - b.h),

    				fnSat = (sat > 0) ? 'desaturate' : 'saturate',
    				fnLig = (lig > 0) ? 'darken' : 'lighten';

    		sat = Math.abs(sat) * 100;
    		lig = Math.abs(lig) * 100;

    		return {
    			baseColor: '#' + tinycolor(a).toHex(),
    			fnHue : 'spin',
    			hue : hue.toFixed(4),
    			fnSat : fnSat,
    			sat : sat.toFixed(4),
    			fnLig : fnLig,
    			lig: lig.toFixed(4)
    		}
    	},
    	adjustmentStringConstuctor: function(diff) {
    		var t1 = diff.fnHue + '(' + diff.baseColor + ', ' + diff.hue + ')',
    				t2 = diff.fnSat  + '(' + t1 + ', ' + diff.sat + ')',
    				t3 = diff.fnLig  + '(' + t2 + ', ' + diff.lig + ')';

    		return t3;
    	},
    	adjustmentString: function() {
    		if ( !( tinycolor($scope.scfc.colorA).isValid() && tinycolor($scope.scfc.colorB).isValid() ) )
					return 'Please enter two valid colours';
    		var adjustments = $scope.scfc.colorDiff($scope.scfc.colorA, $scope.scfc.colorB);
    		return $scope.scfc.adjustmentStringConstuctor(adjustments);
    	}
    };
  }]);
