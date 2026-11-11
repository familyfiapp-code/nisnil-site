/* FamilyFi Reel Studio — episode scripts.
 *
 * One object = one Instagram Reel (1080x1920, ~19 s).
 * To make a new reel: copy an episode, change the words and the picture, then
 *   node render.mjs <id>
 *
 * Fields
 *   id        short file-safe name (used for the output file)
 *   accent    'saffron' | 'coral' | 'mint' | 'sky'   (colour of highlights)
 *   hook      1–3 short lines, BIG text for the first 2.5 s. Put *stars* around the word to highlight.
 *   hookSub   small line under the hook (question that makes people stop)
 *   pains     3 short "problem" cards (emoji + text)
 *   screen    phone screen picture (sample data only), path relative to this folder
 *   feature   { img, label }  the app card that flies out of the phone in 3D
 *   count     { label, value, prefix } number that counts up on the benefit scene (sample data)
 *   benefits  3 short ticks
 *   keyword   word people should comment (drives comments → reach)
 *   caption   Instagram caption (hook, 2–4 lines, link line, EXACTLY 5 hashtags)
 *
 * Keep every number either from the sample-data screenshots or a plain fact.
 */
const LINK = 'nisnil.co.in/familyfi';
const TAIL = `\n\n15-day free trial 👉 ${LINK}\n(Link in bio · Full user manual on the same page.)\n\n`;

