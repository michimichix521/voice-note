const recordButton = document.querySelector('#recordButton');
const statusText = document.querySelector('#statusText');
const transcript = document.querySelector('#transcript');
const emptyState = document.querySelector('#emptyState');
const waveform = document.querySelector('#waveform');
const copyButton = document.querySelector('#copyButton');
const clearButton = document.querySelector('#clearButton');
const charCount = document.querySelector('#charCount');
const languageSelect = document.querySelector('#languageSelect');
const uiLanguageSelect = document.querySelector('#uiLanguageSelect');
const themeToggle = document.querySelector('#themeToggle');
const supportMessage = document.querySelector('#supportMessage');

const translations = {
  en: {
    pageTitle: 'VoiceNote | Turn Speech into Text', privacyShort: 'No recordings or transcripts are stored by VoiceNote', uiLanguage: 'Display', uiLanguageAria: 'Display language',
    eyebrow: 'VOICE TO TEXT', intro: 'Speak into your microphone.<br>Your words will appear as text in real time.',
    privacy: '<strong>Built with your privacy in mind.</strong> VoiceNote only displays the recognized text and does not record, store, or send your audio or transcript to its own servers. Audio is processed by your browser\'s speech-recognition provider.',
    recordingLabel: 'RECORDING', voiceInput: 'Voice Input', recognitionLanguage: 'Language', japanese: 'Japanese', english: 'English', startSpeaking: 'Click to start speaking', listening: 'Listening… Start speaking',
    shortcut: 'Press <kbd>Space</kbd> to start or stop', transcriptLabel: 'TRANSCRIPT', transcriptTitle: 'Transcript', clear: 'Clear', emptyTranscript: 'Your transcript will<br>appear here', characters: 'characters', githubSource: 'Source on GitHub',
    startAria: 'Start speech recognition', stopAria: 'Stop speech recognition', recognitionLanguageAria: 'Recognition language', workspaceAria: 'Speech recognition workspace', privacyAria: 'Privacy information', copyAria: 'Copy transcript', copyTitle: 'Copy',
    unsupported: 'Speech recognition is not supported in this browser', tryBrowser: 'Please try the latest version of Chrome or Edge.', micDenied: 'Microphone access is not allowed. Check your browser settings.', noSpeech: 'No speech was detected. Please try again.', recognitionError: 'An error occurred during speech recognition.', micUnavailable: 'The selected microphone is unavailable. Check its connection and permissions.', copied: 'Transcript copied', copyFailed: 'Could not copy the transcript', switchToLight: 'Switch to light mode', switchToDark: 'Switch to dark mode'
  },
  ja: {
    pageTitle: 'VoiceNote | 音声をテキストに', privacyShort: '録音やテキストはVoiceNoteに保存されません', uiLanguage: '表示言語', uiLanguageAria: '表示言語',
    eyebrow: '音声をテキストに', intro: 'マイクに向かって話してください。<br>あなたの言葉をリアルタイムで文字にします。',
    privacy: '<strong>プライバシーに配慮した設計です。</strong> VoiceNoteは認識したテキストを表示するだけで、音声やテキストを録音・保存したり、独自のサーバーへ送信したりしません。音声はブラウザの音声認識サービスで処理されます。',
    recordingLabel: '音声認識', voiceInput: '音声入力', recognitionLanguage: '認識言語', japanese: '日本語', english: '英語', startSpeaking: 'クリックして話し始める', listening: '聞いています… 話しかけてください',
    shortcut: '<kbd>Space</kbd> キーでも開始・停止できます', transcriptLabel: '認識結果', transcriptTitle: 'テキスト', clear: 'クリア', emptyTranscript: '認識したテキストが<br>ここに表示されます', characters: '文字', githubSource: 'GitHubでソースを見る',
    startAria: '音声認識を開始', stopAria: '音声認識を停止', recognitionLanguageAria: '認識言語', workspaceAria: '音声認識ワークスペース', privacyAria: 'プライバシーについて', copyAria: 'テキストをコピー', copyTitle: 'コピー',
    unsupported: 'このブラウザは音声認識に対応していません', tryBrowser: 'Chrome または Edge の最新版でお試しください。', micDenied: 'マイクの使用が許可されていません。ブラウザの設定をご確認ください。', noSpeech: '音声を検出できませんでした。もう一度お試しください。', recognitionError: '音声認識でエラーが発生しました。', micUnavailable: '選択したマイクを利用できません。接続と権限をご確認ください。', copied: 'テキストをコピーしました', copyFailed: 'コピーできませんでした', switchToLight: 'ライトモードに切り替える', switchToDark: 'ダークモードに切り替える'
  }
};

let savedUiLanguage;
try { savedUiLanguage = localStorage.getItem('voicenote-ui-language'); } catch { savedUiLanguage = null; }
const browserPrefersJapanese = (navigator.languages || [navigator.language]).some((language) => language?.toLowerCase().startsWith('ja'));
let uiLanguage = savedUiLanguage === 'ja' || savedUiLanguage === 'en'
  ? savedUiLanguage
  : browserPrefersJapanese ? 'ja' : 'en';
let savedTheme;
try { savedTheme = localStorage.getItem('voicenote-theme'); } catch { savedTheme = null; }
let theme = savedTheme === 'light' ? 'light' : 'dark';
let savedRecognitionLanguage;
try { savedRecognitionLanguage = localStorage.getItem('voicenote-recognition-language'); } catch { savedRecognitionLanguage = null; }
if (['ja-JP', 'en-US'].includes(savedRecognitionLanguage)) {
  languageSelect.value = savedRecognitionLanguage;
}
const t = (key) => translations[uiLanguage][key];

