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
    if(sizeInput == "6") {
        return 6
    } else if(sizeInput == "7") {
        return 7
    } else {
        return 9
    }
}

function ricePrice(riceInput) {
    if(riceInput == "0") {
        return 0
    } else {
        return 1
    }
}

function proteinPrice(proteinInput) {
    if(proteinInput == "0") {
        return 0
    } else if(proteinInput == "1") {
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