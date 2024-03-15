# 8-Puzzle Solver - Project
[A working webapp can be found here](https://200-0k.github.io/8-Puzzle/).

A web app that can solve 8-puzzle with two search algorithms
- **Breadth First Algorithm**
- **Best First Algorithm**

Each algorithm has a timer, total moves (visited boards), total cost, and a maximum depth that the algorithm reached to find the solution.
This web app will show a step by step solution for a given 8-puzzle, along with each step it will have information about the move taken such as direction, cost of the 8-puzzle after the move, total cost that will be cumulative of all previous steps cost, and a current depth.

For **Best First** algorithm, it uses tiles out of place distance as heuristic function to determine next move.
