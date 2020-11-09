const { 
	DB_HOST,
	DB_PORT,
	DB_USER,
	DB_PASSWORD,
	DB_DATABASE 
} = process.env;
module.exports = {
  mongodb: {
    URI:`mongodb://${DB_HOST}${DB_PORT}/${DB_DATABASE}`
  }
};
