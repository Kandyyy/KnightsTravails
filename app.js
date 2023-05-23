const chessboard = document.querySelector(".chessboard");
document.addEventListener("click", highlight_moves);

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

create_chessboard();