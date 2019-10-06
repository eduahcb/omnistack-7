import ApiService from "./api";

export default class TweetService {
  constructor() {
    this._service = new ApiService("http://localhost:3000");
  }

  async getAllTweets() {
    try {
      const tweets = await this._service.get("/tweets");
      return tweets;
    } catch (error) {
      throw new Error(error);
    }
  }

  async newTweet(author, content) {
    try {
      await this._service.post("/tweets", { content, author });

      return "Tweet adicinado com sucesso";
    } catch (error) {
      throw new Error(error);
    }
  }

  async addLike (id) {

    try {
        
        const response = await this._service.post(`/likes/${id}`);

        return response;

    } catch (error) {
        throw new Error(error);
    }

  }

}
