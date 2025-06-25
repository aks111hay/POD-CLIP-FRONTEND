export const uploadClip = async (youtubeUrl, startTime, endTime, baseURL) => {
  const formData = new FormData();
  formData.append('youtube_url', youtubeUrl);
  formData.append('start_time', startTime);
  formData.append('end_time', endTime);

  const res = await fetch(`${baseURL}/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
};

export const getSummary = async (path, baseUrl) => {
  const res = await fetch(`${baseUrl}/summarize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ path }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Failed to fetch summary');
  }

  return res.json();
};
