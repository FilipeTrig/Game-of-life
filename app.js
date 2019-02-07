
// Defining array

let positions = [];
// the array tha contains all the positions that are currently alive

init();

function init() { // the initialize function starts the Game of life App
    let proceed ;

   while (proceed === undefined || proceed === 'Y') {
       let position =[]; // creates a position to be filled by the user, each position has a X a Y and a state (alive or dead)
       proceed = prompt('Do you want to add any more positions ? (Y or N)');
       switch (proceed) {
            case 'Y':
                position[0] = parseInt(prompt("please insert X of new position")); // the user inputs both coordinates
                position[1] = parseInt(prompt("please insert Y of new position"));
                position[2] = true;
                addPosition(position);
                continue;
            case 'N':
                proceed = null;
                prepareArray();
                displayGrid();
                displayBtn();
                break;
            default:
                   prompt('Please select Y or N');

       }
   }
}

function run() {
    clearScreen(); //clears the screen so the new table can be displayed
    prepareArray(); // sorts and cleans duplicates from the array
    analyseScenario(); //analyses all positions to know if they are in alive state or dead
    displayGrid(); //creates the grid to display all positions
    displayBtn(); // displays the button to initiate another turn

}


// Modify array

    function addPosition(position) {
        positions.push(position);
    }

    function prepareArray(){

        removeDuplicates();
        customSort();


        function customSort() { // sorts the array first by sorting the X coordinate on all alive positions, and then
                                // by Y coordinate
            for (let y = 0; y+1 < positions.length; y++){ //goes throw the array comparing each position with the rest of the positions
                for(let i = 0; i+1 < positions.length; i++){ // in the array and then swaps them if needed
                    if(positions[i][0] > positions[i+1][0]){
                        let savedPosition = positions[i];
                        positions[i] = positions[i+1];
                        positions[i+1] = savedPosition;
                    }
                }
            }


                //sorting by Y coordinate
            for (let y = 0; y < positions.length; y++){
                for(let i = 0; i+1 < positions.length; i++){
                    if(positions[i][1] > positions[i+1][1]
                        && positions[i][0] === positions[i+1][0]){
                        let savedPosition = positions[i];
                        positions[i] = positions[i+1];
                        positions[i+1] = savedPosition;
                    }
                }
            }
        }

        function removeDuplicates() { // makes sure no duplicates are present in the array
            for (let y = 0; y  < positions.length; y++) {
                for (let i = y+1; i  < positions.length; i++) {
                    if(positions[y][0] === positions[i][0] &&
                        positions[y][1] === positions[i][1])
                    {
                      positions.splice(i,1)
                    }
                }
            }
        }


    }

    function searchArray(positionX,positionY) { // a simple search to find a value within the array
        for (let i=0 ; i < positions.length; i++){
            if (positions[i][0]=== positionX && positions[i][1]=== positionY){

               return true;
            }
        }
    }

    function removeDeadCells(){
        for (let f=0 ; f < positions.length; f++){
            if (positions[f][2] === false){
                positions.splice(f,1); // removes dead cell from array
                f=-1;
            }
        }
    }

    function analyseScenario() {
        console.log("analise scenario!!!!");
        let newPositions = [];

        //  calculates the maximum and minimum X and Y of all positions in the array so it can analise all adjacent positions
        let minX;
        let minY;
        let maxX;
        let maxY;

        for (let i =0;i < positions.length;i++){
            if(minX === undefined){
                minX = positions[i][0];
            } else {
                if(minX > positions[i][0]){
                    minX = positions[i][0];
                }
            }
        }

        for (let i =0;i < positions.length;i++){
            if(minY === undefined){
                minY = positions[i][1];
            } else {
                if(minY > positions[i][1]){
                    minY = positions[i][1];
                }
            }
        }

        for (let i =0;i < positions.length;i++){
            if(maxX === undefined){
                maxX = positions[i][0];
            } else {
                if(maxX < positions[i][0]){
                    maxX = positions[i][0];
                }
            }
        }

        for (let i =0;i < positions.length;i++){
            if(maxY === undefined){
                maxY = positions[i][1];
            } else {
                if(maxY < positions[i][1]){
                    maxY = positions[i][1];
                }
            }
        }

        for (let x = minX; x <= maxX; x++) {

            for (let y = minY; y <= maxY; y++) {

                if (searchArray(x,y)) {
                    if (checkForNeighbours(x,y) < 2 || checkForNeighbours(x,y) > 3) { // if a cell has les than 2 or more than 3
                                                                                        //neighbours it needs to be marked as dead

                        death(x,y);
                    }
                    if (checkForNeighbours(x,y) === 2 || checkForNeighbours(x,y) === 3) {

                        life(x,y);
                    }
                } else {
                    if (checkForNeighbours(x,y) === 2){ // no need to check if its alive or death only alive cells on the array
                                                          //using 2 because it counts itself if it is alive so to make up 3
                        life(x,y);                      //id the cell is dead it cant count itself so 2
                    }
                }
            }
        }




        function checkForNeighbours(x,y) {
            let neighbours = -1; // so it does not count himself
            for (let i = 0; i < positions.length; i++) {
                if (positions[i][0] === x ||
                    positions[i][0] + 1 === x ||
                    positions[i][0] - 1 === x) {
                    if (
                        positions[i][1] === y ||
                        positions[i][1] + 1 === y ||
                        positions[i][1] - 1 === y) {
                        neighbours++;
                    }

                }


            }

            return neighbours;

        }

        function death(x,y) {
            let newPosition = [x,y,false];

            newPositions.push(newPosition);
        }

        function life(x,y) {
            let newPosition = [x,y,true];

            newPositions.push(newPosition);
        }

        positions = newPositions;
        removeDeadCells();
    }



