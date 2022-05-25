console.log("JS Loaded")

const url = "127.0.0.1:8080"

let johariWords = [];

//var name = prompt('Enter your name');
document.getElementById('sub_button').disabled = true; //Disable at first

inputForm.addEventListener("sub_button", (e)=>{
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

function InvalidName(textbox) {
    if (textbox.value == '') {
        textbox.setCustomValidity('Please enter your name');
    }
    else {
       textbox.setCustomValidity('');
    }
    return true;
}

// a function to build the dict? 
function addSelectedItems() {
    var results = [];
    var elements = document.getElementsByClassName('custom-select');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var strSel = element.options[element.selectedIndex].text;
        const index = johariWords.indexOf(strSel)
        if (index > -1) {
            results.splice()
        }
        else {
            results.push(strSel)
        }
        return results
    }   
  }


let counter = 0;
function updateCounter(n) {
    counter += n
    console.log(counter)
    if(5 <= counter && counter <11){
        document.getElementById('sub_button').disabled = false
    } else {
        document.getElementById('sub_button').disabled = true
    }
    document.getElementById("selections").value = counter
    return counter
  }

//class builds the blocks of options + select logic
class CustomSelect {
    constructor(originalSelect) {
      this.originalSelect = originalSelect;
      this.customSelect = document.createElement("div");
      this.customSelect.classList.add("select");
        
      this.originalSelect.querySelectorAll("option").forEach((optionElement) => {
        const itemElement = document.createElement("div");
        
        itemElement.classList.add("select__item");
        itemElement.textContent = optionElement.textContent;
        this.customSelect.appendChild(itemElement);
        
        if (optionElement.selected) {
          this._select(itemElement);
        }
        
        itemElement.addEventListener("click", () => {
          if (
            this.originalSelect.multiple &&
            itemElement.classList.contains("select__item--selected")
          ) {
            updateCounter(-1)
            this._deselect(itemElement);
            

          } else {
              
            updateCounter(1)
            if(counter<11){
                this._select(itemElement);
            } else{
                alert("Only 10 Selections is permitted!")
                updateCounter(-1)
            }

          } 
        });
      });
  
      this.originalSelect.insertAdjacentElement("afterend", this.customSelect);
      this.originalSelect.style.display = "none";
    }
  
    _select(itemElement) {
      const index = Array.from(this.customSelect.children).indexOf(itemElement);
  
      if (!this.originalSelect.multiple) {
        this.customSelect.querySelectorAll(".select__item").forEach((el) => {
          el.classList.remove("select__item--selected");
        });
      }
  
      this.originalSelect.querySelectorAll("option")[index].selected = true;
      itemElement.classList.add("select__item--selected");
    }
  
    _deselect(itemElement) {
      const index = Array.from(this.customSelect.children).indexOf(itemElement);
  
      this.originalSelect.querySelectorAll("option")[index].selected = false;
      itemElement.classList.remove("select__item--selected");
    }
  }
  
  document.querySelectorAll(".custom-select").forEach((selectElement) => {
    new CustomSelect(selectElement);
  });

