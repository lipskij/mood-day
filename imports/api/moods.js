import { Mongo } from "meteor/mongo";

export const MoodsCollection = new Mongo.Collection("moods");

if (Meteor.isServer) {
  Meteor.publish("moods", () => {
    return MoodsCollection.find();
  });
}

Meteor.methods({
  InsertMood(date, mood) {
    const moods = MoodsCollection.insert({
      date: new Date(date),
      mood,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return { moods };
  },
});
