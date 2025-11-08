import { useState } from 'react';
import { Save, FolderOpen, Trash2, X, FileText } from 'lucide-react';
import { getSavedPoems, savePoem, deletePoem, SavedPoem } from '../utils/security';

interface PoemLibraryProps {
  currentPoem: {
    title: string;
    poetName: string;
    poetInfo: string;
    poemText: string;
    comments: string;
  };
  onLoadPoem: (poem: SavedPoem) => void;
  onNewPoem: () => void;
}

export default function PoemLibrary({ currentPoem, onLoadPoem, onNewPoem }: PoemLibraryProps) {
  const [showLibrary, setShowLibrary] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveTitle, setSaveTitle] = useState('');
  const [savedPoems, setSavedPoems] = useState<SavedPoem[]>([]);

  const handleOpenLibrary = () => {
    setSavedPoems(getSavedPoems());
    setShowLibrary(true);
  };

  const handleSavePoem = () => {
    setSaveTitle(currentPoem.title || 'قصيدة بدون عنوان');
    setShowSaveDialog(true);
  };

  const confirmSave = () => {
    try {
      savePoem({
        title: saveTitle || 'قصيدة بدون عنوان',
        poetName: currentPoem.poetName,
        poetInfo: currentPoem.poetInfo,
        poemText: currentPoem.poemText,
        comments: currentPoem.comments,
      });
      setShowSaveDialog(false);
      alert('تم حفظ القصيدة بنجاح!');
    } catch (error) {
      alert('فشل حفظ القصيدة. حاول مرة أخرى.');
    }
  };

  const handleDeletePoem = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه القصيدة؟')) {
      try {
        deletePoem(id);
        setSavedPoems(getSavedPoems());
        alert('تم حذف القصيدة');
      } catch (error) {
        alert('فشل حذف القصيدة');
      }
    }
  };

  const handleLoadPoem = (poem: SavedPoem) => {
    onLoadPoem(poem);
    setShowLibrary(false);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <div className="flex gap-3">
        <button
          onClick={handleSavePoem}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-arabic shadow-md"
        >
          <Save className="w-5 h-5" />
          حفظ القصيدة
        </button>
        <button
          onClick={handleOpenLibrary}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-arabic shadow-md"
        >
          <FolderOpen className="w-5 h-5" />
          مكتبة القصائد
        </button>
        <button
          onClick={onNewPoem}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-arabic shadow-md"
        >
          <FileText className="w-5 h-5" />
          قصيدة جديدة
        </button>
      </div>

      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-amber-900 font-title">حفظ القصيدة</h3>
              <button
                onClick={() => setShowSaveDialog(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-amber-800 mb-2 text-right font-arabic">
                عنوان القصيدة
              </label>
              <input
                dir="rtl"
                type="text"
                value={saveTitle}
                onChange={(e) => setSaveTitle(e.target.value)}
                className="w-full p-3 border-2 border-amber-200 rounded-lg focus:border-amber-400 focus:outline-none font-arabic text-lg"
                placeholder="أدخل عنوان القصيدة"
                autoFocus
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-arabic"
              >
                إلغاء
              </button>
              <button
                onClick={confirmSave}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-arabic"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}

      {showLibrary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-amber-200">
              <h3 className="text-2xl font-bold text-amber-900 font-title">مكتبة القصائد</h3>
              <button
                onClick={() => setShowLibrary(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {savedPoems.length === 0 ? (
                <div className="text-center py-12">
                  <FolderOpen className="w-16 h-16 text-amber-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-arabic text-lg">
                    لا توجد قصائد محفوظة بعد
                  </p>
                  <p className="text-gray-400 font-arabic text-sm mt-2">
                    احفظ قصيدتك الأولى لتبدأ مكتبتك
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {savedPoems.map((poem) => (
                    <div
                      key={poem.id}
                      className="border-2 border-amber-200 rounded-lg p-4 hover:border-amber-400 transition-colors bg-amber-50"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h4
                            dir="rtl"
                            className="text-xl font-bold text-amber-900 mb-1 font-title truncate"
                          >
                            {poem.title}
                          </h4>
                          {poem.poetName && (
                            <p dir="rtl" className="text-amber-700 font-arabic mb-2 truncate">
                              {poem.poetName}
                            </p>
                          )}
                          <p className="text-sm text-gray-500 font-arabic">
                            حُفظت في: {formatDate(poem.savedAt)}
                          </p>
                        </div>

                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleLoadPoem(poem)}
                            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-arabic text-sm"
                          >
                            تحميل
                          </button>
                          <button
                            onClick={() => handleDeletePoem(poem.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            title="حذف"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
