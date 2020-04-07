function Editor () {
  this.$editor = $('<div class="notepad-editor"></div>');
  this.$textarea = $('<textarea spellcheck="false" auto-size="none" wrap="off"></textarea>');

  this.show = function () {
    this.$editor.append(this.$textarea);
    return this.$editor;
  };
}