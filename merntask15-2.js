// API URL
const baseurl='https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json';
let heading=document.getElementById("headingsection");
let header=document.createElement("h1");
heading.appendChild(header);
header.innerText="Student Information";
header.classList.add("container-fluid","header-section");
let table = document.getElementById("tablesection");
table.classList.add("table","table-bordered","table-hover","table-modification");
let tablebody = document.createElement("tbody");
table.appendChild(tablebody);
tablebody.setAttribute("id","listitems");
let currentpage=1;
let rows=10;
async function displayItems(listElements,rows_per_page,page){
    let allData= await fetch(baseurl).then((data)=>data.json());
    listElements.innerHTML="";
    page--;
    let from=page*rows_per_page;
    let to=from+rows_per_page;
    let listItems=allData.slice(from,to);
    for(let i=0;i<listItems.length;i++){
        listElements.innerHTML +=`<tr>
        <td>${listItems[i].id}</td>
        <td>${listItems[i].name}</td>
        <td>${listItems[i].email}</td>
        </tr>`
    }
}
displayItems(tablebody,rows,currentpage);

let paginationSection = document.getElementById('buttons');

async function pagination_setup(){
    paginationSection.innerHTML="";
    let allData= await fetch(baseurl).then((data)=>data.json());
    let page_count=Math.ceil(allData.length/rows);
    previousButton();
    firstbutton();
    for(let i=1;i<=page_count;i++){
        let btn= paginationbuttons(i);
        paginationSection.appendChild(btn);
    }
    nextButton(page_count);
    lastbutton(page_count);
}
pagination_setup();

function paginationbuttons(page){
    let button=document.createElement("button");
    button.innerText=page;
    if(currentpage==page){
        button.classList.add("active");
    }
    button.addEventListener("click",()=>{
        currentpage=page;
        displayItems(tablebody,rows,currentpage);
     let current_btn=document.querySelector(".paginationSection button.active");
     current_btn.classList.remove("active");
     button.classList.add("active");
    })
    return button;
}
paginationbuttons(currentpage);

function previousButton(){
    let prev_btn=document.createElement("button");
    prev_btn.innerHTML="PREV";
    prev_btn.classList.add("prev_btn");
    paginationSection.appendChild(prev_btn);
    prev_btn.addEventListener("click",()=>{
        if(currentpage==1){
        document.querySelector('.pagination button.prev_btn').disabled=true;
        }
else{
    currentpage=currentpage-1;
    displayItems(tablebody,rows,currentpage);
    let current_btn=document.querySelector(".pagination button.active")}
        }
    )
}

function nextButton(count){
    let next_btn=document.createElement("button");
    next_btn.innerHTML="NEXT";
    next_btn.classList.add("next_btn");
    paginationSection.appendChild(next_btn);
    next_btn.addEventListener("click",()=>{
        if(currentpage==count){
            alert("Your are in End of the Page");
        }
else{
    currentpage=currentpage+1;
    displayItems(tablebody,rows,currentpage);
            
        }
})

    
}
function firstbutton(){
    let  first_btn=document.createElement("button")
    first_btn.innerText="First";
    first_btn.classList.add("first_btn");
    paginationSection.appendChild(first_btn);
    first_btn.addEventListener("click",()=>{
        currentpage=1;
        displayItems(tablebody,rows,currentpage);
        
    })
}
function lastbutton(count){
    let  last_btn=document.createElement("button")
    last_btn.innerText="Last";
    last_btn.classList.add("last_btn");
    paginationSection.appendChild(last_btn);
    last_btn.addEventListener("click",()=>{
        currentpage=count;
        displayItems(tablebody,rows,currentpage);
    })
}




