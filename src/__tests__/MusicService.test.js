/* eslint-disable no-undef,import/named */

import faker from "faker";

import {
  data as expectedResult,
  // eslint-disable-next-line
  snapshot,
  FirebaseService
} from "../services/FirebaseService";

import { MusicService } from "../services/MusicService";

jest.mock("../services/FirebaseService");

const database = FirebaseService.database();
const randomId = faker.random.uuid();

afterEach(() => {
  jest.clearAllMocks();
});

describe("Music Service", () => {
  describe("getAllAlbums", () => {
    it("should return an object with proper data", async () => {
      const expected = { name: "noname", songs: ["song"] };
      const result = await MusicService.getAllAlbums();
      expect(result).toEqual(expect.objectContaining(expected));
    });

    it("should call firebase function with proper arguments", async () => {
      await MusicService.getAllAlbums();
      expect(database.ref).toHaveBeenCalledWith("albums");
      expect(database.once).toHaveBeenCalledWith("value");
    });
  });

  describe("getSong", () => {
    it("should return an object with proper data", async () => {
      const result = await MusicService.getSong(randomId);
      expect(result).toEqual(expectedResult);
    });
  });
});
