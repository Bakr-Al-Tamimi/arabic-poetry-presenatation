# عرض الشعر العربي | Arabic Poetry Presentation
[عرض الشعر العربي | Arabic Poetry Presentation
](https://arabic-poetry-beit-f-jm13.bolt.host/)
<div dir="rtl">

## نظرة عامة

تطبيق ويب حديث مصمم خصيصاً لعرض الشعر العربي بالطريقة التقليدية الصحيحة. يحل هذا التطبيق مشكلة شائعة في العصر الرقمي: عندما يتم نسخ القصائد العربية، غالباً ما يتم عرضها بشكل غير صحيح مع كل شطر في سطر منفصل، بدلاً من العرض التقليدي حيث يظهر كل بيت كامل (الشطر الأول والشطر الثاني) في سطر واحد.

### لماذا هذا التطبيق مهم؟

في الشعر العربي التقليدي:
- كل **بيت** يتكون من شطرين: الشطر الأول والشطر الثاني
- كل بيت هو جملة لغوية وموسيقية كاملة
- تقليدياً، يُكتب البيت على سطر واحد مع الشطرين متقابلين

في الطباعة الحديثة، يتم غالباً تجاهل هذا التنسيق، مما يؤدي إلى:
- صعوبة في القراءة
- فقدان الإيقاع الموسيقي للقصيدة
- مظهر غير احترافي

هذا التطبيق يعيد التقليد الصحيح لعرض الشعر العربي.

## الميزات الرئيسية

### ✍️ إدخال سهل
- الصق قصيدتك كنص عادي (الأسطر الفردية = الشطر الأول، الأسطر الزوجية = الشطر الثاني)
- التحليل التلقائي للأبيات
- عداد مباشر لعدد الأبيات

### 📝 إدارة البيانات الوصفية
- حقل عنوان القصيدة
- حقل اسم الشاعر
- قسم نبذة عن الشاعر
- قسم التعليقات والمفردات والتحليل الأدبي

### 🎨 عرض احترافي
- تنسيق البيت التقليدي (شطر أول | فاصل | شطر ثاني)
- خطوط عربية متخصصة:
  - **Noto Kufi Arabic** للعناوين
  - **Amiri Quran** للقصائد (خط القرآن الكريم)
  - **Readex Pro** للنصوص العامة
- دعم كامل للكتابة من اليمين لليسار (RTL)
- تصميم متجاوب يعمل على جميع الأجهزة

### 💾 التصدير والمشاركة
- **نسخ** الأبيات الفردية أو القصيدة الكاملة إلى الحافظة
- **تصدير PDF** - مستند بجودة عالية جاهز للطباعة
- **تصدير Word** - ملف .docx مع تنسيق عربي صحيح
- **طباعة** - تخطيط محسّن للطباعة

### 🎯 مميزات إضافية
- تأثيرات بصرية عند التفاعل
- إشعارات نجاح العمليات
- حفظ تلقائي للعمل في المتصفح
- لا يتطلب تسجيل دخول

### 🔒 الأمان والحماية
- **تنقية المدخلات** - حماية ضد هجمات XSS باستخدام DOMPurify
- **حفظ الحالة** - حفظ تلقائي للقصيدة في localStorage مع استمرارية لمدة أسبوع
- **تحديد المعدل** - حماية من إساءة استخدام وظائف التصدير والطباعة (حد أقصى مرة واحدة كل ثانيتين)
- **حدود الطول** - حماية من إدخالات ضخمة قد تؤثر على الأداء
  - نص القصيدة: 50,000 حرف كحد أقصى
  - العنوان والاسم: 200 حرف كحد أقصى

## التثبيت والإعداد

### المتطلبات الأساسية
- Node.js 18.0 أو أحدث
- npm أو yarn

### خطوات التثبيت

```bash
# استنساخ المستودع
git clone <repository-url>
cd arabic-poetry-presentation

# تثبيت التبعيات
npm install

# تشغيل خادم التطوير
npm run dev

# بناء للإنتاج
npm run build

# معاينة بناء الإنتاج
npm run preview
```

## طريقة الاستخدام

### 1. إدخال معلومات القصيدة
- أدخل عنوان القصيدة في الحقل المخصص
- أدخل اسم الشاعر (اختياري)
- أضف نبذة عن الشاعر إذا أردت (اختياري)

### 2. إدخال نص القصيدة
الصق قصيدتك في منطقة النص بالتنسيق التالي:
```
الشطر الأول من البيت الأول
الشطر الثاني من البيت الأول
الشطر الأول من البيت الثاني
الشطر الثاني من البيت الثاني
...
```

سيقوم التطبيق تلقائياً بدمج كل شطرين في بيت واحد.

### 3. إضافة التعليقات والمفردات
في قسم التعليقات والمفردات، يمكنك إضافة:
- شرح المفردات الصعبة
- تحليل أدبي
- ملاحظات حول الوزن والقافية
- أي معلومات إضافية

### 4. التصدير
اختر من بين خيارات التصدير:
- **PDF**: للحصول على مستند جاهز للطباعة أو المشاركة
- **Word**: لمزيد من التحرير في Microsoft Word
- **طباعة**: للطباعة المباشرة

## أمثلة

### مثال على إدخال قصيدة

```
غزّةُ تبكي… والسماءُ شهيدة
والأرضُ من وجعِ الحصارِ وليدة
بيتٌ تناثرَ مثلَ حلمٍ غائمٍ
وأمٌّ تنادي: أينَ صوتُ وليدة؟
```

### سيتم عرضها كالتالي:

```
غزّةُ تبكي… والسماءُ شهيدة          |          والأرضُ من وجعِ الحصارِ وليدة
بيتٌ تناثرَ مثلَ حلمٍ غائمٍ         |          وأمٌّ تنادي: أينَ صوتُ وليدة؟
```

## البنية التقنية

### التقنيات المستخدمة
- **React 18** - مكتبة واجهة المستخدم
- **TypeScript** - للأمان من الأخطاء البرمجية
- **Vite** - أداة بناء سريعة
- **Tailwind CSS** - للتصميم
- **jsPDF** - لتوليد ملفات PDF
- **docx** - لتوليد ملفات Word
- **DOMPurify** - لتنقية المدخلات وحماية من XSS
- **html2canvas** - لتحويل HTML إلى صور للتصدير

### هيكل المشروع
```
src/
├── App.tsx              # المكون الرئيسي
├── main.tsx             # نقطة دخول التطبيق
├── index.css            # الأنماط العامة
└── utils/
    ├── exportUtils.ts   # وظائف التصدير (PDF، Word، طباعة)
    └── security.ts      # وظائف الأمان (تنقية، حفظ الحالة، تحديد المعدل)
```

## الأسئلة الشائعة

**س: هل يمكنني استخدام التطبيق بدون اتصال بالإنترنت؟**
ج: بعد تحميل التطبيق، جميع العمليات تتم محلياً في متصفحك. لا حاجة للاتصال بالإنترنت.

**س: هل يتم حفظ قصائدي؟**
ج: نعم! يحفظ التطبيق عملك تلقائياً في متصفحك باستخدام localStorage. ستبقى قصيدتك محفوظة حتى بعد إعادة تحميل الصفحة أو إغلاق المتصفح. تُحذف البيانات المحفوظة تلقائياً بعد أسبوع من عدم الاستخدام. للحفظ الدائم، يُنصح بتصدير عملك كملف PDF أو Word.

**س: ماذا لو كان عدد الأسطر فردياً؟**
ج: التطبيق يتجاهل السطر الأخير إذا لم يكن له شطر مقابل. تأكد من أن عدد الأسطر زوجي.

**س: هل يدعم التطبيق لغات أخرى؟**
ج: التطبيق مصمم خصيصاً للشعر العربي، لكن يمكن استخدامه لأي نص يتبع نفس البنية.

## المساهمة

نرحب بالمساهمات! إذا كنت ترغب في تحسين التطبيق:

1. انسخ المستودع (Fork)
2. أنشئ فرعاً للميزة الجديدة (`git checkout -b feature/amazing-feature`)
3. التزم بتغييراتك (`git commit -m 'Add amazing feature'`)
4. ادفع إلى الفرع (`git push origin feature/amazing-feature`)
5. افتح طلب سحب (Pull Request)

## الترخيص

هذا المشروع مرخص بموجب رخصة MIT - انظر ملف LICENSE للتفاصيل.

## الشكر والتقدير

- شكر خاص لجميع الشعراء والأدباء الذين يحافظون على التراث الشعري العربي
- Google Fonts لتوفير الخطوط العربية الجميلة
- مجتمع React و Vite للأدوات الرائعة

## التواصل

إذا كان لديك أسئلة أو اقتراحات، لا تتردد في فتح issue في المستودع.

---

</div>

# Arabic Poetry Presentation

## Overview

A modern web application specifically designed to display Arabic poetry in the correct traditional format. This application solves a common problem in the digital age: when Arabic poems are copied, they are often displayed incorrectly with each verse on a separate line, rather than the traditional display where each complete Beit (both front and back verses) appears on a single line.

### Why This Application Matters

In traditional Arabic poetry:
- Each **Beit** (line) consists of two verses: the front verse (الشطر الأول) and back verse (الشطر الثاني)
- Each Beit is a complete linguistic and musical sentence
- Traditionally, a Beit is written on one line with the two verses facing each other

In modern typing, this formatting is often ignored, leading to:
- Difficulty in reading
- Loss of the musical rhythm of the poem
- Unprofessional appearance

This application restores the correct tradition of Arabic poetry display.

## Key Features

### ✍️ Easy Input
- Paste your poem as plain text (odd lines = front verse, even lines = back verse)
- Automatic Beit parsing
- Real-time Beit counter

### 📝 Metadata Management
- Poem title field
- Poet name field
- Poet biography section
- Comments and vocabulary section for literary analysis

### 🎨 Professional Display
- Traditional Beit formatting (front verse | divider | back verse)
- Specialized Arabic fonts:
  - **Noto Kufi Arabic** for titles
  - **Amiri Quran** for poems (Quranic script)
  - **Readex Pro** for general text
- Full right-to-left (RTL) support
- Responsive design works on all devices

### 💾 Export & Sharing
- **Copy** individual Beits or full poem to clipboard
- **PDF Export** - High-quality print-ready document
- **Word Export** - .docx file with proper Arabic formatting
- **Print** - Print-optimized layout

### 🎯 Additional Features
- Visual hover effects
- Success notifications
- Auto-save work in browser
- No login required

### 🔒 Security & Protection
- **Input Sanitization** - Protection against XSS attacks using DOMPurify
- **State Persistence** - Automatic poem saving in localStorage with one-week retention
- **Rate Limiting** - Protection from abuse of export/print functions (maximum once every 2 seconds)
- **Length Limits** - Protection from oversized inputs that could affect performance
  - Poem text: 50,000 character maximum
  - Title and name: 200 character maximum

## Installation & Setup

### Prerequisites
- Node.js 18.0 or newer
- npm or yarn

### Installation Steps

```bash
# Clone the repository
git clone <repository-url>
cd arabic-poetry-presentation

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## How to Use

### 1. Enter Poem Information
- Enter the poem title in the designated field
- Enter the poet's name (optional)
- Add poet biography if desired (optional)

### 2. Enter Poem Text
Paste your poem in the text area in the following format:
```
First verse of first Beit
Second verse of first Beit
First verse of second Beit
Second verse of second Beit
...
```

The application will automatically merge every two verses into one Beit.

### 3. Add Comments and Vocabulary
In the comments section, you can add:
- Explanation of difficult words
- Literary analysis
- Notes about meter and rhyme
- Any additional information

### 4. Export
Choose from export options:
- **PDF**: For print-ready document or sharing
- **Word**: For further editing in Microsoft Word
- **Print**: For direct printing

## Examples

### Example Poem Input

```
غزّةُ تبكي… والسماءُ شهيدة
والأرضُ من وجعِ الحصارِ وليدة
بيتٌ تناثرَ مثلَ حلمٍ غائمٍ
وأمٌّ تنادي: أينَ صوتُ وليدة؟
```

### Will Display As:

```
غزّةُ تبكي… والسماءُ شهيدة          |          والأرضُ من وجعِ الحصارِ وليدة
بيتٌ تناثرَ مثلَ حلمٍ غائمٍ         |          وأمٌّ تنادي: أينَ صوتُ وليدة؟
```

## Technical Architecture

### Technologies Used
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **jsPDF** - PDF generation
- **docx** - Word document generation
- **DOMPurify** - Input sanitization and XSS protection
- **html2canvas** - HTML to image conversion for export

### Project Structure
```
src/
├── App.tsx              # Main component
├── main.tsx             # Application entry
├── index.css            # Global styles
└── utils/
    ├── exportUtils.ts   # Export functions (PDF, Word, print)
    └── security.ts      # Security functions (sanitization, state persistence, rate limiting)
```

## Frequently Asked Questions

**Q: Can I use the application offline?**
A: After loading the application, all operations are performed locally in your browser. No internet connection needed.

**Q: Are my poems saved?**
A: Yes! The application automatically saves your work in your browser using localStorage. Your poem will remain saved even after reloading the page or closing the browser. Saved data is automatically deleted after one week of inactivity. For permanent storage, it's recommended to export your work as PDF or Word files.

**Q: What if I have an odd number of lines?**
A: The application ignores the last line if it doesn't have a matching verse. Ensure you have an even number of lines.

**Q: Does the application support other languages?**
A: The application is designed specifically for Arabic poetry, but can be used for any text following the same structure.

## Contributing

Contributions are welcome! If you'd like to improve the application:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Special thanks to all poets and writers who preserve Arabic poetic heritage
- Google Fonts for providing beautiful Arabic fonts
- React and Vite communities for excellent tools

## Contact

If you have questions or suggestions, feel free to open an issue in the repository.

---

**Made with ❤️ for Arabic Poetry**
