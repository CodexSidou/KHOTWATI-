import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  oneStepAtATime: string;

  // Navigation
  navDashboard: string;
  navChallenges: string;
  navTasks: string;
  navToolkit: string;
  navJournal: string;
  navCommunity: string;
  navAnalytics: string;
  navAchievements: string;
  navReminders: string;
  navProfile: string;
  navSettings: string;
  navHelp: string;
  navRules: string;
  navModeration: string;
  navPrivacy: string;
  navExportDelete: string;

  // Sync & Connection
  statusOnline: string;
  statusOffline: string;
  statusSyncing: string;
  statusLocalOnly: string;
  localFirstNotice: string;

  // Landing Page
  landingHeroTitle: string;
  landingHeroSubtitle: string;
  landingStartJourney: string;
  landingSignInRecovery: string;
  landingFeature1Title: string;
  landingFeature1Desc: string;
  landingFeature2Title: string;
  landingFeature2Desc: string;
  landingFeature3Title: string;
  landingFeature3Desc: string;
  landingFeature4Title: string;
  landingFeature4Desc: string;
  landingNoShameTitle: string;
  landingNoShameDesc: string;

  // Onboarding
  onboardingTitle: string;
  onboardingSubtitle: string;
  selectHabitCategory: string;
  habitSmoking: string;
  habitVaping: string;
  habitAlcohol: string;
  habitCannabis: string;
  habitOtherSubstances: string;
  habitGaming: string;
  habitSocialMedia: string;
  habitRepetitive: string;
  habitCustom: string;
  goalLabel: string;
  goalPlaceholder: string;
  durationLabel: string;
  duration7Days: string;
  duration14Days: string;
  duration30Days: string;
  duration60Days: string;
  duration90Days: string;
  dailyBaselineLabel: string;
  dailyBaselineHelp: string;
  costEstimateLabel: string;
  costEstimateHelp: string;
  onboardingStartBtn: string;
  onboardingBackBtn: string;

  // Dashboard
  currentChallenge: string;
  challengeDay: string;
  currentStreak: string;
  bestStreak: string;
  tasksCompletedToday: string;
  progressPercent: string;
  restartChallengeBtn: string;
  quickToolkitBtn: string;
  quickCommunityBtn: string;
  moneySaved: string;
  milestoneNext: string;
  noActiveChallenge: string;
  startNewChallenge: string;

  // Daily Tasks
  dailyTasksTitle: string;
  markComplete: string;
  undoComplete: string;
  addPersonalTask: string;
  taskCompletedSuccess: string;
  taskCustomTitle: string;
  taskCustomDesc: string;

  // Restart & Relapse
  restartModalTitle: string;
  restartModalSubtitle: string;
  restartReasonLabel: string;
  restartReasonPlaceholder: string;
  restartConfirmBtn: string;
  restartCancelBtn: string;
  restartNotice: string;

  // Difficult Moment Toolkit
  toolkitTitle: string;
  toolkitSubtitle: string;
  boxBreathingTitle: string;
  boxBreathingDesc: string;
  breathingInhale: string;
  breathingHold: string;
  breathingExhale: string;
  startBreathing: string;
  stopBreathing: string;
  delayTimerTitle: string;
  delayTimerDesc: string;
  timer5min: string;
  timer10min: string;
  timer15min: string;
  startTimer: string;
  pauseTimer: string;
  resetTimer: string;
  groundingTitle: string;
  groundingDesc: string;
  grounding5: string;
  grounding4: string;
  grounding3: string;
  grounding2: string;
  grounding1: string;
  distractionTitle: string;
  distraction1: string;
  distraction2: string;
  distraction3: string;
  distraction4: string;
  distraction5: string;
  emergencyHelplinesTitle: string;
  emergencyHelplinesDesc: string;
  medicalDisclaimerTitle: string;
  medicalDisclaimerText: string;

  // Private Journal
  journalTitle: string;
  journalSubtitle: string;
  journalNewEntry: string;
  journalTitleInput: string;
  journalContentInput: string;
  journalMoodLabel: string;
  journalMoodPeaceful: string;
  journalMoodCalm: string;
  journalMoodAnxious: string;
  journalMoodStruggling: string;
  journalMoodDetermined: string;
  journalIntensityLabel: string;
  journalTriggersLabel: string;
  journalTriggersPlaceholder: string;
  journalSaveBtn: string;
  journalDeleteBtn: string;
  journalDeleteConfirm: string;
  journalEmpty: string;
  journalPrivateNotice: string;

  // Real-Time Community Chat
  chatTitle: string;
  chatSubtitle: string;
  chatPublicOnlyBadge: string;
  chatNoDMsNotice: string;
  chatOnlineUsers: string;
  chatMessagePlaceholder: string;
  chatSendBtn: string;
  chatReportBtn: string;
  chatEmpty: string;
  chatRateLimitWarning: string;
  chatConnecting: string;

  // Moderation
  modDashboardTitle: string;
  modPendingReports: string;
  modDeleteMessageBtn: string;
  modBanUserBtn: string;
  modReportReason: string;
  modReportSubmit: string;
  modReportSuccess: string;

  // Settings & Account
  settingsTitle: string;
  themeToggle: string;
  themeDark: string;
  themeLight: string;
  languageSelect: string;
  accountRecoveryTitle: string;
  generateRecoveryKeyBtn: string;
  recoveryKeySavedNotice: string;
  enterRecoveryKeyPlaceholder: string;
  recoverAccountBtn: string;
  dataExportBtn: string;
  deleteAccountBtn: string;
  deleteAccountConfirm: string;
  deleteAccountWarning: string;

  // Common UI
  save: string;
  cancel: string;
  close: string;
  loading: string;
  error: string;
  success: string;
  days: string;
}

