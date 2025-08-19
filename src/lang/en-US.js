export default {
  name: 'English',
  // ******** 基礎通用文字 ******** //
  base: {
    success: 'Success',
    fail: 'Fail',
    confirm: 'Confirm',
    cancel: 'Cancel',
    congrats: 'Congratulations',
    ok: 'Ok',
    comingSoon: 'Coming Soon',
    pleaseTryLater: 'Please try again later'
  },
  // ******** alert ******** //
  alert: {
    dialogClose: {
      text: 'Are you sure about closing??',
    },
    greeting: 'Login success, welcome',
    logout: 'Account has been logged out',
    verificationSent: 'Verification code sent',
    registerSuccess: 'Successful registration, please login',
    copySuccess: 'Copy to the scrapbook',
    safariSuggestion: 'To provide the best learning experience, please transfer to Chrome or Firefox to continue learning'
  },
  // ******** 使用者操作相關文字 ******** //
  user: {
    account: 'Account',
    password: 'Password',
    forgetPassword: 'Password forgot',
    pleaseEnterAccount: 'Please enter your account',
    pleaseEnterPassword: 'Please enter your password',
  },
  // ******** 交易相關文字 ******** //
  trade: {
    buy: 'Buy',
    sell: 'Sell',
  },
  // ******** 貨幣 ********//
  coins: {
    coin_1: 'RMB',
    coin_2: 'HKD',
    coin_3: 'NTD',
    coin_4: 'EOS',
    coin_5: 'TRON_TRX',
    coin_6: 'ETH_USDT',
    coin_7: 'EOS_BAP',
    coin_8: 'ETH',
    coin_9: 'TRON_USDT',
    coin_10: 'USD',
    coin_11: 'JPY'
  },
  // ******** 頁首文字 ******** //
  header: {
    purchase: 'buy',
    sell: 'Sell',
    nav_1: 'Quotes',
    nav_2: 'Exchange',
    nav_3: 'Wallet',
    nav_4: 'Information',
    nav_5: 'Explore', 
    search: 'Search',
    price: 'price',
    walletTotal: 'Total balance',
    dropdownLink_1: 'Personal information',
    dropdownLink_2: 'Asset change record',
    dropdownLink_3: 'Advertisers',
    logout: 'Logout',
    login: 'Login',
    resetPassword: 'Reset password',
    loginDialog: {
      email: 'Email',
      emailHint: 'This is not an email address',
      phone: 'Phone',
      emailAddress: 'Email address',
      phoneNumber: 'Phone number',
      password: 'Password',
      passwordHint: 'Account or password is incorrect',
      forgetPassword: 'Password forgot',
      registerNow: 'Sign up now',
      emailLabel: 'Please enter your email',
      phoneLabel: 'Please enter your phone number',
      verificationLabel: 'Please enter verification code',
      passwordLabel: 'Please enter your password',
      registerText: 'Don\'t have account yet?',
      forgetPassword_email: 'By email',
      forgetPassword_phone: 'By phone',
      verification: 'Verification code',
      sendVerification: 'Send code',
      send: 'Sent',
      _resend: 'Resend after {0} seconds',
      verificationResult_success: 'Verify successfully, please enter your new password',
      verificationResult_failed: 'Verify failed, please try again later',
      newPassword: 'New password',
      newPasswordHint: 'Please enter 6 to 12 bits',
      newPasswordLabel: 'Please enter a new password',
      confirmNewPasswordLabel: 'Please enter the new password again',
      confirmNewPassword: 'Confirm the new password',
      confirmNewPasswordHint: 'Passwords are not same',
      confirmReset: 'Confirm reset',
      resetSuccess: 'Reset successfully!',
      resetFailed: 'Reset failed!'
    }
  },
  // ******** 頁腳文字 ******** //
  footer: {
    nav_1: 'Back to home page',
    nav_2: 'About Beex',
    nav_3: 'App download',
    partners: 'Partners',
  },
  // ******** 狀態碼訊息 ******** //
  errorCode: {
    // 通用提示
    10001: '請求失敗',
    10002: '重複操作',
    10003: '操作失敗',
    10004: '錯誤的操作。請檢查工作順序，以及上一步工作是否完成',
    10005: '因系統維護，相關功能已關閉，請檢查全局開關狀態',
    10006: '相關功能尚未實現',
    10007: '併發錯誤，執行事務時先決條件已不再滿足',
    10008: '權限錯誤',
    10101: '模板不存在',
    // 用戶
    20001: '用戶不存在',
    20002: '用戶已註冊',
    20003: '用戶名重複',
    20004: '無效的邀請碼，請檢查邀請碼',
    20005: '不支持的類型',
    20006: '安全碼錯誤',
    20101: '用戶沒有地址',
    20102: '到賬失敗，用戶餘額異常',
    20103: '扣款失敗，用戶餘額不足',
    20104: '錢包不存在，請檢查地址和幣種配置',
    20105: '創建幣地址失敗',
    20106: '提款失敗，請檢查request_id',
    20201: '訪問的IP不符合白名單',
    20202: '認證狀態錯誤',
    // 登錄註冊
    20301: '用戶名或密碼錯誤',
    20302: '驗證碼過期',
    20303: '驗證碼錯誤',
    // 收款方式
    20401: '收款方式使用中，不可以修改或刪除',
    20402: '存在同類型收款方式',
    20403: '收款方式錯誤',
    20404: '該帳戶為默認帳戶',
    // 幣種
    30001: '幣種不存在，請檢查code配置',
    30002: '交易狀態異常',
    30003: '交易法幣無效，請檢查coin配置',
    30004: '目標地址與本地地址衝突',
    // 訂單
    40001: '匯率無效，請檢查當前匯率獲取',
    40002: '第三方訂單號已存在',
    40003: '訂單狀態異常',
    40004: '訂單缺少金額配置，請檢查參數',
    40005: '訂單編輯失敗',
    40006: '訂單沒有付款信息，兌出/提幣訂單需要填寫或配置付款渠道',
    40007: '申請Cobo地址失敗，多是網絡問題，可重試',
    40008: '有未完成的訂單',
    40009: '訂單生成失敗',
    40010: '訂單信息異常',
    40011: '訂單條件不滿足',
  },
  // ******** 國家 ******** //
  country: {
    taiwan: 'Taiwan',
    china: 'China',
    hongkong: 'Hongkong',
  },
  // ******** 特殊狀態 ******** //
  specialStatus: {
    networkError: {
      title: 'Network connection problem',
      description: 'Please check the network settings or try again later',
    },
    emptyContent: {
      title: 'No content',
      description: 'Go add some content',
    },
    emptyResult: {
      title: 'No related content',
      description: 'Try another keyword',
    },
    emptyMessage: {
      title: 'No news yet',
      description: 'No message yet',
    },
  },
  // ******** 加載頁面文字 ******** //
  loading: {
    title: 'Loading',
    description: 'Please wait',
  },
  // ******** 註冊頁面 ******** //
  register: {
    title: 'Register',
    greeting: 'Welcome to become a new user',
    emailRegister: 'Email',
    phoneRegister: 'Phone',
    email: 'Email',
    emailLabel: 'Please enter your email',
    phone: 'Phone number',
    phoneHint: 'Phone number does not exist',
    phoneLabel: 'Please enter the phone number',
    verification: 'Verification code',
    emailVerificationLabel: 'Please enter the email verification code',
    phoneVerificationLabel: 'Please enter the phone verification code',
    getVerification: 'Get verification code',
    createPassword: 'Set login password',
    createPasswordLabel: 'Set login password',
    createPasswordHint: 'Enter does not meet the requirements, please enter 6-12 bit password',
    confirmPassword: 'Confirm your password again',
    confirmPasswordLabel: 'Confirm your password again',
    confirmPasswordHint: 'The password entered twice is inconsistent',
    registerNow: 'Register now',
    companyName: 'Beex Technology Co., Ltd',
    agreement_l: 'Registration means agreeing Beepal',
    agreement_r: 'User Agreement',
  },
  // ******** 幣幣兌換 ******** //
  exchange: {
    title: 'One click exchange',
    description: 'Use this feature to be free and convenient to exchange coins with coins',
    changeFrom: 'I want to redeem',
    inputLabel: 'Please enter the quantity you want to redeem',
    max: 'Maximum',
    changeTo: 'I want to change to',
    available: 'Available',
    receiveAmount: 'Expected number of reception',
    action: '0 gas fee redemption',
    exchangeRecords: 'Exchange record'
  },
  // ******** 錢包頁面外部文字 ******** //
  wallet: {
    title: 'Wallet',
    nav_1: 'My assets',
    nav_2: 'Wallet transaction record',
    nav_3: 'Address book',
    nav_4: 'Courses',
  },
  // ******** 錢包 - 資產 ******** //
  property: {
    myTotal: 'My total assets',
    transferIn: 'Transfer in',
    transferOut: 'Transfer out'
  },
  // ******** 錢包 - 交易紀錄 ******** //
  tradeRecords: {
    all: 'All',
    transIn: 'Recharge',
    transOut: 'Withdraw',
    reloadData: 'Refresh data',
    fee: 'Fee',
    time: 'Time',
    status: 'Status',
    address: 'Address',
    processing: 'Processing',
    completed: 'Completed',
    failed: 'Fail',
    expired: 'Expired'
  },
  // ******** 錢包 - 地址簿 ******** //
  address: {
    title: 'Your coin address',
    address: 'Address',
    createdTime: 'Created time',
    balance: 'Balance',
  },
  // ******** 所有課程相關 ******** //
  courses: {
    title: 'Latest courses',
  },
  courseInfo: {
    nav_1: 'Course',
    nav_2: 'Course introduction',
    description: 'Introduction',
    duration: 'Duration',
    lessonAmount: 'lessons',
    hour: 'total hours',
    type: 'Type',
    type_0: 'Comprehensive',
    type_1: 'Text',
    type_2: 'Video',
    type_3: 'Audio',
    price: 'Price',
    share: 'Share',
    sharing: 'Sharing...',
    buyAndLearn: 'Buy and learn',
    lessonContents: 'Course catalog',
    learnProgress_0: 'Learn',
    learnProgress_1: 'Learning',
    learnProgress_2: 'Learned',
    shareCourse: 'Share course',
    shareLesson: 'Share lesson',
  },
  purchaseDialog: {
    checkOrder: 'Confirm order',
    shouldPay: 'Amount should pay',
    warningPrompt: 'Error message',
    warningDescription: 'Please  buy after recharge',
    successDescription: 'The course purchased successfully, go to learn',
  },
  securityCheckDialog: {
    securityCheck: 'Safety verification',
    securityCode: 'Verify code',
  },
  course: {
    nav_1: 'Course',
    nav_2: 'Course introduction',
    nav_3: 'Video details',
    lessonDuration: 'Lesson duration',
  },
  // ******** 所有行情相關 ******** //
  quotes: {
    title: 'Real-time market price',
    subject_1: 'Name',
    subject_2: 'Current price',
    subject_3: '24h fluctuations',
    subject_4: '24h highest',
    subject_5: '24h lowest',
    subject_6: '7 days trend',
    loadMore: 'Load more',
    // mobile版 banner
    banner: {
      title: 'BeePal official app download',
      description: 'More fun DAPP, all in Beex!',
      androidDownload: 'Android download',
      openInMobileWeb: 'Open in your mobile browser',
    },
  },
}
