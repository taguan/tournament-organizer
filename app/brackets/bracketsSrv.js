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
        _getPlayer: function(roster, bracketPosition) {
            var player = roster[bracketPosition];
            if (!player) {
                return null;
            }
            return player.name + ' ' + player.rank;
        },
        _populateBracket: function(roster, subBracket) {
            for(var i = 0; i < subBracket.bracket.length; i++) {
                var game = subBracket.bracket[i];
                game[0] = this._getPlayer(roster, game[0]);
                game[1] = this._getPlayer(roster, game[1]);
            }
        },
        generateBracket: function(groups, nbrPerGroup){

            //Determine how the groups will be organized in sub-brackets
            var numberOfSelectedPlayers = groups.length * nbrPerGroup;
            var numberOfSlotsPerSubBracket = Math.pow(2, Math.ceil(Math.log(groups.length)/Math.log(2)));
            if (numberOfSlotsPerSubBracket == 1) {
                // small hack to avoid having sub brackets with a single slot, which makes the whole algorithm fail
                numberOfSlotsPerSubBracket = 2;
            }
            var subBracketGames = this.bracketSort(numberOfSlotsPerSubBracket);
            var numberOfSubBrackets = Math.ceil(Math.pow(2, Math.ceil(Math.log(numberOfSelectedPlayers)/Math.log(2))) / numberOfSlotsPerSubBracket)

            //to generate the sub brackets
            //assign players to sub brackets: for each group, each selected player goes to a different sub bracket (sorted by position, they might be doublons) % number of sub brackets
            //this gives you a seeding list for each sub bracket (the ordered array index gives you the seed). If there is no seed, put bye
            //you can then generate the sub bracket following the subbracketgames
            var subBracketsRoster = [];
            for(var i = 0; i < numberOfSubBrackets; i++) {
                subBracketsRoster[i] = [];
            }
            var offset = 0;
            groups.forEach(function(group) {
                var subBracketCounter = offset;
                for(var i = 0; i < nbrPerGroup; i++) {
                    subBracketsRoster[subBracketCounter % numberOfSubBrackets].push(group.players[i]);
                    subBracketCounter++;
                }
                offset++;
            });
            subBracketsRoster.forEach(function(roster) {
                // sort by position
                roster.sort(function(a, b) {
                    if(a.position < b.position) {
                        return -1;
                    }
                    return 1;
                });
            });

            //Create "nbrPerGroup" subBrackets, so every selected players per group is in a different sub-bracket
            var subBracketsArr = [];
            for(var i = 0; i < numberOfSubBrackets; i++) {
                subBracketsArr[i] = {
                    label: i,
                    bracket: this._copyBracket(subBracketGames)
                };
                this._populateBracket(subBracketsRoster[i], subBracketsArr[i]);
            }

            var subBracketsOrdered = [];
            //order the sub-brackets
            if(nbrPerGroup === 1) {
                subBracketsOrdered.push(subBracketsArr[0]);
            } else if (numberOfSubBrackets == 1) {
                subBracketsOrdered = subBracketsArr;
            } else {
                var subBracketOrdering = this.bracketSort(numberOfSubBrackets);
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