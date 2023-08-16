export interface FilterObject { label: string, search?: string, variable: string | any, check: boolean, value: any, placeholder: string, isDisable?: boolean, isMultiple?: boolean, options?: { label: string | {}, value: number | string |boolean }[], type: string }
export class ConstantFilterVariable {
    public static customerName = 'customer';
    public static vendorName = 'vendor';
    public static subledgervoucher = 'subledgervoucher';
    public static transactionID = 'transactionID';
    public static account = 'account';
    public static postingType = 'postingType';
    public static journalCategory = 'journalCategory';
    public static journalNumber = 'journalNumber';
    public static description = 'description';
    public static counterPartyVATCountry = 'counterPartyVATCountry';
    public static IsReportedVAT = 'IsReportedVAT';

    public static date = 'date';
}
export class ConstantFilterLabel {
    public static date = 'Date';
    public static customerName = 'Customer Name';
    public static subledgervoucher = 'Subledger Voucher';
    public static transactionID = 'Transaction ID';
    public static vendorName = 'Vendor Name';
    public static account = 'Account';
    public static postingType = 'Posting Type';
    public static journalCategory = 'Journal Category';
    public static journalNumber = 'Journal Number';
    public static description = 'Description';
    public static counterPartyVATCountry = 'Counter Party VAT Country';
    public static IsReportedVAT = 'Is Reported Vat';
}

export interface SearchCriteria {
    toDate?: string;
    fromDate?: string;
    pagination?: 'enable' | 'disable';
    page?: number | Number;
    size?: number | Number;
}

const Filters: FilterObject[] = [
    { label: ConstantFilterLabel.date, variable: ConstantFilterLabel.date, check: false, value: { fromDate: '', toDate: '' }, placeholder: "", options: [], type: "date" },
    { label: ConstantFilterLabel.customerName, variable: ConstantFilterVariable.customerName, check: false, value: "", placeholder: "", options: [], type: "text" },
    { label: ConstantFilterLabel.subledgervoucher, variable: ConstantFilterVariable.subledgervoucher, check: false, value: "", placeholder: "", options: [], type: "text" },
    { label: ConstantFilterLabel.vendorName, variable: ConstantFilterVariable.vendorName, check: false, value: "", placeholder: "", options: [], type: "text" },
    { label: ConstantFilterLabel.transactionID, variable: ConstantFilterVariable.transactionID, check: false, value: "", placeholder: "", options: [], type: "text" },
    { label: ConstantFilterLabel.account, variable: ConstantFilterVariable.account, check: false, value: "", placeholder: "", options: [], type: "text" },
    { label: ConstantFilterLabel.postingType, variable: ConstantFilterVariable.postingType, check: false, value: "", placeholder: "", options: [], type: "text" },
    { label: ConstantFilterLabel.journalNumber, variable: ConstantFilterVariable.journalNumber, check: false, value: "", placeholder: "", options: [], type: "text" },
    { label: ConstantFilterLabel.journalCategory, variable: ConstantFilterVariable.journalCategory, check: false, value: "", placeholder: "", options: [], type: "text" },
    { label: ConstantFilterLabel.description, variable: ConstantFilterVariable.description, check: false, value: "", placeholder: "", options: [], type: "text" },
    { label: ConstantFilterLabel.counterPartyVATCountry, variable: ConstantFilterVariable.counterPartyVATCountry, check: false, value: "", placeholder: "", options: [], type: "text" },
    { label: ConstantFilterLabel.IsReportedVAT, variable: ConstantFilterVariable.IsReportedVAT, check: false, value: "", placeholder: "", options: [{label:'True',value:true},{label:'False',value:false}], type: "select" },
]
export function GetAllFilters() {
    return JSON.parse(JSON.stringify(Filters));
};

export function GetSelectedFilters(variables: string[]) {
    var filters: FilterObject[] = [];
    for (var variable of variables) {
        const field = Filters.find(field => field.variable == variable || field.label == variable);
        if (field) {
            filters.push(field);
        }
    }
    return JSON.parse(JSON.stringify(filters));
};
