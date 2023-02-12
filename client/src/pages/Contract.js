import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ContractAgree from "./ContractAgree";
import { Link } from "react-router-dom";

import { ethers } from "ethers";

import {erc20_ABI, erc20_contractAddress} from '../contract/ERC20_ABI';

function Contract() {
  const [agreement, setAgreement] = useState({
    tenantAgreement: "", // 특약조항
    contractPeriod: "", // 계약기간
  });

  const ethereum = window.ethereum;
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const makingContract = new ethers.Contract(erc20_contractAddress, erc20_ABI, provider);

  const location = useLocation();
  const navigate = useNavigate();

  const tokenId = location.state.tokenId
  const types = location.state.types // 전세 or 월세
  const address = location.state.address
  const deposit = location.state.deposit
  const rental = location.state.rental
  const description = location.state.description
  console.log(location)

  // 특약사항 post
  function handleSubmit(e) {
    e.preventDefault();
    const landlord_address=ethereum.selectedAddress;
    console.log(tokenId);
    axios.post("http://localhost:8080/contract/make", {landlord_address, deposit, types, agreement, tokenId})
    .then(e=>{
      axios
      .post("http://localhost:8080/contract/tenantcheck", agreement)
      .then((result) => {
        console.log(result);
        setAgreement({ tenantAgreement: agreement.tenantAgreement });
        navigate("/mypage");
      })
      .catch((e) => console.log(e));}
    )

    
  }


  const handleInputValue = (key) => (e) => {
    setAgreement({ ...agreement, [key]: e.target.value });
  };

  const currentTime = new Date();
  const TwoyearTime = new Date(currentTime.setFullYear(currentTime.getFullYear() + 2)); // 2년 후
  const realTime = new Date(); // 현재

  return (
    <div>
      <div className="flex mt-20">
        <div className="mx-auto w-full max-w-2xl rounded-lg px-10 py-8 shadow-xl">
          <div className="mx-auto space-y-6">
            <p>1. 부동산의 표시</p>
            <p>2. 계약 내용</p>
            <p>
              제 1조 (목적) 위 부동산의 임대차에 한하여 임대인과 임차인은 합의에
              의하여 임차보증금 및 차임을 아래와 같이 지불하기로 한다.
            </p>
            <p>
              제 2조 (존속기간) 임대인은 위 부동산을 임대차 목적대로 사용,
              수익할 수 있는 상태로{" "}
              <div className="font-bold">{realTime.toString()}</div>까지
              임차인에게 인도하며, 임대차 기간은 인도일로부터 24개월 후인{" "}
              <div className="font-bold">{TwoyearTime.toString()}</div>일까지로
              한다.
            </p>
            <p>
              제 3조 (용도변경 및 전대 등) 임차인은 임대인의 동의없이 위
              부동산의 용도나 구조를 변경하거나 전대, 임차권 양도 또는
              담보제공을 하지 못하여 임대차 목적 이외의 용도로 사용할 수 없다.
            </p>
            <p>
              제 4조 (계약의 해지) 임차인의 차임연체액이 2기의 차임액에 달하거나
              제3조를 위반하였을 때 임대인은 즉시 본 계약을 해지할 수 있다.
            </p>
            <p>
              제 5조 (계약의 종료) 임대차계약이 종료된 경우에 임차인은 위
              부동산을 원상으로 회복하여 임대인에게 반환한다. 이러한 경우
              임대인은 보증금을 임차인에게 반환하고, 연체 임대료 또는
              손해배상금이 있을 때는 이들을 제하고 그 잔액을 반환한다.
            </p>
            <p>
              제 6조 (계약의 해제) 임차인이 임대인에게 중도금(중도금이 없을 때는
              잔금)을 지불하기 전까지, 임대인은 계약금의 배액을 상환하고,
              임차인은 계약금을 포기하고 본 계약을 해제할 수 있다.
            </p>
            <p>
              제 7조 (채무불이행과 손해배상) 임대인 또는 임차인이 본 계약상의
              내용에 대하여 불이행이 있을 경우 그 상대방은 불이행한 자에 대하여
              서면으로 최고하고 계약을 해제 할 수 있다. 그리고 계약 당사자는
              계약해제에 따른 손해배상을 각각 상대방에 대하여 청구할 수 있다.
            </p>
            <p>
              제 8조 (중개보수) 개업공인중개사는 임대인과 임차인이 본 계약을
              불이행 함으로 인한 책임을 지지 않는다. 또한, 중개보수는 본
              계약체결과 동시에 계약 당사자 쌍방이 각각 지불하며,
              개업공인중개사의 고의나 과실 없이 본 계약이 무효취소 또는
              해제되어도 중개수수료는 지급한다. 공동중개인 경우에 임대인과
              임차인은 자신이 중개 의뢰한 개업공인중개사에게 각각 중개보수를
              지급한다.(중개보수는 거래가액의 -%로 한다).
            </p>
            <p>
              제 9조 (중개대상물확인-설명서교부 등) 개업공인중개사는 중개대상물
              확인, 설명서를 작성하고 업무보증관계증서(공제증서 등) 사본을
              첨부하여 계약체결과 동시에 거래당사자 쌍방에게 교부한다.
            </p>
          </div>
        </div>
      </div> 
      <div className="mt-5 flex flex-col items-center justify-center w-full mx-auto">
        <div className="bg-white p-10 flex flex-col items-center justify-center w-full shadow-xl rounded-xl">
          <div className="flex flex-col items-center justify-center"></div>
          <form action="" class="w-full">
            {/* <div id="input" class="flex flex-col items-center w-full my-5">
              <label for="username" class="text-gray-500 mb-2">
                계약자 ID
              </label>
              <input
                type="text"
                id="username"
                className="text-black border border-blue-700 bg-white max-w-sm font-mono text-sm py-3 px-4 w-[500px] rounded-md"
              />
            </div> */}
            <div id="input" class="flex flex-col justify-center items-center w-full my-5">
              <label for="username" class="text-black mb-2">
                주소
              </label>
              <input
                value={address}
                type="text"
                id="username"
                className="text-black border border-blue-700 bg-white max-w-sm font-mono text-sm py-3 px-4 w-[500px] rounded-md"
              />
            </div>
            <div id="input" class="flex flex-col justify-center items-center w-full my-5">
              <label for="username" class="text-black mb-2">
                임대주택 유형 
              </label>
              <input
                value={types}
                type="text"
                id="username"
                className="text-black border border-blue-700 bg-white max-w-sm font-mono text-sm py-3 px-4 w-[500px] rounded-md"
              />
            </div>
            <div id="input" class="flex flex-col justify-center items-center w-full my-5">
              <label for="username" class="text-black mb-2">
                계약기간
              </label>
              <input
                value={agreement.contractPeriod}
                onChange={handleInputValue("contractPeriod")}
                type="text"
                placeholder="2023.01.01~2025.01.01"
                id="username"
                className="text-black border border-blue-700 bg-white max-w-sm font-mono text-sm py-3 px-4 w-[500px] rounded-md"
              />
            </div>
            <div id="input" class="flex flex-col justify-center items-center w-full my-5">
              <label for="username" class="text-black mb-2">
                보증금
              </label>
              <input
                value={deposit}
                type="text"
                id="username"
                className="text-black border border-blue-700 bg-white max-w-sm font-mono text-sm py-3 px-4 w-[500px] rounded-md"
              />
            </div>

            <div id="input" class="flex flex-col justify-center items-center w-full my-5">
              <label for="username" class="text-black mb-2">
                월세
              </label>
              <input
                value={rental}
                type="text"
                id="username"
                className="text-black border border-blue-700 bg-white max-w-sm font-mono text-sm py-3 px-4 w-[500px] rounded-md"
              />
            </div>

            <div id="input" class="flex flex-col justify-center items-center w-full my-5">
              <label for="username" class="text-black mb-2">
                설명
              </label>
              <input
                value={description}
                type="text"
                id="username"
                className="text-black border border-blue-700 bg-white max-w-sm font-mono text-sm py-3 px-4 w-[500px] rounded-md"
              />
            </div>

            <div id="input" class="flex flex-col justify-center items-center w-full my-5">
              <label for="username" class="text-black mb-2">
                특약조항, 주의사항
              </label>
              <input
                value={agreement.tenantAgreement}
                onChange={handleInputValue("tenantAgreement")}
                type="text"
                id="username"
                className="text-black border border-blue-700 bg-white max-w-sm font-mono text-sm py-3 px-4 w-[500px] rounded-md"
              />
            </div>

            <label for="username" class="text-black mb-2 flex flex-col justify-center items-center">
              개인정보 동의서
              <input type="checkbox" className="mx-1 "></input>
            </label>
          </form>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Link to={`/contractAgree`} state={{
          address: address,
          deposit: deposit,
          types: types,
          description: description,
          rental: rental,
          agreement: agreement.tenantAgreement,
          contractPeriod: agreement.contractPeriod,
          tokenId: tokenId
        }}>
          <button
            type="submit"
            // onClick={handleSubmit}
            className="mt-20 mx-auto block w-1/4 translate-x-full translate-y-1/2 rounded-md bg-black px-4 py-2 text-center font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-gray-500 focus:outline-none"
          >
            계약합니다
          </button>
        </Link>
      </form>

    </div>
  );
}

export default Contract;
