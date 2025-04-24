
import { ContractTemplate, Language } from "@/types/contract";
import { FileText, Home, File, Shield } from 'lucide-react';

export const templates: ContractTemplate[] = [
  {
    id: 'service-agreement',
    title: {
      'en': 'Service Agreement',
      'ru': 'Договор об оказании услуг',
      'uz-latin': 'Xizmat ko\'rsatish shartnomasi',
      'uz-cyrillic': 'Хизмат кўрсатиш шартномаси'
    },
    description: {
      'en': 'Contract for providing professional services',
      'ru': 'Контракт на предоставление профессиональных услуг',
      'uz-latin': 'Kasbiy xizmatlar ko\'rsatish bo\'yicha shartnoma',
      'uz-cyrillic': 'Касбий хизматлар кўрсатиш бўйича шартнома'
    },
    category: 'business',
    icon: 'FileText',
    availableLanguages: ['uz-latin', 'uz-cyrillic', 'ru', 'en'],
    sections: {
      'en': [
        {
          id: 'parties',
          title: 'Parties to the Agreement',
          content: 'This agreement is made between [Party A] and [Party B].',
          required: true,
          riskLevel: null,
          tooltip: 'Include full legal names and addresses of all parties.'
        },
        {
          id: 'subject',
          title: 'Subject of Agreement',
          content: 'The subject of this agreement is [describe services or products].',
          required: true,
          riskLevel: null,
          tooltip: 'Clearly define what services or products are covered by this agreement.'
        },
        {
          id: 'term',
          title: 'Term & Termination',
          content: 'This agreement is valid from [start date] to [end date]. Either party may terminate with [notice period] written notice.',
          required: true,
          riskLevel: 'medium',
          tooltip: 'Specify the duration of the agreement and the conditions under which either party can terminate it.'
        },
        {
          id: 'payment',
          title: 'Payment Terms',
          content: 'Payment of [amount] will be made within [timeframe] days of invoice receipt.',
          required: true,
          riskLevel: 'low',
          tooltip: 'Include the amount, currency, payment method, and deadline.'
        },
        {
          id: 'liability',
          title: 'Liability',
          content: 'Neither party shall be liable for any indirect or consequential damages arising from this agreement.',
          required: false,
          riskLevel: 'high',
          tooltip: 'This clause limits what damages can be claimed if something goes wrong.'
        },
        {
          id: 'force-majeure',
          title: 'Force Majeure',
          content: 'Neither party shall be liable for failure to perform due to events beyond reasonable control.',
          required: false,
          riskLevel: null,
          tooltip: 'This excuses a party from performing when events like natural disasters occur.'
        }
      ],
      'ru': [
        {
          id: 'parties',
          title: 'Стороны соглашения',
          content: 'Настоящее соглашение заключено между [Сторона А] и [Сторона Б].',
          required: true,
          riskLevel: null,
          tooltip: 'Включите полные юридические наименования и адреса всех сторон.'
        },
        {
          id: 'subject',
          title: 'Предмет соглашения',
          content: 'Предметом настоящего соглашения является [опишите услуги или товары].',
          required: true,
          riskLevel: null,
          tooltip: 'Четко определите, какие услуги или товары охватывает данное соглашение.'
        },
        {
          id: 'term',
          title: 'Срок и прекращение действия',
          content: 'Настоящее соглашение действительно с [дата начала] по [дата окончания]. Любая сторона может расторгнуть соглашение с [период уведомления] письменного уведомления.',
          required: true,
          riskLevel: 'medium',
          tooltip: 'Укажите срок действия соглашения и условия, при которых любая из сторон может его расторгнуть.'
        },
        {
          id: 'payment',
          title: 'Условия оплаты',
          content: 'Оплата в размере [сумма] будет произведена в течение [срок] дней с момента получения счета.',
          required: true,
          riskLevel: 'low',
          tooltip: 'Включите сумму, валюту, способ оплаты и срок.'
        },
        {
          id: 'liability',
          title: 'Ответственность',
          content: 'Ни одна из сторон не несет ответственности за любые косвенные или сопутствующие убытки, возникающие из настоящего соглашения.',
          required: false,
          riskLevel: 'high',
          tooltip: 'Этот пункт ограничивает возможность требования возмещения убытков в случае возникновения проблем.'
        },
        {
          id: 'force-majeure',
          title: 'Форс-мажор',
          content: 'Ни одна из сторон не несет ответственности за невыполнение обязательств вследствие событий, находящихся вне разумного контроля.',
          required: false,
          riskLevel: null,
          tooltip: 'Это освобождает сторону от выполнения обязательств при возникновении таких событий, как стихийные бедствия.'
        }
      ],
      'uz-latin': [
        {
          id: 'parties',
          title: 'Shartnoma tomonlari',
          content: 'Ushbu shartnoma [Tomon A] va [Tomon B] o\'rtasida tuzildi.',
          required: true,
          riskLevel: null,
          tooltip: 'Barcha tomonlarning to\'liq yuridik nomlari va manzillarini kiriting.'
        },
        {
          id: 'subject',
          title: 'Shartnoma predmeti',
          content: 'Ushbu shartnomaning predmeti [xizmatlar yoki mahsulotlarni tavsiflang].',
          required: true,
          riskLevel: null,
          tooltip: 'Ushbu shartnoma qaysi xizmatlar yoki mahsulotlarni qamrab olishini aniq belgilang.'
        },
        {
          id: 'term',
          title: 'Muddat va bekor qilish',
          content: 'Ushbu shartnoma [boshlanish sanasi]dan [tugash sanasi]gacha amal qiladi. Har qanday tomon [xabarnoma muddati] yozma xabarnoma bilan shartnomani bekor qilishi mumkin.',
          required: true,
          riskLevel: 'medium',
          tooltip: 'Shartnoma muddatini va tomonlardan biri uni bekor qilishi mumkin bo\'lgan shartlarni belgilang.'
        },
        {
          id: 'payment',
          title: 'To\'lov shartlari',
          content: '[Summa] to\'lovi hisob-faktura olinganidan keyin [muddat] kun ichida amalga oshiriladi.',
          required: true,
          riskLevel: 'low',
          tooltip: 'Summa, valyuta, to\'lov usuli va muddatini kiriting.'
        },
        {
          id: 'liability',
          title: 'Javobgarlik',
          content: 'Tomonlarning hech biri ushbu shartnomadan kelib chiqadigan har qanday bilvosita yoki oqibatli zarar uchun javobgar bo\'lmaydi.',
          required: false,
          riskLevel: 'high',
          tooltip: 'Bu band muammo yuzaga kelganda talab qilinishi mumkin bo\'lgan zararni cheklaydi.'
        },
        {
          id: 'force-majeure',
          title: 'Fors-major',
          content: 'Tomonlarning hech biri oqilona nazoratdan tashqaridagi hodisalar tufayli majburiyatlarni bajarmaslik uchun javobgar bo\'lmaydi.',
          required: false,
          riskLevel: null,
          tooltip: 'Bu tabiiy ofatlar kabi hodisalar yuz berganda tomonni majburiyatlarni bajarishdan ozod qiladi.'
        }
      ],
      'uz-cyrillic': [
        {
          id: 'parties',
          title: 'Шартнома томонлари',
          content: 'Ушбу шартнома [Томон А] ва [Томон Б] ўртасида тузилди.',
          required: true,
          riskLevel: null,
          tooltip: 'Барча томонларнинг тўлиқ юридик номлари ва манзилларини киритинг.'
        },
        {
          id: 'subject',
          title: 'Шартнома предмети',
          content: 'Ушбу шартноманинг предмети [хизматлар ёки маҳсулотларни тавсифланг].',
          required: true,
          riskLevel: null,
          tooltip: 'Ушбу шартнома қайси хизматлар ёки маҳсулотларни қамраб олишини аниқ белгиланг.'
        },
        {
          id: 'term',
          title: 'Муддат ва бекор қилиш',
          content: 'Ушбу шартнома [бошланиш санаси]дан [тугаш санаси]гача амал қилади. Ҳар қандай томон [хабарнома муддати] ёзма хабарнома билан шартномани бекор қилиши мумкин.',
          required: true,
          riskLevel: 'medium',
          tooltip: 'Шартнома муддатини ва томонлардан бири уни бекор қилиши мумкин бўлган шартларни белгиланг.'
        },
        {
          id: 'payment',
          title: 'Тўлов шартлари',
          content: '[Сумма] тўлови ҳисоб-фактура олингандан кейин [муддат] кун ичида амалга оширилади.',
          required: true,
          riskLevel: 'low',
          tooltip: 'Сумма, валюта, тўлов усули ва муддатини киритинг.'
        },
        {
          id: 'liability',
          title: 'Жавобгарлик',
          content: 'Томонларнинг ҳеч бири ушбу шартномадан келиб чиқадиган ҳар қандай билвосита ёки оқибатли зарар учун жавобгар бўлмайди.',
          required: false,
          riskLevel: 'high',
          tooltip: 'Бу банд муаммо юзага келганда талаб қилиниши мумкин бўлган зарарни чеклайди.'
        },
        {
          id: 'force-majeure',
          title: 'Форс-мажор',
          content: 'Томонларнинг ҳеч бири оқилона назоратдан ташқаридаги ҳодисалар туфайли мажбуриятларни бажармаслик учун жавобгар бўлмайди.',
          required: false,
          riskLevel: null,
          tooltip: 'Бу табиий офатлар каби ҳодисалар юз берганда томонни мажбуриятларни бажаришдан озод қилади.'
        }
      ]
    }
  },
  {
    id: 'rental-agreement',
    title: {
      'en': 'Real Estate Rental',
      'ru': 'Аренда недвижимости',
      'uz-latin': 'Ko\'chmas mulk ijarasi',
      'uz-cyrillic': 'Кўчмас мулк ижараси'
    },
    description: {
      'en': 'Lease agreement for property rental',
      'ru': 'Договор аренды недвижимости',
      'uz-latin': 'Ko\'chmas mulkni ijaraga berish shartnomasi',
      'uz-cyrillic': 'Кўчмас мулкни ижарага бериш шартномаси'
    },
    category: 'real-estate',
    icon: 'Home',
    availableLanguages: ['uz-latin', 'uz-cyrillic', 'ru', 'en'],
    sections: {
      'en': [
        {
          id: 'parties',
          title: 'Parties to the Agreement',
          content: 'This lease agreement is made between [Landlord] and [Tenant].',
          required: true,
          riskLevel: null,
          tooltip: 'Include full legal names and addresses of both landlord and tenant.'
        },
        {
          id: 'property',
          title: 'Property Description',
          content: 'The property is located at [full address] and consists of [description].',
          required: true,
          riskLevel: null,
          tooltip: 'Clearly describe the property including address and features.'
        },
        {
          id: 'term',
          title: 'Lease Term',
          content: 'This lease is for a term of [duration] beginning on [start date] and ending on [end date].',
          required: true,
          riskLevel: 'low',
          tooltip: 'Specify the exact duration of the lease with start and end dates.'
        },
        {
          id: 'rent',
          title: 'Rent and Deposits',
          content: 'Monthly rent is [amount] due on the [day] of each month. Security deposit is [amount].',
          required: true,
          riskLevel: 'medium',
          tooltip: 'Specify the rent amount, payment schedule, and any required deposits.'
        },
        {
          id: 'maintenance',
          title: 'Maintenance and Repairs',
          content: 'Tenant will maintain the property in good condition. Landlord will be responsible for [specific repairs].',
          required: false,
          riskLevel: 'high',
          tooltip: 'Outline who is responsible for different types of maintenance and repairs.'
        },
        {
          id: 'termination',
          title: 'Termination Conditions',
          content: 'This lease may be terminated with [notice period] written notice in case of [specific conditions].',
          required: true,
          riskLevel: 'medium',
          tooltip: 'Specify the conditions under which either party can terminate the lease early.'
        }
      ],
      'ru': [
        {
          id: 'parties',
          title: 'Стороны соглашения',
          content: 'Настоящий договор аренды заключен между [Арендодатель] и [Арендатор].',
          required: true,
          riskLevel: null,
          tooltip: 'Включите полные юридические имена и адреса как арендодателя, так и арендатора.'
        },
        {
          id: 'property',
          title: 'Описание имущества',
          content: 'Имущество расположено по адресу [полный адрес] и состоит из [описание].',
          required: true,
          riskLevel: null,
          tooltip: 'Четко опишите имущество, включая адрес и характеристики.'
        },
        {
          id: 'term',
          title: 'Срок аренды',
          content: 'Настоящий договор аренды заключен на срок [продолжительность], начиная с [дата начала] и заканчивая [дата окончания].',
          required: true,
          riskLevel: 'low',
          tooltip: 'Укажите точную продолжительность аренды с датами начала и окончания.'
        },
        {
          id: 'rent',
          title: 'Арендная плата и залоги',
          content: 'Ежемесячная арендная плата составляет [сумма], подлежит уплате [день] каждого месяца. Залог составляет [сумма].',
          required: true,
          riskLevel: 'medium',
          tooltip: 'Укажите сумму арендной платы, график платежей и необходимые залоги.'
        },
        {
          id: 'maintenance',
          title: 'Обслуживание и ремонт',
          content: 'Арендатор будет поддерживать имущество в хорошем состоянии. Арендодатель будет отвечать за [конкретные ремонты].',
          required: false,
          riskLevel: 'high',
          tooltip: 'Укажите, кто несет ответственность за различные виды обслуживания и ремонта.'
        },
        {
          id: 'termination',
          title: 'Условия расторжения',
          content: 'Настоящий договор может быть расторгнут с [период уведомления] письменным уведомлением в случае [конкретные условия].',
          required: true,
          riskLevel: 'medium',
          tooltip: 'Укажите условия, при которых любая из сторон может досрочно расторгнуть договор.'
        }
      ],
      'uz-latin': [
        {
          id: 'parties',
          title: 'Shartnoma tomonlari',
          content: 'Ushbu ijara shartnomasi [Ijaraga beruvchi] va [Ijarachi] o\'rtasida tuzilgan.',
          required: true,
          riskLevel: null,
          tooltip: 'Ijaraga beruvchi va ijarachining to\'liq yuridik nomlari va manzillarini kiriting.'
        },
        {
          id: 'property',
          title: 'Mulk tavsifi',
          content: 'Mulk [to\'liq manzil] manzilida joylashgan va [tavsif]dan iborat.',
          required: true,
          riskLevel: null,
          tooltip: 'Mulkni manzili va xususiyatlarini aniq tasvirlang.'
        },
        {
          id: 'term',
          title: 'Ijara muddati',
          content: 'Ushbu ijara [davomiylik] muddatga tuzilgan bo\'lib, [boshlanish sanasi]dan boshlanib [tugash sanasi]da yakunlanadi.',
          required: true,
          riskLevel: 'low',
          tooltip: 'Ijaraning boshlanish va tugash sanalari bilan aniq muddatini ko\'rsating.'
        },
        {
          id: 'rent',
          title: 'Ijara haqi va depozitlar',
          content: 'Oylik ijara haqi [summa] bo\'lib, har oyning [kun]ida to\'lanadi. Garov depoziti [summa]ni tashkil etadi.',
          required: true,
          riskLevel: 'medium',
          tooltip: 'Ijara haqini, to\'lov jadvalini va talab qilinadigan depozitlarni ko\'rsating.'
        },
        {
          id: 'maintenance',
          title: 'Ta\'mirlash va saqlash',
          content: 'Ijarachi mulkni yaxshi holatda saqlaydi. Ijaraga beruvchi [aniq ta\'mirlash ishlar] uchun javobgar bo\'ladi.',
          required: false,
          riskLevel: 'high',
          tooltip: 'Turli xil ta\'mirlash va saqlash ishlari uchun kim javobgar ekanligini ko\'rsating.'
        },
        {
          id: 'termination',
          title: 'Bekor qilish shartlari',
          content: 'Ushbu ijara [aniq shartlar] holatida [xabarnoma muddati] yozma xabarnoma bilan bekor qilinishi mumkin.',
          required: true,
          riskLevel: 'medium',
          tooltip: 'Tomonlardan biri ijarani muddatidan oldin bekor qilishi mumkin bo\'lgan shartlarni ko\'rsating.'
        }
      ],
      'uz-cyrillic': [
        {
          id: 'parties',
          title: 'Шартнома томонлари',
          content: 'Ушбу ижара шартномаси [Ижарага берувчи] ва [Ижарачи] ўртасида тузилган.',
          required: true,
          riskLevel: null,
          tooltip: 'Ижарага берувчи ва ижарачининг тўлиқ юридик номлари ва манзилларини киритинг.'
        },
        {
          id: 'property',
          title: 'Мулк тавсифи',
          content: 'Мулк [тўлиқ манзил] манзилида жойлашган ва [тавсиф]дан иборат.',
          required: true,
          riskLevel: null,
          tooltip: 'Мулкни манзили ва хусусиятларини аниқ тасвирланг.'
        },
        {
          id: 'term',
          title: 'Ижара муддати',
          content: 'Ушбу ижара [давомийлик] муддатга тузилган бўлиб, [бошланиш санаси]дан бошланиб [тугаш санаси]да якунланади.',
          required: true,
          riskLevel: 'low',
          tooltip: 'Ижаранинг бошланиш ва тугаш саналари билан аниқ муддатини кўрсатинг.'
        },
        {
          id: 'rent',
          title: 'Ижара ҳақи ва депозитлар',
          content: 'Ойлик ижара ҳақи [сумма] бўлиб, ҳар ойнинг [кун]ида тўланади. Гаров депозити [сумма]ни ташкил этади.',
          required: true,
          riskLevel: 'medium',
          tooltip: 'Ижара ҳақини, тўлов жадвалини ва талаб қилинадиган депозитларни кўрсатинг.'
        },
        {
          id: 'maintenance',
          title: 'Таъмирлаш ва сақлаш',
          content: 'Ижарачи мулкни яхши ҳолатда сақлайди. Ижарага берувчи [аниқ таъмирлаш ишлар] учун жавобгар бўлади.',
          required: false,
          riskLevel: 'high',
          tooltip: 'Турли хил таъмирлаш ва сақлаш ишлари учун ким жавобгар эканлигини кўрсатинг.'
        },
        {
          id: 'termination',
          title: 'Бекор қилиш шартлари',
          content: 'Ушбу ижара [аниқ шартлар] ҳолатида [хабарнома муддати] ёзма хабарнома билан бекор қилиниши мумкин.',
          required: true,
          riskLevel: 'medium',
          tooltip: 'Томонлардан бири ижарани муддатидан олдин бекор қилиши мумкин бўлган шартларни кўрсатинг.'
        }
      ]
    }
  },
  // More templates can be added here
];

export const getTemplateById = (id: string): ContractTemplate | undefined => {
  return templates.find(template => template.id === id);
};

export const getTemplatesByLanguage = (language: Language): ContractTemplate[] => {
  return templates.filter(template => template.availableLanguages.includes(language));
};

export const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'FileText':
      return FileText;
    case 'Home':
      return Home;
    case 'File':
      return File;
    case 'Shield':
      return Shield;
    default:
      return FileText;
  }
};
