export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    email: string;
    password: string;
    country: string;
    firstName: string;
    lastName: string;
    accountStatus: string;
    phoneNumber: string;
    refreshToken: string;
    isEmailVerified: boolean;
    gender: string;
    dob: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    referralCode: string;
    deviceRegistrationToken: string;
    deviceId: string;
    profilePicture: string;
  };
}