export const translations: Record<Language, Translations> = {
  ar: {
    appName: 'خطوتي | KHOTWATI',
    tagline: 'خطوة بخطوة نحو التعافي والحرية',
    oneStepAtATime: 'خطوة بخطوة',

    navDashboard: 'لوحة التحكم',
    navChallenges: 'التحديات',
    navTasks: 'مهام اليوم',
    navToolkit: 'صندوق الطوارئ',
    navJournal: 'يومياتي الخاصة',
    navCommunity: 'المجتمع العام',
    navAnalytics: 'الإحصائيات',
    navAchievements: 'الإنجازات',
    navReminders: 'التنبيهات',
    navProfile: 'الملف الشخصي',
    navSettings: 'الإعدادات',
    navHelp: 'دليل التعافي',
    navRules: 'قوانين المجتمع',
    navModeration: 'لوحة الإشراف',
    navPrivacy: 'الخصوصية والأمان',
    navExportDelete: 'إدارة وتصدير البيانات',

    statusOnline: 'متصل بالخادم',
    statusOffline: 'وضع غير متصل (حفظ محلي)',
    statusSyncing: 'جارِ المزامنة...',
    statusLocalOnly: 'تخزين محلي مؤمن',
    localFirstNotice: 'تطبيق خطوتي يعمل تلقائياً بدون إنترنت لحماية خصوصيتك واستمرارية تعافيك.',

    landingHeroTitle: 'تخلص من التدخين والعادات المؤذية.. بكرامة وخطوة بخطوة',
    landingHeroSubtitle: 'منصة تعافي آمنة ومجهولة الهوية بالكامل. تحديات يومية مخصصة، أدوات فورية لمقاومة الرغبة، ومجتمع داعم خالٍ من الأحكام المسبقة.',
    landingStartJourney: 'ابدأ رحلتي الآن مجاناً',
    landingSignInRecovery: 'استعادة حساب سابق عبر المفتاح السري',
    landingFeature1Title: 'هوية مجهولة وخصوصية تامة',
    landingFeature1Desc: 'لا نطلب اسمك الحقيقي، ولا رقم هاتفك، ولا بريدك الإلكتروني. تعافَ بأمان وراحة بال.',
    landingFeature2Title: 'نظام إعادة المحاولة الرحيم',
    landingFeature2Desc: 'الانتكاسة ليست نهاية المطاف. أعد التحدي بضغطة زر واحدة دون أن تفقد تاريخ إنجازاتك أو كرامتك.',
    landingFeature3Title: 'أدوات فورية للحظات الصعبة',
    landingFeature3Desc: 'تمارين تنفس الصندوق الموجهة، مؤقت تأخير الرغبة الملحة، وتمارين التأريض الحسي لتجاوز الأوقات الحرجة.',
    landingFeature4Title: 'مجتمع عام داعم بلا رسائل خاصة',
    landingFeature4Desc: 'غرفة دعم عامة ومراقبة فقط لحمايتك من الاستغلال والرسائل المزعجة. الجميع يساند الجميع.',
    landingNoShameTitle: 'التعافي بلا شعور بالذنب',
    landingNoShameDesc: 'نحن نؤمن أن التقدم الحقيقي يبنى بالاستمرار واللطف مع الذات وليس باللوم والضغط النفسي.',

    onboardingTitle: 'أهلاً بك في خطوتك الأولى',
    onboardingSubtitle: 'اختر العادة أو السلوك الذي تود التحرر منه لبناء برنامجك الشخصي:',
    selectHabitCategory: 'اختر العادة المستهدفة:',
    habitSmoking: 'تدخين السجائر',
    habitVaping: 'الفيب والنيكوتين الإلكتروني',
    habitAlcohol: 'الكحول والمشروبات الروحية',
    habitCannabis: 'القنب والحشيش',
    habitOtherSubstances: 'مواد ومهدئات أخرى',
    habitGaming: 'إدمان ألعاب الفيديو',
    habitSocialMedia: 'إدمان شبكات التواصل والشاشات',
    habitRepetitive: 'عادات قهرية متكررة',
    habitCustom: 'عادة مخصصة أخرى',
    goalLabel: 'ما هو هدفك المنشود؟',
    goalPlaceholder: 'مثال: التوقف التام، أو تقليص الاستهلاك إلى النصف...',
    durationLabel: 'مدة التحدي المبدئي:',
    duration7Days: 'تحدي 7 أيام (بداية سريعة)',
    duration14Days: 'تحدي 14 يوماً (بناء الزخم)',
    duration30Days: 'تحدي 30 يوماً (إعادة تشكيل المسار)',
    duration60Days: 'تحدي 60 يوماً (تثبيت العادات)',
    duration90Days: 'تحدي 90 يوماً (تحول جذري)',
    dailyBaselineLabel: 'الاستهلاك اليومي التقريبي (اختياري):',
    dailyBaselineHelp: 'مثال: عدد السجائر، أو عدد الساعات التي تقضيها يومياً.',
    costEstimateLabel: 'التكلفة المالية اليومية التقريبية (اختياري):',
    costEstimateHelp: 'لحساب المبالغ المالية التي ستوفرها خلال مسيرة تعافيك.',
    onboardingStartBtn: 'إنشاء خطتي الشخصية والبدء',
    onboardingBackBtn: 'السابق',

    currentChallenge: 'التحدي الحالي',
    challengeDay: 'اليوم',
    currentStreak: 'السلسلة الحالية',
    bestStreak: 'أفضل سلسلة مستمرة',
    tasksCompletedToday: 'المهام المنجزة اليوم',
    progressPercent: 'نسبة التقدم',
    restartChallengeBtn: 'إعادة ضبط التحدي',
    quickToolkitBtn: 'أواجه رغبة ملحة الآن!',
    quickCommunityBtn: 'دردشة المجتمع الداعم',
    moneySaved: 'المال الموفر التقديري',
    milestoneNext: 'المحطة القادمة',
    noActiveChallenge: 'لا يوجد تحدٍ نشط حالياً.',
    startNewChallenge: 'ابدأ تحدياً جديداً',

    dailyTasksTitle: 'مهامك لليوم',
    markComplete: 'إتمام المهمة',
    undoComplete: 'تراجع',
    addPersonalTask: 'إضافة مهمة شخصية',
    taskCompletedSuccess: 'أحسنت! خطوة أخرى للأمام.',
    taskCustomTitle: 'مهمة مخصصة',
    taskCustomDesc: 'مهمة أضفتها بنفسك لتعزيز يومك.',

    restartModalTitle: 'إعادة بدء التحدي من اليوم الأول',
    restartModalSubtitle: 'التعافي ليس مساراً مستقيماً، والبداية من جديد دليل على قوتك وشجاعتك.',
    restartReasonLabel: 'ما الذي حدث أو ما هو سبب البداية الجديدة؟ (اختياري وسري بالكامل):',
    restartReasonPlaceholder: 'مثال: واجهت ضغطاً شديداً في العمل.. تعلمت درساً جديداً وسأواصل.',
    restartConfirmBtn: 'تأكيد البداية الجديدة بكل أمل',
    restartCancelBtn: 'إلغاء والعودة',
    restartNotice: 'سيتم حفظ محاولتك السابقة بالكامل في سجلك التاريخي للحفاظ على كل ما بذلته من جهد.',

    toolkitTitle: 'صندوق الطوارئ ولحظات الضعف',
    toolkitSubtitle: 'أدوات فورية معتمدة سلوكياً لمساعدتك على تجاوز الرغبة الملحة حتى تهدأ عاصفتها.',
    boxBreathingTitle: 'تمرين تنفس الصندوق الموجه (4-4-4-4)',
    boxBreathingDesc: 'يهدئ الجهاز العصبي فوراً ويخفض مستويات التوتر المحفز للإدمان.',
    breathingInhale: 'شهيق عميق (4 ثوانٍ)...',
    breathingHold: 'احبس نفسك بهدوء (4 ثوانٍ)...',
    breathingExhale: 'زفير بطيء ومريح (4 ثوانٍ)...',
    startBreathing: 'بدء تمرين التنفس',
    stopBreathing: 'إيقاف التمرين',
    delayTimerTitle: 'مؤقت تأخير الرغبة الملحة',
    delayTimerDesc: 'تستمر موجة الرغبة الحادة عادة بين 5 إلى 15 دقيقة فقط ثم تنحسر تلقائياً.',
    timer5min: '5 دقائق',
    timer10min: '10 دقائق',
    timer15min: '15 دقيقة',
    startTimer: 'بدء العد التنازلي',
    pauseTimer: 'إيقاف مؤقت',
    resetTimer: 'إعادة ضبط',
    groundingTitle: 'تمرين التأريض الحسي (5-4-3-2-1)',
    groundingDesc: 'أعد تركيز عقلك للحظة الحالية لفصل الانتباه عن الرغبة الإدمانية:',
    grounding5: '5 أشياء يمكنك رؤيتها حولك الآن',
    grounding4: '4 أشياء يمكنك لمسها والشعور بملمسها',
    grounding3: '3 أصوات يمكنك سماعها بدقة',
    grounding2: 'شيئان يمكنك شمهما في محيطك',
    grounding1: 'شيء واحد يمكنك تذوقه أو تشعر بالامتنان له',
    distractionTitle: 'أنشطة بديلة سريعة لتشتيت الانتباه',
    distraction1: 'اشرب كأساً كبيراً من الماء البارد بتمهل.',
    distraction2: 'اخرج في نزهة مشي سريعة لمدة 10 دقائق.',
    distraction3: 'اغسل وجهك بالماء البارد فوراً.',
    distraction4: 'قم بـ 15 تمرين ضغط أو قفز لتفريغ التوتر.',
    distraction5: 'اتصل بصديق مقرب وتحدث في موضوع عشوائي.',
    emergencyHelplinesTitle: 'خطوط الدعم والمساعدة الطارئة',
    emergencyHelplinesDesc: 'إذا كنت تشعر بضائقة حادة، اتصل فوراً بالمراكز الصحية المتخصصة المعتمدة.',
    medicalDisclaimerTitle: 'إخلاء مسؤولية طبي هام للغاية',
    medicalDisclaimerText: 'تطبيق خطوتي أداة مساعدة سلوكية وليست بديلاً عن الاستشارة الطبية المتخصصة. الانسحاب المفاجئ من بعض المواد كالكحول والمهدئات الشديدة قد يتطلب إشرافاً طبياً عاجلاً لتجنب المضاعفات الخطيرة. في حالات الطوارئ الحادة، يرجى التوجه لأقرب مركز طوارئ فوراً.',

    journalTitle: 'يومياتي الخاصة والمحمية',
    journalSubtitle: 'مساحتك الآمنة لتدوين أفكارك، مشاعرك، والمحفزات دون أن يطلع عليها أي شخص آخر.',
    journalNewEntry: 'كتابة تدوينة جديدة',
    journalTitleInput: 'عنوان التدوينة...',
    journalContentInput: 'اكتب ما تشعر به بكل صدق وبدون رقابة ذاتية...',
    journalMoodLabel: 'حالتك المزاجية الآن:',
    journalMoodPeaceful: 'مطمئن',
    journalMoodCalm: 'هادئ',
    journalMoodAnxious: 'قلق',
    journalMoodStruggling: 'أعاني',
    journalMoodDetermined: 'عازم',
    journalIntensityLabel: 'شدة الرغبة الإدمانية (1 إلى 10):',
    journalTriggersLabel: 'المحفزات التي واجهتها (افصل بينها بفاصلة):',
    journalTriggersPlaceholder: 'مثال: توتر العمل، لقاء أصدقاء قدامى، وحدة، ملل...',
    journalSaveBtn: 'حفظ التدوينة في مذكرتي الخاصة',
    journalDeleteBtn: 'حذف',
    journalDeleteConfirm: 'هل أنت متأكد من حذف هذه التدوينة نهائياً؟',
    journalEmpty: 'لا توجد تدوينات بعد. ابدأ بكتابة أول فكرة اليوم!',
    journalPrivateNotice: 'تنبيه أمان: هذه اليوميات مشفرة ومحفوظة لحسابك فقط، ولن تظهر في الدردشة العامة إطلاقاً.',

    chatTitle: 'المجتمع العام الداعم',
    chatSubtitle: 'تبادل التشجيع والأمل مع إخوانك وأخواتك في رحلة التعافي.',
    chatPublicOnlyBadge: 'غرفة عامة فقط (لا توجد رسائل خاصة)',
    chatNoDMsNotice: 'من أجل سلامتك وخصوصيتك، منصة خطوتي تمنع الدردشات الثنائية والخاصة تماماً.',
    chatOnlineUsers: 'المتعافون المتصلون الآن:',
    chatMessagePlaceholder: 'اكتب رسالة تشجيعية أو شارك إنجازك اليومي (حد أقصى 500 حرف)...',
    chatSendBtn: 'إرسال',
    chatReportBtn: 'إبلاغ عن مخالفة',
    chatEmpty: 'كن أول من يكتب كلمة تشجيع اليوم!',
    chatRateLimitWarning: 'يرجى التمهل وتجنب إرسال الرسائل المتكررة بسرعة.',
    chatConnecting: 'جارِ الاتصال بغرفة المجتمع...',

    modDashboardTitle: 'لوحة المشرفين وسلامة المجتمع',
    modPendingReports: 'البلاغات المعلقة للرسائل المخالفة',
    modDeleteMessageBtn: 'حذف الرسالة',
    modBanUserBtn: 'حظر المستخدم نهائياً',
    modReportReason: 'سبب البلاغ (تنمر، مواد ممنوعة، إعلانات، سلوك مؤذٍ):',
    modReportSubmit: 'إرسال البلاغ لفريق الإشراف',
    modReportSuccess: 'تم استلام بلاغك وسيتعامل المشرفون معه بأعلى أولوية.',

    settingsTitle: 'إعدادات التطبيق والحساب',
    themeToggle: 'مظهر التطبيق:',
    themeDark: 'الوضع الليلي (الافتراضي)',
    themeLight: 'الوضع النهاري الفاتح',
    languageSelect: 'لغة التطبيق:',
    accountRecoveryTitle: 'حماية وتأمين استعادة الحساب',
    generateRecoveryKeyBtn: 'توليد مفتاح استعادة الحساب السري',
    recoveryKeySavedNotice: 'احتفظ بهذا المفتاح في مكان آمن. لا يمكن لأحد سواك استرجاع حسابك به!',
    enterRecoveryKeyPlaceholder: 'أدخل المفتاح المكون من 16 حرفاً...',
    recoverAccountBtn: 'استعادة الحساب',
    dataExportBtn: 'تصدير كامل بياناتي بصيغة JSON',
    deleteAccountBtn: 'حذف الحساب نهائياً مع كافة السجلات',
    deleteAccountConfirm: 'هل أنت متأكد من حذف حسابك وكافة سجلاتك الخاصة وتحدياتك نهائياً؟ هذا الإجراء لا يمكن التراجع عنه.',
    deleteAccountWarning: 'سيتم مسح مذكراتك، إحصائياتك، ومسار تحدياتك فوراً من الخادم والتخزين المحلي.',

    save: 'حفظ',
    cancel: 'إلغاء',
    close: 'إغلاق',
    loading: 'جارِ التحميل...',
    error: 'حدث خطأ، يرجى المحاولة مرة أخرى.',
    success: 'تمت العملية بنجاح.',
    days: 'أيام'
  },

  fr: {
    appName: 'KHOTWATI | خطوتي',
    tagline: 'Un pas à la fois vers la liberté et le rétablissement',
    oneStepAtATime: 'Un pas à la fois',

    navDashboard: 'Tableau de bord',
    navChallenges: 'Défis',
    navTasks: 'Tâches du jour',
    navToolkit: "Boîte d'urgence",
    navJournal: 'Journal intime',
    navCommunity: 'Communauté publique',
    navAnalytics: 'Statistiques',
    navAchievements: 'Succès',
    navReminders: 'Rappels',
    navProfile: 'Profil',
    navSettings: 'Paramètres',
    navHelp: 'Guide & Aide',
    navRules: 'Règles du groupe',
    navModeration: 'Modération',
    navPrivacy: 'Confidentialité',
    navExportDelete: 'Gestion des données',

    statusOnline: 'Connecté au serveur',
    statusOffline: 'Mode hors ligne (Sauvegarde locale)',
    statusSyncing: 'Synchronisation en cours...',
    statusLocalOnly: 'Stockage local sécurisé',
    localFirstNotice: 'Khotwati fonctionne localement sans internet pour préserver votre vie privée.',

    landingHeroTitle: 'Surmontez le tabac et les dépendances, sans honte et à votre rythme',
    landingHeroSubtitle: 'Plateforme anonyme de rétablissement. Défis progressifs, outils anti-envie immédiats et soutien communautaire bienveillant.',
    landingStartJourney: 'Commencer mon parcours',
    landingSignInRecovery: 'Récupérer un compte avec une clé secrète',
    landingFeature1Title: 'Anonymat absolu',
    landingFeature1Desc: 'Aucun nom réel, e-mail ou numéro requis. Progressez en toute sécurité.',
    landingFeature2Title: 'Redémarrage sans culpabilité',
    landingFeature2Desc: 'Une rechute fait partie du parcours. Recommencez sans perdre vos réussites passées.',
    landingFeature3Title: "Outils d'urgence immédiats",
    landingFeature3Desc: 'Respiration guidée, minuteur de temporisation et exercices sensoriels d’ancrage.',
    landingFeature4Title: 'Communauté publique sans MP',
    landingFeature4Desc: 'Aucun message privé direct pour vous protéger des abus. Entraide collective ouverte.',
    landingNoShameTitle: 'Bienveillance et régularité',
    landingNoShameDesc: 'Nous croyons que la guérison se forge par la compassion envers soi-même.',

    onboardingTitle: 'Bienvenue dans votre premier pas',
    onboardingSubtitle: 'Sélectionnez l’habitude que vous souhaitez surmonter :',
    selectHabitCategory: 'Habitude ciblée :',
    habitSmoking: 'Cigarettes et tabac',
    habitVaping: 'Vapotage et nicotine électronique',
    habitAlcohol: 'Alcool',
    habitCannabis: 'Cannabis',
    habitOtherSubstances: 'Autres substances',
    habitGaming: 'Jeux vidéo excessifs',
    habitSocialMedia: 'Réseaux sociaux et écrans',
    habitRepetitive: 'Habitudes répétitives indésirables',
    habitCustom: 'Autre habitude personnalisée',
    goalLabel: 'Quel est votre objectif ?',
    goalPlaceholder: 'Ex: Arrêt complet, réduction de 50%...',
    durationLabel: 'Durée du défi initial :',
    duration7Days: '7 jours (Démarrage rapide)',
    duration14Days: '14 jours (Prendre de l’élan)',
    duration30Days: '30 jours (Recâbler le cerveau)',
    duration60Days: '60 jours (Ancrer le changement)',
    duration90Days: '90 jours (Transformation durable)',
    dailyBaselineLabel: 'Consommation quotidienne actuelle (facultatif) :',
    dailyBaselineHelp: 'Ex: Nombre de cigarettes ou d’heures passées.',
    costEstimateLabel: 'Dépense financière quotidienne estimée (facultatif) :',
    costEstimateHelp: 'Pour calculer l’argent économisé au fil de vos progrès.',
    onboardingStartBtn: 'Créer mon plan et démarrer',
    onboardingBackBtn: 'Retour',

    currentChallenge: 'Défi en cours',
    challengeDay: 'Jour',
    currentStreak: 'Série actuelle',
    bestStreak: 'Meilleure série',
    tasksCompletedToday: 'Tâches accomplies aujourd’hui',
    progressPercent: 'Progression',
    restartChallengeBtn: 'Redémarrer le défi',
    quickToolkitBtn: 'J’ai une forte envie maintenant !',
    quickCommunityBtn: 'Tchat de la communauté',
    moneySaved: 'Économies estimées',
    milestoneNext: 'Prochaine étape',
    noActiveChallenge: 'Aucun défi actif pour le moment.',
    startNewChallenge: 'Démarrer un nouveau défi',

    dailyTasksTitle: 'Vos tâches du jour',
    markComplete: 'Valider la tâche',
    undoComplete: 'Annuler',
    addPersonalTask: 'Ajouter une tâche personnelle',
    taskCompletedSuccess: 'Bravo ! Un pas de plus vers la liberté.',
    taskCustomTitle: 'Tâche personnalisée',
    taskCustomDesc: 'Ajoutée par vous pour renforcer votre journée.',

    restartModalTitle: 'Redémarrer le défi au Jour 1',
    restartModalSubtitle: 'Le chemin n’est pas linéaire. Recommencer est un acte de bravoure.',
    restartReasonLabel: 'Que s’est-il passé ? (Facultatif et 100% privé) :',
    restartReasonPlaceholder: 'Ex: Soirée stressante, j’ai appris et je continue...',
    restartConfirmBtn: 'Confirmer et repartir avec espoir',
    restartCancelBtn: 'Annuler',
    restartNotice: 'Vos efforts précédents resteront soigneusement archivés dans votre historique personnel.',

    toolkitTitle: 'Boîte à outils d’urgence',
    toolkitSubtitle: 'Outils validés scientifiquement pour résister à l’envie soudaine.',
    boxBreathingTitle: 'Respiration en boîte (4-4-4-4)',
    boxBreathingDesc: 'Calme immédiatement le système nerveux et fait chuter le stress.',
    breathingInhale: 'Inspirez profondément (4s)...',
    breathingHold: 'Retenez votre souffle (4s)...',
    breathingExhale: 'Expirez lentement (4s)...',
    startBreathing: 'Démarrer l’exercice',
    stopBreathing: 'Arrêter',
    delayTimerTitle: 'Minuteur de temporisation d’envie',
    delayTimerDesc: 'Une pulsion aiguë culmine et redescend en 5 à 15 minutes.',
    timer5min: '5 minutes',
    timer10min: '10 minutes',
    timer15min: '15 minutes',
    startTimer: 'Lancer le compte à rebours',
    pauseTimer: 'Pause',
    resetTimer: 'Réinitialiser',
    groundingTitle: 'Ancrage sensoriel (5-4-3-2-1)',
    groundingDesc: 'Ramenez votre esprit dans l’instant présent :',
    grounding5: '5 objets que vous voyez autour de vous',
    grounding4: '4 textures que vous pouvez toucher',
    grounding3: '3 sons que vous entendez',
    grounding2: '2 odeurs que vous percevez',
    grounding1: '1 chose pour laquelle vous êtes reconnaissant',
    distractionTitle: 'Distractions saines immédiates',
    distraction1: 'Buvez un grand verre d’eau fraîche lentement.',
    distraction2: 'Faites une marche rapide de 10 minutes dehors.',
    distraction3: 'Passez de l’eau froide sur votre visage.',
    distraction4: 'Faites 15 flexions pour décharger l’énergie physique.',
    distraction5: 'Appelez un proche pour parler d’un sujet sans rapport.',
    emergencyHelplinesTitle: 'Assistance médicale et numéros d’urgence',
    emergencyHelplinesDesc: 'En cas de détresse sévère, contactez des professionnels de santé.',
    medicalDisclaimerTitle: 'Avertissement médical impératif',
    medicalDisclaimerText: 'Khotwati est un outil d’accompagnement comportemental et ne remplace pas un avis médical. Le sevrage brusque de certaines substances (notamment alcool lourd) peut présenter des risques vitaux. En cas de symptômes graves, contactez les urgences médicales immédiatement.',

    journalTitle: 'Mon journal privé',
    journalSubtitle: 'Votre espace intime et sécurisé pour consigner vos ressentis en toute sérénité.',
    journalNewEntry: 'Nouvelle note',
    journalTitleInput: 'Titre de la note...',
    journalContentInput: 'Écrivez sans filtre ce que vous ressentez...',
    journalMoodLabel: 'Humeur actuelle :',
    journalMoodPeaceful: 'Paisible',
    journalMoodCalm: 'Calme',
    journalMoodAnxious: 'Anxieux',
    journalMoodStruggling: 'En difficulté',
    journalMoodDetermined: 'Déterminé',
    journalIntensityLabel: 'Intensité du craving (1 à 10) :',
    journalTriggersLabel: 'Déclencheurs (séparés par des virgules) :',
    journalTriggersPlaceholder: 'Ex: Fatigue, solitude, stress, dispute...',
    journalSaveBtn: 'Enregistrer dans mon journal',
    journalDeleteBtn: 'Supprimer',
    journalDeleteConfirm: 'Voulez-vous supprimer cette note définitivement ?',
    journalEmpty: 'Aucune note pour le moment. Notez votre première pensée !',
    journalPrivateNotice: 'Ce journal est strictement privé et ne sera jamais affiché publiquement.',

    chatTitle: 'Communauté publique',
    chatSubtitle: 'Échangez encouragement et bienveillance avec d’autres compagnons de route.',
    chatPublicOnlyBadge: 'Salon public uniquement (Aucun MP)',
    chatNoDMsNotice: 'Pour votre sécurité, les conversations privées 1-à-1 sont proscrites.',
    chatOnlineUsers: 'Membres connectés actuellement :',
    chatMessagePlaceholder: 'Partagez un mot d’encouragement (500 caractères max)...',
    chatSendBtn: 'Envoyer',
    chatReportBtn: 'Signaler',
    chatEmpty: 'Soyez le premier à envoyer un message d’encouragement !',
    chatRateLimitWarning: 'Veuillez patienter quelques instants entre chaque message.',
    chatConnecting: 'Connexion au salon en cours...',

    modDashboardTitle: 'Tableau de modération',
    modPendingReports: 'Signalements en attente',
    modDeleteMessageBtn: 'Supprimer le message',
    modBanUserBtn: 'Suspendre l’utilisateur',
    modReportReason: 'Motif du signalement :',
    modReportSubmit: 'Envoyer le signalement',
    modReportSuccess: 'Signalement transmis aux modérateurs.',

    settingsTitle: 'Paramètres & Compte',
    themeToggle: 'Thème de l’interface :',
    themeDark: 'Mode sombre (Recommandé)',
    themeLight: 'Mode clair',
    languageSelect: 'Langue de l’application :',
    accountRecoveryTitle: 'Clé de récupération secrète',
    generateRecoveryKeyBtn: 'Générer une clé de secours',
    recoveryKeySavedNotice: 'Conservez cette clé en lieu sûr. C’est votre unique moyen de restauration !',
    enterRecoveryKeyPlaceholder: 'Entrez la clé de 16 caractères...',
    recoverAccountBtn: 'Restaurer le compte',
    dataExportBtn: 'Exporter toutes mes données (JSON)',
    deleteAccountBtn: 'Supprimer mon compte et mes données',
    deleteAccountConfirm: 'Êtes-vous sûr de vouloir supprimer définitivement votre compte et tout votre historique ? Cette action est irréversible.',
    deleteAccountWarning: 'Toutes vos données privées seront immédiatement et définitivement effacées.',

    save: 'Enregistrer',
    cancel: 'Annuler',
    close: 'Fermer',
    loading: 'Chargement...',
    error: 'Une erreur est survenue, veuillez réessayer.',
    success: 'Opération réussie.',
    days: 'jours'
  },

  en: {
    appName: 'KHOTWATI | خطوتي',
    tagline: 'One Step at a Time.',
    oneStepAtATime: 'One Step at a Time.',

    navDashboard: 'Dashboard',
    navChallenges: 'Challenges',
    navTasks: 'Daily Tasks',
    navToolkit: 'Craving Toolkit',
    navJournal: 'Private Journal',
    navCommunity: 'Public Community',
    navAnalytics: 'Analytics',
    navAchievements: 'Achievements',
    navReminders: 'Reminders',
    navProfile: 'Profile',
    navSettings: 'Settings',
    navHelp: 'Recovery Guide',
    navRules: 'Community Rules',
    navModeration: 'Moderation',
    navPrivacy: 'Privacy & Security',
    navExportDelete: 'Data Management',

    statusOnline: 'Connected to Server',
    statusOffline: 'Offline Mode (Local Storage)',
    statusSyncing: 'Synchronizing...',
    statusLocalOnly: 'Secure Local Storage',
    localFirstNotice: 'Khotwati is built local-first so you can track habits and write journals even without an internet connection.',

    landingHeroTitle: 'Break free from smoking, nicotine, and unwanted habits — without shame.',
    landingHeroSubtitle: 'A privacy-first, fully anonymous habit recovery platform. Personalized challenges, instant craving relief tools, and an uplifting public support community.',
    landingStartJourney: 'Start My Journey Anonymously',
    landingSignInRecovery: 'Recover Existing Account via Secret Key',
    landingFeature1Title: 'Complete Anonymity',
    landingFeature1Desc: 'No real names, no emails, no phone numbers required. Your recovery belongs only to you.',
    landingFeature2Title: 'Compassionate Restarts',
    landingFeature2Desc: 'Lapses happen. Restart your challenge at any time with zero judgment, preserving your historical achievements.',
    landingFeature3Title: 'Instant Craving Tools',
    landingFeature3Desc: 'Interactive box breathing, a customizable craving delay timer, and 5-4-3-2-1 sensory grounding.',
    landingFeature4Title: 'Public Community, No DMs',
    landingFeature4Desc: 'A fully public, moderated peer room. Direct messaging is intentionally prohibited to keep everyone safe from solicitation.',
    landingNoShameTitle: 'Recovery Rooted in Kindness',
    landingNoShameDesc: 'Sustainable change happens when we celebrate small daily wins, not when we punish ourselves.',

    onboardingTitle: 'Welcome to your first step',
    onboardingSubtitle: 'Select the habit or behavior you want to work on:',
    selectHabitCategory: 'Target Habit Category:',
    habitSmoking: 'Cigarette Smoking',
    habitVaping: 'Nicotine & Vaping',
    habitAlcohol: 'Alcohol',
    habitCannabis: 'Cannabis',
    habitOtherSubstances: 'Other Substances',
    habitGaming: 'Excessive Gaming',
    habitSocialMedia: 'Excessive Social Media & Screens',
    habitRepetitive: 'Unwanted Repetitive Habits',
    habitCustom: 'Other Custom Habit',
    goalLabel: 'What is your primary goal?',
    goalPlaceholder: 'e.g., Complete quit, cutting down by half...',
    durationLabel: 'Initial Challenge Duration:',
    duration7Days: '7-Day Challenge (Quick Start)',
    duration14Days: '14-Day Challenge (Momentum Builder)',
    duration30Days: '30-Day Challenge (Habit Rewire)',
    duration60Days: '60-Day Challenge (Deep Resilience)',
    duration90Days: '90-Day Challenge (Complete Transformation)',
    dailyBaselineLabel: 'Current Daily Baseline (Optional):',
    dailyBaselineHelp: 'e.g., number of cigarettes, drinks, or screen hours per day.',
    costEstimateLabel: 'Estimated Daily Cost (Optional):',
    costEstimateHelp: 'To calculate the real money saved over your recovery journey.',
    onboardingStartBtn: 'Create My Plan & Begin',
    onboardingBackBtn: 'Back',

    currentChallenge: 'Active Challenge',
    challengeDay: 'Day',
    currentStreak: 'Current Streak',
    bestStreak: 'Best Streak',
    tasksCompletedToday: 'Tasks Completed Today',
    progressPercent: 'Progress',
    restartChallengeBtn: 'Restart My Challenge',
    quickToolkitBtn: 'I Have a Craving Right Now!',
    quickCommunityBtn: 'Community Chat',
    moneySaved: 'Estimated Money Saved',
    milestoneNext: 'Next Milestone',
    noActiveChallenge: 'No active challenge running right now.',
    startNewChallenge: 'Start a New Challenge',

    dailyTasksTitle: "Today's Recovery Tasks",
    markComplete: 'Complete Task',
    undoComplete: 'Undo',
    addPersonalTask: 'Add Personal Task',
    taskCompletedSuccess: 'Well done! Another step forward.',
    taskCustomTitle: 'Custom Task',
    taskCustomDesc: 'Added by you to reinforce your day.',

    restartModalTitle: 'Restart Challenge to Day 1',
    restartModalSubtitle: 'Recovery is a journey of consistency, not perfection. Starting over is an act of courage.',
    restartReasonLabel: 'What happened? (Optional and completely private):',
    restartReasonPlaceholder: 'e.g., Encountered a stressful evening. Learned a lesson and moving forward.',
    restartConfirmBtn: 'Confirm & Begin Again with Hope',
    restartCancelBtn: 'Cancel',
    restartNotice: 'Your prior attempt and streak will be safely archived in your history. Nothing is erased.',

    toolkitTitle: 'Difficult-Moment & Craving Toolkit',
    toolkitSubtitle: 'Evidence-based behavioral tools to ride out the craving wave until it subsides.',
    boxBreathingTitle: 'Guided Box Breathing (4-4-4-4)',
    boxBreathingDesc: 'Immediately calms the autonomic nervous system and down-regulates acute stress.',
    breathingInhale: 'Inhale deeply (4s)...',
    breathingHold: 'Hold gently (4s)...',
    breathingExhale: 'Exhale slowly (4s)...',
    startBreathing: 'Start Breathing Exercise',
    stopBreathing: 'Stop',
    delayTimerTitle: 'Craving Delay Timer',
    delayTimerDesc: 'Acute neurochemical cravings typically peak and recede within 5 to 15 minutes.',
    timer5min: '5 Minutes',
    timer10min: '10 Minutes',
    timer15min: '15 Minutes',
    startTimer: 'Start Countdown',
    pauseTimer: 'Pause',
    resetTimer: 'Reset',
    groundingTitle: '5-4-3-2-1 Sensory Grounding',
    groundingDesc: 'Shift your cognitive focus back to the immediate present environment:',
    grounding5: '5 things you can see around you right now',
    grounding4: '4 things you can physically feel or touch',
    grounding3: '3 distinct sounds you can hear',
    grounding2: '2 things you can smell',
    grounding1: '1 thing you can taste or feel grateful for',
    distractionTitle: 'Immediate Healthy Distractions',
    distraction1: 'Drink a large glass of ice-cold water slowly.',
    distraction2: 'Go for a brisk 10-minute walk outside.',
    distraction3: 'Splash cold water on your face.',
    distraction4: 'Do 15 quick pushups or squats to release physical tension.',
    distraction5: 'Call a friend or family member and chat about everyday things.',
    emergencyHelplinesTitle: 'Emergency Professional Helplines',
    emergencyHelplinesDesc: 'If you are experiencing severe distress or withdrawal crisis, contact medical professionals immediately.',
    medicalDisclaimerTitle: 'Important Health & Safety Notice',
    medicalDisclaimerText: 'Khotwati provides behavioral support and is not a substitute for professional medical care. Abrupt withdrawal from certain substances (such as alcohol or heavy sedatives) can be medically dangerous. If you experience severe withdrawal symptoms or chest pain, seek urgent medical care immediately.',

    journalTitle: 'Private Recovery Journal',
    journalSubtitle: 'Your safe, confidential vault for thoughts, emotions, and triggers. Strictly private.',
    journalNewEntry: 'Write New Entry',
    journalTitleInput: 'Entry Title...',
    journalContentInput: 'Write freely and honestly without self-judgment...',
    journalMoodLabel: 'Current Mood:',
    journalMoodPeaceful: 'Peaceful',
    journalMoodCalm: 'Calm',
    journalMoodAnxious: 'Anxious',
    journalMoodStruggling: 'Struggling',
    journalMoodDetermined: 'Determined',
    journalIntensityLabel: 'Craving Intensity (1 to 10):',
    journalTriggersLabel: 'Triggers Encountered (comma separated):',
    journalTriggersPlaceholder: 'e.g., Work stress, fatigue, social gathering, boredom...',
    journalSaveBtn: 'Save to Private Journal',
    journalDeleteBtn: 'Delete',
    journalDeleteConfirm: 'Are you sure you want to permanently delete this journal entry?',
    journalEmpty: 'No entries yet. Write your first reflection today!',
    journalPrivateNotice: 'Privacy Guarantee: Journal entries are strictly private to your account and never shared with the community.',

    chatTitle: 'Public Community Chat',
    chatSubtitle: 'Share encouragement and hope with fellow travelers on the recovery path.',
    chatPublicOnlyBadge: 'Public Room Only (No DMs)',
    chatNoDMsNotice: 'For your safety and protection, direct private messages are strictly prohibited.',
    chatOnlineUsers: 'Members Online Now:',
    chatMessagePlaceholder: 'Type a message of encouragement (max 500 characters)...',
    chatSendBtn: 'Send',
    chatReportBtn: 'Report',
    chatEmpty: 'Be the first to share an encouraging word today!',
    chatRateLimitWarning: 'Please slow down. Rapid message bursts are rate-limited.',
    chatConnecting: 'Connecting to community room...',

    modDashboardTitle: 'Community Moderation Dashboard',
    modPendingReports: 'Pending User Reports',
    modDeleteMessageBtn: 'Remove Message',
    modBanUserBtn: 'Suspend User',
    modReportReason: 'Report Reason (Harassment, illegal substance promotion, abuse):',
    modReportSubmit: 'Submit Report to Moderators',
    modReportSuccess: 'Thank you. Your report has been submitted for review.',

    settingsTitle: 'Settings & Account',
    themeToggle: 'Interface Theme:',
    themeDark: 'Dark Theme (Default)',
    themeLight: 'Light Theme',
    languageSelect: 'Application Language:',
    accountRecoveryTitle: 'Account Security & Recovery Key',
    generateRecoveryKeyBtn: 'Generate Secret Recovery Key',
    recoveryKeySavedNotice: 'Save this key in a secure location. It is the only way to recover your anonymous account!',
    enterRecoveryKeyPlaceholder: 'Enter your 16-character key...',
    recoverAccountBtn: 'Recover Account',
    dataExportBtn: 'Export All Data (JSON)',
    deleteAccountBtn: 'Permanently Delete Account & Data',
    deleteAccountConfirm: 'Are you sure you want to permanently delete your account, challenges, and journal entries? This action cannot be undone.',
    deleteAccountWarning: 'All your private records and progress will be immediately and irreversibly purged.',

    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    loading: 'Loading...',
    error: 'An error occurred. Please try again.',
    success: 'Operation completed successfully.',
    days: 'days'
  }
};
