import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlayerDetails } from "./mockTopScorersData";
import PlayerStatsTabs from "./PlayerStatsTabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { X } from "lucide-react";

interface PlayerDetailsDialogProps {
  player: PlayerDetails | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const PlayerDetailsDialog: React.FC<PlayerDetailsDialogProps> = ({
  player,
  isOpen,
  onOpenChange,
}) => {
  const isMobile = useIsMobile();

 

 
  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!player) return null;

  const content = (
    <div className="flex flex-col max-h-[90vh] md:max-h-[85vh]">
      <DialogHeader className="w-full p-0 relative mb-2">
        <DialogTitle className="bg-gray-900 dark:bg-gray-800 text-white p-4 text-center text-xl">
          FICHA DEL JUGADOR
        </DialogTitle>
       
      </DialogHeader>

      <div className="overflow-y-auto px-1 pb-6 flex-1 scrollbar-hide">
        <div className="p-4 border-b dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative mx-auto md:mx-0">
              <div className="bg-gray-200 dark:bg-gray-700 w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex items-center justify-center">
                {player?.photo ? (
                  <img
                    src={player.photo}
                    alt={player.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 md:h-16 md:w-16 text-gray-400 dark:text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                {player.teamLogo && (
                  <img
                    src={player.teamLogo}
                    alt={player.team}
                    className="w-6 h-6 md:w-8 md:h-8"
                  />
                )}
                <span className="font-semibold text-gray-600 dark:text-gray-300 text-sm md:text-base">
                  {player.position}
                </span>
              </div>
              <h2 className="font-bold text-base md:text-lg uppercase text-gray-900 dark:text-white">
                {player.name}
              </h2>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 mt-4 md:mt-0 md:ml-auto">
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 dark:bg-gray-800 p-1.5 md:p-2 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6 text-gray-700 dark:text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-center mt-1">
                  <div className="font-bold text-sm md:text-base text-gray-900 dark:text-white">
                    {player.age}
                  </div>
                  <div className="text-xxs md:text-xs text-gray-500 dark:text-gray-400">
                    AÑOS
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-gray-100 dark:bg-gray-800 p-1.5 md:p-2 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6 text-gray-700 dark:text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="text-center mt-1">
                  <div className="font-bold text-xs md:text-sm truncate max-w-[60px] md:max-w-none text-gray-900 dark:text-white">
                    {player.birthDate}
                  </div>
                  <div className="text-xxs md:text-xs text-gray-500 dark:text-gray-400 invisible">
                    DATE
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-gray-100 dark:bg-gray-800 p-1.5 md:p-2 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6 text-gray-700 dark:text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-center mt-1">
                  <div className="font-bold text-xs md:text-sm truncate max-w-[60px] md:max-w-none text-gray-900 dark:text-white">
                    {player.nationality}
                  </div>
                  <div className="text-xxs md:text-xs text-gray-500 dark:text-gray-400 invisible">
                    NAT
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-gray-100 dark:bg-gray-800 p-1.5 md:p-2 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6 text-gray-700 dark:text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
                <div className="text-center mt-1">
                  <div className="font-bold text-sm md:text-base text-gray-900 dark:text-white">
                    {player.weight}
                  </div>
                  <div className="text-xxs md:text-xs text-gray-500 dark:text-gray-400 invisible">
                    WEIGHT
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-gray-100 dark:bg-gray-800 p-1.5 md:p-2 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6 text-gray-700 dark:text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="text-center mt-1">
                  <div className="font-bold text-sm md:text-base text-gray-900 dark:text-white">
                    {player.height}
                  </div>
                  <div className="text-xxs md:text-xs text-gray-500 dark:text-gray-400 invisible">
                    HEIGHT
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-2 md:p-4">
          <PlayerStatsTabs player={player} />
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent className="w-full p-0 max-w-full" side="bottom">
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 max-h-[90vh] overflow-hidden">
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDetailsDialog;
