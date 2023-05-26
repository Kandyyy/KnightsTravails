// DOM ELEMENTS
const chessboard = document.querySelector(".chessboard");
const form = document.querySelector("form");
const start_pos = document.querySelector("#start_pos");
const end_pos = document.querySelector("#end_pos");
const result_div = document.querySelector(".result");
const knight = document.createElement("img");
knight.src = "knight.png";


form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let a = start_pos.value;
    let b = end_pos.value
    let coords_start = convert_to_matrix_notation(start_pos.value);
    let coords_end = convert_to_matrix_notation(end_pos.value);
    start_pos.value = "";
    end_pos.value = "";
    let start_point = document.getElementById(coords_start[0]+"_"+coords_start[1]);
    let end_point = document.getElementById(coords_end[0]+"_"+coords_end[1]);
    try {
        start_point.classList.add("starting_pos");
        end_point.classList.add("ending_pos");
    } catch (error) {
        alert("Enter correct coordinates bruh");
        return;
    }
    start_point.appendChild(knight);
    let result = MinimumMoves(coords_start, coords_end);
    result_div.textContent = "The knight took " + result[0] + " moves to go from " + a +" to " + b;
    for (let i = 0; i < result[1].length; i++) {
        highlight_move(result[1][i]);
    }

});

function create_chessboard(){
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const square = document.createElement("div");
            square.id = j+"_"+(i-7)*-1;
            if ((i+j)%2==0) {
                square.classList.add("white")
            }
            else{
                square.classList.add("black");
            }
            chessboard.appendChild(square);
        }
    }    
}

/**
 * @param {number[]}route
 */
function highlight_move(square){
    let pos = document.getElementById(square[0]+"_"+square[1]);
    pos.classList.add("highlighted");
}

//LOGIC

/**
 * 
 * @param {number[]}start
 * @param {number[]}end
 */

function MinimumMoves(start, end){
    let queue = [];
    let visited_nodes = [];
    let distance = {};
    let parent = {};
    distance[start] = 0;
    queue.push(start);
    visited_nodes.push(start);
    while(queue.length > 0){
        let curr_node = queue.shift();
        if(JSON.stringify(curr_node) === JSON.stringify(end)){
            return [distance[curr_node], get_route(start, end, parent)];
        }
        let possible_moves = get_valid_moves(curr_node);
        for (let i = 0; i < possible_moves.length; i++) {
            let move = possible_moves[i];
            if(!visited_nodes.some(elem =>{ return JSON.stringify(move) === JSON.stringify(elem);})){
                queue.push(move);
                visited_nodes.push(move);
                distance[move] = distance[curr_node]+1;
                parent[move] = curr_node;
            }
        }        
    }
    return "None";
}

/**
 * @param {number[]} start
 * @param {number[]} end
 * @param {number{}} parent_node
 */
function get_route(start, end, parent_node){
    let curr_node = end;
    let route = [];
    while(JSON.stringify(curr_node) != JSON.stringify(start)){
        route.push(curr_node);
        curr_node = parent_node[curr_node];
    }
    return route.reverse();
}

 /**
 *   @param {number[]} coords 
 */
function convert_to_chess_notation(coords){
    let letters = ["a", "b", "c", "d", "e", "f","g","h"];
    return letters[coords[0]] + (coords[1]+1);
}


 /**
 * 
 *   @param {string} chess_notation 
 */
function convert_to_matrix_notation(chess_notation){
    if (chess_notation.length != 2) {
        return "Invalid notation!";
    }
    return [chess_notation[0].charCodeAt()-97, parseInt(chess_notation[1])-1];
}

/**
 * 
 * @param {number[]} curr 
 */
function get_valid_moves(curr){

    let valid_moves = [];
    let curr_x = curr[0];
    let curr_y = curr[1];
    let possible_moves = [
        [curr_x+1, curr_y+2],
        [curr_x+2, curr_y+1],
        [curr_x+1, curr_y-2],
        [curr_x+2, curr_y-1],
        [curr_x-1, curr_y+2],
        [curr_x-2, curr_y+1],
        [curr_x-2, curr_y-1],
        [curr_x-1, curr_y-2]
    ];
    for (let i = 0; i < 8; i++) {
        if (possible_moves[i][0] >= 0 && possible_moves[i][0] <= 7 && possible_moves[i][1] >= 0 && possible_moves[i][1] <= 7) {
            valid_moves.push([possible_moves[i][0], possible_moves[i][1]]);
        }
    }
    return valid_moves;
}

create_chessboard();
