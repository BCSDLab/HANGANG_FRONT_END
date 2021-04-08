import axios from "axios";

export default {
  viewLecturesOnIndexPage: async (department) => {
    const response = await axios.get(
      `/lectures?department=${department}&limit=5&page=1&sort=평점순`
    );
    return response;
  },
};
