export const dummyCompanyNames = [
    "Google", "Apple", "Microsoft", "Amazon", "Meta", "Tesla", "Netflix", "Nvidia", "Samsung", "Intel",
    "IBM", "Oracle", "Cisco", "HP", "Dell", "Adobe", "Salesforce", "Shopify", "Zoom", "Spotify",
    "Uber", "Lyft", "Airbnb", "Pinterest", "Snapchat", "Block", "PayPal", "Visa", "Mastercard",
    "Goldman", "Morgan", "Coca-Cola", "PepsiCo", "Starbucks", "McDonald's", "Nike", "Adidas", "Walmart", "Target",
    "Costco", "FedEx", "UPS", "Boeing", "Ford", "Toyota", "Honda", "Volkswagen", "BMW",
    "Pfizer", "Merck", "Moderna",
    "Disney", "Comcast", "Sony", "Nintendo",
    "ExxonMobil", "Chevron", "Shell", "BP"
  ];
  
  

export const generateLogoUrl = (companyName) => {
    const encodedCompanyName = encodeURIComponent(companyName.toLowerCase());
    return `https://img.logo.dev/${encodedCompanyName}.com?token=pk_dqjHRZn0SVy0PxTcNDUvuA`;
};
