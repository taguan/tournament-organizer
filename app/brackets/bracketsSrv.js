angular.module('app').factory('bracketsSrv', ['localStorageService', function(localStorageService){

    var all = localStorageService.get('brackets') || [];

    return {
        all: all,
        /*
        Returns an array of games, a game being a 2-elements array being the index of the players
         */
        bracketSort : function(nbrOfPlayers){
            if(nbrOfPlayers == 2) {
                return [[0, 1]];
            }
            return this._bracketSort([[0,1]],2,nbrOfPlayers);
        },
        _bracketSort : function(games, playerCounter, maxCounter){
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
            return this._bracketSort(nextRound, playerCounter, maxCounter);

        },
        create: function(bracket){
            this.all.push(bracket);
            this.save();
        },
        save: function(){
            localStorageService.set('brackets', this.all);
        },
        _copyBracket: function(arr) {
            var bracket = [];
            for(var i = 0; i < arr.length; i++) {
                bracket[i] = [arr[i][0], arr[i][1]];
            }
            return bracket;
        },
        _getPlayer: function(groups, nbrPerGroup, bracketPosition, offset, numberOfSlotsPerSubBracket) {
            var groupIndex = (bracketPosition + offset) % numberOfSlotsPerSubBracket;
            if(groupIndex >= groups.length) {
                return null; //null will result in a Bye
            }
            var player = groups[groupIndex].players[(bracketPosition) % nbrPerGroup];
            if(!player) {
                return null; //null will result in a Bye
            }
            return player.name + ' ' + player.rank;
        },
        _populateBracket: function(groups, nbrPerGroup, subBracket, numberOfSlotsPerSubBracket) {
            var offset = subBracket.label;
            for(var i = 0; i < subBracket.bracket.length; i++) {
                var game = subBracket.bracket[i];
                game[0] = this._getPlayer(groups, nbrPerGroup, game[0], offset, numberOfSlotsPerSubBracket);
                game[1] = this._getPlayer(groups, nbrPerGroup, game[1], offset, numberOfSlotsPerSubBracket);
            }
        },
        generateBracket: function(groups, nbrPerGroup){

            //Determine how the groups will be organized in sub-brackets
            var numberOfSlotsPerSubBracket = Math.pow(2, Math.ceil(Math.log(groups.length)/Math.log(2)));
            var subBracketGames = this.bracketSort(numberOfSlotsPerSubBracket);

            //Create "nbrPerGroup" subBrackets, so every selected players per group is in a different sub-bracket
            var subBracketsArr = [];
            for(var i = 0; i < nbrPerGroup; i++) {
                subBracketsArr[i] = {
                    label: i,
                    bracket: this._copyBracket(subBracketGames)
                };
                this._populateBracket(groups, nbrPerGroup, subBracketsArr[i], numberOfSlotsPerSubBracket);
            }

            var subBracketsOrdered = [];
            //order the sub-brackets
            if(nbrPerGroup === 1) {
                subBracketsOrdered.push(subBracketsArr[0]);
            } else {
                var subBracketOrdering = this.bracketSort(nbrPerGroup);
                for(i = 0; i < subBracketOrdering.length; i++) {
                    subBracketsOrdered[2*i] = subBracketsArr[subBracketOrdering[i][0]];
                    subBracketsOrdered[2*i+1] = subBracketsArr[subBracketOrdering[i][1]];
                }
            }

            //concatenate subBrackets
            var firstRoundGames = [];
            for(i = 0; i < subBracketsOrdered.length; i++){
                for(var j = 0; j < subBracketsOrdered[i].bracket.length; j++) {
                    var game = subBracketsOrdered[i].bracket[j];
                    firstRoundGames.push(game);
                }

            }
            this.create({
                data : {
                    teams : firstRoundGames
                }
            });
            return firstRoundGames;
        },
        deleteAll: function(){
            this.all = [];
            this.save();
        }
    };
} ]);