module.exports = {
  db: {
    user: process.env.DB_USER || 'root',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'feed',
    password: process.env.DB_PASSWORD || 'root',
    port: process.env.DB_PORT || 3306,
  },
  port: process.env.PORT || 3000,
  noImageUrl: process.env.NO_IMAGE_URL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtr_yOCG0L5K8HT2IyLdER0OGg4PRm4YoGuMT-_jwA2xIKay1TAg',
};