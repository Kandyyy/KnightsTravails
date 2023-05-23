from collections import deque

def MinimumMoves(start, end):
    
    queue = deque()
    visited_nodes = []
    distance = {}
    parent = {}
    distance[start] = 0
    
    queue.append(start)
    visited_nodes.append(start)
    while queue:
        curr_node = queue.popleft()
        if curr_node == end:
            return distance[curr_node], get_route(start=start, end=end, parent_node=parent)
        possible_moves = get_valid_moves(curr=curr_node)
        for move in possible_moves:
            if move not in visited_nodes:
                queue.append(move)
                visited_nodes.append(move)
                distance[move] = distance[curr_node] + 1
                parent[move] = curr_node

    return "Can't go to that square!"

def get_route(start, end, parent_node):
    curr_node = end
    route = []
    while curr_node != start:
        route.append(curr_node) 
        curr_node = parent_node[curr_node]

    return route[::-1]

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
end = (7,7)

def convert_to_chess_notation(coords):
    letters = ["a", "b", "c", "d", "e", "f","g","h"]
    return f"{letters[coords[0]]}{coords[1]+1}"

minimum_moves_required = MinimumMoves(start,end)[0]
path = MinimumMoves(start,end)[1]


print(f"The minimum number of knight hops required: {minimum_moves_required}")
print("The path taken by the knight is: ")
for i in range(len(path)):
    print(convert_to_chess_notation(path[i]), end=" -> ")
print("DESTINATION REACHED")