import { useState } from 'react';
import { BookOpen, Copy, Check } from 'lucide-react';

function App() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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
وغدًا نحاولُ أن نُرمّمَ جِيدَه
طفلٌ يلوّنُ بالرصاصِ دفاتراً
يا ربُّ، من يرثي الطفولةَ الفقيدة؟
أحجارُنا كتبٌ، وساحاتُ الدمى
منفىً، وحلمُ العائدينَ قصيدة
من ذا يُعيدُ لنا المدى متّسعًا؟
من ذا يُعيدُ لنا الحياةَ الجديدة؟
غزّة، سلامًا… رغم كلِّ جراحِنا
نكتبكِ حُبًّا، والقلوبُ شريدة`;

  const [poemText, setPoemText] = useState(examplePoem);
  const beits = parsePoem(poemText);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-amber-800" strokeWidth={1.5} />
            <h1 className="text-4xl font-bold text-amber-900">عرض الشعر العربي</h1>
          </div>
          <p className="text-amber-700 text-lg">Arabic Poetry Presentation</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-amber-900">إدخال القصيدة</h2>
              <span className="text-sm text-amber-600">Poem Input</span>
            </div>
            <textarea
              dir="rtl"
              value={poemText}
              onChange={(e) => setPoemText(e.target.value)}
              className="w-full h-96 p-4 border-2 border-amber-200 rounded-lg focus:border-amber-400 focus:outline-none font-arabic text-lg leading-relaxed resize-none"
              placeholder="الصق القصيدة هنا...&#10;كل سطر يمثل شطراً&#10;الأسطر الفردية: الشطر الأول&#10;الأسطر الزوجية: الشطر الثاني"
            />
            <p className="text-sm text-amber-600 mt-3 text-right">
              عدد الأبيات: {beits.length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-amber-900">العرض التقليدي</h2>
              <button
                onClick={copyFullPoem}
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                {copiedIndex === -1 ? (
                  <><Check className="w-4 h-4" /> تم النسخ</>
                ) : (
                  <><Copy className="w-4 h-4" /> نسخ القصيدة</>
                )}
              </button>
            </div>

            <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
              {beits.map(([frontVerse, backVerse], index) => (
                <div
                  key={index}
                  className="group relative"
                >
                  <div
                    dir="rtl"
                    className="flex justify-between items-start gap-8 p-4 rounded-lg hover:bg-amber-50 transition-colors border border-transparent hover:border-amber-200"
                  >
                    <div className="text-right flex-1 text-lg leading-relaxed text-gray-800 font-arabic">
                      {frontVerse}
                    </div>
                    <div className="w-px bg-amber-300 self-stretch" />
                    <div className="text-right flex-1 text-lg leading-relaxed text-gray-800 font-arabic">
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

        <div className="bg-white rounded-xl shadow-lg p-8 border border-amber-200">
          <h2 className="text-2xl font-bold text-amber-900 text-center mb-6">القصيدة الكاملة</h2>
          <div className="space-y-8">
            {beits.map(([frontVerse, backVerse], index) => (
              <div
                key={index}
                dir="rtl"
                className="flex justify-between items-start gap-12 px-6 py-3 hover:bg-amber-50 transition-colors rounded-lg"
              >
                <div className="text-right flex-1 text-xl leading-relaxed text-gray-900 font-arabic">
                  {frontVerse}
                </div>
                <div className="w-0.5 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-300 self-stretch" />
                <div className="text-right flex-1 text-xl leading-relaxed text-gray-900 font-arabic">
                  {backVerse}
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-12 text-center text-amber-700">
          <p className="text-sm">
            تطبيق لعرض الشعر العربي بالطريقة التقليدية - كل بيت في سطر واحد
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
