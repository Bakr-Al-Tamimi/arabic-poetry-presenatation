# Technical and Non-Technical Requirements

## متطلبات المشروع - Project Requirements

---

## 📋 Non-Technical Requirements / المتطلبات غير التقنية

### 1. Purpose / الغرض
The application addresses a significant gap in modern Arabic poetry presentation by providing a digital solution that respects traditional Arabic poetry formatting conventions. The tool enables users to properly format, display, and share Arabic poems in the traditional "Beit" format where each complete verse appears on a single line.

يعالج التطبيق فجوة كبيرة في عرض الشعر العربي الحديث من خلال توفير حل رقمي يحترم تقاليد تنسيق الشعر العربي. تمكّن الأداة المستخدمين من تنسيق وعرض ومشاركة القصائد العربية بشكل صحيح في شكل "البيت" التقليدي حيث يظهر كل بيت كامل في سطر واحد.

### 2. Target Users / المستخدمين المستهدفين
- Poets and writers / الشعراء والكتّاب
- Arabic literature students and teachers / طلاب ومعلمو الأدب العربي
- Cultural organizations / المؤسسات الثقافية
- Publishers and content creators / الناشرون ومنشئو المحتوى
- Anyone who works with Arabic poetry / أي شخص يعمل مع الشعر العربي

### 3. Key Features / الميزات الرئيسية

#### Input & Formatting / الإدخال والتنسيق
- Simple text input where users paste poems with alternating verses
- إدخال نصي بسيط حيث يلصق المستخدمون القصائد مع الأبيات المتناوبة
- Automatic parsing of odd lines as front verses (الشطر الأول) and even lines as back verses (الشطر الثاني)
- تحليل تلقائي للأسطر الفردية كشطر أول والأسطر الزوجية كشطر ثاني
- Real-time Beit count display
- عرض عدد الأبيات في الوقت الفعلي

#### Metadata Management / إدارة البيانات الوصفية
- Poem title input field
- حقل إدخال عنوان القصيدة
- Poet name field
- حقل اسم الشاعر
- Poet biography/information section
- قسم السيرة الذاتية/معلومات الشاعر
- Comments and vocabulary section for annotations
- قسم التعليقات والمفردات للملاحظات

#### Display / العرض
- Traditional two-column Beit display (front verse | divider | back verse)
- عرض البيت التقليدي بعمودين (الشطر الأول | فاصل | الشطر الثاني)
- Right-to-left (RTL) text direction support
- دعم اتجاه النص من اليمين إلى اليسار
- Professional typography with specialized Arabic fonts
- طباعة احترافية بخطوط عربية متخصصة
- Visual separators between verses
- فواصل بصرية بين الأشطر

#### Export & Sharing / التصدير والمشاركة
- Copy individual Beits to clipboard
- نسخ الأبيات الفردية إلى الحافظة
- Copy entire poem to clipboard
- نسخ القصيدة كاملة إلى الحافظة
- Export to PDF document
- تصدير إلى مستند PDF
- Export to Microsoft Word (.docx) document
- تصدير إلى مستند Microsoft Word (.docx)
- Print functionality with print-optimized layout
- وظيفة الطباعة مع تخطيط محسّن للطباعة

### 4. User Experience Goals / أهداف تجربة المستخدم
- Intuitive interface requiring no training
- واجهة بديهية لا تتطلب تدريباً
- Immediate visual feedback on all actions
- ردود فعل بصرية فورية على جميع الإجراءات
- Professional, elegant design suitable for literary content
- تصميم احترافي وأنيق مناسب للمحتوى الأدبي
- Responsive design working on all devices
- تصميم متجاوب يعمل على جميع الأجهزة
- Accessibility and readability as top priorities
- إمكانية الوصول والقراءة كأولويات قصوى

---

## 🔧 Technical Requirements / المتطلبات التقنية

### 1. Technology Stack / المجموعة التقنية

#### Frontend Framework
- **React 18.3.1** with TypeScript
- Modern hooks-based architecture
- Functional components throughout

#### Build Tool
- **Vite 5.4.2** - Fast build tool and development server
- Hot Module Replacement (HMR) for instant feedback
- Optimized production builds

#### Styling
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- Custom CSS for print media queries
- Responsive design with mobile-first approach

#### Typography
- **Google Fonts** integration:
  - `Noto Kufi Arabic` - For titles and headings
  - `Amiri Quran` - For poem text (specialized Quranic script)
  - `Readex Pro` - For general Arabic UI text

#### Icons
- **Lucide React 0.344.0** - Modern icon library
- Tree-shakeable for optimal bundle size

#### Export Libraries
- **jsPDF** - PDF generation from HTML
- **html2canvas** - HTML to canvas conversion for PDF export
- **docx** - Word document generation
- **file-saver** - Client-side file download

### 2. Architecture / البنية المعمارية

#### Component Structure
```
src/
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
├── index.css            # Global styles and Tailwind imports
├── utils/
│   └── exportUtils.ts   # PDF and Word export functionality
└── vite-env.d.ts        # TypeScript environment definitions
```

#### State Management
- React useState hooks for local component state
- No external state management library needed (appropriate for app scope)
- State includes:
  - Poem text
  - Poem title
  - Poet name and information
  - Comments and vocabulary
  - UI state (copy confirmation, etc.)

### 3. Core Functionality / الوظائف الأساسية

