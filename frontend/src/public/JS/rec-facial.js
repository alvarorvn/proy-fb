


function initVideo() {
    navigator.mediaDevices.getUserMedia(
        {
            video: {}
        }
    ).then((stream) => {
        video.srcObject = stream;
    }).catch((err) => {
        console.log(err);
    })
}

initVideo();