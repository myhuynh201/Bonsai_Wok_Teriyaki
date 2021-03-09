function initialTotal() {
    console.log("initial total triggered")
    document.getElementById("subTotal").innerHTML = "Total: $6"
}

function total() {
    let total = 0

    let sizeInput = document.querySelector('input[name = "size"]:checked').value;
    let sizeCost = sizePrice(sizeInput)
    console.log("Size Cost: " + sizeCost)
    total += sizeCost

    let riceInput = document.querySelector('input[name = "rice"]:checked').value;
    let riceCost = ricePrice(riceInput)
    console.log("Rice Cost: " + riceCost)
    total += riceCost

    let proteinInput = document.querySelector('input[name = "protein"]:checked').value;
    let proteinCost = proteinPrice(proteinInput)
    console.log("Protein Cost: " + proteinCost)
    total += proteinCost

    var sideInput = [];
    $("input:checkbox[name=side]:checked").each(function(){
        sideInput.push($(this).val());
    });
    console.log(sideInput.length)
    total += sideInput.length * 4


    document.getElementById("subTotal").innerHTML = "Total Price: $" + total
}

function sizePrice(sizeInput) {
    if(sizeInput == "small") {
        return 6
    } else if(sizeInput == "medium") {
        return 7
    } else {
        return 9
    }
}

function ricePrice(riceInput) {
    if(riceInput == "white-rice") {
        return 0
    } else {
        return 1
    }
}

function proteinPrice(proteinInput) {
    if(proteinInput == "chicken") {
        return 0
    } else if((proteinInput == "chicken-breast")||(proteinInput == "katsu")) {
        return 1
    } else {
        return 2
    }
}


function order() {
    console.log("order triggered")

    let sizeInput = document.querySelector('input[name = "size"]:checked').value;

    let riceInput = document.querySelector('input[name = "rice"]:checked').value;

    let proteinInput = document.querySelector('input[name = "protein"]:checked').value;


    var sideInput = [];
    $("input:checkbox[name=side]:checked").each(function(){
        sideInput.push($(this).val());
    });

    for(i = 0; i < sideInput.length; i++) {
        console.log(sideInput[i]);
    }    
}

function addfavorite() {
    let total = 0

    let sizeInput = document.querySelector('input[name = "size"]:checked').value;
    let sizeCost = sizePrice(sizeInput)
    console.log("Size Cost: " + sizeCost)
    total += sizeCost

    let riceInput = document.querySelector('input[name = "rice"]:checked').value;
    let riceCost = ricePrice(riceInput)
    console.log("Rice Cost: " + riceCost)
    total += riceCost

    let proteinInput = document.querySelector('input[name = "protein"]:checked').value;
    let proteinCost = proteinPrice(proteinInput)
    console.log("Protein Cost: " + proteinCost)
    total += proteinCost

    var sideInput = [];
    $("input:checkbox[name=side]:checked").each(function(){
        sideInput.push($(this).val());
    });
    console.log(sideInput.length)
    total += sideInput.length * 4

    var x = document.getElementById("favor").value;
    document.getElementById("favorites").innerHTML += "[" + x + "]: $" + total + "<br>";
    // add name of the order and the details in the favorite
}

function addtoCart() {
    let total = 0

    let sizeInput = document.querySelector('input[name = "size"]:checked').value;
    let sizeCost = sizePrice(sizeInput)
    console.log("Size Cost: " + sizeCost)
    total += sizeCost

    let riceInput = document.querySelector('input[name = "rice"]:checked').value;
    let riceCost = ricePrice(riceInput)
    console.log("Rice Cost: " + riceCost)
    total += riceCost

    let proteinInput = document.querySelector('input[name = "protein"]:checked').value;
    let proteinCost = proteinPrice(proteinInput)
    console.log("Protein Cost: " + proteinCost)
    total += proteinCost

    var sideInput = [];
    $("input:checkbox[name=side]:checked").each(function(){
        sideInput.push($(this).val());
    });
    console.log(sideInput.length)
    total += sideInput.length * 4

    var x = document.getElementById("favor").value;

    var button = 

    document.getElementById("current").innerHTML +=  

    "[" + sizeInput + ", " + riceInput + ", " + proteinInput + ", " + sideInput  + "]: $" + total +"    "+ "</label>" + 
    '<button type="button" class="delete-btn" onclick="deleteItem()"> Delete</button>' +    
    "<br>";

    //instead add all the info from the current order to the cart, with the Name of the order
}

function resetCart() {
    document.getElementById("current").innerHTML = "order item goes here <br>"
    //instead delete all the current orders from the cart
}

function movetoCart() {
    var x = document.getElementById("current").value;
    document.getElementById("cart-item").innerHTML = x
}

function deleteItem() {

}