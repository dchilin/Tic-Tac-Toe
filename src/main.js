const app = new Vue({
  el: '#app',
  data: {
    board:  [
              ['', '' , ''],
              ['', '' , ''],
              ['', '' , '']
    ],
  
    user: 'X',
    computer: 'O',
    player: this.user,   //user will be player1 for now
    
    message: 'Ready?',
    
    user_score: 0,
    computer_score: 0
  },

  methods: {
      play: function(x,y) { //X&Y is used to grab the index of cell that was selected
        //User will be starting the game
        this.player = this.user // setting player == user
        console.log(this.player)
        this.users_turn(x,y)    // function for users move
        if (this.checkifWinner()) {
          this.gameOver()
          return;
          }
        else { this.message = ''}

        //now its computers turn
        this.player = this.computer
        console.log(this.player)
        this.computers_turn()
        if (this.checkifWinner()) {
          this.gameOver()
          return;
          }
    
        },

      // function for users turn
      users_turn: function(x,y) {
        this.check_board(x,y)
      },

      // function for computers turn
      computers_turn: function () {
        // generate 2 random numbers then check if #s are available
        randomX = Math.floor(Math.random() * 3)
        randomY = Math.floor(Math.random() * 3)
        this.check_board(randomX,randomY)
      },

      // function checks to see if selected cell is still available to play
      check_board: function(x,y) {
        if (this.board[x][y] == "") {
          this.board[x][y] = this.player
          Vue.set(this.board[x],y, this.player )
        } else {
           if (this.player === this.user) {
              alert('Please try again.')
            } else {
              this.computers_turn()
            }
        }
      },

      // function to check if theres a winner
      checkifWinner: function() {
          // combinations we need for reference:
        for (let i=0; i<3; i++) {
          // horizonatal lines 
          if (this.board[i][0]== this.player && this.board[i][1] == this.player && this.board[i][2] == this.player) { 
            return true;
          } 
        }
          // vertical lines
        for (let i=0; i<3; i++) {
          if (this.board[0][i]== this.player && this.board[1][i] == this.player && this.board[2][i] == this.player) {
            return true;
          } 
        }
        // diagonal lines
        if  (this.board[0][0]== this.player && this.board[1][1] == this.player && this.board[2][2] == this.player) {
          return true;
        } 
        if  (this.board[2][0]== this.player && this.board[1][1] == this.player && this.board[0][2] == this.player) {
          return true;
        } 
      },

      //game over message and returns score
      gameOver: function () {
        this.message = "GAME OVER. " + this.player + " has won"
        this.scoreBoard();       
      },

   
      // resets board for a new game
      resetBoard: function() {
        this.board = [
              ['', '' , ''],
              ['', '' , ''],
              ['', '' , '']
        ],
        this.message = ''
      },

      //tallys up scores
      scoreBoard: function() {
        if (this.player === this.user) {
          this.user_score++;
        } else {
          this.computer_score++;
        }
      }

  }
})


