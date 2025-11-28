import Database from 'better-sqlite3';

const db = new Database('./insights.sqlite');

export function clearDatabase() {
  try {
    db.prepare(`DELETE FROM messages`).run();
    db.prepare(`DELETE FROM members`).run();
    console.log('✅ Insights database cleared successfully.');
  } catch (err) {
    console.error('Failed to clear database:', err);
  }
}

export function clearGuildData(guildId) {
  try {
    db.prepare(`DELETE FROM messages WHERE guildId = ?`).run(guildId);
    db.prepare(`DELETE FROM members WHERE guildId = ?`).run(guildId);
    console.log(`✅ Cleared insights data for guild ${guildId}`);
  } catch (err) {
    console.error('Failed to clear guild data:', err);
  }
}

export default db;
