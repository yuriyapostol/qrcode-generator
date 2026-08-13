declare module '@upng/upng-js' {
  export interface UPNGModule {
    encode(imgs: ArrayBuffer[], w: number, h: number, cnum: number, dels?: number[]): ArrayBuffer;
  }

  const UPNG : UPNGModule;
  export default UPNG;
}
