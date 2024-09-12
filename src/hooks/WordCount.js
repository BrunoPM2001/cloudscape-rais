import { Extension } from "@tiptap/core";

const WordCount = Extension.create({
  name: "wordCount",

  addOptions() {
    return {
      limit: 1000, // Límite de palabras, puedes cambiarlo según tus necesidades
      onUpdate: null, // Callback opcional para manejar actualizaciones del conteo de palabras
    };
  },

  addStorage() {
    return {
      wordCount: 0,
    };
  },

  onTransaction({ editor }) {
    // Obtener el contenido sin etiquetas HTML y contar las palabras
    const text = editor.getText();
    const wordCount = text
      .trim()
      .split(/\s+/)
      .filter((word) => word).length;

    this.storage.wordCount = wordCount;

    // Si se define un callback para actualizaciones, llámalo
    if (this.options.onUpdate) {
      this.options.onUpdate(wordCount);
    }

    // Restringir la edición si se alcanza el límite de palabras
    if (wordCount > this.options.limit) {
      editor.commands.undo();
    }
  },
});

export default WordCount;
