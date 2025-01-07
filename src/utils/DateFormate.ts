
export const formatDate = (dateString: string): { date: string; time: string } => {
  const date = new Date(dateString);

  // Format the date
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = date.toLocaleString("en-GB", dateOptions);

  // Format the time
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour format
  };
  const formattedTime = date.toLocaleString("en-GB", timeOptions);

  return {
    date: formattedDate, // e.g., "17 December, 2024"
    time: formattedTime, // e.g., "19:33:03"
  };
};


// export const { date, time } = formatDate(dateString);

// const DateComponent: React.FC = () => {
//   const dateString = "2024-12-17 19:33:03";
 

//   return (
//     <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//       <p className="text-lg font-semibold text-gray-800">
//         Formatted Date: <span className="text-blue-600">{date}</span>
//       </p>
//       <p className="text-lg font-semibold text-gray-800">
//         Formatted Time: <span className="text-blue-600">{time}</span>
//       </p>
//     </div>
//   );
// };

// export default DateComponent;