// Display grid

function displayGrid() {

    let numberOfRows = 3;

    let numberOfColumns = 3;

    for(let i =0; i < positions.length; i++){
        if(numberOfRows < positions[i][1]){
            numberOfRows = positions[i][1];
        }
    }


    for(let i =0; i < positions.length; i++){
        if(numberOfColumns < positions[i][0]){
            numberOfColumns = positions[i][0];
        }
    }

    console.log(positions);

    function constructGrid() {
        let body = document.getElementsByTagName("body")[0];
        let table = document.createElement("table");
        table.setAttribute("border","1");
        table.setAttribute("height","200");
        table.setAttribute("width","200");
        let tableBody = document.createElement("tbody");
        tableBody.setAttribute("border","1");
        for (let x =0 ;x < numberOfRows+2; x++) {       // to add an extra row on the bottom and top
            let row = document.createElement("tr");

            for (let y = 0; y < numberOfColumns+2; y++) { // to add one extra column in the left and right
            let cell = document.createElement("td");
            let cellText;
                for(let i = 0; i < positions.length; i++ ){
                    if (positions[i][0]=== y &&
                        positions[i][1]=== x &&
                        positions[i][2]=== true)
                    {
                        cellText = "•";
                    }
                }

            let text = document.createElement("text");
            text.textContent = cellText;
            cell.setAttribute("border","1" );
            cell.setAttribute("height","20");
            cell.setAttribute("width","20");

            cell.appendChild(text);
            row.appendChild(cell);

            }
            tableBody.appendChild(row);
        }
        table.appendChild(tableBody);
        body.appendChild(table);
    }

    constructGrid();
}

//clear Grid

function clearScreen() {
    document.body.innerHTML ="";
}

// control buttons

function displayBtn(){
    let btnTurn = document.createElement("button");
    btnTurn.textContent = "click for a new turn";
    btnTurn.setAttribute("id","BtnTurn");
    let body = document.getElementsByTagName("body")[0];
    body.appendChild(btnTurn);
    document.getElementById("BtnTurn").addEventListener("click", run);


}



