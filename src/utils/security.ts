import DOMPurify from 'dompurify';

const MAX_TEXT_LENGTH = 50000;
const MAX_TITLE_LENGTH = 200;
const MAX_NAME_LENGTH = 200;
const RATE_LIMIT_MS = 2000;
const MAX_POEMS = 50;

let lastExportTime = 0;

export const sanitizeText = (text: string, maxLength = MAX_TEXT_LENGTH): string => {
  if (!text) return '';

  const trimmed = text.slice(0, maxLength);

  return DOMPurify.sanitize(trimmed, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  });
};

export const sanitizeTitle = (title: string): string => {
  return sanitizeText(title, MAX_TITLE_LENGTH);
};

export const sanitizeName = (name: string): string => {
  return sanitizeText(name, MAX_NAME_LENGTH);
};

export const checkRateLimit = (): boolean => {
  const now = Date.now();
  if (now - lastExportTime < RATE_LIMIT_MS) {
    return false;
  }
  lastExportTime = now;
  return true;
};

export const STORAGE_KEY = 'arabic_poetry_state';
export const POEMS_LIBRARY_KEY = 'arabic_poetry_library';

export interface PersistedState {
  poemText: string;
  poemTitle: string;
  poetName: string;
  poetInfo: string;
  comments: string;
  lastUpdated: number;
}

export interface SavedPoem {
  id: string;
  title: string;
  poetName: string;
  poetInfo: string;
  poemText: string;
  comments: string;
  savedAt: number;
  lastUpdated: number;
}

export const saveState = (state: Omit<PersistedState, 'lastUpdated'>): void => {
  try {
    const persistedState: PersistedState = {
      ...state,
      lastUpdated: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedState));
  } catch (error) {
    console.error('Failed to save state:', error);
  }
};

export const loadState = (): PersistedState | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const state = JSON.parse(stored) as PersistedState;

    const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - state.lastUpdated > ONE_WEEK) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return {
      poemText: sanitizeText(state.poemText),
      poemTitle: sanitizeTitle(state.poemTitle),
      poetName: sanitizeName(state.poetName),
      poetInfo: sanitizeText(state.poetInfo),
      comments: sanitizeText(state.comments),
      lastUpdated: state.lastUpdated,
    };
  } catch (error) {
    console.error('Failed to load state:', error);
    return null;
  }
};

export const getSavedPoems = (): SavedPoem[] => {
  try {
    const stored = localStorage.getItem(POEMS_LIBRARY_KEY);
    if (!stored) return [];

    const poems = JSON.parse(stored) as SavedPoem[];
    const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

    const validPoems = poems.filter(poem => {
      return Date.now() - poem.lastUpdated < ONE_WEEK;
    });

    if (validPoems.length !== poems.length) {
      localStorage.setItem(POEMS_LIBRARY_KEY, JSON.stringify(validPoems));
    }

    return validPoems.map(poem => ({
      ...poem,
      title: sanitizeTitle(poem.title),
      poetName: sanitizeName(poem.poetName),
      poetInfo: sanitizeText(poem.poetInfo),
      poemText: sanitizeText(poem.poemText),
      comments: sanitizeText(poem.comments),
    }));
  } catch (error) {
    console.error('Failed to load poems:', error);
    return [];
  }
};

export const savePoem = (poem: Omit<SavedPoem, 'id' | 'savedAt' | 'lastUpdated'>): string => {
  try {
    const poems = getSavedPoems();
    const id = `poem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const newPoem: SavedPoem = {
      ...poem,
      id,
      savedAt: Date.now(),
      lastUpdated: Date.now(),
    };

    poems.push(newPoem);
    localStorage.setItem(POEMS_LIBRARY_KEY, JSON.stringify(poems));
    return id;
  } catch (error) {
    console.error('Failed to save poem:', error);
    throw new Error('فشل حفظ القصيدة');
  }
};

export const deletePoem = (id: string): void => {
  try {
    const poems = getSavedPoems();
    const filtered = poems.filter(poem => poem.id !== id);
    localStorage.setItem(POEMS_LIBRARY_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete poem:', error);
    throw new Error('فشل حذف القصيدة');
  }
};

export const updatePoem = (id: string, updates: Partial<Omit<SavedPoem, 'id' | 'savedAt'>>): void => {
  try {
    const poems = getSavedPoems();
    const index = poems.findIndex(poem => poem.id === id);

    if (index === -1) {
      throw new Error('القصيدة غير موجودة');
    }

    poems[index] = {
      ...poems[index],
      ...updates,
      lastUpdated: Date.now(),
    };

    localStorage.setItem(POEMS_LIBRARY_KEY, JSON.stringify(poems));
  } catch (error) {
    console.error('Failed to update poem:', error);
    throw new Error('فشل تحديث القصيدة');
  }
};
