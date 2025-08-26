export interface Vehicle {
  id: string;               // Use string for IDs (avoid any)
  location: string;
  latitude: number;
  longitude: number;
  temperature: number;
  startedAt?: Date;
  departedAt?: Date;
  arrivedAt?: Date;
  name?: string;            // optional string for driver name
  avatar?: string;          // optional string for avatar image URL
  vehicleModel?: string;    // added based on your data
  plate?: string;           // added based on your data
}
