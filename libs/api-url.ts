const getApiUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://tuibenguoita.vercel.app";
  } else if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  } else {
    return "http://localhost:3000";
  }
};

export default getApiUrl;
