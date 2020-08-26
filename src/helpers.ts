export const dateConvert: Function = (ds: number) => {
  let dt = new Date(0);
  dt.setUTCSeconds(ds);

  return dt.toDateString();
};
