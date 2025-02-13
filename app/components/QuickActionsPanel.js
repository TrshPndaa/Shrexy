// components/QuickActionsPanel.js
export default function QuickActionsPanel({ onAddService, onNewAppointment }) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <h3 className="text-lg font-semibold">Quick Actions</h3>
        <ButtonGroup vertical>
          <Button variant="primary" onClick={onNewAppointment}>
            New Appointment
          </Button>
          <Button variant="secondary" onClick={onAddService}>
            Add Service
          </Button>
          <Button variant="ghost">
            View Clients
          </Button>
        </ButtonGroup>
      </div>
    )
  }