from collections import deque

def MinimumMoves(start, end):
    
    queue = deque()
    visited_nodes = []
    distance = {}
    distance[start] = 0
    
    queue.append(start)
    visited_nodes.append(start)
    while queue:
        curr_node = queue.popleft()
        if curr_node == end:
            return distance[curr_node]
        possible_moves = get_valid_moves(curr=curr_node)
        for move in possible_moves:
            if move not in visited_nodes:
                queue.append(move)
                visited_nodes.append(move)
                distance[move] = distance[curr_node] + 1

    return 

def get_valid_moves(curr):
    
    valid_moves = []
    curr_x = curr[0]
    curr_y = curr[1]
    possible_moves = [
        [curr_x+1, curr_y+2],
        [curr_x+2, curr_y+1],
        [curr_x+1, curr_y-2],
        [curr_x+2, curr_y-1],
        [curr_x-1, curr_y+2],
        [curr_x-2, curr_y+1],
        [curr_x-2, curr_y-1],
        [curr_x-1, curr_y-2]
    ]


    for i in range(8):
        if possible_moves[i][0] >= 0 and possible_moves[i][0] <= 7 and possible_moves[i][1] >= 0 and possible_moves[i][1] <= 7:
            valid_moves.append((possible_moves[i][0], possible_moves[i][1]))
            
    return valid_moves

start = (0,0)
end = (3,1)

print(MinimumMoves(start, end))