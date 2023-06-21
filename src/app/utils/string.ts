export function randomString(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  export function parseStringArray(s: string) {
    if (!s) {
      return [];
    }
    return s.split(',');
  }
  
  export function getLines(text: string): string[] {
    const lines = text.split('\n');
    const codes = [];
    for (const line of lines) {
      const l = line.trim();
      if (l) {
        codes.push(l);
      }
    }
  
    return codes;
  }
  
  export function getTextLineCount(text: string) {
    if (!text) {
      return 0;
    }
    const seps = text.split('\n');
    let c = 0;
    for (const sep of seps) {
      if (sep.trim()) {
        c++;
      }
    }
    return c;
  }
  
  export function dataURItoBlob(dataURI: string) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = unescape(dataURI.split(',')[1]);
    }
  
    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  
    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([ia], { type: mimeString });
  }
  