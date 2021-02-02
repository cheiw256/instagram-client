import React, {useState} from 'react';
import firebase from "firebase";
import {storage, db} from "../firebase"
import "../styles/style.css";
import {Input, Button} from "@material-ui/core";


const ImageUpload = ({username}) => {
    const[image,setImage] = useState(null);
    const[url,setURL] = useState("");
    const[progress,setProgress] = useState(0);
    const[caption,setCaption]=  useState("");

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
                setProgress(progress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then((url) => {
                    setURL(url);

                    {/*axios.post('/upload', {
                        caption: caption,
                        user: username,
                        image: image
                    })*/}

                    db.collection("posts").add({
                        caption: caption,
                        imageUrl: url,
                        username: username,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                })
            }

        );

    }

    return(
        <div className="imageupload">
            <progress className="imageupload-progress" value={progress} max="100" />
                <Input
                    placeholder="Enter a caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                />
                <div>
                    <input type="file" onChange={handleChange} />
                    <Button className="imageupload-button" onClick={handleUpload}>
                        Upload
                    </Button>
                </div>
            <br />
      </div>
    )
}

export default ImageUpload;