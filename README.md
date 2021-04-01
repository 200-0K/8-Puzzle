# 8-Puzzle Solver - Project
A web app that can solve 8-puzzle with two search algorithms
- **Breadth First Algorithm**
- **Best First Algorithm**

Each algorithm has a timer, total moves (visited boards), and a maximum depth that the algorithm reached to find the solution.
This web app will show a step by step solution for given 8-puzzle, along with each step it will have information about the move taken e.g. direction, cost of 8-puzzle after the move, total cost that will be cumulative of all previous steps cost, and a current depth.

For **Best First** algorithm, it uses tiles out of place distance as heuristic function to determine next move.
