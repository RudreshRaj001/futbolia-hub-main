import React, { useState, useMemo, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import CompetitionTabs from './CompetitionTabs';
import MatchItem from '@/components/calendar/MatchItem';
import CalendarNavigation from './CalendarNavigation';
import MatchStatusFilter from './MatchStatusFilter';
import TeamSearch from './TeamSearch';
import { Match, MatchStatusFilter as MatchStatusFilterType } from './types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchFixtures } from '@/store/slices/fixturesSlice';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { setLeagueInfo } from '@/store/slices/leagueInfoSlice';

const leagueMapping: Record<string, number> = {
  "Liga Pro": 242,
  "Serie B": 243,
  "Libertadores": 13,
  "Sudamericana": 11,
};

// Map UI filter status to backend-expected status strings
const apiStatusMap: Record<MatchStatusFilterType, string> = {
  ALL: '',
  FINALIZADO: 'completed',
  UPCOMING: 'upcoming',
  LIVE: 'live',
};

const convertFixtureToMatch = (item: any): Match => {
  const fixtureDate = new Date(item.fixture.date);
  const friendlyCompetition =
    Object.keys(leagueMapping).find(key => leagueMapping[key] === item.league.id) ||
    item.league.name;

  const statusShort = item.fixture.status.short;
  const statusMap: Record<string, MatchStatusFilterType> = {
    FT: 'FINALIZADO',
    NS: 'UPCOMING',
    LIVE: 'LIVE',
  };

  return {
    id: item.fixture.id,
    homeTeam: item.teams.home.name,
    awayTeam: item.teams.away.name,
    homeScore: item.goals.home != null ? String(item.goals.home) : "",
    awayScore: item.goals.away != null ? String(item.goals.away) : "",
    homeLogo: item.teams.home.logo,
    awayLogo: item.teams.away.logo,
    date: fixtureDate,
    competition: friendlyCompetition,
    status: statusMap[statusShort] || (item.fixture.status.long?.toUpperCase() as MatchStatusFilterType),
    time: fixtureDate.toLocaleTimeString("en-US", {
      timeZone: "America/Bogota",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

interface FixtureCalendarProps {
  competitions?: string[];
  defaultCompetition?: string;
  className?: string;
}

const FixtureCalendar: React.FC<FixtureCalendarProps> = ({
  competitions = ["Liga Pro", "Serie B", "Libertadores", "Sudamericana"],
  defaultCompetition = "Liga Pro",
  className,
}) => {
  const dispatch = useAppDispatch();
  const { fixtures: rawFixtures, status: fetchStatus, error } = useAppSelector(s => s.fixtures);


  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCompetition, setSelectedCompetition] = useState(defaultCompetition||'Liga Pro');
  const [statusFilter, setStatusFilter] = useState<MatchStatusFilterType>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 10;

  // Fetch fixtures when competition, status, or date changes
  useEffect(() => {
    const leagueId = leagueMapping[selectedCompetition];
    const statusParam = apiStatusMap[statusFilter];
    const params: any = { league: leagueId, season: 2025 };
    if (statusParam) params.status = statusParam;
    if (selectedDate) params.date = format(selectedDate, 'yyyy-MM-dd');
    dispatch(fetchFixtures(params));
  }, [dispatch, selectedCompetition, statusFilter, selectedDate]);

  // Reset pagination when filters change
  useEffect(() => {
    setPageIndex(1);
  }, [statusFilter, selectedCompetition, selectedDate]);

  // Clear date when switching to ALL
  useEffect(() => {
    if (statusFilter === "ALL") {
      setSelectedDate(null);
    }
  }, [statusFilter]);

  const apiData: Match[] = useMemo(() => rawFixtures?.map(convertFixtureToMatch) || [], [rawFixtures]);

  const highlightedDates = useMemo(() => {
    const dates = new Set<number>();
    apiData.forEach(m => {
      if (m.competition === selectedCompetition) {
        const d = new Date(m.date);
        d.setHours(0, 0, 0, 0);
        dates.add(d.getTime());
      }
    });
    return Array.from(dates).map(time => new Date(time));
  }, [apiData, selectedCompetition]);

  const modifiersStyles = { highlighted: { backgroundColor: '#FACC15', color: 'black', borderRadius: '50%' } };
  const isDateFiltered = selectedDate !== null;

  const filteredMatches = useMemo(() => apiData.filter(match => {
    const compMatch = match.competition === selectedCompetition;
    const statusMatch = statusFilter === 'ALL' || match.status === statusFilter;
    const dateMatch = isDateFiltered ? selectedDate!.toDateString() === match.date.toDateString() : true;
    const searchMatch = !searchQuery ||
      match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase());
    return compMatch && statusMatch && dateMatch && searchMatch;
  }), [apiData, selectedCompetition, statusFilter, selectedDate, searchQuery]);

  const isPaged = !isDateFiltered;
  const totalPages = Math.max(1, Math.ceil(filteredMatches.length / pageSize));

  const displayedMatches = useMemo(() => {
    if (isPaged) {
      const sorted = [...filteredMatches].sort((a, b) => a.date.getTime() - b.date.getTime());
      const start = (pageIndex - 1) * pageSize;
      return sorted.slice(start, start + pageSize);
    }
    return filteredMatches;
  }, [filteredMatches, isPaged, pageIndex]);

  const groupedByDate = useMemo(() => {
    const groups: Record<string, Match[]> = {};
    if (isPaged) {
      displayedMatches.forEach(m => {
        const key = m.date.toDateString();
        groups[key] = groups[key] || [];
        groups[key].push(m);
      });
    }
    return groups;
  }, [displayedMatches, isPaged]);

  // Determine which status tab to activate when a date is selected
  // Determine which status tab to activate when a date is selected
    // Determine which status tab to activate when a date is selected
  // For today, use ALL so that date filter alone applies (no status filter)
  const updateStatusForDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateTime = date.getTime();
    const todayTime = today.getTime();
    if (dateTime < todayTime) {
      // Past date → completed
      setStatusFilter('FINALIZADO');
    } else if (dateTime === todayTime) {
      // Today → no status filter, just date
      setStatusFilter('ALL');
    } else {
      // Future date → upcoming
      setStatusFilter('UPCOMING');
    }
  };

  const handleDateSelect = (date?: Date) => {
    if (date) {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      setSelectedDate(d);
      updateStatusForDate(d);
    } else {
      setSelectedDate(null);
      setStatusFilter('ALL');
    }
  };

  const handlePrevNav = () => {
    if (isPaged) setPageIndex(i => Math.max(1, i - 1));
    else if (selectedDate) {
      const d = new Date(selectedDate.getTime() - 86400000);
      d.setHours(0, 0, 0, 0);
      setSelectedDate(d);
      updateStatusForDate(d);
    }
  };

  const handleNextNav = () => {
    if (isPaged) setPageIndex(i => Math.min(totalPages, i + 1));
    else if (selectedDate) {
      const d = new Date(selectedDate.getTime() + 86400000);
      d.setHours(0, 0, 0, 0);
      setSelectedDate(d);
      updateStatusForDate(d);
    }
  };

  return (
    <div className={cn("bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden", className)}>
      <div className="p-4 bg-gray-800 text-white font-bold">Calendar</div>
      <div className="p-4">
        <CompetitionTabs
          competitions={competitions}
          defaultCompetition={defaultCompetition}
          onCompetitionChange={c => { setSelectedCompetition(c); setStatusFilter('ALL'); 
            dispatch(setLeagueInfo({ leagueName: c ||'Serie A' }))
             }}
        />
        <Tabs defaultValue={selectedCompetition} value={selectedCompetition} onValueChange={setSelectedCompetition}>
          {competitions.map(comp => (
            <TabsContent key={comp} value={comp} className="mt-0">
              <div className="mb-4">
                <Calendar
                  mode="single"
                  selected={selectedDate ?? undefined}
                  onSelect={handleDateSelect}
                  className="rounded-md border"
                  showOutsideDays
                  modifiers={{ highlighted: highlightedDates }}
                  modifiersStyles={modifiersStyles}
                />
              </div>
              <MatchStatusFilter selectedStatus={statusFilter} onStatusChange={setStatusFilter} />
              <TeamSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

              {fetchStatus === 'loading' && <p>Loading fixtures...</p>}
              {fetchStatus === 'failed' && <p>Error: {error}</p>}
              {fetchStatus === 'succeeded' && (
                <div className="mt-4">
                  {displayedMatches.length ? (
                    isPaged ? (
                      Object.entries(groupedByDate).map(([dateStr, matches]) => (
                        <div key={dateStr} className="mb-6">
                          <h3 className="font-semibold text-sm">
                            {format(new Date(dateStr), "EEEE, d 'de' MMMM", { locale: es })}
                          </h3>
                          {matches.map(m => <MatchItem key={m.id} match={m} />)}
                        </div>
                      ))
                    ) : (
                      displayedMatches.map(m => <MatchItem key={m.id} match={m} />)
                    )
                  ) : (
                    <div className="text-center py-4 text-gray-500 text-sm">No matches to display</div>
                  )}

                  {isPaged && <div className="text-center text-sm">Page {pageIndex} of {totalPages}</div>}
                </div>
              )}

              <CalendarNavigation onPrevDate={handlePrevNav} onNextDate={handleNextNav} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default FixtureCalendar;
