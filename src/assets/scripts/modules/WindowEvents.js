// -----------------------------------------
// - Cleasses that uses window event
// - Class must have .runEvent(event) method that this class will call when event occurred 
// -----------------------------------------

export default class WindowEvents {
    constructor () {
        this.clickEventObjects = [];

        window.addEventListener("click", ev => this._windowClickEvent(ev));
    }

    // **** Callbacks **** //
    /**
     * @param {Object} obj 
     * @returns {boolean} false if class doesn't have runEvent method
     * @returns {boolean} true if class added successfully
     */
    addClickEventObject(obj) {
        if (!obj.runEvent instanceof Funciton) return false;
        this.clickEventObjects.push(obj);
        return true;
    }

    // **** Events **** //
    _windowClickEvent(ev) {   
        for(obj of this.clickEventObjects) {
            obj.runEvent(ev);
        }
    }
}