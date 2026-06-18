const { getDb } = require("../utils/databaseUtil");

const mapHome = (row) => ({
  _id: row.id,
  id: row.id,
  houseName: row.house_name,
  location: row.location,
  Price: row.price,
  Rating: row.rating,
  description: row.description,
  imageUrl: row.image_url,
  imageUrls: row.image_urls && row.image_urls.length > 0
    ? row.image_urls
    : row.image_url
      ? [row.image_url]
      : [],
});

module.exports = class Home {
  constructor(houseName, location, Price, Rating, description, imageUrls, _id) {
    this.houseName = houseName;
    this.location = location;
    this.Price = Price;
    this.Rating = Rating;
    this.description = description;
    this.imageUrls = imageUrls || [];
    if (_id) {
      this._id = _id;
    }
  }

  save() {
    const db = getDb();
    return db.query(
      `INSERT INTO homes (house_name, location, price, rating, description, image_url, image_urls)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        this.houseName,
        this.location,
        this.Price || 0,
        this.Rating || null,
        this.description || "",
        this.imageUrls[0] || "",
        this.imageUrls,
      ]
    );
  }

  static fetchAllHomes() {
    const db = getDb();
    return db
      .query("SELECT * FROM homes ORDER BY created_at DESC, id DESC")
      .then((result) => result.rows.map(mapHome));
  }

  static findById(homeId) {
    const db = getDb();
    return db
      .query("SELECT * FROM homes WHERE id = $1", [homeId])
      .then((result) => (result.rows[0] ? mapHome(result.rows[0]) : null));
  }

  static deleteById(homeId) {
    const db = getDb();
    return db.query("DELETE FROM homes WHERE id = $1", [homeId]);
  }
};
