export const formatReadably = (isoString) => {
  if (!isoString) {
    return 'N/A';
  }

  const dateObject = new Date(isoString);

  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };

  try {
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(dateObject);

    const day = parts.find((p) => p.type === 'day')?.value;
    const month = parts.find((p) => p.type === 'month')?.value;
    const year = parts.find((p) => p.type === 'year')?.value;

    return `${day} ${month}, ${year}`;
  } catch (error) {
    console.error('Date Format Error:', error);
    return 'Date Format Error';
  }
};

export const formatTime = (isoString) => {
  if (!isoString) return '';
  const dateObject = new Date(isoString);
  return dateObject.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};
