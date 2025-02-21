import BannerImage from "../components/BannerImage"
import GetStarted from "../components/GetStarted"

const StartPage = () => {
  return (
    <div className="w-full h-screen bg-white flex justify-center items-center gap-8 p-8">
      <BannerImage />
      <GetStarted />
    </div>
  )
}
export default StartPage