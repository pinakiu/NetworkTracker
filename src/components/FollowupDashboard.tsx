import React from 'react';
import { CheckCircle2, Clock, User } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Contact, Event } from '../App';

interface FollowupDashboardProps {
  contacts: Contact[];
  events: Event[];
  onUpdateContact: (contact: Contact) => void;
  onSelectContact: (contactId: string) => void;
}

export function FollowupDashboard({ contacts, events, onUpdateContact, onSelectContact }: FollowupDashboardProps) {
  const followupContacts = contacts.filter(c => c.needsFollowup);
  const pendingCount = followupContacts.filter(c => !c.followupDone).length;
  const doneCount = followupContacts.filter(c => c.followupDone).length;

  const getEventName = (eventId: string) => {
    return events.find(e => e.id === eventId)?.name || 'Unknown Event';
  };

  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'mentor':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'job lead':
        return 'bg-teal-500/20 text-teal-300 border-teal-500/30';
      case 'interesting':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'follow-up':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const toggleFollowupStatus = (contact: Contact) => {
    onUpdateContact({
      ...contact,
      followupDone: !contact.followupDone
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-3 safe-area-top">
        <h1 className="mb-2">Follow-ups</h1>
        <p className="text-muted-foreground">
          Track your networking follow-ups
        </p>
      </div>

      {/* Stats */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-medium">{pendingCount}</p>
                <p className="text-muted-foreground text-sm">Pending</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-medium">{doneCount}</p>
                <p className="text-muted-foreground text-sm">Done</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Follow-ups List */}
      <div className="flex-1 px-4 overflow-y-auto">
        {followupContacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <CheckCircle2 className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="mb-2">No follow-ups</h3>
            <p className="text-muted-foreground">
              Add "Follow-up" tags to contacts to track them here
            </p>
          </div>
        ) : (
          <div className="space-y-3 pb-6">
            {followupContacts.map((contact) => (
              <Card 
                key={contact.id}
                className={`p-4 border-border bg-card transition-all ${
                  contact.followupDone ? 'opacity-60' : ''
                }`}
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
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="truncate">{contact.name}</h3>
                        <p className="text-muted-foreground text-sm truncate">
                          {contact.company}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleFollowupStatus(contact)}
                        className={`ml-2 p-2 ${
                          contact.followupDone 
                            ? 'text-success hover:text-success/80 active:text-success/90' 
                            : 'text-muted-foreground hover:text-warning active:text-warning/80'
                        }`}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* Event and Status */}
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground text-sm truncate mr-2">
                        {getEventName(contact.eventId)}
                      </p>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          contact.followupDone
                            ? 'bg-success/20 text-success border-success/30'
                            : 'bg-warning/20 text-warning border-warning/30'
                        }`}
                      >
                        {contact.followupDone ? 'Done' : 'Pending'}
                      </Badge>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {contact.tags.filter(tag => tag !== 'Follow-up').map((tag, index) => (
                        <Badge 
                          key={index}
                          variant="outline"
                          className={`text-xs ${getTagColor(tag)}`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tap to view details */}
                <div className="mt-3 pt-3 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSelectContact(contact.id)}
                    className="w-full text-cta hover:text-cta/80 hover:bg-cta/10 active:bg-cta/20"
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}