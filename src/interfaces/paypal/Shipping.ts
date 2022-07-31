import { CurrencyCode } from "../CurrencyCode/CurrencyCode"

export interface ShippingAddress {
    address_line_1: string
    address_line_2: string,
    admin_area_2: string,
    admin_area_1: string,
    postal_code: string,
    country_code: string
};

export interface ShippingAmount {
    currency_code: CurrencyCode,
    value: string
}