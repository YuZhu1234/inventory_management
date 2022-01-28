
export interface dataReturn{
    formInline:FormInline,
    CustomerData:Array<CustomerFormat>,
    dialogVisible:boolean,
    CustomerDetail:any
}

export interface FormInline{
    user: string,
    region: string,
  }
  
export interface DataReturn{
    formInline: FormInline,
    CustomerData: Array<CustomerFormat>,
    CustomerDataFormat: Array<string>,
    LabeWidth: string
  }

export interface CustomerFormat{
    customerId:number,
    customerCode:string,
    name:string,
    shortName:string,
    customerLevelValue:string,
    taxScale_value:string,
    creditLimit:number,
    customerTypeValue:string,
    headquarters:string,
    bizArea:string,
    area:string,
    website:string,
    corporate:string,
    corporatePhone:string,
    contactsFinancial:string,
    phoneFinancial:string,
    unitInvoice:string,
    bankInvoice:string,
    bankidInvoice:string,
    taxInvoice:string,
    phoneInvoice:string,
    accountInvoice:string,
    addressInvoice:string,
    unitPayment:string,
    bankPayment:string,
    bankidPayment:string,
    accountPayment:string,
    accountReceipt:string,
    postcodeReceipt:string,
    addressReceipt:string,
    phoneReceipt:string,
    faxReceipt:string,
    attachment:string,
    remark:string,
    isEnabled:number,
    createBy:string,
    createTime:string,
    updateBy:string,
    updateTime:string,
    modifiedDate:string
}