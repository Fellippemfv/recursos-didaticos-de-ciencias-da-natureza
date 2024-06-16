"use client";
import React, {
  type ChangeEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import styles from "./page.module.css";
import { IoFlask, IoFlaskOutline, IoKeyOutline } from "react-icons/io5";
import { PiGitDiffLight } from "react-icons/pi";
import {
  MdAddchart,
  MdBookmarkBorder,
  MdOutlineLocationOn,
  MdOutlinePinch,
  MdPeopleOutline,
  MdDateRange,
  MdError,
  MdFingerprint,
  MdImageSearch,
  MdOutlineBuild,
  MdOutlineDescription,
  MdOutlineFileOpen,
  MdPlaylistAddCheck,
  MdMenuBook,
  MdOutlineLibraryBooks,
  MdDoneOutline,
  MdOutlineAttachMoney,
} from "react-icons/md";

import { RiAddLine, RiUserLine } from "react-icons/ri";
import { FiHash, FiUploadCloud } from "react-icons/fi";

import { FaCopy, FaFlask, FaTrash } from "react-icons/fa";
import { z } from "zod";
import Link from "next/link";



export default function Experiment() {
  


  return (
    <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Enviar Experimento</h1>
        <p className="text-lg mb-4">Escolha uma das opções abaixo para enviar seu experimento:</p>
        
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-medium mb-2">Enviar por E-mail</h2>
            <p className="text-gray-700 mb-2">Envie seu experimento por e-mail.</p>
            <Link target="_blank" className="text-blue-500 hover:underline" href="/enviar-experimento/email">
            Enviar por E-mail
            </Link>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-medium mb-2">Enviar Manualmente</h2>
            <p className="text-gray-700 mb-2">Envie seu experimento manualmente usando a API do GitHub.</p>
            <Link target="_blank" className="text-blue-500 hover:underline" href="/enviar-experimento/manual">
            Enviar Manualmente
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
