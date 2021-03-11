var ipAddress = "http://localhost:2053";

if (process.env.NODE_ENV == "production")
  ipAddress = "https://s.bad-day.today:2053";

const defaultImg =
  "https://www.literarytraveler.com/wp-content/uploads/2013/05/Vincent_van_Gogh_Self_Portrait_1887_ChicagoArtInstitute.jpg";

export { ipAddress, defaultImg };
