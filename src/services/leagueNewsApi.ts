import axios from "axios";

const leagueNewsClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

// Shared compulsory filters
const compulsoryFilters = {
  scheduledBefore: new Date().toISOString(),
};

// Fetch AI articles by leagueId
export const fetchLeagueNewsWithLeagueId = async (
  leagueId: string,
  params?: any
) => {
  try {
    const response = await leagueNewsClient.get("/ai-articles", {
      params: {
        leagueId,
        ...params,
        ...compulsoryFilters,
      },
    });
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching AI articles by league ID:", error);
    throw error;
  }
};

// Full-text search in AI articles
export const fetchNewsWithSearch = async (
  searchQuery: string,
  params?: any
) => {
  try {
    const response = await leagueNewsClient.get("/ai-articles", {
      params: {
        search: searchQuery,
        ...params,
        ...compulsoryFilters,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching AI articles with search:", error);
    throw error;
  }
};

// Fetch top AI articles by trending keywords
export const fetchTopNewsByTrendingKeywords = async (
  keywords: string[],
  params?: any
) => {
  try {
    const response = await leagueNewsClient.get("/ai-articles", {
      params: {
        keywords,
        sortByKeywords: true,
        ...params,
        ...compulsoryFilters,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching AI articles by keywords:", error);
    throw error;
  }
};

export default leagueNewsClient;
