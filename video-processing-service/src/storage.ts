// 1. GCS file interactions
// 2. Local file interactions
// OVERVIEW: bucket -> PC -> bucket
// OVERVIEW: raw -> processing -> processed
// this file is like storage for a bunch of functions helping with the above

import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';

// create instance of GCS
const storage = new Storage();

const rawVideoBucketName = "mansoor-yt-raw-videos";
const processedVideoBucketName = "mansoor-yt-processed-videos";

const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";

/**
 * Creates the LOCAL directories for raw and processed videos
 */
export function setupDirectories() {
    ensureDirectoryExistence(localRawVideoPath);
    ensureDirectoryExistence(localProcessedVideoPath);
}


/**
 * @param rawVideoName - The name of the file to convert from {@link localRawVideoPath}
 * @param processedVideoName - The name of the file to convert to {@link localProcessedVideoPath}
 * @returns A promise that resolves when the video has been converted.
 */
export function convertVideo(rawVideoName: string, processedVideoName: string) {
    console.log("Made it to video conversion function");
    return new Promise<void>((resolve, reject) => {
        // below function is asynchronous (need event handlers)
        ffmpeg(`${localRawVideoPath}/${rawVideoName}`)
            .outputOptions("-vf", "scale=-1:360") // 360p
            .on("end", function () {
                console.log("Video processing finished successfully"); // 200 code => success
                resolve();
            })
            .on("error", function (err: any) {
                console.log(`An error occured: ${err.message}`);
                reject(err);
            })
            .save(`${localProcessedVideoPath}/${processedVideoName}`);
    });
}


/**
 * bucket to PC (raw)
 * @param fileName - The name of the file to download from the 
 * {@link rawVideoBucketName} bucket into the {@link localRawVideoPath} folder
 * @returns A promise that resolves when the file has been downloaded.
 */
export async function downloadRawVideo(fileName: string) {
    await storage.bucket(rawVideoBucketName)    // await - blocks any code from running until await code is completed (synchronous)
        .file(fileName)
        .download({ destination: `${localRawVideoPath}/${fileName}`});
    console.log(
        `gs://${rawVideoBucketName}/${fileName} downloaded to ${localRawVideoPath}/${fileName}`
    );
}

/**
 * PC to bucket (processed)
 * @param fileName - The name of the file to upload from the 
 * {@link localProcessedVideoPath} folder into the {@link processedVideoBucketName} bucket
 * @returns A promise that resolves when the file has been uploaded.
 */
export async function uploadProcessedVideo(fileName: string) {
    const bucket = storage.bucket(processedVideoBucketName);
    await bucket    // await - blocks any code from running until await code is completed (synchronous)
        .upload(`${localProcessedVideoPath}/${fileName}`, { destination: fileName });
    console.log(
        `${localProcessedVideoPath}/${fileName} uploaded to gs://${processedVideoBucketName}/${fileName}`
    );
    await bucket.file(fileName).makePublic();    
}

// need to delete raw and processed videos from LOCAL PC
/**
 * 
 * @param fileName - The name of the file to delete from the
 * {@link localRawVideoPath} folder.
 * @returns A promise that resolves when the file has been deleted
 */
export function deleteRawVideo(fileName: string) {
    return deleteFile(`${localRawVideoPath}/${fileName}`);
}
/**
 * 
 * @param fileName - The name of the file to delete from the
 * {@link localProcessedVideoPath} folder.
 * @returns A promise that resolves when the file has been deleted
 */
export function deleteProcessedVideo(fileName: string) {
    return deleteFile(`${localProcessedVideoPath}/${fileName}`);
}


function deleteFile(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(`Failed to delete file at ${filePath}`, err);
                    reject(err);
                } else {
                    console.log(`Deleted file at ${filePath}`, err);
                    resolve();
                }
            })
        } else {
            console.log(`File not found at ${filePath}, skipping the delete.`);
            resolve();  // personal decision to mark nonexistent files as resolve... since we know this fn will be handling such cases "normally"
        }
    })
}

/**
 * Ensures a directory exists, creating it if necessary
 * @param {string} dirPath - The directory path to check
 */
function ensureDirectoryExistence(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, {recursive : true}); // recursive allows creating nested directories
        console.log(`Directory created at ${dirPath}`);
    }
}

