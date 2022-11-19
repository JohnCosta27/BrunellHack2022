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

  const snapshots = await Promise.all(promises);
  const responses: any[] = [];
  for (const snap of snapshots) {
    for (const doc of snap.docs) {
      responses.push(doc.data());
    }
  }
  for (let response of responses) {
    const snaps = await db.collection("messages").where("id", "in", response.messages).get();
    const messages: any = [];
    for (const snap of snaps.docs) {
      messages.push(snap.data());
    }
    response.messages = messages;
  }
  res.status(200).send(responses);
});

export const createDrop = functions.https.onRequest(async (request, response) => {
  const body = request.body;
  const errors = requiredParams(["lon", "lat", "message"], body);
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
    upVotes: 0,
    downVotes: 0,
  };
  db.collection("messages").doc(message.id).set(message);

  if (!doc.exists) {
    current.set({
      hash: hash,
      lat: body.lat,
      lon: body.lon,
      messages: [message.id],
    });
  } else {
    current.update({
      messages: [...doc.data()!.messages, message.id],
    });
  }

  response.send(message);
});

export const upvoteMessage = functions.https.onRequest(async (req, res) => {
  const body = req.body;
  const errors = requiredParams(["messageId"], body);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  const current = db.collection("messages").doc(body.messageId);
  const doc = await current.get();

  if (!doc.exists) {
    res.status(404).send("Error: Message not found");
    return;
  }
  const message = doc.data();
  let upVotes = 0;
  if (message && message.upVotes) {
    upVotes = message.upVotes;
  }

  current.update({ upVotes: upVotes + 1 });
  res.send((await current.get()).data());
});

export const downvoteMessage = functions.https.onRequest(async (req, res) => {
  const body = req.body;
  const errors = requiredParams(["messageId"], body);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  const current = db.collection("messages").doc(body.messageId);
  const doc = await current.get();

  if (!doc.exists) {
    res.status(404).send("Error: Message not found");
    return;
  }
  const message = doc.data();
  let downVotes = 0;
  if (message && message.downVotes) {
    downVotes = message.downVotes;
  }

  current.update({ downVotes: downVotes + 1 });
  res.send((await current.get()).data());
});
