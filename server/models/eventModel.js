const db = require('../db/db');

class EventSQL {
  static async createEvent(event) {
    try {
      const result = await db.query(
        'INSERT INTO events (title, description, location, createdAt, imageUrl, startDate, endDate, price, isFree, url, categoryId, organizerId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          event.title,
          event.description,
          event.location,
          event.createdAt,
          event.imageUrl,
          event.startDate,
          event.endDate,
          event.price,
          event.isFree ? 1 : 0,
          event.url,
          event.categoryId,
          event.organizerId
        ]
      );
      return result.insertId; // Return the ID of the inserted event
    } catch (error) {
      throw new Error(`Error creating event: ${error.message}`);
    }
  }

  static async getEventById(id) {
    try {
      const results = await db.query('SELECT * FROM events WHERE id = ?', [id]);
      return results;
    } catch (error) {
      throw new Error(`Error getting event by ID: ${error.message}`);
    }
  }

  static async getAllEvents() {
    try {
      const results = await db.query('SELECT * FROM events');
      return results;
    } catch (error) {
      throw new Error(`Error getting all events: ${error.message}`);
    }
  }

  static async getEventsByCategory(categoryId) {
    try {
      const results = await db.query('SELECT * FROM events WHERE categoryId = ?', [categoryId]);
      return results;
    } catch (error) {
      throw new Error(`Error getting events by category: ${error.message}`);
    }
  }

  static async getEventsByOrganizer(organizerId) {
    try {
      const results = await db.query('SELECT * FROM events WHERE organizerId = ?', [organizerId]);
      return results;
    } catch (error) {
      throw new Error(`Error getting events by organizer: ${error.message}`);
    }
  }
}

module.exports = EventSQL;
