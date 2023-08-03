interface UniversityModel {
    name: string;
    location: {
      Country: string;
      City: string;
    };
    description: string;
    isFavorite: boolean;
    website: string;
    currency: string;
    Language: string;
    population: number;
  }