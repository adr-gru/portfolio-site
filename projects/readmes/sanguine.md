# Sanguine

A two-player strategy card game built in Java with a Swing GUI. Players place cards on a grid to spread influence across the board and compete to control each row. Each player can be a human or one of two computer strategies.

![Mid-game board](../assets/sanguine/sanguine4.png)

## Features

- Full game model with rule enforcement for card costs, pawn ownership, influence, and row scoring
- Swing GUI with a separate window for each player, showing the board, row scores, and that player's hand
- Mouse and keyboard controls for selecting cards and cells, confirming moves, and passing
- Two computer opponents built with the strategy pattern
- Any mix of players: human vs. human, human vs. computer, or computer vs. computer
- Card decks loaded from plain-text configuration files
- A text-based view of the board for debugging and tests
- JUnit test suite covering the model, cards, cells, board, views, and strategies

## Screenshots

| Start of game | Selecting a card and a cell |
| --- | --- |
| ![Start](../assets/sanguine/sanguine1.png) | ![Selection](../assets/sanguine/sanguine2.png) |

| Blue's turn | End of game |
| --- | --- |
| ![Blue move](../assets/sanguine/sanguine3.png) | ![Final board](../assets/sanguine/sanguine5.png) |

## Requirements

- Java 21 or later (required by the prebuilt jar)
- Gradle (optional, to build from source and run the tests)

## Running the Game

A prebuilt jar is included. From the project root:

```bash
java -jar f25-hw07-groups-group-MANGO-Founders.jar 3 5 docs/example.deck docs/example.deck human strategy2
```

The arguments are:

```
<rows> <cols> <redDeck> <blueDeck> <redPlayer> <bluePlayer>
```

| Argument | Description |
| --- | --- |
| `rows` | Number of board rows (positive integer) |
| `cols` | Number of board columns (odd integer, 3 or greater) |
| `redDeck`, `blueDeck` | Paths to deck files |
| `redPlayer`, `bluePlayer` | `human`, `strategy1` (Fill First), or `strategy2` (Maximize Row Score) |

Each deck needs at least as many cards as there are cells on the board (`rows * cols`). The included decks have 15 cards, so they support a board of up to 15 cells, such as 3 x 5.

To watch two computer players play each other:

```bash
java -jar f25-hw07-groups-group-MANGO-Founders.jar 3 5 docs/example.deck docs/example.deck strategy1 strategy2
```

## How to Play

1. Red moves first. The window title shows whose turn it is.
2. Click a card in your hand. It is highlighted in cyan.
3. Click a board cell that holds enough of your pawns to pay the card's cost.
4. Press **Enter** to place the card, or press **P** to pass.
5. The game ends when both players pass in a row.

### Rules

- Placing a card replaces the pawns in its cell and applies the card's influence grid to nearby cells:
  - An empty cell gains one of your pawns.
  - A cell with your pawns gains one more pawn, up to a maximum of 3.
  - A cell with your opponent's pawns is converted to your color.
  - Cells that hold cards are not affected.
- Blue's influence grids are mirrored horizontally.
- Each row is scored by the total value of each player's cards in it. The player with the higher row score adds it to their total. Tied rows score nothing.
- The player with the higher total wins. Ties are possible.

## Deck File Format

Each card takes six lines: a header line followed by a 5 x 5 influence grid.

```
Security 1 2
XXXXX
XXIXX
XICIX
XXIXX
XXXXX
```

- The header is `NAME COST VALUE`. The cost (1 to 3) is the number of pawns needed to play the card, and the value is its score.
- In the grid, `C` marks the card's position (always the center), `I` marks a cell the card influences, and `X` marks no influence.

## Project Structure

```
src/main/java/sanguine/
  model/        Game rules and state (BasicSanguine, Board, Cell, SanguineCard)
  view/         Swing GUI panels and the text view
  controller/   Visual controller and deck file reader
  players/      Human and computer player implementations
  strategy/     Computer strategies (FillFirst, MaximizeRowScore)
  mock/         Mock models for testing strategies
  SanguineGame.java   GUI entry point
  Sanguine.java       Text view entry point
src/test/java/sanguine/   JUnit tests
docs/                     Example deck files
```

## Design

- **Model-View-Controller.** The model holds all game rules. Views only read the game state, through a `ReadonlySanguineModel` interface that has no mutating methods. Controllers turn user input into model calls.
- **Observer pattern.** The model notifies controllers through `ModelStatusListener` when the turn changes or the game ends, so each window updates and the active player is prompted to move.
- **Strategy pattern.** Computer players delegate to a `SanguineStrategy`, so new strategies can be added without changing the controller or the model.
- **Player abstraction.** Human and computer players share a common `Player` interface, which lets the controller handle both the same way.
- **File I/O in the controller.** Deck files are read by the controller, which keeps the model independent of the file system.

## Testing

The tests live in `src/test/java/sanguine` and use JUnit 4. With Gradle installed:

```bash
gradle test
```

## Authors

Sebastian Cheung and Adrian Grullon
