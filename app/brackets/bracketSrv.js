angular.module('app').factory('bracketSrv', [ function(){
    return {
        _computeNextRound : function(games, playerCounter, maxCounter){
            var sortedPlayers = [];
            var nextRound = [];
            var playerToGamePosition = {};
            var i = 0;
            games.forEach(function(game){
                sortedPlayers.push(game[0]);
                sortedPlayers.push(game[1]);
                nextRound.push([game[0], null]);
                playerToGamePosition[game[0]] = i;
                i++;
                nextRound.push([game[1], null]);
                playerToGamePosition[game[1]] = i;
                i++;
            });
            sortedPlayers.sort().reverse();
            sortedPlayers.forEach(function(player){
               nextRound[playerToGamePosition[player]][1] = playerCounter;
                playerCounter++;
            });
            if(playerCounter === maxCounter) return nextRound;
            return this._computeNextRound(nextRound, playerCounter, maxCounter);

        },
      generateBracket: function(players){
          var numberOfSlots = Math.pow(2, Math.ceil(Math.log(players.length)/Math.log(2)));
          var numberOfByes = numberOfSlots - players.length;
          for(var i = 0; i < numberOfByes; i++){
              players.push("Bye");
          }
          var firstRoundGames = this._computeNextRound([[0,1]],2,players.length);
          for(i = 0; i < firstRoundGames.length; i++){
              firstRoundGames[i][0] = players[firstRoundGames[i][0]];
              firstRoundGames[i][1] = players[firstRoundGames[i][1]];
          }
          return firstRoundGames;
      }
    };
} ]);