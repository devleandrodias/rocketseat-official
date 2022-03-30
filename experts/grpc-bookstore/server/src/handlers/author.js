function GetAuthor(database) {
  return (call, cb) => {
    try {
      const { authorId } = call.request;
      const author = assertAuthor(database, authorId);
      return cb(null, { authors: author });
    } catch (error) {
      return cb(error, null);
    }
  };
}

function DeleteAuthor(database) {
  return (call, cb) => {
    try {
      const { authorId } = call.request;
      assertAuthor(database, authorId);
      database.deleteAuthor(authorId);
      database.save();
      return cb(null, {});
    } catch (error) {
      return cb(error, null);
    }
  };
}

function ListAuthor(database) {
  return (_, cb) => {
    return cb(null, { authors: database.listAuthors() });
  };
}

function CreateAuthor(database) {
  return (call, cb) => {
    const { author } = call.request;
    try {
      const newAuthor = database.addAuthor(author);
      database.save();
      return cb(null, { authors: newAuthor });
    } catch (error) {
      return cb(error, null);
    }
  };
}

function UpdateAuthor(database) {
  return (call, cb) => {
    const { authorId, data } = call.request;

    try {
      assertAuthor(database, authorId);
      const updatedAuthor = database.updateAuthor(authorId, data);
      database.save();
      return cb(null, { authors: updatedAuthor });
    } catch (error) {
      return cb(error, null);
    }
  };
}

function assertAuthor(database, id) {
  const author = database.getAuthor(id);
  if (!author) throw new Error(`Author ${id} not found!`);
  return author;
}

module.exports = (databaseInstance) => ({
  GetAuthor: GetAuthor(databaseInstance),
  ListAuthor: ListAuthor(databaseInstance),
  CreateAuthor: CreateAuthor(databaseInstance),
  UpdateAuthor: UpdateAuthor(databaseInstance),
  DeleteAuthor: DeleteAuthor(databaseInstance),
});
