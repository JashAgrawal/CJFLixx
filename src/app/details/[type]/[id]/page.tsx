import VideoDetails from "@/components/details/details";

const Page = ({ params }: { params: { type: string; id: string } }) => {
  return <VideoDetails type={params.type} id={params.id} showPlayButton />;
};

export default Page;
