'use client'
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Header from '../components/header';
import Background from '../components/Background';
import { Calendar, Clock, User, CalendarCheck, Calendar as CalendarIcon, Search, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DashboardPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [stats, setStats] = useState({
        todayAppointments: 0,
        weeklyAppointments: 0,
        completedToday: 0,
        upcomingCount: 0
    });
    const [loading, setLoading] = useState(true); // Fix here
    const [session, setSession] = useState(null);
    const [view, setView] = useState('today');
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [services, setServices] = useState([]);
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null); // Fix here
    const [isNewClient, setIsNewClient] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [serviceForm, setServiceForm] = useState({
        name: '',
        duration: '',
        price: '',
        description: ''
    });

    // Form state
    const [appointmentForm, setAppointmentForm] = useState({
        date: '',
        time: '',
        service_id: '',
        client_id: '',
        duration: '',
        notes: '',
        status: 'pending'
    });

    // New client form state
    const [newClientForm, setNewClientForm] = useState({
        name: '',
        email: '',
        phone: '',
        notes: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setSession(session);

                if (!session) {
                    console.log('No active session');
                    return;
                }

                // Fetch appointments with better error handling
                const { data: appointmentsData, error: appointmentsError } = await supabase
                    .from('appointments')
                    .select(`
                        *,
                        clients (
                            name,
                            email,
                            phone
                        ),
                        services (
                            name,
                            duration
                        )
                    `)
                    .order('date', { ascending: true });

                if (appointmentsError) {
                    console.error('Error fetching appointments:', appointmentsError);
                    return;
                }

                // Similar error handling for other fetches
                const { data: servicesData, error: servicesError } = await supabase
                    .from('services')
                    .select('*');

                if (servicesError) {
                    console.error('Error fetching services:', servicesError);
                    return;
                }

                const { data: clientsData, error: clientsError } = await supabase
                    .from('clients')
                    .select('*');

                if (clientsError) {
                    console.error('Error fetching clients:', clientsError);
                    return;
                }

                // Update state only if data was successfully fetched
                if (appointmentsData) setAppointments(appointmentsData);
                if (servicesData) setServices(servicesData);
                if (clientsData) setClients(clientsData);

                // Calculate stats
                const today = new Date().toISOString().split('T')[0];
                const nextWeek = new Date();
                nextWeek.setDate(nextWeek.getDate() + 7);

                setStats({
                    todayAppointments: appointmentsData.filter(apt => apt.date.startsWith(today)).length,
                    weeklyAppointments: appointmentsData.filter(apt => new Date(apt.date) <= nextWeek).length,
                    completedToday: appointmentsData.filter(apt => apt.date.startsWith(today) && apt.status === 'completed').length,
                    upcomingCount: appointmentsData.filter(apt => new Date(apt.date) > new Date()).length
                });

            } catch (error) {
                console.error('Error in fetchData:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleServiceChange = (serviceId) => {
        const selectedService = services.find(s => s.id === parseInt(serviceId));
        setAppointmentForm(prev => ({
            ...prev,
            service_id: serviceId,
            duration: selectedService?.duration || ''
        }));
    };

    const handleClientSelect = (clientId) => {
        const selected = clients.find(c => c.id === parseInt(clientId));
        setSelectedClient(selected);
        setAppointmentForm(prev => ({
            ...prev,
            client_id: clientId
        }));
    };

    const handleAppointmentSubmit = async (e) => {
        e.preventDefault();
        
        try {
            let clientId = appointmentForm.client_id;
            
            // If it's a new client, create them first
            if (isNewClient) {
                const { data: newClient, error: clientError } = await supabase
                    .from('clients')
                    .insert([newClientForm])
                    .select()
                    .single();

                if (clientError) throw clientError;
                clientId = newClient.id;
            }

            const appointmentData = {
                ...appointmentForm,
                client_id: clientId,
                date: `${appointmentForm.date}T${appointmentForm.time}`,
            };

            if (editingAppointment) {
                // Update existing appointment
                const { error } = await supabase
                    .from('appointments')
                    .update(appointmentData)
                    .eq('id', editingAppointment.id);

                if (error) throw error;
            } else {
                // Create new appointment
                const { error } = await supabase
                    .from('appointments')
                    .insert([appointmentData]);

                if (error) throw error;
            }

            // Refresh appointments
            const { data: newAppointments } = await supabase
                .from('appointments')
                .select(`
                    *,
                    clients (
                        name,
                        email,
                        phone
                    ),
                    services (
                        name,
                        duration
                    )
                `)
                .order('date', { ascending: true });

            setAppointments(newAppointments);
            resetForms();
            setIsModalOpen(false);

        } catch (error) {
            console.error('Error saving appointment:', error);
            alert('Error saving appointment. Please try again.');
        }
    };

    const resetForms = () => {
        setAppointmentForm({
            date: '',
            time: '',
            service_id: '',
            client_id: '',
            duration: '',
            notes: '',
            status: 'pending'
        });
        setNewClientForm({
            name: '',
            email: '',
            phone: '',
            notes: ''
        });
        setIsNewClient(false);
        setSelectedClient(null);
        setEditingAppointment(null);
    };

    const handleEdit = (appointment) => {
        setEditingAppointment(appointment);
        const [date, time] = appointment.date.split('T');
        setAppointmentForm({
            date: date,
            time: time.substring(0, 5),
            service_id: appointment.service_id,
            client_id: appointment.client_id,
            duration: appointment.duration,
            notes: appointment.notes || '',
            status: appointment.status
        });
        setSelectedClient(appointment.clients);
        setIsModalOpen(true);
    };

    const filterAppointments = () => {
        return appointments.filter(apt => {
            const matchesSearch = apt.clients?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                apt.services?.name?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
            return matchesSearch && matchesStatus;
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            confirmed: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            cancelled: 'bg-red-100 text-red-800',
            completed: 'bg-blue-100 text-blue-800',
            no_show: 'bg-gray-100 text-gray-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const handleServiceSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingService) {
                // Update existing service
                const { error } = await supabase
                    .from('services')
                    .update({
                        name: serviceForm.name,
                        duration: parseInt(serviceForm.duration),
                        price: parseFloat(serviceForm.price),
                        description: serviceForm.description
                    })
                    .eq('id', editingService.id);

                if (error) throw error;
            } else {
                // Create new service
                const { error } = await supabase
                    .from('services')
                    .insert([{
                        name: serviceForm.name,
                        duration: parseInt(serviceForm.duration),
                        price: parseFloat(serviceForm.price),
                        description: serviceForm.description
                    }]);

                if (error) throw error;
            }

            // Refresh services list
            const { data: servicesData } = await supabase
                .from('services')
                .select('*');
            
            if (servicesData) setServices(servicesData);
            resetServiceForm();
            setIsServiceModalOpen(false);

        } catch (error) {
            console.error('Error saving service:', error);
            alert('Error saving service. Please try again.');
        }
    };

    const handleDeleteService = async (serviceId) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        try {
            const { error } = await supabase
                .from('services')
                .delete()
                .eq('id', serviceId);

            if (error) throw error;

            // Refresh services list
            const { data: servicesData } = await supabase
                .from('services')
                .select('*');
            
            if (servicesData) setServices(servicesData);

        } catch (error) {
            console.error('Error deleting service:', error);
            alert('Error deleting service. Please try again.');
        }
    };

    const resetServiceForm = () => {
        setServiceForm({
            name: '',
            duration: '',
            price: '',
            description: ''
        });
        setEditingService(null);
    };

    const ServicesSection = () => (
        <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Services</CardTitle>
                <Button 
                    onClick={() => {
                        resetServiceForm();
                        setIsServiceModalOpen(true);
                    }}
                    className="bg-blue-500 hover:bg-blue-600"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Service
                </Button>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Duration</th>
                                <th className="px-4 py-2 text-left">Price</th>
                                <th className="px-4 py-2 text-left">Description</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr key={service.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2">{service.name}</td>
                                    <td className="px-4 py-2">{service.duration} min</td>
                                    <td className="px-4 py-2">${service.price}</td>
                                    <td className="px-4 py-2">{service.description}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex gap-2">
                                            <button 
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                onClick={() => {
                                                    setEditingService(service);
                                                    setServiceForm({
                                                        name: service.name,
                                                        duration: service.duration.toString(),
                                                        price: service.price.toString(),
                                                        description: service.description || ''
                                                    });
                                                    setIsServiceModalOpen(true);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                onClick={() => handleDeleteService(service.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );

    if (!session) {
        return <p className="text-center p-8">Please log in to view the dashboard.</p>;
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white">
            <Background />
            <div className="relative z-10 container mx-auto px-4 py-8">
                <Header />
                
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardContent className="flex items-center p-6">
                            <CalendarIcon className="h-8 w-8 text-blue-500 mr-4" />
                            <div>
                                <p className="text-sm text-gray-500">Today's Appointments</p>
                                <p className="text-2xl font-bold">{stats.todayAppointments}</p>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="flex items-center p-6">
                            <Calendar className="h-8 w-8 text-purple-500 mr-4" />
                            <div>
                                <p className="text-sm text-gray-500">This Week</p>
                                <p className="text-2xl font-bold">{stats.weeklyAppointments}</p>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="flex items-center p-6">
                            <CalendarCheck className="h-8 w-8 text-green-500 mr-4" />
                            <div>
                                <p className="text-sm text-gray-500">Completed Today</p>
                                <p className="text-2xl font-bold">{stats.completedToday}</p>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="flex items-center p-6">
                            <Clock className="h-8 w-8 text-orange-500 mr-4" />
                            <div>
                                <p className="text-sm text-gray-500">Upcoming</p>
                                <p className="text-2xl font-bold">{stats.upcomingCount}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Add New Appointment Button */}
                <div className="mb-6">
                    <Button 
                        onClick={() => {
                            resetForms();
                            setIsModalOpen(true);
                        }}
                        className="bg-blue-500 hover:bg-blue-600"
                    >
                        <Calendar className="mr-2 h-4 w-4" />
                        Add New Appointment
                    </Button>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search clients or services..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <select
                        className="border rounded-lg px-4 py-2"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="no_show">No Show</option>
                    </select>

                    <select
                        className="border rounded-lg px-4 py-2"
                        value={view}
                        onChange={(e) => setView(e.target.value)}
                    >
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                    </select>
                </div>

                {/* Appointments List */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-4 py-2 text-left">Time</th>
                                        <th className="px-4 py-2 text-left">Client</th>
                                        <th className="px-4 py-2 text-left">Service</th>
                                        <th className="px-4 py-2 text-left">Duration</th>
                                        <th className="px-4 py-2 text-left">Status</th>
                                        <th className="px-4 py-2 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filterAppointments().map((apt, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-2">
                                                <div className="flex items-center">
                                                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                                    {new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="flex items-center">
                                                    <User className="h-4 w-4 mr-2 text-gray-400" />
                                                    <div>
                                                        <p className="font-medium">{apt.clients?.name}</p>
                                                        <p className="text-sm text-gray-500">{apt.clients?.phone}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">{apt.services?.name}</td>
                                            <td className="px-4 py-2">{apt.duration} min</td>
                                            <td className="px-4 py-2">
                                                <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(apt.status)}`}></span>
                                                <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(apt.status)}`}>
                                                {apt.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className="flex gap-2">
                                                <button 
                                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                    onClick={() => handleEdit(apt)}
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                                                    onClick={() => {
                                                        const newStatus = apt.status === 'completed' ? 'confirmed' : 'completed';
                                                        handleEdit({ ...apt, status: newStatus });
                                                    }}
                                                >
                                                    {apt.status === 'completed' ? 'Reopen' : 'Complete'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <ServicesSection /> {/* Add Services Section here */}

            {/* Appointment Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {editingAppointment ? 'Edit Appointment' : 'New Appointment'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAppointmentSubmit} className="space-y-6">
                        {/* Date and Time */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Date</Label>
                                <Input
                                    type="date"
                                    value={appointmentForm.date}
                                    onChange={(e) => setAppointmentForm(prev => ({
                                        ...prev,
                                        date: e.target.value
                                    }))}
                                    required
                                />
                            </div>
                            <div>
                                <Label>Time</Label>
                                <Input
                                    type="time"
                                    value={appointmentForm.time}
                                    onChange={(e) => setAppointmentForm(prev => ({
                                        ...prev,
                                        time: e.target.value
                                    }))}
                                    required
                                />
                            </div>
                        </div>

                        {/* Service Selection */}
                        <div>
                            <Label>Service</Label>
                            <select
                                className="w-full border rounded-lg p-2"
                                value={appointmentForm.service_id}
                                onChange={(e) => handleServiceChange(e.target.value)}
                                required
                            >
                                <option value="">Select a service</option>
                                {services.map(service => (
                                    <option key={service.id} value={service.id}>
                                        {service.name} ({service.duration} min)
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Client Selection */}
                        <div>
                            <Label>Client</Label>
                            {!isNewClient ? (
                                <div className="space-y-2">
                                    <select
                                        className="w-full border rounded-lg p-2"
                                        value={appointmentForm.client_id}
                                        onChange={(e) => handleClientSelect(e.target.value)}
                                        required={!isNewClient}
                                    >
                                        <option value="">Select a client</option>
                                        {clients.map(client => (
                                            <option key={client.id} value={client.id}>
                                                {client.name} - {client.phone}
                                            </option>
                                        ))}
                                    </select>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsNewClient(true)}
                                    >
                                        Add New Client
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Name</Label>
                                            <Input
                                                value={newClientForm.name}
                                                onChange={(e) => setNewClientForm(prev => ({
                                                    ...prev,
                                                    name: e.target.value
                                                }))}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label>Phone</Label>
                                            <Input
                                                value={newClientForm.phone}
                                                onChange={(e) => setNewClientForm(prev => ({
                                                    ...prev,
                                                    phone: e.target.value
                                                }))}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Email</Label>
                                        <Input
                                            type="email"
                                            value={newClientForm.email}
                                            onChange={(e) => setNewClientForm(prev => ({
                                                ...prev,
                                                email: e.target.value
                                            }))}
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsNewClient(false)}
                                    >
                                        Select Existing Client
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Notes */}
                        <div>
                            <Label>Notes</Label>
                            <textarea
                                className="w-full border rounded-lg p-2"
                                value={appointmentForm.notes}
                                onChange={(e) => setAppointmentForm(prev => ({
                                    ...prev,
                                    notes: e.target.value
                                }))}
                                rows={3}
                            />
                        </div>

                        {/* Status Selection (for editing) */}
                        {editingAppointment && (
                            <div>
                                <Label>Status</Label>
                                <select
                                    className="w-full border rounded-lg p-2"
                                    value={appointmentForm.status}
                                    onChange={(e) => setAppointmentForm(prev => ({
                                        ...prev,
                                        status: e.target.value
                                    }))}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                    <option value="no_show">No Show</option>
                                </select>
                            </div>
                        )}

                        {/* Submit Buttons */}
                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    resetForms();
                                    setIsModalOpen(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                                {editingAppointment ? 'Update Appointment' : 'Create Appointment'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Service Modal */}
            <Dialog open={isServiceModalOpen} onOpenChange={setIsServiceModalOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {editingService ? 'Edit Service' : 'New Service'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleServiceSubmit} className="space-y-6">
                        <div>
                            <Label>Service Name</Label>
                            <Input
                                value={serviceForm.name}
                                onChange={(e) => setServiceForm(prev => ({
                                    ...prev,
                                    name: e.target.value
                                }))}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Duration (minutes)</Label>
                                <Input
                                    type="number"
                                    value={serviceForm.duration}
                                    onChange={(e) => setServiceForm(prev => ({
                                        ...prev,
                                        duration: e.target.value
                                    }))}
                                    required
                                />
                            </div>
                            <div>
                                <Label>Price ($)</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    value={serviceForm.price}
                                    onChange={(e) => setServiceForm(prev => ({
                                        ...prev,
                                        price: e.target.value
                                    }))}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Description</Label>
                            <textarea
                                className="w-full border rounded-lg p-2"
                                value={serviceForm.description}
                                onChange={(e) => setServiceForm(prev => ({
                                    ...prev,
                                    description: e.target.value
                                }))}
                                rows={3}
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    resetServiceForm();
                                    setIsServiceModalOpen(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                                {editingService ? 'Update Service' : 'Create Service'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    </main>
);
};

export default DashboardPage;