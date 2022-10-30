let myLeads=[]



const inputEl=document.getElementById("input-el")
const inputBtn=document.getElementById("input-btn")
const ulEl=document.getElementById("ul-el")
const deleteBtn=document.getElementById("delete-btn")
const tabBtn=document.getElementById("tab-btn")

inputEl.value=""
//console.log(localStorage.getItem("myLeads"))




// const tabs=[
//     {url :"https://www.linkedin.com/in/per-harald-borgen/"}
// ]


tabBtn.addEventListener("click",function(){

    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        console.log(tabs[0].url)

        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })
   
})

const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromLocalStorage)


if(leadsFromLocalStorage)
{
    myLeads=leadsFromLocalStorage
    render(myLeads)
}
function render(leads){
    let listItem=""
    for(let i=0;i<leads.length;i++)
    {
    
       // listItem+= "<li><a target='_blank' href='"+myLeads[i]+ "'>"+ myLeads[i]+"</a></li>"

       // changing a string to template string

        listItem+= `
            <li>
                <a target='_blank' href="${leads[i]}">
                    ${leads[i]}
                </a>
            </li>
         `
    
        /*
        Here we are manipulating dom n number of time
        //1st way
        ulEl.innerHTML+="<li>"+myLeads[i]+"</li>"
    
        //2nd way
        // const li=document.createElement("li")
        // li.textContent=myLeads[i]
        // ulEl.append(li)
        */
    }
    ulEl.innerHTML=listItem
 }
deleteBtn.addEventListener("dblclick",function(){
    console.log("double clicked")
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})
inputBtn.addEventListener("click",function(){
    //console.log("button clicked from add event listner")

    myLeads.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
   
    console.log(localStorage.getItem("myLeads"))
  //  console.log(myLeads)
    render(myLeads)

}) 

/*DOM Manipulation always have a cost so instead of doing dom manipulation n number of time (where n is length of array myleads)
 we prefer to manipulate dom single time */
 //for doing that we first declare a empty string and after that we concatenate all the li element and after that we manipulate dom


 
