import CardRegister from "../../components/CardRegister";
import Image from "../../../assets/register.png";

function SignUp() {
  return (
    <>
    <div className="flex w-screen h-screen bg-[#A8C686]">
      <div className="flex items-center m-auto w-[80%] h-[80%] bg-[#F0F8EA] border-[20px] border-[#FFFFFF] rounded-[15px]">
        <div className='w-[65%] flex justify-center items-center'>
          <CardRegister />
        </div>
        <div className="flex flex-col bg-[#A3CEF1] justify-evenly items-center h-full w-[35%]">
          <div className="h-[25%] flex justify-center items-center">
            <p className="text-[#FFFFFF] font-sans text-[25px] pl-8">
              A plataforma mais eficiente para cultivar o seu negócio.
            </p>
          </div>
          <img src={Image} alt="" className="w-[600px] h-[75%]" />
        </div>
      </div>
    </div>
  </>
  );
}

export default SignUp;
