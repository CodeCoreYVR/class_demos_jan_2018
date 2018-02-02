// This file is using `exports` instead of
// `module.exports`. Unlike `module.exports`, this will
// export individual named values seperatly.

// 👇 exports the following function under the name 'up'
exports.up = function(knex) {
  return knex.schema
    .createTable('posts', table => {
      table.increments('id');
      // 👆 creates a column that is unique, is auto-generated,
      // increments with every row and is meant to be used as
      // a primary key
      table.string('username');
      // name of method is data type of column
      // first argument is the name of the column
      table.text('description');
      table.string('pictureUrl');
      table.timestamps(false, true);
      // timestamps creates 2 columns named `created_at`
      // `updated_at` which will be initially the date
      // when the row was created.
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};
