import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  User, 
  Car, 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  MoreHorizontal, 
  ChevronDown,
  Filter,
  Loader2,
  AlertCircle
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AdminPanel: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [bookingStatus, setBookingStatus] = useState<"all" | "confirmed" | "completed" | "cancelled">("all");
  const [feedbackRating, setFeedbackRating] = useState<"all" | "positive" | "neutral" | "negative">("all");
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (!user || !isAdmin) return;
    
    const fetchBookings = async () => {
      setIsLoadingBookings(true);
      setFetchError(null);
      
      try {
        console.log('Fetching bookings for admin...');
        const { data, error } = await supabase
          .from('bookings')
          .select('*');
          
        if (error) {
          console.error('Error fetching bookings:', error);
          setFetchError(`Error fetching bookings: ${error.message}`);
          throw error;
        }
        
        console.log('Bookings fetched:', data);
        setBookings(data || []);
      } catch (error: any) {
        console.error('Error fetching bookings:', error);
        setFetchError(`Error fetching bookings: ${error.message}`);
        toast({
          title: 'Error fetching bookings',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setIsLoadingBookings(false);
      }
    };

    const fetchFeedback = async () => {
      setIsLoadingFeedback(true);
      try {
        console.log('Fetching feedback for admin...');
        const { data, error } = await supabase
          .from('feedback')
          .select('*');
          
        if (error) {
          console.error('Error fetching feedback:', error);
          throw error;
        }
        
        console.log('Feedback fetched:', data);
        setFeedback(data || []);
      } catch (error: any) {
        console.error('Error fetching feedback:', error);
        toast({
          title: 'Error fetching feedback',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setIsLoadingFeedback(false);
      }
    };

    fetchBookings();
    fetchFeedback();

    // Set up real-time updates
    const bookingsSubscription = supabase
      .channel('bookings-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, payload => {
        console.log('Booking change detected:', payload);
        if (payload.eventType === 'INSERT') {
          setBookings(prev => [...prev, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setBookings(prev => prev.map(booking => booking.id === payload.new.id ? payload.new : booking));
        } else if (payload.eventType === 'DELETE') {
          setBookings(prev => prev.filter(booking => booking.id !== payload.old.id));
        }
      })
      .subscribe();

    const feedbackSubscription = supabase
      .channel('feedback-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'feedback' }, payload => {
        console.log('Feedback change detected:', payload);
        if (payload.eventType === 'INSERT') {
          setFeedback(prev => [...prev, payload.new]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(bookingsSubscription);
      supabase.removeChannel(feedbackSubscription);
    };
  }, [user, isAdmin, toast]);

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: 'Status updated',
        description: `Booking has been marked as ${status}`,
        variant: 'default',
      });
      
      // Update local state
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === id ? { ...booking, status } : booking
        )
      );
    } catch (error: any) {
      console.error('Error updating booking status:', error);
      toast({
        title: 'Error updating status',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  // If not admin, show restricted message
  if (!isAdmin) {
    return (
      <div className="py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You don't have permission to access the admin panel. Please log in with an admin account.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const filteredBookings = bookings.filter(booking => {
    if (bookingStatus === "all") return true;
    return booking.status === bookingStatus;
  });

  const filteredFeedback = feedback.filter(item => {
    if (feedbackRating === "all") return true;
    if (feedbackRating === "positive") return item.rating >= 4;
    if (feedbackRating === "neutral") return item.rating === 3;
    if (feedbackRating === "negative") return item.rating <= 2;
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="outline" className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">Confirmed</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      {fetchError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{fetchError}</AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="bookings" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="bookings" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Bookings
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Feedback
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="bookings" className="animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Manage Bookings</h3>
            
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    {bookingStatus === "all" ? "All Statuses" : 
                     bookingStatus === "confirmed" ? "Confirmed" : 
                     bookingStatus === "completed" ? "Completed" : "Cancelled"}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setBookingStatus("all")}>
                    All Statuses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setBookingStatus("confirmed")}>
                    Confirmed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setBookingStatus("completed")}>
                    Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setBookingStatus("cancelled")}>
                    Cancelled
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            {isLoadingBookings ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <span className="ml-3 text-muted-foreground">Loading bookings...</span>
              </div>
            ) : (
              <Table>
                <TableCaption>A list of all bookings</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Car Info</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No bookings found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id.substring(0, 8)}</TableCell>
                        <TableCell>{booking.service_name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{booking.time_slot}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4 text-muted-foreground" />
                            {booking.car_make} {booking.car_model}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => updateBookingStatus(booking.id, 'completed')}>
                                <CheckCircle2 className="h-4 w-4 mr-2" /> Mark as Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                              >
                                <XCircle className="h-4 w-4 mr-2" /> Cancel Booking
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="feedback" className="animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Customer Feedback</h3>
            
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    {feedbackRating === "all" ? "All Ratings" : 
                     feedbackRating === "positive" ? "Positive" : 
                     feedbackRating === "neutral" ? "Neutral" : "Negative"}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Rating</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFeedbackRating("all")}>
                    All Ratings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFeedbackRating("positive")}>
                    Positive (4-5 ★)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFeedbackRating("neutral")}>
                    Neutral (3 ★)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFeedbackRating("negative")}>
                    Negative (1-2 ★)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {isLoadingFeedback ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-3 text-muted-foreground">Loading feedback...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFeedback.length === 0 ? (
                <div className="md:col-span-2 text-center py-10 border rounded-lg text-muted-foreground">
                  No feedback found
                </div>
              ) : (
                filteredFeedback.map((item) => (
                  <div key={item.id} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-medium">User {item.user_id.substring(0, 8)}</h4>
                        <p className="text-sm text-muted-foreground">{item.satisfaction || "Unknown"} satisfaction</p>
                      </div>
                      {renderStars(item.rating)}
                    </div>
                    <p className="text-sm mb-4">{item.message}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.created_at).toLocaleDateString()}
                      </p>
                      <Button variant="ghost" size="sm">Respond</Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
