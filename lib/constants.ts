export const PRODUCTS = [
  {
    id: "seo-blog",
    title: "SEOブログ自動生成",
    description: "キーワードからSEO最適化されたブログ記事を自動生成。Sanity CMSへの自動公開まで一気通貫。",
    icon: "FileText",
    price: "月額 ¥50,000〜",
    href: "/demo/seo-blog",
    color: "#22c55e",
  },
  {
    id: "sns-posting",
    title: "SNS自動投稿",
    description: "1つのコンテンツを6プラットフォーム（X, YouTube, Instagram, Threads, TikTok, Note）に同時投稿。",
    icon: "Share2",
    price: "月額 ¥30,000〜",
    href: "/demo/sns-posting",
    color: "#3b82f6",
  },
  {
    id: "invoice-ocr",
    title: "請求書OCR処理",
    description: "AI画像認識で請求書を自動読取。取引先・金額・品目を構造化データに変換し、会計ソフト連携。",
    icon: "ScanLine",
    price: "月額 ¥40,000〜",
    href: "/demo/invoice-ocr",
    color: "#f59e0b",
  },
  {
    id: "ai-support",
    title: "AIカスタマーサポート",
    description: "FAQデータベースを活用したAI自動応答。人間へのエスカレーション判定も自動化。",
    icon: "MessageSquare",
    price: "月額 ¥60,000〜",
    href: "/demo/ai-support",
    color: "#a855f7",
  },
] as const;

export const METRICS = [
  { label: "本番運用ワークフロー", value: "6", suffix: "件" },
  { label: "SNS同時投稿先", value: "6", suffix: "プラットフォーム" },
  { label: "月間自動処理", value: "500", suffix: "件以上" },
  { label: "コスト削減率", value: "80", suffix: "%" },
];

export const FAQ_DATA = [
  {
    id: 1,
    question: "返品・交換の手順を教えてください",
    answer: "商品到着後7日以内にお問い合わせフォームからご連絡ください。未使用・未開封の商品に限り、返品・交換を承ります。返送料はお客様負担となります。交換品は在庫確認後、3営業日以内に発送いたします。",
    category: "返品・交換",
  },
  {
    id: 2,
    question: "配送にはどれくらいかかりますか？",
    answer: "通常配送は注文確定後2〜4営業日でお届けします。お急ぎ便をご利用の場合は翌営業日にお届け可能です（一部地域を除く）。配送状況はマイページからリアルタイムで確認できます。",
    category: "配送",
  },
  {
    id: 3,
    question: "支払い方法は何がありますか？",
    answer: "クレジットカード（VISA, Mastercard, JCB, AMEX）、銀行振込、コンビニ払い、PayPay、Amazon Payに対応しています。法人のお客様には請求書払い（月末締め翌月末払い）もご利用いただけます。",
    category: "支払い",
  },
  {
    id: 4,
    question: "会員登録は必要ですか？",
    answer: "ゲスト購入も可能ですが、会員登録いただくと注文履歴の確認、お届け先の保存、ポイント付与などの特典がございます。登録は無料で、メールアドレスのみで完了します。",
    category: "アカウント",
  },
  {
    id: 5,
    question: "ポイントの有効期限はありますか？",
    answer: "ポイントの有効期限は最終利用日から1年間です。期間内に1ポイントでもご利用・獲得があれば、全ポイントの有効期限が延長されます。1ポイント＝1円としてお使いいただけます。",
    category: "ポイント",
  },
  {
    id: 6,
    question: "注文をキャンセルしたい",
    answer: "発送前の注文はマイページから即時キャンセルが可能です。発送後のキャンセルは返品扱いとなります。キャンセル後の返金は、元のお支払い方法に3〜5営業日で返金されます。",
    category: "注文管理",
  },
  {
    id: 7,
    question: "商品が届かない場合はどうすればいいですか？",
    answer: "配送予定日を過ぎても届かない場合は、まずマイページで配送状況をご確認ください。「配送中」のまま3日以上経過している場合は、お問い合わせフォームからご連絡ください。配送業者に調査を依頼いたします。",
    category: "配送",
  },
  {
    id: 8,
    question: "領収書は発行できますか？",
    answer: "はい、マイページの注文履歴から領収書のPDFをダウンロードいただけます。宛名の変更も可能です。法人向けの適格請求書（インボイス）にも対応しております。",
    category: "書類",
  },
  {
    id: 9,
    question: "商品の在庫状況を知りたい",
    answer: "各商品ページに在庫状況を表示しています。「在庫あり」は即日出荷可能、「残りわずか」は5個以下、「入荷待ち」は次回入荷予定日を表示しています。再入荷通知メールの登録も可能です。",
    category: "在庫",
  },
  {
    id: 10,
    question: "パスワードを忘れました",
    answer: "ログイン画面の「パスワードを忘れた方」からリセット用メールを送信できます。メール内のリンクから新しいパスワードを設定してください。リンクの有効期限は24時間です。",
    category: "アカウント",
  },
];

export const PLATFORMS = [
  { id: "x", name: "X (Twitter)", icon: "Twitter", maxLength: 280, color: "#000000" },
  { id: "youtube", name: "YouTube", icon: "Youtube", maxLength: 5000, color: "#FF0000" },
  { id: "instagram", name: "Instagram", icon: "Instagram", maxLength: 2200, color: "#E4405F" },
  { id: "threads", name: "Threads", icon: "AtSign", maxLength: 500, color: "#000000" },
  { id: "tiktok", name: "TikTok", icon: "Music", maxLength: 2200, color: "#010101" },
  { id: "note", name: "Note", icon: "BookOpen", maxLength: 10000, color: "#41C9B4" },
] as const;

export const NAV_ITEMS = [
  { label: "ホーム", href: "/", icon: "Home" },
  { label: "SEOブログ自動生成", href: "/demo/seo-blog", icon: "FileText" },
  { label: "SNS自動投稿", href: "/demo/sns-posting", icon: "Share2" },
  { label: "請求書OCR", href: "/demo/invoice-ocr", icon: "ScanLine" },
  { label: "AIサポート", href: "/demo/ai-support", icon: "MessageSquare" },
  { label: "お問い合わせ", href: "/contact", icon: "Mail" },
] as const;
