// @ts-check
import pool from '../db/pool';
import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema({
  id: Number,
  userId: Number,
  codes: [Number],
})

const TimeTable = {
  getCoursesByUser: async(userId: number) => {

    const Timetable = pool.model("timetables", timetableSchema);

    try {
      const userTimetable = await Timetable.findOne({ userId });

      if (!userTimetable) {
        console.log(`No timetable found for userId ${userId}`);
        return;
      }

      // Log timetable
      console.log(`Timetable for userId ${userId}:`, userTimetable);
      return userTimetable;

    } catch (error) {
        console.error("Error fetching timetable:", error);
    }
  },

  updateTimetableByUser: async(userId: number, codes: number[] ) => {

    const Timetable = pool.model("timetables", timetableSchema);

    try {
      const existingItem = await Timetable.findOne({ userId });

      if (existingItem) {
          // Update the existing item with the new codes
          //console.log(`Timetable for userId ${userId}:`, existingItem);
          existingItem.set({codes});
          existingItem.save();
          console.log(`Updated timetable for user ${userId}`);

      }  else {
           // Create a new timetable item
           const newTimetable= new Timetable({
            userId,
            codes,
          });
          newTimetable.save();
          console.log(`Created new timetable for user ${userId}`);

        }
    } catch (error) {
      console.error('Error updating timetable item:', error);
    }
  }
}


export default TimeTable;

//TimeTable.getCoursesByUser(1);
//TimeTable.updateTimetableByUser(3, [4,5,6]);
//TimeTable.getCoursesByUser(3);