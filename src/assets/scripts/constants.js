export const classNames = {
    // Table
    BOARD: "eight-puzzle__board",

    TABLE: "eight-puzzle__body",
    SAMLL_TABLE: "eight-puzzle__body--small",
    EDITABLE_TABLE: "eight-puzzle__body--editable",

    CELL: "eight-puzzle__cell",
    BLANK_CELL: "eight-puzzle__cell--blank",
    SELECTED_CELL: "eight-puzzle__cell--selected",
    SWAPPED_CELL: "eight-puzzle__cell--swapped",

    RANDOMIZER_ICON: "eight-puzzle__icon",
    
    STATUS_SOLVABLE: "solvable",
    STATUS_UNSOLVABLE: "unsolvable",

    // Result Block
    ALGORITHM_CONTAINER: "algorithms-container",
    ALGORITHM_SUMMARY: "algorithm__summary",
    ALGORITHM_FIELD: "algorithm__field",
    ALGORITHM_TITLE: "algorithm__title",
    ALGORITHM_TIMELINE: "algorithm__timeline",
    ALGORITHM_LINE: "algorithm__line",
    ALGORITHM_FIRST_TIMELINE: "algorithm__line--top",
    ALGORITHM_TOP_TEXT: "top-text",
    ALGORITHM_INFO_BOX: "algorithm__line__info-box",


    MAIN_CONTAINER: "main-container",
    LOADING_MESSAGE: "loading-message",

};


// Used as a parameter to move eight puzzle tiles using .move method
export const direction = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
 };