window.EPISODES = [
  {
    id: 'R01_paisa_gaya_kahan',
    accent: 'coral',
    hook: ['Salary aayi…', '*Paisa* gaya kahan?'],
    hookSub: 'Har mahine ka sabse bada sawaal 🤔',
    pains: [
      ['💸', '20 tareekh tak account khaali'],
      ['🧾', 'UPI, card, cash — sab bikhra hua'],
      ['😵', 'Budget banaya, follow nahi hua'],
    ],
    screen: '../img/hero.jpg',
    feature: { img: '../img/trend.jpg', label: 'Category-wise kharcha vs budget' },
    count: { label: 'Is mahine bachat (sample family)', value: 114989, prefix: '₹' },
    benefits: ['Har category ka kharcha ek nazar mein', 'Budget se upar gaye toh turant pata', 'Data aapki apni Google Drive mein'],
    keyword: 'BUDGET',
    caption: `Salary aayi… paisa gaya kahan? 🤔\n\nFamilyFi har rupee ko category mein dikhata hai — budget vs actual, ek screen par.\nAb mahine ke end mein surprise nahi.${TAIL}#budgeting #moneytips #familyfinance #personalfinanceindia #familyfi`,
  },
  {
    id: 'R02_policy_renewal',
    accent: 'saffron',
    hook: ['Insurance renewal', '*bhool* gaye?'],
    hookSub: 'Ek miss = policy lapse ka risk ⚠️',
    pains: [
      ['📅', 'Health, car, term — sabki alag date'],
      ['📩', 'Reminder email spam mein'],
      ['😰', 'Last din bhaag-daud'],
    ],
    screen: '../img/hero.jpg',
    feature: { img: '../img/renew.jpg', label: 'Renewal calendar — sab policies ek jagah' },
    count: { label: 'Family net worth (sample family)', value: 4142055, prefix: '₹' },
    benefits: ['Har policy ki renewal date ek calendar mein', 'Premium ka mahina pehle se pata', 'Paid tap karo — agli date khud set'],
    keyword: 'RENEW',
    caption: `Insurance renewal bhool gaye? ⚠️\n\nHealth, car, term — sab policies ki date ek renewal calendar mein.\nPremium kab aayega, pehle se pata.${TAIL}#insuranceindia #moneytips #familyfinance #personalfinanceindia #familyfi`,
  },
  {
    id: 'R03_home_loan_interest',
    accent: 'sky',
    hook: ['Home loan ka', '*asli* interest', 'pata hai?'],
    hookSub: 'EMI dikhti hai, total interest nahi 🏠',
    pains: [
      ['🏦', 'Sirf EMI yaad, baaki sab bank ke paas'],
      ['📉', 'Kitna principal bacha? Pata nahi'],
      ['🤷', 'Prepay karein ya invest? Confusion'],
    ],
    screen: '../img/hero.jpg',
    feature: { img: '../img/loan.jpg', label: 'Interest still to pay — ek line mein' },
    count: { label: 'Liabilities tracked (sample family)', value: 3571000, prefix: '₹' },
    benefits: ['Har loan ka bacha hua interest saaf', 'EMI, principal, tenure ek jagah', 'Prepay se kitna bachega, pehle dekho'],
    keyword: 'LOAN',
    caption: `Home loan ka asli interest pata hai? 🏠\n\nEMI sab ko yaad hai, par total interest kitna bacha — ye FamilyFi ek line mein dikhata hai.\nPrepay ya invest? Ab faisla data se.${TAIL}#homeloan #emi #debtfree #personalfinanceindia #familyfi`,
  },
  {
    id: 'R04_sms_one_tap',
    accent: 'mint',
    hook: ['Har kharcha', 'likhna *boring*', 'hai na?'],
    hookSub: 'Bank SMS paste karo — entry ready ✨',
    pains: [
      ['✍️', 'Diary mein likhna 3 din chalta hai'],
      ['📱', '50 bank SMS, koi hisaab nahi'],
      ['⏳', 'Excel bharne ka time nahi'],
    ],
    screen: '../img/hero.jpg',
    feature: { img: '../img/sms.jpg', label: 'Bank SMS se spend — seconds mein' },
    count: { label: 'Transactions tracked (sample family)', value: 184, prefix: '' },
    benefits: ['SMS paste → account last-4 se pehchaana', 'Statement import: Excel, CSV, PDF', 'Haath se likhna band'],
    keyword: 'SMS',
    caption: `Har kharcha likhna boring hai na? ✍️\n\nBank SMS paste karo — FamilyFi entry record kar deta hai.\nStatement import bhi — Excel, CSV ya PDF.${TAIL}#expensetracker #moneytips #familyfinance #personalfinanceindia #familyfi`,
  },
  {
    id: 'R05_net_worth',
    accent: 'saffron',
    hook: ['Aapki family ki', '*net worth*', 'kitni hai?'],
    hookSub: 'Zyada tar log ye number nahi jaante 👀',
    pains: [
      ['🏠', 'Ghar, FD, MF, gold — alag alag'],
      ['📊', 'Kya own, kya owe — clear nahi'],
      ['🧩', 'Spouse ke paise ka hisaab alag'],
    ],
    screen: '../img/hero.jpg',
    feature: { img: '../img/mix.jpg', label: 'Asset mix — ek chart mein' },
    count: { label: 'Family net worth today (sample)', value: 4142055, prefix: '₹' },
    benefits: ['MF, FD, PPF, gold − loans = net worth', 'Asset mix ek chart mein', 'Aap aur spouse — dono ka asset mix'],
    keyword: 'NETWORTH',
    caption: `Aapki family ki net worth kitni hai? 👀\n\nGhar, FD, mutual funds, gold, loans — FamilyFi sab jod kar ek number dikhata hai.\nKya own, kya owe — sab clear.${TAIL}#networth #wealthbuilding #familyfinance #personalfinanceindia #familyfi`,
  },
  {
    id: 'R06_cash_plan',
    accent: 'coral',
    hook: ['Mahine ke end mein', '*tight* ho jaata hai?'],
    hookSub: 'Plan pehle, kharcha baad mein 📆',
    pains: [
      ['📆', 'EMI, rent, fees — sab ek hafte mein'],
      ['🛒', 'Bonus aaya, khatam bhi'],
      ['🔁', 'Har mahine wahi kahaani'],
    ],
    screen: '../img/hero.jpg',
    feature: { img: '../img/cash.jpg', label: 'Monthly cash plan — aage ka hisaab' },
    count: { label: 'Income this month (sample family)', value: 157000, prefix: '₹' },
    benefits: ['12 mahine ka expected cash flow', 'Credit card due dates — interest nahi', 'Saving pehle, spending baad mein'],
    keyword: 'PLAN',
    caption: `Mahine ke end mein tight ho jaata hai? 📆\n\nFamilyFi dikhata hai is mahine kitna aana-jaana baaki hai, aur agle 12 mahine ka expected cash flow.\nPlan pehle, kharcha baad mein.${TAIL}#moneymanagement #savingmoney #familyfinance #personalfinanceindia #familyfi`,
  },
];
