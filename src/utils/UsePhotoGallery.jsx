import { useState, useEffect } from "react";
import { useCamera } from '@ionic/react-hooks/camera';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, CameraPhoto, Capacitor, FilesystemDirectory } from "@capacitor/core";

// const PHOTO_STORAGE = "photos";

export function usePhotoGallery() {
    // const { get, set } = useStorage();

    // const { deleteFile, getUri, readFile, writeFile } = useFilesystem();

    const [photos, setPhotos] = useState();
    

    const { getPhoto } = useCamera();

    // useEffect(() => {
    //     const loadSaved = async () => {
    //       const photosString = await get(storage);
    //       const photos = (photosString ? JSON.parse(photosString) : []);
    //       for (let photo of photos) {
    //         const file = await readFile({
    //           path: photo.filepath,
    //           directory: FilesystemDirectory.Data
    //         });
    //         photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
    //       }
    //       setPhotos(photos);
    //     };
    //     loadSaved();
    //   }, [get, readFile]);

    const takePhoto = async () => {
        const cameraPhoto = await getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100
        });

        const fileName = new Date().getTime() + '.jpeg';
        // const savedFileImage = await savePicture(cameraPhoto, fileName);
        // const newPhotos = [savedFileImage];
        // setPhotos(newPhotos)
        // set(storage, JSON.stringify(newPhotos));
        const newPhotos = {
            filepath: fileName,
            webviewPath: cameraPhoto.webPath,
            file: cameraPhoto.dataUrl
          };

        setPhotos(newPhotos)
    };



    // const savePicture = async (photo, fileName) => {
    //     const base64Data = await base64FromPath(photo.webPath);
    //     const savedFile = await writeFile({
    //         path: fileName,
    //         data: base64Data,
    //         directory: FilesystemDirectory.Data
    //     });     
        
    //     return {
    //         filepath: fileName,
    //         webviewPath: photo.webPath
    //     };
    // };

    
  
    return {
        photos,
      takePhoto,
      setPhotos
    };
}