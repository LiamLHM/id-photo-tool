const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('download');
let img = new Image();

upload.addEventListener('change', function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function(evt) {
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      // 这里可以做简单滤镜处理，例如灰度：
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i+1] + data[i+2]) / 3;
        data[i] = avg;     // 红
        data[i+1] = avg;   // 绿
        data[i+2] = avg;   // 蓝
      }
      ctx.putImageData(imageData, 0, 0);
    };
    img.src = evt.target.result;
  };
  reader.readAsDataURL(file);
});

downloadBtn.addEventListener('click', function() {
  const link = document.createElement('a');
  link.download = 'processed.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
