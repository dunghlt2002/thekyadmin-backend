module.exports = {
  // de trong .env
  // HOST: "localhost",   
  // USER: "admin",
  // PASSWORD: "8_Xaloxalac",
  // DB: "thekystoredataaws",
  // HOST: "thekystoredata.czrowfskgvge.us-east-2.rds.amazonaws.com",
  // dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
