/*
 * feedback-storage.js
 * Stores feedback entries in browser localStorage.
 * This file is used by script.js to save each submitted feedback.
 */

const FEEDBACK_STORAGE_KEY = 'portfolioFeedbackEntries';

function saveFeedbackEntry(entry) {
  try {
    const stored = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    const feedbackList = stored ? JSON.parse(stored) : [];
    feedbackList.push(entry);
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedbackList));
    return true;
  } catch (error) {
    console.error('saveFeedbackEntry error:', error);
    return false;
  }
}

function getFeedbackEntries() {
  try {
    const stored = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('getFeedbackEntries error:', error);
    return [];
  }
}

function clearFeedbackEntries() {
  localStorage.removeItem(FEEDBACK_STORAGE_KEY);
}

window.saveFeedbackEntry = saveFeedbackEntry;
window.getFeedbackEntries = getFeedbackEntries;
window.clearFeedbackEntries = clearFeedbackEntries;
