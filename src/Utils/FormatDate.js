const formatDateTime = (datetime) => {
    const date = new Date(datetime);
  
    const options = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',  
    };
  
    const formattedDate = new Intl.DateTimeFormat('en-IN', options).format(date);
    return formattedDate;
  };

  export default formatDateTime;