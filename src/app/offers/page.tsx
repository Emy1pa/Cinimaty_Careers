import { InferGetServerSidePropsType } from "next";
import Offers from "./jobOffers/page";
import { JobOffer } from "../utils/interfaces";
interface ApiResponse {
  data: JobOffer[];
}
const OffersPage = async () => {
  const response = await fetch("http://localhost:5000/job-offers/");
  if (!response.ok) {
    throw new Error("Failed to fetch offers");
  }
  const responseData: ApiResponse = await response.json();
  const data = Array.isArray(responseData) ? responseData : [];
  return <Offers data={data} />;
};

export default OffersPage;
