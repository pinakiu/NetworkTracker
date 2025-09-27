import React from 'react';
import { ArrowLeft, User, Play, Edit3, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import type { Contact } from '../App';

interface ContactDetailScreenProps {
  contact: Contact | null;
  onBack: () => void;
  onUpdateContact: (contact: Contact) => void;
  onEditContact: (contact: Contact) => void;
}

export function ContactDetailScreen({ contact, onBack, onUpdateContact, onEditContact }: ContactDetailScreenProps) {
  if (!contact) return null;

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

  const handleMarkFollowupDone = () => {
    onUpdateContact({
      ...contact,
      followupDone: true
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-3 safe-area-top">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2 hover:bg-accent active:bg-accent/70"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1>Contact Details</h1>
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex-1 px-4 overflow-y-auto">
        <div className="space-y-6 pb-6">
          {/* Profile Section */}
          <Card className="p-6 border-border bg-card">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                {contact.photoUrl ? (
                  <img 
                    src={contact.photoUrl} 
                    alt={contact.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-muted-foreground" />
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1 min-w-0">
                <h2 className="mb-2">{contact.name}</h2>
                <p className="text-muted-foreground mb-3">
                  {contact.role}
                </p>
                <p className="text-muted-foreground">
                  {contact.company}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {contact.tags.map((tag, index) => (
                  <Badge 
                    key={index}
                    variant="outline"
                    className={`${getTagColor(tag)}`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Screenshot for Michael Rodriguez */}
          {contact.name === 'Michael Rodriguez' && (
            <Card className="p-4 border-border bg-card">
              <h3 className="mb-3">Screenshot</h3>
              <div className="bg-muted rounded-lg p-4 text-center">
                <div className="w-full h-32 bg-background border-2 border-dashed border-border rounded flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Screenshot placeholder</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Business card or LinkedIn profile</p>
              </div>
            </Card>
          )}

          {/* Additional Text for Michael Rodriguez */}
          {contact.name === 'Michael Rodriguez' && (
            <Card className="p-4 border-border bg-card">
              <h3 className="mb-3">Additional Notes</h3>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-sm text-foreground">
                  "Great conversation about product management at startups. Mentioned they're hiring for a senior PM role. 
                  Interested in our company's growth stage. Follow up with job description and company overview."
                </p>
              </div>
            </Card>
          )}

          {/* Additional Text for Sarah Chen */}
          {contact.name === 'Sarah Chen' && (
            <Card className="p-4 border-border bg-card">
              <h3 className="mb-3">Additional Notes</h3>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-sm text-foreground">
                  "Senior engineer with 8+ years experience. Very knowledgeable about React and Node.js. 
                  Mentioned she's looking for mentorship opportunities and might be interested in a senior role. 
                  Great potential mentor for junior developers."
                </p>
              </div>
            </Card>
          )}

          {/* Audio Note for Sarah Chen */}
          {contact.name === 'Sarah Chen' && (
            <Card className="p-4 border-border bg-card">
              <h3 className="mb-3">Voice Note</h3>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Button
                  size="sm"
                  variant="outline"
                  className="p-2 border-cta/30 hover:bg-cta/10 active:bg-cta/20"
                >
                  <Play className="w-4 h-4 text-cta" />
                </Button>
                <div className="flex-1 h-8 bg-background rounded flex items-center px-3">
                  <div className="flex gap-1 items-center">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div 
                        key={i}
                        className={`w-1 bg-cta rounded-full ${
                          i < 5 ? 'h-6' : i < 8 ? 'h-4' : 'h-3'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">2:15</span>
              </div>
            </Card>
          )}

          {/* Audio Note for other contacts */}
          {contact.audioUrl && contact.name !== 'Sarah Chen' && (
            <Card className="p-4 border-border bg-card">
              <h3 className="mb-3">Voice Note</h3>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Button
                  size="sm"
                  variant="outline"
                  className="p-2 border-cta/30 hover:bg-cta/10 active:bg-cta/20"
                >
                  <Play className="w-4 h-4 text-cta" />
                </Button>
                <div className="flex-1 h-8 bg-background rounded flex items-center px-3">
                  <div className="flex gap-1 items-center">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div 
                        key={i}
                        className={`w-1 bg-cta rounded-full ${
                          i < 5 ? 'h-6' : i < 8 ? 'h-4' : 'h-3'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">1:23</span>
              </div>
            </Card>
          )}

          {/* Follow-up Status */}
          {contact.needsFollowup && (
            <Card className="p-4 border-border bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="mb-1">Follow-up Required</h3>
                  <p className="text-muted-foreground">
                    {contact.followupDone ? 'Completed' : 'Pending action'}
                  </p>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  contact.followupDone ? 'bg-success' : 'bg-warning'
                }`} />
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-4 space-y-3 safe-area-bottom">
        <Button
          variant="outline"
          onClick={() => onEditContact(contact)}
          className="w-full h-12 border-border hover:bg-accent active:bg-accent/70"
        >
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Contact
        </Button>
        
        {contact.needsFollowup && !contact.followupDone && (
          <Button
            onClick={handleMarkFollowupDone}
            className="w-full h-12 bg-cta hover:bg-cta/90 active:bg-cta/80 text-cta-foreground"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Mark Follow-up Done
          </Button>
        )}
      </div>
    </div>
  );
}