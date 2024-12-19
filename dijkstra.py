from collections import defaultdict, deque
import heapq

""" Example adjacency list"""
adj_list = {
    0: [(1, 1), (2, 5)],  # e.g., edge to node 2 with weight 5
    1: [(3, 100)],
    2: [(3, 6), (4, 8)],
    3: [(5, 2)],
    4: [(5, 3)]
}


def dijkstra(adj_list):
    """
    Initialize distances to all nodes as infinite.
    Start node has a distance of 0.
    """
    dist_to_reach_node = defaultdict(lambda: float('inf'))
    n = 6 # number of nodes in graph
    prev_node = [None] * n # to track the previous node for reconstructing the path
    start_node = 0
    start_dist = 0
    end_node = 5  # The target node we want to reach

    dist_to_reach_node[start_node] = start_dist
    min_heap = [(start_dist, start_node)]

    while min_heap:
        """ Get the node with the smallest distance """
        curr_dist, curr_node  = heapq.heappop(min_heap)

        """ Ignore outdated distances """
        if curr_dist != dist_to_reach_node[curr_node]:
            continue

        if curr_node == end_node: # If the end node is reached, terminate early
            break

        for neighbor, weight in adj_list[curr_node]:
            new_dist = curr_dist + weight

            """ If the new distance is shorter than the current stored one,
            update the dictionary and push the new distance onto the heap. """
            if new_dist < dist_to_reach_node[neighbor]:
                dist_to_reach_node[neighbor] = new_dist
                prev_node[neighbor] = curr_node
                heapq.heappush(min_heap, (new_dist, neighbor))

    shortest_path = deque()
    curr_node = end_node
    curr_node = end_node
    while curr_node is not None:
        shortest_path.appendleft(curr_node)
        curr_node = prev_node[curr_node]

    if shortest_path[0] != start_node:
        return []  # No valid path found

    return list(shortest_path)

print(dijkstra(adj_list))
