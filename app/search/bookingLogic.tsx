// bookingLogic.ts

export interface BookingState {
    pricePerPerson: number;
    selectedPeople: number;
    selectedSlots: string[];
  }
  
  export const calculateTotalPrice = (state: BookingState): number => {
    return state.pricePerPerson * state.selectedPeople * state.selectedSlots.length;
  };
  
  export const getConfirmButtonText = (state: BookingState): string => {
    const totalPrice = calculateTotalPrice(state);
    return `Confirm Booking for $${totalPrice}`;
  };
  
  export const isBookingValid = (state: BookingState): boolean => {
    return state.selectedPeople > 0 && state.selectedSlots.length > 0;
  };