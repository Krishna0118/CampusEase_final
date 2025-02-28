import booking from "../models/BookingModel.js";
export const autoInc = async () => {
  const [recentDoc] = await booking.find().sort({ _id: -1 }).limit(1);
  console.log(recentDoc);
  if (!recentDoc) return 0;
  return recentDoc.Booking_ID;
};
