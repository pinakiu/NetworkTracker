import React from 'react';
import { User, Plus } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { Event, Contact } from '../App';

interface ContactsScreenProps {
  event: Event | null;
  contacts: Contact[];
  onSelectContact: (contactId: string) => void;
  onBack: () => void;
  events: Event[];
  onSelectEvent: (eventId: string) => void;
}

export function ContactsScreen({ event, contacts, onSelectContact, onBack, events, onSelectEvent }: ContactsScreenProps) {
  if (!event) return null;

  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'mentor':
        return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'job lead':
        return 'bg-cta/20 text-cta border-cta/30';
      case 'interesting':
        return 'bg-info/20 text-info border-info/30';
      case 'follow-up':
        return 'bg-warning/20 text-warning border-warning/30';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-3 safe-area-top">
        <div className="mb-4">
          <h1 className="mb-3">Contacts</h1>
          <Select 
            value={event.id} 
            onValueChange={onSelectEvent}
          >
            <SelectTrigger className="h-12 bg-input border-border">
              <SelectValue placeholder="Select event" />
            </SelectTrigger>
            <SelectContent>
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  {event.name}
                </SelectItem>
              ))}
              <SelectItem value="add-new" className="text-cta">
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Event
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-muted-foreground">
          {contacts.length} contact{contacts.length !== 1 ? 's' : ''} captured
        </p>
      </div>

      {/* Contacts List */}
      <div className="flex-1 px-4 overflow-y-auto">
        {contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <User className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="mb-2">No contacts yet</h3>
            <p className="text-muted-foreground">
              Use the Capture tab to add contacts from this event
            </p>
          </div>
        ) : (
          <div className="space-y-3 pb-6">
            {contacts.map((contact) => (
              <Card 
                key={contact.id}
                className="p-4 cursor-pointer active:bg-accent/70 transition-colors border-border bg-card"
                onClick={() => onSelectContact(contact.id)}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                    {contact.photoUrl ? (
                      <img 
                        src={contact.photoUrl} 
                        alt={contact.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 truncate">{contact.name}</h3>
                    <p className="text-muted-foreground mb-3 truncate">
                      {contact.role} • {contact.company}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {contact.tags.map((tag, index) => (
                        <Badge 
                          key={index}
                          variant="outline"
                          className={`text-xs px-2 py-1 ${getTagColor(tag)}`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Follow-up indicator */}
                  {contact.needsFollowup && !contact.followupDone && (
                    <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}