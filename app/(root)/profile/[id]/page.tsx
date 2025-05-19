import Header from "@/components/Header";

//to go to a specific user with an id
const page = async ({params}: ParamsWithSearch) => {

    const { id }  = await params;
  return (
    <div className="wrapper page">
        <Header subHeader="Jack@gmail" title="Jack || User 1" userImg="/assets/images/dummy.jpg" />
      <h1 className='text-2xl font-karla'>USERID: {id}</h1>
    </div>
  )
}

export default page
