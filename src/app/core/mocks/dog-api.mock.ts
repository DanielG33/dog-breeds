import { BreedImageApiResponse, BreedListApiResponse } from "../models/dog-api.model";

export const MOCK_BREED_LIST_RESPONSE: BreedListApiResponse = {
  message: {
    "dalmatian": [],
    "dane": [
      "great"
    ],
    "pitbull": [],
    "poodle": [
      "medium",
      "miniature",
      "standard",
      "toy"
    ],
    "rottweiler": []
  },
  status: "success"
}

export const MOCK_IMAGE_RESPONSE: BreedImageApiResponse = {
  message: 'https://images.dog.ceo/breeds/hound-blood/n02088466_2030.jpg',
  status: 'success'
};
