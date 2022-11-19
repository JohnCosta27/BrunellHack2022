import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as geofire from "geofire-common";

admin.initializeApp();
const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const messages = functions.https.onRequest(async (req, res) => {
  const body = req.body;
  if (!body["lat"] || !body["lon"] || !body["radius"]) {
    res.status(400).send("send lat and lon");
    return;
  }

  const radius = parseInt(body["radius"]);
  const bounds = geofire.geohashQueryBounds([body["lon"], body["lat"]], radius);
  console.log(bounds);

  const promises = bounds.map((b) =>
    db.collection("deadDrops").orderBy('hash')
    .startAt(b[0])
    .endAt(b[1]).get()
  );

  const response: any[] = [];
  Promise.all(promises).then(snapshots => {
    for (const snap of snapshots) {
      for (const doc of snap.docs) {
        response.push(doc.data());
      }
    }
  });

  res.status(200).send(response);
});

export const createDrop = functions.https.onRequest(async (request, response) => {
  const body = request.body;
  if (!body.lon) {
    response.status(400).send("Error: parameter lon requried");
    return;
  }

  if (!body.lat) {
    response.status(400).send("Error: parameter lat required");
    return;
  }

  if (!body.message) {
    response.status(400).send("Error: parameter message required");
    return;
  }

  const hash = geofire.geohashForLocation([body["lon"], body["lat"]]);
  const current = db.collection("deadDrops").doc(hash);
  const doc = await current.get();

  const message = {
    payload: body.message,
    created: new Date(),
  };

  if (!doc.exists) {
    current.set({
      lat: body.lat,
      lon: body.lon,
      messages: [message],
    });
  } else {
    current.update({
      messages: [...doc.data()!.messages, message],
    });
  }

  response.send();
});
