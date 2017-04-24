function UserAction() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "Your Rest URL Here", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    console.log(response);
}