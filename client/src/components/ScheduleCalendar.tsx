import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";

type ScheduleEvent = {
  id: number;
  title: string;
  day: number;
  startTime: string;
  endTime: string;
  location: string;
  color: string;
};

export function ScheduleCalendar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [events, setEvents] = useState<ScheduleEvent[]>([
    {
      id: 1,
      title: "Chemistry Lecture",
      day: 1,
      startTime: "09:00",
      endTime: "10:30",
      location: "Room 301",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "English Literature",
      day: 1,
      startTime: "11:00",
      endTime: "12:30",
      location: "Room 205",
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "Mathematics",
      day: 2,
      startTime: "09:00",
      endTime: "10:30",
      location: "Room 102",
      color: "bg-purple-500",
    },
    {
      id: 4,
      title: "Physics Lab",
      day: 3,
      startTime: "14:00",
      endTime: "16:00",
      location: "Lab B",
      color: "bg-orange-500",
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    day: 1,
    startTime: "",
    endTime: "",
    location: "",
  });

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const timeSlots = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 8;
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-cyan-500",
  ];

  const addEvent = () => {
    const event: ScheduleEvent = {
      id: Date.now(),
      ...newEvent,
      color: colors[events.length % colors.length],
    };
    setEvents((prev) => [...prev, event]);
    setNewEvent({ title: "", day: 1, startTime: "", endTime: "", location: "" });
    setIsDialogOpen(false);
    console.log("Event added:", event);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-schedule-title">
            Weekly Schedule
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your classes and events for the week
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-event">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>
                Schedule a new class or event for the week
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="event-title">Title</Label>
                <Input
                  id="event-title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  placeholder="e.g., Biology Lecture"
                  data-testid="input-event-title"
                />
              </div>
              <div>
                <Label htmlFor="event-day">Day</Label>
                <select
                  id="event-day"
                  value={newEvent.day}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, day: Number(e.target.value) })
                  }
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  data-testid="select-event-day"
                >
                  {daysOfWeek.map((day, index) => (
                    <option key={day} value={index + 1}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, startTime: e.target.value })
                    }
                    data-testid="input-event-start-time"
                  />
                </div>
                <div>
                  <Label htmlFor="end-time">End Time</Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, endTime: e.target.value })
                    }
                    data-testid="input-event-end-time"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, location: e.target.value })
                  }
                  placeholder="e.g., Room 301"
                  data-testid="input-event-location"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                data-testid="button-cancel-event"
              >
                Cancel
              </Button>
              <Button
                onClick={addEvent}
                disabled={
                  !newEvent.title ||
                  !newEvent.startTime ||
                  !newEvent.endTime ||
                  !newEvent.location
                }
                data-testid="button-save-event"
              >
                Save Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Week View</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                data-testid="button-prev-week"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium px-4">Nov 11 - Nov 17, 2025</span>
              <Button
                variant="outline"
                size="icon"
                data-testid="button-next-week"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-8 gap-2">
            <div className="text-sm font-medium text-muted-foreground p-2">
              Time
            </div>
            {daysOfWeek.map((day, index) => (
              <div
                key={day}
                className={`text-sm font-medium p-2 text-center rounded-md ${
                  index === 0 ? "bg-primary text-primary-foreground" : ""
                }`}
              >
                {day}
              </div>
            ))}

            {timeSlots.map((time) => (
              <>
                <div
                  key={time}
                  className="text-xs text-muted-foreground p-2 border-t"
                >
                  {time}
                </div>
                {daysOfWeek.map((_, dayIndex) => {
                  const dayEvents = events.filter(
                    (e) => e.day === dayIndex + 1 && e.startTime === time
                  );
                  return (
                    <div
                      key={`${time}-${dayIndex}`}
                      className="border-t p-1 min-h-[60px]"
                      data-testid={`cell-${dayIndex}-${time}`}
                    >
                      {dayEvents.map((event) => (
                        <Card
                          key={event.id}
                          className={`${event.color} text-white p-2 mb-1 cursor-pointer hover-elevate`}
                          data-testid={`event-${event.id}`}
                        >
                          <p className="text-xs font-medium truncate">
                            {event.title}
                          </p>
                          <p className="text-xs opacity-90 flex items-center gap-1 mt-1">
                            <Clock className="h-2 w-2" />
                            {event.startTime} - {event.endTime}
                          </p>
                        </Card>
                      ))}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <Card key={event.id} className="hover-elevate">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`w-1 h-full ${event.color} rounded-full`} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{event.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Badge variant="outline">
                        {daysOfWeek[event.day - 1]}
                      </Badge>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {event.startTime} - {event.endTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
