import { MongoClient, Collection } from 'mongodb';

const MongoHelper = {
  client: null as MongoClient,

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  async disconnect(): Promise<void> {
    await this.client.close();
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },

  parseEntity({ _id, ...collectionRest }: any) {
    return {
      id: _id,
      ...collectionRest,
    };
  },
};

export { MongoHelper };
