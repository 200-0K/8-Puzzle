import "../styles/styles.css";

import ThemeSwitcher from "./modules/Events/ThemeSwitcher";

import EightPuzzle from "./modules/EightPuzzle";
import EightPuzzleEvents from "./modules/Events/EightPuzzleEvents";

import EightPuzzleSolver from "./modules/EightPuzzleSolver";

new EightPuzzleEvents(() => EightPuzzleSolver.updateMainDetails());
EightPuzzleEvents.randomizeBoards(2); //TODO: check if there is localstorage, if not then randomize

new ThemeSwitcher();