const fs = require("fs");

class chatContainer {
  constructor(fileDir) {
    this.fileDir = fileDir;
  }

  async save(object) {
    try {
      const messages = await this.getAll();

      if (messages.length > 0) {
        //obtengo el id del ultimo elemento del array
        const newId = messages[messages.length - 1].id;

        //agrego el nuevo msg
        const newMsg = { id: newId + 1, ...object };
        messages.push(newMsg);

        await fs.promises.writeFile(
          this.fileDir,
          JSON.stringify(messages, null, 2)
        );
      } else {
        const newMsg = { id: 1, ...object };

        await fs.promises.writeFile(
          this.fileDir,
          JSON.stringify([newMsg], null, 2)
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.fileDir, "utf-8");
      const chat = JSON.parse(data);
      return chat;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = chatContainer;
