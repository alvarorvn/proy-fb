async function recFacial(router, ngZone) {
    const imageList = document.querySelector('#ListaImagenes');
    const videoContainer = document.getElementById("video");
    const video = await navigator.mediaDevices.getUserMedia({
        video: true,
    })

    await faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models')
    await faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models')
    await faceapi.nets.faceExpressionNet.loadFromUri('/assets/models')
    await faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models')

    videoContainer['srcObject'] = video;

    const imageDescriptors = [];
    var faceMatcher;

    const processStaticFace = async (image, id) => {
        const detection = await faceapi.detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor()
        if (detection === undefined) return;

        imageDescriptors.push({
            id,
            detection
        });

        faceMatcher = new faceapi.FaceMatcher(imageDescriptors.map(faceDescriptor => (
            new faceapi.LabeledFaceDescriptors(
                (faceDescriptor.id).toString(),
                [faceDescriptor.detection.descriptor]
            )
        )))

    }

    const syncImages = () => {
        list_images = new Array();

        $.get("http://localhost:3000", function (users) {
            users.forEach(user => {
                let obj = {};
                obj.id = user.usuario_id;
                obj.image = user.image_rec_facial;
                obj.name = user.image_name;
                list_images.push(obj);
            });

            for (let index = 0; index < list_images.length; index++) {
                const imageContainer = document.createElement('div');
                const label = document.createElement('input');
                const imageElement = document.createElement('img');
                const status = document.createElement('div');
                imageContainer.id = list_images[index].id;
                imageContainer.classList.add('image-container');

                imageElement.src = `data:image/png;base64, ${list_images[index].image}`;
                label.value = list_images[index].id;

                imageContainer.appendChild(status);
                imageContainer.appendChild(imageElement);
                imageContainer.appendChild(label);

                imageList.appendChild(imageContainer);

                processStaticFace(imageElement, list_images[index].id);
            }
        });
    }

    const processFace = async () => {
        const detection = await faceapi.detectSingleFace(videoContainer, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor()
        if (detection === undefined) return;
        console.log(detection);

        //if(!faceMatcher || !descriptor) return;
        const match = faceMatcher.findBestMatch(detection.descriptor);
        [...imageList.children].forEach(image => {
            if (image.id.indexOf(match._label) > -1) {
                $.ajax({
                    type: "POST",
                    data: { id: match._label },
                    url: "http://localhost:3000/recFacial",
                    success: function (res) {
                        localStorage.setItem('token', res.token);
                        localStorage.setItem('id', res.user.usuario_id);
                        ngZone.run(() => router.navigate([`${res.user.usuario_id}`]));
                    }
                });
            }
        })
    }

    var proc = setInterval(processFace, 1000);

    syncImages();
}