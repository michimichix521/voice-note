# VoiceNote

A focused, browser-based voice-to-text tool for capturing spoken words as text in real time.

**Try it now:** [Open VoiceNote](https://michimichix521.github.io/voice-note/)

VoiceNote starts transcribing with one click. It requires no account or installation, and gives you a clean workspace where you can review, copy, or clear the recognized text.

### Features

- Real-time speech recognition in Japanese and English
- Japanese and English interface, selected automatically from your browser language
- Dark mode by default, with a light-mode option
- Live interim results while you speak
- Copy and clear actions for the completed transcript
- Character count and automatic scrolling for longer text
- Start or stop recognition with the microphone button or `Space` key
- Saved interface language, recognition language, and theme preferences

### Using VoiceNote

1. Open VoiceNote in the latest version of Chrome or Edge.
2. Choose the recognition language you want to use.
3. Select the microphone button and allow microphone access.
4. Start speaking. Recognized text appears in the transcript panel in real time.
5. Copy the completed transcript or clear it when you are finished.

The interface language and theme can be changed at any time from the controls in the header.

### Privacy

VoiceNote does not record or store your audio or transcript, and does not send either to a VoiceNote server. Audio is processed by your browser's speech-recognition provider.

Only these preferences are stored in your browser's `localStorage`:

- Interface language
- Recognition language
- Dark or light theme

Audio and transcripts are not stored in `localStorage`.

### Browser support

VoiceNote uses the Web Speech API. The latest version of Google Chrome or Microsoft Edge is recommended. Recognition behavior and available languages may vary by browser and operating system.

---

話した言葉をリアルタイムでテキストに変換する、シンプルなブラウザツールです。

**今すぐ使う：** [VoiceNoteを開く](https://michimichix521.github.io/voice-note/)

VoiceNoteは、ワンクリックで音声認識を開始できます。アカウント登録やインストールは不要です。認識したテキストは、見やすい画面で確認・コピー・クリアできます。

### 主な機能

- 日本語と英語のリアルタイム音声認識
- ブラウザの言語に合わせて初期表示される日本語／英語UI
- ダークモードを標準としたライト／ダーク切り替え
- 発話中の認識結果をリアルタイム表示
- 確定したテキストのコピーとクリア
- 文字数表示と、長いテキストの自動スクロール
- マイクボタンまたは`Space`キーによる開始／停止
- 表示言語、認識言語、テーマ設定の保存

### 使い方

1. 最新版のChromeまたはEdgeでVoiceNoteを開きます。
2. 使用する音声認識言語を選択します。
3. マイクボタンを押し、マイクの利用を許可します。
4. 話し始めると、認識した内容がテキスト欄へリアルタイムで表示されます。
5. 必要に応じて、確定したテキストをコピーまたはクリアします。

表示言語とテーマは、ヘッダーの操作ボタンからいつでも変更できます。

### プライバシー

VoiceNoteは、音声や認識テキストを録音・保存したり、VoiceNoteのサーバーへ送信したりしません。音声はブラウザの音声認識サービスで処理されます。

ブラウザの`localStorage`に保存されるのは、次の設定のみです。

- UIの表示言語
- 音声認識言語
- ダーク／ライトテーマ

音声や認識テキストは`localStorage`に保存されません。

### 対応ブラウザ

VoiceNoteはWeb Speech APIを使用しています。最新版のGoogle ChromeまたはMicrosoft Edgeを推奨します。ブラウザやOSによって、音声認識の動作や利用できる言語が異なる場合があります。
