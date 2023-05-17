exports.up = (pgm) => {
  // ? create table collaborations
  pgm.createTable('collaborations', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    note_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  /*
    ? Added a UNIQUE constraint, a combination of the note_id and user_id columns.
    ? In order to avoid data duplication between the two values.
  */
  pgm.addConstraint('collaborations', 'unique_note_id_and_user_id', 'UNIQUE(note_id, user_id)');

  /*
    ? provide a foreign key constraint on the note_id column
    ? and user_id against notes.id and users.id
  */
  pgm.addConstraint(
    'collaborations',
    'fk_collaborations.note_id_notes.id',
    'FOREIGN KEY(note_id) REFERENCES notes(id) ON DELETE CASCADE',
  );
  pgm.addConstraint(
    'collaborations',
    'fk_collaborations.user_id_users.id',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  // ? delete table collaborations
  pgm.dropTable('collaborations');
};
