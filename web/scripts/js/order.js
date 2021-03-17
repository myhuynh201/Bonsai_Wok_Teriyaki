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

async function placeOrder() {
    const data = {
        size: document.querySelector('input[name="size"]:checked').value,
        rice: document.querySelector('input[name="rice"]:checked').value,
        protein: document.querySelector('input[name="protein"]:checked').value,
        Side1: $('#Side1').is(':checked'),
        Side2: $('#Side2').is(':checked'),
        Side3: $('#Side3').is(':checked')
    };

    console.log(data)

    let response = await fetch('/orders', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    })

    if(response.ok) {
        let json = await response.json()
        console.log(json)
        addtoCart()
       
    } else {
        alert("HTTP-Error " + response.status)
        console.log(response.status)
        let json = await response.json()
        console.log(json)
    }
}

async function displayOrders() {
    let response = await fetch('/orders', {
        method: 'GET',
    })

    if(response.ok) {
        let json = await response.json()
        console.log(json)
        if(json.orders.length===0) {
            $("#previous").append('<li>No Previous Orders</li>')
        } else {
            let counter = 0;
            
            document.getElementById("$#previous").innerHTML = "";
            
            json.orders.forEach(element => {
                counter ++;
                var size = element.my_size;
                var rice = element.my_rice;
                var protein = element.my_protein;
                var Side1 = element.Option1;
                var Side2 = element.Option2;
                var Side3 = element.Option3;

                $("#previous").append(`<ul><li> Order #${counter} :
                    Size: ${size},
                    Rice: ${rice},
                    Protein: ${protein},
                    Side1: ${Side1},
                    Side2: ${Side2},
                    Side3: ${Side3}</li></ul>`)
            });
        } 
    } else {
            alert("HTTP-Error: " + response.status + " could not load the orders")
            console.log(response.status)
            let json = await response.json()
            console.log(json)
        }
    }


$(document).ready(function(){
    $("#addtocart").click(placeOrder) 
    $("#prev").click(displayOrders)
})

