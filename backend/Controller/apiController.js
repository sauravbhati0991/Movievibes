exports.getApiKey = (req, res) => {
  const ApiKey = process.env.TMDB_API_KEY;
  res.status(200).json({ ApiKey });
};
