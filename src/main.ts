import './style.css';

const app = document.querySelector('#app');

if (!app) {
	throw new Error('No app');
}

const iframeEl = document.querySelector('iframe');
const textareaEl = document.querySelector('textarea');

app.innerHTML = `
<div class="container">
    <div class="editor">
      <textarea>I am a textarea</textarea>
    </div>
    <div class="preview">
      <iframe src="loading.html"></iframe>
    </div>
  </div>
`;
