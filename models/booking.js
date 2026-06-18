const { getDb } = require("../utils/databaseUtil");

module.exports = class Booking {
  constructor(houseId) {
    this.houseId = houseId;
  }

  save() {
    const db = getDb();
    return db.query(
      "INSERT INTO bookings (home_id) VALUES ($1) ON CONFLICT (home_id) DO NOTHING",
      [this.houseId]
    );
  }

  static getBookings() {
    const db = getDb();
    return db
      .query("SELECT home_id FROM bookings ORDER BY created_at DESC")
      .then((result) =>
        result.rows.map((row) => ({
          houseId: row.home_id,
        }))
      );
  }

  static deleteById(delHomeId) {
    const db = getDb();
    return db.query("DELETE FROM bookings WHERE home_id = $1", [delHomeId]);
  }
};
