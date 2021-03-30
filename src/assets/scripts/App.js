import "../styles/styles.css";

import ThemeSwitcher from "./Classes/Events/ThemeSwitcher";
import {updateMainDetails, ResultBuilder} from "./HTML";

import EightPuzzle from "./Classes/EightPuzzle";
import EightPuzzleEvents from "./Classes/Events/EightPuzzleEvents";

new EightPuzzleEvents(() => updateMainDetails(EightPuzzle.getObjectFromHTML()));
// EightPuzzleEvents.randomizeBoards(2); //TODO: check if there is localstorage, if not then randomize

new ThemeSwitcher();

// const a = new ResultBuilder();
// let temp = a.addAlgorithmBlock("Test", 33, 132);
// temp.addBoard(['1', '2', '3', '4', '0', '5', '6', '7', '8']);
// temp.addMoveDetails("Left", 3, 5, 2);
// temp.addBoard(['1', '2', '4', '4', '2', '5', '6', '0', '8']);

// temp = a.addAlgorithmBlock("test2", 2, 10);
// temp.addBoard(['1', '2', '3', '4', '0', '5', '6', '7', '8']);
// temp.addMoveDetails("Left", 3, 5, 2);
// temp.addBoard(['1', '2', '4', '4', '2', '5', '6', '0', '8']);
// temp.addTimeLapse(4333);
// temp.addMoveDetails("Right", 40, 7952, 4334);
// temp.addBoard(['1', '2', '4', '4', '2', '5', '6', '0', '8']);

// document.body.insertAdjacentElement("beforeend", a.getResult());