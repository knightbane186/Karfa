


// searchLogic.tsx
import dummyData from '../data/dummyData';

const searchLogic = (query: string, distance: number, date: Date, availability: string) => {
  try {
    // Filter data based on the query and parameters
    const filtered = dummyData.filter((item) => {
      const matchesQuery = query ? item.title.toLowerCase().includes(query.toLowerCase()) : true;
      const matchesDistance = distance ? item.distance <= distance : true;
      const matchesAvailability = availability ? item.status.toLowerCase() === availability.toLowerCase() : true;

      // Add any additional filtering logic if necessary (e.g., matching the date)
      return matchesQuery && matchesDistance && matchesAvailability;
    });

    return filtered;
  } catch (error) {
    console.error("Error in searchLogic:", error);
    return []; // Return an empty array if there's an error
  }
};

export default searchLogic;

// // SearchLogic.tsx
// import dummyData from '../data/dummyData';

// interface SearchLogicProps {
//   query: string;
// }

// export const searchLogic = (query: string) => {
//   if (query) {
//     const filtered = dummyData.filter((item) =>
//       item.title.toLowerCase().includes(query.toLowerCase())
//     );
//     return filtered;
//   } else {
//     return dummyData;
//   }
// };

// export default searchLogic;



// interface DataItem {
//     id: number;
//     title: string;
//     distance: number;
//     price: string;
//     status: string;
//     imageUrl: string;
//     category: string;
//     categoryType: string;
//     bookingSlots: string;
//     location: string;
//     openTime: string;
//     closeTime: string;
//   }
  
//   const searchLogic = (
//     data: DataItem[],
//     keyword: string,
//     distance: number,
//     price: number,
//     date: Date
//   ): DataItem[] => {
//     return data.filter(item => {
//       const itemDistance = item.distance;
//       const itemPrice = parseFloat(item.price.replace('$', ''));
//       const keywordMatch = item.title.toLowerCase().includes(keyword.toLowerCase());
      
//       // Implement date-based filtering logic if needed in the future
      
//       return itemDistance <= distance && itemPrice <= price && keywordMatch;
//     });
//   };
  
//   export default searchLogic;