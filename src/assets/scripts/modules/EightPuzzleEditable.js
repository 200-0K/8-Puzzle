const classNames = {
    TABLE: "eight-puzzle__body",
    EDITABLE_TABLE: "eight-puzzle__body--editable",
    CELL: "eight-puzzle__cell",
    SELECTED_CELL: "eight-puzzle__cell--selected",
    SWAPPED_CELL: "eight-puzzle__cell--swapped"
}

// For swapping effect
let isEffectRunning = false;

export default class EightPuzzleEditable {
    constructor(swapCallBack) {
        this.selectedCells = [];
        this.swapCallBack = swapCallBack;

        this.event();
    }

    event() {
        window.addEventListener("click", ev => {
            this.windowIsClicked(ev)
            this.refreshHighlight();
        });
    }

    /**
     * @param {MouseEvent} ev 
     */
     windowIsClicked(ev) {
        // Stop user from selecting a tile when effect/swapping is happening
        if (isEffectRunning) return;

        let cellElement = ev.target;
        let cellBodyParent = cellElement.closest(`.${classNames.EDITABLE_TABLE}`);

        // If cellElement not a cell or it is a cell but its parent doesn't have EDITABLE_TABLE class name then remove all selections
        if (!cellElement.classList.contains(classNames.CELL) || !cellBodyParent) {
            this.selectedCells = [];
            return;
        }
        
        // If there is no selected cells then add cellElement directly
        if (this.selectedCells.length == 0) {
            this.selectedCells.push(cellElement);
        }else if (this.selectedCells.length == 1 && cellBodyParent === this.selectedCells[0].closest(`.${classNames.EDITABLE_TABLE}`)) {
            // If there is already a cell selected then check if new selected cell has the same parent
            this.selectedCells.push(cellElement);
            this.swapTiles();
        } else {
            // If there parents are different then remove all selections
            this.selectedCells = [];
        }
        
    }

    refreshHighlight() {
        // Unhighlight all cells
        document.querySelectorAll(`.${classNames.SELECTED_CELL}`).forEach(cell => cell.classList.remove(classNames.SELECTED_CELL));

        // Highlight selected cells
        if (this.selectedCells.length > 0) this.selectedCells.forEach(cell => cell.classList.add(classNames.SELECTED_CELL));
    }

    swapTiles() {
        let src = this.selectedCells[0];
        let dest = this.selectedCells[1];
        
        // Pre-swap Effect
        src.classList.add(`${classNames.SWAPPED_CELL}`);
        dest.classList.add(`${classNames.SWAPPED_CELL}`);
        isEffectRunning = true;

        const swapEvent = (ev) => {
            // Wait for the longest transition to finish
            if(ev.propertyName != "opacity") return;
            
            // Swap values
            let temp        = src.innerText;
            src.innerText   = dest.innerText;
            dest.innerText  = temp;

            // Swap class names
            temp            = src.className;
            src.className   = dest.className;
            dest.className  = temp;

            // Post-swap Effect
            src.classList.remove(`${classNames.SWAPPED_CELL}`);
            dest.classList.remove(`${classNames.SWAPPED_CELL}`);
            isEffectRunning = false;
            
            dest.removeEventListener("transitionend", swapEvent);
        }
        
        dest.addEventListener("transitionend", swapEvent);
        
        this.selectedCells = [];
        if(this.swapCallBack instanceof Function) this.swapCallBack();
    }
}