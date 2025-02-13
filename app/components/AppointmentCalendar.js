// components/AppointmentCalendar.js
export default function AppointmentCalendar({ appointments, services }) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Appointment Schedule</h2>
          <div className="flex gap-2">
            <DatePicker
              selected={new Date()}
              onChange={() => {}}
              className="rounded-lg border-purple-200"
            />
            <Button variant="outline">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
        
        {appointments.length === 0 ? (
          <EmptyState
            icon={<CalendarIcon className="h-8 w-8" />}
            title="No upcoming appointments"
            action={{
              label: 'Create First Appointment',
              onClick: () => router.push('/appointments/new')
            }}
          />
        ) : (
          <TimelineView appointments={appointments} />
        )}
      </div>
    )
  }