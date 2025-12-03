export interface Commission {
    id?:              string;
    percentage:      number;
    name:            string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userCommissions?: any[];
}
