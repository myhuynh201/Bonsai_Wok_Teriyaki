

async function sign_in() {

    let encoded = window.btoa($("#uname").val() + ':' + $("#pwd").val())

    console.log($("#uname").val() + ':' + $("#pwd").val())
    console.log(encoded)

    let response = await fetch('/auth',  {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + encoded
        }
    })

    if (response.ok) { 
        let json = await response.json()
        console.log(json)

        if (json.success) {
            localStorage.setItem("signedIn", true)
            console.log(localStorage.getItem("signedIn"))
            document.location.href="order.html";
            console.log(document.cookie)
        } else {
            alert("HTTP-Error: " + response.status)
            console.log(response.status)
            let json = await response.json()
            console.log(json)
        }  
    } else {
        alert("HTTP-Error: " + response.status + " Incorrect Password!")
    } 
}

function validEmail(input) {
    return input.includes("@");
}

$(document).ready(function(){
    $("#signinbutton").click(function() {
        var userEmail = $("#uname").val();
        if(!validEmail(userEmail)) {
            alert("Email must have @ sign");
            return;
        } else {
            sign_in()
        }
    })
})


