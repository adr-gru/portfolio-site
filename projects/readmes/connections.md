# Connections

A Java version of a word-grouping puzzle game. Players find four groups of four words that share a hidden category, using no more than four wrong guesses. Built with an event-driven world library that handles drawing and mouse and keyboard input.

![Completed puzzle](../assets/connections/7-all-solved.png)

## Features

- 4 x 4 grid of clickable word tiles
- Select up to four tiles and submit them as a guess
- Correct groups are colored by difficulty (yellow, green, blue, magenta) and move to the top of the board
- Four lives, with a game-over screen when they run out
- Press **R** to restart the puzzle

## Screenshots

| Start | Four words selected |
| --- | --- |
| ![Start](../assets/connections/1-start.png) | ![Selected](../assets/connections/2-four-selected.png) |

| Wrong guess costs a life | Out of guesses |
| --- | --- |
| ![Life lost](../assets/connections/5-wrong-guess-life-lost.png) | ![Game over](../assets/connections/8-game-over.png) |

## Requirements

- Java 11 or later
- `lib/imagelib.jar` (included)

## Running the Game

From the project root:

```bash
javac -cp lib/imagelib.jar -d out src/*.java
```

```bash
java -cp lib/imagelib.jar:out Connections
```

On Windows, use `;` instead of `:` in the classpath.

## How to Play

1. Click a word to select it. Selected words turn dark gray. Click it again to deselect it.
2. Select four words you think belong together, then click **SUBMIT**.
3. If all four share a category, they are colored by difficulty and moved to the top of the board.
4. If they do not, you lose a life. The number of lives left is shown next to the submit button.
5. Find all four groups before your lives run out. After a loss, press **R** to play again.

## Project Structure

```
src/
  Connections.java       Entry point; builds the puzzle and starts the game
  ConnectionsWorld.java  Game state, mouse and key handling, end-of-game check
  ConnectionWord.java    A single word tile: its category, difficulty, selection state, and drawing
  ArrayUtils.java        Board layout, selection handling, guess checking, and reordering solved groups
test/
  ExamplesConnections.java   Example puzzles and tests
lib/
  imagelib.jar           World and image library
```

## Design

- Each `ConnectionWord` knows its own category, difficulty, position, and whether it is selected or solved, and draws itself to match.
- `ConnectionsWorld` holds the game state and responds to world events: `makeScene` draws each frame, `onMousePressed` handles tile and submit clicks, `onKeyEvent` handles restarting, and `worldEnds` ends the game when no lives remain.
- `ArrayUtils` holds the list operations: laying out the 4 x 4 grid, checking whether a guess is correct, and moving solved groups to the top of the board.
- A guess is correct when all four selected words share the same difficulty level, which identifies their group.

## Testing

`test/ExamplesConnections.java` contains several example puzzles and tests for drawing, layout, and coordinates. The tests are written for the `tester` library (`Tester` and `checkExpect`), which is not included in `lib/` and must be added to the classpath to run them.

## Authors

[Add author names]
