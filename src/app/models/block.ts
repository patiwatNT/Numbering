export interface Block {
  createAt?: any;
  lastModifiedAt?: any;
  createdBy?: any;
  lastModifiedBy?: any;
  blockId: number;
  provide: string;
  blockAmount: number;
  numberAmount: number;
  feeAmount: number;
}