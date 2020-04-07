/* global MenuBar, Editor, DlgFont: true */
var $app = $('#notepad-app');
var menubar = new MenuBar();
var editor = new Editor();
var $editor = editor.show();
$app.append($editor);
var dlgFont = new DlgFont(editor);
var $dlgFont = dlgFont.show();
$app.append($dlgFont);
$app.click(menubar.hideMenu.bind(menubar));
