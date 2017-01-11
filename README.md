# Tournament Organizer
<table>
<tr>
<td>
    An offline application used to organize and manage a tournament. Encode a list of players associated to some rankings, create groups, enter match results and generate final brackets.
    
</td>
</tr>
</table>


## Features

### Encode players
Multiple players can be entered at once (one by line), just copy and paste from an Excel sheet.

![players.png](https://s30.postimg.org/hrid74cvl/players.png)

Ranking can be anything from a specific ranking system in your competition to a generic seed number

### Tables

This application was originally created to manage table tennis tournaments. Therefore, you can optionally provide the number of tables you have at your disposal. You will be able to attribute a table for every game, and the system will keep track on what tables are available at any time. This mechanism is fully optional.

![tables.png](https://s28.postimg.org/ozt1i73dp/tables.png)


### Groups definition

Define the numbers of groups you want to be generated, and the number of players to be included in each group.

![groupsdef.png](https://s24.postimg.org/e8dvx3ihx/groupsdef.png)


## Group stage

Display your groups and the games to be played. Encode results, allocate tables, swap players between groups.

**Do not forget** to give the final position of each group member at then end of the group stage in order to make the bracket generation work properly!

![groups.png](https://s29.postimg.org/mrmzkqwzb/groups.png)


## Bracket stage

Single or double elimination bracket. Choose how many players by group you want to select and from which position you want to select them.

Brackets are optimized such that players from same groups meet as late as possible and such higher seeds meet late as well.

It is possible to create multiple brackets (for instance, in case you have groups of 4 players, you can create a winner bracket with players in position 1 and 2 and looser bracket with players in position 3 and 4).

By clicking on a game, you can modify the players, the score and the attributed table.

![brackets.png](https://s28.postimg.org/ckycvafz1/brackets.png)

## Usage

The application is built with NodeJS. Refer to the "package.json" file for an exhaustive list of available commands.

### Run the project

From the root directory :

    npm start

It will start the angular application inside an electron container (chromium browser).

### Build the project
    
**Building for Windows (x64 architecture)**

    npm run-script "build-win-64"

It will generate "tournamentorganizer.exe" file available in the tournamentorganizer-win32-x64 directory.

**Building for other platforms / architectures**

    npm run-script "build-all"

### Bugs - feature requests

If you find a bug or would like the tournament organizer to be shipped with a new feature, feel free to open [an issue on Github](https://github.com/taguan/tournament-organizer/issues).

### Developers

Willing to help? Great! Just fork the repo, create a branch, push your code and open a pull-request.


## Built with 

- [AngularJS 1](https://angularjs.org/) - Javascript framework
- [Electron](http://electron.atom.io/) - Packages a web application as a desktop application
- [jQuery Bracket](http://www.aropupu.fi/bracket/) - Display tournament brackets
- [Bootstrap](http://getbootstrap.com/) - Responsive CSS layout and components


## Todos
- Testing (E2E and unit tests)
- Provide translations
- Improve documentation
- New features (other algorithms to generate brackets and groups ?)

## Author

[![Benoît Denis](https://avatars3.githubusercontent.com/u/1026937?v=3&u=1bb4793e395bbaff8d029338434f996bd0f40b33&s=400)](https://github.com/taguan)
[Benoît Denis](https://github.com/taguan)

## [License](https://github.com/taguan/tournament-organizer/blob/master/LICENSE)

MIT © [Benoît Denis](https://github.com/taguan)
