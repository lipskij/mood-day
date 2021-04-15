import { Meteor } from 'meteor/meteor';
import { MoodsCollection } from '/imports/api/moods';


Meteor.startup(() => {
  MoodsCollection.find()
});
