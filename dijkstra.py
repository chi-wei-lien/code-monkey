from collections import defaultdict
import heapq

adj_list = {
    0: [(1, 1), (2, 5)], # ex: edge pointing to node 2 with weight 5
    1: [(3, 100)],
    2: [(3, 6), (4, 8)],
    3: [(5, 2)],
    4: [(5, 3)]
}


def dijkstra(adj_list):
    """In the beginning, we initialize so that each node will require inifinite dist to reach"""
    dist_to_reach_node = defaultdict(lambda: float('inf'))

    """Assuming that we start at node 0 with 0 dist to reach node 0"""
    start_dist = 0
    start_node = 0
    dist_to_reach_node[start_node] = start_dist

    """We are trying to find the shortest path to reach node 5"""
    end_node = 5

    min_heap = [(start_dist, start_node)]

    while min_heap:
        """curr_dist must be the shortest distance to reach curr_dist"""
        curr_dist, curr_node  = heapq.heappop(min_heap)

        if curr_node == end_node:
            return dist_to_reach_node[end_node]

        for neighbor, weight in adj_list[curr_node]:
            new_dist = curr_dist + weight
            if new_dist < dist_to_reach_node[neighbor]:
                dist_to_reach_node[neighbor] = new_dist
                heapq.heappush(min_heap, (new_dist, neighbor))

    return -1 # impossible to reach end_node

print(dijkstra(adj_list))
