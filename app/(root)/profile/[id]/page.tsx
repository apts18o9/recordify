import Header from "@/components/Header";
import { dummyCards } from "@/constants";
import VideoCard from "@/components/VideoCard";
//to go to a specific user with an id
const page = async ({params}: ParamsWithSearch) => {

    const { id }  = await params;
  return (
    <div className="wrapper page">
        <Header subHeader="Jack@gmail" title="Jack || User 1" userImg="/assets/images/dummy.jpg" />
      

      <section className='video-grid'>
          {dummyCards.map((card)=> (
            <VideoCard key={card.id} {...card} />
          ))}
      </section>

    </div>
  )
}

//this page is for public profile

export default page
