angular.module('app').factory('bracketsSrv', ['Restangular', '$q', 'groupsSrv', function(Restangular, $q, groupsSrv){
    return {
        all: [],
        _allP: Restangular.all('brackets'),
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
        findAll: function() {
            var deferred = $q.defer();
            if(this.all.length > 0){
                deferred.resolve(this.all);
                return deferred.promise;
            }
            var that = this;
            this._allP.getList().then(function(brackets){
                if(that.all.length > 0){
                    deferred.resolve(that.all);
                } else {
                    that.all = brackets;
                    deferred.resolve(brackets);
                }
            }, function(){
                that.all = [];
                deferred.resolve(that.all);
            });
            return deferred.promise;
        },
        create: function(bracket){
            this.all.push(bracket);
            this.save();
        },
        save: function(){
            this._allP.post(this.all);
        },
        generateBracket: function(players){
            var numberOfSlots = Math.pow(2, Math.ceil(Math.log(players.length)/Math.log(2)));
            var numberOfByes = numberOfSlots - players.length;
            for(var i = 0; i < numberOfByes; i++){
                players.push("Bye");
            }
            var firstRoundGames = this._computeNextRound([[0,1]],2,players.length);
            var firstGamesResults = [];
            for(i = 0; i < firstRoundGames.length; i++){
                firstRoundGames[i][0] = players[firstRoundGames[i][0]];
                firstRoundGames[i][1] = players[firstRoundGames[i][1]];
                if(firstRoundGames[i][1] === 'Bye'){
                    firstGamesResults.push([3,0]);
                }else if(firstRoundGames[i][0] === 'Bye'){
                    firstGamesResults.push([0, 3]);
                } else{
                    firstGamesResults.push([null,null]);
                }
            }
            this.create({
                data : {
                    teams : firstRoundGames,
                    results: firstGamesResults
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