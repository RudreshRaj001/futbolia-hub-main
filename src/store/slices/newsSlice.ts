import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchNewsWithSearch,
  fetchTopNewsByTrendingKeywords,
} from "@/services/leagueNewsApi";
import { AiArticle, AiArticleResponse } from "@/types/api";

interface NewsState {
  news: AiArticle[];
  currentPage: number;
  totalPages: number;
  totalNews: number;
  limit: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NewsState = {
  news: [],
  currentPage: 1,
  totalPages: 1,
  totalNews: 0,
  limit: 10,
  status: "idle",
  error: null,
};

// Thunk to fetch AI articles with filters
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (
    params: {
      search?: string;
      category?: string;
      startDate?: string;
      endDate?: string;
      sort?: string;
      order?: string;
      page?: number;
      limit?: number;
      leagueId?: string;
      leagueName?: string;
      keywords?: string[];
      createdAfter?: string;
      createdBefore?: string;
      updatedAfter?: string;
      updatedBefore?: string;
      hasLeague?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const queryParams = {
        ...params,
        page: params.page || 1,
        limit: params.limit || 10,
        sort: params.sort || "createdAt",
        order: params.order || "desc",
      };
      const data = await fetchNewsWithSearch("", queryParams);
      return data as AiArticleResponse;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch news");
    }
  }
);

// Thunk to fetch top AI articles based on trending keywords
export const fetchTopTrendingNews = createAsyncThunk(
  "news/fetchTopTrendingNews",
  async (
    params: {
      keywords: string[];
      limit?: number;
      page?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchTopNewsByTrendingKeywords(params.keywords, {
        limit: params.limit || 10,
        page: params.page || 1,
      });
      return data as AiArticleResponse;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch trending news");
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchNews.fulfilled,
        (state, action: PayloadAction<AiArticleResponse>) => {
          state.status = "succeeded";
          state.news = action.payload.data;
          state.currentPage = action.payload.meta.currentPage;
          state.totalPages = action.payload.meta.totalPages;
          state.totalNews = action.payload.meta.totalFeeds;
          state.limit = action.payload.meta.limit;
        }
      )
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Top trending news
      .addCase(fetchTopTrendingNews.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchTopTrendingNews.fulfilled,
        (state, action: PayloadAction<AiArticleResponse>) => {
          state.status = "succeeded";
          state.news = action.payload.data;
          state.currentPage = action.payload.meta.currentPage;
          state.totalPages = action.payload.meta.totalPages;
          state.totalNews = action.payload.meta.totalFeeds;
          state.limit = action.payload.meta.limit;
        }
      )
      .addCase(fetchTopTrendingNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default newsSlice.reducer;
