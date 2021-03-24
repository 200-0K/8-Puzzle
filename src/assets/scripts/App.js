import "../styles/styles.css";

import EightPuzzle from "./modules/EightPuzzle";
import EightPuzzleEvents from "./modules/Events/EightPuzzleEvents";

new EightPuzzleEvents(() => {
    EightPuzzle.getObjectFromHTML() //TODO
});