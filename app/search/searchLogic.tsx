import dummyData from '../data/BdummyData';

const searchLogic = (
  query: string, 
  maxPrice: number, 
  selectedDate: Date, 
  availability: string,
  selectedTime: number,
  suburb: string
) => {
  try {
    const filtered = dummyData.filter((item) => {
      // Match query with title or category (case-insensitive and includes)
      const matchesQuery = query 
        ? item.title.toLowerCase().includes(query.toLowerCase()) || 
          item.category.toLowerCase().includes(query.toLowerCase())
        : true;

      // Check price
      const matchesPrice = maxPrice ? item.price <= maxPrice : true;

      // Check availability
      const matchesAvailability = availability 
        ? item.status.toLowerCase() === availability.toLowerCase() 
        : true;

      // Check if selected time is within opening hours
      const isWithinOpenHours = selectedTime >= item.openTime && selectedTime < item.closeTime;

      // Check suburb
      const matchesSuburb = suburb
        ? item.suburb.toLowerCase() === suburb.toLowerCase()
        : true;

      return matchesQuery && matchesPrice && matchesAvailability && isWithinOpenHours && matchesSuburb;
    });

    console.log('Filtered results:', filtered); // Add this line for debugging

    return filtered;
  } catch (error) {
    console.error("Error in searchLogic:", error);
    return [];
  }
};

export default searchLogic;


