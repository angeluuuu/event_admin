import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BarChart2, Bell, Calendar, LogOut, Menu, Settings, Users } from "lucide-react";
import { useState } from "react";

export default function EventCoordinationApp() {
  const [activePage, setActivePage] = useState("Dashboard");
  const logoText = "ScheduLink";
  const primaryColor = "bg-red-800";

  const renderContent = () => {
    switch (activePage) {
      case "Events":
        return <EventManagement />;
      case "Resources":
        return <ResourceModule />;
      case "Registrations":
        return <RegistrationModule />;
      case "Notifications":
        return <NotificationsModule />;
      case "Reports":
        return <ReportsModule />;
      case "Feedback":
        return <FeedbackModule />;
      case "Settings":
        return <SettingsModule />;
      default:
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <DashboardCard title="Total Events" value="12" />
              <DashboardCard title="Registrations" value="245" />
              <DashboardCard title="Active Notifications" value="4" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`w-64 p-4 text-white ${primaryColor} hidden md:block`}>
        <div className="text-2xl font-bold mb-6">{logoText}</div>
        <nav className="space-y-4">
          <SidebarItem icon={<Calendar size={18} />} label="Events" onClick={() => setActivePage("Events")} selected={activePage === "Events"} />
          <SidebarItem icon={<Calendar size={18} />} label="Resources" onClick={() => setActivePage("Resources")} selected={activePage === "Resources"} />
          <SidebarItem icon={<Users size={18} />} label="Registrations" onClick={() => setActivePage("Registrations")} selected={activePage === "Registrations"} />
          <SidebarItem icon={<Bell size={18} />} label="Notifications" onClick={() => setActivePage("Notifications")} selected={activePage === "Notifications"} />
          <SidebarItem icon={<BarChart2 size={18} />} label="Reports" onClick={() => setActivePage("Reports")} selected={activePage === "Reports"} />
          <SidebarItem icon={<Users size={18} />} label="Feedback" onClick={() => setActivePage("Feedback")} selected={activePage === "Feedback"} />
          <SidebarItem icon={<Settings size={18} />} label="Settings" onClick={() => setActivePage("Settings")} selected={activePage === "Settings"} />
          <Dialog>
            <DialogTrigger asChild>
              <SidebarItem icon={<LogOut size={18} />} label="Logout" />
            </DialogTrigger>
            <DialogContent>
              <h2 className="text-lg font-semibold mb-2">Confirm Logout</h2>
              <p>Are you sure you want to log out?</p>
              <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive">Logout</Button>
              </div>
            </DialogContent>
          </Dialog>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger className="p-4 md:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className={`${primaryColor} text-white w-64`}>
          <div className="text-2xl font-bold mb-6">{logoText}</div>
          <nav className="space-y-4">
            <SidebarItem icon={<Calendar size={18} />} label="Events" onClick={() => setActivePage("Events")} selected={activePage === "Events"} />
            <SidebarItem icon={<Users size={18} />} label="Registrations" onClick={() => setActivePage("Registrations")} selected={activePage === "Registrations"} />
            <SidebarItem icon={<Bell size={18} />} label="Notifications" onClick={() => setActivePage("Notifications")} selected={activePage === "Notifications"} />
            <SidebarItem icon={<BarChart2 size={18} />} label="Reports" onClick={() => setActivePage("Reports")} selected={activePage === "Reports"} />
            <SidebarItem icon={<Settings size={18} />} label="Settings" onClick={() => setActivePage("Settings")} selected={activePage === "Settings"} />
            <Dialog>
              <DialogTrigger asChild>
                <SidebarItem icon={<LogOut size={18} />} label="Logout" />
              </DialogTrigger>
              <DialogContent>
                <h2 className="text-lg font-semibold mb-2">Confirm Logout</h2>
                <p>Are you sure you want to log out?</p>
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive">Logout</Button>
                </div>
              </DialogContent>
            </Dialog>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
}

function SidebarItem({ icon, label, onClick, selected }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg ${
        selected ? "bg-white/30 font-semibold" : "hover:bg-white/20"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

function DashboardCard({ title, value }) {
  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}


function EventManagement() {
  const [events, setEvents] = useState([
    { id: 1, name: "Tech Conference", date: "2025-05-10", location: "EMRC" },
    { id: 2, name: "Startup Pitch", date: "2025-05-15", location: "Gymnasium" },
  ]);
  const [form, setForm] = useState({ name: "", location: "", date: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const venues = ["EMRC", "Gymnasium", "Quadrangle", "Function Hall", "Sport and Recreational Hall"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editId !== null) {
      setEvents(events.map(event => event.id === editId ? { ...event, ...form } : event));
      setEditId(null);
    } else {
      const newEvent = {
        id: Date.now(),
        ...form,
      };
      setEvents([...events, newEvent]);
    }
    setForm({ name: "", location: "", date: "" });
  };

  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleEdit = (event) => {
    setEditId(event.id);
    setForm({ name: event.name, location: event.location, date: event.date });
  };

  const filteredEvents = events.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Event Management</h1>
      <Input
        placeholder="Search events..."
        className="mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="mb-4 space-y-2">
        <Input name="name" value={form.name} onChange={handleChange} placeholder="Event Name" />
        <select
          name="location"
          value={form.location}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">Select Venue</option>
          {venues.map((venue) => (
            <option key={venue} value={venue}>{venue}</option>
          ))}
        </select>
        <Input name="date" type="date" value={form.date} onChange={handleChange} />
        <Button onClick={handleSubmit}>{editId !== null ? "Update Event" : "Add Event"}</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{event.name}</h2>
              <p className="text-sm text-gray-500">{event.date} - {event.location}</p>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" onClick={() => handleEdit(event)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(event.id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ResourceModule() {
  const initialVenues = [
    { name: "Gymnasium", bookings: ["2025-05-01", "2025-05-10"] },
    { name: "Function Hall", bookings: ["2025-05-03", "2025-05-12"] },
    { name: "Recreational Hall", bookings: ["2025-05-05"] },
    { name: "EMRC", bookings: [] },
  ];

  const [venues, setVenues] = useState(initialVenues);

  const year = 2025;
  const month = 4; // May (0-indexed)

  const getMonthDates = () => {
    const dates = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      dates.push(date.toISOString().split("T")[0]);
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const dates = getMonthDates();

  const toggleBooking = (venueName, date) => {
    const updatedVenues = venues.map((venue) => {
      if (venue.name === venueName) {
        const isBooked = venue.bookings.includes(date);
        const updatedBookings = isBooked
          ? venue.bookings.filter((d) => d !== date)
          : [...venue.bookings, date];

        return { ...venue, bookings: updatedBookings };
      }
      return venue;
    });

    setVenues(updatedVenues);
  };

  const editBookingStatus = (venueName, date) => {
    const venue = venues.find((v) => v.name === venueName);
    const isBooked = venue.bookings.includes(date);
    const newStatus = isBooked ? "Available" : "Booked";
    const confirmChange = window.confirm(
      `Are you sure you want to mark ${venueName} on ${date} as ${newStatus}?`
    );
    if (confirmChange) {
      toggleBooking(venueName, date);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Venue Availability - May {year}</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Venue</th>
              {dates.map((date) => (
                <th key={date} className="px-2 py-1 border text-xs whitespace-nowrap">
                  {date}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {venues.map((venue) => (
              <tr key={venue.name} className="text-center">
                <td className="px-4 py-2 border font-semibold">{venue.name}</td>
                {dates.map((date) => {
                  const isBooked = venue.bookings.includes(date);
                  return (
                    <td
                      key={date}
                      className={`px-2 py-1 border ${
                        isBooked ? "bg-red-200 text-red-800" : "bg-green-100 text-green-800"
                      }`}
                    >
                      <button
                        className={`px-4 py-2 text-white rounded ${
                          isBooked ? "bg-red-500" : "bg-green-500"
                        }`}
                        onClick={() => {
                          const newStatus = isBooked ? "Available" : "Booked";
                          const confirmChange = window.confirm(
                            `Are you sure you want to mark ${venue.name} on ${date} as ${newStatus}?`
                          );
                          if (confirmChange) {
                            toggleBooking(venue.name, date);
                          }
                        }}
                      >
                        {isBooked ? "Booked" : "Available"}
                      </button>
                      <button
                        className="ml-2 px-2 py-1 text-blue-600 underline"
                        onClick={() => editBookingStatus(venue.name, date)}
                      >
                        Edit
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RegistrationModule() {
  const [registrations, setRegistrations] = useState([
    {
      id: 1,
      fullName: "John Doe",
      studentId: "2023001",
      course: "BSCS",
      event: "Tech Conference",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      studentId: "2023002",
      course: "BSIT",
      event: "Startup Pitch",
    },
  ]);

  const [form, setForm] = useState({
    fullName: "",
    studentId: "",
    course: "",
    event: "",
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editId !== null) {
      setRegistrations(
        registrations.map((reg) =>
          reg.id === editId ? { ...reg, ...form } : reg
        )
      );
      setEditId(null);
    } else {
      const newRegistration = { id: Date.now(), ...form };
      setRegistrations([...registrations, newRegistration]);
    }
    setForm({ fullName: "", studentId: "", course: "", event: "" });
  };

  const handleEdit = (reg) => {
    setEditId(reg.id);
    setForm({
      fullName: reg.fullName,
      studentId: reg.studentId,
      course: reg.course,
      event: reg.event,
    });
  };

  const handleDelete = (id) => {
    setRegistrations(registrations.filter((reg) => reg.id !== id));
  };

  const grouped = registrations.reduce((acc, reg) => {
    acc[reg.event] = acc[reg.event] || [];
    acc[reg.event].push(reg);
    return acc;
  }, {});

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Registration Management</h1>
      <div className="mb-4 space-y-2">
        <Input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <Input
          name="studentId"
          value={form.studentId}
          onChange={handleChange}
          placeholder="Student ID"
        />
        <Input
          name="course"
          value={form.course}
          onChange={handleChange}
          placeholder="Course"
        />
        <Input
          name="event"
          value={form.event}
          onChange={handleChange}
          placeholder="Event Name"
        />
        <Button onClick={handleSubmit}>
          {editId !== null ? "Update Registration" : "Add Registration"}
        </Button>
      </div>

      <div className="space-y-4">
        {Object.keys(grouped).map((eventName) => (
          <div key={eventName}>
            <h2 className="text-xl font-semibold mb-2">{eventName}</h2>
            <div className="grid gap-2">
              {grouped[eventName].map((reg) => (
                <Card key={reg.id}>
                  <CardContent className="p-4">
                    <h2 className="font-semibold">{reg.fullName}</h2>
                    <p className="text-sm text-gray-600">
                      Student ID: {reg.studentId}
                    </p>
                    <p className="text-sm text-gray-600">
                      Course: {reg.course}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" onClick={() => handleEdit(reg)}>
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(reg.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsModule() {
  const [notifications, setNotifications] = useState([
    { id: 1, name: "Tech Conference", status: "Pending" },
    { id: 2, name: "Startup Pitch", status: "Approved" },
    { id: 3, name: "Career Fair", status: "Declined" },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setNotifications((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, status: newStatus } : event
      )
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Event Notifications</h1>
      <div className="space-y-4">
        {notifications.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">{event.name}</h2>
                  <p className="text-sm text-gray-500">Status: <strong>{event.status}</strong></p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={event.status === "Pending" ? "default" : "outline"}
                    onClick={() => handleStatusChange(event.id, "Pending")}
                  >
                    Pending
                  </Button>
                  <Button
                    variant={event.status === "Approved" ? "default" : "outline"}
                    onClick={() => handleStatusChange(event.id, "Approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    variant={event.status === "Declined" ? "default" : "destructive"}
                    onClick={() => handleStatusChange(event.id, "Declined")}
                  >
                    Decline
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function FeedbackModule() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({ event: "", feedback: "" });

  const availableEvents = ["Tech Conference", "Startup Pitch", "Career Fair"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newFeedback = { id: Date.now(), ...form };
    setFeedbacks([...feedbacks, newFeedback]);
    setForm({ event: "", feedback: "" });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Event Feedback</h1>
      <div className="mb-4 space-y-2">
        <select
          name="event"
          value={form.event}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="">Select Event</option>
          {availableEvents.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
        <Input
          name="feedback"
          value={form.feedback}
          onChange={handleChange}
          placeholder="Write your feedback..."
        />
        <Button onClick={handleSubmit}>Submit Feedback</Button>
      </div>

      <div className="space-y-4">
        {feedbacks.map((fb) => (
          <Card key={fb.id}>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 mb-1">
                <strong>{fb.event}</strong>
              </p>
              <p>{fb.feedback}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ReportsModule() {
  const eventReports = [
    { name: "Tech Conference", date: "2025-05-10", attendees: 120 },
    { name: "Startup Pitch", date: "2025-05-15", attendees: 80 },
    { name: "Innovation Summit", date: "2025-06-01", attendees: 200 },
    { name: "AI Expo", date: "2025-06-20", attendees: 150 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Event Attendance Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventReports.map((event, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{event.name}</h2>
              <p className="text-sm text-gray-500 mb-1">Date: {event.date}</p>
              <p className="text-2xl font-bold text-indigo-600">{event.attendees} Attendees</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


function SettingsModule() {
  const [venues, setVenues] = useState([
    "Main Hall",
    "Auditorium",
    "Conference Room A"
  ]);
  const [newVenue, setNewVenue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editVenue, setEditVenue] = useState("");

  const addVenue = () => {
    if (newVenue.trim() !== "") {
      setVenues([...venues, newVenue.trim()]);
      setNewVenue("");
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditVenue(venues[index]);
  };

  const saveEdit = () => {
    if (editVenue.trim() !== "") {
      const updatedVenues = [...venues];
      updatedVenues[editIndex] = editVenue.trim();
      setVenues(updatedVenues);
      setEditIndex(null);
      setEditVenue("");
    }
  };

  const removeVenue = (index) => {
    const updatedVenues = venues.filter((_, i) => i !== index);
    setVenues(updatedVenues);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Settings: Venue Management</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Add New Venue</h2>
        <input
          type="text"
          className="border p-2 mr-2 rounded"
          value={newVenue}
          onChange={(e) => setNewVenue(e.target.value)}
          placeholder="Enter venue name"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addVenue}
        >
          Add Venue
        </button>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Current Venues</h2>
        <ul className="space-y-2">
          {venues.map((venue, index) => (
            <li
              key={index}
              className="flex items-center justify-between border p-2 rounded"
            >
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    className="border p-1 mr-2 rounded flex-grow"
                    value={editVenue}
                    onChange={(e) => setEditVenue(e.target.value)}
                  />
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={saveEdit}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 text-white px-2 py-1 rounded"
                    onClick={() => setEditIndex(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>{venue}</span>
                  <div className="space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                      onClick={() => startEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => removeVenue(index)}
                    >
                      Remove
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

