"use client"

import { CatchErrors } from "@/components/catchErrors";
import { getCookieClient } from "@/lib/getCookieClient";
import { api } from "@/services/api";
import { VouchersProps } from "@/types/voucher.type";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useState } from "react";

interface UserInfoProps {
  id:      string;
  name:    string;
  email:   string;
  isAdmin: boolean
}

export interface VouchersDataProps{
  dayUse:     VouchersProps[];
  hospedagem: VouchersProps[];
}

type VoucherContextData = {
  isOpen:            boolean;
  isOpenInfoModal:   boolean;
  userInfo:          UserInfoProps | null;
  selectedVoucher:   VouchersProps | null; 
  vouchers:          VouchersDataProps | null;
  onRequestOpen:     () => void;
  onRequestClose:    () => void;
  changeModalInfo:   (voucher?: VouchersProps | null) => void;
  checkUserLoggedIn: () => Promise<void>;
  getVouchers:       () => Promise<void>;
}

export const VoucherContext = createContext({} as VoucherContextData);

export function VoucherProvider({ children }:{ children: ReactNode }){
  const [userInfo, setUserInfo] = useState<UserInfoProps | null >(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenInfoModal, setIsOpenInfoModal] = useState<boolean>(false);
  const [selectedVoucher, setSelectedVoucher] = useState<VouchersProps | null>(null);
  const [vouchers, setVouchers] = useState<VouchersDataProps | null>(null);

  async function checkUserLoggedIn(){
    try{
      const token = await getCookieClient();

      if(!token){
        throw new Error("Token não encontrado, faça o login para continuar");
      }

      const response = await api.get("/user-details", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setUserInfo(response.data);

      
    }catch(err: any){
      console.error(err);
      throw err;
    }
  }

  async function getVouchers(): Promise<void>{
    try{

      const token = await getCookieClient();

      const response = await api.get<VouchersDataProps>("/get-vouchers", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setVouchers(response.data);

    }catch(err){
      console.error(err);
      throw err;
    }
  };
  
  function onRequestOpen(){
    setIsOpen(true);
  }

  function onRequestClose(){
    setIsOpen(false);
  }

  function changeModalInfo(voucher?: VouchersProps | null){
    if(voucher){
      setSelectedVoucher(voucher);
      setIsOpenInfoModal(true);

    } else {
      setSelectedVoucher(null);
      setIsOpenInfoModal(false);
    };
  };

  return(
    <VoucherContext.Provider value={{
      isOpen,
      userInfo,
      vouchers,
      isOpenInfoModal,
      selectedVoucher,
      getVouchers,
      onRequestOpen,
      onRequestClose,
      changeModalInfo,
      checkUserLoggedIn,
    }}>
      {children}
    </VoucherContext.Provider>
  )
}
