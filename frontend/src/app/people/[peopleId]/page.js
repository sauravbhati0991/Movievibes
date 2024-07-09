"use client";
import { useParams } from "next/navigation";
import PeopleDetails from "@/pages/PeopleDetails";

export default function PeopleDeatilsPage() {
  const params = useParams();
  const peopleIdArr = params.peopleId.split("-");
  const peopleId = peopleIdArr[peopleIdArr.length - 1];
  return (
    <>
      <PeopleDetails id={peopleId} />
    </>
  );
}
