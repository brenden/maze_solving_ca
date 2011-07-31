$(document).ready(function() {                                                                                  

        //Initialize board & rules
        var aut = new Board(20, 40); 
        $('#result').attr('width', aut.size*aut.height);
        $('#result').attr('height', aut.size*aut.width);
        aut.board = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,6,3,3,3,3,0,3,3,3,3,3,3,3,3,3,3,3,3,0],
        [0,0,3,0,0,3,3,3,3,0,0,3,0,3,0,0,0,0,3,0],
        [0,0,3,3,3,3,3,0,3,0,3,3,0,3,3,0,3,3,3,0],
        [0,0,0,0,3,0,3,3,3,0,3,0,0,3,0,0,3,0,3,0],
        [0,3,3,0,3,0,3,0,0,0,3,0,3,3,3,0,3,0,3,0],
        [0,0,3,0,3,3,3,0,3,3,3,3,3,0,3,0,3,3,3,0],
        [0,0,3,0,0,3,0,0,3,0,0,3,0,0,3,0,0,0,0,0],
        [0,3,3,3,3,3,3,3,3,3,0,3,0,3,3,3,3,3,3,0],
        [0,3,0,3,0,0,0,3,0,3,3,3,0,3,0,0,0,0,3,0],
        [0,3,3,3,3,3,3,3,3,3,0,3,0,3,3,3,3,3,3,0],
        [0,0,3,0,3,0,0,0,0,0,0,3,0,3,0,0,0,0,0,0],
        [0,0,3,3,3,3,3,3,3,3,0,3,3,3,0,3,3,3,3,0],
        [0,0,0,3,0,3,0,0,0,3,0,0,0,3,3,3,0,0,3,0],
        [0,3,0,3,3,3,0,3,3,3,3,3,0,0,0,0,0,3,3,0],
        [0,3,0,0,0,3,0,0,3,0,0,3,3,3,3,3,3,3,0,0],
        [0,3,3,3,3,3,0,3,3,3,3,3,0,3,0,0,0,0,0,0],
        [0,3,0,0,0,3,0,3,0,0,3,0,0,3,3,3,3,3,3,0],
        [0,3,3,3,0,3,0,3,0,3,3,0,3,3,0,3,0,0,3,0],
        [0,0,3,0,0,3,3,3,0,3,0,0,3,0,0,3,0,3,3,0],
        [0,3,3,0,3,3,0,3,0,3,3,0,3,3,3,3,0,3,0,0],
        [0,3,0,0,3,0,0,3,0,0,3,0,0,0,0,0,0,3,3,0],
        [0,3,3,0,3,3,0,3,3,3,3,3,3,3,3,3,0,0,3,0],
        [0,0,3,0,0,3,0,0,3,0,0,3,0,3,0,3,3,3,3,0],
        [0,3,3,0,3,3,3,0,3,3,3,3,0,3,0,0,0,0,0,0],
        [0,3,0,0,0,0,3,0,0,0,0,0,0,3,3,3,3,3,3,0],
        [0,3,3,3,0,3,3,3,3,3,3,0,0,0,0,0,0,0,3,0],
        [0,3,0,3,0,0,3,0,0,0,3,3,3,3,3,3,3,3,3,0],
        [0,3,3,3,0,3,3,3,3,0,3,0,0,0,0,0,3,0,0,0],
        [0,3,0,0,0,3,0,0,3,0,3,3,3,3,3,3,3,3,3,0],
        [0,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,3,0],
        [0,0,0,0,0,0,3,0,0,0,3,3,3,0,3,3,3,0,0,0],
        [0,3,3,3,0,3,3,3,3,3,3,0,3,3,3,0,3,3,0,0],
        [0,3,0,3,0,3,0,0,3,0,0,0,0,3,0,0,0,3,3,0],
        [0,3,0,3,0,3,3,3,3,0,3,3,0,3,3,3,0,0,3,0],
        [0,3,0,3,0,0,3,0,0,0,3,3,0,3,0,3,0,3,3,0],
        [0,3,3,3,3,0,3,3,3,3,3,3,0,3,0,3,3,3,3,0],
        [0,0,3,0,3,0,0,0,0,3,0,3,0,0,0,3,3,0,3,0],
        [0,7,3,3,3,3,3,3,3,3,0,3,3,3,3,3,3,3,3,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,] ];
        aut.draw();
        var stop = -1

        $('#solve').click(

               function(event) {

                        event.preventDefault(); 

                        //Execution loop
                        var execLoop = function(automata) { 

                                if (stop==0) {
                                        automata.draw();
                                        automata.iterate();

                                        if (automata.run==-1) {
                                                stop=1;
                                                automata.draw(true);
                                        }
                                }

                                return automata;
                        }

                        aut.draw();

                        if (stop==-1) {

                                stop = 0;
                                setInterval(function() {execLoop(aut);}, 200);
                        }
                        else stop = 0;
               }
        );

        $('#reset').click(
                
                function(event) {

                        aut.board = aut.board.map(function(cells) {

                                return cells.map(function(cell) {

                                        return (cell==0 || cell==6 || cell==7) ? cell : 3;
                                });
                        });

                        aut.draw();
                        stop=1;
                        aut.run=0;
                }
        );

        $('#result').mousedown(

               function(event) {

                       var val = $('input[name=type]:checked').attr('value');
                       var x = event.pageX - $(this).offset().left;
                       var y = event.pageY - $(this).offset().top;
                       var row = Math.floor(x/aut.size);
                       var col = Math.floor(y/aut.size);
                       
                       if (val==6 || val==7) {

                                aut.board = aut.board.map(function(cells) {

                                        return cells.map(function(cell) {

                                                return (cell==val) ? 0 : cell;
                                        });
                                });
                       }

                       aut.board[row][col] = (aut.board[row][col]==val) ? 0 : val;
                       aut.draw();
               } 
        );
       
        $("#help-icon").click(

                function(event) {

                        if ($("#help-icon").html()=="?") {

                                $("#information").show();
                                $("#help-icon").html("X");
                        }
                        else {
                                $("#information").hide();
                                $("#help-icon").html("?");
                        }
                }
         );

         $("#clear").click(

                function(event) {

                        aut.board = generate_2d(aut.width, aut.height);
                        aut.draw();
                        stop=1;
                        aut.run=0;
                }
         ); 
});
