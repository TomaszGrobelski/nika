import { FaUser } from "react-icons/fa";

interface EmailLabelProps {
  children: React.ReactNode;
}

function EmailLabel({ children }: EmailLabelProps) {
  return (
    <div className="my-2 flex w-full items-center border-[1px] ">
      <div className="flex h-8  w-8 items-center justify-center bg-gray-100">
        <FaUser />
      </div>
      {children}
    </div>
  );
}

export default EmailLabel;
