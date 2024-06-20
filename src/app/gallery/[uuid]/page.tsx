import { redirect } from "next/navigation";
import "./globals.css";
import OchreImageGallery from "./OchreImageGallery";

/*
export default function Page(
  {
    params, 
  }: {
    params: { uuid: string };
  },
  {
    searchParams, 
  }: {
    searchParams: { page: string; per_page: string };
  }
) {
*/
export default function Page({ params, searchParams }) {
  const page = searchParams.page || "1";
  const perPage = searchParams.per_page || "10";
  const uuid = params.uuid;

  return (
    <OchreImageGallery
      className="imagegallery"
      resultsPageInput={true}
      resultsPageInitial={page}
      resultsPerPageInput={true}
      resultsPerPageInitial={perPage}
      resultsPerPageOptions={[10, 20, 40]}
      showLabels={true}
      showLabelsInput={true}
      uuid={uuid}
    />
  );
}
