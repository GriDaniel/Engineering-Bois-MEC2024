import {credential} from "firebase-admin";
import {initializeApp} from "firebase-admin/app";
import {Firestore} from "firebase-admin/firestore";

initializeApp({credential: credential.applicationDefault()});

const firestore = new Firestore();

const videoCollectionId = 'videos';

// could add date, etc to below too
export interface Video {
    id?: string,
    uid?: string,
    filename?: string,
    status?: 'processing' | 'processed',
    title?: string,
    description?: string
}

/**
 * @param videoId - The ID of the video to fetch from Firestore
 * @returns A promise that resolves when the video is returned
 */
async function getVideo(videoId: string) {
    const snapshot = await firestore.collection(videoCollectionId).doc(videoId).get();
    return (snapshot.data() as Video) ?? {};    // return video data or undefined (returned as empty)

}

/**
 * @param videoId - The ID of the video to write to in Firestore
 * @param video - Details of the video (JSON) - ID, UID, Filename, Status, Title, Description
 * @returns A promise that resolves when the video is written to
 */
export function setVideo(videoId: string, video: Video) {
    firestore
        .collection(videoCollectionId)
        .doc(videoId)
        .set(video, {merge: true})      // update spec video property only while keeping other props if already present in firestore
    console.log(`Video details successfully set: filename: ${video.filename}, status: ${video.status}`);
}

/**
 * 
 * @param videoId - The ID of the video to check if it is present in Firestore
 * @returns A promise that resolves when the ID of the video is checked
 */

export async function isVideoNew(videoId: string) {
    const video = await getVideo(videoId);
    return video?.status === undefined;
}