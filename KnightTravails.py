def MinimumMoves(start, end):
    
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
            valid_moves.append([possible_moves[i][0], possible_moves[i][1]])
            
    return valid_moves

start = [3,3]
end = [1,2]

print(get_valid_moves(start))