const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://adminHotel:12345@localhost:27017/Hotel',
  port: process.env.PORT || 8000,
};
// use Hotel
// db.createUser({ user: "adminHotel", pwd: "12345", roles: [ { role: "userAdmin", db: "Hotel" } ] })
export default config;
