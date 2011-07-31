        NUM_STATES = 9;
        
        //Board constructor
        function Board(width, height) {

                this.board = generate_2d(width, height); 
                this.width = width;
                this.height = height;
                this.size = 15;
                this.run = 0;

                //Pad the edges of the board with empty cells
                this.pad = function(sheet) {
 
                        sheet.push(generate_2d(sheet[0].length, 1));
                        sheet.unshift(generate_2d(sheet[0].length, 1));
                        sheet = sheet.map(function(row) {return [0].concat(row).concat([0])});

                        return sheet;
                }

                /* 0: Blank
                ** 1: Rejected
                ** 2: Forward Maze
                ** 3: Backward Maze
                ** 4: Forward Head
                ** 5: Backward Head
                ** 6: Start
                ** 7: Finish
                **/

                //Maze-solving rule
                this.solve = function(nei) {

                        var me = nei[1][1];                        
                        var vonNeumann = [nei[0][1], nei[1][0], nei[1][2], nei[2][1]];
                        var count = generateCounter(vonNeumann);
                        var contact = generateContacter(vonNeumann);
                        switch(parseInt(me)) {

                                case 2:
                                        if (count(1)+count(0)==3)
                                                return 1;
                                        else if (count(4)>1 && !contact(2) && !contact(6))
                                                return 1;
                                        else if (contact(5) || contact(7))  
                                                return 5;
                                        else
                                                return me;
                                case 3:
                                        if (count(1)+count(0)==3)
                                                return 1;
                                        else if (count(5)>1 && !contact(3) && !contact(7))
                                                return 1;
                                        else if (contact(4) || contact(6))
                                                return 4;
                                        else
                                                return me;
                                case 4:
                                        if (contact(7)) {
                                                return 5;
                                        }
                                        else if (contact(4) || !contact(3))
                                                return 1;
                                        else 
                                                return 2;
                                case 5:
                                        if (contact(6)) { 
                                                return 4;
                                        }
                                        else if (contact(5) || !contact(2))
                                                return 1;
                                        else 
                                                return 3;
                                case 6:
                                        if (contact(5))
                                                this.run = (this.heads==count(4)+count(5) && (this.run==1 || this.run==-1)) ? -1 : 2; 
                                        return me;
                                case 7:
                                        if (contact(4)) 
                                                this.run = (this.heads==count(4)+count(5) && (this.run==2 || this.run==-1)) ? -1 : 1;
                                        return me;
                                default:
                                        return me;
                        }
                }
        }

        //Run a single iteration of the board
        Board.prototype.iterate = function() {

                //Create a 2D array of Moore neighborhoods
                var neighborhoods = generate_2d(this.width, this.height);
                var surface = this.pad(this.board.slice(0));  

                for (var i=1; i<this.height+1; i++) {

                        for (var j=1; j<this.width+1; j++) {

                                var neighbors = new Array(3);

                                for (var n=-1; n<1+1; n++) {
        
                                        row = (i+n);
                                        fromCol = (j-1);
                                        toCol = (j+2);
                                        neighbors[n+1] = surface[row].slice(fromCol, toCol);
                                }
 
                                neighborhoods[i-1][j-1] = neighbors;
                        }
                }
 
                //Apply the given rule to the neighborhoods to yield the next generation
                var cHeads = 0;

                for (var i=0; i<this.height; i++) {
                
                       for (var j=0; j<this.width; j++) {

                               var newVal = this.solve(neighborhoods[i][j]);
                               this.run = (newVal!=this.board[i][j] && newVal==1) ? 0 : this.run;
                               cHeads = (newVal==4 || newVal==5) ? cHeads+1 : cHeads;
                               this.board[i][j] = newVal;
                       }
                }

                this.heads = cHeads;
        }

        //Draw the board
        Board.prototype.draw = function(last) {

                var canvas = $('#result').get(0);
                var ctx = canvas.getContext('2d');

                ctx.fillStyle = "#242424";
                ctx.fillRect(0, 0, this.size*this.height, this.size*this.width);

                //O:blank, 1:maze, 2:start, 3:finish, 4:f, 5:fh, 6:b, 7:bh, 8:death
                var colors = {1: "#595959", 2: "#FFDE40", 3: "#C4C2C3", 4: "#DBD62E", 5: "#ADADAD", 6: "#00BF32", 7: "#FF1E00"};
                for (var i=0; i<this.height; i++) {

                        for (var j=0; j<this.width; j++) {

                                if (this.board[i][j]!=0) {

                                        ctx.fillStyle = (last && !(this.board[i][j] in {0:1, 1:1, 6:1, 7:1})) ? "#FFFFFF" :colors[this.board[i][j]]; 
                                        ctx.fillRect(i*this.size, j*this.size, this.size, this.size);
                                } 
                        }
                }
        }
