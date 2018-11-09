const result = (db, id) => db.filter((parcel) => {
  const { parcelId } = parcel;
  return parcelId.toString() === id.toString();
});

export default result;
