export interface UserProfile {
    id: number;
    userId: number;
    firstName: string;
    middleName: string;
    lastName: string;

    //address
    address1: string;
    address2: string;
    city: string;
    zipCode: string;
    state: string;
    country: string;

    emailAddress: string;
    password: string;
    securityQuestion: string;
    crmPassword: string;
    role: string;

    //participation type: 1- basic, 2- enhanced, 3- advanced
    participationType: number;

    //phone
    phoneNumber: number;
    otherNumber: number;

    occupation: string;
    yrsOfExperience: number;
    jobTitle: string;

    sector1: string;
    sector2: string;
    sector3: string;
    sector4: string;
    sector5: string;
    sector6: string;

    isFinra: boolean;
    crd: string;
    yrsOfInvestmentExp: number;
    typeOfInvestments: string;

    isBonds: boolean;
    isAnnuities: boolean;
    isMutualFunds: boolean;
    isPrivatePlacements: boolean;
    isEquities: boolean;
    isRealEstate: boolean;

    isGoodServices: boolean;
    isHealthCare: boolean;
    isIndustrials: boolean;
    isNaturalResources: boolean;
    isTechnology: boolean;
    isEntertainment: boolean;
    isAllAny: boolean;

    investibleAssets: number;
    investmentTime: number;
    annualReturn: number;
    marketCap: number;
    riskToleranceHigh: number;
    riskToleranceMedium: number;
    riskToleranceLow: number;
    awareOfManagementTeam: number;
    newInitiationsOfResearch: number;
    updateUpcomingInvestorConf: number;
    landingPage: number;

    accreditedInvestor: number;
}
