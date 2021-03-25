export default class EightPuzzleSolver {
    
    /**  
     * @param  {...Object} Solvers Solvers are object that can solve EightPuzzle, and it contain a method called solve(EightPuzzle) that will be called when getResultHTML called from this class instance
     */
    constructor (...Solvers) {
        this.Solvers = Solvers.filter(solver => solver.solve instanceof Function);
        if(this.Solvers.length <= 0)  throw new Error("Solvers are undefined");
    }
}