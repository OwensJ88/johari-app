console.log("JS Loaded")

const url = "127.0.0.1:8080"
var inputForm = document.getElementById("inputForm")
var johariWords = document.getElementById("johariWords")

inputForm.addEventListener("submit", (e)=>{

    //prevent auto submission
    e.preventDefault()

    document.getElementById("message").value = document.getElementById("selectedContainer").innerHTML
    const formdata = new FormData(inputForm)
    fetch(url,{

        method:"POST",
        body:formdata,
    }).then(
        response => response.text()
    ).then(
        (data) => {console.log(data);document.getElementById("serverMessageBox").innerHTML=data}
    ).catch(
        error => console.error(error)
    )
    document.getElementById('inputForm').reset();
    UnSelectAll()
})
function UnSelectAll() {
    var items = document.getElementById('selectedContainer');
    for (var i = 0; i < items.length; i++) {
        if (items[i].type == 'checkbox')
            items[i].checked = false;
    }
}		