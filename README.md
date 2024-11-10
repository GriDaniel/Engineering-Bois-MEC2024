<a id="readme-top"></a>

<div align="center">

<h3 align="center">YouTube Clone</h3>

  <p align="center">
    A video uploading and streaming service similar to YouTube.
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#architecture">Architecture</a></li>
        <li><a href="#demo">Demo</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

![YT Clone Homepage](https://github.com/user-attachments/assets/e89a3b27-a3df-4b41-aa15-3f411c08421a)

This project mimics core features present in YouTube. It allows users to sign in via Google, upload videos, and view other uploaded videos. I primarily built it as a learning experience for full stack app development.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Express][Express.js]][Express-url]
* [![Docker][Docker]][Docker-url]
* [![FFmpeg][FFmpeg]][FFmpeg-url]
* [![Firebase][Firebase]][Firebase-url]
* [![GCloud][GCloud]][Gcloud-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Architecture -->
### Architecture
![Architecture Layout](https://github.com/user-attachments/assets/e8fcf070-baf4-4477-9521-a82da21fa5d0)

1. Cloud Storage stores the raw and processed videos uploaded by users.
2. Pub/Sub sends messages to the video processing service.
3. Cloud Run hosts a non-public video processing service. After it transcodes videos, they are uploaded to Cloud Storage.
4. Cloud Firestore stores the metadata for the videos.
5. Cloud Run hosts a Next.js app, which serves as the Youtube web client.
6. The Next.js app makes API calls to Firebase Functions.
7. Firebase Functions fetches videos from Cloud Firestore and returns them.

### Demo
https://yt-web-client-227167548795.us-central1.run.app/

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Mansoor Lunawadi - mansoorlunawadi@yahoo.ca

Project Link: [https://github.com/Skilledgamer101/youtube-clone](https://github.com/Skilledgamer101/youtube-clone)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [NeetCode](https://neetcode.io/courses/full-stack-dev/0) <br />
I followed the Full Stack App Development course offered on [NeetCode](https://neetcode.io/courses/full-stack-dev/0).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript]: https://shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=FFF
[TypeScript-url]: https://www.typescriptlang.org/
[Express.js]: https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[Docker]: https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[FFmpeg]: https://img.shields.io/badge/FFmpeg-007808?style=for-the-badge&logo=FFmpeg&logoColor=green
[FFmpeg-url]: https://www.ffmpeg.org/
[Firebase]: https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black
[Firebase-url]: https://firebase.google.com
[GCloud]: https://img.shields.io/badge/Google%20Cloud-4285F4?&style=for-the-badge&logo=Google%20Cloud&logoColor=white
[GCloud-url]: https://cloud.google.com
