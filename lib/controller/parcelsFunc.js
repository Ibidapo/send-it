const parcelbyId = (db, id) => db.filter((parcel) => {
  const { parcelId } = parcel;
  return parcelId.toString() === id.toString();
});

const parcelbyUser = (db, id) => db.filter((parcel) => {
  const { userId } = parcel;
  return userId.toString() === id.toString();
});

export { parcelbyId, parcelbyUser };
