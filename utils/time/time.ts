const DateString = (dateString : any) => {
    const date = new Date(dateString);
  
    // Format day and month with leading zeros if necessary
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    // Format hours and minutes with leading zeros if necessary
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    // Combine formatted components into desired format
    const formattedDate = `${day}/${month}/${year}, ${hours}:${minutes}`;
    
    return formattedDate;
}

export default DateString;