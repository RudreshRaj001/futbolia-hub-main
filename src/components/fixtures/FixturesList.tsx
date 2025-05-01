import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchFixtures } from '../../store/slices/fixturesSlice';
import ErrorMessage from '../ui/ErrorMessage';
import { format } from 'date-fns';
import LoadingSpinner from '../ui/LoadingSpinner';

interface FixturesListProps {
  leagueId: number;
  season: number;
}

const LIVE_STATUSES = ['LIVE', '1H', '2H', 'HT', 'ET', 'BT', 'P', 'INT'];

const FixturesList: React.FC<FixturesListProps> = ({ leagueId, season }) => {
  const dispatch = useAppDispatch();
  const { fixtures, status, error } = useAppSelector((state) => state.fixtures);

  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'live' | 'all'>('all');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    dispatch(fetchFixtures({ league: leagueId, season }));
  }, [dispatch, leagueId, season]);

  useEffect(() => {
    if (fixtures?.length && !selectedDate) {
      const firstDate = new Date(fixtures[0].fixture.date);
      setSelectedDate(firstDate);
    }
  }, [fixtures]);

  if (status === 'loading') return <LoadingSpinner />;
  if (status === 'failed') return <ErrorMessage message={error || 'Failed to load fixtures'} />;
  if (!fixtures || !Array.isArray(fixtures)) return <ErrorMessage message="No fixtures data available." />;

  const filteredFixtures = fixtures?.filter((fixture) => {
    const shortStatus = fixture?.fixture?.status?.short;

    if (activeTab === 'upcoming') return ['NS', 'TBD', 'CANC', 'PST', 'SUSP'].includes(shortStatus);
    if (activeTab === 'completed') return ['FT', 'AET', 'PEN'].includes(shortStatus);
    if (activeTab === 'live') return LIVE_STATUSES.includes(shortStatus);

    return true; // 'all'
  });

  const fixturesByDate = filteredFixtures.reduce<Record<string, typeof fixtures>>((acc, fixture) => {
    const date = format(new Date(fixture?.fixture?.date), 'yyyy-MM-dd');
    if (!acc[date]) acc[date] = [];
    acc[date].push(fixture);
    return acc;
  }, {});

  const availableDates = Object.keys(fixturesByDate);
  const selectedKey = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const selectedFixtures = fixturesByDate[selectedKey] || [];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Calendario</h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between mb-6 gap-4">
        <div className="inline-flex rounded-md shadow-sm">
          {['all', 'upcoming', 'completed', 'live'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 text-sm font-medium border ${
                tab === 'all' ? 'rounded-l-lg' : tab === 'live' ? 'rounded-r-lg' : ''
              } ${
                activeTab === tab
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          includeDates={availableDates.map((date) => new Date(date))}
          placeholderText="Select match date"
          className="border rounded-md px-4 py-2 text-sm dark:bg-gray-800 "
        />
      </div>

      {selectedFixtures.length === 0 ? (
        <p className="text-center py-8 text-gray-500 dark:text-gray-400">
          No fixtures available for the selected date and tab.
        </p>
      ) : (
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3 px-2">
            {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow divide-y">
            {selectedFixtures.map((fixture) => (
              <div key={fixture.fixture.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 w-5/12">
                    <img src={fixture.teams.home.logo || '/placeholder.svg'} alt={fixture.teams.home.name} className="w-8 h-8 object-contain" />
                    <span className="truncate">{fixture.teams.home.name}</span>
                  </div>
                  <div className="flex flex-col items-center w-2/12">
                    {['FT', 'AET', 'PEN'].includes(fixture.fixture.status.short) ? (
                      <div className="text-lg font-bold">
                        {fixture.goals.home} - {fixture.goals.away}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {format(new Date(fixture.fixture.date), 'HH:mm')}
                      </div>
                    )}
                    <div
                      className={`text-xs mt-1 px-2 py-0.5 rounded-full ${
                        ['FT', 'AET', 'PEN'].includes(fixture.fixture.status.short)
                          ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100'
                          : LIVE_STATUSES.includes(fixture.fixture.status.short)
                          ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                      }`}
                    >
                      {fixture.fixture.status.short === 'NS' ? 'Scheduled' : fixture.fixture.status.short}
                    </div>
                  </div>
                  <div className="flex items-center justify-end space-x-2 w-5/12">
                    <span className="truncate text-right">{fixture.teams.away.name}</span>
                    <img src={fixture.teams.away.logo || '/placeholder.svg'} alt={fixture.teams.away.name} className="w-8 h-8 object-contain" />
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                  <span>{fixture.league.round}</span>
                  <span>{fixture.fixture.venue?.name || 'Stadium TBD'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FixturesList;
