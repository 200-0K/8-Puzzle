import "../styles/styles.css";

import ThemeSwitcher from "./modules/Events/ThemeSwitcher";
import EightPuzzle from "./modules/EightPuzzle";
import EightPuzzleEvents from "./modules/Events/EightPuzzleEvents";

new EightPuzzleEvents(() => {
    console.log(window.btoa(EightPuzzle.getObjectFromHTML().tiles)) //TODO
});

new ThemeSwitcher();