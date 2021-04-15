import { Mongo } from "meteor/mongo";

export const MoodsCollection = new Mongo.Collection("moods");

// publish collection so that it connects to client
// for that in client use subscribe
// https://docs.meteor.com/api/pubsub.html

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('moods', () => {
    // TODO: return only moods 
    return MoodsCollection.find();
  });
}

// insert the pressed day and selected mood
// update collection

Meteor.methods({
  InsertMood(day, mood) {
    const moods = MoodsCollection.insert({
        day,
        mood,
        updatedAt: new Date()
    });
    return {moods}
  },
});