function updateThemeButton() {
  const label = theme === 'dark' ? t('switchToLight') : t('switchToDark');
  themeToggle.setAttribute('aria-label', label);
  themeToggle.title = label;
  themeToggle.querySelector('.theme-icon').textContent = theme === 'dark' ? '☀' : '☾';
}

function applyTheme(nextTheme) {
  theme = nextTheme;
  document.body.dataset.theme = theme;
  try { localStorage.setItem('voicenote-theme', theme); } catch { /* Preference persistence is optional. */ }
  updateThemeButton();
}

function applyUiLanguage(language) {
  uiLanguage = language;
  try { localStorage.setItem('voicenote-ui-language', language); } catch { /* Preference persistence is optional. */ }
  document.documentElement.lang = language;
  document.title = t('pageTitle');
  document.querySelectorAll('[data-i18n]').forEach((element) => { element.textContent = t(element.dataset.i18n); });
  document.querySelectorAll('[data-i18n-html]').forEach((element) => { element.innerHTML = t(element.dataset.i18nHtml); });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => { element.setAttribute('aria-label', t(element.dataset.i18nAriaLabel)); });
  document.querySelector('.workspace').setAttribute('aria-label', t('workspaceAria'));
  document.querySelector('.privacy-note').setAttribute('aria-label', t('privacyAria'));
  languageSelect.setAttribute('aria-label', t('recognitionLanguageAria'));
  copyButton.setAttribute('aria-label', t('copyAria'));
  copyButton.title = t('copyTitle');
  recordButton.setAttribute('aria-label', isRecording ? t('stopAria') : t('startAria'));
  statusText.textContent = !SpeechRecognition ? t('unsupported') : isRecording ? t('listening') : t('startSpeaking');
  supportMessage.textContent = supportMessageKey ? t(supportMessageKey) : '';
  uiLanguageSelect.value = language;
  updateThemeButton();
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
let finalText = '';
let isRecording = false;
let supportMessageKey = '';

function setSupportMessage(key = '') {
  supportMessageKey = key;
  supportMessage.textContent = key ? t(key) : '';
}

function updateTranscript(interimText = '') {
  const hasText = finalText || interimText;
  emptyState.hidden = Boolean(hasText);
  transcript.textContent = '';

  if (!hasText) {
    transcript.append(emptyState);
  } else {
    const finalNode = document.createTextNode(finalText);
    transcript.append(finalNode);
    if (interimText) {
      const interimNode = document.createElement('span');
      interimNode.className = 'interim';
      interimNode.textContent = interimText;
      transcript.append(interimNode);
    }
  }

  charCount.textContent = finalText.length + interimText.length;
  copyButton.disabled = !finalText;
  clearButton.disabled = !finalText && !interimText;
  requestAnimationFrame(() => {
    transcript.classList.toggle('is-scrollable', transcript.scrollHeight > transcript.clientHeight + 1);
    transcript.scrollTop = transcript.scrollHeight;
  });
}

window.addEventListener('resize', () => {
  transcript.classList.toggle('is-scrollable', transcript.scrollHeight > transcript.clientHeight + 1);
});

function setRecordingState(recording) {
  isRecording = recording;
  recordButton.classList.toggle('is-recording', recording);
  waveform.classList.toggle('is-active', recording);
  recordButton.setAttribute('aria-label', recording ? t('stopAria') : t('startAria'));
  statusText.textContent = recording ? t('listening') : t('startSpeaking');
}

uiLanguageSelect.addEventListener('change', () => applyUiLanguage(uiLanguageSelect.value));
themeToggle.addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark'));
applyTheme(theme);
applyUiLanguage(uiLanguage);

if (!SpeechRecognition) {
  recordButton.disabled = true;
  statusText.textContent = t('unsupported');
  setSupportMessage('tryBrowser');
} else {
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = languageSelect.value;

  recognition.onstart = () => setRecordingState(true);
  recognition.onend = () => setRecordingState(false);
  recognition.onerror = (event) => {
    setRecordingState(false);
    if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
      setSupportMessage('micDenied');
    } else if (event.error === 'no-speech') {
      setSupportMessage('noSpeech');
    } else {
      setSupportMessage('recognitionError');
    }
  };
  recognition.onresult = (event) => {
    let interimText = '';
    for (let index = event.resultIndex; index < event.results.length; index += 1) {
      const result = event.results[index];
      if (result.isFinal) finalText += result[0].transcript;
      else interimText += result[0].transcript;
    }
    setSupportMessage();
    updateTranscript(interimText);
  };

  recordButton.addEventListener('click', async () => {
    if (isRecording) recognition.stop();
    else {
      try {
        if (navigator.mediaDevices?.getUserMedia) {
          const microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          microphoneStream.getTracks().forEach((track) => track.stop());
        }
        recognition.lang = languageSelect.value;
        recognition.start();
      } catch {
        setSupportMessage('micUnavailable');
      }
    }
  });

  languageSelect.addEventListener('change', () => {
    recognition.lang = languageSelect.value;
    try { localStorage.setItem('voicenote-recognition-language', languageSelect.value); } catch { /* Preference persistence is optional. */ }
    if (isRecording) {
      recognition.stop();
      setTimeout(() => recognition.start(), 100);
    }
  });
}

clearButton.addEventListener('click', () => {
  finalText = '';
  updateTranscript();
  setSupportMessage();
});

copyButton.addEventListener('click', async () => {
  if (!finalText) return;
  try {
    await navigator.clipboard.writeText(finalText);
    supportMessage.style.color = '#42a980';
    setSupportMessage('copied');
    setTimeout(() => { setSupportMessage(); supportMessage.style.color = ''; }, 1800);
  } catch {
    setSupportMessage('copyFailed');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.code !== 'Space' || event.target.matches('select, button')) return;
  event.preventDefault();
  recordButton.click();
});
