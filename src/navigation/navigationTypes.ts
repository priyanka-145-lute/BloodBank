export type StartupStackParamList = {
  Splash: undefined;
  Intro: {
    afterOnboarding?: boolean;
  } | undefined;
  Onboarding: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  OtpVerification: {
    mobileNumber: string;
  };
  Register: undefined;
  ForgotPassword: undefined;
};

export type TabParamList = {
  Home: undefined;
  Activity: undefined;
  Camps: undefined;
  Donors: undefined;
};

export type AppStackParamList = {
  MainTabs: undefined;

  BloodBankDetails: {
    bloodBankId: string;
  };

  DonorDetails: {
    donorId: string;
  };

  EditProfile: undefined;
};



