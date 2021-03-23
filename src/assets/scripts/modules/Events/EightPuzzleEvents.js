import shuffle from "lodash/shuffle"
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";

const classNames = {
    BOARD: "eight-puzzle__board",
    TABLE: "eight-puzzle__body",
    EDITABLE_TABLE: "eight-puzzle__body--editable",
    CELL: "eight-puzzle__cell",
    SELECTED_CELL: "eight-puzzle__cell--selected",
    SWAPPED_CELL: "eight-puzzle__cell--swapped",
    RANDOMIZER_ICON: "eight-puzzle__icon", 
}

// For swapping effect
let isEffectRunning = false;

export default class EightPuzzleEvents {
    constructor(onChangeCallBack) {
        this.selectedCells = [];

        // Used after swap 
        this.onChangeCallBack = onChangeCallBack;

        this.event();
    }

    event() {
        // Swap event
        document.querySelectorAll(`.${classNames.EDITABLE_TABLE}`).forEach(table => table.addEventListener("click", ev => {
            const isSwipped = this.swapEvent(ev, table);
            
            // Call swapCallBack function after swaping
            if(isSwipped && this.onChangeCallBack instanceof Function) this.onChangeCallBack();
        }));

        // Randomizer event
        document.querySelectorAll(`.${classNames.RANDOMIZER_ICON}`).forEach(icon => icon.addEventListener("click", throttle(ev => {
            this.randomizerEvent(ev);

            if(this.onChangeCallBack instanceof Function) this.onChangeCallBack();
        }, 500)));
    }

    // ************ Events ************ //

    /**
     * @param {MouseEvent} ev 
     * @param {HTMLElement} table
     * @returns {boolean} true if swapped, false otherwise
     */
     swapEvent(ev, table) {
        // Stop user from selecting a tile when effect/swapping is happening
        if (isEffectRunning) return false;

        const cellElement = ev.target;
        let isSwapped     = false;

        // If cellElement not a cell or it is a cell but its parent doesn't have EDITABLE_TABLE class name then remove all selections
        if (!cellElement.classList.contains(classNames.CELL)) {
            this.selectedCells = [];
        } 
        // If there is no selected cells then add cellElement directly
        else if (this.selectedCells.length == 0) {
            this.selectedCells.push(cellElement);
        } 
        // If there is already a cell selected then check if new selected cell has the same parent 
        // if so then swap the tiles and return true
        else if (table === this.selectedCells[0].closest("table")) {
            this.selectedCells.push(cellElement);
            this.swapTiles();
            isSwapped = true;
        } 
        // If there parents are different then remove all selections
        else this.selectedCells = [];

        this.refreshHighlight();
        return isSwapped;   
    }

    /**
     * @param {MouseEvent} ev 
     */
    randomizerEvent(ev) {
        const table           = ev.target.closest(`.${classNames.BOARD}`).querySelector("table");
        const cells           = Array.from(table.querySelectorAll(`.${classNames.CELL}`));
        const randomizedCells = shuffle(cells);
        
        const inOrderSwap = setInterval(() => {
            // Swap cells, if one cell left, then swap it with any already swapped cells
            [this.selectedCells[0], this.selectedCells[1]] = [randomizedCells.pop(), randomizedCells.pop() || cells[Math.floor(Math.random() * cells.length)]];
            this.swapTiles();

            // If all cells has been randomized then clear the interval
            if (randomizedCells.length <= 0) clearInterval(inOrderSwap);
        }, 200); // delay
    }

    // ************ Methods ************ //

    refreshHighlight() {
        // Unhighlight all cells
        document.querySelectorAll(`.${classNames.SELECTED_CELL}`).forEach(cell => cell.classList.remove(classNames.SELECTED_CELL));

        // Highlight selected cells
        if (this.selectedCells.length > 0) this.selectedCells.forEach(cell => cell.classList.add(classNames.SELECTED_CELL));
    }

    // This will use this.selectedCells array to swap tiles
    swapTiles() {
        const src  = this.selectedCells.pop();
        const dest = this.selectedCells.pop();
        
        // Pre-swap Effect
        src.classList.add(`${classNames.SWAPPED_CELL}`);
        dest.classList.add(`${classNames.SWAPPED_CELL}`);
        isEffectRunning = true;

        setTimeout(() => {
            // Swap values
            [src.innerText, dest.innerText] = [dest.innerText, src.innerText];

            // Swap class names
            [src.className, dest.className] = [dest.className, src.className];

            // Post-swap Effect
            src.classList.remove(`${classNames.SWAPPED_CELL}`);
            dest.classList.remove(`${classNames.SWAPPED_CELL}`);
            isEffectRunning = false;
        }, 250);
    }
}