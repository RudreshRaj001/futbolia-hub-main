import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TeamTransferCard from './TeamTransferCard';
import { AppDispatch, RootState } from '@/store';
import { fetchTransfers } from '@/store/slices/transfersSlice';
import { convertTransfersToTeamView } from '@/utils/tournamentRoutes';


const TeamTransfers: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { transfers, loading, error } = useSelector((state: RootState) => state.transfers);

  useEffect(() => {
    dispatch(fetchTransfers(1152)); // Replace 1152 with your teamId or make it dynamic
  }, [dispatch]);

  const transformedData = convertTransfersToTeamView(transfers);

  return (
    <div className="bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Transfer Market Insights</h2>
      <p className="text-gray-600 mb-6">
        Farewell to a successful 2024 for many, and a "disaster" for others. But the 
        curtain has closed, and since then, the 16 Serie A clubs have been doing 
        their best to sign great players who will leave their names on the National 
        Championship in 2025.
      </p>

      {loading && <p>Loading transfers...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      
      {!loading && !error && (
        <div className="space-y-3">
          {transformedData.map((transfer, index) => (
            <TeamTransferCard key={index} transfer={transfer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamTransfers;
