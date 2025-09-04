"use client"

import { Container } from "@/components/container";
import { VoucherContext, VouchersDataProps,  } from "@/providers/voucherContext";
import { useContext, useEffect, useState } from "react";
import { NewVoucherModal } from "./components/modalNew";
import { VoucherInfo } from "./components/vouchersInfo";
import { ModalInfo } from "./components/modalInfo";
import { CatchErrors } from "@/components/catchErrors";

export default function Dashboard(){
  const {
    isOpen,
    isOpenInfoModal, 
    onRequestOpen, 
    getVouchers,
    selectedVoucher,
    vouchers,
  } = useContext(VoucherContext);


  useEffect(() => {

    async function getVoucherInfo(){
      try{
        await getVouchers();

      }catch(err){
        console.error(err);
        CatchErrors(err);
      }
    }

    getVoucherInfo();
  }, [])

  function openModal(){
    onRequestOpen();
  }
  
  return(
    <>
      <Container>
        <div className="w-full flex items-center justify-between py-10">
          <h1 className="text-3xl font-bold md:text-4xl">Vouchers</h1>
          <button onClick={openModal}
            className="bg-green-700 text-2xl px-3 py-2 rounded-md hover:scale-105 duration-500"
          >
            Protocolar
          </button>
        </div>
        <main className="grid grid-cols-2 justify-center gap-10 px-4">

          {vouchers?.dayUse.length !== 0 && (
            <section className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold mb-2 sm:text-3xl">Day use</h1>
              
              {vouchers?.dayUse && vouchers.dayUse.map((voucher) => (
                <VoucherInfo key={voucher.id} voucher={voucher}/>
              ))}
            </section>
          )}

          {vouchers?.hospedagem.length !== 0 && (
            <section className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold mb-2 sm:text-3xl">Hospedagem</h1>
            {vouchers?.hospedagem && vouchers.hospedagem.map((voucher) => (
              <VoucherInfo key={voucher.id} voucher={voucher}/>
            ))}
          </section>
          )}

        </main>
        {vouchers?.dayUse.length === 0 && vouchers.hospedagem.length === 0 && (
          <h2 className="text-2xl text-gray-400 sm:text-3xl">Vocês não tem nenhum voucher protocolado :(</h2>
        )}
      </Container>

      {isOpen && <NewVoucherModal/>}
      {isOpenInfoModal && selectedVoucher && <ModalInfo voucher={selectedVoucher}/>}
    </>
  )
}  