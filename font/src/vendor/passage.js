import { git, configFile } from "@/vendor/setting";
import axios from "axios";

const Passage = () => {};

Passage.prototype.getRootUrl = loc => {
  let { platform, user, depository } = loc;
  if (platform === "github") {
    return (
      "https://raw.githubusercontent.com/" +
      user +
      "/" +
      depository +
      "/master/"
    );
  }
};

Passage.prototype.checkConfig = rootUrl => {
  const promise = new Promise((resolve, reject) => {
    axios
      .get(rootUrl + configFile)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
  return promise;
};

export default Passage;
