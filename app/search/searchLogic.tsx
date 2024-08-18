
// SearchLogic.tsx
import dummyData from '../data/dummyData';

interface SearchLogicProps {
  query: string;
}

export const searchLogic = (query: string) => {
  if (query) {
    const filtered = dummyData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    return filtered;
  } else {
    return dummyData;
  }
};

export default searchLogic;



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