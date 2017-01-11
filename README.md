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
