"use client";
import React, {
  type ChangeEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
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

import { Octokit } from "@octokit/rest";
/* import Octokit from "@octokit/rest"; */



const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

// Crie uma instância do Octokit
const octokit = new Octokit();

// Preciso colocar essa logica no home

interface Topic {
  id: number;
  title: string;
  slug: string;
}

interface SpecificTopic {
  id: number;
  title: string;
  slug: string;
}

interface LocalizationTopic {
  id: number;
  title: string;
  slug: string;
}

interface TargetAudienceTopic {
  id: number;
  title: string;
  slug: string;
}

interface DifficultyTopic {
  id: number;
  title: string;
  slug: string;
  steps: string;
  explanation: string;
}

interface CostTopic {
  id: number;
  title: string;
  slug: string;
  steps: string;
  explanation: string;
}

interface ExperimentType {
  id: number;
  title: string;
  slug: string;
  steps: string;
}

export default function Experiment() {
 
  return (
    <>
   <div>
    Email
   </div>
    </>
  );
}
