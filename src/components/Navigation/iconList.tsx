import { LiaHeart, LiaShoppingBagSolid } from "react-icons/lia";
import { BiUser } from "react-icons/bi";

const iconList = [
  { name: "Favorites", icon: <LiaHeart size={25} />, path: "/favorite" },
  { name: "Bag", icon: <LiaShoppingBagSolid size={25} />, path: "/bag" },
  { name: "User", icon: <BiUser size={25} />, path: "/user" },
];

export default iconList;
