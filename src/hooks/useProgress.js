import { useEffect, useState, useCallback } from 'react';

const SESSION_KEY = 'ss_session_id';
const PROGRESS_PREFIX = 'ss_progress_';

function getOrCreateSessionId() {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = 'sess_' + Math.random().toString(36).slice(2) + Date.now();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function useProgress() {
  const [progress, setProgress] = useState({
    lessonsCompleted: [],
    quizScores: [],
    badgesEarned: [],
    confidenceRating: null,
    language: 'gu',
  });
  const [loading, setLoading] = useState(true);
  const sessionId = getOrCreateSessionId();
  const progressKey = `${PROGRESS_PREFIX}${sessionId}`;

  // Load progress from localStorage on mount
  useEffect(() => {
    async function load() {
      try {
        const localData = localStorage.getItem(progressKey);
        if (localData) {
          setProgress(JSON.parse(localData));
        } else {
          // First visit — create the local record
          const initialData = {
            lessonsCompleted: [],
            quizScores: [],
            badgesEarned: [],
            confidenceRating: null,
            language: 'gu',
            sessionId,
            createdAt: new Date().toISOString(),
          };
          localStorage.setItem(progressKey, JSON.stringify(initialData));
          setProgress(initialData);
        }
      } catch (e) {
        console.warn('Progress load failed:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [progressKey, sessionId]);

  const markLessonComplete = useCallback(async (lessonId) => {
    try {
      const localData = localStorage.getItem(progressKey);
      let data = localData ? JSON.parse(localData) : { lessonsCompleted: [] };
      
      const newLessons = [...new Set([...(data.lessonsCompleted || []), lessonId])];
      data.lessonsCompleted = newLessons;
      data.updatedAt = new Date().toISOString();
      
      localStorage.setItem(progressKey, JSON.stringify(data));
      setProgress(data);
    } catch (e) {
      console.warn('markLessonComplete failed:', e);
    }
  }, [progressKey]);

  const saveQuizScore = useCallback(async (lessonId, score, total) => {
    try {
      const localData = localStorage.getItem(progressKey);
      let data = localData ? JSON.parse(localData) : { quizScores: [] };
      
      const entry = { lessonId, score, total, date: new Date().toISOString() };
      data.quizScores = [...(data.quizScores || []), entry];
      data.updatedAt = new Date().toISOString();
      
      localStorage.setItem(progressKey, JSON.stringify(data));
      setProgress(data);
    } catch (e) {
      console.warn('saveQuizScore failed:', e);
    }
  }, [progressKey]);

  const earnBadge = useCallback(async (badgeId) => {
    try {
      const localData = localStorage.getItem(progressKey);
      let data = localData ? JSON.parse(localData) : { badgesEarned: [] };
      
      const newBadges = [...new Set([...(data.badgesEarned || []), badgeId])];
      data.badgesEarned = newBadges;
      data.updatedAt = new Date().toISOString();
      
      localStorage.setItem(progressKey, JSON.stringify(data));
      setProgress(data);
    } catch (e) {
      console.warn('earnBadge failed:', e);
    }
  }, [progressKey]);

  const isLessonComplete  = (id) => progress.lessonsCompleted?.includes(id) || false;
  const hasBadge          = (id) => progress.badgesEarned?.includes(id) || false;

  return {
    progress,
    loading,
    markLessonComplete,
    saveQuizScore,
    earnBadge,
    isLessonComplete,
    hasBadge,
  };
}
