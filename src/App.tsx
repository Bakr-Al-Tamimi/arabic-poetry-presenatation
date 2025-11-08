import { useState, useRef, useEffect } from 'react';
import { BookOpen, Copy, Check, FileDown, Printer } from 'lucide-react';
import { exportToPDF, exportToWord, printPoem } from './utils/exportUtils';

function App() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const parsePoem = (text: string): string[][] => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const beits: string[][] = [];

    for (let i = 0; i < lines.length; i += 2) {
      if (i + 1 < lines.length) {
        beits.push([lines[i].trim(), lines[i + 1].trim()]);
      }
    }

    return beits;
  };

  const examplePoem = `غزّةُ تبكي… والسماءُ شهيدة
والأرضُ من وجعِ الحصارِ وليدة
بيتٌ تناثرَ مثلَ حلمٍ غائمٍ
وأمٌّ تنادي: أينَ صوتُ وليدة؟
سقطتْ نوافذُنا على أعمارِنا
وغدًا نحاولُ أننعيش عنيدة
طفلٌ يلوّنُ بالرصاصِ دفاتراً
يا ربُّ، من يرثي البريئ فقيدة؟
أحجارُنا كتبٌ، وساحاتُ الدمى
منفىً، وحلمُ العائدينَ قصيدة
من ذا يُعيدُ لنا المدى متّسعًا؟
من ذا يُعيدُ لنا الحياةَ جديدة؟
غزّة، سلامًا… رغم كلِّ جراحِنا
نكتبكِ حُبًّا، والقلوبُ شريدة`;

  const [poemText, setPoemText] = useState(examplePoem);
  const [poemTitle, setPoemTitle] = useState('غزّة تبكي');
  const [poetName, setPoetName] = useState('ندى - ذكاء اصطناعي');
  const [poetInfo, setPoetInfo] = useState('شخصية ذكاء اصطناعي من العصر الحديث، صُممت لتجسّد شاعرة مبدعة وُلدت عام 1990. تخرّجت في الأدب الإنجليزي، ثم نالت درجة الماجستير في الدراسات الثقافية العربية. تُعدّ ندى من رائدات الشعر النسائي الحداثي في الوطن العربي، حيث تمزج في أعمالها بين عمق الثقافة العربية والتأثيرات العالمية الحديثة. تتناول قصائدها موضوعات الحب الحديث، والحريات الفردية، والهوية الثقافية، والتحديات الاجتماعية التي تواجه المرأة في العالم العربي المعاصر، وذلك بأسلوب يجمع بين الرومانسية الكلاسيكية والتجريب الشعري الحديث.');
  const [comments, setComments] = useState('');

  const beits = parsePoem(poemText);

  useEffect(() => {
    const updateTitle = () => {
      const titleParts = [];
      if (poemTitle) titleParts.push(poemTitle);
      if (poetName) titleParts.push(`- ${poetName}`);
      const newTitle = titleParts.length > 0 ? titleParts.join(' ') : 'عرض الشعر العربي';

      if (document.title !== newTitle) {
        document.title = newTitle;
      }
    };

    const timeoutId = setTimeout(updateTitle, 0);
    return () => clearTimeout(timeoutId);
  }, [poemTitle, poetName]);

  const copyBeit = async (frontVerse: string, backVerse: string, index: number) => {
    const formattedBeit = `${frontVerse}\t\t${backVerse}`;
    await navigator.clipboard.writeText(formattedBeit);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyFullPoem = async () => {
    const formatted = beits
      .map(([front, back]) => `${front}\t\t${back}`)
      .join('\n\n');
    await navigator.clipboard.writeText(formatted);
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleExportPDF = async () => {
    if (exportRef.current) {
      await exportToPDF('exportable-content', `${poemTitle || 'poem'}.pdf`);
    }
  };

  const handleExportWord = async () => {
    await exportToWord(
      {
        title: poemTitle,
        poetName,
        poetInfo,
        beits,
        comments,
      },
      `${poemTitle || 'poem'}.docx`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <header className="text-center mb-12 no-print">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-amber-800" strokeWidth={1.5} />
            <h1 className="text-4xl font-bold text-amber-900 font-title">عرض الشعر العربي</h1>
          </div>
          <p className="text-amber-700 text-lg">Arabic Poetry Presentation</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 mb-8 no-print">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Title and Poet Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
              <h2 className="text-xl font-semibold text-amber-900 mb-4 font-title">معلومات القصيدة</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2 text-right font-arabic">
                    عنوان القصيدة
                  </label>
                  <input
                    dir="rtl"
                    type="text"
                    value={poemTitle}
                    onChange={(e) => setPoemTitle(e.target.value)}
                    className="w-full p-3 border-2 border-amber-200 rounded-lg focus:border-amber-400 focus:outline-none font-title text-lg"
                    placeholder="أدخل عنوان القصيدة"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2 text-right font-arabic">
                    اسم الشاعر
                  </label>
                  <input
                    dir="rtl"
                    type="text"
                    value={poetName}
                    onChange={(e) => setPoetName(e.target.value)}
                    className="w-full p-3 border-2 border-amber-200 rounded-lg focus:border-amber-400 focus:outline-none font-arabic text-lg"
                    placeholder="أدخل اسم الشاعر"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2 text-right font-arabic">
                    نبذة عن الشاعر
                  </label>
                  <textarea
                    dir="rtl"
                    value={poetInfo}
                    onChange={(e) => setPoetInfo(e.target.value)}
                    className="w-full p-3 border-2 border-amber-200 rounded-lg focus:border-amber-400 focus:outline-none font-arabic leading-relaxed resize-none"
                    rows={4}
                    placeholder="معلومات عن الشاعر، حياته، أعماله..."
                  />
                </div>
              </div>
            </div>

            {/* Poem Input */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-amber-900 font-title">إدخال القصيدة</h2>
                <span className="text-sm text-amber-600">Poem Input</span>
              </div>
              <textarea
                dir="rtl"
                value={poemText}
                onChange={(e) => setPoemText(e.target.value)}
                className="w-full h-96 p-4 border-2 border-amber-200 rounded-lg focus:border-amber-400 focus:outline-none font-poem text-lg leading-relaxed resize-none"
                placeholder="الصق القصيدة هنا...&#10;كل سطر يمثل شطراً&#10;الأسطر الفردية: الشطر الأول&#10;الأسطر الزوجية: الشطر الثاني"
              />
              <p className="text-sm text-amber-600 mt-3 text-right font-arabic">
                عدد الأبيات: {beits.length}
              </p>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
              <h2 className="text-xl font-semibold text-amber-900 mb-4 font-title">التعليقات والمفردات</h2>
              <textarea
                dir="rtl"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full h-48 p-4 border-2 border-amber-200 rounded-lg focus:border-amber-400 focus:outline-none font-arabic leading-relaxed resize-none"
                placeholder="أضف تعليقات، شرح مفردات، تحليل أدبي، أو أي ملاحظات حول القصيدة..."
              />
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-amber-900 font-title">العرض التقليدي</h2>
              <button
                onClick={copyFullPoem}
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-arabic"
              >
                {copiedIndex === -1 ? (
                  <><Check className="w-4 h-4" /> تم النسخ</>
                ) : (
                  <><Copy className="w-4 h-4" /> نسخ القصيدة</>
                )}
              </button>
            </div>

            <div className="space-y-6 max-h-[800px] overflow-y-auto pr-2">
              {beits.map(([frontVerse, backVerse], index) => (
                <div key={index} className="group relative">
                  <div
                    dir="rtl"
                    className="flex justify-between items-start gap-8 p-4 rounded-lg hover:bg-amber-50 transition-colors border border-transparent hover:border-amber-200"
                  >
                    <div className="text-right flex-1 text-lg leading-relaxed text-gray-800 font-poem">
                      {frontVerse}
                    </div>
                    <div className="w-px bg-amber-300 self-stretch" />
                    <div className="text-right flex-1 text-lg leading-relaxed text-gray-800 font-poem">
                      {backVerse}
                    </div>
                  </div>
                  <button
                    onClick={() => copyBeit(frontVerse, backVerse, index)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-amber-100 rounded-lg hover:bg-amber-200"
                    title="نسخ البيت"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-amber-700" />
                    ) : (
                      <Copy className="w-4 h-4 text-amber-700" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex justify-center gap-4 mb-8 no-print">
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-arabic shadow-lg"
          >
            <FileDown className="w-5 h-5" />
            تصدير PDF
          </button>
          <button
            onClick={handleExportWord}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-arabic shadow-lg"
          >
            <FileDown className="w-5 h-5" />
            تصدير Word
          </button>
          <button
            onClick={printPoem}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-arabic shadow-lg"
          >
            <Printer className="w-5 h-5" />
            طباعة
          </button>
        </div>

        {/* Full Poem Display - Printable/Exportable */}
        <div id="exportable-content" ref={exportRef} className="bg-white rounded-xl shadow-lg p-12 border border-amber-200 print-section">
          {/* Title Section */}
          <div className="text-center mb-8 border-b-2 border-amber-300 pb-6">
            <h1 className="text-4xl font-bold text-amber-900 mb-4 font-title">{poemTitle}</h1>
            {poetName && (
              <p className="text-xl text-amber-800 font-arabic">
                <span className="font-semibold">الشاعر: </span>
                {poetName}
              </p>
            )}
          </div>

          {/* Poet Info */}
          {poetInfo && (
            <div className="mb-8 p-6 bg-amber-50 rounded-lg">
              <h3 className="text-lg font-semibold text-amber-900 mb-3 text-right font-title">
                نبذة عن الشاعر
              </h3>
              <p dir="rtl" className="text-gray-700 leading-relaxed text-right font-arabic whitespace-pre-wrap">
                {poetInfo}
              </p>
            </div>
          )}

          {/* Poem */}
          <div className="space-y-8 mb-8">
            {beits.map(([frontVerse, backVerse], index) => (
              <div
                key={index}
                dir="rtl"
                className="flex justify-between items-start gap-12 px-6 py-3"
              >
                <div className="text-right flex-1 text-xl leading-relaxed text-gray-900 font-poem">
                  {frontVerse}
                </div>
                <div className="w-0.5 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-300 self-stretch" />
                <div className="text-right flex-1 text-xl leading-relaxed text-gray-900 font-poem">
                  {backVerse}
                </div>
              </div>
            ))}
          </div>

          {/* Comments and Vocabulary */}
          {comments && (
            <div className="mt-12 pt-8 border-t-2 border-amber-300">
              <h3 className="text-2xl font-bold text-amber-900 mb-4 text-right font-title">
                التعليقات والمفردات
              </h3>
              <div dir="rtl" className="text-gray-700 leading-relaxed text-right font-arabic whitespace-pre-wrap">
                {comments}
              </div>
            </div>
          )}
        </div>

        <footer className="mt-12 text-center text-amber-700 no-print">
          <p className="text-sm font-arabic">
            تطبيق لعرض الشعر العربي بالطريقة التقليدية - كل بيت في سطر واحد
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
