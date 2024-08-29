export interface UserData {
  id: string;
  username: string;
  password: string;
  name: string;
  mobileNumber: string;
  accountType: 'normal' | 'business';
  // Add any other fields you need for user profiles
}

const UDummyData: UserData[] = [];

export const addUser = (userData: UserData) => {
  UDummyData.push(userData);
};

export const findUser = (username: string, password: string) => {
  return UDummyData.find(user => user.username === username && user.password === password);
};

export default UDummyData;
