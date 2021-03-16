async function register_in() {

    const first = $("#fname").val();
    const last = $("#lname").val();
    const email = $("#email").val();
    const password = $("#password").val();
    const password2 = $("#password2").val();

    
    let response = await fetch('/auth',  {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json;charset=utf-8'
        },
        body : JSON.stringify ({
        first: first,
        last: last,
        email: email,
        password: password
        })
    })
    
    if (response.ok) { 
        let json = await response.json()
        console.log(json)

        if (json.success) {
            document.location.href="signin.html";
            console.log(document.cookie)
        } else {
            alert("HTTP-Error: " + response.status + " json not sucess")
            console.log(response.status)
            let json = await response.json()
            console.log(json)
        }
    } else {
        alert("HTTP-Error: " + response.status + " response is not ok")
        console.log(response.status)
        let json = await response.json()
        console.log(json)
    }
}

$(document).ready(function() {
    $("#butt2").click(function() {
        var userEmail = $("#email").val();
        var first = $("#fname").val();
        var last = $("#lname").val();
        var password = $("#password").val();

            if(first == "") {
                alert("First name cannot be blank");
                return;
            } else if(last == "") {
                alert("Last name cannot be blank");
                return;
            } else if(userEmail == "") {
                alert("Email cannot be blank");
                return;
            } else if(password == "") {
                alert("Password cannot be blank");
                return;
            }else if(!validEmail(userEmail)) {
                alert("Email must have @ sign");
                return;
            } else if ($("#password").val() != $("#password2").val()){
                alert("password have to match");
                return;
            } else {
                register_in()
            }
    })
})