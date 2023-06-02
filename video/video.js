let cokiee=document.cookie;
let videoId=cokiee.split("=")[1];

let firstScript = document.getElementsByTagName("script")[0] ;

firstScript.addEventListener("load", onLoadScript)

function onLoadScript() {
  if (YT) {
    new YT.Player("video-load", {
      height: "500",
      width: "850",
      videoId,
      events: {
        onReady: (event) => {
            document.title = event.target.videoTitle ;
            extractVideoDetails(videoId);
            fetchStats(videoId)
        }
      }
    });
  }
}

const statsContainer = document.getElementsByClassName("video-details")[0] ;

async function extractVideoDetails(videoId){ 
    let endpoint = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${key}`;

    try {
        let response = await fetch(endpoint);
        let result = await response.json();
        console.log(result, "comments")
        renderComments(result.items);
    }
    catch(error){
        console.log(`Error occured`, error)
    }
    
}