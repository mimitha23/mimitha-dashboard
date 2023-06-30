import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PATHS } from "config/routes";

import * as Styled from "./styles/Variants.styled";

export default function Variants() {
  useEffect(() => {}, []);

  return <Styled.Variants>Variants</Styled.Variants>;
}
