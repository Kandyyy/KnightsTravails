// DOM ELEMENTS
const chessboard = document.querySelector(".chessboard");
const form = document.querySelector("form");
const start_pos = document.querySelector("#start_pos");
const end_pos = document.querySelector("#end_pos");

document.addEventListener("click", highlight_moves);

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let coords_start = convert_to_matrix_notation(start_pos.value);
    let coords_end = convert_to_matrix_notation(end_pos.value);
    start_pos.value = "";
    end_pos.value = "";
    console.log(coords_start);
    console.log(coords_end);
});

function create_chessboard(){
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const square = document.createElement("div");
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

function highlight_moves(e){
    if (e.target.classList.contains("white") || e.target.classList.contains("black") ) {
        e.target.classList.add("highlighted");
    }
}


//LOGIC

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