#### Poem Parsing Algorithm
```typescript
parsePoem(text: string): string[][]
```
- Splits input by newlines
- Filters empty lines
- Groups lines in pairs (front verse, back verse)
- Returns array of Beit pairs

#### Export Functions
```typescript
exportToPDF(elementId: string, filename: string): Promise<void>
exportToWord(poemData: PoemData, filename: string): Promise<void>
printPoem(): void
```

#### Copy to Clipboard
- Uses modern Clipboard API
- Formats Beits with tab separators
- Provides visual feedback on success

### 4. Styling Requirements / متطلبات التصميم

#### Color Scheme
- Warm amber/orange palette suitable for literary content
- Base colors: `amber-50` to `amber-900`
- Accent colors: Blue (PDF), Green (Word), Purple (Print)
- High contrast ratios for accessibility

#### Typography Scale
- Titles: `text-4xl` (36px) - Noto Kufi Arabic Bold
- Headings: `text-2xl` (24px) - Noto Kufi Arabic Semibold
- Poem text: `text-xl` (20px) - Amiri Quran
- Body text: `text-lg` (18px) - Readex Pro
- Labels: `text-sm` (14px) - Readex Pro

#### Responsive Breakpoints
- Mobile: `< 768px` (single column layout)
- Tablet: `768px - 1024px` (transitional)
- Desktop: `> 1024px` (two-column layout)

#### Print Styles
```css
@media print {
  .no-print { display: none; }
  .print-section { page-break-inside: avoid; }
  body { background: white; }
}
```

### 5. Browser Compatibility / توافق المتصفحات
- Modern browsers with ES6+ support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 6. Performance Requirements / متطلبات الأداء
- Initial load time: < 3 seconds
- Time to Interactive (TTI): < 5 seconds
- Bundle size: < 500KB (gzipped)
- Smooth 60fps animations and transitions
- Efficient re-renders using React memoization where needed

### 7. Accessibility / إمكانية الوصول
- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- High contrast text-to-background ratios
- RTL language support
- Screen reader friendly

### 8. Export Specifications / مواصفات التصدير

#### PDF Export
- A4 page format (210mm × 297mm)
- Portrait orientation
- 2x resolution for high-quality output
- Multi-page support with automatic pagination
- Includes all sections: title, poet info, poem, comments

#### Word Export
- .docx format (Office Open XML)
- RTL text direction
- Proper Arabic font embedding
- Tab-separated verses for alignment
- Heading styles for structure
- 1440 twips margins (1 inch)

#### Print Layout
- Removes UI controls and backgrounds
- Optimized for A4 paper
- Page break prevention for poem sections
- Clean white background

### 9. Development Requirements / متطلبات التطوير

#### Scripts
```json
{
  "dev": "vite",                    // Development server
  "build": "vite build",            // Production build
  "preview": "vite preview",        // Preview production build
  "typecheck": "tsc --noEmit",      // TypeScript checking
  "lint": "eslint ."                // Code linting
}
```

#### Code Quality
- TypeScript strict mode
- ESLint configuration
- Consistent code formatting
- Component modularity
- Utility function separation

### 10. Future Enhancement Possibilities / إمكانيات التحسين المستقبلية
- Database integration for poem storage (Supabase ready)
- User authentication and poem collections
- Sharing via social media
- Multiple poem sea (بحر) detection
- Diacritical mark (tashkeel) highlighting
- Audio recording integration
- Collaborative editing
- Translation support
- Advanced typography controls
- Theme customization

---

## 📦 Dependencies / التبعيات

### Production Dependencies
```json
{
  "@supabase/supabase-js": "^2.57.4",
  "docx": "latest",
  "file-saver": "latest",
  "html2canvas": "latest",
  "jspdf": "latest",
  "lucide-react": "^0.344.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
}
```

### Development Dependencies
```json
{
  "@eslint/js": "^9.9.1",
  "@types/react": "^18.3.5",
  "@types/react-dom": "^18.3.0",
  "@vitejs/plugin-react": "^4.3.1",
  "autoprefixer": "^10.4.18",
  "eslint": "^9.9.1",
  "postcss": "^8.4.35",
  "tailwindcss": "^3.4.1",
  "typescript": "^5.5.3",
  "vite": "^5.4.2"
}
```

---

## 🚀 Deployment Considerations / اعتبارات النشر

### Build Output
- Static files suitable for any static hosting
- No server-side requirements
- CDN-friendly assets

### Recommended Hosting Platforms
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static file server

### Environment Variables
- None required for basic functionality
- Optional: Supabase credentials for future database features

---

## 📝 Testing Recommendations / توصيات الاختبار

### Manual Testing Checklist
- [ ] Poem input and parsing
- [ ] Title and metadata updates
- [ ] Copy to clipboard functionality
- [ ] PDF export with various poem lengths
- [ ] Word export with Arabic text
- [ ] Print preview
- [ ] Responsive design on mobile/tablet/desktop
- [ ] RTL text rendering
- [ ] Font loading and display

### Potential Automated Tests
- Unit tests for poem parsing logic
- Component rendering tests
- Export function tests
- Integration tests for user workflows

---

## 🔒 Security Considerations / الاعتبارات الأمنية

- Client-side only application (no data transmission)
- No user authentication required
- No sensitive data storage
- No external API calls
- Safe clipboard API usage
- XSS protection through React's built-in escaping

---

## 📖 Documentation / التوثيق

See README.md for:
- Installation instructions
- Usage guide
- Feature documentation
- Screenshots and examples
- Contributing guidelines
- License information
