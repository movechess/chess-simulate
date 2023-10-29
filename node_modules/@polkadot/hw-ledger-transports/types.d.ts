import type * as HwTransport from '@ledgerhq/hw-transport';
export type TransportType = 'hid' | 'webusb';
export type Transport = HwTransport.default;
export interface TransportDef {
    /** Create a transport to be used in Ledger operations */
    create(): Promise<Transport>;
    /** The type of the underlying transport definition */
    type: TransportType;
}
