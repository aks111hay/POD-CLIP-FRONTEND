// Basic CSS version (without Tailwind)
// Ensure you have a styles.css file with matching class names

import React, { useState } from 'react';
import { uploadClip, getSummary } from './api';
import { motion } from 'framer-motion';
import './styles.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

const App = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const uploadRes = await uploadClip(youtubeUrl, startTime, endTime, API_BASE_URL);
      const path = uploadRes.path;
      const summaryRes = await getSummary(path, API_BASE_URL);
      setSummary(summaryRes.summary);
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="form-box"
      >
        <h1 className="title">🎙️ Pod-Clip Summarizer</h1>

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="YouTube URL"
            className="input"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            required
          />
          <div className="input-group">
            <input
              type="text"
              placeholder="Start Time (e.g. 00:00)"
              className="input"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="End Time (e.g. 02:30)"
              className="input"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? '⏳ Processing...' : 'Summarize'}
          </button>
        </form>

        {summary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="summary-box"
          >
            <h2 className="summary-title">🔍 Summary:</h2>
            <p>{summary}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default App;
