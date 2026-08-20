import { QRCodeRenderer } from '../../core/types';
export declare const registerRenderer: (name: string, renderer: QRCodeRenderer) => void;
export declare const getRenderer: (name: string) => QRCodeRenderer | undefined;
