
let key="AIzaSyB2SF1pjPde9nmMi-Y01Bw5D4uTqQNPbZA";

let main=document.getElementsByClassName("contanier")[0];
function search(){
    let inp=document.getElementById("inp").value;
    fetchApi(inp);
}

// --------------- API CALL--------------

async function fetchApi(inp){
    try{
        let url=`https://www.googleapis.com/youtube/v3/search?&part=snippet&maxResults=20&q=${inp}&key=${key}`
        let resposnse=await fetch(url);
        let result=await resposnse.json();
        for(let i = 0 ; i < result.items.length; i++) {
            let video = result.items[i] ;
            let videoStats = await fetchStats(video.id.videoId)
            console.log(videoStats)
            if(videoStats.items.length > 0)
                result.items[i].videoStats = videoStats.items[0].statistics; 
                result.items[i].duration = videoStats.items[0] && videoStats.items[0].contentDetails.duration
        }
        // console.log(result);
        addToUi(result);
    }

    catch(Error){
        console.log("Some Thing Went Wrong");
    }
       
}


async function fetchStats(videoId){ 
    try{
        const endpoint = `https://www.googleapis.com/youtube/v3/videos?key=${key}&part=statistics,contentDetails&id=${videoId}`;
        let response = await fetch(endpoint); 
        let result = await response.json();
        // console.log("fethStat ",result);
        return result ;
    }
    catch(erorr){
        console.log("stats API Error")
    }
 }


//  -------------END OF API CALL-----------

function addToUi(result){
    main.innerHTML="";
    for(let i=0;i<result.items.length;i++){
        let videoElement=result.items[i];
        let element=document.createElement("div");

        // Element.addEventListener("click", () => {
        //     navigateToVideo(videoElement.id.videoId);
        //   })

        element.className="videoElements";
        let innertext=`
            <b>${formattedData(videoElement.duration)}</b> 
            <img src="${videoElement.snippet.thumbnails.high.url}">
            <p class="channer-title">${videoElement.snippet.title}</p>
            <p class="channel-name">${videoElement.snippet.channelTitle}</p>
            <p class="view-count">${videoElement.videoStats ? getViews(videoElement.videoStats.viewCount) + "  Views": "NA"}</p>
        `;
        element.innerHTML=innertext;
        main.append(element);
    }
}

function getViews(n){
    if(n < 1000) return n ;
    else if ( n >= 1000 && n <= 999999){
        n /= 1000;
        n = parseInt(n)
        return n+"K" ;
    }
    return parseInt(n / 1000000) + "M" ;
}

function formattedData(duration) {
    if(!duration) return "NA" ;
    // PT2H33M23S
    let hrs = duration.slice(2, 4);
    let mins = duration.slice(5, 7);
    let seconds ;
    if(duration.length > 8){
        seconds = duration.slice(8, 10);
    }
    let str = `${hrs}:${mins}`;
    seconds && (str += `:${seconds}`)
    return str ;
}

// function navigateToVideo(videoId){
//     let path = `/youtube-clone/video.html`;
//     if(videoId){
//    // video_id: video_id
//       document.cookie = `video_id=${videoId}; path=${path}`
//       let linkItem = document.createElement("a");
//       linkItem.href = "http://127.0.0.1:5500/youtube-clone/video.html"
//       linkItem.target = "_blank" ;
//       linkItem.click();
//     }
//     else {
//       alert("Go and watch in youtube")
//     }
//   }
