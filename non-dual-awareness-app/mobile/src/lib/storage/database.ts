/**
 * Database Layer
 * SQLite database setup and operations
 */

import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'awareness.db';

// Database instance
let db: SQLite.SQLiteDatabase | null = null;

/**
 * Initialize the database and create tables
 */
export const initDatabase = async (): Promise<void> => {
  try {
    db = await SQLite.openDatabaseAsync(DATABASE_NAME);

    // Create journal entries table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS journal_entries (
        id TEXT PRIMARY KEY,
        content TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        session_id TEXT,
        tags TEXT
      );
    `);

    // Create practice sessions table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS practice_sessions (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        start_time TEXT NOT NULL,
        duration INTEGER NOT NULL,
        sequence_id TEXT,
        teaching_id TEXT,
        notes TEXT,
        completed INTEGER NOT NULL,
        created_at TEXT NOT NULL
      );
    `);

    // Create bookmarks table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS bookmarks (
        id TEXT PRIMARY KEY,
        content_type TEXT NOT NULL,
        content_id TEXT NOT NULL,
        note TEXT,
        created_at TEXT NOT NULL
      );
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

/**
 * Get database instance
 */
export const getDatabase = (): SQLite.SQLiteDatabase => {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
};

// Journal Entry Types
export interface JournalEntry {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  session_id?: string;
  tags?: string;
}

// Journal Operations
export const journalOperations = {
  /**
   * Create a new journal entry
   */
  create: async (content: string, sessionId?: string, tags?: string[]): Promise<JournalEntry> => {
    const database = getDatabase();
    const id = `journal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();
    const tagsString = tags ? JSON.stringify(tags) : null;

    await database.runAsync(
      `INSERT INTO journal_entries (id, content, created_at, updated_at, session_id, tags)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, content, now, now, sessionId || null, tagsString]
    );

    return {
      id,
      content,
      created_at: now,
      updated_at: now,
      session_id: sessionId,
      tags: tagsString || undefined,
    };
  },

  /**
   * Get all journal entries
   */
  getAll: async (): Promise<JournalEntry[]> => {
    const database = getDatabase();
    const result = await database.getAllAsync<JournalEntry>(
      'SELECT * FROM journal_entries ORDER BY created_at DESC'
    );
    return result;
  },

  /**
   * Get a single journal entry by ID
   */
  getById: async (id: string): Promise<JournalEntry | null> => {
    const database = getDatabase();
    const result = await database.getFirstAsync<JournalEntry>(
      'SELECT * FROM journal_entries WHERE id = ?',
      [id]
    );
    return result || null;
  },

  /**
   * Update a journal entry
   */
  update: async (id: string, content: string, tags?: string[]): Promise<void> => {
    const database = getDatabase();
    const now = new Date().toISOString();
    const tagsString = tags ? JSON.stringify(tags) : null;

    await database.runAsync(
      'UPDATE journal_entries SET content = ?, updated_at = ?, tags = ? WHERE id = ?',
      [content, now, tagsString, id]
    );
  },

  /**
   * Delete a journal entry
   */
  delete: async (id: string): Promise<void> => {
    const database = getDatabase();
    await database.runAsync('DELETE FROM journal_entries WHERE id = ?', [id]);
  },

  /**
   * Search journal entries
   */
  search: async (query: string): Promise<JournalEntry[]> => {
    const database = getDatabase();
    const searchTerm = `%${query}%`;
    const result = await database.getAllAsync<JournalEntry>(
      'SELECT * FROM journal_entries WHERE content LIKE ? ORDER BY created_at DESC',
      [searchTerm]
    );
    return result;
  },
};

// Practice Session Types
export interface PracticeSession {
  id: string;
  type: 'sit' | 'inquiry' | 'contemplation';
  start_time: string;
  duration: number;
  sequence_id?: string;
  teaching_id?: string;
  notes?: string;
  completed: number;
  created_at: string;
}

// Practice Session Operations
export const sessionOperations = {
  /**
   * Create a new practice session
   */
  create: async (
    type: 'sit' | 'inquiry' | 'contemplation',
    duration: number,
    completed: boolean,
    sequenceId?: string,
    teachingId?: string,
    notes?: string
  ): Promise<PracticeSession> => {
    const database = getDatabase();
    const id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();

    await database.runAsync(
      `INSERT INTO practice_sessions (id, type, start_time, duration, sequence_id, teaching_id, notes, completed, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        type,
        now,
        duration,
        sequenceId || null,
        teachingId || null,
        notes || null,
        completed ? 1 : 0,
        now,
      ]
    );

    return {
      id,
      type,
      start_time: now,
      duration,
      sequence_id: sequenceId,
      teaching_id: teachingId,
      notes,
      completed: completed ? 1 : 0,
      created_at: now,
    };
  },

  /**
   * Get all practice sessions
   */
  getAll: async (): Promise<PracticeSession[]> => {
    const database = getDatabase();
    const result = await database.getAllAsync<PracticeSession>(
      'SELECT * FROM practice_sessions ORDER BY created_at DESC'
    );
    return result;
  },

  /**
   * Get sessions by type
   */
  getByType: async (type: 'sit' | 'inquiry' | 'contemplation'): Promise<PracticeSession[]> => {
    const database = getDatabase();
    const result = await database.getAllAsync<PracticeSession>(
      'SELECT * FROM practice_sessions WHERE type = ? ORDER BY created_at DESC',
      [type]
    );
    return result;
  },

  /**
   * Get total practice time
   */
  getTotalDuration: async (): Promise<number> => {
    const database = getDatabase();
    const result = await database.getFirstAsync<{ total: number }>(
      'SELECT SUM(duration) as total FROM practice_sessions WHERE completed = 1'
    );
    return result?.total || 0;
  },
};

// Bookmark Types
export interface Bookmark {
  id: string;
  content_type: 'pointer' | 'teaching' | 'sequence';
  content_id: string;
  note?: string;
  created_at: string;
}

// Bookmark Operations
export const bookmarkOperations = {
  /**
   * Create a new bookmark
   */
  create: async (
    contentType: 'pointer' | 'teaching' | 'sequence',
    contentId: string,
    note?: string
  ): Promise<Bookmark> => {
    const database = getDatabase();
    const id = `bookmark_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();

    await database.runAsync(
      'INSERT INTO bookmarks (id, content_type, content_id, note, created_at) VALUES (?, ?, ?, ?, ?)',
      [id, contentType, contentId, note || null, now]
    );

    return {
      id,
      content_type: contentType,
      content_id: contentId,
      note,
      created_at: now,
    };
  },

  /**
   * Get all bookmarks
   */
  getAll: async (): Promise<Bookmark[]> => {
    const database = getDatabase();
    const result = await database.getAllAsync<Bookmark>(
      'SELECT * FROM bookmarks ORDER BY created_at DESC'
    );
    return result;
  },

  /**
   * Delete a bookmark
   */
  delete: async (id: string): Promise<void> => {
    const database = getDatabase();
    await database.runAsync('DELETE FROM bookmarks WHERE id = ?', [id]);
  },

  /**
   * Check if content is bookmarked
   */
  isBookmarked: async (contentType: string, contentId: string): Promise<boolean> => {
    const database = getDatabase();
    const result = await database.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM bookmarks WHERE content_type = ? AND content_id = ?',
      [contentType, contentId]
    );
    return (result?.count || 0) > 0;
  },
};

export default {
  initDatabase,
  getDatabase,
  journalOperations,
  sessionOperations,
  bookmarkOperations,
};
