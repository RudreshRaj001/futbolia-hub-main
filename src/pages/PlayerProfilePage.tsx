import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ErrorMessage from "@/components/ui/ErrorMessage";
import LoadingSpinner from "@/components/ui/LoadingSpinner";


const PlayerProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [player, setPlayer] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/players/${id}?season=2024`);
        setPlayer(response.data);
      } catch (err) {
        setError("Failed to load player profile");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPlayer();
  }, [id]);

  if (loading) return <div className="py-10 text-center"><LoadingSpinner /></div>;
  if (error) return <ErrorMessage message={error} />;
  if (!player) return null;

  const data = player.player;
  const stats = player.statistics[0];

  return (
    <div className="py-8">
      {/* <PageHeader title={data.name} subtitle={stats.team.name} /> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow border dark:border-gray-800 text-center">
          <img src={data.photo} alt={data.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">{data.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{data.nationality}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Edad: {data.age}</p>
        </div>

        <div className="md:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-xl shadow border dark:border-gray-800">
          <h3 className="text-lg font-bold mb-4">Estadísticas</h3>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <li><strong>Posición:</strong> {stats.games.position}</li>
            <li><strong>Partidos:</strong> {stats.games.appearences}</li>
            <li><strong>Minutos:</strong> {stats.games.minutes}</li>
            <li><strong>Goles:</strong> {stats.goals.total}</li>
            <li><strong>Asistencias:</strong> {stats.goals.assists}</li>
            <li><strong>Tarjetas Amarillas:</strong> {stats.cards.yellow}</li>
            <li><strong>Tarjetas Rojas:</strong> {stats.cards.red}</li>
            <li><strong>Penales anotados:</strong> {stats.penalty.scored}</li>
            <li><strong>Penales fallados:</strong> {stats.penalty.missed}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfilePage;
