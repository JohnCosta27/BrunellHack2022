# HackBrunel V2 Submission: Geo Chat

Geo Chat is a Geo fenced messaging platform.

## What it does
Allows users to:

View messages from other users that were made near them, or within a specific radius.
Send messages from where they are, for all other users to see.
All messages are completely anonymous, so there is no safety concerns.

## How we built it
We used a serverless architecture to host our project, as it is likely to see massive spikes around certain locations, therefore we needed a very flexible architecture. We did this by using Firebase:

Cloud functions for our API endpoints
Firestore document database for persistent and real-time storage.
Firebase Hosting for static website hosting
For the frontend we used modern web frameworks:

React
Openstreet Maps
TailwindCSS for styling
Vite for bundling all the files together.
