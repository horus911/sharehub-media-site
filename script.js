document.getElementById('media-upload').addEventListener('change', function (event) {
  const files = event.target.files;
  const library = document.getElementById('library');

  for (let file of files) {
    const container = document.createElement('div');
    container.className = 'media-item';

    const title = document.createElement('p');
    title.textContent = `📁 ${file.name}`;
    container.appendChild(title);

    const url = URL.createObjectURL(file);
    const type = file.type;

    if (type.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = url;
      container.appendChild(img);
    } else if (type.startsWith('video/')) {
      const video = document.createElement('video');
      video.src = url;
      video.controls = true;
      container.appendChild(video);
    } else if (type.startsWith('audio/')) {
      const audio = document.createElement('audio');
      audio.src = url;
      audio.controls = true;
      container.appendChild(audio);
    } else if (type.startsWith('text/')) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const pre = document.createElement('pre');
        pre.textContent = e.target.result;
        container.appendChild(pre);
      };
      reader.readAsText(file);
    } else {
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      link.textContent = "Download file";
      container.appendChild(link);
    }

    library.appendChild(container);
  }
});

document.getElementById('share-text').addEventListener('click', function () {
  const text = document.getElementById('text-input').value.trim();
  if (!text) return;

  const library = document.getElementById('library');
  const container = document.createElement('div');
  container.className = 'media-item';

  const title = document.createElement('p');
  title.textContent = "📝 Shared Text:";

  const pre = document.createElement('pre');
  pre.textContent = text;

  container.appendChild(title);
  container.appendChild(pre);
  library.appendChild(container);

  document.getElementById('text-input').value = '';
});
