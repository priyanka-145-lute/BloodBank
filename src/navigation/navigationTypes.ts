import type {NavigatorScreenParams} from '@react-navigation/native';

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

export type CampsStackParamList = {
  CampsMenu: undefined;
  PastCamps: undefined;
  UpcomingCamps: undefined;
};
export type DonorsStackParamList = {
  DonorsMenu: undefined;
  BloodDonors: undefined;
  BloodRecipients: undefined;
};
export type TabParamList = {
  Home: undefined;
  Activity: undefined;
  Camps: NavigatorScreenParams<CampsStackParamList>;
  Donors: NavigatorScreenParams<DonorsStackParamList>;
};

export type AppStackParamList = {
  MainTabs: undefined;
  DonateBlood: undefined;
  RequestBlood: undefined;
  RequestDetails: undefined;
  BloodDonateDetails: undefined;
  PastCamps: undefined;


  ActivityDetails: {
    activity: {
      id: string;
      title: string;
      date: string;
      time: string;
      location: string;
      image: string;
      description?: string;
    };
  };

  BloodBankDetails: {
    bloodBankId: string;
  };

  DonorDetails: {
    donorId: string;
  };

  EditProfile: undefined;
};



