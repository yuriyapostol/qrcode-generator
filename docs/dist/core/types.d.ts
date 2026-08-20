export type TypeNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40;
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
export type Mode = 'Numeric' | 'Alphanumeric' | 'Byte' | 'Kanji';
export type EncoderMode = 'Byte' | 'Kanji';
export type QRCodeAddDataOptions = {
    encoding?: string;
    eci?: boolean | number;
};
export type QRCodeEncoder = {
    encode: (data: string) => number[];
    eci?: number;
    modes?: EncoderMode[];
};
export type QRCodeRendererArgument = {
    name: string;
    type?: 'number' | 'string' | 'boolean' | 'object' | 'any';
    positionalOnly?: boolean;
};
export type QRCodeRendererOptions = {
    renderer?: string;
    [key: string]: any;
};
export type QRCodeRenderer = {
    args?: QRCodeRendererArgument[];
    render(this: QRCode, opts: QRCodeRendererOptions): any;
};
export type QRCodeExtension = (qr: QRCode, factory: QRCodeFactory) => void;
export interface QRCode {
    addData(data: string, mode?: Mode, opts?: QRCodeAddDataOptions): void;
    isDark(row: number, col: number): boolean;
    getModuleCount(): number;
    make(): void;
    render(): string;
    render(renderer: string, ...args: any[]): any;
    render(opts: {
        renderer: string;
        [key: string]: any;
    }): any;
}
export interface QRCodeFactory {
    (typeNumber: TypeNumber, errorCorrectionLevel: ErrorCorrectionLevel): QRCode;
    stringToBytes(s: string): number[];
    createStringToBytes(unicodeData: string, numChars: number): (s: string) => number[];
    registerEncoder(encoding: string, encoder: QRCodeEncoder): void;
    getEncoder(encoding: string): QRCodeEncoder | undefined;
    setDefaultEncoding(mode: EncoderMode, encoding: string): void;
    getDefaultEncoding(mode: EncoderMode): string | undefined;
    use(extension: QRCodeExtension): void;
    registerRenderer(name: string, renderer: QRCodeRenderer): void;
    getRenderer(name: string): QRCodeRenderer | undefined;
}
export type QRData = {
    getMode(): number;
    getLength(): number;
    write(buffer: QRBitBuffer): void;
};
export type QRBitBuffer = {
    getBuffer: () => number[];
    getAt: (index: number) => boolean;
    put: (num: number, length: number) => void;
    getLengthInBits: () => number;
    putBit: (bit: boolean) => void;
};
export type QRRSBlock = {
    totalCount: number;
    dataCount: number;
};
export type QRPolynominal = {
    getAt: (index: number) => number;
    getLength: () => number;
    multiply: (e: QRPolynominal) => QRPolynominal;
    mod: (e: QRPolynominal) => QRPolynominal;
};
