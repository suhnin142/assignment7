import gameModel from '/js/model/gameModel.js';
import gameView from '/js/view/gameView.js';
import Player from '/js/model/Player.js';
import registerView from '/js/view/registerView.js';

const gameController = {

    /**
     * init function for the main controller
     * object creation will happen here
     */
    init() {
        //const result =  this.isGameEnd([4],gameModeStevenl.wining_positions);
        //console.log(result);

        this.assignPlayer();
        gameView.init(this);
        registerView.init(this);
        //scoreBoardView.init(this);
    },

    assignPlayer(player1Name,player2Name) {
        gameModel.player1 = new Player(player1Name, 'O');
        gameModel.player2 = new Player(player2Name, 'X');
    },

    /**
     * Check if the given position list is enough to end the game
     * 
     * @param {Array} positions 
     * @param {Array} wining_positions 
     */
    isGameEnd(positions, wining_positions) {

        //looping over positions 
        for (const index in wining_positions) {
            let is_game_end = true;

            //looping over item
            for (const j in wining_positions[index]) {
                const current_wining_position = wining_positions[index][j];

                //if not matching item is found
                //End the search
                if (positions.indexOf(current_wining_position) === -1) {
                    is_game_end = false;
                }
            }
            if (is_game_end) {
                console.log("the game is end");
                return true;
            }
        }
        return false;
    },

    addPosition(position) {
        //current player's position store
        gameModel.currentPlayer.position.push(position);
        console.log(gameModel.currentPlayer.position);

        //check if the game is end
        const result = this.isGameEnd(
            gameModel.currentPlayer.position,
            gameModel.wining_positions
        )
        console.log(gameModel.currentPlayer);

        //change the current user
        //do not change the player if the game is already end
        if (!result) {
            this.changePlayer();
        } else {
            //save in the localstorage
           
           const currentWinnerList= gameModel.winnerList;
         currentWinnerList.push(gameModel.currentPlayer.name);
         gameModel.winnerList=currentWinnerList;
         alert(`${gameModel.currentPlayer.name} won the game!`);
           
          let finalScore=gameModel.winnerList.reduce((accumulator,currentValue)=>{
            if(accumulator[currentValue] == undefined){
                accumulator[currentValue]=1;
            }
            else{
                const current_value=accumulator[currentValue];
                //console.log(current_value);
                accumulator[currentValue]=current_value+1;
            }
            return accumulator;
            //console.log(accumulator);
           },[]);
           console.log(finalScore);

          
        }

        //re-render~

        gameView.render();
    },

    changePlayer() {
        if (gameModel.current_player_index === 1) {
            gameModel.current_player_index = 2;
        } else {
            gameModel.current_player_index = 1;
        }
    },
    getAllPLayer() {
        return [gameModel.player1, gameModel.player2];
    },

    getCurrentPlayer() {
        return gameModel.currentPlayer;
    },
    startGame(player1Name,player2Name){
    this.assignPlayer(player1Name,player2Name);
    registerView.hide();
        gameView.render();

    },
    endGame(){
        alert("are you sure");
        gameView.hide();
        registerView.show();
        registerView.clear();
    },
    restartGame() {
        //Restart the index
        gameModel.current_player_index = 1;
        //Restart the player
        this.assignPlayer(gameModel.player1.name,gameModel.player2.name);
        //Re-render
        gameView.render();
    }
};
export default gameController;