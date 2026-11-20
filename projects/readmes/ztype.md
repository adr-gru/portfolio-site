# ZType

A typing game written in Java. Random words fall from the top of the screen, and the player types them out before they reach the bottom. Built with a functional world library: each tick and each key press returns a new, immutable game state.

![Mid-game](../assets/ZType/2-mid-game.png)

## Features

- Words fall continuously, and two new words appear every four seconds
- Typing the first letter of a word activates it and turns it red
- Only one word can be typed at a time; finished words are removed from the screen
- The game ends when any word reaches the bottom of the screen
- Immutable game state, with words stored in a custom recursive list

## Screenshots

| Typing the first word | Screen filling up |
| --- | --- |
| ![First word](../assets/ZType/1-first-word-being-typed.png) | ![Filling up](../assets/ZType/3-screen-filling-up.png) |

| Words near the bottom | Game over |
| --- | --- |
| ![Near bottom](../assets/ZType/4-words-near-bottom.png) | ![Game over](../assets/ZType/5-game-over.png) |

## Requirements

- Java 11 or later
- `lib/imagelib.jar` (included)

## Running the Game

From the project root:

```bash
javac -cp lib/imagelib.jar -d out src/ZType/*.java
```

```bash
java -cp lib/imagelib.jar:out ZType.ZType
```

On Windows, use `;` instead of `:` in the classpath.

## How to Play

1. Words appear in blue near the top of the screen and fall slowly.
2. Type the first letter of any blue word to activate it. It turns red.
3. Keep typing that word. Each correct letter is removed from the front of the word.
4. Once the word is fully typed, it disappears and you can start another one.
5. While a word is active, letters for other words are ignored.
6. If any word reaches the bottom of the screen, the game is over.

## Project Structure

```
src/ZType/
  ZType.java         Entry point; starts the game
  ZTypeWorld.java    Game state, tick and key handling, end-of-game check
  IWord.java         Interface for a single word
  AWord.java         Abstract base class with shared word behavior
  ActiveWord.java    The word currently being typed (red)
  InactiveWord.java  A word waiting to be typed (blue)
  ILoWord.java       Interface for a list of words
  ConsLoWord.java    Non-empty list of words
  MtLoWord.java      Empty list of words
  Utils.java         Random word generation
  UserGuide.txt      Player instructions
test/
  ZTypeTests.java    JUnit tests
lib/
  imagelib.jar       World and image library
```

## Design

- **Immutable state.** `onTick` and `onKeyEvent` return a new `ZTypeWorld` instead of modifying the current one.
- **Recursive lists.** Words are stored in a custom list (`ConsLoWord` and `MtLoWord`), and operations such as moving, drawing, filtering out finished words, and handling keys are written recursively.
- **Word states as types.** Active and inactive words are separate classes that share an abstract base. Activating a word returns a new `ActiveWord`, and each class draws itself in its own color.
- **Seeded randomness.** The world can be built with a `Random` seed, which makes word generation repeatable for testing.

## Testing

The JUnit 4 tests are in `test/ZTypeTests.java`. To compile and run them:

```bash
javac -cp lib/imagelib.jar:lib/junit-4.13.2.jar:lib/hamcrest-core-1.3.jar -d out src/ZType/*.java test/ZTypeTests.java
```

```bash
java -cp lib/imagelib.jar:lib/junit-4.13.2.jar:lib/hamcrest-core-1.3.jar:out org.junit.runner.JUnitCore ZTypeTests
```

Several tests compare game objects with `assertEquals`, but the word and list classes do not override `equals`. Those tests fail until `equals` is implemented.

## Authors

[Add author names]
