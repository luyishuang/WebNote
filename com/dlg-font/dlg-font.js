function DlgFont (editor) {
  this.$editor = editor;
  this.$textarea = editor.$textarea;
  this.fonts = ['Agency FB', 'Algerian', 'Arial', 'Arial Rounded MT', 'Axure Handwriting', 'Bahnschrift', 'Baskerville Old Face', 'Bauhaus 93', 'Bell MT', 'Berlin Sans FB', 'Bernard MT', 'BlackAdder ITC'],
  this.styles = ['常规', '斜体', '粗体', '粗偏斜体'],
  this.sizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'];
  this.$selectBoxInput = [];
  this.$selectBoxList = [[], [], []];
  this.$sample_txt = $('<p class="sample-txt">AaBbYyZz</p>');
  this.nowFont = [0, 0, 0];
  this.newFont = [0, 0, 0];

  this.show = function () {
    var $notepad_dlg_font = $('<div class="notepad-dlg-mask notepad-dlg-font"></div>'),
        $dialogbox = $('<div class="dialogbox notepad-dlgbox"></div>'),
        $notepad_dlg_titlebar = $('<div class="notepad-dlg-titlebar"></div>'),
        $title = $('<div class="zititle">字体</div>'),
        $close_btn = $('<div class="close-btn" title="关闭">✖</div>'),
        $main = $('<div class="main notepad-dlg-main"></div>'),
        $selectBox = $('<div class="notepad-dlg-select"></div>'),
        $sample = $('<fieldset class="sample"></fieldset>'),
        $script = $('<div class="script"></div>'),
        $select = $('<select></select>'),
        $btn_ok = $('<input class="btn-ok" type="button" value="确定">'),
        $btn_cancel = $('<input class="btn-cancel" type="button" value="取消">'),
        $sample_txt = this.$sample_txt,
        dlgTitle = [
          {
            title: '字体(F):',
            list: this.fonts,
            value: 2
          },
          {
            title: '字形(Y):',
            list: this.styles,
            value: 0
          },
          {
            title: '大小(S):',
            list: this.sizes,
            value: 6
          }
        ];

    $sample.append($('<legend>示例</legend>'));
    $sample.append($sample_txt);
    $script.append($('<span>脚本(R):</span><br>'));
    $select.append($('<option value="西欧语言">西欧语言</option>'));
    $select.append($('<option value="中文 GB2312">中文 GB2312</option>'));
    $script.append($select);

    $main.append($selectBox);
    $main.append($sample);
    $main.append($script);
    $main.append($btn_ok);
    $main.append($btn_cancel);

    $notepad_dlg_titlebar.mousedown(function (md) {
      var top = $dialogbox.position().top,
          left = $dialogbox.position().left;
      if (md.button == 0) {
        $notepad_dlg_font.mousemove(function (mm) {
          var cssleft = mm.pageX - md.pageX + left + 'px';
          var csstop = mm.pageY - md.pageY + top + 'px';
          $dialogbox.css('left', cssleft);
          $dialogbox.css('top', csstop);
        });
        $notepad_dlg_font.mouseup(function () {
          $notepad_dlg_font.off('mousemove');
          $notepad_dlg_font.off('mouseup');
        });
      }
    });

    $dialogbox.append($notepad_dlg_titlebar);

    $close_btn.click(this.closefontbox.bind(this));
    $notepad_dlg_titlebar.append($title);
    $notepad_dlg_titlebar.append($close_btn);

    for (var i = 0; i < dlgTitle.length; i ++) {
      var $selectTitle = $("<span>" + dlgTitle[i].title + "</span>"),
          $selectInput = $("<input class='zibox' type='text'>"),
          $selectList = $("<ul class='ullist'></ul>");
      for (var j = 0; j < dlgTitle[i].list.length; j ++) {
        var list = dlgTitle[i].list[j],
            $list = $("<li class='list'>" + list + "</li>");
        if (i == 0) {
          $list.css('font-family', list);
        }
        else if (i == 1) {
          this.changeZi($list, j);
        }
        $list.click(this.selectLi.bind(this, i, j));
        this.$selectBoxList[i].push($list);
        $selectList.append($list);
      }
      this.$selectBoxInput.push($selectInput);
      this.selectLi(i, dlgTitle[i].value);
      $selectBox.append($selectTitle);
      $selectBox.append($selectInput);
      $selectBox.append($selectList);
    }

    this.ok();

    $btn_ok.click(function () {
      this.ok();
      this.closefontbox();
    }.bind(this));
    
    $btn_cancel.click(this.closefontbox.bind(this));

    $dialogbox.append($main);
    $notepad_dlg_font.append($dialogbox);
    this.$notepad_dlg_font = $notepad_dlg_font;
    return $notepad_dlg_font;
  };

  this.openfontbox = function () {
    this.$notepad_dlg_font.addClass('show');
  };
  
  this.closefontbox = function () {
    this.$notepad_dlg_font.removeClass('show');
  };

  this.ok = function () {
    this.nowFont = this.newFont;
    this.$textarea.css('font-family', this.fonts[this.newFont[0]]);
    this.changeZi(this.$textarea, this.newFont[1]);
    this.$textarea.css('font-size', this.sizes[this.newFont[2]] + 'px');
  };

  this.changeZi = function (dui, i) {
    if (i == 0) {
      dui.css('font-style', 'normal');
      dui.css('font-weight', 'normal');
    }
    else if (i == 1) {
      dui.css('font-style', 'italic');
      dui.css('font-weight', 'normal');
    }
    else if (i == 2) {
      dui.css('font-style', 'normal');
      dui.css('font-weight', 'bold');
    }
    else if (i == 3) {
      dui.css('font-style', 'italic');
      dui.css('font-weight', 'bold');
    }
  };

  this.selectLi = function (i, j) {
    for (var m = 0; m < this.$selectBoxList[i].length; m ++) {
      if (m == j) {
        this.$selectBoxList[i][m].addClass('selected');
      }
      else {
        this.$selectBoxList[i][m].removeClass('selected');
      }
    }
    this.newFont[i] = j;
    if (i == 0) {
      this.$selectBoxInput[i].val(this.fonts[j]);
      this.$sample_txt.css('font-family', this.fonts[j]);
    }
    else if (i == 1) {
      this.$selectBoxInput[i].val(this.styles[j]);
      this.changeZi(this.$sample_txt, j);
    }
    else if (i == 2) {
      this.$selectBoxInput[i].val(this.sizes[j]);
      this.$sample_txt.css('font-size', this.sizes[j] + 'px');
    }
  };
}
