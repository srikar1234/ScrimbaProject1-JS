let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")
const delLast = document.getElementById("delete-btn-top")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

delLast.addEventListener("click", function() {
    leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
    if(leadsFromLocalStorage){
        myLeads.pop()
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)    
    }
    else{
        alert("No more leads left to delete")
    }
})

deleteBtn.addEventListener("dblclick", function() {
    leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
    if(leadsFromLocalStorage){
        localStorage.clear()
        myLeads = []
        render(myLeads)         
    }
    else{
        alert("No more leads left to delete")
    }
})

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})