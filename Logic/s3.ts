import osProxy from '../proxies/object-strorage.proxy';

export class productLogic {
  private yaronS3: osProxy;

  constructor() {
    const yaronCred = {
      endPoint: process.env.OS_END_POINT2,
      accessKey: process.env.OS_ACCESS_KEY2,
      secretAccessKey: process.env.OS_SECRET_ACCESS_KEY2,
      bucket: process.env.OS_BUCKET2
    };
    this.yaronS3 = new osProxy(yaronCred);
  }

  public async readS3(productPath: string) {
    const res = await this.fetchProduct(productPath);
  }

  public async fetchProduct(key: string): Promise<any> {
    const res = await this.yaronS3.getObject(key);
    return res && res.body;
  }
}
