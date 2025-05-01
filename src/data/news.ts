
// News type definition
export interface News {
  id: number;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  category: string;
  author: string;
  tournamentId?: string; // Add this field to associate news with tournaments
}

// Mock data for news
export const news: News[] = [
  {
    id: 1,
    title: "ORGANIZACIÓN A TOPE en LigaPro y con HORARIOS CONFIRMADOS de acá hasta la Fecha 15 en la Serie A",
    summary: "Definidos días y horas de juego en el torneo local hasta completar los duelos de ida por la fase inicial",
    content: "Liga Deportiva Universitaria (LDU) de Quito logró una importante victoria por 2-0 frente a Barcelona SC en el estadio Rodrigo Paz Delgado, resultado que le permite mantenerse como líder del campeonato ecuatoriano. Los goles fueron anotados por Jhojan Julio al minuto 35 y Alexander Alvarado al 67, sellando así un triunfo contundente para los albos.",
    image: "https://api.ecuafut.org/storage/news/liga-quito-barcelona.jpg",
    date: "2023-06-18",
    category: "Serie A",
    author: "Juan Pérez",
    tournamentId: "serieA"
  },
  {
    id: 2,
    title: "PARA LEVANTARSE Y APLAUDIR: Libertad FC sorprendió a un niño aficionado y le cumplieron su sueño",
    summary: "El 'Negriazul' eliminó a Flamengo y sigue haciendo historia en el torneo continental.",
    content: "Independiente del Valle continúa su gran campaña en la Copa Libertadores tras eliminar a Flamengo en los octavos de final. Con un global de 3-2, el conjunto ecuatoriano avanzó a los cuartos de final donde enfrentará a River Plate. El técnico Martín Anselmi destacó el compromiso y la madurez mostrada por sus jugadores durante la serie ante el gigante brasileño.",
    image: "https://api.ecuafut.org/storage/news/idv-flamengo.jpg",
    date: "2023-06-15",
    category: "Libertadores",
    author: "Carlos Moreno",
    tournamentId: "libertadores"
  },
  {
    id: 3,
    title: "Técnica Universitaria confirma que Raúl Noriega NO VA MÁS y presenta nuevo Viejo Conocido",
    summary: "La Tri se alista para enfrentar a Argentina en Buenos Aires por la primera fecha.",
    content: "La selección ecuatoriana de fútbol intensifica sus entrenamientos de cara al inicio de las eliminatorias sudamericanas para el Mundial 2026. Ecuador debutará visitando a Argentina en Buenos Aires el próximo 7 de septiembre. El técnico Félix Sánchez Bas convocó a 28 jugadores, destacando la presencia de figuras como Moisés Caicedo, Piero Hincapié y Enner Valencia.",
    image: "https://api.ecuafut.org/storage/news/ecuador-seleccion.jpg",
    date: "2023-06-12",
    category: "Serie B",
    author: "María Torres",
    tournamentId: "serieB"
  },
  {
    id: 4,
    title: "Emelec anuncia la contratación de nuevo delantero",
    summary: "El 'Bombillo' refuerza su ataque con un goleador proveniente del fútbol argentino.",
    content: "Club Sport Emelec anunció oficialmente la incorporación del delantero argentino Lucas Menossi, procedente de Rosario Central. El atacante de 27 años firmó un contrato por dos temporadas con el 'Bombillo'. Menossi llega para reforzar la ofensiva del equipo guayaquileño tras la salida de Facundo Castillón. En su última temporada en Argentina, el nuevo jugador azul anotó 12 goles en 28 partidos.",
    image: "https://api.ecuafut.org/storage/news/emelec-fichaje.jpg",
    date: "2023-06-10",
    category: "Fichajes",
    author: "Roberto Aguilar",
    tournamentId: "serieA"
  },
  {
    id: 5,
    title: "Barcelona SC cambia de entrenador",
    summary: "Tras una racha negativa, la directiva tomó la decisión de realizar un cambio en el banquillo.",
    content: "Barcelona Sporting Club anunció la desvinculación del técnico argentino Diego Martínez tras los malos resultados obtenidos en las últimas cinco fechas del campeonato. Como reemplazo, la directiva del cuadro 'torero' confirmó la contratación del estratega uruguayo Jorge Fossati, quien dirigió anteriormente a Liga de Quito y logró el título nacional en 2018. Fossati firmó hasta diciembre de 2024.",
    image: "https://api.ecuafut.org/storage/news/barcelona-entrenador.jpg",
    date: "2023-06-08",
    category: "Serie A",
    author: "Luis González",
    tournamentId: "serieA"
  },
  {
    id: 6,
    title: "CONMEBOL define los caminos para Liga, Barcelona, e IDV en la Copa Libertadores",
    summary: "Fechas y horarios para los partidos de los clubes tricolores que sueñan con la Gloria Eterna",
    content: "La CONMEBOL ha definido el calendario completo para los octavos de final de la Copa Libertadores. Los equipos ecuatorianos Liga de Quito, Barcelona SC e Independiente del Valle ya conocen las fechas y horarios de sus respectivos enfrentamientos. Los partidos de ida se disputarán entre el 13 y 15 de agosto, mientras que los de vuelta se jugarán del 20 al 22 del mismo mes.",
    image: "https://via.placeholder.com/800x450?text=Copa+Libertadores",
    date: "2023-07-05",
    category: "Libertadores",
    author: "Pedro Zambrano",
    tournamentId: "libertadores"
  },
  {
    id: 7,
    title: "Liga de Quito avanza a octavos de final en la Copa Sudamericana",
    summary: "El equipo albo eliminó a Defensa y Justicia y continúa su camino en el torneo internacional",
    content: "Liga de Quito consiguió su clasificación a los octavos de final de la Copa Sudamericana tras vencer a Defensa y Justicia de Argentina con un global de 3-1. El equipo dirigido por Josep Alcácer mostró solidez defensiva y efectividad en ataque para superar la serie. En la próxima fase enfrentará a Lanús, que dejó en el camino al Cuiabá brasileño.",
    image: "https://via.placeholder.com/800x450?text=Copa+Sudamericana",
    date: "2023-07-18",
    category: "Sudamericana",
    author: "Daniela Morales",
    tournamentId: "sudamericana"
  },
  {
    id: 8,
    title: "La UEFA confirma sedes para la Champions League 2024-2025",
    summary: "El nuevo formato del torneo tendrá cambios significativos en su fase de grupos",
    content: "La UEFA ha anunciado oficialmente las sedes para las finales de las competiciones europeas para la temporada 2024-2025. La final de la Champions League se disputará en el Allianz Arena de Múnich, mientras que la Europa League tendrá su definición en San Mamés de Bilbao. Además, se confirmó el nuevo formato de fase de grupos que reemplazará al tradicional sistema de grupos de cuatro equipos.",
    image: "https://via.placeholder.com/800x450?text=Champions+League",
    date: "2023-08-02",
    category: "Champions League",
    author: "Fernando López",
    tournamentId: "champions"
  },
  {
    id: 9,
    title: "Gualaceo SC sorprende en la Serie B y sueña con el ascenso",
    summary: "El equipo azuayo lidera la tabla de posiciones tras siete fechas disputadas",
    content: "Gualaceo SC se ha convertido en la revelación de la primera etapa de la Serie B del fútbol ecuatoriano. El conjunto dirigido por Octavio Zambrano suma 16 puntos en siete jornadas y lidera la clasificación, mostrando un fútbol efectivo tanto de local como visitante. Los directivos del club han expresado que el objetivo principal es retornar a la Serie A en esta temporada.",
    image: "https://via.placeholder.com/800x450?text=Serie+B",
    date: "2023-08-10",
    category: "Serie B",
    author: "Carolina Vásquez",
    tournamentId: "serieB"
  },
  {
    id: 10,
    title: "Sevilla avanza a semifinales de la Europa League tras vencer al Manchester United",
    summary: "El conjunto español continúa demostrando por qué es el rey de esta competición",
    content: "El Sevilla FC sigue haciendo historia en la UEFA Europa League. El equipo andaluz eliminó al Manchester United en cuartos de final con un global de 5-2 y avanzó a las semifinales del torneo, donde se enfrentará a la Juventus. El Sevilla, que ya ha ganado este trofeo en seis ocasiones, busca extender su récord y consolidarse como el equipo más laureado de la competición.",
    image: "https://via.placeholder.com/800x450?text=Europa+League",
    date: "2023-08-15",
    category: "Europa League",
    author: "Manuel García",
    tournamentId: "europa"
  }
];
