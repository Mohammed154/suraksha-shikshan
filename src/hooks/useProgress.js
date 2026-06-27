import { useEffect, useState, useCallback } from 'react';
import {
  doc, getDoc, setDoc, updateDoc, arrayUnion, serverTimestamp
} from 'firebase/firestore';
import { db, ensureAnonymousAuth } from '../firebase/config.js';

const SESSION_KEY = 'ss_session_id';

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

  // Load progress from Firestore on mount
  useEffect(() => {
    async function load() {
      try {
        await ensureAnonymousAuth();
        const ref  = doc(db, 'userProgress', sessionId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProgress(snap.data());
        } else {
          // First visit — create the document
          await setDoc(ref, {
            ...progress,
            sessionId,
            createdAt: serverTimestamp(),
          });
        }
      } catch (e) {
        console.warn('Progress load failed (offline?):', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markLessonComplete = useCallback(async (lessonId) => {
    try {
      const ref = doc(db, 'userProgress', sessionId);
      await updateDoc(ref, {
        lessonsCompleted: arrayUnion(lessonId),
        updatedAt: serverTimestamp(),
      });
      setProgress((p) => ({
        ...p,
        lessonsCompleted: [...new Set([...p.lessonsCompleted, lessonId])],
      }));
    } catch (e) {
      console.warn('markLessonComplete failed:', e);
    }
  }, [sessionId]);

  const saveQuizScore = useCallback(async (lessonId, score, total) => {
    try {
      const ref   = doc(db, 'userProgress', sessionId);
      const entry = { lessonId, score, total, date: new Date().toISOString() };
      await updateDoc(ref, {
        quizScores: arrayUnion(entry),
        updatedAt: serverTimestamp(),
      });
      setProgress((p) => ({ ...p, quizScores: [...p.quizScores, entry] }));
    } catch (e) {
      console.warn('saveQuizScore failed:', e);
    }
  }, [sessionId]);

  const earnBadge = useCallback(async (badgeId) => {
    try {
      const ref = doc(db, 'userProgress', sessionId);
      await updateDoc(ref, {
        badgesEarned: arrayUnion(badgeId),
        updatedAt: serverTimestamp(),
      });
      setProgress((p) => ({
        ...p,
        badgesEarned: [...new Set([...p.badgesEarned, badgeId])],
      }));
    } catch (e) {
      console.warn('earnBadge failed:', e);
    }
  }, [sessionId]);

  const isLessonComplete  = (id) => progress.lessonsCompleted.includes(id);
  const hasBadge          = (id) => progress.badgesEarned.includes(id);

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
