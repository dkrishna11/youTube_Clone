let cokiee=document.cookie;
let videoId=cokiee.split("=")[1];

setTimeout(()=>{
    if(YT){
      new YT.Player("video-load",{
        width:"800",
        height:"600",
        videoId,
        events:{
            onReady:()=>{ś
                console.log("loaded")
            }
        }

      })
    }
}, 1000);