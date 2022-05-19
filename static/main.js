console.log("JS Loaded")

const url = "127.0.0.1:8080"
var inputForm = document.getElementById("inputForm")
var johariWords = document.getElementById("johariWords")

//var name = prompt('Enter your name');
document.getElementById('sub_button').disabled = true; //Disable at first



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

	