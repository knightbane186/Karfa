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



// import dummyData from '../data/BdummyData';

// const searchLogic = (
//   query: string, 
//   maxPrice: number, 
//   selectedDate: Date, 
//   availability: string,
//   selectedTime: number
// ) => {
//   try {
//     const filtered = dummyData.filter((item) => {
//       // Match query with title or category (case-insensitive and includes)
//       const matchesQuery = query 
//         ? item.title.toLowerCase().includes(query.toLowerCase()) || 
//           item.category.toLowerCase().includes(query.toLowerCase())
//         : true;

//       // Check price
//       const matchesPrice = maxPrice ? item.price <= maxPrice : true;

//       // Check availability
//       const matchesAvailability = availability 
//         ? item.status.toLowerCase() === availability.toLowerCase() 
//         : true;

//       // Check if selected time is within opening hours
//       const isWithinOpenHours = selectedTime >= item.openTime && selectedTime < item.closeTime;

//       return matchesQuery && matchesPrice && matchesAvailability && isWithinOpenHours;
//     });

//     console.log('Filtered results:', filtered); // Add this line for debugging

//     return filtered;
//   } catch (error) {
//     console.error("Error in searchLogic:", error);
//     return [];
//   }
// };

// export default searchLogic;







// // SearchLogic.tsx
// import dummyData from '../data/dummyData';

// const searchLogic = (
//   query: string, 
//   distance: number, 
//   selectedDate: Date, 
//   availability: string,
//   selectedTime: number
// ) => {
//   try {
//     const filtered = dummyData.filter((item) => {
//       // Match query with title or category (case-insensitive and exact match)
//       const matchesQuery = query 
//         ? item.title.toLowerCase() === query.toLowerCase() || 
//           item.category.toLowerCase() === query.toLowerCase()
//         : true;

//       // Check distance
//       const matchesDistance = distance ? item.distance <= distance : true;

//       // Check availability
//       const matchesAvailability = availability 
//         ? item.status.toLowerCase() === availability.toLowerCase() 
//         : true;

//       // Check if selected time is within opening hours
//       const itemOpenTime = parseInt(item.openTime.split(':')[0]);
//       const itemCloseTime = parseInt(item.closeTime.split(':')[0]);
//       const isWithinOpenHours = selectedTime >= itemOpenTime && selectedTime < itemCloseTime;

//       return matchesQuery && matchesDistance && matchesAvailability && isWithinOpenHours;
//     });

//     console.log('Filtered results:', filtered); // Add this line for debugging

//     return filtered;
//   } catch (error) {
//     console.error("Error in searchLogic:", error);
//     return [];
//   }
// };

// export default searchLogic;





// // searchLogic.tsx
// import dummyData from '../data/dummyData';

// const searchLogic = (query: string, distance: number, date: Date, availability: string) => {
//   try {
//     // Filter data based on the query and parameters
//     const filtered = dummyData.filter((item) => {
//       const matchesQuery = query ? item.title.toLowerCase().includes(query.toLowerCase()) : true;
//       const matchesDistance = distance ? item.distance <= distance : true;
//       const matchesAvailability = availability ? item.status.toLowerCase() === availability.toLowerCase() : true;

//       // Add any additional filtering logic if necessary (e.g., matching the date)
//       return matchesQuery && matchesDistance && matchesAvailability;
//     });

//     return filtered;
//   } catch (error) {
//     console.error("Error in searchLogic:", error);
//     return []; // Return an empty array if there's an error
//   }
// };

// export default searchLogic;

