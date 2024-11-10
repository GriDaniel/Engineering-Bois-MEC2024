import {httpsCallable} from 'firebase/functions';
import {functions} from './firebase'


const generateUploadURL = httpsCallable(functions, 'generateUploadURL');
const getVideosFunction = httpsCallable(functions, 'getVideos');

export interface Video {
    id?: string,
    uid?: string,
    filename?: string,
    status?: "processing" | "processed",
    title?: string,
    description?: string
}


export async function uploadVideo(file: File) {
    // call generate upload url function with file name extension
    const response: any = await generateUploadURL({
        fileExtension: file.name.split('.').pop()
    })

    // upload file via signed URL
    // response? means only perform if response is defined
    await fetch(response?.data?.url, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type
        }
    })
    return;

}

export async function getVideos() {
    const response = await getVideosFunction();
    return response.data as Video[];
}