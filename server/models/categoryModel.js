const db = require('../db/db');

class CategorySQL {
  static async createCategory(categoryName) {
    try {
      const result = await db.query(
        'INSERT INTO categories (name) VALUES (?)',
        [categoryName]
      );
      return result.insertId; // Return the ID of the inserted category
    } catch (error) {
      throw new Error(`Error creating category: ${error.message}`);
    }
  }

  static async getCategoryByName(categoryName) {
    try {
      const results = await db.query('SELECT * FROM categories WHERE name = ?', [categoryName]);
      return results;
    } catch (error) {
      throw new Error(`Error getting category by name: ${error.message}`);
    }
  }

  static async getAllCategories() {
    try {
      const results = await db.query('SELECT * FROM categories');
      return results;
    } catch (error) {
      throw new Error(`Error getting all categories: ${error.message}`);
    }
  }
}

module.exports = CategorySQL;
