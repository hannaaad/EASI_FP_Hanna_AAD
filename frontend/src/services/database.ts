import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function openDb() {
  return open({
    filename: '../../../EASI.db', // Replace with your SQLite database file path
    driver: sqlite3.Database,
  });
}

export default openDb;