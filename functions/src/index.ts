import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as geofire from "geofire-common";
import { v4 as uuid } from "uuid";
import { requiredParams } from "./utils";

admin.initializeApp();
const db = admin.firestore();

export const getMessages = functions.https.onRequest(async (req, res) => {
  const body = req.body;
  const errors = requiredParams(["lon", "lat", "radius"], body);
  console.log(errors);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  const radius = parseInt(body["radius"]);
  const bounds = geofire.geohashQueryBounds([body["lon"], body["lat"]], radius);

  const promises = bounds.map((b) =>
    db.collection("deadDrops").orderBy("hash").startAt(b[0]).endAt(b[1]).get()
  );

  Promise.all(promises).then((snapshots) => {
  const response: any[] = [];
    for (const snap of snapshots) {
      for (const doc of snap.docs) {
        response.push(doc.data());
      }
    }
    return response;
  }).then(d => res.status(200).send(d));
});

export const createDrop = functions.https.onRequest(async (request, response) => {
  const body = request.body;
  const errors = requiredParams(["lon", "lat", "radius"], body);
  if (errors.length > 0) {
    response.status(400).send(errors);
    return;
  }

  const hash = geofire.geohashForLocation([body.lon, body.lat]);
  const current = db.collection("deadDrops").doc(hash);
  const doc = await current.get();

  const message = {
    id: uuid(),
    payload: body.message,
    created: new Date(),
    upvotes: 0,
    downvotes: 0,
  };

  if (!doc.exists) {
    current.set({
      hash: hash,
      lat: body.lat,
      lon: body.lon,
      messages: [message],
    });
  } else {
    current.update({
      messages: [...doc.data()!.messages, message],
    });
  }

  response.send(message);
});
