(function (a, b) {
  let isTemplate = a.getElementById('isTemplate'),
    ratio = a.querySelector('select[name=ratio]'),
    css = a.getElementById('css'),
    html = a.getElementById('html'),
    button = a.getElementById('createImage'),
    isShadow = isTemplate.attachShadow({
      mode: 'open'
    }),
    template = a.createElement('template'),
    options = {
      indent_size: 2,
      space_in_empty_paren: true,
      extra_liners: ['img']
    },
    timeout;

  if (ratio && css && html && isTemplate) {
    [ratio, css, html].forEach(item => {
      let type = ratio == item ? 'change' : 'keyup';

      css == item && (css.value = '.xx,h1,p{margin:0}.xx{overflow:hidden;background-image:url("./assets/image/bg.png");background-size:cover;position:relative;height:100%}.container img{width:100%;height:auto;box-shadow:0 0 15px 0 rgba(0,0,0,.87);position:relative}.container{position:absolute;left:5%;right:5%;top:40%;display:flex}.img-center,.img3,.img4,.img5{margin-left:-256px}.title-container{font-family:Righteous,cursive;text-align:center;color:#fff;padding:10px;width:500px;font-size:40px;margin:0 auto}.v{color:#feb9dd}');
      html == item && (html.value = '<div class="xx"><div class="title-container"><h1>HexaNime<span class="v">V3</span></h1><p>Template Anime Blogger</p></div><div class="container"><img class="img2" src="./assets/image/2.png"> <img class="img-center" src="./assets/image/1.png"> <img class="img3" src="./assets/image/3.png"> <img class="img4" src="./assets/image/4.png"> <img class="img4" src="./assets/image/5.png"></div></div>');
      item == css && (css.value = css_beautify(css.value, options));
      item == html && (html.value = html_beautify(html.value, options));

      item && item.addEventListener(type, () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          let r = ratio.value,
            c = '<style>.embed-holder{position:relative;z-index:1;overflow:hidden}.pembed{padding-top:' + r + ';position:relative;max-width:100%;height:0;}.pembed-content{z-index: 102;position: absolute;width: 100% !important;height: 100% !important;top: 0;left: 0;margin: 0;padding: 0}' + css.value + '</style>',
            h = '<div class="embed-holder"><div class="pembed"><div class="pembed-content">' + html.value + '</div></div></div>';
          template.innerHTML = c + h;
          isShadow.innerHTML = '';
          isShadow.appendChild(template.content);

          item == css && (css.value = css_beautify(css.value, options));
          item == html && (html.value = html_beautify(html.value, options));
        }, 1000);
      })
      type == 'change' && item.dispatchEvent(new Event(type));
    })
  }

  button && button.addEventListener('click', () => {
    button.innerText = 'Loading...'
    html2canvas(isTemplate)
      .then(canvas => {
        canvas.style.display = 'none'
        document.body.appendChild(canvas)
        return canvas
      })
      .then(canvas => {
        const image = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.setAttribute('target', '_blank');
        a.setAttribute('href', image);
        a.click();
        a.setAttribute('download', 'template-image.png');
        a.click();
        a.remove();
        canvas.remove();
        button.innerText = 'Confirm';
      })
  });

})(document, window);