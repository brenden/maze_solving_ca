//Returns number of cells with a given value in the neighborhood
function generateCounter(neighborhood) {
       
        neighborhood.unshift(0);

        return function(what) {

                return  neighborhood.reduce(
                        function(sum, cur) {
                                return (cur==what) ? sum+1 : sum;
                        }
                );
        }
}

//Returns whether or not a given cell exists in a neighborhood
function generateContacter(neighborhood) {

        return function(what) {

                return neighborhood.some(
                        function(item) {
                                return (item==what);
                        }
                );
        }
}

//Utility for making 2D arrays
function generate_2d(width, height) {

        var arr = new Array(height);

        for (var i=0; i<height; i++) {
               arr[i] = new Array(width);
              
               for (var j=0; j<width; j++) {
                        arr[i][j] = 0; 
               } 
        }

        return arr;
} 
