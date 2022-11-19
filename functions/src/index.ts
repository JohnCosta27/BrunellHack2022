import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as geofire from 'geofire-common';

admin.initializeApp();
const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const createDrop = functions.https.onRequest(async (request, response) => {
  const body = request.body;
  if (!body["lon"] || !body["lat"]) {
    response.send("bruh, send me long and lat");
    return;
  }

  const hash = geofire.geohashForLocation([body["lon"], body["lat"]]);
  const current = db.collection("deadDrops").doc(hash);
  const doc = await current.get();

  if (!doc.exists) {
    current.set({
      lat: body["lat"],
      lon: body["lon"],
      messages: ["Hello World"],
    });
  } else {
    current.update({
      messages: [...doc.data()!.messages, "Helloooo!"],
    });
  }

  response.send('idk man');
});
