
import React from 'react';
import { Fight } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FightCardProps {
  fight: Fight;
  onSelectFighter: (fighterId: 1 | 2) => void;
  selectedFighter?: 1 | 2;
}

export const FightCard = ({ fight, onSelectFighter, selectedFighter }: FightCardProps) => {
  const formatFighterName = (name: string) => {
    return name.replace(/\n/g, ' ');
  };

  const formatRank = (rank: string) => {
    if (rank === 'C') return 'Champion';
    if (rank.startsWith('#')) return rank;
    return rank;
  };

  return (
    <Card className="fight-card animate-fade-in">
      <CardContent className="p-4">
        <div className="text-center mb-3">
          <Badge variant="outline" className="bg-ufc-red/20 text-ufc-red border-ufc-red/50">
            {fight.weight_division}
          </Badge>
          <p className="text-xs text-gray-400 mt-1">{fight.event_date}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Fighter 1 */}
          <button
            onClick={() => onSelectFighter(1)}
            className={`fighter-button text-left ${
              selectedFighter === 1 ? 'selected' : ''
            }`}
          >
            <div className="space-y-1">
              <p className="font-semibold text-white text-sm">
                {formatFighterName(fight.fighter1_name)}
              </p>
              {fight.fighter1_rank && (
                <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                  {formatRank(fight.fighter1_rank)}
                </Badge>
              )}
              {fight.fighter1_odds && fight.fighter1_odds !== '-' && (
                <p className="text-xs text-gray-400">
                  Odds: {fight.fighter1_odds}
                </p>
              )}
            </div>
          </button>

          {/* VS Divider */}
          <div className="col-span-2 flex items-center justify-center my-2">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-3 text-ufc-red font-bold text-sm">VS</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* Fighter 2 */}
          <button
            onClick={() => onSelectFighter(2)}
            className={`fighter-button text-left ${
              selectedFighter === 2 ? 'selected' : ''
            }`}
          >
            <div className="space-y-1">
              <p className="font-semibold text-white text-sm">
                {formatFighterName(fight.fighter2_name)}
              </p>
              {fight.fighter2_rank && (
                <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                  {formatRank(fight.fighter2_rank)}
                </Badge>
              )}
              {fight.fighter2_odds && fight.fighter2_odds !== '-' && (
                <p className="text-xs text-gray-400">
                  Odds: {fight.fighter2_odds}
                </p>
              )}
            </div>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
