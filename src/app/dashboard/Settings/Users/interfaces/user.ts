export interface User {
    id:              string;
    fullName:  string;
    email:           string;
    isActive:    boolean;
    role:            number;
    providerId:     number;
    commissions?: UserCommission[];
}

export interface UserCommission {
    id:             string;
    userId?:         string;
    commissionId?:   string;
    user?:           null;
    commissionType: CommissionType;
    startDate?:      Date;
    endDate?:        null;
    cobrado?:        boolean;
    isActive?:       boolean;
}

export interface CommissionType {
    id:              string;
    percentage:      number;
    name:            string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userCommissions: any[];
}
