exports.up = (pgm) => {
  // ? create new user
  pgm.sql(
    "INSERT INTO users(id, username, password, fullname) VALUES ('old_notes', 'old_notes', 'old_notes', 'old notes')",
  );

  // ? change the owner value of a note whose owner is NULL
  pgm.sql("UPDATE notes SET owner = 'old_notes' WHERE owner IS NULL");

  // ? assigns a foreign key constraint to the owner against the id column of the users table
  pgm.addConstraint(
    'notes',
    'fk_notes.owner_users.id',
    'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  // ? delete the fk_notes.owner_users.id constraint on the notes table
  pgm.dropConstraint('notes', 'fk_notes.owner_users.id');

  // ? change the owner value of old_notes in notes to NULL
  pgm.sql("UPDATE notes SET owner = NULL WHERE owner = 'old_notes'");

  // ? delete the new user
  pgm.sql("DELETE FROM users WHERE id = 'old_notes'");
};
