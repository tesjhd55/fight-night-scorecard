
import React, { useState, useEffect } from 'react';
import { FightCard } from '@/components/events/FightCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Fight, Event, Bet } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

// Mock API data
const mockApiData = {
  "ufc-316": [
    {
      "event_date": "Sat, Jun 7 / 10:00 PM EDT",
      "fighter1_country": "",
      "fighter1_name": "Merab\nDvalishvili",
      "fighter1_odds": "-325",
      "fighter1_rank": "C",
      "fighter2_country": "",
      "fighter2_name": "Sean\nO'Malley",
      "fighter2_odds": "+260",
      "fighter2_rank": "#1",
      "weight_division": "Bantamweight Title Bout"
    },
    {
      "event_date": "Sat, Jun 7 / 10:00 PM EDT",
      "fighter1_country": "",
      "fighter1_name": "Julianna\nPeña",
      "fighter1_odds": "+455",
      "fighter1_rank": "C",
      "fighter2_country": "",
      "fighter2_name": "Kayla\nHarrison",
      "fighter2_odds": "-625",
      "fighter2_rank": "#2",
      "weight_division": "Women's Bantamweight Title Bout"
    },
    {
      "event_date": "Sat, Jun 7 / 10:00 PM EDT",
      "fighter1_country": "",
      "fighter1_name": "Kelvin\nGastelum",
      "fighter1_odds": "+310",
      "fighter1_rank": "",
      "fighter2_country": "",
      "fighter2_name": "Joe\nPyfer",
      "fighter2_odds": "-395",
      "fighter2_rank": "",
      "weight_division": "Middleweight Bout"
    }
  ]
};

export const EventsPage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [bets, setBets] = useState<{ [fightId: string]: 1 | 2 }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Transform mock data into events
    const transformedEvents: Event[] = Object.entries(mockApiData).map(([eventId, fights]) => ({
      id: eventId,
      name: eventId.replace('-', ' ').toUpperCase(),
      fights: fights.map((fight, index) => ({
        ...fight,
        id: `${eventId}-${index}`
      }))
    }));
    
    setEvents(transformedEvents);
    if (transformedEvents.length > 0) {
      setSelectedEvent(transformedEvents[0]);
    }
  }, []);

  const handleSelectFighter = (fightId: string, fighterId: 1 | 2) => {
    setBets(prev => ({
      ...prev,
      [fightId]: fighterId
    }));
  };

  const handleSubmitBets = async () => {
    if (!selectedEvent || !user) return;

    const fightCount = selectedEvent.fights.length;
    const betCount = Object.keys(bets).length;

    if (betCount !== fightCount) {
      toast({
        title: "Incomplete bets",
        description: `Please select a fighter for all ${fightCount} fights before submitting.`,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Save bets to localStorage
      const existingBets = JSON.parse(localStorage.getItem('ufc_bets') || '[]');
      const newBets: Bet[] = Object.entries(bets).map(([fightId, selectedFighter]) => ({
        eventId: selectedEvent.id,
        fightId,
        selectedFighter,
        userId: user.id,
        createdAt: new Date().toISOString()
      }));

      existingBets.push(...newBets);
      localStorage.setItem('ufc_bets', JSON.stringify(existingBets));

      setBets({});
      toast({
        title: "Bets submitted!",
        description: `Your picks for ${selectedEvent.name} have been saved. Good luck!`,
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Failed to submit your bets. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedEvent) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">No Events Available</h2>
          <p className="text-gray-400">Check back later for upcoming fights.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Event Selection */}
      <Card className="bg-gray-900/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Select Event</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {events.map((event) => (
              <Button
                key={event.id}
                variant={selectedEvent?.id === event.id ? "default" : "outline"}
                onClick={() => {
                  setSelectedEvent(event);
                  setBets({});
                }}
                className={selectedEvent?.id === event.id ? 
                  "ufc-gradient text-white" : 
                  "border-gray-600 text-gray-300 hover:bg-gray-800"
                }
              >
                {event.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Details */}
      <Card className="bg-gray-900/80 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white">{selectedEvent.name}</CardTitle>
            <p className="text-gray-400 mt-1">
              {selectedEvent.fights.length} fights • Select your picks
            </p>
          </div>
          <Badge variant="outline" className="bg-ufc-red/20 text-ufc-red border-ufc-red/50">
            {Object.keys(bets).length}/{selectedEvent.fights.length} picks
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {selectedEvent.fights.map((fight) => (
              <FightCard
                key={fight.id}
                fight={fight}
                onSelectFighter={(fighterId) => handleSelectFighter(fight.id!, fighterId)}
                selectedFighter={bets[fight.id!]}
              />
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <Button
              onClick={handleSubmitBets}
              disabled={isSubmitting || Object.keys(bets).length !== selectedEvent.fights.length}
              className="w-full ufc-gradient hover:opacity-90 text-white font-semibold py-3"
            >
              {isSubmitting ? 'Submitting Bets...' : 
               Object.keys(bets).length === selectedEvent.fights.length ? 
               'Submit All Bets' : 
               `Select ${selectedEvent.fights.length - Object.keys(bets).length} more fighters`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
