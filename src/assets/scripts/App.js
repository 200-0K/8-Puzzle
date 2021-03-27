import "../styles/styles.css";

import ThemeSwitcher from "./Classes/Events/ThemeSwitcher";
import {updateMainDetails} from "./HTML";

import EightPuzzle from "./Classes/EightPuzzle";
import EightPuzzleEvents from "./Classes/Events/EightPuzzleEvents";

new EightPuzzleEvents(() => updateMainDetails(EightPuzzle.getObjectFromHTML()));
EightPuzzleEvents.randomizeBoards(2); //TODO: check if there is localstorage, if not then randomize

new ThemeSwitcher();