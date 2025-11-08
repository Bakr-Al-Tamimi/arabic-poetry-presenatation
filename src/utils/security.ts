import DOMPurify from 'dompurify';

const MAX_TEXT_LENGTH = 50000;
const MAX_TITLE_LENGTH = 200;
const MAX_NAME_LENGTH = 200;
const RATE_LIMIT_MS = 2000;

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

export interface PersistedState {
  poemText: string;
  poemTitle: string;
  poetName: string;
  poetInfo: string;
  comments: string;
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
