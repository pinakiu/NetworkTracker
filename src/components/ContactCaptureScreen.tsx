import React, { useState } from 'react';
import { ArrowLeft, Camera, Mic, MicOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { Event, Contact } from '../App';

interface ContactCaptureScreenProps {
  events: Event[];
  onAddContact: (contact: Omit<Contact, 'id'>) => void;
  onBack: () => void;
  editContact?: Contact;
  onUpdateContact?: (contact: Contact) => void;
}

const availableTags = ['Job Lead', 'Mentor', 'Interesting', 'Follow-up'];

export function ContactCaptureScreen({ events, onAddContact, onBack, editContact, onUpdateContact }: ContactCaptureScreenProps) {
  const [formData, setFormData] = useState({
    name: editContact?.name || '',
    company: editContact?.company || '',
    role: editContact?.role || '',
    eventId: editContact?.eventId || events[0]?.id || '',
    tags: editContact?.tags || [],
    needsFollowup: editContact?.needsFollowup || false,
    notes: editContact?.notes || ''
  });
  const [isRecording, setIsRecording] = useState(false);

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

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
      needsFollowup: tag === 'Follow-up' ? true : prev.needsFollowup
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.company.trim() || !formData.role.trim()) {
      return;
    }

    if (editContact && onUpdateContact) {
      // Update existing contact
      const updatedContact: Contact = {
        ...editContact,
        name: formData.name.trim(),
        company: formData.company.trim(),
        role: formData.role.trim(),
        eventId: formData.eventId,
        tags: formData.tags,
        needsFollowup: formData.needsFollowup,
        notes: formData.notes.trim()
      };
      onUpdateContact(updatedContact);
    } else {
      // Add new contact
      const contact: Omit<Contact, 'id'> = {
        name: formData.name.trim(),
        company: formData.company.trim(),
        role: formData.role.trim(),
        eventId: formData.eventId,
        tags: formData.tags,
        needsFollowup: formData.needsFollowup,
        followupDone: false,
        notes: formData.notes.trim()
      };
      onAddContact(contact);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would start/stop audio recording
  };

  const canSave = formData.name.trim() && formData.company.trim() && formData.role.trim();

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="p-4 pb-3 safe-area-top">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2 hover:bg-accent active:bg-accent/70"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1>{editContact ? 'Edit Contact' : 'Add Contact'}</h1>
        </div>
        <p className="text-muted-foreground">
          Capture contact details quickly
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 px-4 overflow-y-auto">
        <div className="space-y-4 pb-4">
          {/* Photo Upload - At the top */}
          <Card className="p-3 border-border bg-card">
            <Label className="mb-1 block text-sm">Photo</Label>
            <Button
              variant="outline"
              className="w-full h-16 border-dashed border-border hover:bg-accent active:bg-accent/70"
            >
              <div className="flex flex-col items-center gap-1">
                <Camera className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">Add Photo</span>
              </div>
            </Button>
          </Card>

          {/* Event Selection */}
          <div className="space-y-2">
            <Label className="text-sm">Event</Label>
            <Select 
              value={formData.eventId} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, eventId: value }))}
            >
              <SelectTrigger className="h-10 bg-input border-border">
                <SelectValue placeholder="Select event" />
              </SelectTrigger>
              <SelectContent>
                {events.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Basic Info */}
          <div className="space-y-3">
            <div className="space-y-2">
              <Label className="text-sm">Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter contact's name"
                className="h-10 bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Company</Label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                placeholder="Enter company name"
                className="h-10 bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Role</Label>
              <Input
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                placeholder="Enter job title"
                className="h-10 bg-input border-border"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-sm">Tags</Label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={`cursor-pointer px-2 py-1 text-xs transition-colors ${
                    formData.tags.includes(tag)
                      ? getTagColor(tag)
                      : 'border-border hover:bg-accent'
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label className="text-sm">Notes</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Add any additional notes about this contact..."
              className="min-h-[80px] bg-input border-border resize-none"
            />
          </div>

          {/* Voice Note - At the bottom */}
          <Card className="p-3 border-border bg-card">
            <Label className="mb-1 block text-sm">Voice Note</Label>
            <Button
              variant="outline"
              onClick={toggleRecording}
              className={`w-full h-12 transition-colors ${
                isRecording 
                  ? 'bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/20 active:bg-destructive/30' 
                  : 'border-border hover:bg-accent active:bg-accent/70'
              }`}
            >
              <div className="flex items-center gap-2">
                {isRecording ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
                <span className="text-sm">
                  {isRecording ? 'Stop Recording' : 'Record Voice Note'}
                </span>
              </div>
            </Button>
            {isRecording && (
              <div className="mt-2 text-center">
                <span className="text-destructive text-xs">● Recording...</span>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Save Button */}
      <div className="px-4 pt-4 pb-4 safe-area-bottom">
        <Button
          onClick={handleSubmit}
          disabled={!canSave}
          className="w-full h-12 bg-cta hover:bg-cta/90 active:bg-cta/80 text-cta-foreground disabled:bg-muted disabled:text-muted-foreground"
        >
          {editContact ? 'Update Contact' : 'Save Contact'}
        </Button>
      </div>
    </div>
  );
}