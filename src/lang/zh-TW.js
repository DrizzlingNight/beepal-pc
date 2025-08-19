export default {
  name: '繁體中文',
  // ******** 基礎通用文字 ******** //
  base: {
    success: '成功',
    fail: '失敗',
    confirm: '確認',
    cancel: '取消',
    congrats: '恭喜',
    ok: '好',
    comingSoon: '敬請期待',
    pleaseTryLater: '請稍後再試'
  },
  // ******** alert ******** //
  alert: {
    dialogClose: {
      text: '確定要關閉嗎?',
    },
    greeting: '登入成功，歡迎',
    logout: '帳號已經登出',
    verificationSent: '已送出驗證碼',
    registerSuccess: '註冊成功，請登入',
    copySuccess: '已複製到剪貼簿',
    safariSuggestion: '為提供最佳的學習體驗，請轉往Chrome或Firefox繼續學習'
  },
  // ******** 使用者操作相關文字 ******** //
  user: {
    account: '帳號',
    password: '密碼',
    forgetPassword: '忘記密碼',
    pleaseEnterAccount: '請輸入帳號',
    pleaseEnterPassword: '請輸入密碼',
  },
  // ******** 交易相關文字 ******** //
  trade: {
    buy: '購買',
    sell: '出售',
  },
  // ******** 貨幣 ********//
  coins: {
    coin_1: '人民幣',
    coin_2: '港幣',
    coin_3: '新台幣',
    coin_4: '柚子幣',
    coin_5: 'TRON_TRX',
    coin_6: 'ETH_USDT',
    coin_7: 'EOS_BAP',
    coin_8: '乙太幣',
    coin_9: 'TRON_USDT',
    coin_10: '美元',
    coin_11: '日圓'
  },
  // ******** 頁首文字 ******** //
  header: {
    purchase: '購買',
    sell: '出售',
    nav_1: '行情',
    nav_2: '幣幣兌換',
    nav_3: '錢包',
    nav_4: '資訊',
    nav_5: '發現', 
    search: '搜索',
    price: '的出價',
    walletTotal: '錢包總餘額',
    dropdownLink_1: '個人資料',
    dropdownLink_2: '錢包變動紀錄',
    dropdownLink_3: '廣告商',
    logout: '登出',
    login: '登入',
    resetPassword: '重置密碼',
    loginDialog: {
      email: '信箱',
      emailHint: '這不是一個信箱地址',
      phone: '手機',
      emailAddress: '信箱地址',
      phoneNumber: '帳號手機號碼',
      password: '密碼',
      passwordHint: '帳號或密碼有誤',
      forgetPassword: '忘記密碼',
      registerNow: '立即註冊',
      emailLabel: '請輸入信箱',
      phoneLabel: '請輸入手機號碼',
      verificationLabel: '請輸入驗證碼',
      passwordLabel: '請輸入密碼',
      registerText: '還沒有帳號?',
      forgetPassword_email: '信箱重置',
      forgetPassword_phone: '手機重置',
      verification: '驗證碼',
      sendVerification: '發送驗證碼',
      send: '送出',
      _resend: '{0}秒後重發',
      verificationResult_success: '驗證成功，請設定您的新密碼',
      verificationResult_failed: '驗證失敗，請刷新後重試',
      newPassword: '新密碼',
      newPasswordHint: '請輸入6到12碼',
      newPasswordLabel: '請輸入新密碼',
      confirmNewPasswordLabel: '請再次輸入新密碼',
      confirmNewPassword: '確認新密碼',
      confirmNewPasswordHint: '兩次輸入的密碼不同',
      confirmReset: '確認重置',
      resetSuccess: '重置成功!',
      resetFailed: '重置失敗!'
    }
  },
  // ******** 頁腳文字 ******** //
  footer: {
    nav_1: '返回首頁',
    nav_2: '關於Beex',
    nav_3: 'APP下載',
    partners: '合作夥伴',
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
    taiwan: '台灣',
    china: '中國',
    hongkong: '香港',
  },
  // ******** 特殊狀態 ******** //
  specialStatus: {
    networkError: {
      title: '網路連線出問題了',
      description: '請檢查網路設定或稍後再試',
    },
    emptyContent: {
      title: '暫無相關內容',
      description: '快去添加吧',
    },
    emptyResult: {
      title: '未搜尋到相關內容',
      description: '換個關鍵字試試',
    },
    emptyMessage: {
      title: '暫無消息',
      description: '還沒有留言喔',
    },
  },
  // ******** 加載頁面文字 ******** //
  loading: {
    title: '加載中',
    description: '請稍後',
  },
  // ******** 首頁文字 ******** //
  homepage: {
    section1: {
      card: {
        tab1: '我要購買',
        tab2: '我要出售',
        selectTitle2: '我的支付方式',
        selectTitle3: '我要使用',
        anyCoin: '任何貨幣',
        lowestPrice: '最低金額',
      },
      text: {
        title1: '透過',
        title2: '交易虛擬貨幣',
        description1: '使用350多種支付方式買賣虛擬貨幣，獲取您的Paxful帳號，開始與和您一樣的600萬用戶收發付款。',
        description2: '在美國使用熱門支付方式購買虛擬貨幣',
        chip1: '銀行轉帳',
        chip2: 'Zelle Pay',
        chip3: '西聯匯款'
      }
    },
    section2: {
      sectionTitle1: '服務全球超過',
      sectionTitle2: '1000萬',
      sectionTitle3: '用戶',
      subject1: '安全營運',
      subject2: '一站式交易服務',
      subject3: '專業服務',
      text1: '為數十家合作夥伴提供企業級技術服務，保障您的虛擬資產穩如泰山',
      text2: '場外法幣交易、幣幣交易、遊戲消費、為您提供一站式服務',
      text3: '內置的在線客服，7x24小時為您服務，並實時分享您想知道的一切資訊'
    },
    section3: {
      sectionTitle1: '超過',
      sectionTitle2: '種買賣虛擬貨幣的方式',
      description: '選擇您需要的支付方式，立即與您心儀的出價開始交易!',
      tab1: '出售虛擬貨幣',
      tab2: '購買虛擬貨幣',
      cardTitle: '換取現金',
      cardText: '足不出戶即可收取現金支付，也可以在附近地點方便交易。',
      moreButton: '查看所有出價'
    },
    section4: {
      sectionTitle1: '透過',
      sectionTitle2: '，您可以',
      description: '借助BeePal平台，將您的財務自由帶入全新高度。',
      subject1: '在線購買虛擬貨幣',
      subject2: '出售虛擬貨幣',
      subject3: '使用託管服務保證交易安全',
      subject4: '獲得交易好評',
      subject5: '獲得免費虛擬貨幣錢包',
      subject6: '賺取額外收益',
      text1: '在BeePal上實時購買虛擬貨幣，使用我們的在線聊天功能與其他用戶在線交易',
      text2: '根據您所選的費率出售虛擬貨幣，在多種支付方式中選擇一種獲得支付',
      text3: '在交易成功完成之前，您的虛擬貨幣將保存在我們的安全託管中',
      text4: '我們的用戶反饋系統讓您可以辨識可信的、有經驗的交易對象',
      text5: '獲得終身免費的虛擬貨幣錢包',
      text6: '利用我們的聯盟計畫，獲得穩定的額外收入來源'
    },
    section5: {
      sectionTitle: '用戶回饋',
      description: '有數百萬人已在BeePal上擁有成功的使用體驗，這些是用戶對BeePal的評價。',
      feedback1: {
        userName: 'Lisa',
        userTitle: '資深幣名',
        feedback: '”我一直在用BeePal，见证了数字钱包的起起伏伏，有幸一路有你陪伴。BeePal以用户第一位，功能和服务都是一流的，作为一名区块链布道者，我真心推荐BeePal。”'
      },
      feedback2: {
        userName: 'Miko',
        userTitle: '資深幣名',
        feedback: '”BeePal是一款十分实用的钱包，支持多条公链，用起来十分方便，反馈问题调整很迅速，一直都在用，我的大部分资产放在钱包，创始团队也挺不错的，踏实，肯干。”'
      },
      feedback3: {
        userName: '布魯斯威利',
        userTitle: '資深幣名',
        feedback: '”一直在寻找一款安全简单易用的数字錢包。终于接触了BeePal，也使用了近两年，我也特别喜欢这个团队的态度，对錢包新手给予了很大的帮助，特别推荐使用BitKeep錢包！”'
      }
    },
    section6: {
      sectionTitle1: '成為',
      sectionTitle2: '上的虛擬貨幣賣家',
      description: '成為BeePal上的賣家，為全球千萬人帶來財富自由，提供買家喜歡的多種支付方式，屏除中間人環節，我們會為您配備所有資源和相關報導，助您取得成功。',
      moreButton: '成為賣家'
    }
  },
  // ******** 註冊頁面 ******** //
  register: {
    title: '註冊',
    greeting: '歡迎註冊成為新用戶',
    emailRegister: '信箱註冊',
    phoneRegister: '手機註冊',
    email: '信箱',
    emailLabel: '請輸入信箱',
    phone: '手機',
    phoneHint: '手機號碼不存在',
    phoneLabel: '請輸入手機號碼',
    verification: '驗證碼',
    emailVerificationLabel: '請輸入信箱驗證碼',
    phoneVerificationLabel: '請輸入手機驗證碼',
    getVerification: '取得驗證碼',
    createPassword: '設定登入密碼',
    createPasswordLabel: '設定登入密碼',
    createPasswordHint: '輸入不符合要求，請輸入6-14位密碼',
    confirmPassword: '再次確認密碼',
    confirmPasswordLabel: '再次確認密碼',
    confirmPasswordHint: '兩次輸入的密碼不一致',
    registerNow: '立即註冊',
    companyName: '幣蜂數位科技有限公司',
    agreement_l: '註冊即表示同意BeePal',
    agreement_r: '用戶協議',
  },
  // ******** 幣幣兌換 ******** //
  exchange: {
    title: '一鍵換幣',
    description: '使用此功能可以自由便捷的將幣與幣進行兌換',
    changeFrom: '我要兌換',
    inputLabel: '請輸入要兌換的數量',
    max: '最大',
    changeTo: '我要換成',
    available: '可用',
    receiveAmount: '預計接收數量',
    action: '0手續費兌換',
    exchangeRecords: '兌換紀錄'
  },
  // ******** 錢包頁面外部文字 ******** //
  wallet: {
    title: '錢包',
    nav_1: '我的錢包',
    nav_2: '錢包變動紀錄',
    nav_3: '地址簿',
    nav_4: '課程',
  },
  // ******** 錢包 - 資產 ******** //
  property: {
    myTotal: '我的總資產',
    transferIn: '轉入',
    transferOut: '轉出'
  },
  // ******** 錢包 - 交易紀錄 ******** //
  tradeRecords: {
    all: '全部',
    transIn: '充幣',
    transOut: '提幣',
    reloadData: '刷新資料',
    fee: '手續費',
    time: '時間',
    status: '狀態',
    address: '地址',
    processing: '進行中',
    completed: '已完成',
    failed: '失敗',
    expired: '已過期'
  },
  // ******** 錢包 - 地址簿 ******** //
  address: {
    title: '您的虛擬貨幣地址',
    address: '地址',
    createdTime: '創建時間',
    balance: '餘額',
  },
  // ******** 所有課程相關 ******** //
  courses: {
    title: '最新課程',
  },
  courseInfo: {
    nav_1: '課程',
    nav_2: '課程簡介',
    description: '介紹',
    duration: '時長',
    lessonAmount: '個章節',
    hour: '小時',
    type: '類型',
    type_0: '綜合',
    type_1: '文章',
    type_2: '影片',
    type_3: '音檔',
    price: '價格',
    share: '分享',
    sharing: '分享中...',
    buyAndLearn: '購買並學習',
    lessonContents: '課程目錄',
    learnProgress_0: '去學習',
    learnProgress_1: '學習中',
    learnProgress_2: '已學習',
    shareCourse: '課程分享',
    shareLesson: '課程章節分享',
  },
  purchaseDialog: {
    checkOrder: '確認訂單',
    shouldPay: '應付金額',
    warningPrompt: '錯誤提示',
    warningDescription: '請儲值後繼續購買',
    successDescription: '課程購買成功，快去開始學習吧',
  },
  securityCheckDialog: {
    securityCheck: '安全驗證',
    securityCode: '驗證密碼',
  },
  course: {
    nav_1: '課程',
    nav_2: '課程簡介',
    nav_3: '影片詳情',
    lessonDuration: '章節時長',
  },
  // ******** 所有行情相關 ******** //
  quotes: {
    title: '實時行情',
    subject_1: '名稱',
    subject_2: '現價',
    subject_3: '24h漲幅',
    subject_4: '24h最高',
    subject_5: '24h最低',
    subject_6: '7日走勢',
    loadMore: '查看更多',
    // mobile版 banner
    banner: {
      title: 'BeePal 官方APP下載',
      description: '更多好玩的Dapp，盡在BeeX !',
      androidDownload: 'Android下載',
      openInMobileWeb: '在手機瀏覽器中打開',
    },
  },
}
