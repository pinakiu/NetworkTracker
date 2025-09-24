import React from 'react';
import { Plus, Calendar, Users } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import type { Event } from '../App';

interface EventsScreenProps {
  events: Event[];
  onSelectEvent: (eventId: string) => void;
}

export function EventsScreen({ events, onSelectEvent }: EventsScreenProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-3 safe-area-top">
        <h1 className="mb-2">Networking Events</h1>
        <p className="text-muted-foreground">
          Tap an event to view your contacts
        </p>
      </div>

      {/* Events List */}
      <div className="flex-1 px-4 overflow-y-auto">
        <div className="space-y-3 pb-20">
          {events.map((event) => (
            <Card 
              key={event.id}
              className="p-4 cursor-pointer active:bg-accent/70 transition-colors border-border bg-card"
              onClick={() => onSelectEvent(event.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="mb-2 truncate pr-2">
                    {event.name}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{formatDate(event.date)}</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">
                        {event.contactCount} contact{event.contactCount !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="w-2 h-2 bg-cta rounded-full mt-2 flex-shrink-0" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Add Button */}
      <div className="absolute bottom-16 right-4">
        <Button
          size="lg"
          className="w-14 h-14 rounded-full bg-cta hover:bg-cta/90 active:bg-cta/80 text-cta-foreground shadow-lg shadow-cta/25"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}