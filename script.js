
let key="AIzaSyB2SF1pjPde9nmMi-Y01Bw5D4uTqQNPbZA";

let main=document.getElementsByClassName("contanier")[0];
function search(){
    let inp=document.getElementById("inp").value;
    fetchApi(inp);
}

// --------------- API CALL--------------

async function fetchApi(inp){
    try{
        let url=`https://www.googleapis.com/youtube/v3/search?&part=snippet&maxResults=10&q=${inp}&key=${key}`
        let resposnse=await fetch(url);
        let result=await resposnse.json();
        addToUi(result);
    }

    catch(Error){
        console.log("Some Thing Went Wrong");
    }
       
}

function addToUi(result){
    main.innerHTML="";
    for(let i=0;i<result.items.length;i++){
        let videoElement=result.items[i];
        let element=document.createElement("div");
        element.className="videoElements";
        let innertext=`
            <img src="${videoElement.snippet.thumbnails.high.url}">
            <p>${videoElement.snippet.title}</p>
        `;
        element.innerHTML=innertext;
        main.append(element);
    }
    

}
