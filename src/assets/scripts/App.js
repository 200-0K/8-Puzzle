import "../styles/styles.css";

import ThemeSwitcher from "./Classes/Events/ThemeSwitcher";
import {updateMainDetails, updateBoards} from "./HTML";

import EightPuzzle from "./Classes/EightPuzzle";
import EightPuzzleEvents from "./Classes/Events/EightPuzzleEvents";

// Load previous boards if existed 
if (localStorage.getItem("tiles")) {
    updateBoards(JSON.parse(localStorage.getItem("tiles")), JSON.parse(localStorage.getItem("goal-tiles")));
    updateMainDetails(EightPuzzle.getObjectFromHTML());
} else EightPuzzleEvents.randomizeBoards(2);

new EightPuzzleEvents(() => updateMainDetails(EightPuzzle.getObjectFromHTML()));

new ThemeSwitcher();