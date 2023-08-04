export interface FilterObject { label: string, search?:string,variable: string | any, check: boolean, value: any, placeholder: string,isDisable?: boolean,isMultiple?:boolean, options?: { label: string | {}, value: number | string }[], type: string }
export class ConstantFilterVariable {
    public static customerName = 'customer';
    public static vendorName = 'vendor';
    public static subledgervoucher = 'subledgervoucher';
    public static date='date';
}
export class ConstantFilterLabel {
    public static date = 'date';
    public static customerName = 'Customer Name';
    public static subledgervoucher = 'Subledger Voucher';
    public static vendorName = 'Vendor Name';
}

export interface SearchCriteria {
    toDate?: string;
    fromDate?: string;
    pagination?: 'enable' | 'disable';
    page?: number | Number;
    size?: number | Number;
}

const Filters: FilterObject[] = [
    { label: ConstantFilterLabel.date, variable: ConstantFilterLabel.date, check: false, value: {fromDate:'',toDate:''}, placeholder: "", options: [], type: "date" },
    { label: ConstantFilterLabel.customerName, variable: ConstantFilterVariable.customerName, check: false, value: "", placeholder: "e.g Jhon Doe", options: [], type: "text" },
    { label: ConstantFilterLabel.subledgervoucher, variable: ConstantFilterVariable.subledgervoucher, check: false, value: "", placeholder: "e.g Jhon Doe", options: [], type: "text" },
    { label: ConstantFilterLabel.vendorName, variable: ConstantFilterVariable.vendorName, check: false, value: "", placeholder: "e.g Jhon Doe", options: [], type: "text" },
]
export function GetAllFilters() {
    return JSON.parse(JSON.stringify(Filters));
};

export function GetSelectedFilters(variables: string[] ) {
    var filters: FilterObject[] = [];
    for (var variable of variables) {
        const field = Filters.find(field => field.variable == variable || field.label == variable );
        if (field) {
            filters.push(field);
        }
    }
    return JSON.parse(JSON.stringify(filters));
};
